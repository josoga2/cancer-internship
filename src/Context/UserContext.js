import { createContext, useState, useEffect } from "react";
import api from "../api";
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [UserData, setUserData] = useState([]);
    
    useEffect(() => {
        grabUserData();
    }, []);

    const grabUserData = async () => {
        try {
            const response = await api.get('/api/user/', { cache: 'no-store' });
            setUserData(response.data);
            console.log(UserData)
        } catch (error) {
            alert('Error fetching User data');
            console.error('Error fetching User data:', error);
            setUserData([]); // Reset to empty state on error
        }
    }
    
    return (
        <UserContext.Provider value={{ UserData, setUserData }}>
            {children}
        </UserContext.Provider>
    )
}