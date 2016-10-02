
`npm install benchmarker --save` * not working yet

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
