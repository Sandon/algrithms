/**
 * Created by Sandon on 2018/12/6.
 */
const AST_NODE_TYPE = {
  'atomic': 1,
  'series': 2,
  'multiple': 3,
  'parallel': 4
}

// export default ast2dfa
function ast2dfa (ast) {
  let nodeArray = []
  let {start, end} = ast2Enfa(ast, nodeArray)
  start.isStart = true
  end.isEnd = true
  let validNodeArray = enfa2Nfa(start, end, nodeArray)
  // todo del nodeArray


}
let enfaNodeUuid = 1
function ast2Enfa (ast, nodeArray) {
  switch (ast.type) {
    case AST_NODE_TYPE['atomic']:
      // construct automaton
      const start = {type: 'start', id: enfaNodeUuid++, next: {}, prev: {}}
      const end = {type: 'end', id: enfaNodeUuid++, next: {}, prev: {}}
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
      const start = {type: 'start', id: enfaNodeUuid++, next: {}, prev: {}}
      const end = {type: 'end', id: enfaNodeUuid++, next: {}, prev: {}}
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
    if (travelSet[i].prev['']) {
      travelSet[i].prev[''].forEach((prevNode) => {
        if (prevNode.valid) {
          endSet.push(prevNode)
          prevNode.isEnd = true
        }
        travelSet.push(prevNode)
      })
    }
  }

  return endSet
}
function findEmptyClosure (node) {
  let closure = []
  if (node.next['']) {
    node.next[''].forEach((nextNode) => {
      closure.push(nextNode)
      closure = closure.concat(findEmptyClosure(nextNode))
    })
  }
  return closure
}
function efa2Dfa (nfaStartNode) {
  const dfaStart = {
    id: nfaStartNode.id,
    nfaNodes: [nfaStartNode],
    next: {}
  }
  const dfaNodes = [dfaStart]
  const dfaNodesMap = {}
  dfaNodesMap[dfaStart.id]= dfaStart
  const willHandledDfa = [dfaStart]

  for (let i = 0; i !== willHandledDfa; i++) {
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

    // construct dfa next node
    for (let key in nfaNext) {
      // todo
    }
  }
}

// test 1
// ((a*)(b(a*)))
const ast1 = {
  type: AST_NODE_TYPE['series'],
  left: {
    type: AST_NODE_TYPE['multiple'],
    left: {
      type: AST_NODE_TYPE['atomic'],
      value: 'a'
    }
  },
  right: {
    type: AST_NODE_TYPE['series'],
    left: {
      type: AST_NODE_TYPE['atomic'],
      value: 'b'
    },
    right: {
      type: AST_NODE_TYPE['multiple'],
      left: {
        type: AST_NODE_TYPE['atomic'],
        value: 'a'
      }
    }
  }
}
const nodeArray = []
const start = ast2dfa(ast1)

