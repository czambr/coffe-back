// ------------------------------------------------
//  ===> Librerias
// ------------------------------------------------
const { response } = require('express');


// ------------------------------------------------
//  ===> Modelos
// ------------------------------------------------
const { Producto } = require('../models');



// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------

// ===> Obtener todas las Productos
const obtenerProductos = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // Busqueda en BD
    const totalProductos = Producto.countDocuments(query);
    const obtenerProductos = Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number(desde))
        .limit(limite);

    // Retorno de resultados
    const [total, Productos] = await Promise.all([totalProductos, obtenerProductos]);

    res.json({
        total,
        Productos,
    });
};

// ===> Obtener Producto
const obtenerProducto = async (req, res = response) => {
    const { id = '' } = req.params;

    // Busqueda de la Producto
    try {
        const productoBuscado = await Producto.findById(id)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');

        res.status(200).json({
            msg: `Producto encontrada`,
            productoBuscado,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: `Problemas al buscar la Producto con ${id} `,
            error,
        });
    }
};

// ===> Creación de Producto
const crearProducto = async (req, res = response) => {

    const { esado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() });
    if (productoDB) {
        return res.status(400).json({
            msg: `El Producto ${productoDB.nombre} ya existe`,
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: req.body.nombre.toUpperCase(),
        usuario: req.usuario._id,
    };

    // Guardar en BD
    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto);
};

// ===> Actualizar Producto
const actualizarProducto = async (req, res = response) => {
    const { id = '' } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;
    try {
        const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
        res.status(201).json({
            msg: 'Producto modificado correctamente',
            producto,
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al actualizar el Producto',
            error,
        });
    }

    res.json(usuario);
};

// ===> Borrar Producto
const borrarProducto = async (req, res = response) => {
    const { id } = req.params;

    try {
        const productoBorrado = await Producto.findByIdAndUpdate(
            id,
            { estado: false },
            { new: true }
        );

        res.status(200).json({
            msg: 'Producto Eliminado',
            productoBorrado,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al borrar Producto',
            error,
        });
    }
};

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto,
};
