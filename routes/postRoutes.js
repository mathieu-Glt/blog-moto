module.exports = (app, db) => {
  const postModel = require("../models/postModel")(db);

  app.get("/home", async (req, res) => {
    // requête pour récup tous les articles
    let postsBDD = await postModel.getAllPosts();
    //console.log("home page", postsBDD)
    // si il y a une erreur
    if (postsBDD.code) {
      res.json({ status: 500, error: postsBDD });
    }
    //res render renvoie au template les données
    res.render("layout", {
      template: "home",
      posts: postsBDD,
      session: req.session,
    });
  });

  app.get("/post/:id", async (req, res) => {
    let id = req.params.id;

    let postId = await postModel.getOnePost(id);

    if (postId.code) {
      return res.json({
        status: 500,
        msg: "il y a eu un problème",
        error: postId,
      });
    }

    let comment = await postModel.showComments(id);

    if (comment.code) {
      return res.json({
        status: 500,
        msg: "Problème avec les comms",
        result: comment,
      });
    }

    if (!Array.isArray(comment)) {
      comment = [];
    }

    res.render("layout", {
      template: "post",
      postId: postId[0],
      comment: comment,
      session: req.session,
    });
  });
};
