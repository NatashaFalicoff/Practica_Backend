


const mysql = require('mysql2');



  //Configura la conexión a la base de datos
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '2605',
    database: 'backend',
  });

    // Conectar a la base de datos
    connection.connect((err) => {
        if (err) throw err;
        console.log('Conectado a la base de datos MySQL');
        
    
      });


//exporta la conexión
  module.exports=connection