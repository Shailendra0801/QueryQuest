import { createContext, useContext, useState } from "react";

// Initialize with default values
const RestaurantContext = createContext({
    selectedItems: [],
    setSelectedItems: () => {},
    location: "",
    setLocation: () => {},
    rating: "",
    setRating: () => {},
});

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
    const context = useContext(RestaurantContext);
    if (context === undefined) {
        throw new Error("useRestaurantContext must be used within a Provider");
    }
    return context;
};

export { Provider, useRestaurantContext };
export default RestaurantContext;
