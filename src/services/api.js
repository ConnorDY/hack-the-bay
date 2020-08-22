import axios from 'axios';

export async function getData(fips, year, parameter) {
  return axios.get(`./data/${fips}/${year}/${parameter}/data.json`);
}
