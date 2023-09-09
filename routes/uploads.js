// ------------------------------------------------
//  ===> Librerias
// ------------------------------------------------
const { Router } = require('express');
const { check } = require('express-validator');

// ------------------------------------------------
//  ===> Modulos + Controllers
// ------------------------------------------------
const { validarCampos, validarArchivoSubir } = require('../middlewares');
const { cargarArchivos, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');

// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------
const router = Router();


router.post('/', validarArchivoSubir, cargarArchivos)

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagen)

module.exports = router;
