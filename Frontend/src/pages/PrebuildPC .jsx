import React, { useState } from "react";
import "./PrebuildPC.css";

const PrebuildPC = () => {
  const [filters, setFilters] = useState({
    usage: "",
    pricing: "",
    processor: "",
    graphicCard: "",
    storage: "",
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
    // Here you can add your API call to search from the database using these filter values.
  };

  return (
    <div className="prebuild-pc">
      <div className="header">
        <h1>Prebuilt PCs</h1>
        <input
          type="text"
          className="search-bar"
          placeholder="Search Prebuilt PCs"
        />
      </div>

      <div className="filters">
        <div className="filter-item">
          <label htmlFor="usage">Usage</label>
          <select name="usage" id="usage" onChange={handleFilterChange}>
            <option value="">Select Usage</option>
            <option value="gaming">Gaming</option>
            <option value="workstation">Workstation</option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="processor">Processor</label>
          <select name="processor" id="processor" onChange={handleFilterChange}>
            <option value="">Select Processor</option>
            <option value="intel">Intel</option>
            <option value="amd">AMD</option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="graphicCard">Graphics Card</label>
          <select name="graphicCard" id="graphicCard" onChange={handleFilterChange}>
            <option value="">Select Graphics Card</option>
            <option value="nvidia">NVIDIA</option>
            <option value="amd">AMD</option>
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="storage">Storage</label>
          <select name="storage" id="storage" onChange={handleFilterChange}>
            <option value="">Select Storage</option>
            <option value="500GB">500GB</option>
            <option value="1TB">1TB</option>
          </select>
        </div>

        <button className="filter-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default PrebuildPC;
