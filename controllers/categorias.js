// ------------------------------------------------
//  ===> Librerias
// ------------------------------------------------
const { response } = require('express');

// ------------------------------------------------
//  ===> Modelos
// ------------------------------------------------
const { Categoria } = require('../models');


// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------


// ===> Obtener todas las categorias
const obtenerCategorias = async (req, res = response) => {
   const { limite = 5, desde = 0 } = req.query;
   const query = { estado: true };

   // Busqueda en BD
   const totalCategorias = Categoria.countDocuments(query);
   const obtenerCategorias = Categoria.find(query)
      .populate('usuario', 'nombre')
      .skip(Number(desde))
      .limit(limite);

   // Retorno de resultados
   const [total, categorias] = await Promise.all([totalCategorias, obtenerCategorias]);

   res.json({
      total,
      categorias,
   });
};

// ===> Obtener categoria
const obtenerCategoria = async (req, res = response) => {
   const { id = '' } = req.params;

   // Busqueda de la categoria
   try {
      const categoriaBuscada = await Categoria.findById(id).populate('usuario', 'nombre');

      res.status(200).json({
         msg: `Categoria encontrada`,
         categoriaBuscada,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: `Problemas al buscar la Categoria con ${id} `,
         error,
      });
   }
};

// ===> Creación de Categoria
const crearCategoria = async (req, res = response) => {
   const nombre = req.body.nombre.toUpperCase();

   const categoriaDB = await Categoria.findOne({ nombre });
   if (categoriaDB) {
      return res.status(400).json({
         msg: `La categoria ${categoriaDB.nombre} ya existe`,
      });
   }

   // Generar la data a guardar
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
const actualizarCategoria = async (req, res = response) => {
   const { id = '' } = req.params;
   const { estado, usuario, ...data } = req.body;

   data.nombre = data.nombre.toUpperCase();
   data.usuario = req.usuario._id;

   try {
      const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
      res.status(201).json({
         msg: 'Categoria modificada correctamente',
         categoria,
      });
   } catch (error) {
      return res.status(500).json({
         msg: 'Error al actular la categoria',
         error,
      });
   }

   res.json(usuario);
};

// ===> Borrar categoria
const borrarCategoria = async (req, res = response) => {
   const { id } = req.params;

   try {
      const categoriaBorrada = await Categoria.findByIdAndUpdate(
         id,
         { estado: false },
         { new: true }
      );

      res.status(200).json({
         msg: 'Categoria Eliminada',
         categoriaBorrada,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Error al borrar categoria',
         error,
      });
   }
};

module.exports = {
   obtenerCategorias,
   obtenerCategoria,
   crearCategoria,
   actualizarCategoria,
   borrarCategoria,
};
