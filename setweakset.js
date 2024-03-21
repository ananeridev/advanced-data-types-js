const assert = require('assert');

// usado na maioria das vezes para Listas de itens unicos

const arr1 = ["0", "1", "2"]
const arr2 = ["2", "0", "3"]
const arr3 = arr1.concat(arr2)
// console.log('arr3', arr3.sort())
assert.deepStrictEqual(arr3.sort(), [ '0', '0', '1', '2', '2', '3' ])

const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item))

console.log('set', set)
// set Set(4) { '0', '1', '2', '3' }

assert.deepStrictEqual(Array.from(set), [ '0', '1', '2', '3' ])

// utilizando rest/spread
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), [ '0', '1', '2', '3' ])

// console.log('set.keys()', set.keys())  
// console.log('set.values()', set.keys())   // so existe por conta do 
// set.keys() [Set Iterator] { '0', '1', '2', '3' }
// set.values() [Set Iterator] { '0', '1', '2', '3' } 

// no Array comum, para saber se um item existe
// [].indexOf('1') !== -1 ou [].includes('0')
assert.ok(set.has('3'))

// na mesma teroria do map, se vc sempre trabalha com a lista toda
// nao tem get, entao voce pode saber se o item esta ou nao no array e eh isso.
// na doc tem exemplos sobre como fazer uma interseccao, saber o que tem em uma lista e nao tem na outra

// tem nos dois arrays
const users01 = new Set([
    'ana',
    'julie',
    'spock'
])

const users02 = new Set([
    'ana',
    'pacoca',
    'scooby'
])

const intersection = new Set([...users01].filter(user => users02.has(user)))
assert.deepStrictEqual(Array.from(intersection), ['ana'])

const difference = new Set([...users01].filter(user => !users02.has(user)))
assert.deepStrictEqual(Array.from(difference), ['julie', 'spock'])

// - WeakSet, tem as mesmas "limitacoes" que o weakmap

// nao eh enumeravel (iteravel)
// so faz sentido pra valores que se mantem na memoria por referencia

const user = { id: 123 }
const user2 = { id: 456 }

const weakSet = new WeakSet([user])
weakSet.add(user2)
weakSet.delete(user)
weakSet.has(user)