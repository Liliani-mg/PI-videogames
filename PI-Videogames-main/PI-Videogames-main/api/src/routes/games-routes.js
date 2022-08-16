const axios = require("axios");
const { Router } = require("express");
const { Videogame, Genre } = require("../db");
const isUuid = require("../utils/isUuid");
const { API_KEY } = process.env;

const router = Router();

function formatApi(apiGames) {
  return apiGames.map((e) => {
    return {
      id: e.id,
      image: e.background_image,
      name: e.name,
      genres: e.genres.map((e) => e.name),
      rating: e.rating,
      description: e.description,
      platforms: e.platforms.map((e) => e.platform.name),
      fromDBorAPI: "API",
    };
  });
}

let apiInfo;
const getApiInfo = async () => {
  if (apiInfo) return apiInfo;

  const promesaPag1 = axios
    .get(`https://api.rawg.io/api/games?${API_KEY}&page_size=40&page=1`)
    .then((res) => formatApi(res.data.results));
  //trae 40
  const promesaPag2 = axios
    .get(`https://api.rawg.io/api/games?${API_KEY}&page_size=40&page=2`)
    .then((res) => formatApi(res.data.results));
  //tra 40
  const promesaPag5 = axios
    .get(`https://api.rawg.io/api/games?${API_KEY}&page_size=20&page=5`)
    .then((res) => formatApi(res.data.results));
  //trae 20

  const [resPag1, resPag2, resPag5] = await Promise.all([
    promesaPag1,
    promesaPag2,
    promesaPag5,
  ]);
  const dataApi = resPag1.concat(resPag2).concat(resPag5);

  // console.log("DATA DE LA API")

  // console.log(dataApi)
  return dataApi;
};

//traigo los juegos que estan en Base de datos
const getDataBaseInfo = async () => {
  let infoDataBase = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attribute: [],
      },
    },
  });

  //mapeo
  const infoDataBase2 = infoDataBase.map((e) => {
    return {
      id: e.id,
      name: e.name,
      genres: e.genres.map((g) => g.name),
      rating: e.rating,
      description: e.description,
      platforms: e.platforms,
      fromDBorAPI: e.fromDBorAPI,
    };
  });

  //console.log(infoDataBase2)
  return infoDataBase2;
};

//---------    concat DB & API info
const getInfoComplete = async () => {
  const [infoApi, infoDB] = await Promise.all([
    getApiInfo(),
    getDataBaseInfo(),
  ]);
  const FullInfo = [...infoApi, ...infoDB];
  return FullInfo;
};

// -------------------- RUTAS --------------------
router.get("/", async (req, res) => {
  // [ ] GET /videogames:
  // Obtener un listado de los videojuegos
  // Debe devolver solo los datos necesarios para la ruta principal

  if (req.query.name) {
    //si me llega algo por query, en la search
    let nameSearch = req.query.name;
    nameSearch.toLowerCase();

    try {
      const gamesresult = axios
        .get(`https://api.rawg.io/api/games?search=${nameSearch}&${API_KEY}`)
        .then((res) => {
          return res.data.results;
        });

      let resultSearchApi = await gamesresult;

      let result1 = resultSearchApi.map((g) => {
        return {
          name: g.name,
          genres: g.genres.map((e) => e.name),
          platforms: g.platforms.map((p) => p.platform.name),
          rating: g.rating,
          released: g.released,
          image: g.background_image,
          id: g.id,
        };
      });
      //Quiero seleccionar los 15 primeros
      let gamesFifteen = result1.slice(0, 15);

      return res.json(gamesFifteen);
    } catch {
      res.status(404).send("Error");
    }
  } else {
    //  si no se  recibio busqueda en query, que traiga todos los juegos,  los 100 de la api mas los agregados en BD
    try {
      const AllInfo = await getInfoComplete();

      const listOfGames = AllInfo.map((e) => {
        return {
          id: e.id,
          image: e.image,
          name: e.name,
          genres: e.genres.map((g) => g),
          rating: e.rating,
          fromDBorAPI: e.fromDBorAPI,
        };
      });
      res.status(200).json(listOfGames);
    } catch {
      res.status(404).send("Error");
    }
  }
});

router.post("/", async (req, res) => {
  // [ ] POST /videogames:
  // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  // Crea un videojuego en la base de datos, relacionado a sus géneros.
  const { name, description, platforms } = req.body;

  
  //verifico si tiene los datos obligatorios
  if (!name || !description || !platforms) {
    res.status(404).send("Faltan los campos obligatorios");
  } else {
    try {
      let {
        name,
        genres,
        image,
        description,
        rating,
        released,
        fromDBorAPI,
        platforms,
      } = req.body;
      platforms = platforms.join(" - ");

      const videoGameCreated = await Videogame.create({
        name: name,
        image: image,
        genres: genres,
        description: description,
        rating: rating,
        released: released,
        fromDBorAPI: fromDBorAPI,
        platforms: platforms,
      });

      const genreDataB = await Genre.findAll({
        where: { name: genres },
      });

      videoGameCreated.addGenre(genreDataB);
      res.status(201).send("Videojuego creado exitosmente");
    } catch {
      res.status(400).send("Error");
    }
  }
});

router.get("/:id", async (req, res) => {
  // [ ] GET /videogame/{idVideogame}:
  // Obtener el detalle de un videojuego en particular
  // Debe traer solo los datos pedidos en la ruta de detalle de videojuego
  // Incluir los géneros asociados

  const { id } = req.params;

  if (Number(id)) {
    try {
      const gameDetail = await axios
        .get(`https://api.rawg.io/api/games/${id}?${API_KEY}`)
        .then((res) => {
          let game = res.data;

          let gameD = {
            id: game.id,
            name: game.name,
            image: game.background_image,
            rating: game.rating,
            released: game.released,
            description: game.description,
            platforms: game.platforms.map((p) => p.platform.name).join(" - "),
            genres: game.genres.map((g) => g.name),
          };
          return gameD;
        });

      //console.log(gameDetail);
      return res.status(200).json(gameDetail);
    } catch {
      return res.send("Error al encontrar el juego por su Id");
    }
  }
  if (isUuid(id)) {
    let videogameDb = await Videogame.findOne({
      where: {
        id: id,
      },
      include: Genre,
    });
    //Parseo el objeto
    videogameDb = JSON.stringify(videogameDb);
    videogameDb = JSON.parse(videogameDb);

    //dejo un array con los nombres de genero solamente
    videogameDb.genres = videogameDb.genres.map((g) => g.name);
    return res.json(videogameDb);
  }

  return res.status(400).send("Id invalid");
});

module.exports = router;
