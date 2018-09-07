/**
 * Created by lipeng on 2018/9/6.
 */
// 72517.810ms
function dnaHealthy (genes, health, dnas) {
  let max = Number.NEGATIVE_INFINITY, min = Number.POSITIVE_INFINITY
  dnas.forEach((dna) => {
    // useful genes and health
    let geneHealth = {}
    for (let i = dna.first; i <= dna.last; i++) {
      const key = genes[i]
      if (geneHealth[key] === undefined) {
        geneHealth[key] = health[i]
      } else {
        geneHealth[key] += health[i]
      }
    }
    return

    // loop d
    const len = dna.d.length
    let sum = 0
    for (let i = 0; i !== len; i++) {
      for (let key in geneHealth) {
        if (dna.d.indexOf(key, i) === i) {
          sum += geneHealth[key]
        }
      }
    }

    // compare
    max = sum > max ? sum : max
    min = sum < min ? sum : min
  })
  console.log(`${min} ${max}`)
}

// 185296.631ms
function dnaHealthy1 (genes, health, dnas) {
  let max = Number.NEGATIVE_INFINITY, min = Number.POSITIVE_INFINITY
  dnas.forEach((dna) => {
    // useful genes and health
    /*
    let target = {
      a: {
        num: 100,
        children: {
          b: {
            num: 101,
            children: {}
          },
          c: {
            num: 200,
            children: {}
          }
        }
      }
    }
    */
    let geneHealth = {}
    for (let i = dna.first; i <= dna.last; i++) {
      const key = genes[i]
      let tmp = geneHealth
      for (let j = 0; j !== key.length; j++) {
        const letter = key[j]
        if (!tmp[letter]) {
          tmp[letter] = {
            num: 0,
            children: {}
          }
        }
        tmp = tmp[letter]
      }
      tmp.num += health[i]
    }

    // loop d
    const len = dna.d.length
    let sum = 0
    for (let i = 0; i !== len; i++) {
      for (let j = i, tmp = geneHealth; j !== len; j++) {
        const letter = dna.d[j]
        if (tmp[letter]) {
          sum += tmp[letter].num
          tmp = tmp[letter]
        } else {
          break
        }
      }
    }

    // compare
    max = sum > max ? sum : max
    min = sum < min ? sum : min
  })
  console.log(`${min} ${max}`)
}

// 885296.631ms
function dnaHealthy2 (genes, health, dnas) {
  let max = Number.NEGATIVE_INFINITY, min = Number.POSITIVE_INFINITY
  dnas.forEach((dna) => {
    // loop d
    const len = dna.d.length
    let sum = 0
    for (let i = 0; i !== len; i++) {
      for (let j = dna.first; j <= dna.last; j++) {
        if (dna.d.indexOf(genes[j], i) === i) {
          sum += health[j]
        }
      }
    }

    // compare
    max = sum > max ? sum : max
    min = sum < min ? sum : min
  })
  console.log(`${min} ${max}`)
}

// 77395.275ms
function dnaHealthy3 (genes, health, dnas) {
  let max = Number.NEGATIVE_INFINITY, min = Number.POSITIVE_INFINITY

  const len = genes.length
  let geneHealth = {}
  for (let i = 0; i !== len; i++) {
    const key = genes[i]
    if (geneHealth[key] === undefined) {
      geneHealth[key] = {}
    }
    geneHealth[key][i] = health[i]
  }
  dnas.forEach((dna) => {
    // loop d
    const len = dna.d.length
    let sum = 0
    for (let i = 0; i !== len; i++) {
      for (let key in geneHealth) {
        if (dna.d.indexOf(key, i) === i) {
          for (let index in geneHealth[key]) {
            index = parseInt(index)
            if (index <= dna.last && index >= dna.first) {
              sum += geneHealth[key][index]
            }
          }
        }
      }
    }

    // compare
    max = sum > max ? sum : max
    min = sum < min ? sum : min
  })
  console.log(`${min} ${max}`)
}

// test1
/*const genes = ['a', 'b', 'c', 'aa', 'd', 'b']
const health = [1, 2, 3, 4, 5, 6]
const dnas = [
  {
    first: 1,
    last: 5,
    d: 'caaab'
  },
  {
    first: 0,
    last: 4,
    d: 'xyz'
  },
  {
    first: 2,
    last: 4,
    d: 'bcdybc'
  }
]
dnaHealthy1(genes, health, dnas)*/

// test2
const {genes} = require('./test-case1/genes')
const {health} = require('./test-case1/health')
let {dnas} = require('./test-case1/dnas')
console.time('test2')
dnaHealthy3(genes, health, dnas)
console.timeEnd('test2')
console.log('here')
