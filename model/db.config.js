const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/blogapp")
  .then(() => {
    console.log("MongoDB conectado");
  })
  .catch((err) => {
    console.error("Erro ao conectar com o MongoDB");
    console.error(err);
  });

module.exports = mongoose;
