import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieRecommendation from "./components/MovieRecommendation";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <MovieRecommendation></MovieRecommendation>
    </div>
  );
}

export default App;
