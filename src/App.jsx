import React, { useState, useEffect } from 'react';

import { Chart } from './components';
import { getDataMap } from './services/api';
import { parameterDictionary } from './dictionaries';

function App() {
  const [dataMap, setDataMap] = useState();
  const [fips, setFips] = useState('10001');
  const [parameter, setParameter] = useState('PH');
  const [year, setYear] = useState(2019);

  async function fetchDataMap() {
    setDataMap(await getDataMap());
  }

  useEffect(() => {
    fetchDataMap();
  }, []);

  return dataMap ? (
    <>
      <form>
        <div>
          <label htmlFor="fips">FIPS:</label>{' '}
          <select
            id="fips"
            value={fips}
            onChange={(e) => setFips(e.target.value)}
          >
            {Object.keys(dataMap).map((key) => (
              <option key={key}>{key}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="year">Year:</label>{' '}
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {Object.keys(dataMap[fips]).map((key) => (
              <option key={key}>{key}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="parameter">Parameter:</label>{' '}
          <select
            id="parameter"
            value={parameter}
            onChange={(e) => setParameter(e.target.value)}
          >
            {dataMap[fips][year].map((key) => (
              <option value={key} key={key}>
                {parameterDictionary[key] ? parameterDictionary[key] : key}
              </option>
            ))}
          </select>
        </div>
      </form>

      <h2>
        {parameterDictionary[parameter]
          ? parameterDictionary[parameter]
          : parameter}{' '}
        over Time
      </h2>
      <Chart fips={fips} parameter={parameter} year={year} />
    </>
  ) : (
    <>{/* TODO: add spinner */}</>
  );
}

export default App;
