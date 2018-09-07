/**
 * Created by lipeng on 2018/9/6.
 */
// 185296.631ms
function dnaHealthy1 (genes, health, dnas) {
  let max = Number.NEGATIVE_INFINITY, min = Number.POSITIVE_INFINITY

  // construct trie


  dnas.forEach((dna) => {
    // useful genes and health

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

    return

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
function initTrie (genes) {
  const targetTrie = {
    // type node
    inDictionary: false,
    suffixLink: {
      // type node
    },
    dictSuffixLink: {
      // type node
    },
    a: {
      // type node
    },
    b: {
      // type node
    }
  }

  const trie = {
    inDictionary: false
  }
  const len = genes.length

  // basic
  const visited = {}
  for (let i = 0; i !== len; i++) {
    const gene = genes[i]
    if (visited[gene]) {
      continue
    } else {
      visited[gene] = true
    }

    let tmpTrie = trie
    for (let j = 0; j !== gene.length; j++) {
      const letter = gene[j]
      if (!tmpTrie[letter]) {
        tmpTrie[letter] = {
          inDictionary: false
        }
      }
      tmpTrie = tmpTrie[letter]
    }
    tmpTrie.inDictionary = true
  }

  // suffix link


  //
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
dnaHealthy1(genes, health, dnas)
console.timeEnd('test2')
console.log('here')
