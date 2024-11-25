import { createContext, useContext, useState } from 'react';
const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [selectedDashboard, setSelectedDashboard] = useState(null);
  return (
    <DataContext.Provider value={{ selectedDashboard, setSelectedDashboard }}>
      {children}
    </DataContext.Provider>
  );
};
export const useData = () => {
  return useContext(DataContext);
};