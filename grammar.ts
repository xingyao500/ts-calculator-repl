import { AST, TokenType, Token } from './types'
import { ll1Table } from './ll1-table'

export function grammar(tokens: Token[]) {
  const root: AST = {
    name: TokenType.A,
    children: []
  }
  const parseStack = [root]

  while (tokens.length && parseStack.length) {
    const token = tokens[0]
    const ast = parseStack[0]
    /* 处理空字符 */
    if (ast.name === TokenType.EPS) {
      parseStack.shift()
      continue
    }

    /* 处理终结符 */
    if (token.type === ast.name) {
        ast.value = token.value
        tokens.shift()
        parseStack.shift()
        continue
    }

    /* 处理非终结符 */
    const nextExpr = ll1Table.get(ast.name)?.get(token.type)

    if (!nextExpr) {
      throw new Error(`grammar parse symbol error`)
    }
    const astChildren = nextExpr.split(' ').map(name => {
      const child:AST = {
        name: name as TokenType,
      }

      return child
    })
    ast.children = astChildren
    parseStack.shift()
    parseStack.unshift(...astChildren)
  }

  return root
}