import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim()) {
      const updatedParams = {
        ...Object.fromEntries(searchParams.entries()),
        search: query.trim(),
      };

      if (location.pathname === "/posts") {
        setSearchParams(updatedParams);
      } else {
        navigate(`/posts?${new URLSearchParams(updatedParams).toString()}`);
      }
    }
  };

  return (
    <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2 focus-within:ring-2 ring-blue-800">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="gray"
        strokeWidth="2"
      >
        <circle cx="10.5" cy="10.5" r="7.5" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
      </svg>
      <input
        type="text"
        placeholder="Search a post..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className="bg-transparent outline-none w-full text-sm"
        aria-label="Search posts"
      />
    </div>
  );
};

export default Search;
