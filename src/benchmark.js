'use strict'

const makeArray = length =>
  Array.from({length})

const repeat = (amount, func) =>
  makeArray(amount)
    .forEach( (el, index) =>
      func(index)
    )

const doTest = (test, persist, beforeEachTestFunc) => {
  beforeEachTestFunc && beforeEachTestFunc(persist)
  const hrtime = process.hrtime();
  repeat(test.amount, () =>
    test.testFunc(persist)
  )
  const diff = process.hrtime(hrtime);
  const resultNanoseconds = diff[0] * 1e9 + diff[1]
  return {
    description: test.description,
    amount: test.amount,
    result: `Benchmark took ${resultNanoseconds} nanoseconds`,
    resultSeconds: `Benchmark took ${resultNanoseconds / 1000000000} seconds`,
    rawResult: resultNanoseconds,
    rawResult: diff
  }
}

const doIteration = (benchmark) => {
  const persist = {}
  persist.iteration = benchmark.persistIteration && benchmark.persistIteration() || {}
  const iterationResult = []
  benchmark.tests.forEach((test, testIndex) => {
    persist.test = benchmark.persistTest && benchmark.persistTest() || {}
    iterationResult.push( doTest(test, persist, benchmark.beforeEachTestFunc) )
  })
  return iterationResult
}

const makeInitResults = (description) => {
  return {
    description,
    iterations: []
  }
}

const run = (benchmark) => {
  const iterationsAmount = benchmark.iterations || 1
  const results = makeInitResults(benchmark.description)
  const iterationResults = results.iterations
  repeat(iterationsAmount, (iteration) => {
    iterationResults.push( doIteration(benchmark) )
  })
  return results
}

const runBenchmark = (benchmark) => {
  return run(benchmark)
}

module.exports = {makeArray, repeat, doTest, runBenchmark}
