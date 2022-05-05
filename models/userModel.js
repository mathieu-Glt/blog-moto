const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (_db)=>{
    db = _db;
    return UserModel;
}

class UserModel {
// sauvegarde d'un membre
static saveOneUser(req){
    return bcrypt.hash(req.body.password, saltRounds)
    .then((hash)=>{
        let sql = 'INSERT INTO `user` (`Email`,`Password`,`Role`,`FirstName`,`LastName`) VALUES (?, ?, "user", ?, ?)';
        return db.query(sql, [req.body.email, hash, req.body.firstname, req.body.lastname])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
        return err;
        })
    })
    .catch((err=>console.log("Echec cruyptage mdp", err)))
}

//récupération de tous les utilisateurs
static getAllUsers(){
   let sql = 'SELECT * FROM user '
   return db.query(sql, [])
   .then((response)=>{
       return response;
   })
   .catch((err)=>{
       return err;
   })
}
//récupération de tous les utilisateurs
static getUsersAdmin(){
    let sql = 'SELECT * FROM user WHERE Role = "admin"'
    return db.query(sql, [])
    .then((response)=>{
        return response;
    })
    .catch((err)=>{
        return err;
    })
 }
 


    // récupération d'un utilisateur en fonction de son mail
    static getUserByEmail(email) {
        let sql = 'SELECT * FROM user WHERE Email = ?';
        return db.query(sql, [email])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }
}




