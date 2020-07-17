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
de transações financeiras. Os clientes da API (ex.: aplicações web e mobile) usufruirão das seguintes funcionalidades:

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

Acessando a rota de criação de uma transação e passando as informações no formato JSON, a API se encarregará de criar uma nova transação 
com as informações repassadas e retornará um objeto com o molde disposto abaixo.

<h6 align="center"> Figura 01 - Rota create transaction </h6>
<p align="center">
  <img src="https://res.cloudinary.com/dqqh1oigi/image/upload/v1595000285/Challenge%20Gostack%2006/createTransaction_xrsqna.png" /> </br>
</p>

Acessando a rota de listagem de transações, a API irá listar as transações criadas e realizar o balanço, considerando as entradas, saídas 
e o total em caixa.

<h6 align="center"> Figura 02 - Rota list transactions </h6>
<p align="center">
  <img src="https://res.cloudinary.com/dqqh1oigi/image/upload/v1595000798/Challenge%20Gostack%2006/listTransactions_absbrx.png" /> </br>
</p>

Acessando a rota para deletar uma transação, deverá ser informado o ID da transação a ser deletada nos parâmetros da requisição.

<h6 align="center"> Figura 03 - Rota delete transactions </h6>
<p align="center">
  <img src="https://res.cloudinary.com/dqqh1oigi/image/upload/v1595001304/Challenge%20Gostack%2006/deleteTransaction_ea4l1d.png" /> </br>
</p>

Ao importar um arquivo .csv, a API se encarregará de realizar uma stream dos dados e inseri-los no banco de dados após completar sua 
leitura. As imagens a seguir demonstram o arquivo .csv e o sucesso de sua importação na API.

<h6 align="center"> Figura 04 - Arquivo .csv </h6>
<p align="center">
  <img src="https://res.cloudinary.com/dqqh1oigi/image/upload/v1595001620/Challenge%20Gostack%2006/fileCSV_dfdpfd.png" /> </br>
</p>

<h6 align="center"> Figura 05 - Rota import files .csv </h6>
<p align="center">
  <img src="https://res.cloudinary.com/dqqh1oigi/image/upload/v1595000963/Challenge%20Gostack%2006/importTransactions_bxqk0k.png" /> </br>
</p>

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
