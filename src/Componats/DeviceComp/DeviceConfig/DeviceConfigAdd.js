import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

const DeviceConfigAdd = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: '40%' } }}
      maxWidth="sm"
      open={open}
    >
      <DialogTitle sx={{ fontWeight: '600', letterSpacing: '1px', textAlign: 'center', color: 'white', backgroundColor: '#18143D' }}>
        Add Device
      </DialogTitle>
      <DialogContent style={{ paddingRight: '15+px' }} >
        <form >
          <Grid container spacing={2} style={{ marginTop: '10px' }}>
            <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
              <TextField
                style={{ backgroundColor: '#F7F7F7', color: 'black' }}
                fullWidth
                id="standard-basic"
                label="MAC ID"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
              <TextField
                style={{ backgroundColor: '#F7F7F7', color: 'black' }}
                fullWidth
                id="outlined-basic"
                label="Product Type"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
              <TextField
                style={{ backgroundColor: '#F7F7F7', color: 'black' }}
                fullWidth
                id="outlined-basic"
                label="Machine Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
              <FormControl  style={{ backgroundColor: '#F7F7F7', color: 'black' }} fullWidth>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Location"
                // onChange={handleChange}
                >
                  <MenuItem value={10}>Mangalore</MenuItem>
                  <MenuItem value={20}>Udupi</MenuItem>
                  <MenuItem value={30}>Bangalore</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
              <TextField
                style={{ backgroundColor: '#F7F7F7', color: 'black' }}
                fullWidth
                id="outlined-basic"
                label="Affiliate Code / Name"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={6} xl={6}>
              <TextField
                style={{ backgroundColor: '#F7F7F7', color: 'black' }}
                fullWidth
                id="outlined-basic"
                label="Description"
                variant="outlined"
              />
            </Grid>

          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          style={{ borderRadius: '15px', color: 'white', backgroundColor: '#18143D', fontWeight: 'bold' }}
          variant="contained">
          Add
        </Button>
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

export default DeviceConfigAdd