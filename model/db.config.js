const mongoose = require("mongoose");
const { mongoURI } = require("../config/db.js");

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("MongoDB conectado");
  })
  .catch((err) => {
    console.error("Erro ao conectar com o MongoDB");
    console.error(err);
  });

module.exports = mongoose;
