# nbrb-currency

[![NPM version][npm-image]][npm-url]

> Returns exchange rates of the National Bank of the Republic of Belarus.

```
npm i -S nbrb-currency
```

#### Getting currency rates for today

```js
var currency = require('nbrb-currency');

currency(function(err, data) {
    var rate = data.currencies.find(function (item) {
        return item.charCode === 'USD';
    }).rate;

    console.log(rate); //it will print rate for USD for current date
});
```

#### Getting currency rates for specific date

```js
var currency = require('nbrb-currency');

currency('12/24/2014', function(err, data) {
    var rate = data.currencies.find(function (item) {
        return item.charCode === 'USD';
    }).rate;

    console.log(rate); //it will print rate for USD for date '12/24/2014': 10950
});
```

[npm-url]: https://npmjs.org/package/nbrb-currency
[npm-image]: http://img.shields.io/npm/v/nbrb-currency.svg
