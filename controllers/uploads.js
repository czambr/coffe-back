const { response } = require("express")

const path = require('path')




const cargarArchivos = (req, res = response) => {


    if (!req.files
        || Object.keys(req.files).length === 0
        || !req.files.archivo
    ) {
        return res.status(400).send('No hay archivos que subir');
    }



    const { archivo } = req.files;
    const uploadPath = path.join(__dirname, '../uploads/', archivo.name);

    archivo.mv(uploadPath, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ err });
        }

        res.send({ msg: 'File uploaded!' + uploadPath });
    });
}


module.exports = {
    cargarArchivos
}