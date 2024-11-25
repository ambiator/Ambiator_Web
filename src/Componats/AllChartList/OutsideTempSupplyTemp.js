import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import Chart from 'chart.js/auto';
import { Typography } from '@mui/material';

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Brush,
    ReferenceArea,
    Area,
} from 'recharts';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const OutsideTempSupplyTemp = ({ chartData }) => {
    const tooltipStyles = {
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '8px',
        color: 'black',
    };
    console.log("22222", chartData)
    return (
        <div>
            {/* <Line data={data} data1={data1} height={80} /> */}
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis allowDataOverflow domain={['auto', 'auto']} />
                    <Tooltip contentStyle={tooltipStyles} />
                    <Legend />
                    <Area type="monotone" dataKey="outTemp" fill="#8884D8" stroke="#02316a" />
                    <Area type="monotone" dataKey="supply" fill="#82CA9D" stroke="#36b1e2" />
                    <Line type="monotone" dataKey="outTemp" name="Outdoor Air Temperature" stroke="#02316a" dot={false} />
                    <Line type="monotone" dataKey="supply" name="Supply Air Temperature" stroke="#36b1e2" dot={false} />
                    <Area type="monotone" dataKey="prevOutTemp" fill="#FFD700" stroke="#FF8C00" />
                    <Area type="monotone" dataKey="prevSupply" fill="#32CD32" stroke="#008000" />
                    <Line type="monotone" dataKey="prevOutTemp" name=" prev Outdoor Air Temperature" stroke="#FF8C00" dot={false} />
                    <Line type="monotone" dataKey="prevSupply" name=" Prev Supply Air Temperature" stroke="#008000" dot={false} />
                    <Brush dataKey="time" height={30} stroke="#602bf8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default OutsideTempSupplyTemp