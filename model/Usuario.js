const mongoose = require("./db.config");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const Usuario = new Schema({
  nome: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  senha: {
    type: String,
    require: true,
  },
  ehAdmin: {
    type: Number,
    require: true,
    default: 0,
  },
});

Usuario.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;
  next();
});
module.exports = mongoose.model("usuarios", Usuario);
