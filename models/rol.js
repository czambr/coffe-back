// ------------------------------------------------
//   ===> Librerias
// ------------------------------------------------
const { Schema, model } = require('mongoose');

// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------
const RoleSchema = Schema({
   rol: {
      type: String,
      require: [true, 'El rol es obligatorio'],
   },
});

module.exports = model('Role', RoleSchema);
