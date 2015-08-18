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
    } else if (!date) {
      date = currentDate;
    }

    const url = `${endPoint}?ondate=${date}`;

    return got.get(url).then(res => {
          const xml = res.body;

          return new Promise(function(resolve) {
            parseString(xml, (err, jsonData) => {
                    if (err) {
                        return;
                    }

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

                    resolve(dateForDist);
                });
          })
      })
      .catch(console.error);
};
