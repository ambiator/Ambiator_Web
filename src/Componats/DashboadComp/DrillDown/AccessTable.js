import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteConfirmationDailog from '../../Utility/confirmDeletion';
import { useEffect, useState } from 'react';
import { GHGenergyShowService } from '../../ApiService/LoginPageService';
import DeviceTypeResult from './DeviceTypeMaster/DeviceTypeResult';
import DeviceTool from './DeviceMaster/DeviceTool';
import DeviceResult from './DeviceMaster/DeviceResult';
import CustomerResult from './CustomerMaster/CustomerResult';
import UserResult from './UserMaster/UserResult';
import GhgFactorResult from './GhgFactorMaster/GhgFactorResult';
import RpmResult from './RpmMaster/RpmResult';


const AccessTable = () => {
    const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const [rows, setRows] = useState([]);

    return (
        <div >
            <Grid container style={{ marginTop: '20px', padding: '1px', }}>
                <Card style={{
                    borderRadius: '20px',
                    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    width: '100%',
                    height: '73vh',
                    marginTop: '15px', padding: '8px'

                }}>
                    <GhgFactorResult />
                </Card>
                <Card style={{
                    borderRadius: '20px',
                    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    width: '100%',
                    height: '73vh',
                    marginTop: '15px', padding: '8px'

                }}>
                    <DeviceTypeResult />
                </Card>
                <Card style={{
                    borderRadius: '20px',
                    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    width: '100%',
                    height: '73vh',
                    marginTop: '15px', padding: '8px'

                }}>
                    <DeviceResult />
                </Card>
                <Card style={{
                    borderRadius: '20px',
                    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    width: '100%',
                    height: '73vh',
                    marginTop: '15px', padding: '8px'

                }}>
                    <CustomerResult />
                </Card>

                <Card style={{
                    borderRadius: '20px',
                    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    width: '100%',
                    height: '73vh',
                    marginTop: '15px', padding: '8px'

                }}>
                    <UserResult />
                </Card>

                <Card style={{
                    borderRadius: '20px',
                    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    width: '100%',
                    height: '73vh',
                    marginTop: '15px', padding: '8px'

                }}>
                    <RpmResult />
                </Card>

            </Grid>

            <DeleteConfirmationDailog
                open={deleteDailogOpen}
                setOpen={setDeleteDailogOpen}
            />
        </div >
    )
}

export default AccessTable