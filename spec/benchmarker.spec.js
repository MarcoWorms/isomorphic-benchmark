const benchmark = require('../src/benchmark')

const repeat = benchmark.repeat
const makeArray = benchmark.makeArray
const runBenchmark = benchmark.runBenchmark

describe('Make Array', () => {

  it('should make an array for a given length', () => {
    const a = makeArray(100)
    expect(a.length).toEqual(100)

    const b = makeArray(250)
    expect(b.length).toEqual(250)
  })

})

describe('Repeat', () => {

  it('should repeat a function for a given amount of repetitions', () => {
    var a = 0
    repeat(100, () => a += 1 )
    expect(a).toEqual(100);

    var b = 0
    repeat(250, () => b += 1 )
    expect(b).toEqual(250);
  });

});

describe('Benchmarker', () => {
  it('should output results', () => {
    const iterationAmount = 20

    const aBenchmark = {
      description: 'empty element inner HTML',
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
    expect(results).toBeDefined()
    expect(results.iterations.length).toEqual(iterationAmount)
  })

})
