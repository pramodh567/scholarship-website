import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [noResults, setNoResults] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  let navigate: any = () => {}; // fallback for when useNavigate cannot be used
  try {
    navigate = useNavigate();
  } catch (err) {
    console.warn("useNavigate called outside of Router context.");
  }

  const ITEMS_PER_PAGE = 5;

  const fetchResults = async () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setResults([]);
      setNoResults(false);
      if (navigate) navigate("/");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/api/details?search=${encodeURIComponent(
          trimmedQuery
        )}`
      );
      const data = res.data.data;
      setNoResults(data.length === 0);
      setResults(data);
      setCurrentPage(1);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResults();
  };

  const paginatedResults = results.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (delta: number) => {
    const newPage = currentPage + delta;
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="position-relative" style={{ zIndex: 999 }}>
      <form className="d-flex mb-3" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search scholarships..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>

      {noResults && (
        <div className="alert alert-warning">No scholarships available</div>
      )}

      {paginatedResults.map((item: any) => (
        <div key={item._id} className="card mb-2">
          <div className="card-body">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">
              {item.description || "No description available."}
            </p>
            <a
              href={item.link}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-2">
          <button
            className="btn btn-secondary"
            onClick={() => handlePageChange(-1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-secondary"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
