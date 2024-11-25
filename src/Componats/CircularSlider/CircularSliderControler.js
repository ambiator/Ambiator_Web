import React, { useEffect, useState } from 'react';
import CircularSlider from 'react-circular-slider-svg';
import { Grid } from '@mui/material';
import ApplicationStore from '../Utility/localStorageUtil';


const CircularSliderControler = (props) => {
    const { handleChangeSetPoint } = props;
    console.log(props.setpoint)
    const [value1, setValue1] = useState(props.setpoint);
    const { userDetails } = ApplicationStore().getStorage('userDetails');


    useEffect(() => {
        setValue1(props.setpoint);
    }, [props.setpoint]);

    return (
        <div>
            <Grid sx={10} sm={10} md={12}>
                <CircularSlider
                    size={250}
                    minValue={0}
                    // maxValue={value1 > 30 ? value1 : 30}
                    maxValue={30}
                    trackWidth={19}
                    disabled={userDetails?.userRole === 'affiliate'}
                    handle1={{
                        value: value1,
                        onChange: v => setValue1(v)
                    }}
                    onControlFinished={() => {
                        if (userDetails?.userRole !== 'affiliate') {
                            handleChangeSetPoint(value1);
                        }
                    }}
                    arcColor="#00bcba"
                />

            </Grid>

        </div>
    )
}

export default CircularSliderControler