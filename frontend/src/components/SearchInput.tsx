import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLiveSuggestions from "./LiveNameSuggestions"; // update path as needed

const SearchInput: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const suggestions = useLiveSuggestions(query);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed === "") {
      navigate("/");
    } else {
      navigate(`/?search=${encodeURIComponent(trimmed)}`);
    }
    setQuery("");
  };

  const handleSuggestionClick = (name: string) => {
    setQuery(name);
    // navigate(`/?search=${encodeURIComponent(name)}`);
  };

  return (
    <div className="position-relative mx-auto" style={{ width: "60%" }}>
      <form className="d-flex mb-0" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search scholarships..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>

      {suggestions.length > 0 && (
        <ul
          className="dropdown-menu show"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 1000,
            width: "100%",
          }}
        >
          <li>
            <h6 className="dropdown-header">Suggestions</h6>
          </li>
          {suggestions.map((s, i) => (
            <li key={i}>
              <a
                className="dropdown-item"
                href={`/scholarship/${s.id}`}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSuggestionClick(`${s.name}`);
                }}
              >
                {s.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
