var isValid = function(s) {
  const stack = []
  const left = {'(': true, '[': true, '{': true}
  const rightToLeft = {')': '(', '}' : '{', ']': '['}
  for (let i = 0; i < s.length; i++) {
    const cur = s[i]
    if (left[cur]) {
      stack.push(cur)
    } else {
      const last = stack.pop()
      if (last !== rightToLeft[cur]) {
        return false
      }
    }
  }
  
  return stack.length === 0
}
