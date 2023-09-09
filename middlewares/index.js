// ------------------------------------------------
//  ===> Todos los modulos de Middlewares
// ------------------------------------------------
const validaCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validarArchivoSubir = require('../middlewares/validar-archivo')
module.exports = {
   ...validaCampos,
   ...validarJWT,
   ...validaRoles,
   ...validarArchivoSubir
};
