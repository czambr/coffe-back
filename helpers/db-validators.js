// ------------------------------------------------
//  ===> Modelos
// ------------------------------------------------
const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');

// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------
const esRoleValido = async (rol = '') => {
   const existeRol = await Role.findOne({ rol });
   if (!existeRol) throw new Error(`El rol ${rol} no está registrado en la bd`);
};

const emailExiste = async (correo = '') => {
   const existeEmail = await Usuario.findOne({ correo });
   if (existeEmail) {
      throw new Error(`El correo: ${correo} ya está registrado`);
   }
};

const existeUsuarioPorId = async (id = '') => {
   const existeUsuario = await Usuario.findById({ _id: id });
   if (!existeUsuario) {
      throw new Error(`El id ${id} no existe`);
   }
};

const existeCategoriaPorId = async (id = '') => {
   const existeCategoria = await Categoria.findById(id);
   if (!existeCategoria) {
      throw new Error(`El id ${id} de categoria no existe`);
   }
};

const existeProductoPorId = async (id = '') => {
   const existeProducto = await Producto.findById(id);
   if (!existeProducto) {
      throw new Error(`El id ${id} de Producto no existe`);
   }
};

module.exports = {
   esRoleValido,
   emailExiste,
   existeUsuarioPorId,
   existeCategoriaPorId,
   existeProductoPorId
};
