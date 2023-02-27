<p align="center">
  <h3 align="center">PROIOT Challenge</h3>
  <p align="center">
    Backend para Plataforma IOT
  </p>
  <p align="center">
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/MADE%20WITH-TypeScript-007acc?style=for-the-badge&labelColor=35495d" alt="Built with TypeScript">
    </a>
    <a href="https://nodejs.org/">
      <img src="https://img.shields.io/badge/Node-7ac024?style=for-the-badge&labelColor=35495d" alt="Built with NodeJS">
    </a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Índice

-   [Índice](#Ídice)
-   [Introdução](#Introdução)
-   [Começando](#Começando)
    -   [Pré-requisitos](#Pré-requisitos)
    -   [Instalação Uso](#Instalação-E-Uso)
        -   [Uso Via NPM](#Uso-Via-NPM)
        -   [Via Docker](#Via-Docker)
        -   [Uso da API](#Uso-da-API)
-   [Swagger](#Swagger)

<!-- ABOUT THE PROJECT -->

## Introdução

Esse projeto, foi feito utilizando NodeJs e TypeScript, MongoDB.
Bibliotecas para auxiliar na produção do projeto.
A arquitetura utilizada foi CleanArch.

## Começando

Certifique-se de criar um arquivo .env e fornecer as variaveis MONGO_URI e PORT.

#### Pré-requisitos

`npm` e `node 18.12.1` instalado(os) em sua máquina.
Em relaçao ao Mongo, poderá usar o MongoAtlasCloud, ou baixar em seu dispositivo,
mas certifique-se da URL no arquivo `.env`

#### Instalação-E-Uso

Clone o repositório

```sh
git clone `https://github.com/tiagocsl/proiot-backend.git`
cd proiot-backend
```

##### Uso-Via-NPM

Install npm dependencies

```sh
npm i
```

Buildar App

```sh
npm run-script build
```

Inicilizar App

```sh
npm run-script start
```

Modo DEV

```sh
npm run-script dev
```

##### Uso-da-API

A API estará disponível em `localhost:3000`.
Há um endpoint para o Swagger, `/api/v1/docs`, ou seja, `localhost:3000/api/v1/docs`.
O endpoint base para usufruto da API, `/api/v1`, ou seja, `localhost:3000/api/v1`.
Há uma collection para adiantar o uso dos endpoints, via Insomnia.

#### Consideracoes-Finais

Desafio foi tratado como uma aplicaçao real, ou seja, foi estudado a viabilidade
de cada arquitetura e ate o framework que seria utilizado. O grande problema, foi
a falta de tempo, considerando o tempo gasto em coisas mais macro, outras coisas poderiam ter sido priorizadas.
Como por exemplo: validators nas rotas; DTO's, WebSockets, MQTT, melhorar um pouco a abordagem de como as rotas estao se comportando, Testes unitarios e de Integraçao, e o Docker.
