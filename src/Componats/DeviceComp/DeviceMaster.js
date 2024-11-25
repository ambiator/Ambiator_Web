import React from 'react'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import LocationResult from './LocationComp/LocationResult';
import BranchResult from './BranchComp/BranchResult';


const DeviceMaster = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Tabs style={{}} aria-label="Basic tabs" defaultValue={0}>
            <TabList>
                <Tab>LOCATION</Tab>
                {/* <Tab>BRANCH</Tab> */}
                {/* <Tab>DEVICE</Tab> */}
            </TabList>
            <TabPanel value={0}>
                <LocationResult />
            </TabPanel> 
            {/* <TabPanel value={1}>
                <BranchResult />
            </TabPanel> */}
            {/* <TabPanel value={2}>
                <b>Third</b> tab panel
            </TabPanel> */}
        </Tabs>
    )
}

export default DeviceMaster