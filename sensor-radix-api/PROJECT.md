# Detalhes extras sobre o projeto.

Para uma concepção inicial do projeto, visite [README.md](./README.md).

## Plano inicial

Devido à necessidade de um acesso de sensores externos ao sistema, foi planejada 
a adoção de uma arquitetura cliente-servidor. E para esta, o .NET Core 3, assim como 
outros frameworks de outras linguagens, tem uma ótima solução, a **WebAPI**, que foi 
a arquitetura escolhida para o projeto como um todo. Num formato **cliente-servidor** 
a solução teria a API (Usando ASP.NET Core 3) e um cliente (Usando React).

[Para ler a descrição do projeto-cliente, clique aqui](..\sensor-radix-client\PROJECT.md)

## O projeto

Devido à ter uma arquitetura mais simples de uma visão abstrata, foi decidido que a API
seria desenvolvida após o término da aplicação cliente, pois assim eu obteria uma perspectiva
maior sobre a real necessidade do back-end do projeto, se aproximando mais do usuário-final.

O .NET CLI contém algumas tecnologias que auxiliam (e muito) na construçao de APIs. Todavia, 
eu estava em busca de definir um modelo que fosse escalável ao negócio.

## O modelo

Realizei a construçao do modelo com base nos envios dos sensores. Primeiramente, o modelo iria conter 
"Id" (Identificação de cada evento), "Tag" (identificação de cada sensor), "Timestamp" (identificação da hora do evento), "Status" (Processado/Erro) e "Valor" (Valor fornecido pelo sensor).

Todavia, posteriormente notei que este modelo podia não atender a necessidade do cliente totalmente. O objetivo era converter em tempo real o Timestamp, antes UnixTimeStamp, para tipo Datetime. Porém, isto faria com que o cliente perdesse o valor "UnixTimeStamp" no banco de dados, conforme enviado pelo sensor, e poderia causar problemas de validação para a solução.

## O timestamp

Isto poderia ser solucionado com três formas: Desativar a validação e implementá-la do início; Manter a validação, porém usar um JSONConverter;Manter a validação e alterar o modelo.

A primeira solução é uma abordagem um pouco agressiva, e de forma deselegante, poderia levar à falhas de segurança posteriormente. A segunda tratava este problema, porém, não manteria o dado real obtido pelo sensor, mas sim executaria um processamento em cima dele. Isto fez com que a terceira fosse uma solução adequada, além de bem elegante. Para a escrita do banco de dados, não haveria necessidade de guardar ambas, porém para a entrega para a aplicação cliente isto agregaria valor.

## Solução

O modelo foi alterado para conter "Timestamp" e "TimestampDt", onde o TimestampDt apenas continha um getter, que convertia o Timestamp para um formato Datetime.

## Conclusão

Após o término da remodelagem da solução, a mesma se tornou bem simples de implementar. Apenas havia necessidade de manter um método POST em aberto para os sensores enviarem e um GET para uso da aplicação cliente.

## O que eu faria se tivesse mais tempo?

- Com toda certeza escrever testes para a aplicação, a simplicidade não demandou, porém para escalabilidade poderia ser necessário posteriormente.

- Criar uma maior integração da aplicação com metodologias Devops.