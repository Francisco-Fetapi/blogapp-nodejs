const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();
const Post = require("./models/Post");

// Config

// Conexao com banco de dados

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Template Engine

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  Post.findAll({ order: [["id", "DESC"]] }).then((posts) => {
    const postagens = JSON.parse(JSON.stringify(posts, null, 2));
    res.render("home", {
      posts,
      titulo: "Titulo",
      postagens,
    });
  });
});

app.get("/cadastrar", (req, res) => {
  res.render("formulario");
});
app.post("/usuario", (req, res) => {
  const { titulo, conteudo } = req.body;
  Post.create({
    titulo,
    conteudo,
  }).then(() => {
    res.redirect("/");
  });
});
app.get("/post/eliminar/:id", (req, res) => {
  const { id } = req.params;
  Post.destroy({ where: { id } }).then(() => {
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("Servidor rodando..."));
