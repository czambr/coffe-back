
// ------------------------------------------------
//  ===> Todos los modulos de Helpers
// ------------------------------------------------

const dbValidators = require('./db-validators')
const generar_jwt = require('./generar-jwt')
const google_verify = require('./google-verify')
const subir_archivo = require('./subir-archivo')




module.exports = {
    ...dbValidators,
    ...generar_jwt,
    ...google_verify,
    ...subir_archivo,
}