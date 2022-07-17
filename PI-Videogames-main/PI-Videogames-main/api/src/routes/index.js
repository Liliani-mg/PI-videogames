const { Router } = require('express');
const { Videogame, Genre} = require("../models");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router_games = require("./games-routes.js")
const router_genres = require("./genres-routes.js")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', router_games);
//router.use('/videogames', router_games);
router.use('/videogame', router_games);
//router.use('/videogames', router_games);
router.use('/genres', router_genres);



module.exports = router;
