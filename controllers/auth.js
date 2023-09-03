// ------------------------------------------------
//  ===> Librerias
// ------------------------------------------------
const { response, json } = require('express');
const bcryptjs = require('bcryptjs');

// ------------------------------------------------
//  ===> Modulos + Controllers
// ------------------------------------------------
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res = response) => {
   const { correo, password } = req.body;

   try {
      // Verificar si el emal existe
      const usuario = await Usuario.findOne({ correo });
      if (!usuario) {
         return res.status(400).json({
            msg: 'Usuario / Password no son correctos - correo',
         });
      }

      // Si el usuario está activo
      if (!usuario.estado) {
         return res.status(400).json({
            msg: 'Usuario / Password no son correctos - estado: false',
         });
      }

      // Verifica la constraseña
      const validPassword = bcryptjs.compareSync(password, usuario.password);
      if (!validPassword) {
         return res.status(400).json({
            msg: 'Usuario / Password no son correctos - password',
         });
      }

      // Generar el JWT
      const token = await generarJWT(usuario.id);

      res.json({
         usuario,
         token,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Hable con el administrador',
      });
   }
};

const googleSigIn = async (req, res = response) => {
   const { id_token } = req.body;

   try {
      const { nombre, img, correo } = await googleVerify(id_token);

      // Verificar si el usuario existe en nuestra BD
      let usuario = await Usuario.findOne({ correo });
      if (!usuario) {
         // Tengo que crearlo
         const data = {
            nombre,
            correo,
            password: ':p',
            img,
            google: true,
         };
         usuario = new Usuario(data);
         await usuario.save();
      }

      // Si el usuario en BD
      if (!usuario.estado) {
         return res.status(401).json({
            msg: 'Hable con el administrador. Usuario bloqueado',
         });
      }

      // Generar el JWT
      const token = await generarJWT(usuario.id);

      res.json({
         usuario,
         token,
      });
   } catch (error) {
      res.status(400),
         json({
            ok: false,
            msg: 'El Token no se pudo verificar',
         });
   }
};

module.exports = {
   login,
   googleSigIn,
};
