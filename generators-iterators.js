const assert = require('assert');

function* calculation(arg1, arg2) {
  yield arg1 * arg2;
}

function* main() {
  yield 'Hello';
  yield 'Guys';
  yield '--';
  yield 'Bye';
  yield* calculation(5, 5)
}

const generator = main();

// next e outros valores por padrao
// console.log(generator.next()); 

// { value: 'Hello', done: false }   

// console.log(generator.next())
// console.log(generator.next())

// se o done tiver true a execucao do generator terminou
// na segunda chamada retorna undefiened

// busca o valor ate ser undefined

// -------- testes e validações

assert.deepStrictEqual(generator.next(), { value: 'Hello', done: false });
assert.deepStrictEqual(generator.next(), { value: 'Guys', done: false });
assert.deepStrictEqual(generator.next(), { value: '--', done: false });
assert.deepStrictEqual(generator.next(), { value: 'Bye', done: false });
assert.deepStrictEqual(generator.next(), { value: 25, done: false });

// array from retorna o objeto a partir do generator
// console.log('Array from', Array.from(main()), ['Hello', 'Guys', '--', 'Bye', 25])

// rest spread
// console.log([...main()], ['Hello', 'Guys', '--', 'Bye', 25])


// -- async iterators
const { readFile, stat, readdir } = require('fs/promises');
function* promisified() {
  yield readFile(__filename);
  yield Promise.resolve('Hey Jude');
}

async function* systemInfo() {
  const file = await readFile(__filename);
  yield { file: file.toString() }

  // traz a taxa de bites do arquivo
  const { size } = await stat(__filename)
  yield { size }

  const dir = await readdir(__dirname);
  yield { dir }
}

// Promise.all([...promisified()]).then(results => {
//     console.log('promisified', results)

// } )

// -- closure
;(async () => {
    for await (const item of systemInfo()) {
        console.log('systemInfo', item)
    }
})()


