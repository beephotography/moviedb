import React, {useState} from "react";
import axios from "axios";
import Loading from "./Loading";

const MovieRecommendation = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [moviesSearchResult, setMoviesSearchResult] = useState(null);
  const [similarMovies, setSimilarMovies] = useState("");
  const [loadingReco, setLoadingReco] = useState(false);
  const [loadingMovie, setLoadingMovie] = useState(false);

  const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;
  const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const fetchMovieData = async (title) => {
    try {
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
            {"role": "system", "content": "Du bist ein hilfreicher Assistent, der ALLE Filme weltweit kennt und gute Empfehlungen ausspielen kann. Du generierst an Hand von Filmdaten ähnliche Filme. Bitte nenne hier aber nur kurze Stichwort-Listen."},
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

      setSimilarMovies(response.data.choices[0].message.content.trim());
    } catch (error) {
      console.error("Error fetching similar movies:", error);
    }
  };

  const handleSearch = async () => {
    setLoadingMovie(true);
    await fetchMovieData(movieTitle);
    setLoadingMovie(false);
  };

  const handleRecommendation = async (imdbID) => {
    // hole Daten zu einem einzelnen Movie
    const movieData = await axios.get(
        `http://www.omdbapi.com/?i=${imdbID}&apikey=${omdbApiKey}`,
    );

    console.log(movieData);

    if (movieData.data) {
      setLoadingReco(true);
      await fetchSimilarMovies(movieData.data);
      setLoadingReco(false);
    } else {
      setSimilarMovies("Film nicht gefunden.");
    }
  };

  return (
      <div>
        <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Finde deinen passenden Film mit moviedb!
        </h2>
        <input
            type="text"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            placeholder="Filmtitel eingeben"
        />
        <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"}
                onClick={handleSearch}>Suche Film
        </button>
        {loadingMovie && (
            <Loading isLoading={loadingMovie}/>
        )}
        {moviesSearchResult &&
            <ul class="mt-16 grid grid-cols-1 gap-6 text-center text-slate-700 md:grid-cols-3">
              {moviesSearchResult.map(movie => (
                    <li class="rounded-xl bg-white px-6 py-8 shadow-sm" key={movie.imdbID} onClick={() => handleRecommendation(movie.imdbID)}>
                      <img src={movie.Poster} alt="" class="mx-auto h-80 w-48"/>
                      <h3 class="my-3 font-display font-medium">{movie.Title} ({movie.Year})</h3>
                    </li>
                    )
                )
              }
            </ul>
        }
        {
            loadingReco && (
                <Loading isLoading={loadingReco}/>
            )
        }
        {
            similarMovies && (
                <div>
                  <h3>Ähnliche Filme:</h3>
                  <p>{similarMovies}</p>
                </div>
            )
        }
      </div>
  );
};

export default MovieRecommendation;
