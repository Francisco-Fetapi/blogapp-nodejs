const express = require("express");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const admin = require("./routes/admin");
const home = require("./routes/home");
const usuarios = require("./routes/usuario");
const app = express();
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

require("./config/auth")(passport);

// Configurando as sessoes
app.use(
  session({
    secret: "franciscofetapi",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Middlewares

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Configurando o body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Configurando o handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Configurando a pasta public
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

// Rotas
app.use("/admin", admin);
app.use("/", home);
app.use("/usuarios", usuarios);

app.listen(PORT, () => {
  console.clear();
  console.log("Servidor rodando...");
});
