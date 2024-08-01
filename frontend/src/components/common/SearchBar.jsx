import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, setSearchTerm }) => {

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="relative">
            <input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border-0 p-2 rounded w-full  outline-none"
            />
            <FaSearch className="absolute top-1/2 right-2 transform -translate-y-1/2 text-lg text-primary" />
          </div>
  );
};

export default SearchBar;
