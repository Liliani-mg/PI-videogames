const axios = require("axios");
const { Router } = require("express");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");

const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

const router = Router();

const getApiInfo = async () => {
  //VER SI NO HAY DRAMA EN TRAER POR PAGINA
  const promesaPag1 = await axios.get(
    `https://api.rawg.io/api/games${API_KEY}`
  ); //trae 20
  const promesaPag2 = await axios.get(
    `https://api.rawg.io/api/games${API_KEY}&page=2`
  ); //20
  const promesaPag3 = await axios.get(
    `https://api.rawg.io/api/games${API_KEY}&page=3`
  ); //20
  const promesaPag4 = await axios.get(
    `https://api.rawg.io/api/games${API_KEY}&page=4`
  ); //20
  const promesaPag5 = await axios.get(
    `https://api.rawg.io/api/games${API_KEY}&page=5`
  ); //20

  //ASI SI ME TRAE LOS 100 !!!!!!!!!!!!!!!!!!!!!!!!!!!
  linkApiGames = promesaPag1.data.results
    .concat(promesaPag2.data.results)
    .concat(promesaPag3.data.results)
    .concat(promesaPag4.data.results)
    .concat(promesaPag5.data.results);

  // const linkApiGames = await axios.get(
  //   `https://api.rawg.io/api/games${API_KEY}`
  // );

  const dataApi = linkApiGames.map((e) => {
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
  console.log(dataApi)
  return dataApi;
};
//prueba para api bd 
// const dataApi = linkApiGames.map((e) => {

//   return {
//     id: e.id,
//     image: e.background_image,
//     name: e.name,
//     genres: e.genres.map((e) => e.name),
//     rating: e.rating,
//     description: description,
//     platforms: e.platforms.map((e) => e.platform.name),
//     fromDBorAPI: "API",
//   };
// });
// console.log(dataApi)
// //let gamesApi = await Videogame.findAll();
// if(dataApi){
// dataApi.forEach((e) => {
//  Videogame.findOrCreate({
//     where: { name: e.name },
//     include: {
//       model: Genre,
//       attributes: ["name"],
//       through: {
//         attribute: [],
//       },
//     },
//   });
// });

// }
// let gamesApi = await Videogame.findAll();
      

// console.log(gamesApi)
// return JSON.parse(gamesApi);



const getDataBaseInfo = async () => {
  const infoDataBase = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attribute: [],
      },
    },
  });
 
  console.log(JSON.stringify(infoDataBase))
  return infoDataBase;
};

//---------    concat DB & API info
const getInfoComplete = async () => {
  const infoFromApi = await getApiInfo();
  const infoFromDB = await getDataBaseInfo();
  const FullInfo = [...infoFromApi, ...infoFromDB];

  return FullInfo;
};

//                  - ROUTES ---
router.get("/", async (req, res) => {
  // [ ] GET /videogames:
  // Obtener un listado de los videojuegos
  // Debe devolver solo los datos necesarios para la ruta principal

  if (req.query.name) {
    //si me llega algo por query
    try {
      //busco en todos los juegos que tengo guardados api y DB
      const allInfoGames = await getInfoComplete();
      //busco el que coincida con el name mandado por query, que contenga
      const resultgamesName = allInfoGames.filter((g) =>
        g.name.toLowerCase().split(" ").includes(req.query.name.toLowerCase())
      );
      //me quedo solo con los primeros 15 resultados
      const resultfinal = resultgamesName.splice(0, 15);
      if (resultfinal.length > 0) {
        //si en el array hay algo, mando la respuesta, si no uso el >0 manda array vacio
        res.status(200).json(resultfinal);
      }
    } catch {
      //en caso de no encontrar nada captura el error y manda todos los elementos
      console.log("estoy en el error del query");
      res.status(404).send("no se encontro un juego con ese nombre");
      //next();
    }
  } else {
    //que traiga todos los juegos,  los 100 de la api mas los agregados en BD
    try {
      const AllInfo = await getInfoComplete();
      //quiero traaer solo imagen name y generos
      const listOfGames = AllInfo.map((e) => {
        return {
          image: e.image,
          name: e.name,
          genres: e.genres.map(g => g.name),
        };
      });
  
      console.log("TRAYENDO TODOS LOS GAMES");
      console.log(listOfGames);
      res.status(200).json(listOfGames);
    } catch {
      res.status(404).send("Error");
    }

  }
  // }
});

router.post("/", async (req, res) => {
  // [ ] POST /videogames:
  // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  // Crea un videojuego en la base de datos, relacionado a sus géneros.

  const { name, description, platforms } = req.body;
  if (!name || !description || !platforms) {
    res.status(404).send("Faltan los campos obligatorios");
  } else {
    try {
      const {
        name,
        genres,
        image,
        description,
        rating,
        released,
        fromDBorAPI,
        platforms,
      } = req.body;
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
      res.status(200).send("Videojuego creado exitosmente");
    } catch {
      res.status(400).send("Error");
    }
  }

  //}
});

router.get("/:id", async (req, res) => {
  // [ ] GET /videogame/{idVideogame}:
  // Obtener el detalle de un videojuego en particular
  // Debe traer solo los datos pedidos en la ruta de detalle de videojuego
  // Incluir los géneros asociados
  // const { id } = req.params
    
  //   //existe en BD un game con este id???
  //   let videogameDb = await Videogame.findOne({
  //       where: {
  //           id: id,
  //       },
  //       include: Genre
  //   })
  //   if (videogameDb) {
  //     //Parseo el objeto
  //     videogameDb = JSON.stringify(videogameDb);
  //     videogameDb = JSON.parse(videogameDb);

  //     videogameDb.genres = videogameDb.genres.map((g) => g.name);
  //     res.json(videogameDb);
  //   } else {
  //     //si no existe en BD, busco en la API, con el id
  //     try {
  //       const resultApi = await axios.get(
  //         `https://api.rawg.io/api/games/${id}${API_KEY}`
  //       );

  //       resultGame = resultApi.data.results.map(e => {
  //         return {
  //           id: e.id,
  //         name: e.name,
  //         image: e.background_image,
  //         genres: e.genres.map(g=>g.name),
  //         description: e.description,
  //         released: e.released,
  //         rating: e.rating,
  //         platforms: e.platforms.map(p=>p.platform.name),
  //         }
  //       })
        
  //       return res.json(resultGame);
  //     } catch (err) {
  //       return console.log(err);
  //     }
  //   }
  const idGame = req.params.id;
  const allInfoGames = await getInfoComplete();

  try {
    const gameById = allInfoGames.filter((e) => {
      return e.id == idGame;
    });
    if (gameById) {
      const videogameDetail = gameById.map((e) => {
        return {
          image: e.image,
          name: e.name,
          genres: e.genres.map(g=>g.name),
          description: e.description,
          rating: e.rating,
          platforms: e.platforms.map(p=>p.platform),
        };
      });
      console.log(videogameDetail);
      res.status(200).json(videogameDetail);
    }
  } catch {
    res.send("Error al encontrar el juego por su Id");
  }
});

module.exports = router;
