// 中心扩展
const expandMax = function (s, left, right) {
  const len = s.length
  let max = right - left - 1
  while (left >= 0 && right <= len -1) {
    if (s[left] === s[right]) {
      max = Math.max(max, right - left + 1)
      left--
      right++
    } else {
      max = Math.max(max, right - left - 1)
      break
    }
  }
  return max
}
var longestPalindrome = function(s) {
  const len = s.length
  let max = 1
  let finalLeft = 0
  let finalRight = 0
  for (let i = 0; i <= len - 1; i++) {
    // 奇数
    let left = i - 1
    let right = i + 1
    const oddMax = expandMax(s, left, right)
    if (oddMax > max) {
      max = oddMax
      const half = Math.floor(oddMax / 2)
      finalLeft = i - half
      finalRight = i + half
    }
    
    // 偶数，其在左
    if (i + 1 < len && s[i] === s[i + 1]) {
      const evenMax = expandMax(s, i, i + 1)
      if (evenMax > max) {
        max = evenMax
        const half = evenMax / 2
        finalLeft = i - (half - 1)
        finalRight = i + 1 + (half - 1)
      }
    }
  }
  
  return s.slice(finalLeft, finalRight + 1)
}

const test = "aaaa"
longestPalindrome(test)
