import React, { useState, useReducer } from "react";
import "./App.scss";
import {initialState, errorsList} from "./initState";
import fetchReducer from "./reducers/fetchReducer";
import Search from "./components/Search/Search";
import Tracks from "./components/Tracks/Tracks";
import Pagination from "./components/Pagination/Pagination";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [tracksPerPage] = useState(10);
  const [state, dispatch] = useReducer(fetchReducer, initialState)

  const handleChange = e => {
    dispatch({type:"SET_PARAM", payload:e.target.value})
  };

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const search = async e => {
    e.preventDefault();
      dispatch({type:'LOADING'})
      try {
        let response = await fetch(`https://www.songsterr.com/a/ra/songs.json?pattern=${state.param}`);
        let data = await response.json();
        dispatch({type:"RESPONSE_COMPLETED", payload:data.slice(0,100)})
        if (!data.length > 0) {
          dispatch({type:'SET_QUERY_ERROR', payload:errorsList.queryChange})
        }
        setCurrentPage(1);
      } catch (error) {
        dispatch({type:"RESPONSE_FAILED"})
      }
  };

  const indexOfLastTrack = currentPage * tracksPerPage;
  const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;
  const currentTrack = state.data.slice(indexOfFirstTrack, indexOfLastTrack);

  return (
    <>
      <header className="header">
        <Search search={search} handleChange={handleChange} param={state.param} queryErrors={state.queryErrors} />
      </header>
      <Tracks
       data={currentTrack}
       loading={state.loading}
       error={state.error}
        />
      <Pagination
        totalTracks={state.data.length}
        tracksPerPage={tracksPerPage}
        paginate={paginate}
        currentPage={currentPage}
        loading={state.loading}
      />
    </>
  );
}

export default App;
