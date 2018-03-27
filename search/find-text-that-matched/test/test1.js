/**
 * Created by Sandon on 2017/9/15.
 */
/*const str = "哈西吼哈西吼哈西吼哈李鹏西吼哈西吼哈西吼"
const reg = new RegExp('李鹏')
const subStr = '李鹏'

console.time('indexOf')
str.indexOf(subStr)
console.timeEnd('indexOf')

console.time('reg')
reg.test(str) // 正则表达式快
console.timeEnd('reg')*/



/*let query = "0123456789abcdefg"

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
console.timeEnd('divide in matchBaseOnDivider2')
console.log(Object.keys(words))
console.log(Object.keys(words).length)*/


let str = '忧思在我的心里平静下去，正如黄昏在寂静的林中。，请问大买家要如何收费？' +
  '静静地听，我的心呀，听那“世界”的低语，这是他对你的爱的表示呀，如何开通商品？我们，萧萧的树叶，都有声响回答那暴风雨' +
  '上帝希望我们酬答他的，在于他送给我们的花朵，而不在于太阳和土地。，有没有无缝管上海到他们前面去。，有没有鞍钢' +
  '你在料理家事的时候'
let x



console.time('slice')
for (let i = 0; i !== 10000; i++) {
  x = str.substring(500, 5000)
}
console.timeEnd('slice')


/*console.time('substring')
for (let i = 0; i !== 10000; i++) {
  x = str.substring(500, 5000)
}
console.timeEnd('substring')*/


var i = {
  "subs": {
    "六": {"lines": [1], "subs": {}},
    "五": {
      "lines": [],
      "subs": {
        "五一": {"lines": [1], "subs": {}},
        "五阿": {
          "lines": [1],
          "subs": {
            "五阿哥": {"lines": [1], "subs": {"五阿哥哈": {"lines": [1], "subs": {}}}},
            "五阿妹": {"lines": [1], "subs": {}}
          }
        }
      }
    }
  }
}

