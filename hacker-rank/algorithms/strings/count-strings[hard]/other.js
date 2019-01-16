function regexpTree(regexp) {
  var tree = {children: []},
    nextNode = tree;

  for (var i = 0  ; i < regexp.length ; ++i) {
    var c = regexp[i];
    if (c === "(") {
      nextNode.children.push({
        type: "+", //default type for anything in brackets
        parent: nextNode,
        children: []
      });

      nextNode = nextNode.children[nextNode.children.length - 1];
    } else if (c === ")") {
      nextNode = nextNode.parent;
    } else if (c === "|") {
      nextNode.type = "|";
    } else if (c === "*") {
      nextNode.type = "*";
    } else {
      nextNode.children.push({
        type: c,
        parent: nextNode
      });
    }
  }

  return tree.children[0];
}

function walkTree(tree, callbackBefore, callbackAfter) {
  callbackBefore(tree);
  tree.children.forEach(function(child) {
    walkTree(child, callbackBefore, callbackAfter);
  })
  callbackAfter(tree);
}

function printTree(tree) {
  walkTree(tree,
    function(node) {
      console.log(node.type + "(");
    },
    function() {
      console.log(")")
    }
  );
}


function buildNfa(regexp) {
  var tree = regexpTree(regexp);

  var nfa = transformHelper(tree);

  function transformHelper(tree) {
    var nextPiece;
    if (tree.type === "+") {
      nextPiece = contatenation();
    } else if (tree.type === "|") {
      nextPiece = alternation();
    } else if (tree.type === "*") {
      nextPiece = star();
      nextPiece.setInner(transformHelper(tree.children[0]));
    } else {
      nextPiece = node(tree.type);
    }

    if (tree.type === "+" || tree.type === "|") {
      var inner1 = transformHelper(tree.children[0]);
      var inner2 = transformHelper(tree.children[1]);
      nextPiece.setInners(inner1, inner2);
    }

    return nextPiece;
  }

  indexNodes(nfa);
  return convertTreeToAdjList(nfa);
}

function indexNodes(nfa) {
  var nodes = [nfa.head()], idx = 0;
  while(nodes.length !== 0) {
    var nextNode = nodes.pop();
    nextNode.idx = idx++;
    for (var linkType in nextNode.links) {
      nextNode.links[linkType].forEach(function(node) {
        if (!node.idx) {
          nodes.push(node);
        }
      });
    }
  }
}

function convertTreeToAdjList(nfa) {
  var adjList = {},
    nodes = [nfa.head()],
    visited = [];

  adjList.finite = nfa.finite().idx;

  while(nodes.length !== 0) {
    var nextNode = nodes.pop();

    adjList[nextNode.idx] = {};

    for (var linkType in nextNode.links) {
      adjList[nextNode.idx][linkType] = [];

      nextNode.links[linkType].forEach(function(node) {
        adjList[nextNode.idx][linkType].push(node.idx);

        if (!visited[node.idx]) {
          nodes.push(node);
          visited[node.idx] = true;
        }
      });
    }
  }
  return adjList;
}

function node(value) {
  var states = [{ links: {}}, { links: {} }];
  states[0].links[value] = [states[1]];

  return {
    head: function() {
      return states[0];
    },
    setNext: function(node) {
      states[1].links = node.links;
    },
    finite: function() {
      return states[1];
    }
  }
}

function star() {
  var states = [],
    n = 4;

  for (var i = 0 ; i < n ; ++i) {
    states.push({ links: {} });
  }

  states[0].links['e'] = [states[1], states[3]];
  states[2].links['e'] = [states[1], states[3]];

  return {
    setInner: function(inner) {
      states[1].links = inner.head().links;
      inner.setNext(states[2]);
    },
    head: function() {
      return states[0];
    },
    setNext: function(node) {
      states[n - 1].links = node.links;
    },
    finite: function() {
      return states[n - 1];
    }
  };
}

function contatenation() {
  var head = null,
    finite = null;

  var setNextHelper = function() {};
  return {
    setInners: function(inner1, inner2) {
      head = inner1.head();
      finite = inner2.finite();
      inner1.setNext(inner2.head());
      setNextHelper = inner2.setNext;
    },
    head: function() {
      return head;
    },
    setNext: function(node) {
      setNextHelper(node);
    },
    finite: function() {
      return finite;
    }
  };
}

function alternation() {
  var states = [],
    n = 6;

  for (var i = 0 ; i < n ; ++i) {
    states.push({ links: {} });
  }

  states[0].links['e'] = [states[1], states[3]];
  states[2].links['e'] = [states[5]];
  states[4].links['e'] = [states[5]];

  return {
    setInners: function(inner1, inner2) {
      states[1].links = inner1.head().links;
      inner1.setNext(states[2]);
      states[3].links = inner2.head().links;
      inner2.setNext(states[4]);
    },
    head: function() {
      return states[0];
    },
    setNext: function(node) {
      states[n - 1].links = node.links;
    },
    finite: function() {
      return states[n - 1];
    }
  };
}

