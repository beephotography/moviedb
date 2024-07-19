import React, {useState} from "react";
import axios from "axios";
import Loading from "./Loading";

const MovieRecommendation = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [moviesSearchResult, setMoviesSearchResult] = useState(null);
  const [similarMovies, setSimilarMovies] = useState("");
  const [loading, setLoading] = useState(false);

  const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;
  const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const fetchMovieData = async (title) => {
    try {
      setSimilarMovies(null);
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${title}&apikey=${omdbApiKey}`,
      );
      setMoviesSearchResult(response.data.Search);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  const fetchSimilarMovies = async (movieData) => {
    const prompt = `Ich habe die folgenden Filmdaten: ${JSON.stringify(movieData)}. Welche ähnlichen Filme kannst du mir basierend auf diesen Informationen empfehlen?`;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          "messages": [
            {"role": "system", "content": "Du bist ein hilfreicher Assistent, der ALLE Filme weltweit kennt und gute Empfehlungen ausspielen kann. Du generierst an Hand von Filmdaten ähnliche Filme. Deine Antwort MUSS in JSON Format kommen und soll ein Javascript-Array OHNE key sein, bei welchem JEDER Film/Eintrag ein weiteres JSON-Objekt sein soll mit Daten wit 'Title' usw. - Ich will nur 'Year', 'Title' haben."},
            {"role": "user", "content": prompt}
          ],
          max_tokens: 200,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
        },
      );
      const similarMoviesObject = JSON.parse(response.data.choices[0].message.content);

      console.log(similarMoviesObject);
      console.log(similarMoviesObject.similarMovies);
      setSimilarMovies(similarMoviesObject);
    } catch (error) {
      console.error("Error fetching similar movies:", error);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    await fetchMovieData(movieTitle);
    setLoading(false);
  };

  const handleRecommendation = async (imdbID) => {
    // hole Daten zu einem einzelnen Movie
    const movieData = await axios.get(
        `http://www.omdbapi.com/?i=${imdbID}&apikey=${omdbApiKey}`,
    );

    if (movieData.data) {
      setLoading(true);
      await fetchSimilarMovies(movieData.data);
      setLoading(false);
    } else {
      setSimilarMovies("Film nicht gefunden.");
    }
  };

  return (
      <div>
        <div>
          {loading && (
              <Loading isLoading={loading}/>
          )}
        </div>
        <h2 className="mb-5 text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Finde deinen passenden Film mit moviedb!
        </h2>
        <div className="flex justify-center items-center">
          <form className="w-full mx-auto">
            <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                  <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                  type="search"
                  value={movieTitle}
                  onChange={(e) => setMovieTitle(e.target.value)}
                  className={
                    "block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  }
                  placeholder="Breaking Bad, The Matrix ..."
                  required
              />
              <button
                  type="submit"
                  className={
                    "text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  }
                  onClick={handleSearch}
              >
                Suchen
              </button>
            </div>
          </form>
        </div>

        {moviesSearchResult &&
            <div className="mt-4 overflow-x-auto">
              <ul className="flex space-x-6 text-center text-slate-700">
                {moviesSearchResult.map((movie) => (
                    <li
                        key={movie.imdbID}
                        className="cursor-pointer bg-gray-100 hover:bg-gray-300 rounded-xl bg-white px-6 py-8 shadow-sm flex-shrink-0"
                        onClick={() => handleRecommendation(movie.imdbID)}
                    >
                      <img src={movie.Poster} alt={movie.Title} className="mx-auto h-80 w-48"/>
                      <h3 className="my-3 font-display font-medium">{movie.Title} ({movie.Year})</h3>
                    </li>
                ))}
              </ul>
            </div>
        }
        {
            similarMovies && (
                <div className="mt-8">
                  <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                    Ähnliche Filme
                  </h2>
                  <ul className="mt-4 grid grid-cols-1 gap-6 text-center text-slate-700 md:grid-cols-3">
                    {similarMovies.map(movie => (
                            <li className="bg-gray-100 hover:bg-gray-300 rounded-xl bg-white px-6 py-8 shadow-sm"
                                key={movie.Title}>
                              <h3 className="my-3 font-display font-medium">{movie.Title} ({movie.Year})</h3>
                            </li>
                        )
                    )
                    }
                  </ul>
                </div>
            )
        }
      </div>
  );
};

export default MovieRecommendation;
