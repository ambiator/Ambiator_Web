import React from 'react';
import { Area, Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const SupplyTempSetPointTemp = ({ chartData2 }) => {

    const tooltipStyles = {
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '8px',
        color: 'black',
    };

    return (
        <div>
            {/* <Line data={data} data1={data1} height={80} /> */}

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData2}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis allowDataOverflow domain={[0, 38]} />
                    <Tooltip contentStyle={tooltipStyles} />
                    <Legend />
                    <Area type="monotone" dataKey="supply" fill="#8884D8" stroke="#36b1e2" />
                    <Area type="monotone" dataKey="setPoint" fill="#82CA9D" stroke="#02316a" />
                    <Line type="monotone" dataKey="supply" name="  Supply Air Temperature" stroke="#36b1e2" dot={false} />
                    <Line type="monotone" dataKey="setPoint" name=" Set Point Temperature" stroke="#02316a" dot={false} />
                    <Area type="monotone" dataKey="prevSupply" fill="#FFD700" stroke="#FF8C00" />
                    <Area type="monotone" dataKey="prevSetPoint" fill="#32CD32" stroke="#008000" />
                    <Line type="monotone" dataKey="prevSupply" name=" Prev Supply Air Temperature" stroke="#FF8C00" dot={false} />
                    <Line type="monotone" dataKey="prevSetPoint" name="Prev Set Point Temperature" stroke="#008000" dot={false} />
                    <Brush dataKey="time" height={30} stroke="#602bf8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SupplyTempSetPointTemp