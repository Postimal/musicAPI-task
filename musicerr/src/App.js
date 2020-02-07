import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [param, setParams] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  const handleChange = e => {
    setParams(e.target.value);
  };

  const search = async () => {
    setLoading(true);
    try {
      let response = await fetch(
        // `https://cors-anywhere.herokuapp.com/https://www.songsterr.com/a/ra/songs.json?pattern=${param}&size=100`
        `https://cors-anywhere.herokuapp.com/https://www.songsterr.com/api/songs?pattern=${param}&size=200`
      );
      let data = await response.json();
      console.log(data);
      setData(data.slice(0, 20));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      setError(error.message);
    }
  };

  if (loading) {
    return <div>ładuje...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      <form action="" className="searchTab">
        <div className="searchTabs" id="searchBar">
          <label htmlFor="tabSearch"></label>
          <input
            type="text"
            id="searchedTab"
            name="enteredTab"
            onChange={handleChange}
            value={param}
            placeholder="Search for artist or song"
            autoComplete="off"
          />
          <button onClick={search} type="button" className="magnify">
            <span className="sr-only">search</span>
          </button>
        </div>
      </form>
      <div>
        {data.map((item, i) => (
          <div className="music-item" key={i}>
            <h3>
              {i} title:{item.title}
            </h3>
            <h4>{item.artist.nameWithoutThePrefix}</h4>
            {item.tabTypes.map(tab => (
              <a
                key={tab}
                target="_blank"
                href={`http://www.songsterr.com/a/wa/bestMatchForQueryString?s=${item.title}&a=${item.artist.nameWithoutThePrefix}`}
                // http://www.songsterr.com/a/wa/bestMatchForQueryString?s=Paganini 5th Caprice Crossroads&a=Steve Vai&track=drums
              >
                ${tab} ***
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
