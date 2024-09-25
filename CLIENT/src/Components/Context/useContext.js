// useContext.js

import { createContext, useContext, useState } from "react";

const RestaurantContext = createContext();

const Provider = ({ children }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [location, setLocation] = useState("");
    const [rating, setRating] = useState("");

    const data = {
        selectedItems,
        setSelectedItems,
        location,
        setLocation,
        rating,
        setRating,
    };

    return (
        <RestaurantContext.Provider value={data}>
            {children}
        </RestaurantContext.Provider>
    );
};

// Custom hook for consuming context
const useRestaurantContext = () => {
    return useContext(RestaurantContext);
};

export { Provider, useRestaurantContext };
export default RestaurantContext;
