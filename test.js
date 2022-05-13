const Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado ao BD com sucesso");
  })
  .catch((err) => {
    console.log("Falha ao se conectar ao banco de dados");
    console.error(err);
  });

const Postagem = sequelize.define("postagens", {
  titulo: {
    type: Sequelize.STRING,
  },
  conteudo: {
    type: Sequelize.TEXT,
  },
});

const Usuario = sequelize.define("usuarios", {
  nome: {
    type: Sequelize.STRING,
  },
  sobrenome: {
    type: Sequelize.STRING,
  },
  idade: {
    type: Sequelize.INTEGER,
  },
  email: {
    type: Sequelize.STRING,
  },
});

Postagem.create({
  titulo: "Um titulo qualquer",
  conteudo: "Um conteudo qualquer",
});
