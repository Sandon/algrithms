/**
 * Created by Sandon on 2017/9/15.
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

/*** all divide ***/
let dataSet = [null]
content.split('\n').forEach((line) => {
  dataSet.push(line.trim().split('|').slice(1))
})

function matchBaseOnDivider (query, dataSet) {
  let words = {}
  const len = query.length
  const endGuard = len + 1
  //console.time('divide in matchBaseOnDivider')
  for (let i = 0; i !== len; i++) {
    for (let j = 1; j !== 7; j++) {
      const end = i + j
      end < endGuard && (words[query.slice(i, end)] = true)
    }
  }
  //console.timeEnd('divide in matchBaseOnDivider')
  
  const dataSetLen = dataSet.length
  let res = []
  //console.time('match in matchBaseOnDivider')
  for (let i = 1; i !== dataSetLen; i++) {
    const keywords = dataSet[i]
    const keywordsLen = keywords.length
    for (let j = 0; j !== keywordsLen; j++) {
      if (words[keywords[j]]) {
        res.push(i)
        break
      }
    }
  }
  //console.timeEnd('match in matchBaseOnDivider')
  
  return res.length ? res.join(',') : 0
}

/*console.time('matchBaseOnDivider')
let result = matchBaseOnDivider(testQuery, dataSet)
console.timeEnd('matchBaseOnDivider')*/
//console.log(result)
//testSuite(matchBaseOnDivider, dataSet)
/*** all divide ***/








/*** all divide2 ***/
let dataSet2 = []
content.split('\n').forEach((line, lineIndex) => {
  line.trim().split('|').slice(1).forEach(value => {
    dataSet2.push({
      value,
      'lineNo': lineIndex + 1
    })
  })
})

function matchBaseOnDivider2 (query, dataSet) {
  let words = {}
  const len = query.length
  const endGuard = len + 1
  console.time('divide in matchBaseOnDivider2')
  for (let i = 0; i !== len; i++) {
    for (let j = 1; j !== 7; j++) {
      const end = i + j
      end < endGuard && (words[query.slice(i, end)] = true)
    }
  }
  //console.timeEnd('divide in matchBaseOnDivider2')
  //console.log(Object.keys(words).length)
  
  const dataSetLen = dataSet.length
  let res = []
  let last = 0
  //console.time('match in matchBaseOnDivider2')
  for (let i = 0; i !== dataSetLen; i++) {
    const keyword = dataSet[i]
    if (words[keyword.value] && last !== keyword.lineNo) {
      res.push(keyword.lineNo)
      last = keyword.lineNo
    }
  }
  //console.timeEnd('match in matchBaseOnDivider2')
  
  return res.length ? res.join(',') : 0
}

/*console.time('matchBaseOnDivider2')
result = matchBaseOnDivider2(testQuery, dataSet2)
console.timeEnd('matchBaseOnDivider2')*/
//testSuite(matchBaseOnDivider2, dataSet2)
/*** all divide2 ***/








/*** divide based on first char***/
let dataSetBasedOnFirst = {
  firstChars: {},
  keywords: [],
  maxLen: 0,
  minLen: 10
}
content.split('\n').forEach((line, lineIndex) => {
  line.trim().split('|').slice(1).forEach(value => {
    dataSetBasedOnFirst.keywords.push({
      value,
      'lineNo': lineIndex + 1
    })
    dataSetBasedOnFirst.firstChars[value.charAt(0)] = true
    const valueLen = value.length
  
    dataSetBasedOnFirst.maxLen = dataSetBasedOnFirst.maxLen < valueLen ? valueLen : dataSetBasedOnFirst.maxLen
    dataSetBasedOnFirst.minLen = dataSetBasedOnFirst.minLen > valueLen ? valueLen : dataSetBasedOnFirst.minLen
  })
})
function matchBasedOnFirst (query, dataSetBasedOnFirst) {
  let words = {}
  const len = query.length
  const endGuard = len + 1
  console.time('divide in matchBasedOnFirst')
  let i = 0
  const firstChars = dataSetBasedOnFirst.firstChars
  const min = dataSetBasedOnFirst.minLen
  const max = dataSetBasedOnFirst.maxLen + 1
  while (i !== len) {
    if (firstChars[query.charAt(i)]) {
      for (let j = min; j !== max; j++) {
        const end = i + j
        end < endGuard && (words[query.slice(i, end)] = true)
      }
    }
    i++
  }
  console.timeEnd('divide in matchBasedOnFirst')
  //console.log(Object.keys(words).length)
  
  const keywords = dataSetBasedOnFirst.keywords
  const keywordsLen = keywords.length
  let res = []
  let last = 0
  console.time('match in matchBasedOnFirst')
  /*for (let i = 0; i !== keywordsLen; i++) {
    const keyword = keywords[i]
    if (last !== keyword.lineNo && words[keyword.value]) {
      res.push(keyword.lineNo)
      last = keyword.lineNo
    }
  }*/
  for (let i = 0; i !== keywordsLen; i++) {
    const keyword = keywords[i]
    if (last !== keyword.lineNo && query.indexOf(keyword.value) !== -1) {
      res.push(keyword.lineNo)
      last = keyword.lineNo
    }
  }
  console.timeEnd('match in matchBasedOnFirst')
  
  return res.length ? res.join(',') : 0
}
console.time('matchBasedOnFirst')
matchBasedOnFirst(testQuery, dataSetBasedOnFirst)
console.timeEnd('matchBasedOnFirst')
//testSuite(matchBasedOnFirst, dataSetBasedOnFirst)
/*** divide based on first char ***/

