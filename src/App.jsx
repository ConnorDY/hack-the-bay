import React, { useState } from 'react';

import { Chart } from './components';

function App() {
  const [fips, setFips] = useState('10001');
  const [parameter, setParameter] = useState('PH');
  const [year, setYear] = useState(2019);

  return (
    <>
      <form>
        <label htmlFor="fips">FIPS:</label>{' '}
        <select
          id="fips"
          value={fips}
          onChange={(e) => setFips(e.target.value)}
        >
          <option>10001</option>
          <option>10005</option>
        </select>
        <br />
        <label htmlFor="parameter">Parameter:</label>{' '}
        <select
          id="parameter"
          value={parameter}
          onChange={(e) => setParameter(e.target.value)}
        >
          <option value="NH4F">Ammonium Fluoride</option>
          <option value="PH">pH</option>
        </select>
        <br />
        <label htmlFor="year">Year:</label>{' '}
        <select
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option>2015</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
          <option>2019</option>
          <option>2020</option>
        </select>
      </form>
      <Chart fips={fips} parameter={parameter} year={year} />
    </>
  );
}

export default App;
