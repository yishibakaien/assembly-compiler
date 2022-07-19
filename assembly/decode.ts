
// 字符串解密算法
export function decode(str: string): string {
  const len: i32 = str.length

  if (len < 11) {
    const codes: i32[] = []
    const chars: string[] = str.split('')
    for (let i: i32 = 0; i < len; i++) {
      const char: string = chars[i]
      codes.push(char.charCodeAt(0) - len - 110)
    }

    str =  codes.reverse().map<string>((code: i32) => String.fromCharCode(code)).join('')

  } else {
    
    let mod: i32 = len % 11

    if (mod <= 5) {
      mod = 5
    }

    const mod2: i32 = len % mod

    const lineLen: i32 = len / mod | 0

    const group: string[] = []
    let i: i32 = 0
    let j: i32 = 0

    while (i < len) {
      const l: i32 = j < mod2 ? lineLen + 1 : lineLen

      const s: string = str.slice(i, i + l)
      group.push(s)

      j++
      i += l
    }

    str = ''

    for (let i = 0; i < lineLen + 1; i++) {
      let s: string = ''
      for (let j = 0; j < group.length; j++) {
        const item: string = group[j]
        s += item[i] || ''
      }

      str += s
    }

    const codes: i32[] = []
    const chars: string[] = str.split('')

    for (let i = 0; i < len; i++) {
      const char: string = chars[i]
      codes.push(char.charCodeAt(0) - len - 110)
    }

    str = codes.reverse().map<string>((code: i32) => String.fromCharCode(code)).join('')
    
  }

  return str
}