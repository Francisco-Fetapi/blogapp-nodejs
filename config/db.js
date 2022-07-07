if (process.env.NODE_ENV === "production") {
  module.exports = {
    mongoURI:
      "mongodb+srv://franciscofetapi:KRrwD7NAsjdrz!j@cluster0.p9qgq.mongodb.net/?retryWrites=true&w=majority",
  };
} else {
  module.exports = {
    mongoURI: "mongodb://localhost/blogapp",
  };
}
