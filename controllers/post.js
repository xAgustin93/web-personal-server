const Post = require("../models/post");

function addPost(req, res) {
  const body = req.body;
  const post = new Post(body);

  post.save((err, postStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!postStored) {
        res
          .status(400)
          .send({ code: 400, message: "No se ha podido crear el post." });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Post creado correctamente." });
      }
    }
  });
}

function getPosts(req, res) {
  const { page = 1, limit = 10 } = req.query;

  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" }
  };

  Post.paginate({}, options, (err, postsStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!postsStored) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun post." });
      } else {
        res.status(200).send({ code: 200, posts: postsStored });
      }
    }
  });
}

function updatePost(req, res) {
  const postData = req.body;
  const { id } = req.params;

  Post.findByIdAndUpdate(id, postData, (err, postUpdate) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!postUpdate) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun post." });
      } else {
        res
          .status(200)
          .send({ code: 200, message: "Post actualizado correctamente." });
      }
    }
  });
}

function deletePost(req, res) {
  const { id } = req.params;

  Post.findByIdAndRemove(id, (err, postDeleted) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!postDeleted) {
        res.status(404).send({ code: 404, message: "Post no encontrado." });
      } else {
        res.status(200).send({
          code: 200,
          message: "El post ha sido eliminado correctamente."
        });
      }
    }
  });
}

function getPost(req, res) {
  const { url } = req.params;

  Post.findOne({ url }, (err, postStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!postStored) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun post." });
      } else {
        res.status(200).send({ code: 200, post: postStored });
      }
    }
  });
}

module.exports = {
  addPost,
  getPosts,
  updatePost,
  deletePost,
  getPost
};
