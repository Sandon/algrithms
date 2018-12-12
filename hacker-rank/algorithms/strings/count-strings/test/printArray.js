/**
 * Created by Sandon on 2018/12/11.
 */
export default function printArray (arr) {
  const table = document.createElement('table')
  document.querySelector('body').appendChild(table)
  arr.forEach((row) => {
    const tr = document.createElement('tr')
    table.appendChild(tr)
    row.forEach((el) => {
      const text = document.createTextNode(el || '')
      const td = document.createElement('td')
      td.appendChild(text)
      tr.appendChild(td)
    })
  })
}
