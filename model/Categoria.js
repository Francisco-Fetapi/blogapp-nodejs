const mongoose = require("./db.config");
const Schema = mongoose.Schema;

const Categoria = new Schema({
  nome: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("categorias", Categoria);
