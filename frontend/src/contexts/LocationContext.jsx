import { createContext, useEffect, useState } from "react";
import { getLocations } from "../services/api";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const loadLocations = async () => {
        setLoading(true);
        try {
            const data = await getLocations();
            setLocations(data);
        } catch (error) {
            throw new Error("Failed to retrieve data from the API.", { cause: error });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLocations();
    }, [refreshTrigger]);

    const value = {
        locations,
    };

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    );
}