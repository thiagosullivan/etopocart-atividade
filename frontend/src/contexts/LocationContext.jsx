import { createContext, useEffect, useState } from "react";
import { addLocations, deleteLocation, getLocations, updateLocations } from "../services/api";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Listar todos os endereços
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

    // Adicionar um novo endereço
    const addLocation = async (newLocation) => {
        setLoading(true);
        try {
            await addLocations(newLocation);
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            throw new Error("Failed to retrieve data from the API.", { cause: error });
        } finally {
            setLoading(false);
        }
    };

    // Deletar um endereço
    const deleteSavedLocation = async (location_id) => {
        setLoading(true);
        try {
            await deleteLocation(location_id)
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            throw new Error("Failed to retrieve data from the API.", { cause: error });
        } finally {
            setLoading(false);
        }
    }

    // Atualizar informações de um endereço
    const updateSavedLocation = async (updatedLocationData) => {
        setLoading(true);
        try {
            updateLocations(updatedLocationData)
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            throw new Error("Failed to retrieve data from the API.", { cause: error });
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        loadLocations();
    }, [refreshTrigger]);

    const value = {
        locations,
        addLocation,
        deleteSavedLocation,
        updateSavedLocation,
        loading
    };

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    );
}