import { createContext, useState, useEffect } from "react";
import publicApi from "../publicApi";
export const InternshipModulesContext = createContext();

export const InternshipModulesContextProvider = ({ children }) => {
    const [internshipModulesData, setInternshipModulesData] = useState([]);
    
    useEffect(() => {
        grabInternshipData();
    }, []);

    const grabInternshipData = async () => {
        try {
            const response = await publicApi.get('/api/internships/modules/', { cache: 'no-store' });
            setInternshipModulesData(response.data);
            //console.log(response.data)
        } catch (error) {
            alert('Error fetching internship data');
            console.error('Error fetching internship data:', error);
            setInternshipModulesData([]); // Reset to empty state on error
        }
    }
    
    return (
        <InternshipModulesContext.Provider value={{ internshipModulesData, setInternshipModulesData }}>
            {children}
        </InternshipModulesContext.Provider>
    )
}