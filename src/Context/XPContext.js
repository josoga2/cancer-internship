import { createContext, useState, useEffect } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
export const XPContext = createContext();

export const XPContextProvider = ({ children }) => {
    const [XPData, setXPData] = useState([]);
    

    const { internshipId } = useParams()

    useEffect(() => {
        grabInternshipData();
    }, []);

    const grabInternshipData = async () => {
        try {
            const response = await api.get(`/api/internships/${internshipId}/progress/`, { cache: 'no-store' });
            setXPData(response.data);
            //console.log(response.data)
        } catch (error) {
            alert('Error fetching internship data');
            console.error('Error fetching internship data:', error);
            setXPData([]); // Reset to empty state on error
        }
    }
    
    return (
        <XPContext.Provider value={{ XPData, setXPData }}>
            {children}
        </XPContext.Provider>
    )
}