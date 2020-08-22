import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import * as d3 from 'd3';
import { getData } from '../../services/api';

export default function Chart({ fips, parameter, year }) {
  const [data, setData] = useState([]);
  const [ticks, setTicks] = useState([]);

  async function fetchData() {
    const rawData = (await getData(fips, year, parameter)).data;
    prepareData(rawData);
  }

  function prepareData(rawData) {
    const _data = rawData
      .map(({ MeasureValue, SampleDate, SampleTime }) => ({
        value: MeasureValue,
        // create date from ISO 8601 date string
        time: new Date(
          `${SampleDate.substring(0, 10)}T${SampleTime}Z`
        ).getTime(),
      }))
      // sort by date
      .sort((a, b) => a.time - b.time);

    const domain = d3
      .scaleTime()
      .domain([_data[0].time, _data[_data.length - 1].time]);

    const _ticks = domain.ticks(d3.timeMonth.every(1));

    setData(_data);
    setTicks(_ticks);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return data.length && ticks.length ? (
    <LineChart width={600} height={300} data={data}>
      <Line type="monotone" dataKey="value" stroke="#8884d8" connectNulls />
      <CartesianGrid stroke="#ccc" />
      <XAxis
        name="Time"
        dataKey="time"
        type="number"
        scale="time"
        domain={['dataMin', 'dataMax']}
        ticks={ticks}
        tickFormatter={(time) => d3.timeFormat('%B %Y')(time)}
      />
      <YAxis
        name="pH"
        unit=" pH"
        domain={['dataMin', 'dataMax']}
        padding={{ top: 20, bottom: 20 }}
      />
      <Tooltip
        labelFormatter={(time) => `date: ${d3.timeFormat('%m/%d/%Y')(time)}`}
      />
    </LineChart>
  ) : (
    <></>
  );
}