function buildDfa(nfa) {
  var dfa = [],
    i = 0,
  dfaIdxs = {},
    dfaNodesStack = [newNode(new Set([0]))];

  while (dfaNodesStack.length !== 0) {

    var dfaNode = dfaNodesStack.pop(),
      reachableNfaNodes = [];

    dfaNode.nfaNodes.forEach(function(nfaNode) {
      var newReachableNodes = processReachableNfaNode(dfaNode, nfaNode);
      reachableNfaNodes = reachableNfaNodes.concat(newReachableNodes);
    });

    while (reachableNfaNodes.length !== 0) {
      var nfaNode = reachableNfaNodes.pop();
      let newReachableNodes = processReachableNfaNode(dfaNode, nfaNode);
      reachableNfaNodes = reachableNfaNodes.concat(newReachableNodes);
    }

    processLink(dfaNode, 'a');
    processLink(dfaNode, 'b');

    dfa[i] = dfaNode.links;
    dfa[i].finite = dfaNode.finite;

    dfaIdxs[dfaNode.id] = i++;
  }

  replaceIdsWithIdxs(dfa);
  return dfa;


  function processReachableNfaNode(dfaNode, nfaNodeId) {

    var reachableNodes = [],
      links = nfa[nfaNodeId];

    if (nfaNodeId === nfa.finite) {
      dfaNode.finite = true;
    }

    saveLinks(links, 'a', dfaNode);
    saveLinks(links, 'b', dfaNode);

    if (links['e']) {
      links['e'].forEach(function(node) {
        if (!dfaNode.nfaNodes.has(node)) {
          dfaNode.nfaNodes.add(node);
          reachableNodes.push(node);
        }
      })
    }

    return reachableNodes;
  }

  function newNode(nfaNodesSet, id) {
    if (!id) id = nodeId(nfaNodesSet);
    return {
      nfaNodes: nfaNodesSet,
      links: {},
      id: id
    };
  }

  function saveLinks(links, type, dfaNode) {
    if (links[type]) {
      if (!dfaNode.links[type]) {
        dfaNode.links[type] = new Set();
      }
      links[type].forEach(function(node) {
        dfaNode.links[type].add(node);
      })
    }
  }

  function processLink(dfaNode, linkType) {
    if (dfaNode.links[linkType]) {
      var newNodeId = nodeId(dfaNode.links[linkType]);
      if (!dfaIdxs[newNodeId]) {
        dfaNodesStack.push(
          newNode(dfaNode.links[linkType], newNodeId)
        );
      }
      dfaNode.links[linkType] = newNodeId;
    }

  }

  function replaceIdsWithIdxs(dfa) {
    dfa.forEach(function(links) {
      if (links['a']) {
        links['a'] = dfaIdxs[links['a']];
      }
      if (links['b']) {
        links['b'] = dfaIdxs[links['b']];
      }
    });
  }

  function nodeId(set) {
    return Array.from(set.values()).sort().join(" ");
  }

}

var nfaFromRegexp = buildNfa,
  dfaFromNfa = buildDfa,
  modBase = 1000000007,
  x = 1000,
  x2 = x * x;

function modMul(a, b) {
  var a1 = Math.floor(a / x),
    a2 = a % x,
    b1 = Math.floor(b / x),
    b2 = b % x;

  return ((((a1 * b1) % modBase) * x2) % modBase +
    (((a1 * b2 + a2 * b1) % modBase) * x) % modBase +
    (a2 * b2) % modBase) % modBase;
}

export function count(regexp, n, printArray) {
  var dfa = dfaFromNfa(nfaFromRegexp(regexp)),
    adjMatrix = buildAdjMatrix(dfa);

  var pathsNum = power(adjMatrix, n);
  printArray && printArray(pathsNum)
  var res = 0;
  for (var i = 0 ; i < dfa.length ; ++i) {
    if (pathsNum[0][i] !== 0 && dfa[i].finite) {
      res = res + pathsNum[0][i];
    }
  }

  return res % modBase;
}

function buildAdjMatrix(dfa) {
  var matrix = [];
  for (var i = 0 ; i < dfa.length ; ++i) {
    var node = dfa[i];
    matrix[i] = [];
    for (var j = 0 ; j < dfa.length ; ++j)matrix[i][j] = 0;
    if (node['a']) {
      matrix[i][node['a']] = 1;
    }
    if (node['b']) {
      matrix[i][node['b']] = 1;
    }
  }
  return matrix;
}

function isOdd(num) {
  return num % 2;
}

function power(m, p) {
  if (p == 1) {
    return m;
  }

  if (isOdd(p)) {
    var temp = power(m, (p - 1) / 2);
    return multiply3(temp, temp, m);
  } else {
    var temp = power(m, p / 2);
    return multiply(temp, temp);
  }
}

function multiply3(m1, m2, m3) {
  return multiply(multiply(m1, m2), m3);
}

function multiply(m1, m2) {
  var result = [];
  for (var i = 0; i < m1.length; i++) {
    result[i] = [];
    for (var j = 0; j < m1.length; j++) {
      var sum = 0;
      for (var k = 0; k < m1.length; k++) {
        sum = sum + modMul(m1[i][k], m2[k][j]);
      }

      result[i][j] = sum % modBase;
    }
  }
  return result;
}