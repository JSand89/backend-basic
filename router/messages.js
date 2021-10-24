/**  
 * Path: api/message
 */

const {Router} = require('express');

const { getChat } = require('../contollers/messages');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/:de', validarJWT, getChat)

module.exports = router;



