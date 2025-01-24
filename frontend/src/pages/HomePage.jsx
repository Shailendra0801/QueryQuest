import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handelSearch = () => {
        navigate('/questions?company=${search}')
    };

    return(
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Search Recently Asked Questions</h1>
            <input 
                type="text"
                placeholder="Enter company name"
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}
                className="border p-2 rounded w-full"
            />
            <button
                onClick={handelSearch}
                className="bg-blue-500 text-white p-2 rounded mt-2"
            >
                Search
            </button>
        </div>
    )
}

export default HomePage;