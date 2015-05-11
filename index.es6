import download from './src/downloadXML';
import moment from 'moment';
import fs from 'fs';
import {parseString} from 'xml2js';

const currentDate = moment().format('MM/DD/YYYY'),
    endPoint = 'http://www.nbrb.by/Services/XmlExRates.aspx',
    temporaryFileName = 'currency.xml',
    encoding = 'utf-8';

export default (date, cb) => {
    if (typeof date === 'function') {
        cb = date;
        date = currentDate;
    }

    download(endPoint + '?ondate=' + date, function (xml) {
        parseString(xml, function (err, jsonData) {
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