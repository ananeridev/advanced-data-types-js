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

No prototype chain quase tudo e herdado de Object, o que eh bom e ruim visto que se herda metodos da classe base, caso a classe base necessite de mais comportamentos;
todas as classes filhas sao afetadas.

Map eh mais indicado em cenarios que precisamos mudar chaves dinamicamente.

Melhor semantica de dados, traz varios metodos para troca de chaves de forma semantica ele implementa o ppadrao Generator!

Um otimo beneficio do map eh que podemos usar objetos como chaves de pesquisa, enquanto object trabalha apenas com strings e symbols