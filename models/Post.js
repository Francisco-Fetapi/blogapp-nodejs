const { Sequelize, sequelize } = require("./db");

const Post = sequelize.define("postagens", {
  titulo: {
    type: Sequelize.STRING,
  },
  conteudo: {
    type: Sequelize.TEXT,
  },
});

// Post.sync({ force: true });

module.exports = Post;
