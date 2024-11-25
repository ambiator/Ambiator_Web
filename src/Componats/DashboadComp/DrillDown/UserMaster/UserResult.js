import React, { useEffect, useState } from 'react'
import UserToolbar from './UserToolbar';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { UserAllShowData } from '../../../ApiService/LoginPageService';

const UserResult = () => {
    const columns = [
        {
            field: 'id',
            headerName: "User No",
            // width: 150,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        , {
            field: 'userRole',
            headerName: "User Role",
            // width: 180,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'userName',
            headerName: " User Name",
            // width: 250,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'phoneNo',
            headerName: "  Mobile",
            // width: 270,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'email',
            headerName: "Email",
            // width: 180,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'city',
            headerName: "  City",
            // width: 180,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'companyName',
            headerName: " Company Name",
            // width: 180,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'afiliateCode',
            headerName: "AffliateCode",
            // width: 180,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        }

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
        //         // <DeleteData selectedRow={params.row} />,
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

    // const DeleteData = (params) => {
    //     return (
    //         <DeleteIcon
    //             onClick={() => {

    //             }}
    //             style={{ cursor: 'pointer', color: '#18143D' }}
    //         />
    //     )
    // };
    const [Userdata, setUserData] = useState([]);

    useEffect(() => {
        UserAllShowData(UsershowdataSuccess, usershowdataException)
    }, []);

    const handleCellEdit = (params) => {
        console.log("hffjfjm", params)
    };

    const UsershowdataSuccess = (dataObject) => {
        setUserData(dataObject.data)
    };

    const usershowdataException = () => {

    }
    return (
        <div>
            <UserToolbar />
            <DataGrid
                sx={{ border: 'none', fontSize: '12pt', fontFamily: 'Readex Pro - Light', height: '60vh', backgroundColor: '#EBEBEB', borderRadius: '10px' }}
                rows={Userdata}
                columns={columns}
            // initialState={{
            //     pagination: {
            //         paginationModel: {
            //             pageSize: 5,
            //         },
            //     },
            // }}
            // pageSizeOptions={[5]}
            // disableRowSelectionOnClick
            />
        </div>
    )
}

export default UserResult