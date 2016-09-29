'use strict'

const makeArray = length =>
  Array.from({length})

const repeat = (length, func) =>
  makeArray(length)
    .forEach((el, index) =>
      func(index)
    )

const runTest = (test, testDescription, testRepetitionAmount, persist) => {
  var timerStart = performance.now();
  repeat(testRepetitionAmount, () => test(persist))
  var timerEnd = performance.now();
  return (timerEnd - timerStart)
}

const runBenchmark = (benchmark) => {
  const results = []
  repeat(benchmark.iterations, (iteration) => {
    const persist = {}
    persist.iteration = benchmark.persistIteration && benchmark.persistIteration() || {}
    const testDescriptions = Object.keys(benchmark.tests)
    const iterationResult = []
    testDescriptions.forEach((testDescription, subjectIndex) => {
      persist.test = benchmark.persistTest && benchmark.persistTest() || {}
      const test = benchmark.tests[testDescription].test
      const testRepetitionAmount = benchmark.tests[testDescription].repeat
      iterationResult[subjectIndex] = {}
      iterationResult[subjectIndex].description = testDescription
      iterationResult[subjectIndex].result = runTest(test, testDescription, testRepetitionAmount, persist)
      iterationResult[subjectIndex].timesRepeated = testRepetitionAmount
    })
    results.push(iterationResult)
  })
  return results
}

const aBenchmark = {
  name: 'Another sum methods',
  iterations: 5,
  tests: {
    'add 1 to a iteration var without sugar sintax': {
      repeat: 500000,
      test: (persist) => {
        persist.iteration.foo = persist.iteration.foo + 1
      }
    },
    'add 1 to a iteration var with sugar sintax':{
      repeat: 500000,
      test: (persist) => {
        persist.iteration.foo += 1
      }
    },
    'add 1 to a test var without sugar sintax':{
      repeat: 500000,
      test: (persist) => {
        persist.test.bar = persist.test.bar + 1
      }
    },
    'add 1 to a test var with sugar sintax':{
      repeat: 500000,
      test: (persist) => {
        persist.test.bar += 1
      }
    }
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
const benchmarkResults = runBenchmark(aBenchmark)
console.dir(benchmarkResults)
