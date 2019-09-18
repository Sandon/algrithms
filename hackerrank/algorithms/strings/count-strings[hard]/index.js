/**
 * Created by Sandon on 2018/12/6.
 */
// import NP from './number-precision.js'
// const NP = require('number-precision')
const module = 1000000007
 const AST_NODE_TYPE = {
  'atomic': 1,
  'series': 2,
  'multiple': 3,
  'parallel': 4
}

 function ast2dfa (ast) {
  let nodeArray = []
  let { start, end } = ast2Enfa(ast, nodeArray)

  start.isStart = true
  end.isEnd = true
  let validNodeArray = enfa2Nfa(start, end, nodeArray)

  // todo del nodeArray
  let { dfaStart, dfaNodes, dfaNodesMap, dfaEndIndex } = nfa2Dfa(start)

  return {
    arr: tree2Array(dfaStart, dfaNodes.length),
    dfaEndIndex
  }
}
let enfaNodeUuid = 1
function ast2Enfa (ast, nodeArray) {
  let start, end
  switch (ast.type) {
    case AST_NODE_TYPE['atomic']:
      // construct automaton
      start = {type: 'start', id: enfaNodeUuid++, next: {}, prev: {}}
      end = {type: 'end', id: enfaNodeUuid++, next: {}, prev: {}}
      addLine(start, ast.value, end)

      // record in ast node, and in node array
      ast.start = start
      ast.end = end
      nodeArray.push(start)
      nodeArray.push(end)
      break
    case AST_NODE_TYPE['series']:
      // construct automaton for left and right
      ast2Enfa(ast.left, nodeArray)
      ast2Enfa(ast.right, nodeArray)

      // series
      addLine(ast.left.end, '', ast.right.start)

      // record in ast node, and in node array
      ast.start = ast.left.start
      ast.end = ast.right.end
      break
    case AST_NODE_TYPE['multiple']:
      // construct automaton for left and right
      ast2Enfa(ast.left, nodeArray)

      // multiple
      const startEnd = {type: 'start-end', id: enfaNodeUuid++, next: {}, prev: {}}
      addLine(startEnd, '', ast.left.start)
      addLine(ast.left.end, '', startEnd)

      // record in ast node, and in node array
      ast.start = startEnd
      ast.end = startEnd
      nodeArray.push(startEnd)
      break
    case AST_NODE_TYPE['parallel']:
      // construct automaton for left and right
      ast2Enfa(ast.left, nodeArray)
      ast2Enfa(ast.right, nodeArray)

      // parallel
      start = {type: 'start', id: enfaNodeUuid++, next: {}, prev: {}}
      end = {type: 'end', id: enfaNodeUuid++, next: {}, prev: {}}
      addLine(start, '', ast.left.start)
      addLine(start, '', ast.right.start)
      addLine(ast.left.end, '', end)
      addLine(ast.right.end, '', end)

      // record in ast node, and in node array
      ast.start = start
      ast.end = end
      nodeArray.push(start)
      nodeArray.push(end)
      break
  }
  return {start: ast.start, end: ast.end}
}
function addLine (src, char, target) {
  if (!src.next[char]) {
    src.next[char] = []
  }
  src.next[char].push(target)

  if (!target.prev[char]) {
    target.prev[char] = []
  }
  target.prev[char].push(src)
}
function enfa2Nfa (start, end, nodeArray) {
  // 1. find all valid nodes
  const validNodeArray = []

  nodeArray.forEach((node) => {
    if (node === start) {
      node.valid = true
      validNodeArray.push(node)
    } else if (Object.keys(node.prev).findIndex((char) => char !== '') !== -1) {
      node.valid = true
      validNodeArray.push(node)
    } else {
      node.valid = false
    }
  })
  // end set
  const endSet = findEndSet(end)

  // 2. cope non empty line for valid node
  validNodeArray.forEach((node) => {
    const closure = findEmptyClosure(node)
    closure.forEach((closureNode) => {
      for (let key in closureNode.next) {
        if (key !== '') {
          closureNode.next[key].forEach((nextNode) => {
            addLine(node, key, nextNode)
          })
        }
      }
    })
  })

  // 3. remove empty line and invalid node
  validNodeArray.forEach((validNode) => {
    // remove empty line
    delete validNode.next['']
    delete validNode.prev['']

    // remove invalid node
    for (let key in validNode.next) {
      validNode.next[key] = validNode.next[key].filter(node => node.valid)
    }
    for (let key in validNode.prev) {
      validNode.prev[key] = validNode.prev[key].filter(node => node.valid)
    }
  })
  // todo remove non valid node

  return validNodeArray
}
function findEndSet (end) {
  const endSet = [end]
  const travelSet = [end]

  for (let i = 0; i !== travelSet.length; i++) {
    // console.log('here')
    // if (i === 100000) break
    travelSet[i].findEndSetVisited = true
    if (travelSet[i].prev['']) {
      travelSet[i].prev[''].forEach((prevNode) => {
        if (prevNode.valid) {
          endSet.push(prevNode)
          prevNode.isEnd = true
        }
        !prevNode.findEndSetVisited && travelSet.push(prevNode)
      })
    }
  }
  // console.log(endSet)
  return endSet
}
function findEmptyClosure (node, level = 1) {
  // let closure = []
  // if (node.next['']) {
  //   node.next[''].forEach((nextNode) => {
  //     closure.push(nextNode)
  //     closure = closure.concat(findEmptyClosure(nextNode, level + 1))
  //   })
  // }
  // level === 1 && console.log(closure)
  // return closure

  const closure = []
  const travelSet = [node]
  const visitedIds = {}
  for (let i = 0; i !== travelSet.length; i++) {
    visitedIds[travelSet[i].id] = true
    // travelSet[i].findEmptySetVisited = true
    if (travelSet[i].next['']) {
      travelSet[i].next[''].forEach((nextNode) => {
        closure.push(nextNode)
        !visitedIds[nextNode.id] && travelSet.push(nextNode)
      })
    }
  }

  return closure
}
function nfa2Dfa (nfaStartNode) {
  const dfaStart = {
    id: nfaStartNode.id,
    nfaNodes: [nfaStartNode],
    next: {},
    index: 0
  }
  dfaStart.isStart = true
  const dfaEndIndex = {}
  const dfaNodes = [dfaStart]
  const dfaNodesMap = {}
  dfaNodesMap[dfaStart.id]= dfaStart
  const willHandledDfa = [dfaStart]

  for (let i = 0; i !== willHandledDfa.length; i++) {
    // if (i === 100) {
    //   console.log(willHandledDfa)
    //   break
    // }
    const dfaNode = willHandledDfa[i]

    // find dfa next
    const nfaNext = {}
    dfaNode.nfaNodes.forEach((nfaNode) => {
      for (let key in nfaNode.next) {
        if (!nfaNext[key]) {
          nfaNext[key] = []
        }
        nfaNext[key] = nfaNext[key].concat(nfaNode.next[key])
      }
    })

    // construct next dfa nodes for every char
    for (let key in nfaNext) {
      if (nfaNext[key]) {
        nfaNext[key] = deduplicate(nfaNext[key])
        nfaNext[key] = nfaNext[key].sort((a, b) => a.id - b.id)
        const id = nfaNext[key].map(nfaNode => nfaNode.id).join('-')

        if (!dfaNodesMap[id]) {
          // if not exist already, then construct one
          const newDfaNode= {
            id: id,
            nfaNodes: nfaNext[key],
            next: {},
            index: dfaNodes.length
          }
          nfaNext[key].forEach((nfaNode) => {
            if (nfaNode.isEnd) {
              newDfaNode.isEnd = true
              dfaEndIndex[newDfaNode.index] = true
            }
          })

          dfaNodesMap[id] = newDfaNode
          dfaNodes.push(newDfaNode)
          willHandledDfa.push(newDfaNode)
        }
        dfaNode.next[key] = dfaNodesMap[id]
      }
    }
  }

  // return
  return {
    dfaStart,
    dfaNodes,
    dfaNodesMap,
    dfaEndIndex
  }
}
function deduplicate (arr) {
  const existed = {}
  const result = []
  arr.forEach((item) => {
    if (!existed[item.id]) {
      existed[item.id] = true
      result.push(item)
    }
  })
  return result
}

