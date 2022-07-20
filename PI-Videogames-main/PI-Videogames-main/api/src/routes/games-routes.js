const axios = require("axios")
const { Router } = require('express');
const morgan = require('morgan');
const cookieparser = require ('cookie-parser');

const {Videogame, Genre} = require("../db");
const { API_KEY } =  process.env;

const router = Router();


//                   - ROUTES -
router.get("/", async (req, res) => {
  // [ ] GET /videogames:
  // Obtener un listado de los videojuegos
  // Debe devolver solo los datos necesarios para la ruta principal
//  const {name} = req.query

//   if(name) {
//     const vgname = name.split(' ').join('-').toLocaleLowerCase()
  
//   }
// aca quiero ver si puedo haccer que me mande por query el nombre qe busca


//que traiga todos los juegos,  los 100 de la api mas los agregados en BD
  try {
    //info from API
    const linkApiGames = await axios
      .get(`https://api.rawg.io/api/games${API_KEY}&page_size=100`)
 
        const dataApi = await linkApiGames.data.results.map((e) => {
          return {
            image: e.background_image,
            name: e.name,
            genre: e.genres.map((e) => e.name),
            rating: e.rating,
            description: e.id.description,
            platforms: e.platforms.map((e) => e.platform.name),
            fromDBorAPI: "API"
          };
        });

       //console.log(dataApi);
  
        
        //info from DataBase
    const infoDataBase = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attribute: []
            }
        }
    })
   
   //---------    concat DB & API info
    
    //const FullInfo = dataApi.concat(infoDataBase);
    const FullInfo = [...dataApi, ...infoDataBase]

    console.log( FullInfo + "ACA ESTOY EN INFO DE DB") //como trae el genres???????
    res.status(200).json(FullInfo)
    
  } catch {
    res.status(404).send("Error");
  } 
});


// router.get('/', async (req, res)=>{
//     // [ ] GET /videogames?name="...":
//     // Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
//     // Si no existe ningún videojuego mostrar un mensaje adecuado
// const {name} = req.query

// if(name){
//   const gameByName
//   res.status(200).send()
// }
// });


// router.get('/', async (req, res)=>{
//     // [ ] GET /videogame/{idVideogame}:
//     // Obtener el detalle de un videojuego en particular
//     // Debe traer solo los datos pedidos en la ruta de detalle de videojuego
//     // Incluir los géneros asociados

// });

router.post('/', async(req, res)=>{
    // [ ] POST /videogames:
    // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
    // Crea un videojuego en la base de datos, relacionado a sus géneros.
  
  
  // const {name, description, platform} = req.body
  // if(!name || !description || !platform){
  //   res.status(404).send("Faltan los campos obligatorios")
  // } else {
    
      try{
      const {name, genre, image, description, rating, released, fromDBorAPI, platforms} = req.body;     
       const videoGameCreated = await Videogame.create({
         name: name,
         image: image,
         description: description,
         rating: rating,
         released: released,
         fromDBorAPI: fromDBorAPI,
         platforms: platforms
       });
       
       
        const genreDataB = await Genre.findOne({
          where: { name: genre}
        })
      
        videoGameCreated.addGenre(genreDataB)
        res.status(200).send("Videojuego creado exitosmente")
    
      } catch {
        res.status(400).send("Error");
      }

 // }
});

module.exports = router;