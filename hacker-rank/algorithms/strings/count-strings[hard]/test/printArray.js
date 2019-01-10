/**
 * Created by Sandon on 2018/12/11.
 */
export default function printArray (arr) {
  const table = document.createElement('table')
  document.querySelector('body').appendChild(table)
  // arr.forEach((row) => {
  for (let i = 0; i !== arr.length; i++) {
    const row = arr[i]
    const tr = document.createElement('tr')
    table.appendChild(tr)
    // row.forEach((el) => {
    for (let j = 0; j !== row.length; j++) {
      const el = row[j]
      const text = document.createTextNode(el === undefined ? '-' : el)
      const td = document.createElement('td')
      td.appendChild(text)
      tr.appendChild(td)
    }
    // })
  }
  // })
}
