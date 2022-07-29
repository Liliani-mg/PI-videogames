const { default: axios } = require('axios');
const { Router } = require('express');
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

const router = Router();

router.get('/', async (req, res)=>{
    // [ ] GET /genres:
    // Obtener todos los tipos de géneros de videojuegos posibles
    // En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

   
   try{
        let genres = await Genre.findAll();
        if(! genres.length){
            const linkApiGenres = await axios.get(`https://api.rawg.io/api/genres${API_KEY}`)
             const genresResult = linkApiGenres.data.results.map(g => g.name)
         
             genresResult.forEach(e => {
                 Genre.findOrCreate({
                     where: {name: e}
                 })
             })
             genres = await Genre.findAll();
        }

        res.json(genres)

   }catch {
    res.send("Error al encontrar generos")
   } 
 });

module.exports = router;