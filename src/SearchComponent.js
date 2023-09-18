import React, { useState } from 'react';
import axios from 'axios';

function SearchComponent() {
  const [title, setTitle] = useState('');
  const [movie, setMovie] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/search?title=${title}`);
      setMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie", error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Rechercher un film"
      />
      <button onClick={handleSearch}>Rechercher</button>

      {movie && (
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
