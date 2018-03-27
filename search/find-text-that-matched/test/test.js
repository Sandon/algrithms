/**
 * Created by Sandon on 2017/9/15.
 */
const http = require('http')
const fs = require('fs')
console.time('haha')
let content = fs.readFileSync('../question/dataSet.txt', 'utf-8')
let obj = {}
let lineNum = 0
content.split('\n').forEach((line) => {
  line.trim().split('|').slice(1).forEach(keyword => {
    obj[keyword] = ''
  })
  lineNum ++
})
let keyNum = 0
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key)
    keyNum++
  }
}
console.log(`line num: ${lineNum}`)
console.log(`key num: ${keyNum}`)
console.timeEnd('haha')
