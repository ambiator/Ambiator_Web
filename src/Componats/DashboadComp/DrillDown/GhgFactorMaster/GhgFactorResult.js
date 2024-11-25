import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import GhgFacrtorTool from './GhgFacrtorTool';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import GhgFactorModel from './GhgFactorModel';
import { GHGenergyADeviceService, GHGenergyShowService } from '../../../ApiService/LoginPageService';
import DeleteConfirmationDailog from '../../../Utility/confirmDeletion';
import NotificationBar from '../../../notification/ServiceNotificationBar';

const GhgFactorResult = () => {
    const [open, setOpen] = useState(false);
    const [isAddButton, setIsAddButton] = useState(true);
    const [refreshData, setRefreshData] = useState(false);
    const [rows, setRows] = useState([]);
    const [deleteDailogOpen, setDeleteDailogOpen] = useState(false);
    const [editGhgFactor, setEditGhgFactor] = useState([]);
    const [deleteId, setDeleteId] = useState('');
    const [openNotification, setOpenNotification] = useState({
        status: false,
        type: 'error',
        message: ''
    })

    const columns = [
        {
            field: 'startDate',
            headerName: 'Start Date',
            // width: 150,
            align: 'center',
            flex: 1,
            headerAlign: 'center'
        },
        {
            field: 'countryCode',
            headerName: 'Country Code',
            // width: 150,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'deviceType',
            headerName: 'Device Type',
            // width: 100,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'motorType',
            headerName: 'Motor Type',
            // width: 100,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'GHGe',
            headerName: 'GHGe',
            // width: 100,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'defaultEnergyUse',
            headerName: 'Default Energy Use',
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
                    setIsAddButton(false)
                    setOpen(true);
                    setEditGhgFactor(params.selectedRow)
                }}
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
            />
        )
    };

    useEffect(() => {
        GHGenergyShowService(handleTypesucess, handleTypeException)
    }, [refreshData]);

    const handleTypesucess = (dataObject) => {
        setRows(dataObject.data)
    };
    const handleTypeException = () => {

    };

    const GHGeDeleteSuccess = (dataObject) => {
        setOpenNotification({
            status: true,
            type: 'success',
            message: dataObject.message
        })
        setRefreshData((oldvalue) => !oldvalue);
        setTimeout(() => {
            handleCloseNotification();
        }, 3000)
    };

    const GHGeDeleteException = (errorObject, errorMessage) => {
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
    };
    return (
        <div>
            <GhgFacrtorTool
                setIsAddButton={setIsAddButton}
                setEditGhgFactor={setEditGhgFactor}
                setOpen={setOpen}
            />
            <DataGrid
                sx={{ border: 'none', fontSize: '12pt', fontFamily: 'Readex Pro - Light', height: '60vh', backgroundColor: '#EBEBEB', borderRadius: '10px' }}
                rows={rows}
                columns={columns}
            // pageSize={3}
            // loading={isLoading}
            // rowsPerPageOptions={[3]}
            // disableSelectionOnClick
            />
            <GhgFactorModel
                isAddButton={isAddButton}
                GhgFactor={editGhgFactor}
                open={open}
                setOpen={setOpen}
                setRefreshData={setRefreshData}
            />
            <DeleteConfirmationDailog
                open={deleteDailogOpen}
                setOpen={setDeleteDailogOpen}
                deleteId={deleteId}
                deleteService={GHGenergyADeviceService}
                handleSuccess={GHGeDeleteSuccess}
                handleException={GHGeDeleteException}
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

export default GhgFactorResult