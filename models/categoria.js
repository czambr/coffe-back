// ------------------------------------------------
//   ===> Librerias
// ------------------------------------------------
const { Schema, model } = require('mongoose');

// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------
const CategoriaSchema = Schema({
   nombre: {
      type: String,
      require: [true, 'El nombre de la categoria es obligatorio'],
      unique: true,
   },
   estado: {
      type: Boolean,
      default: true,
      required: true,
   },
   usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
   },
});

module.exports = model('Categoria', CategoriaSchema);
