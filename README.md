superagent-promises
===================

Wraps superagent requests in ES6 promises (see the [es6 promises polyfill](https://github.com/jakearchibald/es6-promise) and [mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for W3C Promise API documentation).

## Usage

e.g

```javascript
require('superagent').get('http://api.mysite.com/?id=23432').use(require('superagent-promises')).end();
```
