import React, { useState , useEffect } from 'react'; // Hook useState Initialization useEffect
import logo from '../images/Logo.png'; // EZTechMovie logo
import './StreamList.css'; // SteamList page syling

const StreamList = () => {
  const [input, setInput] = useState(''); // Holds input for movies
  const [movies, setMovies] = useState([]); // Stores movie titles

  useEffect(() => {
    const savedMovies = localStorage.getItem('movies'); // Retrieves movie list to localStorage movies
    const isCleared = localStorage.getItem('isCleared'); // If it has been cleared, starts a new list

    if (savedMovies && isCleared !== 'true') {
        setMovies(JSON.parse(savedMovies)); // IF the movie list has been cleared, do not reload the saved movie list
    }
  }, []);

  useEffect(() => { // This will run only if something changes to movies
    if (movies.length > 0) { // Checks to see if movies is empty before saving the movie list
      localStorage.setItem('movies', JSON.stringify(movies)); // Saves movie list if it is not empty to movies
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
    setMovies([]); // Clears the movie list
    localStorage.setItem('isCleared', 'true'); // Updates movie list because it was cleared
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