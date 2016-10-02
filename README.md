*chrome implementation is being worked on branch 'chrome-implementation'*

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
    testFunc: (persist) => {
      var a
      a += 1
    }
  },
  {
    description: 'nosugar',
    amount: 100000,
    testFunc: (persist) => {
      var a
      a = a + 1
    }
  },
  ]
}
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
