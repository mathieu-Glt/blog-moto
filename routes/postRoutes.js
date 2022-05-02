

module.exports = (app, db) =>{

    const postModel = require('../models/postModel')(db)
    const userModel = require('../models/userModel')(db)
    
    app.get('/home', async (req, res, next)=>{
        // requête pour récup tous les articles
        let postsBDD = await postModel.getAllPosts()
        console.log("home page", postsBDD)
        // si il y a une erreur
        if(postsBDD.code){
            res.json({status: 500, error: postsBDD})
        } 
        //res render renvoie au template les données
        res.render("layout", {template: "home", posts: postsBDD, session: req.session})
    })

    app.get('/post/:id', async(req, res, next)=>{
        let id = req.params.id
        //requête pour récup un article
        let postId = await postModel.getOnePost(id);
        // si il y a une erreur
        if(postId.code){
            res.json({status: 500, msg: 'il y a eu un problème', error: postId})
        } else {
            //requête d'affichage des commentaires de cet articles
            let comment = await postModel.showComments(id)
            //console.log(comment)
            //si il y a erreur
            if(comment.code) {
                res.json({status: 500, msg: 'Problème avec les comms', result: comment})
            } 
            
            //res render renvoie au template les données
            res.render("layout", {template: "post", postId: postId[0], comment: comment, session: req.session})
             //console.log(postId)

        }
    })






}