const { Router } = require("express");
const Categoria = require("../model/Categoria");
const router = Router();
const Postagem = require("../model/Postagem");

router.get("/", (req, res) => {
  Postagem.find()
    .populate("categoria")
    .sort({ data: "desc" })
    .then((postagens) => {
      const posts = JSON.parse(JSON.stringify(postagens));
      res.render("index", { postagens: posts });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao exibir postagens!");
      res.redirect("/");
    });
});
router.get("/postagem/:slug", (req, res) => {
  Postagem.findOne({ slug: req.params.slug })
    .populate("categoria")
    .then((postagem) => {
      if (postagem) {
        const post = JSON.parse(JSON.stringify(postagem));
        res.render("postagem/index", { postagem: post });
      } else {
        req.flash("error_msg", "Esta postagem não existe!");
        res.redirect("/");
      }
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao exibir postagens!");
      res.redirect("/");
    });
});

router.get("/categorias", (req, res) => {
  Categoria.find()
    .sort({ data: "desc" })
    .then((categorias) => {
      const categorias_ = JSON.parse(JSON.stringify(categorias));
      res.render("categorias/index", { categorias: categorias_ });
    })
    .catch(() => {
      req.flash("error_msg", "Houve um erro ao exibir categorias!");
      res.redirect("/");
    });
});

router.get("/categorias/:slug", (req, res) => {
  Categoria.findOne({ slug: req.params.slug })
    .then((categoria) => {
      Postagem.find({ categoria: categoria._id })
        .populate("categoria")
        .then((postagens) => {
          const posts = JSON.parse(JSON.stringify(postagens));
          res.render("index", {
            postagens: posts,
            categoria: { nome: categoria.nome },
          });
        })
        .catch(() => {
          req.flash(
            "error_msg",
            "Erro ao exibir postagens da categoria " + categoria.nome
          );
          res.redirect("/");
        });
    })
    .catch(() => {
      req.flash("error_msg", "Esta categoria não existe!");
      res.redirect("/");
    });
});

module.exports = router;
