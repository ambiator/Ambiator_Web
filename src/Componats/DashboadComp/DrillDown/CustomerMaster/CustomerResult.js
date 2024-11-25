import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import CustomerTool from './CustomerTool';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomerShowData } from '../../../ApiService/LoginPageService';

const CustomerResult = () => {
    const columns = [
        {
            field: 'id',
            headerName: "Customer No",
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'userName',
            headerName: "Customer Name",
            // width: 250,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'phoneNo',
            headerName: " Mobile",
            // width: 270,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'email',
            headerName: " Email",
            // width: 180,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'city',
            headerName: "City",
            // width: 180,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        // {
        //     field: 'companyName',
        //     headerName:
        //         <span style={{ fontFamily: 'Readex Pro', fontWeight: 'bold', fontSize: '16px' }}>
        //             Company Name
        //         </span>,
        //     // width: 180,
        //     flex: 1,
        //     align: 'center',
        //     headerAlign: 'center'
        // }
    ];
    // const DeleteData = (params) => {
    //     return (
    //         <DeleteIcon
    //             onClick={() => {

    //             }}
    //             style={{ cursor: 'pointer', color: '#18143D' }}
    //         />
    //     )
    // };
    const [Customerdata, setCustomerData] = useState([])

    useEffect(() => {
        CustomerShowData(customerdataSuccess, customerdataException);
    }, []);

    const handleCellEdit = (params) => {
        console.log("hffjfjm", params)
    };

    const customerdataSuccess = (dataObject) => {
        setCustomerData(dataObject.data)
    };
    const customerdataException = () => {

    }
    return (
        <div>
            <CustomerTool />
            <DataGrid
                sx={{ border: 'none', fontSize: '12pt', fontFamily: 'Readex Pro - Light', height: '60vh', backgroundColor: '#EBEBEB', borderRadius: '10px' }}
                rows={Customerdata}
                columns={columns}
            // pageSize={3}
            // loading={isLoading}
            // rowsPerPageOptions={[3]}
            // disableSelectionOnClick
            />
        </div>
    )
}

export default CustomerResult