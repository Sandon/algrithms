const isDigit = function (c) {
  return parseFloat(c).toString() !== 'NaN'
}
const struct = function (s) {
  const root = {
    times: 1,
    content: []
  }
  let cur = root
  const stack = []
  for (let i = 0; i < s.length;) {
    const c = s[i]
    if (isDigit(c)) {
      let times = parseInt(c)
      i++
      while (isDigit(s[i])) {
        times = times * 10 + parseInt(s[i])
        i++
      }
      
      const node = {
        times: times,
        content: []
      }
      cur.content.push(node)
      // node.parent = cur // todo
      stack.push(cur)
      cur = node
  
      i++
    } else if (c === ']') {
      // cur = cur.parent
      cur = stack.pop()
      
      i++
    } else {
      // a-z
      if (!cur.content.length) {
        cur.content.push(c)
      } else {
        const last = cur.content[cur.content.length - 1]
        if (typeof last === 'object') {
          cur.content.push(c)
        } else {
          cur.content[cur.content.length - 1] = last + c
        }
      }
      
      i++
    }
  }
  return root
}

const toStr = function (node) {
  const len = node.content.length
  let part = ''
  for (let i = 0; i < len; i++) {
    const child = node.content[i]
    if (typeof child === 'object') {
      part += toStr(child)
    } else {
      part += child
    }
  }
  
  // times
  let r = ''
  for (let i = 0; i < node.times; i++) {
    r += part
  }
  
  return r
}

var decodeString = function(s) {
  const root = struct(s)
  // console.log(JSON.stringify(root))
  return toStr(root)
}

// decodeString('3[a2[c]xy4[f]]2[bc]')
console.log(decodeString("100[leetcode]"))
