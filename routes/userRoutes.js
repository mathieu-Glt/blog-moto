const bcrypt = require('bcrypt');
const saltRounds = 10;
const flash = require('connect-flash');
const { body, validationResult } = require('express-validator')

module.exports = (app, db) =>{

    const userModel = require('../models/userModel')(db)

    app.get("/test", async(req, res, next)=>{
        res.json({status: 200, msg: "PAGE TEST"})
    })

    //route get pour enregistrer un utilisateur
    app.get('/register', async(req, res, next)=>{
        res.render('layout', {template: 'register', session: req.session})
    })

    //route post pour enregistrer un utilisateur
    app.post('/register',
	body('email').isEmail(),
	body('firstName').isAlpha().isLength({min: 4}),
	body('lastName').isAlpha().isLength({min: 4}),
	body('password').isLength({min: 8}),
	 async(req, res, next)=>{
		 const errors = validationResult(req);
		 if(!errors.isEmpty()) {
			 return res.status(400).json({ errors: errors.array() });
			 //res.render('layout', {template : 'register', status: 400, msg : 'il y a eu un prblème !', result : user, session : req.sesssion})

		 }
        let user = await userModel.saveOneUser(req)
        console.log(user)
        if(user.code){
            res.render('layout', {template : 'register', status: 500, msg : 'il y a eu un prblème !', result : user, session : req.sesssion})
        }
        res.redirect('/home')
    })

    //route get d'affichage de la page login
	app.get('/login', async (req, res, next)=>{
        res.render('layout', {template: 'login', error: null, session: req.session})
      })

    //route post d'envoi du login pour la connexion (avec creation de session)
	app.post('/login', 		
	body('email').isEmail().normalizeEmail(),
	body('password').isLength({ min: 4}),
	async(req, res, next)=>{
		console.log(req.body)
		let user = await userModel.getUserByEmail(req.body.email)
        console.log(user)
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			console.log('error validation')
			return res.status(400).json( {errors: errors.array() })
		}
		
		if(user.length === 0){
			res.render('layout', {template: 'login', error: "Email inconnu", session: req.session})
			console.log(error)
		}else{
			bcrypt.compare(req.body.password, user[0].Password)
	    	.then((same)=>{
	      		console.log('SAME', same);
	      		if(same) {
		            req.session.user = {
		              firstName: user[0].FirstName,
		              lastName: user[0].LastName,
		              email: user[0].Email,
		              role: user[0].Role
		            }
		
		            req.session.isLogged = true
		            res.redirect('/home');
					//req.flash('info', 'Bienvenue !')
	            } else {
	            	//sinon on envoie l'erreur mauvais mot de passe
	            	res.render('layout', {template: 'login', error: "Mot de passe incorrect",  session: req.session})
	            }
	    	})
	    	.catch(err=>console.log("Echec comparaison mdp", err))
		}
	})

    //route get de logout
	app.get('/logout', async (req, res, next)=> {
        req.session.destroy((err) =>{
          // cannot access session here
          res.redirect('/home');
         })
   })
  
}



