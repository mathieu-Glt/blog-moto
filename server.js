const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const parseurl = require("parseurl");
const bcryptjs = require("bcryptjs");
require("dotenv").config();
const { Pool } = require("pg");
const helmet = require("helmet");
const xssClean = require("xss-clean");
const csrf = require("csurf");

const app = express();
const saltRounds = 10;

// 1. Sécurité headers HTTP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"], // autorise toutes les images https
        scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
        styleSrc: [
          "'self'",
          "https://cdn.jsdelivr.net",
          "https://stackpath.bootstrapcdn.com",
          "https://fonts.googleapis.com",
          "'unsafe-inline'",
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://stackpath.bootstrapcdn.com",
        ],
      },
    },
  }),
);
// 2. Protection XSS
app.use(xssClean());

// 3. Static files
app.use(express.static(__dirname + "/public"));

// 4. Views
app.set("views", "./views");
app.set("view engine", "ejs");

// 5. Parse request body (AVANT csrf)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 6. Flash messages
app.use(flash());

// 7. Session (AVANT csrf)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "love panda",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000, httpOnly: true },
  }),
);

// 8. CSRF (APRÈS session et body parser)
const csrfProtection = csrf({ cookie: false });
app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

// 9. Middleware routes protégées
app.use((req, res, next) => {
  if (!req.session.user) {
    req.session.user = null;
    req.session.isLogged = false;
  }

  let pathname = parseurl(req).pathname;
  const protectedPath = ["/admin", "/add_post", "/edit_post"];
  const onlyAdmin = ["/admin"];

  if (
    (protectedPath.includes(pathname) || onlyAdmin.includes(pathname)) &&
    !req.session.isLogged
  ) {
    res.redirect("/login");
  } else if (
    onlyAdmin.includes(pathname) &&
    req.session.user?.role !== "admin"
  ) {
    res.redirect("/home");
  } else {
    next();
  }
});

// 10. Routes + DB
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const adminRoutes = require("./routes/adminRoutes");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool
  .connect()
  .then(() => {
    console.log("Connecté à la database PostgreSQL");
    userRoutes(app, pool);
    postRoutes(app, pool);
    adminRoutes(app, pool);
    app.get("/", (req, res) => {
      res.json({ status: 200, results: "welcome to api" });
    });
  })
  .catch((err) => {
    console.error("Erreur connexion DB:", err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
