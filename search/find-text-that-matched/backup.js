/**
 * Created by Sandon on 2017/9/16.
 */




/*** as individual :  142ms ***/
let questions = [null]
content.split('\n').forEach((line) => {
  questions.push(line.trim().split('|').slice(1).map(keywork => keywork.toLowerCase()))
})
function matchAsIndividual(query, questions) {
  query = query.toLowerCase()
  let res = []
  const questionsLen = questions.length
  for (let index = 1; index !== questionsLen; index++) {
    const keywords = questions[index]
    const len = keywords.length
    for (let i = 0; i !== len; i++) {
      if (query.indexOf(keywords[i]) !== -1) {
        res.push(index)
        break
      }
    }
  }
  return res.length ? res.join(',') : 0
}
/*console.time('matchAsIndividual')
 let result = matchAsIndividual(testQuery, questions)
 console.timeEnd('matchAsIndividual')*/
//console.log(result)
testSuite(matchAsIndividual, questions)
/*** as individual ***/






/*** as reg : 35ms，但是是在4w的数据量下，当50w时，报heap溢出错误 ***/
let questionRegs = [null]
content.split('\n').forEach(line => {
  questionRegs.push(new RegExp(line.slice(line.indexOf('|') + 1)))
})
function matchAsReg (query, questionRegs) {
  const len = questionRegs.length
  let res = []
  for (let index = 1; index !== len; index++) {
    questionRegs[index].test(query) && res.push(index)
  }
  
  return res.length ? res.join(',') : 0
}
/*console.time('matchAsReg')
 result = matchAsReg(testQuery, questionRegs)
 console.timeEnd('matchAsReg')*/
//console.log(result)
testSuite(matchAsReg, questionRegs)
/*** as reg ***/










/*** as individual2 : 130ms ***/
let questions2 = []
content.split('\n').forEach((line, lineIndex) => {
  line.trim().split('|').slice(1).forEach(value => {
    questions2.push({
      value,
      'lineNo': lineIndex + 1
    })
  })
})
function matchAsIndividual2 (query, questions2) {
  const len = questions2.length
  let res = []
  let last = 0
  for (let i = 0; i !== len; i++) {
    const keyword = questions2[i]
    if (query.indexOf(keyword.value) !== -1 && keyword.lineNo !== last) {
      res.push(keyword.lineNo)
      last = keyword.lineNo
    }
  }
  
  return res.length ? res.join(',') : 0
}
testSuite(matchAsIndividual2, questions2)

/*** as individual2 ***/







/*** matchBasedOnKeyGroupIndividual : 200ms ***/
let keyGroupIndividual = {}
content.split('\n').forEach((line, index) => {
  line.trim().split('|').slice(1).forEach(keyword => {
    keyword = keyword.toLowerCase()
    if (!keyGroupIndividual[keyword]) {
      keyGroupIndividual[keyword] = []
    }
    keyGroupIndividual[keyword].push(index + 1)
  })
})
function matchBasedOnKeyGroupIndividual(query, keyGroup) {
  let res = []
  for (let key in keyGroup) {
    query.indexOf(key) !== -1 && (res = res.concat(keyGroup[key]))
  }
  res = res.sort((a, b) => a - b)
  return res.length ? res.join(',') : 0
}
//console.time('matchBasedOnKeyGroupIndividual')
//result = matchBasedOnKeyGroupIndividual(testQuery, keyGroupIndividual)
//console.timeEnd('matchBasedOnKeyGroupIndividual')
//console.log(result)
//testSuite(matchBasedOnKeyGroupIndividual, keyGroupIndividual)
/*** matchBasedOnKeyGroupIndividual ***/








