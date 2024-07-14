//Importar el framework express
const express = require("express");
const app = express();

//Obtener el modulo conexion.js
const mongoDB = require("./conexion");

//Configurar nuestra API para trabajar para el formato JSON
app.use(express.json());

//Definir methodo GET
app.get('/estudiantes/', (pedido, respuesta) => {
    //Pedir listado users
    mongoDB.conexionDB()
        .then((conexion) => {
            //const legajoEstudiante = pedido.params.legajo;
            const controlador = conexion.db().collection('estudiantes');
            controlador.find().toArray()
                .then((filas) => respuesta.send(filas))
                .catch((error) => respuesta.send(error))
        })
})

//Definir methodo GET por ID para consultar el Estudiante
app.get('/estudiantes/:legajo', (pedido, respuesta) => {
    //Pedir listado users
    mongoDB.conexionDB()
        .then((conexion) => {
            const legajoEstudiante = parseInt(pedido.params.legajo); //Convirtiendo a entero ya que en la BD el tipo es entero no string
            const controlador = conexion.db().collection('estudiantes');
            filtro = { legajo: legajoEstudiante };
            controlador.find(filtro).toArray()
                .then((filas) => respuesta.send(filas))
                .catch((error) => respuesta.send(error))
        })
})

//Definir methodo GET por ID para consultar  notas
app.get('/notas/:id/', (pedido, respuesta) => {
    //Pedir listado users
    mongoDB.conexionDB()
        .then((conexion) => {
            const idNota = (pedido.params.id); //es string
            const controlador = conexion.db().collection('notas');
            filtro = { id: idNota };
            controlador.find(filtro).toArray()
                .then((filas) => respuesta.send(filas))
                .catch((error) => respuesta.send(error))
        })
})

//Definir un methodo POST
app.post('/estudiantes/create', (pedido, respuesta) => {
    mongoDB.conexionDB()
        .then((conexion) => {
            const controlador = conexion.db().collection('estudiantes');
            controlador.insertOne(pedido.body)
                .then(respuesta.send('Nuevo estudiante creado'))
                .catch((error) => respuesta.send(error));
        })
})

//Definir un methodo POST para Notas
app.post('/notas/create', (pedido, respuesta) => {
    mongoDB.conexionDB()
        .then((conexion) => {
            const controlador = conexion.db().collection('notas');
            controlador.insertOne(pedido.body)
                .then(respuesta.send('Nota registrada'))
                .catch((error) => respuesta.send(error));
        })
})

//Definir methodo PUT por ID para modificar notas
app.put('/notas/:id/update', (pedido, respuesta) => {
    //Pedir listado users
    mongoDB.conexionDB()
        .then((conexion) => {
            const idNota = (pedido.params.id);
            const modificarNota = { $set: { legajo_estudiante: "3" } }
            const controlador = conexion.db().collection('notas');
            filtro = { id: idNota };
            controlador.updateOne(filtro, modificarNota)
                .then(respuesta.send('Nota modificada'))
                .catch((error) => respuesta.send(error))
        })
})

//Definir methodo DELETE por ID para eliminar notas
app.delete('/notas/:id/delete', (pedido, respuesta) => {
    //Pedir listado users
    mongoDB.conexionDB()
        .then((conexion) => {
            const idNota = (pedido.params.id);
            const controlador = conexion.db().collection('notas');
            filtro = { id: idNota };
            controlador.deleteOne(filtro)
                .then(respuesta.send('Nota Eliminada'))
                .catch((error) => respuesta.send(error))
        })
})

//Definir methodo GET oara las notas aprobadas
app.delete('/notas/:id/aprobados', (pedido, respuesta) => {
    //Pedir listado users
    mongoDB.conexionDB()
        .then((conexion) => {
            const idNota = (pedido.params.id);
            const controlador = conexion.db().collection('notas');

            if(idNota>6){
                filtro = { id: idNota };
                controlador.deleteOne(filtro)
                    .then(respuesta.send(respuesta))
                    .catch((error) => respuesta.send(error))
            }else{
                console.log('Sin alumnos aprobados');
            }

        })
})



//Inicciar ell servidor en el puerto 3000
app.listen(3000, () => {
    console.log('servidor en linea')
});