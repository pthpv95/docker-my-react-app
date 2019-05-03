const axios = require("axios")

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" }
})

const get = url => {
  return instance.get(url).then((response) => response.data)
}

const post = (url, body) => {
  return instance.post(url, body).then((response) => response.data)
}

export default {
  get,
  post
}
