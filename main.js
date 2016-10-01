
const aBenchmark = {
  description: 'empty element inner HTML',
  iterations: 20,
  tests: [
    {
      description: 'innerHTML',
      amount: 100000,
      testFunc: (persist) => {
        document.querySelector('.test-area').innerHTML = ''
      }
    },
    {
      description: 'textContent',
      amount: 100000,
      testFunc: (persist) => {
        document.querySelector('.test-area').textContent = ''
      }
    },
    {
      description: 'childNodes = new Array',
      amount: 100000,
      testFunc: (persist) => {
        document.querySelector('.test-area').childNodes = new Array();
      }
    },
    {
      description: 'while firstChild',
      amount: 100000,
      testFunc: (persist) => {
        const aNode = document.querySelector('.test-area')
        while (aNode.firstChild) {
            aNode.removeChild(aNode.firstChild);
        }
      }
    },
    {
      description: 'while lastChild',
      amount: 100000,
      testFunc: (persist) => {
        const aNode = document.querySelector('.test-area')
        while (aNode.lastChild) {
            aNode.removeChild(aNode.lastChild);
        }
      }
    },
    {
      description: 'recursive lastChild',
      amount: 100000,
      testFunc: (persist) => {
        const emptyRecursive = (aNode) => {
          if (aNode.lastChild) {
            aNode.removeChild(aNode.lastChild)
            emptyRecursive(aNode)
          }
          return
        }
        emptyRecursive(document.querySelector('.test-area'))
      }
    },
    {
      description: 'recursive firstChild',
      amount: 100000,
      testFunc: (persist) => {
        const emptyRecursive = (aNode) => {
          if (aNode.firstChild) {
            aNode.removeChild(aNode.firstChild)
            emptyRecursive(aNode)
          }
          return
        }
        emptyRecursive(document.querySelector('.test-area'))
      }
    }
  ],
  beforeEachTestFunc: (persist) => {
    document.querySelector('.test-area').innerHTML += '<p class="test-p">ay</p>'
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
const results = runBenchmark(aBenchmark)

console.log(results)
