import {Parser} from './types'

// 文本解析器
export class TextParser implements Parser {
  match: string
  constructor(match: string) {
    this.match = match
  }

  parse(input: string) {
    return input.startsWith(this.match) ?
     {
       success: true,
       value: this.match, 
       rest: input.slice(this.match.length),
      } : {
        success: false,
        expected: this.match,
        actual: input
      }
  }
}

// 正则解析器
export class RegexParser implements Parser {
  regex: RegExp
  constructor(regex: RegExp) {
    this.regex = new RegExp(`^${regex.source}`);
  }
  parse(input: string) {
    const match = this.regex.exec(input);
    return match === null ? {
      success: false,
      expected: this.regex,
      actual: input
    } : {
      success: true,
      value: match[0],
      rest: input.slice(match[0].length)
    }
  }
}

// 映射解析结果
export function map(
  parser: Parser, 
  func: (data: string) => any
) {
  class Temp implements Parser {
    parse(input: string) {
      const result = parser.parse(input);
      return result.success ? {
        ...result,
        value: func(result.value!)
      } : result
    }
  }
  
  return new Temp()
}

// or
export function oneOf(...parsers: Parser[]) {
  class Temp implements Parser {
    parse(input: string) {
      const expected = []
      for (const parser of parsers) {
        const result = parser.parse(input);
        if (result.success) {
          return result;
        } else {
          expected.push(result.expected)
        }
      }
  
      return {success: false, expected: `oneof ${expected.join(',')}`, actual: input};
    } 
  }

  return new Temp()
}