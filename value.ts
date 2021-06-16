import { AST, TokenType } from './types'

export function value(root: AST, stack: any[] = []):any {
  switch (root.name) {
    // 处理数字
    case TokenType.NUMBER:
      stack.push(root.value)
      break
    // 处理加法和乘法表达式
    case TokenType.A1:
    case TokenType.M1:
      if(root.children![0].name !== TokenType.EPS) {
        root.children?.slice(0).forEach(
          child => value(child, stack)
        )
        const right = stack.pop()
        const left = stack.pop()
        stack.push(eval(`${left}${root.children![0].value}${right}`))
      }
      break

    default:
      root.children?.forEach(
        child => value(child, stack)
      )
  }

  return stack[0]
}