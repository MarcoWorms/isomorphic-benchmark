'use strict'

const makeArray = length => Array.from({length})

const repeat = (length, func) =>
  makeArray(length).forEach((el, index) => func(index))


const runBenchmark = (benchmark) => {
  repeat(benchmark.iterations, (iteration) => {
    const sharedAll = benchmark.beforeAll && benchmark.beforeAll() || {}
    console.log("----  " + benchmark.name + ": iteration " + iteration + "  ----")
    benchmark.functions.forEach((func, index) => {
      const sharedEach = benchmark.beforeEach && benchmark.beforeEach() || {}
      console.time(index)
      repeat(benchmark.unitRepeat, () => func(sharedEach, sharedAll))
      console.timeEnd(index)
    })
  })
}

const basicBenchmark = {
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
      makeArray(1000000).forEach(
        (el, index) => subject.push(index)
      )
    },
    () => {
      const subject = makeArray(1000000).map(
        (el, index) => index
      )
    }
  ]
}
runBenchmark(basicBenchmark)



// const usingSharedVarsExampleBenchmark = {
//   name: 'Sum methods basic (using shared vars)',
//   iterations: 5,
//   unitRepeat: 1,
//   functions: [
//     (each) => {
//       for (var i = 0; i < 1000000; i++) {
//         each.subject.push(i)
//       }
//     },
//     (each) => {
//       Array(1000000).forEach(
//         (el, index) => each.subject.push(index)
//       )
//     },
//     (each) => {
//       each.subject = Array(1000000).fill(1).map(
//         (el, index) => index
//       )
//     }
//   ],
//   beforeEach: () => {
//     return {
//       subject: []
//     }
//   }
// }
// runBenchmark(usingSharedVarsExampleBenchmark)
//
//
//
//
// const globalIterationVarsExample = {
//   name: 'Another sum methods',
//   iterations: 5,
//   unitRepeat: 5000000,
//   functions: [
//     (each, all) => {
//       all.aGlobal = all.aGlobal + 1
//     },
//     (each, all) => {
//       all.aGlobal += 1
//     },
//     (each, all) => {
//       each.aPrivate = each.aPrivate + 1
//     },
//     (each, all) => {
//       each.aPrivate += 1
//     }
//   ],
//   beforeEach: () => {
//     return {
//       aPrivate: 1
//     }
//   },
//   beforeAll: () => {
//     return {
//       aGlobal: 1
//     }
//   }
// }
// runBenchmark(globalIterationVarsExample)
