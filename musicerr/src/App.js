import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [param, setParams] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = e => {
    setParams(e.target.value);
  };

  const search = async () => {
    setLoading(true);
    try {
      let response = await fetch(
        `https://cors-anywhere.herokuapp.com/https://www.songsterr.com/a/ra/songs.json?pattern=${param}`
      );
      let data = await response.json();
      console.log(data);
      setData(data.slice(0, 20));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      hi
      <form action="" onClick={search} className="searchTab">
        <div className="searchTabs" id="searchBar">
          <label htmlFor="tabSearch"></label>
          <input
            type="text"
            id="searchedTab"
            name="enteredTab"
            onChange={handleChange}
            value={param}
            placeholder="Search for guitar tabs here"
            autoComplete="off"
          />
          <button type="button" className="magnify">
            <span className="sr-only">search</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
