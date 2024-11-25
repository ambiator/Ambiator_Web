import React, { useEffect, useState, } from 'react'
import { Grid, Avatar, TextField, Button, Stack, Typography, Card, CardContent, Input, FormControl, Tabs, Tab, Box, } from '@mui/material'
import Hidden from '@mui/material/Hidden';
import { useNavigate } from 'react-router-dom';
import { LoginService } from '../ApiService/LoginPageService';
import NotificationBar from '../notification/ServiceNotificationBar';
import ApplicationStore from '../Utility/localStorageUtil';
import AmbiatorIcon from '../../Images/ambiatorLogo.jpg';
import loginPageIcon from '../../Images/loginimg.jpg';
import LogoinCustomer from './LogoinCustomer';
import PropTypes from 'prop-types';
import LogoinAffiliate from './LogoinAffiliate';
import LogoinCustomerAbiator from './LogoinCustomerAbiator';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const LoginPage = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{ background: '#34206e', height: '100vh' }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>

                <Card style={{
                    marginTop: '40px',
                    width: '80vw',
                    height: '90vh',
                    borderRadius: '25px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Adjust the values as needed
                    transition: 'transform 0.3s',
                    '&:hover': {
                        transform: 'scale(1.05)', // Adjust the scaling factor as needed
                    }

                }}>
                    <CardContent>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                                    <Tab label="Customer" {...a11yProps(0)} />
                                    <Tab label="Affiliate" {...a11yProps(1)} />
                                    <Tab label="Ambiator" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <CustomTabPanel value={value} index={0}>
                                <LogoinCustomer />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={1}>
                                <LogoinAffiliate />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2}>
                                <LogoinCustomerAbiator />
                            </CustomTabPanel>
                        </Box>

                    </CardContent>
                </Card>

            </div>
        </div>
    )
}

export default LoginPage