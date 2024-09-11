import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const SearchBlood = () => {
  const [place, setPlace] = useState('');
  const [blood, setBlood] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [result, setResult] = useState(false); // Initial state for search results (hidden)
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const searchBlood = async () => {
    setIsLoading(true); // Set loading indicator to true

    try {
      const response = await Axios.post('https://cic6163ew5.execute-api.ap-northeast-2.amazonaws.com/test/home/search', {
        place,
        blood,
      });

      if (response.data.message) {
        alert(response.data.message); // Display message if present
      } else {
        setResult(true);
        setSearchList(response.data);
      }
    } catch (error) {
      console.error('Search failed:', error);
      alert('An error occurred during search. Please try again later.'); // User-friendly error message
    } finally {
      setIsLoading(false); // Reset loading indicator after API call completes
    }
  };

  // Handle potential search result updates (if needed)
  useEffect(() => {
    // Code to update search results based on changes (optional)
  }, [/* dependency array for updates */]); // Add dependencies as needed

  return (
    <div className="search-container">
      <form className="search-form">
        <input
          type="text"
          placeholder="PLACE"
          name="place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <input
          type="text"
          placeholder="BLOOD GROUP"
          name="bloodGroup"
          value={blood}
          onChange={(e) => setBlood(e.target.value)}
        />

        <button type="button" onClick={searchBlood} disabled={isLoading}>
          {isLoading ? (
            <span className="loading-indicator">Searching...</span>
          ) : (
            <i className="fa fa-search"></i>
          )}
        </button>
      </form>

      {result && (
        <div className="search-results">
          {/* Display search results here */}
          {searchList.map((item) => (
            <div key={item.id}>{/* Render each search result item */}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBlood;