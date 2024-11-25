import { Button, Card, CardContent, Fab, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { InfoDeviceId } from '../../ApiService/LoginPageService';
import ApplicationStore from '../../Utility/localStorageUtil';
import { useData } from '../../GlobleDataSet/GlobleDataSet';
import LockPersonTwoToneIcon from '@mui/icons-material/LockPersonTwoTone';

const AlertDrillDown = ({ setIsId, setIsDashboard, setSelectedData, filterId }) => {
    const { userDetails } = ApplicationStore().getStorage('userDetails');
    const [rows, setRows] = useState([]);
    // const [refreshDatalist, setRefreshDatalist] = useState(false);
    // const [rows, setRows] = useState([]);

    const { deviceSelectStatus, setDeviceSelectStatus } = useData();

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
            type: 'actions',
            headerName: 'More..',
            headerAlign: 'center',
            // maxWidth: 200,
            flex: 1,
            align: 'center',
            cellClassName: 'actions',
            getActions: (params) => [
                <DetailView selectedRow={params.row} />,
            ],
        },
    ];

    const columns1 = [
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
            type: 'actions',
            headerName: 'More..',
            headerAlign: 'center',
            maxWidth: 200,
            flex: 1,
            align: 'center',
            cellClassName: 'actions',
            getActions: (params) => [
                <DetailView selectedRow={params.row} />,

            ],
        },
    ];

    const columns2 = [
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
            field: 'floorName',
            headerName: 'Friendly Name',
            // width: 100,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },

        {
            field: 'More',
            type: 'actions',
            headerName: 'More..',
            headerAlign: 'center',
            maxWidth: 200,
            flex: 1,
            align: 'center',
            cellClassName: 'actions',
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
                setDeviceSelectStatus(params.selectedRow || '');
                console.log('params.selectedRow.device_state===>', params.selectedRow.device_state)
                // setRefreshDatalist(params.selectedRow || '');
                // console.log('setRefreshDatalist===>', params.selectedRow)
                // setRefreshDatalist((oldValue) => !oldValue);

            }} >

                Details
            </Button>
        );
    }


    useEffect(() => {
        InfoDeviceId({
            type: filterId == 'All' ? "" : filterId
        }, handleInfoDeviceIdShowSuccess, handleInfoDeviceIdShowException);
    }, [filterId]);

    const handleInfoDeviceIdShowSuccess = (dataObject) => {
        setRows(dataObject?.data || '');
        // setRefreshDatalist((oldValue) => !oldValue);

    }


    const handleInfoDeviceIdShowException = (errorStatus, errorMessage) => {

    }
    return (
        <div style={{ marginTop: '20px', padding: '1px' }}>
            <Card
                style={{
                    borderRadius: '20px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s',
                    width: '100%',
                    height: 'auto',
                    marginTop: '0px'

                }}
            >
                <CardContent >
                    {
                        userDetails?.userRole === "ambiator" ? (
                            <DataGrid
                                sx={{ border: 'none', fontSize: '12pt', fontFamily: 'Readex Pro - Light', height: '60vh', backgroundColor: '#EBEBEB', borderRadius: '10px' }}
                                rows={rows}
                                columns={columns}
                            // pageSize={3}
                            // loading={isLoading}
                            // rowsPerPageOptions={[3]}
                            // disableSelectionOnClick
                            />
                        ) : userDetails?.userRole === "affiliate" ? (
                            <DataGrid
                                sx={{ border: 'none', fontSize: '12pt', fontFamily: 'Readex Pro - Light', height: '60vh', backgroundColor: '#EBEBEB', borderRadius: '10px' }}
                                rows={rows}
                                columns={columns1}
                            // pageSize={3}
                            // loading={isLoading}
                            // rowsPerPageOptions={[3]}
                            // disableSelectionOnClick
                            />
                        ) : userDetails?.userRole === "customer" ? (
                            <DataGrid
                                sx={{ border: 'none', fontSize: '12pt', fontFamily: 'Readex Pro - Light', height: '60vh', backgroundColor: '#EBEBEB', borderRadius: '10px' }}
                                rows={rows}
                                columns={columns2}
                            // pageSize={3}
                            // loading={isLoading}
                            // rowsPerPageOptions={[3]}
                            // disableSelectionOnClick
                            />
                        ) : null
                    }

                </CardContent>
            </Card>

        </div>
    )
}

export default AlertDrillDown