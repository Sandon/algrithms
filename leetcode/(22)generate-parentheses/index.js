var generateParenthesis = function(n) {
  const arr = new Array(n + 1)
  arr[1] = ['()']
  for (let i = 2; i <= n; i++) {
    arr[i] = []
    
    //
    const loopCount = Math.floor(i / 2)
    for (let k = 1; k <= loopCount; k++) {
      const a = arr[k]
      const b = arr[i - k]
      for (let aIndex = 0; aIndex < a.length; aIndex++) {
        for (let bIndex = 0; bIndex < b.length; bIndex++) {
          arr[i].push(`${a[aIndex]}${b[bIndex]}`)
          arr[i].push(`${b[bIndex]}${a[aIndex]}`)
        }
      }
    }
    
    //
    const pre = arr[i - 1]
    for (let j = 0; j < pre.length; j++) {
      const str = pre[j]
      arr[i].push(`(${str})`)
    }
    
    //
    arr[i] = [...(new Set(arr[i]))]
  }
  return arr[n]
}


generateParenthesis(3)
