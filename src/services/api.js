import axios from 'axios';
import flatten from 'lodash.flatten';

export async function getDataMap() {
  return (await axios.get(`./data/map.json`)).data;
}

export async function getData(fips, year, parameter) {
  return (await axios.get(`./data/${fips}/${year}/${parameter}/data.json`))
    .data;
}

export async function getDataForYears(fips, parameter, yearStart, yearEnd) {
  const yearPromises = [];
  for (let year = yearStart; year <= yearEnd; year++) {
    yearPromises.push(getData(fips, year, parameter));
  }

  const years = await Promise.all(yearPromises);
  return flatten(years);
}
