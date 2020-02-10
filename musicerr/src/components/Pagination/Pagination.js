import React from 'react';
import './Pagination.scss';

const Pagination = ({ totalTracks, tracksPerPage, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTracks / tracksPerPage); i++) {
    pageNumbers.push(i);
  }

  if (!totalTracks) {
    return null;
  }
  return (
    <div style={{}} className="paginate-section">
      <button
        className="paginate-section__button button--blue"
        disabled={currentPage === 1 ? 'disabled' : null}
        onClick={() => paginate(currentPage - 1)}
      >
        prev page
      </button>
      <ul className="paginate-section__page-list">
        {pageNumbers.map(number => (
          <li
            className={number === currentPage ? 'active-page' : 'page'}
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
      <button
        className="paginate-section__button button--blue"
        disabled={
          currentPage === totalTracks / tracksPerPage ? 'disabled' : null
        }
        onClick={() => paginate(currentPage + 1)}
      >
        next page
      </button>
    </div>
  );
};

export default Pagination;
