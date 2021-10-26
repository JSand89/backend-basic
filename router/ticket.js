/**
 * path:api/room
 */

const {Router} = require('express');
const { check } = require('express-validator');
const { createTicket, getTicket } = require('../contollers/ticket');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/new',[
    check('history','Tiene que estar aspciado a una historia de usuario').not().isEmpty(),
    check('tiquet','Tiene que crear un ticket').not().isEmpty(),
    check('nameRoom','Tiene que estar en una sala').not().isEmpty(),
    check('proyect','Tiene que estar en un proyecto').not().isEmpty(),
    validarCampos
] ,createTicket );

router.get('/', getTicket)
module.exports = router;