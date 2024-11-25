import React, { useEffect, useState } from 'react';
import DashboardData from '../DashboadComp/DashboadData';
import { Button, Fab, Grid } from '@mui/material';
import AlertDrillDown from './DrillDown/AlertDrillDown';
import DrillDownUnitLevel from './DrillDown/DrillDownUnitLevel';
import UnitLevelWeaher from './DrillDown/UnitLevelWeaher';
import ViewManage from './DrillDown/ViewManage';
import ChallengeHistory from './DrillDown/ChallengeHistory';
import ViewHistory from './DrillDown/ViewHistory';
import logo from '../../Images/rdllogo.png';
import AlertView from './DrillDown/AlertView';
import AccessTable from './DrillDown/AccessTable';
import ApplicationStore from '../Utility/localStorageUtil';
import { useData } from '../GlobleDataSet/GlobleDataSet';
import LockPersonTwoToneIcon from '@mui/icons-material/LockPersonTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import UpdateWifi from './DrillDown/UpdateWifi';
import PasswordAffliate from './DrillDown/PasswordAffliate';


const MainDashboardComp = () => {
  const [isDashboard, setIsDashboard] = useState(0);
  const [isId, setIsId] = useState(0);
  const [filterId, setFilterId] = useState('');
  const [selectedData, setSelectedData] = useState([]);
  console.log("selectedData000000>", selectedData)
  const { userDetails } = ApplicationStore().getStorage('userDetails');
  const { selectedDashboard, setSelectedDashboard } = useData();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("selectedDashboard00000==>", selectedDashboard);

    if (isDashboard !== 0) {
      setIsDashboard(selectedDashboard);
      setSelectedDashboard(null)
    }

  }, [selectedDashboard]);

  return (
    <div style={{ marginTop: '10px' }}>
      {isDashboard !== 0 ? (
        <Grid style={{ display: 'flex', marginTop: '-10px' }}>
          <Button onClick={() => {
            if (isDashboard === 4 || isDashboard === 5 || isDashboard === 2) {
              setIsDashboard(1);
            } else {
              setIsDashboard(0);
            }
          }}
            style={{ borderRadius: '15px', color: 'white', backgroundColor: '#02316a', fontFamily: 'Readex Pro', fontWeight: 'bold', }}
            variant="contained">
            back
          </Button>
        </Grid>
      ) : (
        <></>
      )

      }
      {isDashboard === 0 ? (
        <DashboardData
          isId={isId}
          setIsDashboard={setIsDashboard}
          setFilterId={setFilterId}
          filterId={filterId}
          setSelectedData={setSelectedData}
        />
      ) : isDashboard === 1 ? (
        <DrillDownUnitLevel
          isId={isId}
          setIsDashboard={setIsDashboard}
          selectedData={selectedData}
        />
      ) : isDashboard === 2 ? (
        <UnitLevelWeaher
          isId={isId}
        />
      ) : isDashboard === 3 ? (
        <AlertDrillDown
          setIsId={setIsId}
          setIsDashboard={setIsDashboard}
          setSelectedData={setSelectedData}
          filterId={filterId}
        />

      ) : isDashboard === 4 ? (
        <ViewManage
          isId={isId}
          selectedData={selectedData}
        />

      ) : isDashboard === 5 ? (
        <ChallengeHistory
          selectedData={selectedData}
          isId={isId}

        />
      ) :
        isDashboard === 6 ? (
          <ViewHistory
            setIsId={setIsId}
            selectedData={selectedData}
            filterId={filterId}
            setIsDashboard={setIsDashboard}
            setSelectedData={setSelectedData}

          />
        ) : isDashboard === 7 ? (
          <AlertView
            setIsId={setIsId}
            selectedData={selectedData}
            filterId={filterId}
            setIsDashboard={setIsDashboard}
            setSelectedData={setSelectedData}

          />
        ) : isDashboard === 8 ? (
          <AccessTable
            selectedData={selectedData}
          />
        ) :
          (<>
          </>)}
      <footer style={{ backgroundColor: "white", height: '5vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px', fontFamily: 'Readex Pro', marginTop: '15px', fontSize: '15px' }}>
        <Grid container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Grid item>
            AMBIATOR Pvt. Ltd.
          </Grid>
        </Grid>

        {userDetails?.userRole === "affiliate" && isDashboard === 3 && userDetails?.afiliateCode?.startsWith('caas') && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Fab variant="extended" style={{ height: '39px' }}
              onClick={() => {
                setOpen(true);
              }}
            >
              <LockPersonTwoToneIcon sx={{ mr: 1 }} />
              Lock
            </Fab>
          </div>
        )}
        <PasswordAffliate
          open={open}
          setOpen={setOpen}
        />
      </footer>

    </div>
  );
};

export default MainDashboardComp;
