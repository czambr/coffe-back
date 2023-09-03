// ------------------------------------------------
//   ===> Librerias
// ------------------------------------------------
const express = require('express');
const cors = require('cors');

// ------------------------------------------------
//   ===> Configuracion de DB
// ------------------------------------------------
const { dbConennction } = require('../database/config');

// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------
class Server {
   constructor() {
      this.app = express();
      this.port = process.env.PORT;

      this.paths = {
         auth: '/api/auth',
         categorias: '/api/categorias',
         usuarios: '/api/usuarios',
      };

      // Conectar a BD
      this.conectarDB();

      // Middlewares
      this.middlewares();

      // Rutas de mi aplicación
      this.routes();
   }

   async conectarDB() {
      await dbConennction();
   }

   middlewares() {
      // CORS
      this.app.use(cors());

      // Lectura y parseo del body
      this.app.use(express.json());

      // Directorio Público
      this.app.use(express.static('public'));
   }

   routes() {
      this.app.use(this.paths.auth, require('../routes/auth'));
      this.app.use(this.paths.categorias, require('../routes/categorias'));
      this.app.use(this.paths.usuarios, require('../routes/usuarios'));
   }

   listen() {
      this.app.listen(this.port, () => {
         console.log('Servidor corriendo en puerto', this.port);
      });
   }
}

module.exports = Server;
