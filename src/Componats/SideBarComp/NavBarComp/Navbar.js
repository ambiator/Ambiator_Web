import React from 'react';
import '../NavBarComp/NavbarCss.css';
import Grid from '@mui/material/Grid';
import { Box, Button, Card, IconButton, Typography } from '@mui/material';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import CompanyIcon from '../../../Images/ambiator_logo.jpg';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import Hidden from '@mui/material/Hidden';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ApplicationStore from '../../Utility/localStorageUtil';
import { useNavigate } from 'react-router-dom';
import NotificationBar from '../../notification/ServiceNotificationBar';
import { useState } from 'react';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';


const Navbar = () => {
  const [openNotification, setNotification] = useState({
    status: false,
    type: 'error',
    message: 'Login Successful',
  });

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleAnchorClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    ApplicationStore().clearStorage();
    setNotification({
      status: true,
      type: 'success',
      message: 'Logout Succesfull..!',
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseNotify = () => {
    setNotification({
      status: false,
      type: '',
      message: '',
    });
  };


  return (
    <nav className="navbar">
      <Grid container spacing={2} style={{ marginTop: '9px', }}>
        <Hidden only={['xs',]}>
          <Grid item xs={11} sm={10} md={10.5} lg={11} xl={11} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <img src={CompanyIcon} alt="Company Logo" style={{ height: '3.8vh', width: '9vw', marginLeft: '25px', }} />
          </Grid>
        </Hidden>

        <Grid item xs={1} sm={2} md={1.5} lg={1} xl={1} style={{ display: 'flex', alignItems: 'center', }}>

          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleAnchorClick}
          >
            <LogoutOutlinedIcon style={{ color: 'black' }} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClick} >Logout</MenuItem>
          </Menu>
        </Grid>

      </Grid>
      {/* </Grid> */}
      <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type}
      />
    </nav>
  );
};

export default Navbar;
