const { response } = require('express');

const { Categoria } = require('../models');

// middleware para verficar categorias

// ===> Obtener categorias
// obtenerCategorias - paginado - total - populate

// ===> Obtener categoria
// obtenerCategoria - paginado -total - populate

// ===> Creación de Categoria
const crearCategoria = async (req, res = response) => {
   const nombre = req.body.nombre.toUpperCase();

   const categoriaDB = await Categoria.findOne({ nombre });
   if (categoriaDB) {
      return res.status(400).json({
         msg: `La categoria ${categoriaDB.nombre} ya existe`,
      });
   }

   // Generar la daa a guardar
   const data = {
      nombre,
      usuario: req.usuario._id,
   };

   // Guardar en BD
   const categoria = new Categoria(data);
   await categoria.save();

   res.status(201).json(categoria);
};

// ===> Actualizar categoria
// actualizarCategoria - cambiar de categoria

// ===> Borrar categoria
// borrrarCategoria - borrado logigo

module.exports = {
   crearCategoria,
};
