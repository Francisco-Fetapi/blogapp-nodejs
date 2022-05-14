const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const admin = require("./routes/admin");
const app = express();
const path = require("path");

// Configurando o body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Configurando o handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Configurando a pasta public
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;

// Rotas

app.use("/admin", admin);

app.listen(PORT, () => {
  console.log("Servidor rodando...");
});