/*** matchLoopQueryObject : 0.73ms***/
let dataUsingObject = {keyGroup: {}, maxLen: 0, minLen: 10}
/*let firstChars = {}*/
content.split('\n').forEach((line, index) => {
  line.trim().split('|').slice(1).forEach(keyword => {
    keyword = keyword.toLowerCase()
    
    if (!dataUsingObject.keyGroup[keyword]) {
      dataUsingObject.keyGroup[keyword] = {}
    }
    dataUsingObject.keyGroup[keyword][index + 1] = true
    
    const keywordLen = keyword.length
    dataUsingObject.minLen = dataUsingObject.minLen < keywordLen ? dataUsingObject.minLen : keywordLen
    dataUsingObject.maxLen = dataUsingObject.maxLen < keywordLen ? keywordLen: dataUsingObject.maxLen
    
    // firstChars[keyword.charAt(0)] = true
  })
})
function matchLoopQueryObject(query, data) {
  const keyGroup = data.keyGroup
  const maxLen = data.maxLen
  const minLen = data.minLen
  
  query = query.toLowerCase()
  let res = {}
  const len = query.length
  for (let i = 0; i !== len; i++) {
    /*if (!data.firstChars[query[0]])
     continue*/
    
    let guard = i + maxLen + 1
    const lenGuard = len + 1
    guard = guard > lenGuard ? lenGuard : guard
    for (let j = i + minLen; j !== guard; j++) {
      const obj = keyGroup[query.slice(i, j)]
      obj && (res = Object.assign(res, obj))
    }
  }
  res = Object.keys(res).sort((a, b) => a - b)
  return res.length ? res.join(',') : 0
}
testSuite(matchLoopQueryObject, dataUsingObject)
/*console.time('matchLoopQuery')
 result = matchLoopQuery(testQuery, data)
 console.timeEnd('matchLoopQuery')
 console.log(result)*/
/*** matchLoopQueryObject ***/









/*** matchBasedOnKeyGroup ***/

/*function matchBasedOnKeyGroup (query, keyGroup) {
 let res = []
 for (let key in keyGroup) {
 keyGroup[key]['reg'].test(query) && (res = res.concat(keyGroup[key]['nums']))
 }
 return res.length ? res.join(',') : 0
 }*/
/*console.time('matchBasedOnKeyGroup')
 result = matchBasedOnKeyGroup(testQuery, keyGroup)
 console.timeEnd('matchBasedOnKeyGroup')*/
//console.log(result)
//testSuitePerf(matchBasedOnKeyGroup, keyGroup)

/*** matchBasedOnKeyGroup ***/











/*** matchLoopQuery ***/
let data = {keyGroup: {}, maxLen: 0, minLen: 10, firstChars: {}, keyMap: {subs: {}}}
//content = 'xx|六|五一|五阿|五阿哥|五阿妹|五阿哥哈'
content.split('\n').forEach((line, index) => {
  line.trim().split('|').slice(1).forEach(keyword => {
    keyword = keyword.toLowerCase()
    // keyGroup
    if (!data.keyGroup[keyword]) {
      data.keyGroup[keyword] = []
    }
    data.keyGroup[keyword].push((index + 1))
    
    const keywordLen = keyword.length
    
    // minLen, maxLen
    data.minLen = data.minLen < keywordLen ? data.minLen : keywordLen
    data.maxLen = data.maxLen < keywordLen ? keywordLen: data.maxLen
    
    // firstChars
    data.firstChars[keyword.slice(0, 1)] = true
    
    // keyMap
    let keyObj = data.keyMap
    const guard = keywordLen + 1
    for (let i = 1; i !== guard; i++) {
      const key = keyword.slice(0, i)
      if (!keyObj.subs[key]) {
        keyObj.subs[key] = {
          lines: [],
          subs: {}
        }
      }
      
      keyObj = keyObj.subs[key]
    }
    keyObj.lines.push(index + 1)
  })
})
//console.log(JSON.stringify(data.keyMap))

function matchLoopQuery(query, data) {
  const keyGroup = data.keyGroup
  const maxLen = data.maxLen
  const minLen = data.minLen
  query = query.toLowerCase()
  let res = []
  const len = query.length
  
  for (let i = 0; i !== len; i++) {
    /*if (!data.firstChars[query.slice(i, i + 1)])
     continue*/
    
    let guard = i + maxLen + 1
    const lenGuard = len + 1
    guard = guard > lenGuard ? lenGuard : guard
    for (let j = i + minLen; j !== guard; j++) {
      const arr = keyGroup[query.slice(i, j)]
      arr && (res = res.concat(arr))
    }
  }
  
  res = res.sort((a, b) => a - b)
  res = deDuplicate(res)
  
  return res.length ? res.join(',') : 0
}
/*** matchLoopQuery ***/


