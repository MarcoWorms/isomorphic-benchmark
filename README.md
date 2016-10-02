*chrome implementation still on the way*

`npm install isomorphic-benchmarker --save`

```javascript
runBenchmark = require('benchmarker')
const aBenchmark = {
  description: 'sum',
  iterations: iterationAmount,
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
```
