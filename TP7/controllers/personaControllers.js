const express = require("express");
const app = express();

const connection = require("../dataBase/connection");




//método GET (trae todo lo de la tabla persona)
app.get("/personas", (req, res) => {
  const query = "SELECT * FROM persona";

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Error al buscar personas", error });
    } else {
      res.json(results);
    }
  });
});



//método GET trae la persona buscando por PK (dni)
app.get("/personas/:dni", (req, res) => {
  const dni = req.params.dni;
  const query = "SELECT * FROM persona WHERE dni = ?";
  connection.query(query, dni, (err, results) => {
    if (err) {
      console.error("Error al obtener persona por dni: ", err);
      res.status(500).json({ message: "Error al obtener persona por dni" });
    } else if (results.length === 0) {
      res.status(404).json({ message: "persona no encontrada" });
    } else {
      res.json(results[0]);
    }
  });
}),



  //método GET trae la persona buscando por apellido
  app.get("/:apellido", (req, res) => {
    const apellido = req.params.apellido;
    const query = "SELECT * FROM persona WHERE apellido = ?";
    connection.query(query, apellido, (err, results) => {
      if (err) {
        console.error("Error al obtener persona por apellido: ", err);
        res
          .status(500)
          .json({ message: "Error al obtener persona por apellido" });
      } else if (results.length === 0) {
        res.status(404).json({ message: "persona no encontrada" });
      } else {
        res.json(results[0]);
      }
    });
  }),



  //método GET trae la persona buscando por PK (dni)
  app.get("/personas/:dni", (req, res) => {
    const mail = req.params.dni;
    const query = "SELECT * FROM persona WHERE dni = ?";
    connection.query(query, mail, (err, results) => {
      if (err) {
        console.error("Error al obtener usuario por mail: ", err);
        res.status(500).json({ message: "Error al obtener usuario por mail" });
      } else if (results.length === 0) {
        res.status(404).json({ message: "Usuario no encontrado" });
      } else {
        res.json(results[0]);
      }
    });
  }),



  //método POST (crea una persona)
  app.post("/persona", (req, res) => {
    const PersonaData = req.body;
    connection.query(
      "INSERT INTO persona SET ?",
      PersonaData,
      (err, result) => {
        if (err) {
          console.error("Error al crear persona: ", err);
          res.status(500).json({ message: "Error al crear persona" });
        } else {
          const newPersona = { dni: PersonaData.dni, ...PersonaData };
          res.json(newPersona);
          res.json({ message: "Persona creada correctamente" });
        }
      }
    );
  });




//método PUT (edita una persona)
app.put("/persona/:dni", (req, res) => {
  const dni = req.params.dni;
  const updatedData = req.body;
  connection.query(
    "UPDATE persona SET ? WHERE dni = ?",
    [updatedData, dni],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar persona: ", err);
        res.status(500).json({ message: "Error al actualizar persona" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "persona no encontrada" });
      } else {
        res.json({ message: "persona actualizada correctamente", updatedData });
      }
    }
  );
});



//método DELETE (elimina una persona)
app.delete("/persona/:dni", (req, res) => {
  const dni = req.params.dni;
  connection.query("DELETE FROM persona WHERE dni = ?", dni, (err, result) => {
    if (err) {
      console.error("Error al eliminar persona: ", err);
      res.status(500).json({ message: "Error al eliminar persona" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "persona no encontrada" });
    } else {
      res.json({ message: "persona eliminada correctamente" });
    }
  });
}),


  (module.exports = app);
