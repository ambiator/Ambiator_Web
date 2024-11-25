import React, { useEffect, useState } from 'react'
import UtilityForManage from '../UtilityForManage'
import { Card, CardContent, Grid, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import { ChallengeShowData } from '../../ApiService/LoginPageService';


const ChallengeHistory = ({ selectedData, isId }) => {
    console.log("dfdgfdkkkkkkkkkkkkkkkkkkk", selectedData)
    const [rows, setRows] = useState([]);
    const columns = [
        {
            field: 'deviceId',
            headerName:
                "Unit Serial No",
            width: 150,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'date',
            headerName:

                "Date",

            width: 150,
            flex: 1,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'time',
            headerName:

                "Time",

            flex: 1,
            width: 150,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'status',
            headerName: "Challenge",
            flex: 1,
            width: 150,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#8e0808', }}>
                    {params.value}
                </span>
            )
        },
        {
            field: 'Contact',
            headerName: "Status Change",
            flex: 1,
            width: 150,
            align: 'center',
            headerAlign: 'center',
            editable: true

        },
        {
            field: 'Challenge',
            headerName: "Comment",
            flex: 1,
            width: 150,
            align: 'center',
            headerAlign: 'center',
            editable: true

        },

        {
            field: 'More',
            headerName: "Resolved Time",
            flex: 1,
            width: 150,
            align: 'center',
            headerAlign: 'center',
            editable: true

        },
        // {
        //   field: 'actions',
        //   type: 'actions',
        //   headerName: 'Actions',
        //   headerAlign: 'center',
        //   width: 300,
        //   align:'center',
        //   cellClassName: 'actions',
        //   getActions: (params) => [
        //     <EditData selectedRow={params.row} />,
        //     <DeleteData selectedRow={params.row} />,
        //   ],
        // },

    ];
    useEffect(() => {
        ChallengeShowData({
            device: isId,

        }, handleChallengeSuccess, handlechallengeException);
    }, []);
    const handleChallengeSuccess = (dataObject) => {
        setRows(dataObject?.data)
    };
    const handlechallengeException = () => {

    };

    const handleCellEdit = (params) => {
        const updatedRows = [...rows];
        const index = updatedRows.findIndex((row) => row.id === params.id);
        updatedRows[index][params.field] = params.value;
        console.log("params.valueparams.value", params);

    }
    return (
        <div style={{ margin: '30px 25px' }}>
            <UtilityForManage
                selectedData={selectedData}
            />
            <Grid container spacing={2} marginTop={"14px"} >
                <Grid item md={12} style={{ display: 'flex' }}>
                    <Typography style={{
                        fontSize: '19px', fontFamily: 'Readex Pro',
                        fontWeight: 'bold',
                    }}>
                        Challenge History
                    </Typography>
                </Grid>
                <Grid item sm={12} md={12}>
                    <Card
                        style={{
                            borderRadius: '20px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.2s',
                            width: '100%',
                            height: '53vh',
                            marginTop: '0px',

                        }}
                    >
                        <CardContent >

                            <DataGrid

                                sx={{ border: 'none', fontSize: '12pt', fontFamily: 'Readex Pro - Light', height: '60vh', backgroundColor: '#EBEBEB', borderRadius: '10px' }}
                                rows={rows}
                                columns={columns}
                                processRowUpdate={handleCellEdit}
                            // pageSize={3}
                            //   loading={isLoading}
                            // rowsPerPageOptions={[3]}
                            // disableSelectionOnClick
                            />
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </div>
    )
}

export default ChallengeHistory