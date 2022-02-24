//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { Dieta, Receta } = require('./src/db.js');
const { conn } = require('./src/db.js');
const { traer_ambas } = require("./src/controllers/traer_ambas_datas");
const { default: axios } = require('axios');


async function cargarRecetas () {
  const x = await traer_ambas()
  for (let e of x) {
    const { nombre, resumen, puntuacion, nivel_de_comida_saludable, paso_a_paso, imagen } = e;

   
  let recetaCreada = await Receta.create ({
    // id,
    nombre: nombre,
    resumen: resumen,
    puntuacion: puntuacion,
    nivel_de_comida_saludable: nivel_de_comida_saludable,
    paso_a_paso: paso_a_paso,
    imagen: imagen
    // createdInDb: createdInDb
})
}
}
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async() => {
    try {
      const x = await traer_ambas()
      await cargarRecetas()
      
      const dietas = ["gluten free","ketogenic","vegetarian"," lacto ovo vegetarian","dairy free","vegan","pescetarian","paleolithic","primal","Whole30", "Lacto-Vegetarian", "Low FODMAP"]
      dietas.forEach(element => {
        Dieta.create({name:element})
      });
      console.log("se cargaron las dietas ala base de datos")
      
    } catch (error) {
      console.log(error, "no se cargaron las dietas a la base de datos")
    }

    
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
