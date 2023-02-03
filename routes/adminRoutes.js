const bcryptjs = require('bcryptjs');
const session = require('express-session');
const saltRounds = 10;

module.exports = (app, db) =>{

    const postModel = require('../models/postModel')(db)

		//route get d'affichage d'admin (on devra récup les posts, les autheurs, les catégories)
		app.get('/admin', async (req, res)=> {
			let articles = await postModel.getAllPosts();
			if(articles.code) {
				res.json({status: 500, msg:'il y a eu un problème !', result: articles})
			} else {
				res.render('layout', {template: 'admin', posts: articles, session: req.session})

				}
			
		})
    
    //route post d'ajout d'un post
    app.get('/add_post', async(req, res)=>{
        res.render('layout', {template: "add_post", session: req.session})
		console.log(req.session.user)
    })

    //route post d'ajout d'un post
	app.post('/add_post', async (req, res)=> {
		let newPost = await postModel.addPost(req)
		if(newPost.code){
			res.json({status: 500, msg:'il y a eu un problème !', result: newPost})
		}
		res.redirect('/home');
	})

    //route get d'édition d'un post
	app.get('/edit_post/:id', async (req, res)=> {
		let id = req.params.id;
		let oldPost = await postModel.getOnePost(id)
		
		if(oldPost.code){
			res.json({status: 500, msg:'il y a eu un problème !', result: oldPost})
		} 
			res.render('layout', {template: "edit_post", post: oldPost[0], session: req.session})
			console.log(req.session.user)

	
		})
		
	
	
	//route post d'édition d'un post
	app.post('/edit_post/:id', async (req, res)=> {
		console.log(req.session.user)
		let id = req.params.id;
		let changePost = await postModel.editPost(req, id)
		if(changePost.code){
			res.json({status: 500, msg:'il y a eu un problème !', result: changePost})
		}
		res.redirect('/admin');
	})


    //route get de suppression d'un post
	app.get('/delete_post/:id', async (req, res)=> {
		let id = req.params.id
		let post = await postModel.deletePost(id)
		if(post.code){
			res.json({status: 500, msg:'il y a eu un problème !', result: post})
		}else{
			
			res.redirect('/home');
		}
	})

	    //route post d'ajout de commentaire
		app.post('/add_comment/:id', async (req, res)=>{
			let id = req.params.id;
			let postId = await postModel.getOnePost(id);

			
			if (postId.code) {
				res.json({status: 500, msg:'il y a eu un problème !', result: newCom})
			} else {
					let newCom = await postModel.addComment(req, id);
					if(newCom.code) {
						res.json({status: 500, msg:'il y a eu un problème !', result: newCom})
					}else{
						res.redirect('/post/'+id);
					}
		
			}
			
		})

}