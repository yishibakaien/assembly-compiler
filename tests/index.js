import assert from 'assert'
import { add, str, arr, sort, map, encode, decode } from '../build/debug.js'

assert.strictEqual(add(1, 2), 3)

assert.strictEqual(str('aa', 'bb'), 'aabb')

assert.strictEqual(arr([1], [2]), '12')

assert.deepStrictEqual(sort([3, 1, 4, 2]), [1, 2, 3, 4])

assert.deepStrictEqual(map([1, 2, 3, 5, 8]), '2|4|6|10|16')

// 字符串长度小于 11
assert.strictEqual(encode('我有一只小毛驴'), '髩汐岄呟乵松抆')
assert.strictEqual(decode('髩汐岄呟乵松抆'), '我有一只小毛驴')

// 字符串长度等于 11
assert.strictEqual(encode('我有一只小毛驴，。1_'), 'Ø汔把ª岈ほ呣ﾅ乹髭枂')
assert.strictEqual(decode('Ø汔把ª岈ほ呣ﾅ乹髭枂'), '我有一只小毛驴，。1_')

// 字符串长度大于 11
assert.strictEqual(
  encode('我有 一只小毛 驴，。1_{}()!@#$%^&*()'),
  '²®²º汤枒±­±る岘抚³¬Ćﾕ味¯ÉĄ髽争çªè©©'
)
assert.strictEqual(
  decode('²®²º汤枒±­±る岘抚³¬Ćﾕ味¯ÉĄ髽争çªè©©'),
  '我有 一只小毛 驴，。1_{}()!@#$%^&*()'
)

// 英文
assert.strictEqual(encode('my name is kangkang'), 'è¡¡ïôúâêîì¡èæïîââìï')
assert.strictEqual(decode('è¡¡ïôúâêîì¡èæïîââìï'), 'my name is kangkang')

// 阿拉伯数字
assert.strictEqual(encode('13760020995'), '®©ª²©²¯©°«¬')
assert.strictEqual(decode('®©ª²©²¯©°«¬'), '13760020995')

assert.strictEqual(encode('137-6002-0995'), '°­²´«®´«¬«±¨¨')
assert.strictEqual(decode('°­²´«®´«¬«±¨¨'), '137-6002-0995')

// 长字符串
const string =
  '从艺术的角度来讲，音乐是人类共同的语言，而______则是用来记录这种语言的符号。这也是世界各国通用的一种科学的记谱方法。 来源：《音乐实用教程》（西南师范大学出版社2017年版）从艺术的角度来讲，音乐是人类共同的语言，而______则是用来记录这种语言的符号。这也是世界各国通用的一种科学的记谱方法。 来源：《音乐实用教程》（西南师范大学出版社2017年版）从艺术的角度来讲，音乐是人类共同的语言，而______则是用来记录这种语言的符号。这也是世界各国通用的一种科学的记谱方法。 来源：《音乐实用教程》（西南师范大学出版社2017年版）从艺术的角度来讲，音乐是人类共同的语言，而______则是用来记录这种语言的符号。这也是世界各国通用的一种科学的记谱方法。 来源：《音乐实用教程》（西南师范大学出版社2017年版）从艺术的角度来讲，音乐是人类共同的语言，而______则是用来记录这种语言的符号。这也是世界各国通用的一种科学的记谱方法。 来源：《音乐实用教程》（西南师范大学出版社2017年版）'
assert.strictEqual(decode(encode(string)), string)

// 正反校验
assert.strictEqual(encode(decode(string)), string)

console.log('ok')
