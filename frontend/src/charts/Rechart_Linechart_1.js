import React, { useEffect, useState } from 'react'
import { LineChart, Legend, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import dd from '../utilities/Debugger'

const Rechart_1 = (props) => {

    let [data, setData] = useState({})

    useEffect(() => {


        setData(props.data)
        dd(data)

    }, [props.data])

    // so I need to restructure my data in order to render it into something

/*     <ResponsiveContainer width={700} height="80%">
    <AreaChart data={data}
      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
      <ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  </ResponsiveContainer> */

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dateString" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="energy" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="cries" stroke="#82ca9d" />
        <Line type="monotone" dataKey="rest" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Rechart_1
