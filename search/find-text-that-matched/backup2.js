/**
 * Created by Sandon on 2017/9/16.
 */
const http = require('http')
const fs = require('fs')
const testSuite = require('./testSuite')

//let content = fs.readFileSync('./question/dataSet.txt', 'utf-8')
let content = fs.readFileSync('./test/dataSet.txt', 'utf-8')
const testQuery = '忧思在我的心里平静下去，正如黄昏在寂静的林中。，请问大买家要如何收费？' +
  '静静地听，我的心呀，听那“世界”的低语，这是他对你的爱的表示呀，如何开通商品？我们，萧萧的树叶，都有声响回答那暴风雨' +
  '上帝希望我们酬答他的，在于他送给我们的花朵，而不在于太阳和土地。，有没有无缝管上海到他们前面去。，有没有鞍钢' +
  '你在料理家事的时候'

/*** tree ***/
let dataSetBasedOnFirst = {
  indexes: {},
  keywords: []
}
let maxLen = 0
let minLen = 10
let indexes = {}
let keywords = []
content.split('\n').forEach((line, lineIndex) => {
  line.trim().split('|').slice(1).forEach(value => {
    dataSetBasedOnFirst.keywords.push({
      value,
      'lineNo': lineIndex + 1
    })
    const valueLen = value.length
    maxLen = maxLen < valueLen ? valueLen : maxLen
    minLen = minLen > valueLen ? valueLen : minLen
    
    let tem = indexes
    for (let i = 0; i !== valueLen; i++) {
      if (!tem[valueLen.charAt(i)]) {
        tem[valueLen.charAt(i)] = {}
      }
      
    }
  })
})
/*** tree ***/

