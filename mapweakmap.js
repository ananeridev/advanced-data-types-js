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
// assert.deepStrictEqual(myMap.get({id: 1}), {name: 'Ana'})

// utilitarios
// - No Object seria Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4)


// para verificar se um item existe no objeto
// item.ly  = se nao existe = undefined
// if() = coercao implicita para boolean e retorna false
// O jeito certo em Object eh ({ name: 'Ana'}).hasOwnProperty('name')
assert.ok(myMap.has(onlyRefenceWorks))

// para remover um item do objeto
// delete item.id 
// imperformatico para o js
assert.ok(myMap.delete(onlyRefenceWorks))

// nao da pra iterar em Objects diretamente
// tem que usar Object.entries(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1,"one"],["Ana",{"text":"two"}],[true, ()=>{} ]]))

// for (const [key, value] of myMap) {
//     console.log({key, value})
// }

// Object eh inseguro pq dependendo do nome da chave, pode substituir algum comportamento padrao
// ({ }).toString() === '[object Object]'
// ({toString: () => 'Hey'}).toString() === 'Hey'   

// qualquer chave pode colidir, com as propriedades herdadas do objeto, como constructor, toString, valueOf, hasOwnProperty

const actor = {
    name: 'Xuxa da Silva',
    toString: 'Queen: Xuxa da Silva' 
}

// nao tem restricao de nome de chave
myMap.set(actor)


assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// Nao da pra limpar um Obj sem reassinar
myMap.clear() // limpar contexto do user na tela
assert.deepStrictEqual([...myMap.keys()], [])


// -- WeakMap

// Pode ser coletado apois perder as referencias
// usado em casos super especificos

// tem a maioria dos beneficios do Map
// MAS nao eh iteravel
// So as chaves de referencia eh que vc ja conheca
// mais leve e preve leak de memoria, pq depois que as intancias saem da memoria e eh tudo limpo

const weakMap = new WeakMap()
const hero = { name: 'Batman'}

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)

