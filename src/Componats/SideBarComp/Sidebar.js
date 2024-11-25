import React, { useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { Link, useNavigate } from 'react-router-dom';
import ApplicationStore from '../Utility/localStorageUtil';
import { useData } from '../GlobleDataSet/GlobleDataSet';

const Sidebar = () => {
  const { userDetails } = ApplicationStore().getStorage('userDetails');
  const { selectedDashboard, setSelectedDashboard } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDashboard !== null) {
      if (selectedDashboard === 0) {
        navigate('/MainDashboardComp');
      }
      setSelectedDashboard(null);
    }
  }, [selectedDashboard, setSelectedDashboard, navigate]);

  const sidebarStyle = {
    backgroundColor: '#02316a',
    borderRadius: '40px',
    height: '42vh',
    width: '2vw',
    marginTop: '70px',
    marginLeft: '0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    listStyleType: 'none', // Remove the default list item marker
    padding: 10, // Remove default padding
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const iconStyle = {
    color: 'white',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20px'
  };
  return (
    <nav>
      <ul style={sidebarStyle}>
        <Link to={'/MainDashboardComp'} className="link" >
          <li style={{ height: '38px', width: '100%' }}>
            <HomeIcon style={iconStyle}
              onClick={() => setSelectedDashboard(0)}
            />
          </li>
        </Link>
        <Link to={'/DeviceandLocation'} className="link" >
          <li style={{ height: '38px', width: '100%' }}>
            <AddIcon style={iconStyle} />
          </li>
        </Link>
        {userDetails?.userRole == 'ambiator' && (
          <Link to={'/AccessTable'} className="link" >
            <li style={{ height: '38px', width: '100%' }}>
              <FolderCopyIcon style={iconStyle}
              />
            </li>
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
