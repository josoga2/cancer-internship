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
            const response = await api.get('/api/internships/user-profile/1', { cache: 'no-store' });
            setUserData(response.data);
        } catch (error) {
            alert('Error fetching internship data');
            console.error('Error fetching internship data:', error);
            setUserData([]); // Reset to empty state on error
        }
    }
    
    return (
        <UserContext.Provider value={{ UserData, setUserData }}>
            {children}
        </UserContext.Provider>
    )
}