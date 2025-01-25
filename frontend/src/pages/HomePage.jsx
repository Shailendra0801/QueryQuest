import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [search, setSearch] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [selectedTags, setSelectedTags] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const navigate = useNavigate();

    const difficulties = ['easy', 'medium', 'hard'];
    const tags = ['frontend', 'backend', 'database','devops', 'testing'];

    const handleDifficultyChange = (e) => {
        const value = e.target.value;
        setSelectedDifficulty(prev => 
            prev.includes(value) ? prev.filter(d => d !== value) : [...prev, value]
        );
    };

    const handelTagChange = (e) => {
        const value = e.target.value;
        setSelectedTags(prev => 
            prev.includes(value) ? prev.filter(t => t !== value) : [...prev, value]
        );
    };

    const handelSearch = () => {
        navigate(`/questions?company=${search}&{difficulty}&tags=${tags}`);
    };

    return(
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Search Recently Asked Questions</h1>
            <input 
                type="text"
                placeholder="Enter difficulty(Optional)"
                value={search}
                onChange={(e) => {setSearch(e.target.value)}}
                className="border p-2 rounded w-full"
            />
            <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-blue-500 text-white p-2 rounded mt-2"
            >
                Filter
            </button>
            {showFilters && (
                <div className="mt-2">
                    <h2 className="font-bold">Difficulty:</h2>
                    {difficulties.map((difficulty) => (
                        <label key={difficulty}>
                            <input
                                type="checkbox"
                                value={difficulty}
                                checked={selectedDifficulty.includes(difficulty)}
                                onChange={handleDifficultyChange}
                            />
                            {difficulty}
                        </label>
                    ))}
                    <h2 className="font-bold mt-4">Tags:</h2>
                    {tags.mapp((tag) => (
                        <label key={tag}>
                            <input
                                type="checkbox"
                                value={tag}
                                checked={selectedTags.includes(tag)}
                                onChange={handelTagChange}
                            />
                            {tag}
                        </label>
                    ))}
                </div>
            )}
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