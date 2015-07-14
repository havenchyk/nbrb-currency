import got from 'got';
import moment from 'moment';
import fs from 'fs';
import {parseString} from 'xml2js';

const currentDate = moment().format('MM/DD/YYYY'),
      endPoint = 'http://www.nbrb.by/Services/XmlExRates.aspx',
      temporaryFileName = 'currency.xml';

export default (date, cb) => {
    if (typeof date === 'function') {
        cb = date;
        date = currentDate;
    }

    let url = endPoint + '?ondate=' + date;

    got(url, function (err, data) {
        if (err) {
            cb(err);
            return;
        }

        parseString(data, function (err, jsonData) {
            if (err) {
                cb(err);
                return;
            }

            let day = jsonData.DailyExRates['$'].Date;
            let currencies = jsonData.DailyExRates['Currency'].map((item) => {
                return {
                    charCode: item.CharCode[0],
                    name: item.Name[0],
                    rate: item.Rate[0]
                };
            });

            let dateForDist = {
                date: day,
                currencies: currencies
            };

            cb(null, dateForDist);
        });
    });
};