import got from 'got';
import moment from 'moment';
import fs from 'fs';
import {parseString} from 'xml2js';

const currentDate = moment().format('MM/DD/YYYY'),
      endPoint = 'http://www.nbrb.by/Services/XmlExRates.aspx',
      temporaryFileName = 'currency.xml';



function normalizeArguments(opts) {
    if (!opts) {
        opts = {};
        opts.date = currentDate;
    } else if (typeof opts === 'string') {
        const date = opts;
        opts = {};
        opts.date = date;
    }

    if (!opts.date) {
        opts.date = currentDate;
    }

    opts.url = `${endPoint}?ondate=${opts.date}`;

    return opts;
}

function asCallback(opts, cb) {
    got.get(opts.url, function(err, xml) {
        if (err) {
            cb(err);
            return;
        }

        parseString(xml, (err, data) => {
            if (err) {
                cb(err);
                return;
            }

            cb(null, normalizeResponse(data))
        });
    });
}

function asPromise(opts) {
  return new Promise(function (resolve, reject) {
		asCallback(opts, function (err, data) {
			if (err) {
				reject(err);
				return;
			}

			resolve(data);
		});
	});
}

function download(opts, cb) {
	if (typeof opts === 'function') {
		cb = opts;
		opts = {};
	}

	opts = normalizeArguments(opts);

	if (cb) {
		asCallback(opts, cb);
		return;
	}

	return asPromise(opts);
}

function normalizeResponse(jsonData) {
    const day = jsonData.DailyExRates['$'].Date;
    const currencies = jsonData.DailyExRates['Currency'].map(item => {
        return {
            charCode: item.CharCode[0],
            name: item.Name[0],
            rate: item.Rate[0]
        };
    });

    const dateForDist = {
        date: day,
        currencies: currencies
    };

    return dateForDist;
}

export default download;
