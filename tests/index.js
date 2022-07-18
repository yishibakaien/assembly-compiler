import assert from 'assert'
import { add, str, arr, sort, map, encode } from '../build/debug.js'

assert.strictEqual(add(1, 2), 3)

assert.strictEqual(str('aa', 'bb'), 'aabb')

assert.strictEqual(arr([1], [2]), '12')

assert.deepStrictEqual(sort([3, 1, 4, 2]), [1, 2, 3, 4])

assert.deepStrictEqual(map([1, 2, 3, 5, 8]), '2|4|6|10|16')

// 字符串长度小于 11
assert.strictEqual(encode('我有一只小毛驴'), '髩汐岄呟乵松抆')

// 字符串长度等于 11
assert.strictEqual(encode('我有一只小毛驴，。1_'), 'Ø汔把ª岈ほ呣ﾅ乹髭枂')

// 字符串长度大于 11
assert.strictEqual(
  encode('我有 一只小毛 驴，。1_{}()!@#$%^&*()'),
  '²®²º汤枒±­±る岘抚³¬Ćﾕ味¯ÉĄ髽争çªè©©'
)

console.log('ok')
