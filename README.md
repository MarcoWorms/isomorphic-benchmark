[![Build Status](https://travis-ci.org/MarcoWorms/isomorphic-benchmark.svg?branch=master)](https://travis-ci.org/MarcoWorms/isomorphic-benchmark)

`npm install isomorphic-benchmark --save`

```javascript
const runBenchmark = require('isomorphic-benchmark')

const aBenchmark = {
  description: 'sum',
  iterations: 10,
  tests: [
    {
      description: 'sugar',
      amount: 100000,
      testFunc: () => {
        var a
        a += 1
      }
    },
    {
      description: 'nosugar',
      amount: 100000,
      testFunc: () => {
        var a
        a = a + 1
      }
    },
  ]
}
```

Example result on node:
```javascript
const results = runBenchmark(aBenchmark)

var fs = require('fs');
var outputFilename = './' + results.description + '.json';

fs.writeFile(outputFilename, JSON.stringify(results, null, 4), function(err) {
  if(err) {
    console.log(err);
  } else {
    console.log("JSON saved to " + outputFilename);
  }
});
```

Example result on chrome:
```javascript
const results = runBenchmark(aBenchmark)
console.log(JSON.stringify(results, null, 4))
```
