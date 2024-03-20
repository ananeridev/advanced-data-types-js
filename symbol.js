const assert = require('assert')

// --- KEY ---
// cada vez que chama o  symbol ele cria uma referencia de memoria diferente
const uniqueKey = Symbol("userName")
const user = {}

user["userName"] = "value for normal objects"
user[uniqueKey] = "value for uniqueKey"

// console.log("getting normal object", user.userName)
// console.log("getting normal object", user[Symbol("userName")]) // undefined por ser um metadado que nao pode ser acessado
// console.log("getting normal object", user[uniqueKey])

assert.deepStrictEqual(user.userName, "value for normal objects")

// sempre unico em nivel de endereco de memoria
assert.deepStrictEqual(user[Symbol("userName")], undefined)
assert.deepStrictEqual(user[uniqueKey], "value for uniqueKey")

// eh dificil de acessar diretamente porem esta la.. deveria estar privado
// console.log('symbols', Object.getOwnPropertySymbols(user)[0]) // retorna um array com os symbols

assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - ma pratica (nem tem no codebase do node)
user[Symbol.for("password")] = 123
assert.deepStrictEqual(user[Symbol.for("password")], 123)
// --- KEYS ---


// Well Known Symbols
const obj =  {
    // iteratorns
    [Symbol.iterator]: () => ({ 
        items: ['c', 'b', 'a'],
        next() {
            return {
                done: this.items.length === 0,
                // remove o ultimo e retorna o valor
                value: this.items.pop()
            }
        }
    }),
}
assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')
class MyDate {
    constructor(...args) {
        this[kItems] = args.map(arg => new Date(...arg))
    }
   [Symbol.toPrimitive](coercionType) { 
    if(coercionType !== "string") throw new TypeError()
    const items = this[kItems]
                .map(item => 
                    new Intl.DateTimeFormat('pt-BR', { month: 'long', day: '2-digit', year: 'numeric'})
                    .format(item))
    return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction'}).format(items)
   }
    *[Symbol.iterator]() { 
        for (const item of this[kItems]) {
            yield item
        }
    }
    // pra trabalhar com promises
    async *[Symbol.asyncIterator]() {
        const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))
        for (const item of this[kItems]) {
            await timeout(100)
            yield item.toISOString()
        }
    }
   get [Symbol.toStringTag]() { 
        return 'WHAT'
    
    }
}


const myDate = new MyDate([1995, 7, 24], [1995, 7, 25])
const expectedDates = [ new Date (1995, 7, 24), new Date (1995, 7, 25) ]

console.log('myDate', myDate[kItems])

// promises.js - projeto node.js

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT]')
assert.throws(() => myDate + 1,  TypeError)

// coercao explicita para chamar o toPrimitive
assert.deepStrictEqual(String(myDate), '24 de agosto de 1995 e 25 de agosto de 1995' )

// implementar o iterator!
assert.deepStrictEqual([...myDate], expectedDates)

// ;(async() => {
//     for await (const item of myDate) {
//         console.log('asyncIterator', item)
//     }
// })()
// asyncIterator 1995-08-24T03:00:00.000Z
// asyncIterator 1995-08-25T03:00:00.000Z

// meta programacao pra garantir os tipos de dados, pra garantir que o usuario nao vai ter acesso direto nos dados
;(async() => {
    const dates = await Promise.all([...myDate])
    assert.deepStrictEqual(dates, expectedDates)
})()