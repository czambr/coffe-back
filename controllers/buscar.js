const { response } = require("express");
const { ObjectId } = require("mongoose").Types


const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = [
    'categorias',
    'usuarios',
    'productos',
    'roles',
]


// ===> Busqueda de categorias  por los criterios: nombre categoria
const buscarCategorias = async (termino = '', res = response) => {

    // En caso de que la busqueda se por ID
    const esMongoId = ObjectId.isValid(termino) // true/false
    if (esMongoId) {
        const categoria = await Categoria.findById(termino)
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i')
    const categorias = await Categoria.find({ nombre: regex, estado: true })
    return res.json({
        results: categorias
    })

}


// ===> Busqueda de usuarios por los criterios: id, nombre usuer, correo
const buscarUsuarios = async (termino = '', res = response) => {
    // En caso de que la busqueda se por ID
    const esMongoId = ObjectId.isValid(termino) // true/false
    if (esMongoId) {
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i')
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    })
    return res.json({
        results: usuarios
    })

}



// ===> Busqueda de productos  por los criterios: 
const buscarProductos = async (termino = '', res = response) => {

    // En caso de que la busqueda se por ID
    const esMongoId = ObjectId.isValid(termino) // true/false
    if (esMongoId) {
        const producto = await Producto.findById(termino)
            .populate('categoria', 'nombre')
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino, 'i')
    const productos = await Producto.find({ nombre: regex, estado: true })
        .populate('categoria', 'nombre')
    return res.json({
        results: productos
    })

}




const buscar = async (req, res = response) => {

    const { coleccion, termino } = req.params;
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    try {
        switch (coleccion) {

            case 'categorias':
                await buscarCategorias(termino, res)
                break

            case 'usuarios':
                await buscarUsuarios(termino, res)
                break

            case 'productos':
                await buscarProductos(termino, res)
                break


            default:
                res.status(500).json({
                    msg: 'Se me olvido hacer esta busqueda'
                })
        }

    } catch (error) {
        res.status(500).json({
            msg: 'Busqueda no valida'
        })

    }
}

module.exports = { buscar };