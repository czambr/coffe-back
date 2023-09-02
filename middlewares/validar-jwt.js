// ------------------------------------------------
//  ===> Librerias
// ------------------------------------------------
const { response } = require('express');
const jwt = require('jsonwebtoken');

// ------------------------------------------------
//  ===> Modelos
// ------------------------------------------------
const Usuario = require('../models/usuario');

// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------
const validarJWT = async (req, res = response, next) => {
   const token = req.header('x-token');

   if (!token) {
      return res.status(401).json({
         msg: 'No hay token en la peticion  ',
      });
   }

   try {
      const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

      // Lectura del usuario
      const usuario = await Usuario.findById(uid);
      if (!usuario) {
         return res.status(401).json({
            msg: 'Token no valido - Usuario no existente en BD',
         });
      }

      // Verificar si el usuario.estado = true
      if (!usuario.estado) {
         return res.status(401).json({
            msg: 'Token no valido - Usuario con estado false',
         });
      }

      req.usuario = usuario;
      next();
   } catch (error) {
      console.log(error);
      res.status(401).json({
         msg: 'Token no valido',
      });
   }
};

module.exports = {
   validarJWT,
};
