import { createContext, useState, useEffect } from "react";
import publicApi from "../publicApi";
export const PlaygroundContext = createContext();

export const PlaygroundContextProvider = ({ children }) => {
    const [playgroundData, setPlaygroundData] = useState([]);
    
    useEffect(() => {
        grabPlaygroundData();
    }, []);

    const grabPlaygroundData = async () => {
        try {
            const response = await publicApi.get('/api/playground-task/', { cache: 'no-store' });
            setPlaygroundData(response.data);
        } catch (error) {
            alert('Error fetching playground data');
            console.error('Error fetching playground data:', error);
            setPlaygroundData([]); // Reset to empty state on error
        }
    }
    
    return (
        <PlaygroundContext.Provider value={{ playgroundData, setPlaygroundData }}>
            {children}
        </PlaygroundContext.Provider>
    )
}