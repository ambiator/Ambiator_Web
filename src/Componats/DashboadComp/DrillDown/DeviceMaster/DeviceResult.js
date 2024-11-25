import React, { useEffect, useState } from 'react'
import DeviceTool from './DeviceTool';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { DeviceShowData } from '../../../ApiService/LoginPageService';

function DeviceResult() {
    const columns = [
        {
            field: 'id',
            headerName: 'Device Id',
            // width: 150,
            align: 'center',
            flex: 1,
            headerAlign: 'center',
            editable: true,
        },

        {
            field: 'deviceType',
            headerName: 'DeviceType',
            // width: 100,
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            editable: true,
        },
        {
            field: 'deviceId',
            headerName: 'Device serial no',
            // width: 100,
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            editable: true,
        },
        {
            field: 'afiliateCode',
            headerName: 'Afiliate Code',
            // width: 100,
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            editable: true,
        },
        {
            field: 'city',
            headerName: 'City',
            // width: 100,
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            editable: true,
        },

        // {
        //     field: 'actions',
        //     type: 'actions',
        //     headerName:
        //         // <span style={{ fontFamily: 'Readex Pro', fontWeight: 'bold', fontSize: '16px' }}>
        //         //     'Actions'
        //         // </span>,
        //         'Actions',
        //     headerAlign: 'center',
        //     // width: 180,
        //     flex: 1,
        //     align: 'center',
        //     cellClassName: 'actions',
        //     getActions: (params) => [
        //         // <EditData selectedRow={params.row} />,
        //         <DeleteData selectedRow={params.row} />,
        //     ],
        // },
    ];

    // const EditData = (params) => {
    //     return (

    //         <EditIcon
    //             onClick={(event) => {

    //             }}
    //             style={{ cursor: 'pointer', color: '#18143D' }}
    //         />
    //     )
    // };

    const DeleteData = (params) => {
        return (
            <DeleteIcon
                onClick={() => {

                }}
                style={{ cursor: 'pointer', color: '#18143D' }}
            />
        )
    };
    const [Devicelist, setDeviceList] = useState([]);

    useEffect(() => {
        DeviceShowData(handleDeviceSuccess, handleDeviceException);
    }, []);

    const handleCellEdit = (params) => {
        console.log("hffjfjm", params)
    };

    const handleDeviceSuccess = (dataObject) => {
        setDeviceList(dataObject.data)
    };

    const handleDeviceException = () => {

    };

    return (
        <div>
            <DeviceTool />
            <DataGrid
                sx={{ border: 'none', fontSize: '12pt', fontFamily: 'Readex Pro - Light', height: '60vh', backgroundColor: '#EBEBEB', borderRadius: '10px' }}
                rows={Devicelist}
                columns={columns}
                processRowUpdate={handleCellEdit}
            // pageSize={3}
            // loading={isLoading}
            // rowsPerPageOptions={[3]}
            // disableSelectionOnClick
            />
        </div>
    )
}

export default DeviceResult