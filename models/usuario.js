// ------------------------------------------------
//   ===> Librerias
// ------------------------------------------------
const { Schema, model } = require('mongoose');

// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------
const UsuarioSchema = Schema({
   nombre: {
      type: String,
      required: [true, 'El nombre es requerido'],
   },
   correo: {
      type: String,
      required: [true, 'El correo es obligatorio'],
      unique: true,
   },
   password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
   },
   img: {
      type: String,
   },
   rol: {
      type: String,
      require: true,
      default: 'USER_ROLE',
      emun: ['ADMIN_ROLE', 'USER_ROLE'],
   },
   estado: {
      type: Boolean,
      default: true,
   },
   google: {
      type: Boolean,
      default: false,
   },
});

UsuarioSchema.methods.toJSON = function () {
   const { __v, password, _id, ...infoUsuario } = this.toObject();
   infoUsuario.uid = _id;
   return infoUsuario;
};

module.exports = model('Usuario', UsuarioSchema);
