const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports = (_db) => {
  db = _db;
  return UserModel;
};

class UserModel {
  static saveOneUser(req) {
    return bcrypt
      .hash(req.body.password, saltRounds)
      .then((hash) => {
        let sql =
          'INSERT INTO "user" ("Email", "Password", "Role", "FirstName", "LastName") VALUES ($1, $2, $3, $4, $5) RETURNING *';
        return db
          .query(sql, [
            req.body.email,
            hash,
            "user",
            req.body.firstname,
            req.body.lastname,
          ])
          .then((res) => res.rows)
          .catch((err) => err);
      })
      .catch((err) => console.log("Echec cryptage mdp", err));
  }

  static getAllUsers() {
    let sql = 'SELECT * FROM "user"';
    return db
      .query(sql)
      .then((res) => res.rows)
      .catch((err) => err);
  }

  static getUsersAdmin() {
    let sql = 'SELECT * FROM "user" WHERE "Role"=$1';
    return db
      .query(sql, ["admin"])
      .then((res) => res.rows)
      .catch((err) => err);
  }

  static getUserByEmail(email) {
    let sql = 'SELECT * FROM "user" WHERE "Email"=$1';
    return db
      .query(sql, [email])
      .then((res) => res.rows)
      .catch((err) => err);
  }
}
