const assert = require('assert');
const myMap = new Map();

// pode ter qualquer coisa como chave
myMap
    .set(1, 'one')
    .set('Ana', {text: 'two'} )
    .set(true, () => 'three')

// usando um construtor
const myMapWithConstructor = new Map([ 
    ['1', 'str1'],
    [1, 'num1'],
    [true, 'bool1']
])

// console.log('myMap', myMap)
// console.log('myMap.get(1)', myMap.get(1))

assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Ana'), {text: 'two'})
assert.deepStrictEqual(myMap.get(true)(), 'three')  

// Em Objects a chave so pode ser string ou symbol number e coergido pra string()

const onlyRefenceWorks = { id: 1 }
myMap.set(onlyRefenceWorks, {name: 'Ana'})

// se eu for querer usar uma chave tem que ter ela dispomnivel pra usar, symbol
assert.deepStrictEqual(myMap.get(onlyRefenceWorks), {name: 'Ana'})
assert.deepStrictEqual(myMap.get({id: 1}), {name: 'Ana'})

// utilitarios
// - No Object seria Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4)
