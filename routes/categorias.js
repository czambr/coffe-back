// ------------------------------------------------
//  ===> Librerias
// ------------------------------------------------
const { Router } = require('express');
const { check } = require('express-validator');

// ------------------------------------------------
//  ===> Modulos + Controllers
// ------------------------------------------------
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------
const router = Router();

// Obtener todas las caterogiras - publico
router.get('/', obtenerCategorias);

// Obtener una categoria por ID - publico
router.get('/:id', [
   check('id', 'No es un ID válido').isMongoId(),
   check('id').custom(existeCategoriaPorId),
   validarCampos
], obtenerCategoria);

// Crear una nueva categoria - privado: Cualquier persona con token valido
router.post('/', [
   validarJWT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   validarCampos
], crearCategoria);

// Actualizar un registro por ID - Privado con token valido
router.put('/:id', [
   validarJWT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('id', 'No es un ID válido').isMongoId(),
   check('id').custom(existeCategoriaPorId),
   validarCampos
], actualizarCategoria);

// Borrar una categoria - Admin
router.delete('/:id', [
   validarJWT,
   esAdminRole,
   check('id', 'No es un ID válido').isMongoId(),
   check('id').custom(existeCategoriaPorId),
   validarCampos
], borrarCategoria)

module.exports = router;
