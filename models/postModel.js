const { response } = require("express");

module.exports = (_db)=>{
    db = _db;
    return PostModel;
}

class PostModel {
    /*------------------------------*/
	/*------------ POST ------------*/
	/*------------------------------*/
    

    static getAllPosts(req){
        let sql = 'SELECT * FROM post';
        return db.query(sql, [])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }

    static getOnePost(id){
        let sql = 'SELECT * FROM post WHERE id = ?';
        return db.query(sql, [id])
        .then((response)=>{
            //console.log(response);
            return response;
        })
        .catch((err)=>{
            return  err;
        })
    }
    // sauvegarde d'un article
    static addPost(req){
        return db.query('INSERT INTO post (Title, Nationality, Contents, Picture) VALUES (?,?,?,?,?)', 
        [req.body.Title, req.body.Nationality,  req.body.Contents, req.body.Picture])
            .then((response)=>{
                return response;
            })
            .catch((err)=>{
                return err;
            })
    }

        // modification d'un article
        static editPost(req, id) {
            return db.query('UPDATE post SET Title= ?, Nationality=?, Contents=?, Picture=? WHERE id = ?', 
            [req.body.Title, req.body.Nationality, req.body.Contents,  req.body.Picture, id])
                .then((response)=>{
                    return response;
                })
                .catch((err)=>{
                    return err;
                })
            }

        //fonction pour supprimer un article
        static deletePost(id){
            let sql = "DELETE FROM post WHERE Id = ?"
            return db.query(sql, [id])
            .then((response)=>{
            return response;
            })
            .catch((err)=>{
            return err;
            })
        
    }


    /*------------------------------*/
	/*------------ COMMENTAIRES ------------*/
	/*------------------------------*/
    
        //fonction d'ajout d'un commentaire
        static addComment(req, postId){
            let sql = 'INSERT INTO comment (Name, Contents, CreationTimestamp, Post_Id) VALUES (?, ?, NOW(), ?)';
            return db.query(sql, [req.body.Name, req.body.Contents, postId])
            .then((response)=>{
                console.log(response);
                return response;
            })
            .catch((err)=>{
                return err;
            })
            
        }
          //fonction de suppression d'un commentaire
        static deleteComments(postId){
        let sql = "DELETE FROM comment WHERE Post_Id = ?";
        return db.query(sql, [postId])
        .then((response)=>{
            return response;
        })
        .catch((err)=>{
            return err;
        })
    }
    
        //fonction de récupération de tous les commentaire d'un article
        static showComments(postId){
            let sql = 'SELECT * FROM comment WHERE Post_Id = ?';
            return db.query(sql, [postId])
            .then((response)=>{
                console.log(response);
                return response;
            })
            .catch((err)=>{
                return err;
        })
        
    }

    

}
    
    
