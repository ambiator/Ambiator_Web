import logo from './logo.svg';
import './App.css';
import {
  HashRouter as Router, Routes, Route, Outlet, Navigate, useNavigate,
} from 'react-router-dom';
import HomePage from './Componats/HomePageComp/HomePage';
import { useEffect, useState } from 'react';
import UserResult from './Componats/UserComp/UserResult';
import DeviceMaster from './Componats/DeviceComp/DeviceMaster';
import DeviceConfigResult from './Componats/DeviceComp/DeviceConfig/DeviceConfigResult';
import ReportOfDevice from './Componats/AllReportComp/ReportOfDevice';
import MainDashboardComp from './Componats/DashboadComp/MainDashboardCompo';
import ApplicationStore from './Componats/Utility/localStorageUtil';
import LoginPage from './Componats/Login/Login';
import DeviceandLocation from './Componats/UserComp/DeviceandLocation/DeviceandLocation';
import AccessTable from './Componats/DashboadComp/DrillDown/AccessTable';
import { DataProvider } from './Componats/HomePageComp/DataProvider';

function ProtectedRoutes() {
  const navigate = useNavigate();
  const { accessToken, userDetails } = ApplicationStore().getStorage('userDetails');

  useEffect(() => {
    if (userDetails?.userRole === 'affiliate') {
      document.title = 'Affiliate Dashboard - My AMBIATOR';
    } else if (userDetails?.userRole === 'ambiator') {
      document.title = 'God Mode Dashboard - My AMBIATOR';
    } else if (userDetails?.userRole === 'customer') {
      document.title = 'My Dashboard - My AMBIATOR';
    } else {
      document.title = 'My AMBIATOR - Dashboard Login';
    }

  }, [userDetails, accessToken])


  if (accessToken) {
    return <Outlet />;
  }
  return <Navigate replace to="/login" />;
};


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<HomePage />}>
              <Route index element={<Navigate to="/MainDashboardComp" />} />
              <Route path="/MainDashboardComp" element={<MainDashboardComp />} />
              <Route path='/DeviceandLocation' element={<DeviceandLocation />} />
              <Route path='/AccessTable' element={<AccessTable />} />

            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
