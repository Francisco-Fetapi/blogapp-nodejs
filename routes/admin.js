const express = require("express");
const Categoria = require("../model/Categoria");
const Postagem = require("../model/Postagem");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("admin/index");
});

router.get("/posts", (req, res) => {
  res.send("Posts em Admin");
});
router.get("/categorias", (req, res) => {
  Categoria.find()
    .sort({ date: "desc" })
    .then((categorias) => {
      res.render("admin/categorias", {
        categorias: JSON.parse(JSON.stringify(categorias)),
      });
    })
    .catch(() => {
      req.flash("error_msg", "Erro ao exibir categorias!");
      res.redirect("/admin");
    });
});
router.get("/categorias/add", (req, res) => {
  res.render("admin/addcategorias");
});
router.post("/categorias/nova", (req, res) => {
  const { nome, slug } = req.body;
  const erros = [];

  if (!nome) {
    erros.push({ texto: "Nome inválido" });
  } else if (!slug) {
    erros.push({ texto: "Slug inválido" });
  }

  if (erros.length > 0) {
    res.render("admin/addcategorias", { erros });
  } else {
    new Categoria({ nome, slug })
      .save()
      .then(() => {
        req.flash("success_msg", "Categoria salva com sucesso!");
        res.redirect("/admin/categorias");
      })
      .catch((err) => {
        req.flash("error_msg", "Houve um erro ao tentar salvar Categoria!");
        console.log(err);
      });
  }
});

router.get("/categorias/eliminar/:id", (req, res) => {
  Categoria.remove({ _id: req.params.id })
    .then(() => {
      req.flash("success_msg", "Categoria apagada com sucesso!");
      res.redirect("/admin/categorias");
    })
    .catch(() => {
      req.flash("error_msg", "Erro ao apagar categoria!");
      res.redirect("/admin/categorias");
    });
});
router.get("/categorias/editar/:id", (req, res) => {
  Categoria.findOne({ _id: req.params.id })
    .then((categoria) => {
      res.render("admin/editar_categoria", categoria);
      console.log(categoria);
    })
    .catch(() => {
      req.flash("error_msg", "Esta categoria não existe!");
      res.redirect("/admin/categorias");
    });
});

router.post("/categorias/update", (req, res) => {
  const { nome, slug, _id } = req.body;
  const erros = [];

  if (!nome) {
    erros.push({ texto: "Nome inválido" });
  } else if (!slug) {
    erros.push({ texto: "Slug inválido" });
  }

  if (erros.length > 0) {
    req.flash("error_msg", erros[0].texto);
    res.redirect("/admin/categorias/editar/" + _id);
  } else {
    Categoria.findOne({ _id })
      .then((categoria) => {
        categoria.nome = nome;
        categoria.slug = slug;
        categoria.save().then(() => {
          req.flash("success_msg", "Categoria editada com sucesso!");
          res.redirect("/admin/categorias");
        });
      })
      .catch(() => {
        req.flash("error_msg", "Erro ao editar categoria!");
        res.redirect("/admin/categorias");
      });
  }
});

router.get("/postagens", (req, res) => {
  Postagem.find()
    .populate("categoria")
    .sort({ data: "desc" })
    .then((postagens) => {
      const postagens_ = JSON.parse(JSON.stringify(postagens));
      return res.render("admin/postagens", { postagens: postagens_ });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao exibir as postagens!");
      res.redirect("/admin/postagens");
    });
});
router.get("/postagens/add", (req, res) => {
  Categoria.find()
    .sort({ date: "desc" })
    .then((categorias) => {
      res.render("admin/addpostagens", {
        categorias: JSON.parse(JSON.stringify(categorias)),
      });
    });
});
router.post("/postagens/add", (req, res) => {
  const { categoria } = req.body;
  if (categoria.length === 1) {
    console.log("Categria Invalida!");
    return res.render("admin/addpostagens", {
      erros: [{ texto: "Categoria invalida!" }],
    });
  } else {
    new Postagem(req.body).save().then(() => {
      req.flash("success_msg", "Postagem adicionada com sucesso!");
      res.redirect("/admin/postagens");
    });
  }
});
router.get("/postagem/editar/:id", (req, res) => {
  Postagem.findOne({ _id: req.params.id })
    .populate("categoria")
    .then((postagem) => {
      postagem_ = JSON.parse(JSON.stringify(postagem));
      Categoria.find()
        .sort({ data: "desc" })
        .then((categorias) => {
          categorias_ = JSON.parse(JSON.stringify(categorias));
          res.render("admin/editpostagens", {
            ...postagem_,
            categorias: categorias_,
          });
        });
    });
});
router.get("/postagem/eliminar/:id", (req, res) => {
  Postagem.remove({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "Postagem eliminada com sucesso!");
    res.redirect("/admin/postagens");
  });
});
router.post("/postagem/editar", (req, res) => {
  const { _id, titulo, slug, conteudo, categoria, descricao } = req.body;
  Postagem.findOne({ _id }).then((postagem) => {
    postagem.titulo = titulo;
    postagem.slug = slug;
    postagem.conteudo = conteudo;
    postagem.categoria = categoria;
    postagem.descricao = descricao;
    postagem.save().then(() => {
      req.flash("success_msg", "Postagem editada com sucesso!");
      res.redirect("/admin/postagens");
    });
  });
});
module.exports = router;
