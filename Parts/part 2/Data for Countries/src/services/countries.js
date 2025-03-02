import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
  return axios.get(baseUrl+"all")
}

const getOne = newObject => {
  return axios.get(baseUrl.concat("/name/").concat(newObject))
}


export default {getAll, getOne}
