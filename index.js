import { parseString } from 'xml2js'
import fetch from 'isomorphic-fetch'

const today = new Date()
const currentDate = [today.getMonth() + 1, today.getDate(), today.getFullYear()].join('/')
const endPoint = 'http://www.nbrb.by/Services/XmlExRates.aspx'

function normalizeArguments (opts) {
  if (!opts) {
    opts = {}
    opts.date = currentDate
  } else if (typeof opts === 'string') {
    const date = opts
    opts = {}
    opts.date = date
  }

  if (!opts.date) {
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

function asCallback (opts, cb) {
  fetch(opts.url)
    .then(prepareResponse)
    .then(xml => {
      parseString(xml, (err, data) => {
        if (err) {
          cb(err)
          return
        }

        cb(null, normalizeResponse(data))
      })
    })
    .catch(err => cb(err))
}

function asPromise (opts) {
  return new Promise((resolve, reject) => {
    asCallback(opts, function (err, data) {
      if (err) {
        reject(err)
        return
      }

      resolve(data)
    })
  })
}

function download (opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  }

  opts = normalizeArguments(opts)

  if (cb) {
    asCallback(opts, cb)
    return
  }

  return asPromise(opts)
}

function normalizeResponse (jsonData) {
  const day = jsonData.DailyExRates['$'].Date
  const currencies = jsonData.DailyExRates['Currency'].map(item => {
    return {
      charCode: item.CharCode[0],
      name: item.Name[0],
      rate: item.Rate[0]
    }
  })

  return {
    date: day,
    currencies: currencies
  }
}

export default download
