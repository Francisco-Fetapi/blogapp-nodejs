module.exports = {
  ehAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.ehAdmin == 1) {
      return next();
    } else {
      req.flash("error_msg", "Só administradores podem acessar essa página.");
      res.redirect("/");
    }
  },
};
