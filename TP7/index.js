//requiere express y morgan
const express = require("express");
const morgan = require("morgan");
const config = require("./app");

//instanciar express
const app = express();
app.use(config);

//configurar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
