//Configurar la conexion para la base de datos en MongoDB
const {MongoClient} = require('mongodb');
const client = new MongoClient('mi ruta de conexion');

//Desarrollar una funcion para conectarnos con la bd y retornar el objeto que contiene la conexion
const conexionDB = ()=>{
    return client.connect()
    .then((dbClient)=>{return dbClient})
    .catch((error) => {return error})
}

//Exportar para otro modulo
module.exports = {conexionDB}