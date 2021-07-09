/**
 * Maintained by Sandon.
 */
function birthdayCakeCandles(candles) {
  const map = {}
  candles.forEach(candle => {
    if (!map[candle]) {
      map[candle] = 0
    }
    map[candle]++
  })

  const nums = Object.keys(map).map(i => Number(i))
  const max = Math.max(...nums)
  return map[max]
}

console.log(birthdayCakeCandles([4, 4, 1, 3]))
