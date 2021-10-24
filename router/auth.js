/*
path: api/login
*/
const {Router} = require('express');
const { check } = require('express-validator');
const router = Router();

const {newUser, login, renewToken} = require('../contollers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

//new user
router.post('/new',[
    check('name','el nombre es obligatorio').not().isEmpty(),
    check('password','el password es obligatorio').not().isEmpty(),
    check('email','el email es obligatorio').isEmail(),
    validarCampos
],newUser);

//login

router.post('/',[
    check('email','el email es obligatorio').isEmail(),
    check('password','el password es obligatorio').not().isEmpty(),
    validarCampos
], login);

// renew token

router.get('/renew', validarJWT ,renewToken);



module.exports = router;