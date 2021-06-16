// 解析结果
export interface ParseResult {
  success: boolean // 是否成功
  value?: string // 解析出的具体字符串
  rest?: string // 剩余待解析的字符串
  expected?: string | RegExp // 期望的输入
  actual?: string // 实际的输入
}

// 解析器
export interface Parser {
  parse(input: string): ParseResult | Token
}

// 标签类型
export enum TokenType {
  // 终结符
  NUMBER = 'number',
  ADD_OPERATOR = 'add_operator',
  MUL_OPERATOR = 'mul_operator',
  LEFT_BRACKETS= 'left_brackets',
  RIGHT_BRACKETS = 'right_brackets',
  WHITESPACE = 'whitespace',
  EOF = 'eof',

  // 非终结符
  A = 'A',
  A1 = `A1`,
  M = 'M',
  M1 = 'M1',
  E = 'E',
  EPS = 'EPS', // 空字符
}

// 标签
export interface Token extends ParseResult {
  type: TokenType
}

// 标记函数
export interface Tokenizer {
  (type: string, parser: Parser): Parser
}

// LL1 表
export type LL1Table = Map<TokenType, Map<TokenType, string>>

// ast 
export interface AST {
  name: TokenType // ast 名称
  value?: string // 终结符取值
  children?: AST[] // 子节点
}