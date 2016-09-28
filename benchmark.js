'use strict'

const repeat = (n, func) =>
  Array(n).forEach((el, index) => func(index))


const runBenchmark = (benchmark) => {
  const sharedAll = benchmark.beforeAll && benchmark.beforeAll() || {}
  repeat(benchmark.iterations, (iteration) => {
    console.log("----  " + benchmark.name + ": iteration " + iteration + "  ----")
    benchmark.functions.forEach((func, index) => {
      const sharedEach = benchmark.beforeEach && benchmark.beforeEach() || {}
      console.time(index)
      repeat(benchmark.unitRepeat, () => func(sharedAll, sharedEach))
      console.timeEnd(index)
    })
  })
}

const exampleBasicBenchmark = {
  name: 'Sum methods basic',
  iterations: 5,
  unitRepeat: 1,
  functions: [
    () => {
      const subject = []
      for (var i = 0; i < 1000000; i++) {
        subject.push(i)
      }
    },
    () => {
      const subject = []
      Array(1000000).forEach(
        (el, index) => subject.push(index)
      )
    },
    () => {
      const subject = Array(1000000).fill(1).map(
        (el, index) => index
      )
    }
  ]
}

runBenchmark(exampleBasicBenchmark)

const exampleBenchmark = {
  name: 'Sum methods',
  iterations: 5,
  unitRepeat: 5000000,
  functions: [
    (all, each) => {
      all.aGlobal = all.aGlobal + 1
    },
    (all, each) => {
      all.aGlobal += 1
    },
    (all, each) => {
      each.aPrivate = each.aPrivate + 1
    },
    (all, each) => {
      each.aPrivate += 1
    }
  ],
  beforeAll: () => {
    return {
      aGlobal: 1
    }
  },
  beforeEach: () => {
    return {
      aPrivate: 1
    }
  }
}

runBenchmark(exampleBenchmark)
