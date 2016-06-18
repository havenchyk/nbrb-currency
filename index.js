import { parseString } from 'xml2js'
import fetch from 'isomorphic-fetch'
import { promisify } from 'bluebird'

const today = new Date()
const currentDate = [today.getMonth() + 1, today.getDate(), today.getFullYear()].join('/')
const endPoint = 'http://www.nbrb.by/Services/XmlExRates.aspx'

const parseXML = promisify(parseString)

function normalizeArguments (opts = {}) {
  if (typeof opts === 'string') {
    const date = opts
    opts = {}
    opts.date = date
  } else if (!opts.date) {
    opts.date = currentDate
  }

  opts.url = `${endPoint}?ondate=${opts.date}`

  return opts
}

const prepareResponse = (response) => {
  if (response.status !== 200) {
    throw new Error(`Looks like there was a problem. Status Code: ${response.status}`)
  }

  return response.text()
}

function normalizeResponse ({DailyExRates}) {
  const date = DailyExRates['$'].Date
  const currencies = DailyExRates['Currency'].map(item => ({
    charCode: item.CharCode[0],
    name: item.Name[0],
    rate: item.Rate[0]
  }))

  return {date, currencies}
}

export default (opts, cb) => {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  opts = normalizeArguments(opts)

  fetch(opts.url)
    .then(prepareResponse)
    .then(xml => parseXML(xml))
    .then(data => cb(null, normalizeResponse(data)))
    .catch(err => cb(err))
}
