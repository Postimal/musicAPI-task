import React, { useRef, useEffect } from 'react';
import './Search.scss';

const Search = ({ search, handleChange, param }) => {
  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);
  return (
    <div className="form-box">
      <h2 className="form-box__title">Tab finder</h2>
      <form onSubmit={search} className="form-box__form form">
        <div className="form-inner">
          <svg
            width="24"
            height="22"
            viewBox="0 0 29 27"
            className="form-inner__svg"
          >
            <path d="M20.5 17.9l5.7 5.5a1.2 1.2 0 1 1-1.7 1.7L19 19.4a9.8 9.8 0 1 1 1.5-1.5zm-7.6 1.5a7.6 7.6 0 1 0 0-15.2 7.6 7.6 0 0 0 0 15.2z"></path>
          </svg>
          <input
            className="form-inner__text-input"
            type="text"
            ref={inputEl}
            onChange={handleChange}
            value={param}
            placeholder="Search for artist or song"
          />
          <button type="submit" className="form-inner__button button--blue">
            search
          </button>
        </div>
      </form>
      <p className="form-box__error-message err-1">Input can't be empty!</p>
      <p className="form-box__error-message err-2">
        No song or artist match to query!
      </p>
    </div>
  );
};

export default Search;
