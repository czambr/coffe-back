// ------------------------------------------------
//  ===> Librerias
// ------------------------------------------------
const { Router } = require('express');
const { check } = require('express-validator');

// ------------------------------------------------
//  ===> Modulos + Controllers
// ------------------------------------------------
const { validarJWT, validarCampos } = require('../middlewares');
const { login, googleSigIn } = require('../controllers/auth');
const { crearCategoria } = require('../controllers/categorias');

// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------
const router = Router();

// Obtener todas las caterogiras - publico
router.get('/', (req, res) => {
   res.send({
      msg: 'GET - hola desde categorias',
   });
});

// Obtener una categoria por ID - publico
router.get('/:id', (req, res) => {
   res.send({
      msg: 'GET ID - categorias x id',
   });
});

// Crear una nueva categoria - privado: Cualquier persona con token valido
router.post(
   '/',
   [validarJWT, check('nombre', 'El nombre es obligatorio').not().isEmpty(), validarCampos],
   crearCategoria
);

// Actualizar un registro por ID - Privado con token valido
router.put('/:id', (req, res) => {
   res.send({
      msg: 'PUT',
   });
});

// Borrar una categoria - Admin
router.delete('/:id', (req, res) => {
   res.send({
      msg: 'DELETE',
   });
});

module.exports = router;
