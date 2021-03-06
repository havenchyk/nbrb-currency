/* global describe, it */

import 'babel-polyfill'
import currency from './index.js'
import {expect} from 'chai'

const today = new Date()
const date = [today.getMonth() + 1, today.getDate(), today.getFullYear()].join('/')

describe('Check download functionality', function () {
  it.only('Currency object should be available', () => {
    expect(currency).to.be.a('function')
  })

  it('Should download currency for current date as callback', done => {
    currency((err, data) => {
      expect(err).to.be.a('null')

      expect(data).to.be.an('object')
      expect(data.date).to.be.a('string')
      expect(data.date.includes(date)).to.be.true

      expect(data.currencies).to.be.an('array')
      expect(data.currencies.find(item => {
        return item.charCode === 'USD'
      })).to.be.an('object')

      done()
    })
  })

  it('Should download currency for 12/24/2014 as callback', done => {
    currency('12/24/2014', (err, data) => {
      expect(err).to.be.a('null')
      expect(data).to.be.an('object')

      expect(data.date).to.be.a('string')
      expect(data.date).to.be.equal('12/24/2014')

      expect(data.currencies).to.be.an('array')
      expect(data.currencies.find(item => {
        return item.charCode === 'USD'
      }).rate).to.be.equal('10950')

      done()
    })
  })
})
