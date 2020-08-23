import axios from 'axios';

export async function getDataMap() {
  return (await axios.get(`./data/map.json`)).data;
}

export async function getData(fips, year, parameter) {
  return (await axios.get(`./data/${fips}/${year}/${parameter}/data.json`))
    .data;
}
