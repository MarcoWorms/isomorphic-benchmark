const runBenchmark = require('./index')

const aBenchmark = {
  description: 'sum',
  iterations: 10,
  tests: [
    {
      description: 'Maneira 1',
      amount: 1000,
      testFunc: (persist) => {
        var list = Array(100000).fill().map((x, index) => index)
      }
    },
    {
      description: 'Maneira 2',
      amount: 1000,
      testFunc: (persist) => {
        var list = [...Array(100000).keys()]
      }
    },
    {
      description: 'Maneira 3',
      amount: 1000,
      testFunc: (persist) => {
        var list = Array.from(Array(100000)).map((x, index) => index)
      }
    },
    {
      description: 'Maneira 4',
      amount: 1000,
      testFunc: (persist) => {
        var list = Array.apply(null, Array(100000)).map((x, index) => index)
      }
    }
  ]
}
const results = runBenchmark(aBenchmark)

var fs = require('fs');
var outputFilename = './results/' + results.description + '.json';

fs.writeFile(outputFilename, JSON.stringify(results, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
});
