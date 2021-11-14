import React, { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import dd from '../utilities/Debugger'

const Rechart_1 = (props) => {

    let [data, setData] = useState({})

    useEffect(() => {


        setData(props.data)
        dd(data)

    }, [props.data])

    // so I need to restructure my data in order to render it into something

    return (
      <AreaChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
         <CartesianGrid strokeDasharray="3 3" />
         <XAxis />
         <YAxis />
         <Tooltip />
         <Area
           type='monotone'
           dataKey='sleep'
           stroke='#8884d8'
           fill='#8884d8'
         />
       </AreaChart>
     );
}

export default Rechart_1
