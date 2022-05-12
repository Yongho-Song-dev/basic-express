const express = require('express');
const Routes = express.Router();

Routes.get('/', (req, res) => {
  res.send('😊 Hello World! 😊 - Router');
});






/**
*  @swagger
*  paths:
*   /board:
*     get:
*       summary: List all the posts.
*       responses:
*         "200":
*           description: The list of books.
*           content:
*             application/json:
*               schema:
*                 $ref: '#/components/schemas/board'
*/
module.exports = Routes;
