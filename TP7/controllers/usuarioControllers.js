const express = require("express");
const app = express();

const connection = require("../dataBase/connection");



//método GET (trae todo lo de la tabla usuario)
app.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM usuario";

  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Error al buscar usuarios", error });
    } else {
      res.json(results);
    }
  });
});



//método GET trae el usuario buscando por PK(mail)
app.get("/usuarios/:mail", (req, res) => {
  const mail = req.params.mail;
  const query = "SELECT * FROM usuario WHERE mail = ?";
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



  //método POST (crea un usuario)
  app.post("/usuario", (req, res) => {
    const usuarioData = req.body;
    connection.query(
      "INSERT INTO usuario SET ?",
      usuarioData,
      (err, result) => {
        if (err) {
          console.error("Error al crear usuario: ", err);
          res.status(500).json({ message: "Error al crear usuario" });
        } else {
          const newUsuario = { mail: usuarioData.mail, ...usuarioData };
          res.json(newUsuario);
          res.json({ message: "Usuario creado correctamente" });
        }
      }
    );
  });




//método PUT (edita un usuario)
app.put("/usuario/:mail", (req, res) => {
  const mail = req.params.mail;
  const updatedData = req.body;
  connection.query(
    "UPDATE usuario SET ? WHERE mail = ?",
    [updatedData, mail],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar usuario: ", err);
        res.status(500).json({ message: "Error al actualizar usuario" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "Usuario no encontrado" });
      } else {
        res.json({ message: "Usuario actualizado correctamente", updatedData });
      }
    }
  );
});




//método DELETE (elimina un usuario)
app.delete("/usuario/:mail", (req, res) => {
  const mail = req.params.mail;
  connection.query(
    "DELETE FROM usuario WHERE mail = ?",
    mail,
    (err, result) => {
      if (err) {
        console.error("Error al eliminar usuario: ", err);
        res.status(500).json({ message: "Error al eliminar usuario" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "Usuario no encontrado" });
      } else {
        res.json({ message: "Usuario eliminado correctamente" });
      }
    }
  );
}),



  (module.exports = app);
