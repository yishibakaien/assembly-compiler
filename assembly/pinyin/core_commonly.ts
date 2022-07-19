let allPinyin: string[] = []
let notone = {}
let storage = {}

function init(dict: any): any {
  // const allPinyin: string[] = []
  let k: string
  for (k in dict) {
    allPinyin.push(k) 
  }
  
  notone = parseDict(dict)
  return match
}

// 以文字为 key 可能的拼音为 value
function parseDict(dict: any): any {
  let parseDict = {}
  let i: string
  for (i in dict) {
    let temp = dict[i]
    for (let j = 0, len = temp.length; j < len; j++) {
      if (!parseDict[temp[j]]) {
        parseDict[temp[j]] = i
      } else {
        parseDict[temp[j]] = parseDict[temp[j]] + ' ' + i
      }
    }
  }
  return parseDict
}

// 获取该文字 拼音组合
function getPinyin(cn: string): any {
  let result = []
  for (let i = 0, len = cn.length; i < len; i++) {
    let temp = cn.charAt(i)
    result.push(notone[temp] || temp)
  }
  return result
}

// 对输入拼音进行切分
function wordBreak(s: string): any {
  let result: any = []
  let solutions: any = []
  let len = s.length
  let possible = []
  for (let i = 0; i <= len; i++) {
    possible.push(true)
  }
  getAllSolutions(0, s, result, solutions, possible)
  return solutions
}

function getAllSolutions(start: i32, s: string, result: any, solutions: any, possible: any): any {
  let len = s.length
  if (start === len) {
    solutions.push(result.join(' '))
    return
  }
  for (let i = start; i < len; i++) {
    let piece = s.substring(start, i + 1)
    let match = false
    // 最后一个音特殊处理，不需要全部打完整
    if (
      allPinyin.some((i) => i.indexOf(piece) === 0) &&
      !s[i + 1] &&
      possible[i + 1]
    ) {
      if (piece.length === 1) {
        result.push(piece)
      } else {
        let s: string[] = []
        allPinyin.forEach((i) => {
          if (i.indexOf(piece) === 0) {
            s.push(i)
          }
        })
        result.push(s)
      }
      match = true
    } else {
      if (allPinyin.indexOf(piece) !== -1 && possible[i + 1]) {
        result.push(piece)
        match = true
      }
    }
    if (match) {
      let beforeChange = solutions.length
      getAllSolutions(i + 1, s, result, solutions, possible)
      if (solutions.length === beforeChange) {
        possible[i + 1] = false
      }
      result.pop()
    }
  }
}
// 获取输入拼音的所有组合（切分 + 首字母）
function getFullKey(key: string): any {
  let result: any[] = []
  wordBreak(key).forEach((i: string) => {
    let item = i.split(' ')
    let last = item.length - 1
    if (item[last].indexOf(',')) {
      let keys = item[last].split(',')
      keys.forEach((j: string) => {
        item.splice(last, 1, j)
        result.push(JSON.parse(JSON.stringify(item)))
      })
    } else {
      result.push(item)
    }
  })
  if (result.length === 0 || result[0].length !== key.length) {
    result.push(key.split(''))
  }
  // 缓存当前结果 避免重复计算
  storage = { [key]: result }
  return result
}
function point2point(test: string, key: string, last: string, extend: string): any {
  if (!test) return false
  let a = test.split(' ')
  a.forEach((i: string) => {
    if (i.length > 0 && extend) {
      a.push(i.charAt(0))
    }
  })
  if (!last) {
    return a.indexOf(key) !== -1
  }
  return a.some((i: string) => i.indexOf(key) === 0)
}

function match(input: string, keys: string): any {
  if (!input || !keys) return false
  input = input.toLowerCase()

  keys = keys.replace(/\s+/g, '').toLowerCase()

  let indexOf = input.indexOf(keys)
  if (indexOf !== -1) {
    return [indexOf, indexOf + keys.length - 1]
  }
  // 原文匹配(带空格)
  // let noPyIndex = getIndex(input.split(''), [keys.split('')], keys)
  // if (noPyIndex) return noPyIndex
  // pinyin匹配
  let py = getPinyin(input)
  let fullString = storage[keys] || getFullKey(keys)
  return getIndex(py, fullString, keys)
}
function getIndex(py: any, fullString: any, keys: any): any {
  // console.log(...fullString)
  // 循环目标文字每个文字对应的拼音
  for (let p = 0; p < py.length; p++) {
    // 循环可能的拼音组合
    for (let k = 0; k < fullString.length; k++) {
      // 某一个拼音组合数组
      let key = fullString[k]
      // 该拼音组合length
      let keyLength = key.length
      let extend = keyLength === keys.length
      let isMatch = true
      let i = 0
      let preSpaceNum = 0
      let spaceNum = 0

      // 该拼音组合 length 小于等于目标字符串 length 时
      if (keyLength <= py.length) {
        // 循环该拼音组合
        for (; i < key.length; i++) {
          if (i === 0 && py[p + i + preSpaceNum] === ' ') {
            preSpaceNum += 1
            i -= 1
          } else {
            if (py[p + i + spaceNum] === ' ') {
              spaceNum += 1
              i -= 1
            } else {
              if (
                !point2point(
                  py[p + i + spaceNum],
                  key[i],
                  py[p + i + 1] && key[i + 1] ? false : true,
                  extend
                )
              ) {
                isMatch = false
                break
              }
            }
          }
        }
        if (isMatch) {
          return [p + preSpaceNum, spaceNum + p + i - 1]
        }
      }
    }
  }
  return false
}
export default init
