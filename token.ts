import {RegexParser, map, TextParser} from './parser'
import {TokenType, Tokenizer, Parser} from './types'

export const tokenizer: Tokenizer = (type, parser) => {
  class Temp implements Parser {
    parse(input: string) {
      const result = parser.parse(input)
      return {
        ...result,
        expected: type,
        type
      }
    }
  }

  return new Temp()
}

// 数字
export const num = tokenizer(
  TokenType.NUMBER, 
  map(
    new RegexParser(/\d+(?:\.\d+)?/),
    v => +v
  )
)

// 加法操作符
export const addOperator = tokenizer(
  TokenType.ADD_OPERATOR,
  new RegexParser(/(\+|\-)/)
)

// 乘法操作符
export const mulOperator = tokenizer(
  TokenType.MUL_OPERATOR,
  new RegexParser(/(\*|\/)/)
)

// 左括号
export const leftBrackets = tokenizer(
  TokenType.LEFT_BRACKETS,
  new TextParser('(')
)

// 右括号
export const rightBrackets = tokenizer(
  TokenType.RIGHT_BRACKETS,
  new TextParser(')')
)

// 空格
export const whitespace = tokenizer(
  TokenType.WHITESPACE,
  new RegexParser(/\s+/),
)

// 结束符
export const eof = tokenizer(
  TokenType.EOF,
  new RegexParser(/^$/)
)