'use strict'

const makeArray = length =>
  Array.from({length})

const repeat = (length, func) =>
  makeArray(length)
    .forEach((el, index) =>
      func(index)
    )

const runTest = (test, persist) => {
  var timerStart = performance.now();
  repeat(test.amount, () => test.testFunc(persist))
  var timerEnd = performance.now();
  return (timerEnd - timerStart)
}

const runBenchmark = (benchmark) => {
  const results = {
    description: benchmark.description,
    iterations: []
  }
  repeat(benchmark.iterations, (iteration) => {
    const persist = {}
    const iterationResult = []
    persist.iteration = benchmark.persistIteration && benchmark.persistIteration() || {}
    benchmark.tests.forEach((test, subjectIndex) => {
      persist.test = benchmark.persistTest && benchmark.persistTest() || {}
      iterationResult.push(
        Object.assign(test, {
          result: runTest(test, persist)
        })
      )
    })
    results.iterations[iteration] = iterationResult
  })
  return results
}

const aBenchmark = {
  description: 'benchmark different ways to sum in different scopes',
  iterations: 5,
  tests: [
    {
      description: 'add 1 to a iteration var without sugar sintax',
      amount: 500000,
      testFunc: (persist) => {
        persist.iteration.foo = persist.iteration.foo + 1
      }
    },
    {
      description: 'add 1 to a iteration var with sugar sintax',
      amount: 500000,
      testFunc: (persist) => {
        persist.iteration.foo += 1
      }
    },
    {
      description: 'add 1 to a test var without sugar sintax',
      amount: 500000,
      testFunc: (persist) => {
        persist.test.bar = persist.test.bar + 1
      }
    },
    {
      description: 'add 1 to a test var with sugar sintax',
      amount: 500000,
      testFunc: (persist) => {
        persist.test.bar += 1
      }
    }
  ],
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
const benchmarkResults = runBenchmark(aBenchmark)
console.log(benchmarkResults)
