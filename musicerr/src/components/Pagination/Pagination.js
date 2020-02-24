import React from "react";
import "./Pagination.scss";

const Pagination = ({
  totalTracks,
  tracksPerPage,
  paginate,
  currentPage,
  loading
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTracks / tracksPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading || !totalTracks) {
    return null;
  }
  return (
    <div className="paginate-section">
      <button
        className="paginate-section__button button button--bluedark"
        disabled={currentPage === 1 ? "disabled" : null}
        onClick={() => paginate(currentPage - 1)}
      >
        prev
      </button>
      <ul className="paginate-section__page-list">
        {pageNumbers.map(number => (
          <li
            className={number === currentPage ? "page active" : "page"}
            key={number}
            onClick={() => paginate(number)}
          >
            {number}
          </li>
        ))}
      </ul>
      <button
        className="paginate-section__button button button--bluedark"
        disabled={
          currentPage >= totalTracks / tracksPerPage ? "disabled" : null
        }
        onClick={() => paginate(currentPage + 1)}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
