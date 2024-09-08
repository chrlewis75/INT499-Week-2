import React, { useState, useEffect } from 'react';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const savedMovies = localStorage.getItem('movies');
    if (savedMovies) {
      console.log('Loaded movies from localStorage:', JSON.parse(savedMovies));
      setMovies(JSON.parse(savedMovies));
    }
  }, []);

  return (
    <div className="movies-container">
      <h1>My Saved Movies To Watch</h1>
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={index} className="movie-item">
              {movie}
            </div>
          ))
        ) : (
          <p>No movies saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default Movies;