// 用二维数组表示tree，数组中是具体字符
 function tree2Array (dfaStart, len) {
  // const len = dfaNodes.length
  const arr = new Array(len)
  for (let i = 0; i !== len; i++) {
    arr[i] = new Array(len)
  }
  doTree2ArrayLf(arr, dfaStart)
  return arr
}
function doTree2ArrayLf (arr, root) {
  const list = [root]
  let node
  while (node = list.shift()) {
    node.tree2ArrayVisited = true

    const keys = Object.keys(node.next)
    for (let i = 0; i !== keys.length; i++) {
      const key = keys[i]
      const nextNode = node.next[key]
      arr[node.index][nextNode.index] = key
      if (!nextNode.tree2ArrayVisited) {
        list.push(nextNode)
      }
    }
  }
}

// 用二维数组表示tree，有路径则为1，没有路径则为0
 function array2Matrix (arr) {
  const len = arr.length
  const matrix = new Array(len)
  for (let i = 0; i !== len; i++) {
    const row = new Array(len)
    for (let j = 0; j !== len; j++) {
      row[j] = arr[i][j] ? 1 : 0
    }
    matrix[i] = row
  }
  return matrix
}

// 矩阵求幂
 function matrixExp (matrix, exp) {
  let base = matrix

  const len = matrix.length
  let res = new Array(len)
  for (let i = 0; i !== len; i++) {
    res[i] = new Array(len)
    for (let j = 0; j !== len; j++) {
      res[i][j] = i === j ? 1 : 0
    }
  }

  while (exp) {
    // console.log(exp)
    if (exp % 2 === 1) {
      res = matrixMulti(res, base)
    }
    base = matrixMulti(base, base)

    exp >>= 1
  }

  return res
}
function matrixMulti (matrix1, matrix2) {
  // 正方形的矩阵
  const len = matrix1.length
  const result = new Array(len)
  for (let i = 0; i !== len; i++) {
    result[i] = new Array(len)
    for (let j = 0; j !== len; j++) {
      result[i][j] = 0
      for (let k = 0; k !== len; k++) {
        // console.log('here')
        // result[i][j] = addition(result[i][j], multiply(matrix1[i][k], matrix2[k][j]))
        // result[i][j] += matrix1[i][k] * matrix2[k][j]
        result[i][j] = ((matrix1[i][k] * matrix2[k][j]) % module + result[i][j]) % module
      }
    }
  }
  return result
}
function addition (a, b) {
  // a plus b may produce carry
  a = `0${a}`.split('')
  b = `0${b}`.split('')

  // padding two array with '0' at front in order to make them have same length
  const distance = a.length - b.length
  if (distance > 0) {
    for (let i = 0; i !== distance; i++) {
      b.unshift('0')
    }
  } else if (distance < 0) {
    const guard = Math.abs(distance)
    for (let i = 0; i !== guard; i++) {
      a.unshift('0')
    }
  }

  // do addition
  let result = []
  const len = Math.max(a.length, b.length)
  for (let i = len - 1, carry = 0; i >= 0; i--) {
    let  tmp = +a[i] + (+b[i]) + carry
    if (tmp > 9) {
      carry = 1
      result.unshift(tmp - 10)
    } else {
      carry = 0
      result.unshift(tmp)
    }
  }

  result = result.join('').replace(/^0+/, '')
  return result || 0
}
function multiply (a, b) {
  a = `${a}`.split('') // .reverse()
  b = `${b}`.split('') // .reverse()

  // 初始化
  const len = a.length + b.length
  const result = new Array(len)
  for (let i = 0; i !== len; i++) {
    result[i] = 0
  }

  // 计算
  for (let i = 0; i !== a.length; i++) {
    for (let j = 0; j !== b.length; j++) {
      result[i + j + 1] +=  a[i] * b[j]
    }
  }

  // 处理进位
  for (let i = result.length - 1; i >= 0; i--) {
    if (result[i] > 9) {
      result[i - 1] += Math.floor(result[i] / 10)
      result[i] %= 10
    }
  }

  return result.join('').replace(/^0+/, '')
}

