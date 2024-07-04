var isPalindrome = function(x) {
  const str = x.toString()
  const guard = Math.floor(str.length / 2)
  let i = 0
  for (i = 0; i < guard; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      break
    }
  }
  return !(i < guard)
}
