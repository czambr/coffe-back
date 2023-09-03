// ------------------------------------------------
//  ===> Modelos
// ------------------------------------------------
const Role = require('../models/role');
const usuario = require('../models/usuario');

// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------
const esRoleValido = async (rol = '') => {
   const existeRol = await Role.findOne({ rol });
   if (!existeRol) throw new Error(`El rol ${rol} no está registrado en la bd`);
};

const emailExiste = async (correo = '') => {
   const existeEmail = await usuario.findOne({ correo });
   if (existeEmail) {
      throw new Error(`El correo: ${correo} ya está registrado`);
   }
};

const existeUsuarioPorId = async (id = '') => {
   const existeUsuario = await usuario.findById({ _id: id });
   if (!existeUsuario) {
      throw new Error(`El id ${id} no existe`);
   }
};

module.exports = {
   esRoleValido,
   emailExiste,
   existeUsuarioPorId,
};
