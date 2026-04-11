module.exports = (_db) => {
  db = _db;
  return PostModel;
};

class PostModel {
  /*------------ POST ------------*/
  static getAllPosts() {
    let sql = 'SELECT * FROM "post"';
    return db
      .query(sql)
      .then((res) => res.rows)
      .catch((err) => err);
  }

  static getOnePost(id) {
    let sql = 'SELECT * FROM "post" WHERE id = $1';
    return db
      .query(sql, [id])
      .then((res) => res.rows)
      .catch((err) => err);
  }

  static addPost(req) {
    let sql =
      'INSERT INTO "post" ("Title", "Nationality", "Contents", "Picture", "Portrait") VALUES ($1, $2, $3, $4, $5) RETURNING *';
    return db
      .query(sql, [
        req.body.Title,
        req.body.Nationality,
        req.body.Contents,
        req.body.Picture,
        req.body.Portrait,
      ])
      .then((res) => res.rows)
      .catch((err) => err);
  }

  static editPost(req, id) {
    let sql =
      'UPDATE "post" SET "Title"=$1, "Nationality"=$2, "Contents"=$3, "Picture"=$4, "Portrait"=$5 WHERE id=$6 RETURNING *';
    return db
      .query(sql, [
        req.body.Title,
        req.body.Nationality,
        req.body.Contents,
        req.body.Picture,
        req.body.Portrait,
        id,
      ])
      .then((res) => res.rows)
      .catch((err) => err);
  }

  static deletePost(id) {
    let sql = 'DELETE FROM "post" WHERE id=$1';
    return db
      .query(sql, [id])
      .then((res) => res.rows)
      .catch((err) => err);
  }

  /*------------ COMMENTAIRES ------------*/
  static addComment(req, postId) {
    let sql =
      'INSERT INTO "comment" ("Name", "Contents", "CreationTimestamp", "Post_Id") VALUES ($1, $2, NOW(), $3) RETURNING *';
    return db
      .query(sql, [req.body.Name, req.body.Contents, postId])
      .then((res) => res.rows)
      .catch((err) => err);
  }

  static deleteComments(postId) {
    let sql = 'DELETE FROM "comment" WHERE "Post_Id"=$1';
    return db
      .query(sql, [postId])
      .then((res) => res.rows)
      .catch((err) => err);
  }

  static showComments(postId) {
    let sql = 'SELECT * FROM "comment" WHERE "Post_Id"=$1';
    return db
      .query(sql, [postId])
      .then((res) => res.rows)
      .catch((err) => err);
  }
}
