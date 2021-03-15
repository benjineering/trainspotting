const crypto = require('crypto')
const fetch = require('node-fetch')

const devId = 3001824
const apiKey = '4033c365-a35d-4999-8ef0-d41ff066904c'

const trainRouteType = 0
const vLineRouteType = 3

const laraStopId = 1534
const eastRichmondStopId = 1059

let path = `/v3/stops/${laraStopId}/route_type/${vLineRouteType}`
//let path = `/v3/routes`

path += `?devid=${devId}`

const signature = crypto
  .createHmac('sha1', apiKey)
  .update(path)
  .digest('hex')

const url = `http://timetableapi.ptv.vic.gov.au${path}&signature=${signature}`

fetch(url)
  .then(x => x.status === 200 ? x.json() : `${x.status} ${x.statusText}`)
  .then(console.log)
  .catch(console.error)
