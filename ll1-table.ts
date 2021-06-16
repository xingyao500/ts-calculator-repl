import {LL1Table, TokenType} from './types'
const table = [
  [
    null, 
    TokenType.NUMBER,
    TokenType.LEFT_BRACKETS,
    TokenType.RIGHT_BRACKETS, 
    TokenType.ADD_OPERATOR, 
    TokenType.MUL_OPERATOR,
    TokenType.EOF
  ],
  [
    TokenType.A, 
    `${TokenType.M} ${TokenType.A1}`, 
    `${TokenType.M} ${TokenType.A1}`, 
    null, 
    null, 
    null, 
    null
  ],
  [
    TokenType.A1, 
    null, 
    null, 
    TokenType.EPS, 
    `${TokenType.ADD_OPERATOR} ${TokenType.M} ${TokenType.A1}`, 
    null, 
    TokenType.EPS],
  [
    TokenType.M, 
    `${TokenType.E} ${TokenType.M1}`,
    `${TokenType.E} ${TokenType.M1}`,
    null,
    null,
    null,
    null
  ],
  [
    TokenType.M1,
    null,
    null,
    TokenType.EPS,
    TokenType.EPS,
    `${TokenType.MUL_OPERATOR} ${TokenType.E} ${TokenType.M1}`,
    TokenType.EPS
  ],
  [
    TokenType.E,
    TokenType.NUMBER,
    `${TokenType.LEFT_BRACKETS} ${TokenType.A} ${TokenType.RIGHT_BRACKETS}`,
    null,
    null,
    null,
    null
  ]
]
export const ll1Table:LL1Table = table.reduce(
  (map, expr, index) => {
    if(index ===  0) {
      return map
    }
    const temp = new Map()
    map.set(expr[0], temp)

    for(let j = 1;j < expr.length;j++) {
      temp.set(table[0][j], expr[j])
    }

    return map
  },
  new Map()
)