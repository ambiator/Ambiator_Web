import { Button, Card, CardContent, Grid, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { ActiveShowData } from '../../ApiService/LoginPageService';

const ViewHistory = ({ filterId, setIsDashboard, setIsId, setSelectedData, }) => {
    const [activeData, setActiveData] = useState([])
    const columns = [
        {
            field: 'deviceId',
            headerName: 'Unit Serial No',
            // width: 150,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'deviceType',
            headerName: 'Unit Type',
            // width: 150,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'city',
            headerName: 'City',
            // width: 100,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'userName',
            headerName: 'Customer Name',
            // width: 100,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'phoneNo',
            headerName: 'Contact No',
            // width: 100,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'More',
            headerName: 'More...',
            type: 'actions',
            headerAlign: 'center',
            // width: 100,
            flex: 1,
            align: 'center',
            cellClassName: 'action',
            getActions: (params) => [
                <DetailView selectedRow={params.row} />,
            ],
        },


    ];
    function DetailView(params) {
        return (
            <Button onClick={() => {
                setIsDashboard(1);
                setIsId(params.selectedRow.deviceId || '');
                setSelectedData(params.selectedRow || []);
                console.log("View123>>>", params.selectedRow.device_state)

            }}>
                View
            </Button>
        )
    }

    useEffect(() => {
        ActiveShowData({
            type: filterId == 'All' ? "" : filterId
        }, handleActiveSuccess, handleActiveException)

    }, [filterId]);

    const handleActiveSuccess = (dataObject) => {
        setActiveData(dataObject.data || [])
    };

    const handleActiveException = (errorObject, errorMessage) => {

    };


    return (
        <div style={{ marginTop: '18px' }} >

            <Grid container style={{ marginTop: '20px', padding: '1px' }}  >
                <Card style={{
                    borderRadius: '20px',
                    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    width: '100%',
                    height: '73vh',
                    marginTop: '10px', padding: '2px'

                }}>
                    <CardContent>
                        <Typography sx={{ m: 1 }} variant='h6' style={{ display: 'flex', alignItems: 'flex-start', marginTop: 'auto' }}>
                            ACTIVE
                        </Typography>
                        <DataGrid
                            sx={{ border: 'none', fontSize: '12pt', fontFamily: 'Readex Pro - Light', height: '60vh', backgroundColor: '#EBEBEB', borderRadius: '10px' }}
                            rows={activeData}
                            columns={columns}
                        // pageSize={3}
                        // loading={isLoading}
                        // rowsPerPageOptions={[3]}
                        // disableSelectionOnClick
                        />
                    </CardContent>
                </Card>
            </Grid>

        </div >
    )
}

export default ViewHistory