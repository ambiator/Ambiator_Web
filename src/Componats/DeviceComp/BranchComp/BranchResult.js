import React from 'react'
import { Card, CardActions, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BranchTitle from './BranchTitle';
import BranchAdd from './BranchAdd';


const BranchResult = () => {
    const [open, setOpen] = useState(false);
    const [isAddButton,setIsAddButton] = useState(true);
    const [editData,setEditData] = useState([]);
    const [deleteCon,setDeleteCon] = useState(false);
    const [id,setId] = useState('');

    const columns = [
        {
            field: 'userId',
            headerName: 'Location',
            width: 300,
            align: 'center',
            headerAlign: 'center'
        },
        {
            field: 'branch',
            headerName: 'Branch',
            width: 300,
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
        {
          field: 'actions',
          type: 'actions',
          headerName: 'Actions',
          headerAlign: 'center',
          width: 300,
          align:'center',
          cellClassName: 'actions',
          getActions: (params) => [
            <EditData selectedRow={params.row} />,
            <DeleteData selectedRow={params.row} />,
          ],
        },
    ];

    const EditData=(props)=>{
        return(
            <DeleteIcon 
            onClick={() => {
                setId(props.selectedRow.id);
                setDeleteCon(true);
              }}
              style={{ cursor: 'pointer',color:'#18143D' }}
            />
        )

    }

    const DeleteData=(props)=>{
        <EditIcon 
        onClick={(event) => {
            setIsAddButton(false);
            setEditData(props.selectedRow);
            setOpen(true);
          }}
          style={{ cursor: 'pointer',color:'#18143D' }}
        />
    }

  return (
     <div style={{ width: '100%', height: '80vh' }}>
            <BranchTitle
                setOpen={setOpen}
            />
            <Grid container style={{ marginTop: '20px' }}>
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

                            sx={{ border: 'none',  fontWeight: 'bold', fontSize: '16px', height: '65vh' }}
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
            <BranchAdd
                open={open}
                setOpen={setOpen}
            />
        </div>
  )
}

export default BranchResult