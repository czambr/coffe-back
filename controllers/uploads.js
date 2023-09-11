// ------------------------------------------------
//  ===> Librerias
// ------------------------------------------------
const path = require('path')
const fs = require('fs')
const { response } = require("express");
// ------------------------------------------------
//  ===> Modulos + helpers
// ------------------------------------------------
const { subuirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");



// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------

const cargarArchivos = async (req, res = response) => {
    // Carga de archivos
    try {
        const nombre = await subuirArchivo(req.files, undefined, 'imgs')

        res.json({
            nombre
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}



const actualizarImagen = async (req, res = response) => {
    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;


        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }

            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' })
    }

    // Limpiar imagenes previas
    if (modelo.img) {

        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if (fs.existsSync(pathImagen)) {
            fs.unlinkSync(pathImagen)
        }
    }

    // Actualizacion de la imagen
    const nombre = await subuirArchivo(req.files, undefined, coleccion)
    modelo.img = nombre
    modelo.save();

    res.json({ modelo })
}


const mostrarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id)
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' })
    }

    // Limpiar imagenes previas
    if (modelo.img) {
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen)
        }
    }

    const pathNotFile = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile(pathNotFile)
}


module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
}