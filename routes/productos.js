// ------------------------------------------------
//  ===> Librerias
// ------------------------------------------------
const { Router } = require('express');
const { check } = require('express-validator');

// ------------------------------------------------
//  ===> Modulos + Controllers
// ------------------------------------------------
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto } = require('../controllers/productos');
const { existeProductoPorId, existeCategoriaPorId } = require('../helpers/db-validators');

// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------
const router = Router();

// Obtener todas las caterogiras - publico
router.get('/', obtenerProductos);

// Obtener una Producto por ID - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

// Crear un nuevo Producto - privado: Cualquier persona con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de producto es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

// Actualizar un registro por ID - Privado con token valido
router.put('/:id', [
    validarJWT,
    // check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

// Borrar una Producto - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto)

module.exports = router;
