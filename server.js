
const express = require('express');
const flash = require('connect-flash')
const app = express();

//ici on recup tout le dossier pubic (css, fonts, img, js)
app.use(express.static(__dirname + '/public'));

//ici on gère l'affichage des templates front
app.set('views', './views');
app.set('view engine', 'ejs');

//parse les url
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
//ajoute message flash
app.use(flash());

//module pour crypter et comparer par un mot de passe
const bcrypt = require('bcrypt');
const saltRounds = 10;
let session = require('express-session');
let parseurl = require('parseurl');


//conexion à la base de données
const mysql = require('promise-mysql');
//session va gérer la création/vérification du token lors du login
app.use(session({
    secure: true,
    httpOnly: true,
    secret: 'love panda',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 3600000}
}));

app.use(function (req, res, next) {
    if (!req.session.user) {
        req.session.user = null
        req.session.isLogged = false
    }
    // get the url pathname   pathname est la section de chemin de l'URL, qui vient après l'hôte et avant la requête
    let pathname = parseurl(req).pathname
    //console.log(pathname)
    //console.log(parseurl(req).path)
    //gestion des routes protégées
    let protectedPath = ["/admin", "/add_post", "/edit_post"];
    // route uniquement pour l'admin
    let onlyAdmin = ["/admin"];
    //conditions pour les accés aux routes avec restrictions qui redirigent vers le login si il n'est pas connecté ou admin if else if else
    if((protectedPath.indexOf(pathname) !== -1 || onlyAdmin.indexOf(pathname) !== -1) && req.session.isLogged === false) {
        res.redirect('/login');
        } else if (onlyAdmin.indexOf(pathname) !== -1 && req.session.user.role !== "admin") {
        res.redirect('/home');
        } else {
         next()
        }
})

// toutes mes routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const adminRoutes = require('./routes/adminRoutes');

//connexion Base de données
mysql.createConnection({
  host: "db.3wa.io",// on rentre l'hôte l'adresse url où se trouve la bdd
  user: "mathieugillet",// identifiant BDD
  password: "379a46404e062e0b0e8b7799b58095a4",// le password
  database: "mathieugillet_moto_blog"  // nom de la base de donnée
}).then((db) => {
    console.log('connecté à la database');
    setInterval(async function() {
        let res = await db.query('SELECT 1');
    }, 1000);

    userRoutes(app, db);
    postRoutes(app, db);
    adminRoutes(app, db);
})
.catch(err=>console.log("Echec connexion BDD: ", err))




const PORT = process.env.PORT || 3000;
app.listen(PORT, 
) 
console.log('listening port '+PORT+' all is ok');




