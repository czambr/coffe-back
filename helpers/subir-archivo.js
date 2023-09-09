
// ------------------------------------------------
//  ===> Librerias
// ------------------------------------------------
const path = require('path')
const { v4: uuidv4 } = require('uuid')


// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------
const subuirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'],
    carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.')
        const extension = nombreCortado[nombreCortado.length - 1]

        // Validar la extension
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida. Solo se admiten ${extensionesValidas}`)
        }

        // Nombre unico de los archivos recibidos
        const nombreTemporal = uuidv4() + '.' + extension

        //Directorio de donde se subira el archivo
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemporal);
        archivo.mv(uploadPath, function (error) {
            if (error) {
                reject(error)
            }
            resolve(nombreTemporal)
        });

    })

}


module.exports = {
    subuirArchivo
}