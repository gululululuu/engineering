import axios from 'axios'

const ERR_OK = 0
const request = axios.create({
  baseURL: 'http://localhost:3000'
})
export function get (url) {
  return function (params) {
    return axios.get(url, {
      params
    }).then((res) => {
      const { error, data } = res.data
      if (error === ERR_OK) {
        return data
      }
    }).catch((e) => {})
  }
}
export default request
