import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserResult from '../UserResult';
import DeviceResult from '../DeviceResult';
import ApplicationStore from '../../Utility/localStorageUtil'
import AssignDevice from '../AssignDevice';


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
                <Box sx={{ p: 0 }}>
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


const DeviceandLocation = () => {
    const [value, setValue] = React.useState(0);
    const { userDetails } = ApplicationStore().getStorage('userDetails');
    console.log("jfjhfhffh====>", userDetails.userRole)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Add Device" {...a11yProps(0)} />
                    {userDetails?.userRole === 'affiliate' ? null : <Tab label="Add User" {...a11yProps(1)} />}
                    {userDetails?.userRole === 'affiliate' || userDetails?.userRole === 'customer' ? null : <Tab label="Assign Device" {...a11yProps(2)} />}
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <UserResult />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                {userDetails?.userRole === 'affiliate' ? null : <DeviceResult />}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                {userDetails?.userRole === 'affiliate' || userDetails?.userRole === 'customer' ? null : <AssignDevice />}
            </CustomTabPanel> */}
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Add Device" {...a11yProps(0)} />
                        {userDetails?.userRole !== 'affiliate' && userDetails?.userRole !== 'customer' && (
                            <Tab label="Assign Device" {...a11yProps(1)} />
                        )}
                        {userDetails?.userRole !== 'affiliate' && (
                            <Tab label="Add User" {...a11yProps(userDetails?.userRole === 'customer' ? 1 : 2)} />
                        )}
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <UserResult />
                </CustomTabPanel>
                {userDetails?.userRole !== 'affiliate' && userDetails?.userRole !== 'customer' && (
                    <CustomTabPanel value={value} index={1}>
                        <AssignDevice />
                    </CustomTabPanel>
                )}
                {userDetails?.userRole !== 'affiliate' && (
                    <CustomTabPanel value={value} index={userDetails?.userRole === 'customer' ? 1 : 2}>
                        <DeviceResult />
                    </CustomTabPanel>
                )}
            </Box>


        </Box>
    );

}

export default DeviceandLocation