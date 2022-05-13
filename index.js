const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const app = express();

// Config

// Conexao com banco de dados
const Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Template Engine

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/cadastrar", (req, res) => {
  res.render("formulario");
});

app.listen(3000, () => console.log("Servidor rodando..."));
