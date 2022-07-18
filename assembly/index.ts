// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function str(a: string, b: string): string {
  return a + b;
}

export function arr(a: i32[], b:i32[]): string {
  const arr = a.concat(b)
  return arr.join('')
}

export function sort(n: i32[]): i32[] {
  n.sort((n1, n2) => n1 - n2)
  return n
}

export function map(arr: i32[]): string {
  return arr.map<i32>((i: i32) => i * 2).join('|')
}

// 字符串加密算法
export function encode(str: string): string {
  const len: i32 = str.length
  const chars: string[] = str.split('')

  let codes: i32[] = []

  for (let i: i32 = 0; i < len; i++) {
    const char: string = chars[i]
    codes.push(char.charCodeAt(0) + len + 110)
  }

  codes = codes.reverse()

  str = codes.map<string>((code: i32) => String.fromCharCode(code)).join('')
  
  if (len < 11) return str

  let mod: i32 = len % 11
  if (mod <= 5) {
    mod = 5
  }

  const group: string[] = []

  let i: i32 = 0

  while (i < len) {
    let s: string = str.slice(i, i + mod) 
    group.push(s)
    i += mod
  }


  i = 0
  const g2: string[] = []
  while (i < mod) {
    let s: string = ''

    for (let k = 0; k < group.length; k++) {
      const item = group[k]
      s += item[i] || ''
    }

    g2.push(s)
    i++
  }

  return g2.join('')
}
