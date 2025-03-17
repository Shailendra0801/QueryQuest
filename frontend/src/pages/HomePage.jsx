import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [search, setSearch] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [selectedTags, setSelectedTags] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const difficulties = ['easy', 'medium', 'hard'];
    const tags = ['frontend', 'backend', 'database','devops', 'testing'];
    const [results, setResults] = useState([]); 

    const handleDifficultyChange = (e) => {
        const value = e.target.value;
        setSelectedDifficulty(prev => 
            prev.includes(value) ? prev.filter(d => d !== value) : [...prev, value]
        );
    };

    const handleTagChange = (e) => {
        const value = e.target.value;
        setSelectedTags(prev => 
            prev.includes(value) ? prev.filter(t => t !== value) : [...prev, value]
        );
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            // Simulate an API call
            const response = await fetch(`https://api.example.com/questions?company=${search}&difficulty=${selectedDifficulty.join(',')}&tags=${selectedTags.join(',')}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer YOUR_API_KEY`, // Replace with your actual API key
                    'Content-Type': 'application/json'
                }
            });

            if(!response.ok){
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setResults(data);
            // Checking if data is empty
        if (data.length === 0) {
            setError("No results found. Please try different criteria.");
        } else {
            // Navigate to the results page with the data
            navigate(`/questions?company=${search}&difficulty=${selectedDifficulty.join(',')}&tags=${selectedTags.join(',')}`);
        }
        } catch (err) {
            setError("An error occurred while searching. Please try again.");
        } finally {
            setLoading(false);
        }
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
                    {tags.map((tag) => (
                        <label key={tag}>
                            <input
                                type="checkbox"
                                value={tag}
                                checked={selectedTags.includes(tag)}
                                onChange={handleTagChange}
                            />
                            {tag}
                        </label>
                    ))}
                </div>
            )}
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white p-2 rounded mt-2"
                disabled={loading}
            >
                {loading ? "Searching..." : "Search"}
            </button>
            {error && <p className="text-red-500">{error}</p>}

            {results.length > 0 && (
                <div className="mt-4">
                    <h2 className="font-bold">Results:</h2>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>
                                {result.title || result.question} {/* Adjust based on actual data structure */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default HomePage;