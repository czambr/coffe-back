// ------------------------------------------------
//  ===> Librerias
// ------------------------------------------------
const { Router } = require('express');
const { check } = require('express-validator');

// ------------------------------------------------
//  ===> Modulos + Controllers
// ------------------------------------------------
const { validarCampos } = require('../middlewares/validar-campos');
const { login } = require('../controllers/auth');

// ------------------------------------------------
//   ===>            Inicio  Modulo            <===
// ------------------------------------------------
const router = Router();

router.post(
   '/login',
   [
      check('correo', 'El correo es obligatorio').isEmail(),
      check('password', 'La contraseña no es obligatoria').not().isEmpty(),
      validarCampos,
   ],
   login
);

module.exports = router;
