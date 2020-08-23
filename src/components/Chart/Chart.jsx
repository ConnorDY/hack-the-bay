import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
} from 'recharts';
import * as d3 from 'd3';

import { getDataForYears } from '../../services/api';

export default function Chart({ fips, parameter, startYear, endYear }) {
  const [data, setData] = useState([]);

  const [ticks, setTicks] = useState([]);
  const [units, setUnits] = useState();

  const [left, setLeft] = useState('dataMin');
  const [right, setRight] = useState('dataMax');
  const [refAreaLeft, setRefAreaLeft] = useState('');
  const [refAreaRight, setRefAreaRight] = useState('');

  const years = endYear - startYear + 1;
  const yearTicks = years >= 3;

  async function fetchData() {
    const rawData = await getDataForYears(fips, parameter, startYear, endYear);
    determineUnits(rawData);
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

    const _ticks = domain.ticks(
      yearTicks ? d3.timeYear.every(1) : d3.timeMonth.every(years)
    );

    setData(_data);
    setTicks(_ticks);
  }

  function determineUnits(rawData) {
    setUnits(rawData[0].Unit);
  }

  function zoom() {
    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      setRefAreaLeft('');
      setRefAreaRight('');
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) {
      setLeft(refAreaRight);
      setRight(refAreaLeft);
    } else {
      setLeft(refAreaLeft);
      setRight(refAreaRight);
    }
    setRefAreaLeft('');
    setRefAreaRight('');
  }

  function zoomOut() {
    setLeft('dataMin');
    setRight('dataMax');
  }

  useEffect(() => {
    fetchData();
  }, [fips, parameter, startYear, endYear]);

  return data.length && ticks.length ? (
    <>
      <LineChart
        width={600}
        height={400}
        data={data}
        onMouseDown={(e) => e && e.activeLabel && setRefAreaLeft(e.activeLabel)}
        onMouseMove={(e) =>
          e && e.activeLabel && refAreaLeft && setRefAreaRight(e.activeLabel)
        }
        onMouseUp={zoom}
      >
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          dot={false}
          connectNulls
        />
        <CartesianGrid stroke="#ccc" />
        <XAxis
          name="Time"
          dataKey="time"
          type="number"
          scale="time"
          domain={[left, right]}
          ticks={ticks}
          tickFormatter={(time) => d3.timeFormat('%B %Y')(time)}
          angle={-45}
          textAnchor="end"
          interval={0}
          height={85}
          allowDataOverflow
        />
        <YAxis
          name={units}
          unit={` ${units}`}
          domain={['dataMin', 'dataMax']}
          padding={{ top: 20, bottom: 20 }}
          allowDataOverflow
        />
        <Tooltip
          labelFormatter={(time) => `date: ${d3.timeFormat('%m/%d/%Y')(time)}`}
        />
        {refAreaLeft && refAreaRight ? (
          <ReferenceArea
            x1={refAreaLeft}
            x2={refAreaRight}
            strokeOpacity={0.3}
          />
        ) : null}
      </LineChart>
      {left !== 'dataMin' ? <button onClick={zoomOut}>Zoom Out</button> : null}
    </>
  ) : (
    <>{/* TODO: add spinner */}</>
  );
}
