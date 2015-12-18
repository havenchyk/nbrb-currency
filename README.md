# nbrb-currency

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]
[![DevDependency Status][depstat-dev-image]][depstat-dev-url]
[![Coveralls Status][coveralls-image]][coveralls-url]

[![NPM](nodei-image)][nodei-url]

Package for getting of currencies of the National Bank of the Republic of Belarus.

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

[travis-url]: https://travis-ci.org/havenchyk/nbrb-currency
[travis-image]: http://img.shields.io/travis/havenchyk/nbrb-currency.svg

[depstat-url]: https://david-dm.org/havenchyk/nbrb-currency
[depstat-image]: https://david-dm.org/havenchyk/nbrb-currency.svg

[depstat-dev-url]: https://david-dm.org/havenchyk/nbrb-currency
[depstat-dev-image]: https://david-dm.org/havenchyk/nbrb-currency/dev-status.svg

[coveralls-url]: https://coveralls.io/r/havenchyk/nbrb-currency
[coveralls-image]: https://coveralls.io/repos/havenchyk/nbrb-currency/badge.svg

[nodei-url]: https://nodei.co/npm/nbrb-currency
[nodei-image]: https://nodei.co/npm/nbrb-currency.png?downloads=true
