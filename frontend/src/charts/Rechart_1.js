import React, { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import dd from '../utilities/Debugger'

const Rechart_1 = (props) => {

    let [data, setData] = useState({})

    useEffect(() => {


        setData(props.data)
        dd(data)

    }, [props.data])

    const data1 = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 }
    ];

    // so I need to restructure my data in order to render it into something

    return (
        <AreaChart
        width={350}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis dataKey="dateString" />
         <YAxis dataKey="cries"/>
         <Tooltip />
         <Area
           type='monotone'
           dataKey='dateString'
           stroke='#8884d8'
           fill='#8884d8'
         />
       </AreaChart>
    )
}

export default Rechart_1
