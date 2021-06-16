import {oneOf} from './parser'
import {num, addOperator, mulOperator,leftBrackets, rightBrackets, whitespace, eof} from './token'
import { Token, TokenType } from './types'

// 有效的 token
function validToken() {
  return oneOf(num, addOperator,mulOperator,leftBrackets,rightBrackets, whitespace, eof)
}

// 词法解析
export function lex(input: string) {
  let result
  const tokens = []
  const parser = validToken()

  while(
    (result = parser.parse(input) as Token)
  ) {
    if(!result.success) {
      throw new Error(`lexical parse error：expected ${result.expected}, actual ${result.actual}`)
    }
    // 不记录无用的 token
    TokenType.WHITESPACE === result.type || tokens.push(result)
    input = result.rest!

    if(result.type === TokenType.EOF) {
      break
    }
  }
  
  return tokens
}