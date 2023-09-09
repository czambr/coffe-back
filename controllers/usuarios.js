// ------------------------------------------------
//  ===> Librerias
// ------------------------------------------------
const { response, request } = require('express');
const brcruptjs = require('bcryptjs');

// ------------------------------------------------
//  ===> Modulos + helpers
// ------------------------------------------------
const Usuario = require('../models/usuario');

// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------

// ===> Obtener Usuarios con estado Activo
const usuariosGet = async (req, res = response) => {
   const { limite = 5, desde = 0 } = req.query;
   const query = { estado: true };

   // Operaciones realizadas a BD
   const obtenerUsuarios = Usuario.find(query).skip(Number(desde)).limit(Number(limite));

   const totalUsuariosBD = Usuario.countDocuments(query);

   // Retorno de promesas
   const [total, usuarios] = await Promise.all([totalUsuariosBD, obtenerUsuarios]);

   res.json({
      total,
      usuarios,
   });
};

// ===> Crear Usuarios
const usuariosPost = async (req, res = response) => {
   const { nombre, correo, password, rol } = req.body;
   const usuario = new Usuario({ nombre, correo, password, rol });

   // Encriptar la contraseña
   const salt = brcruptjs.genSaltSync();
   usuario.password = brcruptjs.hashSync(password, salt);

   // Guardar en BD
   await usuario.save();

   res.json(usuario);
};

// ===> Modificar Usuarios
const usuariosPut = async (req, res = response) => {
   const { id } = req.params;
   const { password, google, correo, ...resto } = req.body;

   if (password) {
      // Encriptar la contraseña
      const salt = brcruptjs.genSaltSync();
      resto.password = brcruptjs.hashSync(password, salt);
   }

   const usuario = await Usuario.findByIdAndUpdate(id, resto);

   res.json(usuario);
};

// ===>
const usuariosPatch = (req, res = response) => {
   res.json({
      msg: 'patch API - usuariosPatch',
   });
};

// ===> Borrar Usuario
const usuariosDelete = async (req, res = response) => {
   const { id } = req.params;

   //Borrado Lógico
   const usuarioDeleted = await Usuario.findByIdAndUpdate(id, { estado: false });

   res.json(usuarioDeleted);
};

module.exports = {
   usuariosGet,
   usuariosPost,
   usuariosPut,
   usuariosPatch,
   usuariosDelete,
};
