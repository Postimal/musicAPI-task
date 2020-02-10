import React, { useState } from 'react';
import './App.scss';
import Search from './components/Search/Search';
import Tracks from './components/Tracks/Tracks';
import Pagination from './components/Pagination/Pagination';

function App() {
  const [param, setParams] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tracksPerPage] = useState(10);

  const handleChange = e => {
    setParams(e.target.value);
  };

  const checkIfAnyDataFitToQuery = () => {
    document.querySelector('.err-2').style.display = 'block';
    setTimeout(() => {
      document.querySelector('.err-2').style.display = 'none';
    }, 3000);
  };

  const search = async e => {
    e.preventDefault();
    if (param) {
      setLoading(true);
      try {
        let response = await fetch(
          `https://cors-anywhere.herokuapp.com/https://www.songsterr.com/a/ra/songs.json?pattern=${param}`
        );
        let data = await response.json();
        setData(data.slice(0, 100));
        if (!data.length > 0) {
          checkIfAnyDataFitToQuery();
        }
        setLoading(false);
        setParams('');
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    } else if (param.length === 0) {
      document.querySelector('.err-1').style.display = 'block';
      setTimeout(() => {
        document.querySelector('.err-1').style.display = 'none';
      }, 3000);
    }
  };

  const indexOfLastTrack = currentPage * tracksPerPage;
  const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;
  const currentTrack = data.slice(indexOfFirstTrack, indexOfLastTrack);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <header className="header">
        <Search search={search} handleChange={handleChange} param={param} />
      </header>
      <Tracks data={currentTrack} loading={loading} error={error} />
      <Pagination
        totalTracks={data.length}
        tracksPerPage={tracksPerPage}
        paginate={paginate}
        currentPage={currentPage}
      />
    </>
  );
}

export default App;
