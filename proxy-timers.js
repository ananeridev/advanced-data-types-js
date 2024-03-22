'use-strict'

const Event = require('events')
const event = new Event()
const eventName = 'counter'
event.on(eventName, msg => console.log('counter updated', msg))

const myCounter = {
    counter: 0
}

const proxy = new Proxy(myCounter, {
    set: (target, propertKey, newValue) => {
        event.emit(eventName, { newValue, key:target[propertKey] })
        target[propertKey] = newValue
        return true
    },
    get: (object, prop) => {
        // console.log('chamou!', { object, prop })
        return object[prop]
    }
})
    
// jaja e sempre!
setInterval(function () {
    proxy.counter +=1
    console.log('[0]: setInterval')
    if(proxy.counter === 10) clearInterval(this)
}, 200)

// futuro
setTimeout(() => {
    proxy.counter = 4
    console.log('[0]: setTimeout')
})

// se quer que exeute agora
setImmediate(() => {
    console.log('[0]: setImmediate', proxy.counter)
})


// executa agora, aogrinha mas acaba com o ciclo de vida do node, uma ma pratica usar dessa forma
process.nextTick(() => {
    proxy.counter = 2
    console.log('[0]: nextTick')
})