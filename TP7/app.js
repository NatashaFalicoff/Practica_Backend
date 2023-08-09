const express = require("express");
const morgan = require("morgan");

app = express();

//llama a los controladores
const usuario = require("./controllers/usuarioControllers");
const persona = require("./controllers/personaControllers");

// Configura el middleware para analizar datos en el cuerpo de las peticiones
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Utiliza los controladores
app.use(usuario);
app.use(persona);

//exporta app
module.exports = app;
