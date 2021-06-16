import prompts from 'prompts'
import {lex} from './lex'
import {grammar} from './grammar'
import {value} from './value'
import {writeFileSync} from 'fs'

export default async function() {
  let loop = true
  console.log(`***************** Happy Using Calculator REPL *******************\n`)
  while(loop) {
    try{
      const response = await prompts({
        type: 'text',
        name: 'statement',
        message: 'Calculator>',
      }, {
        onCancel: () => { 
          loop = false 
          console.log('Bye!')
        }
      })

      if(loop) {
        // 处理用户输入
        console.log(value(grammar(lex(response.statement))))
        // writeFileSync('a.json',JSON.stringify(grammar(lex(response.statement))))
      }
    } catch(error) {
      console.error(error)
    }
  }
}
