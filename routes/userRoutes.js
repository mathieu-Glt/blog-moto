const bcrypt = require('bcrypt');
const saltRounds = 10;
const flash = require('connect-flash');
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = (app, db) =>{

    const userModel = require('../models/userModel')(db)

    app.get("/test", async(res)=>{
        res.json({status: 200, msg: "PAGE TEST"})
    })

    //route get pour enregistrer un utilisateur
    app.get('/register', async(req, res)=>{
        res.render('layout', {template: 'register', session: req.session})
    })

    //route post pour enregistrer un utilisateur
    app.post('/register',
	check('email', 'This email must correspond to a valid email ').isEmail(),
	check('firstname', 'This firstName to be required and must to be write with aplha character').isAlpha().exists(),
	check('lastname', 'This lastName to be required and must to be write with aplha character ').isAlpha().exists(),
	check('password', 'Password must to be min 8 characters and Alpha numeric').isLength({min: 8}).isAlphanumeric(),
	async(req, res) => {
		 const errors = validationResult(req);
		 if(!errors.isEmpty()) {
			 const alert = errors.array()
			 return res.render('layout', {template : 'register', status: 200,  alert: alert, session : req.session})

		 }
        let user = await userModel.saveOneUser(req)
        if(user.code){
            res.render('layout', {template : 'register', status: 500, msg : 'il y a eu un prblème !', result : user, session : req.sesssion})
        }
        res.redirect('/home')
    })

    //route get d'affichage de la page login
	app.get('/login', async (req, res)=>{
        res.render('layout', {template: 'login', error: null, session: req.session})
      })

    //route post d'envoi du login pour la connexion (avec creation de session)
	app.post('/login', 		
	check('email', 'This email must correspond to a valid email ').isEmail(),
	check('password', 'Password must to be min 8 characters and Alpha numeric').isLength({min: 4}).isAlphanumeric(),
	async(req, res)=>{
		let user = await userModel.getUserByEmail(req.body.email)
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			const alert = errors.array()
			return res.render('layout', {template : 'login', status: 200, error: "", alert: alert, session : req.session})

		}
		
		if(user.length === 0){
			res.render('layout', {template: 'login', error: "Email inconnu", session: req.session})
		}else{
			bcrypt.compare(req.body.password, user[0].Password)
	    	.then((same)=>{
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
	app.get('/logout', async (req, res)=> {
        req.session.destroy((err) =>{
          // cannot access session here
          res.redirect('/home');
         })
   })
  
}



