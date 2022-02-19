const express = require('express');
const Routes = express.Router();

Routes.get('/', (req, res) => {
  res.send('😊 Hello World! 😊 - Router');
});

module.exports = Routes;
