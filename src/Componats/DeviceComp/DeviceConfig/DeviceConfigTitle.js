import React from 'react'
import { Card, CardActions, Fab, Grid, Typography } from '@mui/material'

const DeviceConfigTitle = ({setOpen}) => {
    const handleClickOpen=()=>{
        setOpen(true);
    }
  return (
    <Card style={{ borderRadius: '10px',boxShadow:' 0 0 10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)',transition: 'transform 0.2s'}}>
            <CardActions>
            <Grid container spacing={2} style={{display: 'flex',alignItems: 'center'}}>
                <Grid item xs={12} sm={12} md={10} lg={10} xl={10} >

                    <Typography 
                    style={{ display: 'flex',fontSize: '25px',fontWeight: 'bolder',color: 'rgb(70, 65, 65)'}}
                     >
                        DEVICE MANAGEMENT
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2} xl={2} >
                    {/* <Button>Button</Button> */}
                    <Fab 
                    onClick={handleClickOpen}
                    style={{ fontSize: '15px',   display: 'flex',fontWeight: 'bolder',width: '60%',borderRadius: '20px',color: 'white',backgroundColor: '#18143D' }}>
                        ADD DEVICE
                    </Fab>
                </Grid>
            </Grid>
            </CardActions>
        </Card>
  )
}

export default DeviceConfigTitle