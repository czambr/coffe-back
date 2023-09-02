// ------------------------------------------------
//  ===> Todos los modulos de Middlewares
// ------------------------------------------------
const validaCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
   ...validaCampos,
   ...validarJWT,
   ...validaRoles,
};
