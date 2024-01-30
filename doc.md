- Generators, Iterator e Async Iterators

- GENERATORS
em poucas palavras seu objetivo é fazer com que funções virem listas  e que entreguem os dados sob demanda

- mod iterators na aula de spies 

- aula 03, fibonacci
    - yield pra retornar a função

- generatos-iterators.js

pra usar promises temos que usar async operators
- no projeto do nodejs na pasta fs - modulo fs fs.dir
    - async iterators pra poder fazer a propriedade faz um while true, quando for null para o resultado
    - https://github.com/nodejs/node/blob/b938f88204945b02fb9a79b387c4961714fdaeb0/lib/internal/fs/dir.js#L222

- pra delegar funcoes tem que usar * na chamada do yeild

- pode obter todos os dados de um generator usando o iteradores, como rest spread, arrayFrom e for of
