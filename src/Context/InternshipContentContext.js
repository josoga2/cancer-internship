import { createContext, useState, useEffect } from "react";
import api from "../api";
export const InternshipContentContext = createContext();

export const InternshipContentContextProvider = ({ children }) => {
    const [internshipContentData, setInternshipContentData] = useState([]);
    
    useEffect(() => {
        grabInternshipData();
    }, []);

    const grabInternshipData = async () => {
        try {
            const response = await api.get('/api/internships/contents/', { cache: 'no-store' });
            setInternshipContentData(response.data);
            //console.log(response.data)
        } catch (error) {
            alert('Error fetching internship data');
            console.error('Error fetching internship data:', error);
            setInternshipContentData([]); // Reset to empty state on error
        }
    }
    
    return (
        <InternshipContentContext.Provider value={{ internshipContentData, setInternshipContentData }}>
            {children}
        </InternshipContentContext.Provider>
    )
}