import { createContext, useContext, useState } from 'react';
const DataContext = createContext();
export const DataProvider = ({ children }) => {
    const [deviceSelectStatus, setDeviceSelectStatus] = useState(null);
    // const [refreshDatalist, setRefreshDatalist] = useState(false);
    const [selectedDashboard, setSelectedDashboard] = useState(null);
    // console.log("selectedDashboard", setSelectedDashboard)
    return (
        <DataContext.Provider value={{ deviceSelectStatus, setDeviceSelectStatus, selectedDashboard, setSelectedDashboard }}>
            {children}
        </DataContext.Provider>
    );
};
export const useData = () => {
    return useContext(DataContext);
};