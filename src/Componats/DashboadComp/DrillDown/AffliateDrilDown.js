import { Button, Card, CardContent } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { InfoDeviceId } from '../../ApiService/LoginPageService';
import ApplicationStore from '../../Utility/localStorageUtil';

const AffliateDrilDown = ({ setIsId, setIsDashboard, setSelectedData }) => {
    const { userDetails } = ApplicationStore().getStorage('userDetails');
    const [rows, setRows] = useState([]);

    const columns = [
        {
            field: 'deviceId',
            headerName: 'Unit1',
            // width: 150,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'deviceName',
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
        // {
        //     field: '',
        //     headerName: '',
        //     // width: 100,
        //     flex: 1,
        //     align: 'center',
        //     headerAlign: 'center'
        // },
        // {
        //     field: '',
        //     headerName: '',
        //     // width: 100,
        //     flex: 1,
        //     align: 'center',
        //     headerAlign: 'center'
        // },
        // {
        //     field: '',
        //     headerName: '',
        //     // width: 100,
        //     flex: 1,
        //     align: 'center',
        //     headerAlign: 'center'
        // },

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
            }}>
                D
            </Button>
        );
    }


    useEffect(() => {
        InfoDeviceId({}, handleInfoDeviceIdShowSuccess, handleInfoDeviceIdShowException);
    }, []);

    const handleInfoDeviceIdShowSuccess = (dataObject) => {
        setRows(dataObject?.data || '');
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
                    height: '63vh',
                    marginTop: '0px'

                }}
            >
                <CardContent >

                    <DataGrid

                        sx={{ border: 'none', fontSize: '12pt', fontFamily: 'Readex Pro - Light', height: '60vh', backgroundColor: '#EBEBEB', borderRadius: '10px' }}
                        rows={rows}
                        columns={columns}
                    // pageSize={3}
                    //   loading={isLoading}
                    // rowsPerPageOptions={[3]}
                    // disableSelectionOnClick
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default AffliateDrilDown