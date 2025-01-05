import { createContext, useState, useEffect } from "react";
import publicApi from "../publicApi";
export const InternshipContext = createContext();

export const InternshipContextProvider = ({ children }) => {
    const [internshipData, setInternshipData] = useState([]);
    
    useEffect(() => {
        grabInternshipData();
    }, []);

    const grabInternshipData = async () => {
        try {
            const response = await publicApi.get('/api/internships/', { cache: 'no-store' });
            setInternshipData(response.data);
        } catch (error) {
            alert('Error fetching internship data');
            console.error('Error fetching internship data:', error);
            setInternshipData([]); // Reset to empty state on error
        }
    }
    
    return (
        <InternshipContext.Provider value={{ internshipData, setInternshipData }}>
            {children}
        </InternshipContext.Provider>
    )
}