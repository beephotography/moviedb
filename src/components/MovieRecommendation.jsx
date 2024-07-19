import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";

const MovieRecommendation = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [similarMovies, setSimilarMovies] = useState("");
  const [loadingReco, setLoadingReco] = useState(false);
  const [loadingMovie, setLoadingMovie] = useState(false);

  const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY;
  const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const fetchMovieData = async (title) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?t=${title}&apikey=${omdbApiKey}`,
      );
      setMovieData(response.data);
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

  const handleRecommendation = async () => {
    if (movieData && movieData.Response === "True") {
      setLoadingReco(true);
      await fetchSimilarMovies(movieData);
      setLoadingReco(false);
    } else {
      setSimilarMovies("Film nicht gefunden.");
    }
  };

  return (
    <div>
      <h1>Film-Empfehlungs-App</h1>
      <input
        type="text"
        value={movieTitle}
        onChange={(e) => setMovieTitle(e.target.value)}
        placeholder="Filmtitel eingeben"
      />
      <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"} onClick={handleSearch}>Suche Film</button>
      {loadingMovie && (
          <Loading isLoading={loadingMovie}/>
      )}
      {movieData && (
        <div>
          <h2>
            {movieData.Title} ({movieData.Year})
          </h2>
          <p>{movieData.Plot}</p>
          <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"} onClick={handleRecommendation}>Ähnliche Filme finden</button>
        </div>
      )}
      {loadingReco && (
        <Loading isLoading={loadingReco}/>
      )}
      {similarMovies && (
          <div>
            <h3>Ähnliche Filme:</h3>
            <p>{similarMovies}</p>
          </div>
      )}
    </div>
  );
};

export default MovieRecommendation;