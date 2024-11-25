import React, { useState } from 'react';
import Sidebar from '../SideBarComp/Sidebar';
import Navbar from '../SideBarComp/NavBarComp/Navbar';
import { Navigate, Outlet } from 'react-router-dom';
import '../HomePageComp/HomePageCss.css'; // Import a CSS file for styling
import { useEffect } from 'react';
import { DataProvider } from '../GlobleDataSet/GlobleDataSet';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const [containerWidth, setContainerWidth] = useState('60vw');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 600) {
                setContainerWidth('90vw');
            } else {
                setContainerWidth('74vw');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // useEffect(() => {
    //     navigate('/MainDashboardComp', { replace: true });
    // }, [navigate]);

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', backgroundColor: '#DAD8D8', overflow: 'hidden' }}>
            <DataProvider>
                <div style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    overflow: 'hidden',
                    marginTop: '100px',

                }}>
                    <Sidebar />
                </div>

                <div style={{
                    width: containerWidth,
                    height: '90vh',
                    backgroundColor: 'white',
                    overflow: 'auto',
                    marginTop: '50px',
                    marginBottom: '100px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'darkgray lightgray',
                    marginLeft: '-2%',
                }}>

                    <div>
                        <Navbar onSidebarToggle={toggleSidebar} />
                    </div>


                    <div className="content" style={{
                        flex: 1, padding: '10px', overflow: 'auto', marginLeft: '50px', marginTop: '0px',
                        scrollbarColor: 'transparent transparent',
                        scrollbarWidth: 'thin'
                    }}>
                        <Outlet />
                    </div>

                </div>
            </DataProvider>


        </div>
    );
};

export default HomePage;
