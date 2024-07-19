import React from "react";
import MovieRecommendation from "./components/MovieRecommendation";

function App() {
  return (
      <div className="bg-gray-200 px-2 py-10">
          <div className="mx-auto max-w-6xl">
            <MovieRecommendation></MovieRecommendation>
          </div>
      </div>
  );
}

export default App;
