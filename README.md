# Sistema de postagens

<p align="center">
<a href="https://github.com/Francisco-Fetapi/blogapp-nodejs/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/Francisco-Fetapi/blogapp-nodejs?style=plastic"></a>
<a href="https://github.com/Francisco-Fetapi/blogapp-nodejs"><img alt="GitHub license" src="https://img.shields.io/badge/Exercise-For%20trainning-orange"></a>
<a href="https://github.com/Francisco-Fetapi/blogapp-nodejs/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/Francisco-Fetapi/blogapp-nodejs?style=plastic"></a>
<a href="https://github.com/Francisco-Fetapi/blogapp-nodejs/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/Francisco-Fetapi/blogapp-nodejs?style=plastic"></a>
<a href="https://github.com/Francisco-Fetapi/blogapp-nodejs"><img alt="GitHub license" src="https://img.shields.io/github/license/Francisco-Fetapi/blogapp-nodejs?style=plastic"></a>
</p>


Projeto criado no [Curso de Node.JS do Victor Lima](https://www.youtube.com/watch?v=LLqq6FemMNQ&list=PLJ_KhUnlXUPtbtLwaxxUxHqvcNQndmI4B) para consolidar os conhecimentos em **Node.js** e **Mongo.db**.

## Como rodar localmente

Para acessar localmente em **ambiente de desenvolvimento** basta realizar as instruções que se seguem:

### Pré-Requisitos

Algumas ferramentas são necessárias para rodar o projeto localmente, tais como:

1. NodeJS
2. Chrome (ou qualquer outro navegador)
3. Mongo

### Clonar o repositório

Com o terminal aberto, basta digitar/copiar a linha de código abaixo e clicar _ENTER_.

```
git clone https://github.com/Francisco-Fetapi/blogapp-nodejs.git
```

### Instalar as dependencias

O projeto necessita de certas dependencias para ser executado, para instalá-las, abra o _terminal_, navegue até a pasta do projeto clonado no passo anterior e digite/copie a linha de código abaixo e clique **ENTER**, em seguida, aguarde o processo de instalação das ferramentas ser concluido.

```
npm install
```

### Iniciar o projeto
```
npm start
```
Rode a aplicação no modo de desenvolvimento com o comando `npm start`(executar o comando na raiz do projeto).
Abra [http://localhost:3000](http://localhost:3000) para visualizar o projeto no navegador.

`NOTA:` Para iniciar o projeto, o servidor do `Mongo` deve estar rodando, para deixar ele rodando, abra o terminal e execute o comando:
```
mongod
```
