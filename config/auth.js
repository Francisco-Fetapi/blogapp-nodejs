const localStrategy = require("passport-local").Strategy;
const mongoose = require("../model/db.config");
const bcrypt = require("bcryptjs");
const Usuario = require("../model/Usuario");

module.exports = (passport) => {
  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "senha" },
      (email, senha, done) => {
        Usuario.findOne({ email }).then((usuario) => {
          if (!usuario) {
            return done(null, false, { message: "Este usuario não existe!" });
          }
          bcrypt.compare(senha, usuario.senha, (err, ok) => {
            if (ok) {
              return done(null, usuario);
            } else {
              return done(null, false, { message: "Senha incorreta!" });
            }
          });
        });
      }
    )
  );
  passport.serializeUser((usuario, done) => {
    return done(null, usuario.id);
  });
  passport.deserializeUser((usuario, done) => {
    Usuario.findOne({ _id: usuario }).then((user) => {
      done(null, user);
    });
  });
};
