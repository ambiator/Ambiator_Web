import React, { useEffect, useState } from 'react'
import DeviceTypeToolbar from './DeviceTypeToolbar';
import DeviceTypeModel from './DeviceTypeModel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { DataGrid } from '@mui/x-data-grid';
import { DeviceDeleteType, DeviceTypeShowData } from '../../../ApiService/LoginPageService';
import DeleteConfirmationDailog from '../../../Utility/confirmDeletion';
import NotificationBar from '../../../notification/ServiceNotificationBar';

const DeviceTypeResult = () => {
    const columns = [
        {
            field: 'id',
            headerName: 'Device Id',
            // width: 150,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },

        {
            field: 'deviceType',
            headerName: 'DeviceType',
            // width: 100,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },


        {
            field: 'actions',
            type: 'actions',
            headerName:
                // <span style={{ fontFamily: 'Readex Pro', fontWeight: 'bold', fontSize: '16px' }}>
                //     'Actions'
                // </span>,
                'Actions',
            headerAlign: 'center',
            // width: 180,
            flex: 1,
            align: 'center',
            cellClassName: 'actions',
            getActions: (params) => [
                <EditData selectedRow={params.row} />,
                <DeleteData selectedRow={params.row} />,
            ],
        },
    ];
    const EditData = (params) => {
        return (

            <EditIcon
                onClick={(event) => {
                    event.stopPropagation();
                    setIsAddButton(false);
                    setEditDeviceType(params.selectedRow);
                    setOpen(true);
                }}
                style={{ cursor: 'pointer', color: '#18143D' }}
            />
        )
    };

    const DeleteData = (params) => {
        return (
            <DeleteIcon
                onClick={(event) => {
                    event.stopPropagation();
                    setDeleteDailogOpen(true);
                    setDeleteId(params.selectedRow.id);

                }}
                style={{ cursor: 'pointer', color: '#18143D' }}
            />
        )
    };

    const [open, setOpen] = useState(false);
    const [isAddButton, setIsAddButton] = useState(true);
    const [editDeviceType, setEditDeviceType] = useState([]);
    const [DeviceList, setEditDeviceList] = useState([]);
    const [refreshData, setRefreshData] = useState(false);
    const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [openNotification, setOpenNotification] = useState({
        status: false,
        type: 'error',
        message: ''
    })


    useEffect(() => {
        DeviceTypeShowData(handleDevicesucess, handleDeviceExcception)
    }, [refreshData]);
    const handleDevicesucess = (dataObject) => {
        setEditDeviceList(dataObject.data)
    };
    const handleDeviceExcception = () => {

    };

    const companySuccess1 = (dataObject) => {
        setOpenNotification({
            status: true,
            type: 'success',
            message: dataObject.message
        })
        setRefreshData((oldvalue) => !oldvalue)
        setTimeout(() => {
            handleCloseNotification();
        }, 3000)
    };

    const companyException1 = (errorObject, errorMessage) => {
        setOpenNotification({
            status: true,
            type: 'error',
            message: errorMessage
        })
    };
    const handleCloseNotification = () => {
        setOpenNotification({
            status: false,
            type: '',
            message: ''
        })
    }

    return (
        <div>
            <DeviceTypeToolbar
                setIsAddButton={setIsAddButton}
                setEditDeviceType={setEditDeviceType}
                setOpen={setOpen}
            />
            <DataGrid
                sx={{ border: 'none', fontSize: '12pt', fontFamily: 'Readex Pro - Light', height: '60vh', backgroundColor: '#EBEBEB', borderRadius: '10px' }}
                rows={DeviceList}
                columns={columns}
            // pageSize={3}
            // loading={isLoading}
            // rowsPerPageOptions={[3]}
            // disableSelectionOnClick
            />
            <DeviceTypeModel
                isAddButton={isAddButton}
                DeviceData={editDeviceType}
                open={open}
                setOpen={setOpen}
                setRefreshData={setRefreshData}
            />
            <DeleteConfirmationDailog
                open={deleteDailogOpen}
                setOpen={setDeleteDailogOpen}
                deleteId={deleteId}
                deleteService={DeviceDeleteType}
                handleSuccess={companySuccess1}
                handleException={companyException1}
            />
            <NotificationBar
                handleClose={handleCloseNotification}
                notificationContent={openNotification.message}
                openNotification={openNotification.status}
                type={openNotification.type}


            />


        </div>
    )
}

export default DeviceTypeResult