const { Router } = require("express");
const router = Router();
const Usuario = require("../model/Usuario");
const passport = require("passport");

router.get("/registro", (req, res) => {
  res.render("usuarios/registro");
});
router.post("/cadastrar", (req, res) => {
  const { nome, email, senha, senha2 } = req.body;
  const erros = [];
  if (!nome || !email || !senha || !senha2) {
    erros.push({ texto: "Todos os campos são obrigatorios!" });
  } else if (senha !== senha2) {
    erros.push({ texto: '"Senha" e "Confirmar senha" devem ser iguais.' });
  }
  if (erros.length > 0) {
    res.render("usuarios/registro", { erros, ...req.body });
  } else {
    Usuario.create(req.body)
      .then(() => {
        req.flash("success_msg", "Usuario cadastrado com sucesso!");
        res.redirect("/");
      })
      .catch(() => {
        res.render("usuarios/registro", {
          erros: [{ texto: "Email já existe." }],
          ...req.body,
        });
      });
  }
});

router.get("/login", (req, res) => {
  res.render("usuarios/login");
});
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Deslogado com sucesso");
  res.redirect("/");
});
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/usuarios/login",
    failureFlash: true,
  })(req, res, next);
});

module.exports = router;
