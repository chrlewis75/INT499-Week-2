import React, { useState , useEffect } from 'react';
import logo from '../images/Logo.png';
import './StreamList.css';

const StreamList = () => {
  const [input, setInput] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const savedMovies = localStorage.getItem('movies');
    const isCleared = localStorage.getItem('isCleared');

    if (savedMovies && isCleared !== 'true') {
        setMovies(JSON.parse(savedMovies));
    }
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  },[movies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMovies((prevMovies) => [...prevMovies, input]); // Add the new movie
      setInput(''); // Clear the input field
    }
  };

  const handleSaveandClear = () => {
    setMovies([]);
    localStorage.setItem('isCleared', 'true');
    console.log('List saved and cleared from the page');
  };

  return (
    <div className="streamlist-container">
      <img src={logo} alt="Logo" className="logo" />
      <h1>StreamList</h1>
      <h2 className="add-movie-message">Add a Movie to Your List Below!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="movie-title"
          name="movieTitle"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Movie Title"
        />
        <button type="submit">Submit</button>
      </form>

      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={index} className="movie-item">
                {movie}
            </div>
          ))
        ) : (
          <p className="no-movies-message">No Movies Added Yet</p>
        )}
        </div>
        <button type="button" onClick={handleSaveandClear}>Save and Clear Movie List</button>
    </div>
  );
};

export default StreamList;