import React from "react";

const searchBar = ( search, setSearch, handelSearch) => {
    return(
        <div className="searchbar">
            <input 
                type="text"
                placeholder="Enter company name"
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded w-full"
            />
            <button 
                onClick={handelSearch}
                className="bg-blue-500 text-white p-2 rounded mt-2"
            >
                Search
            </button>
        </div>
    );
}

export default searchBar;