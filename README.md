[![Build Status](https://travis-ci.org/MarcoWorms/isomorphic-benchmark.svg?branch=master)](https://travis-ci.org/MarcoWorms/isomorphic-benchmark)

`npm install isomorphic-benchmark --save`

Node
```javascript
const runBenchmark = require('isomorphic-benchmark')
```

Browser (adds a global "runBenchmark")
```javascript
<script src="./dist/benchmark.js"></script>
```

Example test
```javascript
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

Example result handling in node:
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

Example result handling in browser:
```javascript
const results = runBenchmark(aBenchmark)
console.log(JSON.stringify(results, null, 4))
```

or displayed as tabular data using [console.table](https://developer.mozilla.org/en-US/docs/Web/API/Console/table)
```javascript
const results = runBenchmark(aBenchmark);
results.iterations.forEach(console.table)
```

Full example:
```javascript
const aBenchmark = {
  description: 'sum',
  iterations: iterationAmount,
  tests: [
    {
      description: 'sugar',
      amount: 100000,
      testFunc: (persist) => {
        persist.test.foo += 1
        persist.iteration.bar += 1
      }
    },
    {
      description: 'nosugar',
      amount: 100000,
      testFunc: (persist) => {
        persist.test.foo = persist.test.foo + 1
        persist.iteration.bar = persist.iteration.bar + 1
      }
    },
  ],
  beforeEachTestFunc: (persist) => {
    // you can add stuff to persist other than test or iteration that will persist the whole benchmark.
    persist.myVar = 1
  },
  persistTest: () => {
    return {
      foo: 0
    }
  },
  persistIteration: () => {
    return {
      bar: 0
    }
  }
}
```
