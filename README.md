<p align="right">
  <a href=""> English version </a>
</p>

<p align="center">
  <img src="https://res.cloudinary.com/dqqh1oigi/image/upload/v1594992537/Challenge%20Gostack%2006/GoStack_b27dh5.png" /> </br>
</p>

<h3 align="center">
  Desafio 06: Database Upload
</h3>

<p align="center">
  <a href="#Introdução-memo"> Introdução </a>
   | 
  <a href="#Visualização-mag"> Visualização </a>
   | 
  <a href="#Execução-rocket"> Execução </a>
   | 
  <a href="#Tecnologias-computer"> Tecnologias </a>
</p>

## Introdução :memo:

Este projeto foi motivado pelo desafio 06 do [Bootcamp GoStack](https://rocketseat.com.br/gostack) e consiste em uma API REST para gerência
de transações financeiras. Os consumidores da API usufruirão das seguintes funcionalidades:

<p>
  <ol>
    <li> Criar transações financeiras fornecendo título, tipo (entrada ou saída), valor e categoria; </li>
    <li> Listar transações financeiras e realizar o balanço de entradas, saídas e total em caixa; </li>
    <li> Deletar uma transação financeira informando o seu ID; </li>
    <li> Criar transações financeiras a partir da importação de um arquivo .csv </li>
  </ol>
</p>

## Visualização :mag:

Para acesso às rotas da API, foi utilizado o software [Insomnia Core](https://insomnia.rest/). 

## Execução :rocket:

Para executar a API, siga as instruções:

<p>
  <ol>
    <li> Instalar dependências de projeto através do comando <b>yarn</b> </li>
    <li> 
      Criar instância do Postgres no docker e com o software cliente SQL (ex.: <a href="https://dbeaver.io/" target="_blank"> DBeaver</a>),
      criar também um banco de dados chamado gostack_desafio06;
    </li>
    <li> Executar as migrations através do comando <b>yarn typeorm migration:run</b> </li>
    <li> Inicializar API no servidor através do comando <b>yarn dev:server</b> </li>
  </ol>
</p>

## Tecnologias :computer:

Este projeto foi desenvolvido com as seguintes tecnologias:

- [Docker](https://www.docker.com/)
- [Postgres](https://hub.docker.com/_/postgres)
- [TypeORM](https://typeorm.io/#/)
- [Multer](https://www.npmjs.com/package/multer)
