import React, { useEffect, useState } from 'react'
import { AreaChart, Area, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import dd from '../utilities/Debugger'

const Rechart_1 = (props) => {

    let [data, setData] = useState({})

    useEffect(() => {


        setData(props.data)
        dd(data)

    }, [props.data])

    let legend = [
      {
        name: "rest",
        dataName: "rest",
        stroke: '#544fb3',
        fill: '#8884d8'
      },
      {
        name: "energy",
        dataName: "energy_total",
        stroke: '#ff8c00',
        fill: '#ffd24a'
      },
      {
        name: "cries",
        dataName: "cries",
        stroke: '#0f5a94',
        fill: '#8accff'
      },
    ]

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
      <div className = "dashBoard">
        <div className = "recharts-container">
          <div className = "chart-overflow">
            <ResponsiveContainer width="99%" height={200}>
              <AreaChart
                data={data}
                margin={{ top: 30, right: 14, left: -14, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey = "niceDate"  />
                <YAxis />
                <Tooltip />
                <Area
                  type='monotone'

                  dataKey='rest'
                  stroke={legend[0].stroke}
                  fill={legend[0].fill}
                />

                <Area
                  type='monotone'

                  dataKey='energy_total'
                  stroke={legend[1].stroke}
                  fill={legend[1].fill}
                />

                <Area
                  type='monotone'

                  dataKey='cries'
                  stroke={legend[2].stroke}
                  fill={legend[2].fill}
                />
              </AreaChart>
            </ResponsiveContainer>
            </div>
        </div>
        <div className = "my-legend">
        {legend.map((i) =>
                <div
                key = {`legend-${i.name}`}
                style = {{color: i.stroke, background: i.fill}}
                className = "legend-item">
                  {i.name}
                </div>)
        }
        </div>
      </div>
     );
}

export default Rechart_1