// 计算最后的结果
 function calcMatrix (matrix, dfaEndIndex) {
  const len = matrix.length
  let count = 0
  for (let i = 0; i !== len; i++) {
    if (dfaEndIndex[i]) {
      // count = addition(count, matrix[0][i])
      // count += matrix[0][i]
      count = (count + matrix[0][i]) % module
    }
  }
  return count
}

// 将正则表达是解析成ast
const concatReg = /^\((a|b|\(.+\))(a|b|\(.+\))\)$/
const unionReg = /^\((a|b|\(.+\))\|(a|b|\(.+\))\)$/
const multipleReg = /^\((a|b|\(.+\))\*\)$/
 function parse (str) {
  // 单个文本
  if (str === 'a' || str === 'b') {
    return {
      type: AST_NODE_TYPE['atomic'],
      value: str
    }
  }

  // 有括号
  if (str[0] === '(' && str[str.length - 1] === ')') {
    // 去掉最外层括号
    str = str.slice(1, str.length - 1)

    // multiple
    if (str[str.length - 1] === '*') {
      return {
        type: AST_NODE_TYPE['multiple'],
        left: parse(str.slice(0, -1))
      }
    }

    // find middle
    let end, findEnd = false
    if (str[0] === 'a' || str[0] === 'b') {
      end = 0
    } else {
      let leftBracketNum = 0
      for (let i = 0; i !== str.length; i++) {
        if (str[i] === '(') {
          leftBracketNum++
        }
        else if (str[i] === ')') {
          leftBracketNum--
          if (!leftBracketNum) {
            end = i
            break
          }
        }
      }
    }

    if (str[end + 1] === '|') {
      const middle = end + 1
      // union
      return {
        type: AST_NODE_TYPE['parallel'],
        left: parse(str.slice(0, middle)),
        right: parse(str.slice(middle + 1))
      }
    } else {
      // concat
      return {
        type: AST_NODE_TYPE['series'],
        left: parse(str.slice(0, end + 1)),
        right: parse(str.slice(end + 1))
      }
    }

  }
  console.log(str)
  throw new Error('错误的字符串')
}

 function countString (str, len, printArray) {
  console.time('before')
  let ast = parse(str)
  console.log(ast)

  const dfa = ast2dfa(ast)

  const arr = dfa.arr
  const dfaEndIndex = dfa.dfaEndIndex
  // console.log(arr)
  printArray && printArray(arr)
  const matrix = array2Matrix(arr)
  // console.log(matrix)
  printArray && printArray(matrix)
  console.timeEnd('before')
  console.time('after')
  const res = matrixExp(matrix, len)
  console.timeEnd('after')
  console.log(res)
  printArray && printArray(res)
  document.querySelector('body').appendChild(document.createTextNode(calcMatrix(res, dfaEndIndex)))
}

 function countStrings (str, len) {
  let ast = parse(str)
  const dfa = ast2dfa(ast)
  const arr = dfa.arr
  const dfaEndIndex = dfa.dfaEndIndex
  const matrix = array2Matrix(arr)
  const res = matrixExp(matrix, len)
  return calcMatrix(res, dfaEndIndex)
}