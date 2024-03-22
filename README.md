# Generators, Iterator e Async Iterators

- GENERATORS
Em poucas palavras seu objetivo é fazer com que funções virem listas  e que entreguem os dados sob demanda

Pode obter todos os dados de um generator usando os iteradores

- mod iterators na aula de spies 

- aula 03, fibonacci
    - yield pra retornar a função

- generatos-iterators.js

pra usar promises temos que usar async operators
- no projeto do nodejs na pasta fs - modulo fs fs.dir
    - async iterators pra poder fazer a propriedade faz um while true, quando for null para o resultado
    - https://github.com/nodejs/node/blob/b938f88204945b02fb9a79b387c4961714fdaeb0/lib/internal/fs/dir.js#L222

- pra delegar funcoes tem que usar * na chamada do yield

- pode obter todos os dados de um generator usando o iteradores, como rest spread, arrayFrom e for of

# O tipo Symbol

O Symbol é um tipo de dado único e imutável em JavaScript, usado principalmente como identificador para as propriedades dos objetos. Cada vez que a função Symbol() é chamada, um novo e único símbolo é criado.

No exemplo do codigo symbol.js, um símbolo kItems é criado e usado como uma chave de propriedade na classe MyDate. O valor de this[kItems] é um array de datas. 
Esta propriedade não é acessível pelos meios usuais de acesso às propriedades do objeto, tornando os símbolos úteis para anexar metadados aos objetos ou criar propriedades privadas.

O código também demonstra o uso de símbolos bem conhecidos, que são valores de símbolos predefinidos que o JavaScript usa internamente. Estes incluem Symbol.iterator, Symbol.toPrimitive e Symbol.asyncIterator.

Na classe MyDate, esses símbolos bem conhecidos são usados para personalizar o comportamento padrão das instâncias da classe. Por exemplo, Symbol.iterator é usado para tornar a classe iterável, Symbol.toPrimitive é usado para controlar a coerção de string das instâncias da classe, e Symbol.asyncIterator é usado para criar um iterador assíncrono.

# Map e WeakMap

## Map
No prototype chain quase tudo e herdado de Object, o que eh bom e ruim visto que se herda metodos da classe base, caso a classe base necessite de mais comportamentos;
todas as classes filhas sao afetadas.

Map eh mais indicado em cenarios que precisamos mudar chaves dinamicamente.

Melhor semantica de dados, traz varios metodos para troca de chaves de forma semantica ele implementa o ppadrao Generator!

Um otimo beneficio do map eh que podemos usar objetos como chaves de pesquisa, enquanto object trabalha apenas com strings e symbols

**Na pratica eu posso usar a estrutura map ao inves do objeto nos seguintes casos:**

**- Preciso adiconar uma chave com frequencia**

**- Validar se a chave existe de forma semantica**

**- Preciso que o objeto funcione como banco de dados**

**- Casos que precisa limpar a referencia apos o uso(html -> user clica no botao reset)**

## Weak Map
Em caso de ter que adicionar e remover chaves do objeto e posso pesquisar pelo ID, o weak map pode ajudar

No weak map so posso usar objetos como chave e ele nao eh enumerador! (nao da pra navegar com for of)

Ele ganha com vantagem em nivel de performcance, os dados so ficam nele enquanto existirem em memoria

**Fibonacci - weak map teria uma boa utilizacao pois o js poderia limpar os dados que nao estao mais sendo utilizados**

Essa estrutura acada sendo raridade a nao ser que trabalhe em ferramentas internas!

*tem um exemplo de utilizacao do weakmap no errors.js do projeto do node:*

[encoding.js](https://github.com/nodejs/node/blob/14699846452e627f97dedb85991eea67d932a79d/lib/internal/encoding.js#L76)

[inspector.js](https://github.com/nodejs/node/blob/dd5f209213a2b75bb386b44c296a059fc10dfb02/lib/inspector.js#L51)

[errors.js](https://github.com/nodejs/node/blob/893d8a60cbf7ae3d42655547beb703249b96d895/lib/internal/errors.js#L78)

# Set e WakSet

Referencias de listas unicas - uma opcao melhor do que fazer map e reduce

*tem um exemplo de utilizacao do weakmap no errors.js do projeto do node:*
[url.js](https://github.com/nodejs/node/blob/00b5ee6083bfbd8e3f63a574411300c5e5f42bd7/lib/url.js#L105)
[iterable_weak_map.js](https://github.com/nodejs/node/blob/cef144421c5ff6e9677ecf0b7a607000b744aa13/lib/internal/util/iterable_weak_map.js#L34)
[event_target.js](https://github.com/nodejs/node/blob/dc79f3f37caf6f25b8efee4623bec31e2c20f595/lib/internal/event_target.js#L95)

# Reflection

Interceptar comportamento padrao das funções... ele veio pra usar problemas de semântica do js

No projeto do Nodejs usam para fazer cópias seguras dos objetos - makeSafe function

# Proxy e Node.js timers

Estrutura Proxy é parecido com o design patterns Observer.. ele fica esperando as funções serem executadas com tempo limites dependendo do operador
core.js http2

Basicamente o flluxo de vida do node.js temos os:
setInterval
setTimeout
setImmediate
process.nextTick

No print que mostra a exeução do código do exemplo se indentifica muito bem como que eles operam

```
counter updated { newValue: 2, key: 0 }
[0]: nextTick
counter updated { newValue: 4, key: 2 }
[0]: setTimeout
[0]: setImmediate 4
counter updated { newValue: 5, key: 4 }
[0]: setInterval
counter updated { newValue: 6, key: 5 }
[0]: setInterval
counter updated { newValue: 7, key: 6 }
[0]: setInterval
counter updated { newValue: 8, key: 7 }
[0]: setInterval
counter updated { newValue: 9, key: 8 }
[0]: setInterval
counter updated { newValue: 10, key: 9 }
[0]: setInterval
```