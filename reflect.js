'use strict';
const assert = require('assert');

// garantir a semntica e seguranca dos objetos


// ---- apply
const myObj = {
    add(myValue) {
        return this.arg1 + this.arg2 + myValue;
    }
}
// Function.prototype.apply = () => { throw new TypeError('You are trapped!') }

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('You are trapped!') }

// esse aqui pode acontecer!
myObj.add.apply = function () { throw new TypeError('You are trapped!') }

assert.throws(
    () => myObj.add.apply({}, []),
    {
        name: 'TypeError',
        message: 'You are trapped!'
    })

// usando reflect:
const result = Reflect.apply(myObj.add, { arg1: 20, arg2: 20 }, [200])
assert.deepStrictEqual(result, 240)
// --- apply


// --- defineProperty
// questoes semanticas
function myDate() {}

// esse exemplo nao fica bonito, pois tudo é Object adicionando prop para uma function?
Object.defineProperty(myDate, 'withObject', { value: () => 'Hey there' })

// agora faz mais sentido
Reflect.defineProperty(myDate, 'withReflection', { value: () => 'Hey there' })

assert.deepStrictEqual(myDate.withObject(), 'Hey there')
assert.deepStrictEqual(myDate.withReflection(), 'Hey there')
// --- defineProperty



// --- deleteProperty
const withDelete = { user: 'AnaNeri' }
// nao é performatico, evitar ao máximo
delete withDelete.user

assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'AnaNeri' }
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)
// --- deleteProperty

// ---- get

// Deveriamos fazer um get somente em instancias de referencia
assert.deepStrictEqual(1['userName'], undefined)
// com reflection, uma execcao eh lancada!
assert.throws(() => Reflect.get(1, "userNmae"), TypeError)
// ---- get


// ---- has
assert.ok('superman' in { superman: '' })
assert.ok(Reflect.has({ batman: '' }, 'batman'))
// ---- has

// --- ownKeys
const user = Symbol('user')
const databaseUser = {
    id: 1,
    [Symbol.for('password')]: 123,
    [user]: 'ananeri'
}

// Com os metodos de object, temos que fazer 2 requisicoes
const objectKeys = [
    ...Object.getOwnPropertyNames(databaseUser),
    ...Object.getOwnPropertySymbols(databaseUser)
]
assert.deepStrictEqual(objectKeys, ['id', Symbol.for('password'), user])

// com refletion, so um metodo
assert.deepStrictEqual(Reflect.ownKeys(databaseUser), objectKeys)