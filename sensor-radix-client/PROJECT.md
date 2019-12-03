# Detalhes extras sobre o projeto.

Para uma concepção inicial do projeto, visite [README.md](./README.md).

## Plano inicial

Devido à necessidade de um acesso de sensores externos ao sistema, foi planejada 
a adoção de uma arquitetura cliente-servidor. E para esta, o .NET Core 3, assim como 
outros frameworks de outras linguagens, tem uma ótima solução, a **WebAPI**, que foi 
a arquitetura escolhida para o projeto como um todo. Num formato **cliente-servidor** 
a solução teria a API (Usando ASP.NET Core 3) e um cliente (Usando React).

[Para ler a descrição do projeto-cliente, clique aqui](..\sensor-radix-api\PROJECT.md)

## O projeto

Devido à arquitetura de fácil implementação ao se tratar da tecnologia .NET Core 3, decidi iniciar 
o projeto pelo front-end, pois assim teria uma perspectiva melhor da necessidade do cliente, 
melhorando a experiência do usuário.

Devido à não haver um tempo relativamente grande para a construção do projeto, **foi optado por não 
utilizar Redux**. O mesmo permitiria uma maior escalabilidade da aplicação, porém tem um trade-off 
de adicionar uma maior complexidade no projeto (Para casos de projetos simples), enquanto o React 
é mais simples por definição, mas não tão poderoso quanto quando o complementamos com Redux.

Dada também a necessidade de simplicidade, foi adotado o uso do **Material design**. Há uma biblioteca 
de Material-UI para React, com alguns componentes prontos que facilitaram criar uma interface bonita e
uma boa experiência para o cliente tanto em Mobile quanto em Web.

Com isso em mente, iniciei a criação de um MVP para a solução.

## A interface

O objetivo principal nesta etapa era criar um produto mínimo que agregasse valor ao cliente. Então como 
seria a navegação da interface? Quais cores deveriam estar no projeto? Outras perguntas semelhantes à 
esta vieram à minha mente.

Pensei em realizar a navegação via sidebar, todavia, as sidebars não soam tão naturais para usuários Web, 
e torná-las responsivas pode adicionar uma camada de complexidade que eu não desejava para o projeto.

Portanto, foi adotada uma abordagem de guias (Tabs) para a interface.

### Cores

As cores foram selecionadas com base no logo da Radix (Que continha o branco junto da cor roxa, predominante 
no logo). Além disto, roxo é uma cor agradável para a maioria das pessoas. [Ler referência](https://hypescience.com/as-cores-favoritas-entre-homens-e-mulheres/)

### material-table

Visto que haveria uma necessidade de criação de uma tabela, junto à necessidade de manter o design do 
material-ui, encontrei uma tabela quase-perfeita que atendia ambas as necessidades, e o melhor: Bem 
simples de implementar! A mesma foi desenhada para combinar com o React, portanto contém um suporte 
muito bom para Props e etc.

Todavia, a dificuldade que a tabela ter de atualizar automaticamente poderia agregar, me deixava um 
pouco preocupado quanto a quantidade de dados que este componente conseguiria renderizar.

Isto me levou à usar o **json-server** em conjunto com o **Faker.js** para conseguir realizar testes 
mais intensos. A tabela pareceu suportar toda a interação sem causar muitos danos à experiência do 
usuário.

### Moment.js

Outra dificuldade que poderia aparecer é o UnixTimeStamp que o sensor passaria para a API. Como eu 
o processaria? Pela API ou pelo cliente? Isto depende de algumas variáveis extras, como o porte do 
servidor, que neste caso era desconhecido para mim. Assim, eu tinha a necessidade de resolver isto 
no cliente. O Moment.js me forneceu toda a interface necessária para a solução do problema, o mesmo 
abstrai essa camada e trata o dado de diversas formas, o que era uma ótima idéia em questão de reduzir
o retrabalho. Portanto, uma tecnologia perfeita para a solução deste caso.

### Victory.js

Ao se tratar de JavaScript, eu não havia experiência alguma com visualização de dados (Apenas em Python).

O Victory.js se apresentou como uma solução simples e robusta para os casos. O mesmo havia componentes 
para todas as minhas necessidades, eu necessitava apenas **modelar os dados de forma que ele pudesse 
aceitar**, e por mais que pareça, isto deu um certo trabalho. Durante as buscas, notei que o **lodash** 
(que até então eu não conhecia) havia um método *GroupBy*, que levaria os dados à estarem num formato 
bem próximo do que o Victory necessitava (Anteriormente, eu havia implementado essa lógica manualmente. 
Portanto, isto forneceu um grande auxílio para simplificar um pouco mais o software.)


## A solução para tags

Para as tags, a API iria fornecer um padrão "<pais>.<região>.<nome>" para o sensor. Portanto, era necessário dividir os pontos em um array, onde o primeiro índice seria o país, o segundo a região e o terceiro o nome.

Para a criação da Tabela na aba "Overview" esta lógica foi utilizada massivamente, onde a soma dos eventos ocorridos era dada pela separação "pais",  "pais + . + região" e "pais + . + região + . + nome", e assim se somando todos os sensores que adotavam as mesmas identificações 

Por exemplo:

- brasil.sudeste.sensor01
- brasil.nordeste.sensor02

Os mesmos compartilham o mesmo país, portanto ambos seriam somados em "Brasil", porém, para a região e o nome, ambos são diferentes,  neste caso a soma não ocorreria.

## Conclusão

Após o término da implementação desta parte do projeto, passei à implementar a API. O front-end deste projeto me permitiu aprender muito sobre React, mesmo sendo bem simples.

## O que eu faria se tivesse mais tempo?

Abaixo, listo algumas tarefas que executaria em caso de um prazo maior:

- Criação de testes mais abrangentes

- Melhoria nas redundâncias de código

- Aplicaria simplicidade (Alguns patterns como Observer, factory e outros agregariam uma maior escalabilidade ao projeto)

- Revisaria por possíveis soluções diferentes.

- Reduziria o consumo de recursos (Não realizei a etapa de profilling, apesar de saber que podia melhorar muita coisa)