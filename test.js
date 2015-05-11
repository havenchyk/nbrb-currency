import currency from './index.es6';
import moment from 'moment';
import {expect} from 'chai';

it('Should download currency for today', (done) => {
    currency((err, data) => {
        expect(err).to.be.a('null');
        expect(data).to.be.an('object');

        expect(data.date).to.be.a('string');
        expect(data.date).to.be.equal(moment().format('MM/DD/YYYY'));

        expect(data.currencies).to.be.an('array');
        expect(data.currencies.find((item) => {
            return item.charCode === 'USD';
        })).to.be.an('object');

        done();
    });
});

it('Should download currency for another day', (done) => {
    currency('12/24/2014', (err, data) => {
        expect(err).to.be.a('null');
        expect(data).to.be.an('object');

        expect(data.date).to.be.a('string');
        expect(data.date).to.be.equal('12/24/2014');

        expect(data.currencies).to.be.an('array');
        expect(data.currencies.find((item) => {
            return item.charCode === 'USD';
        }).rate).to.be.equal('10950');

        done();
    });
});
