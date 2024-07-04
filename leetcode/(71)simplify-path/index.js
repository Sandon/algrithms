/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
  path = path.replace(/\/+/, '/')
  const parts = path.split('/')
  
  let stack = []
  for (let i = 0; i < parts.length; i++) {
    const c = parts[i]
    if (!c || c === '.') continue
    if (c === '..') stack.pop()
    else stack.push(c)
  }
  
  return `/${stack.join('/')}`
}
