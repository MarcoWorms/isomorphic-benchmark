'use strict'
const runBenchmark = (benchmark) => {

  const makeArray = length =>
    Array.from({length})

  const repeat = (amount, func) =>
    makeArray(amount)
      .forEach( (el, index) =>
        func(index)
      )

  const doTest = (test, persist, beforeEachTestFunc) => {
    beforeEachTestFunc(persist)
    const timerStart = performance.now();
    repeat(test.amount, () => test.testFunc(persist))
    const timerEnd = performance.now();
    return (timerEnd - timerStart)
  }

  const run = (benchmark) => {
    benchmark.iterations = benchmark.iterations || 1
    const results = {
      description: benchmark.description,
      iterations: []
    }
    repeat(benchmark.iterations, (iteration) => {
      const persist = {}
      persist.iteration = benchmark.persistIteration && benchmark.persistIteration() || {}
      const iterationResult = []
      benchmark.tests.forEach((test, testIndex) => {
        persist.test = benchmark.persistTest && benchmark.persistTest() || {}
        const result = doTest(test, persist, benchmark.beforeEachTestFunc)
        iterationResult.push( {
          description: test.description,
          amount: test.amount,
          result
        })
      })
      results.iterations.push(iterationResult)
    })
    return results
  }

  return run(benchmark)
}
