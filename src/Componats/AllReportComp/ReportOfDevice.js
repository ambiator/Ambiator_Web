import { Button, Card, CardActions, Grid, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'

const ReportOfDevice = () => {
    const columns = [
        {
            field: 'userId',
            headerName: 'Location',
            width: 250,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'branch',
            headerName: 'Branch',
            width: 250,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'ip',
            headerName: 'IP Address',
            width: 250,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'Device',
            headerName: 'Device Name',
            width: 250,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'name',
            headerName: 'Description',
            width: 300,
            align: 'center',
            headerAlign: 'center'
        },
        // {
        //   field: 'actions',
        //   type: 'actions',
        //   headerName: 'Actions',
        //   headerAlign: 'center',
        //   width: 250,
        //   align:'center',
        //   cellClassName: 'actions',
        //   getActions: (params) => [
        //     <EditData selectedRow={params.row} />,
        //     <DeleteData selectedRow={params.row} />,
        //   ],
        // },
    ];
    return (
        <div style={{ width: '100%', height: '80vh' }}>
            <Grid container style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Card
                        style={{
                            borderRadius: '20px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.2s',
                            width: '100%',
                            height: '15vh',
                            overflow: 'auto'
                        }}
                    >
                        <CardActions>
                            <Typography style={{ display: 'flex', fontSize: '25px', fontWeight: 'bolder', color: 'rgb(70, 65, 65)' }}>
                                REPORT
                            </Typography>
                        </CardActions>
                        <CardActions >
                            <Grid container spacing={2} style={{display:'flex',alignItems: 'center'}}>
                                <Grid item xs={12} sm={12} md={2} lg={3} xl={3}>
                                    <TextField
                                        style={{ backgroundColor: '#F7F7F7', color: 'black' }}
                                        fullWidth
                                        id="standard-basic"
                                        label="Location"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
                                    <TextField
                                        style={{ backgroundColor: '#F7F7F7', color: 'black' }}
                                        fullWidth
                                        id="outlined-basic"
                                        label="Branch"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
                                    <TextField
                                        style={{ backgroundColor: '#F7F7F7', color: 'black' }}
                                        fullWidth
                                        id="outlined-basic"
                                        label="Description"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={1} xl={1}>
                                    <Button
                                        style={{ borderRadius: '15px', color: 'white', backgroundColor: '#18143D', fontWeight: 'bold' }}
                                        variant="contained">
                                        Submit
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={1} xl={1}>
                                    <Button
                                        style={{ borderRadius: '15px', color: 'white', backgroundColor: '#18143D', fontWeight: 'bold' }}
                                        variant="contained">
                                        Download
                                    </Button>
                                </Grid>

                            </Grid>


                        </CardActions>
                    </Card>
                </Grid>
                <Grid item sm={12} style={{ marginTop: '10px' }}>
                    <Card
                        style={{
                            borderRadius: '20px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.2s',
                            width: '100%',
                            height: '65vh'
                        }}
                    >
                        <CardActions >
                            <DataGrid
                                sx={{ border: 'none', fontWeight: 'bold', fontSize: '16px', height: '65vh' }}
                                rows={[]}
                                columns={columns}
                            // pageSize={3}
                            //   loading={isLoading}
                            // rowsPerPageOptions={[3]}
                            // disableSelectionOnClick
                            />
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default ReportOfDevice