const { Router } = require('express');
//const morgan = require('morgan');
const cookieparser = require ('cookie-parser');


const router = Router();

router.get('/', async(req, res)=>{
    // [ ] GET /videogames:
    // Obtener un listado de los videojuegos
    // Debe devolver solo los datos necesarios para la ruta principal
const {}
});
router.get('/', async (req, res)=>{
    // [ ] GET /videogames?name="...":
    // Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
    // Si no existe ningún videojuego mostrar un mensaje adecuado

});
router.get('/', async (req, res)=>{
    // [ ] GET /videogame/{idVideogame}:
    // Obtener el detalle de un videojuego en particular
    // Debe traer solo los datos pedidos en la ruta de detalle de videojuego
    // Incluir los géneros asociados

});
router.post('/', async(req, res)=>{
    // [ ] POST /videogames:
    // Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
    // Crea un videojuego en la base de datos, relacionado a sus géneros.

});

module.exports = router;