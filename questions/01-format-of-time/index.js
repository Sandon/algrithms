/**
 * Created by lipeng on 2018/6/12.
 */
function convertTimeFormat (str) {
  const len = str.length
  let period = null
  let periods = []
  for (let i = 0; i !== len; i++) {
    if (str[i] === '1') {
      if (!period) {
        // it is start
        period = {
          start: i * 0.5,
          end: (i + 1) * 0.5
        }
      } else {
        // it is continue
        period.end = (i + 1) * 0.5
      }
    } else { // str[i] === '0' means period ending
      // if exist period, then store it
      if (period) {
        periods.push(period)
        period = null
      }
    }
  }
  period && (periods.push(period))

  periods = periods.map(period => `${formatTime(period.start)}-${formatTime(period.end)}`)

  return periods
}

function formatTime (num) {
  let hour = Math.floor(num)
  hour = hour > 9 ? `${hour}` : `0${hour}`
  let minute = num - hour
  minute = minute > 0 ? '30' : '00'

  return `${hour}:${minute}`
}

console.log(convertTimeFormat('101100001000110000001101'))
