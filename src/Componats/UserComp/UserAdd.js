import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, TextField } from '@mui/material'
import React from 'react'

const UserAdd = ({ open, setOpen }) => {

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog
            sx={{ '& .MuiDialog-paper': { minWidth: '50%' } }}
            maxWidth="sm"
            open={open}
        >
            <DialogTitle sx={{ fontWeight: '600', letterSpacing: '1px', textAlign: 'center', color: 'white', backgroundColor: '#18143D' }}>
                Add User
            </DialogTitle>
            <DialogContent style={{ paddingRight: '15+px' }} >
                <form >
                    <Grid container spacing={2} style={{ marginTop: '10px' }}>
                        <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
                            <TextField style={{ backgroundColor: '#F7F7F7', color: 'black' }} fullWidth id="standard-basic" label="User Id" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
                            <TextField style={{ backgroundColor: '#F7F7F7', color: 'black' }} fullWidth id="outlined-basic" label="Email-Id" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
                            <TextField style={{ backgroundColor: '#F7F7F7', color: 'black' }} fullWidth id="outlined-basic" label="Phone" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
                            <TextField style={{ backgroundColor: '#F7F7F7', color: 'black' }} fullWidth id="outlined-basic" label="Full Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
                            <TextField style={{ backgroundColor: '#F7F7F7', color: 'black' }} fullWidth id="outlined-basic" label="Role" variant="outlined" />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    style={{ borderRadius: '15px', color: 'white', backgroundColor: '#18143D', fontWeight: 'bold' }}
                    variant="contained">
                    Cancle
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserAdd