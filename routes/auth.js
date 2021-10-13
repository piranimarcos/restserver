const Router = require("express").Router();
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { isValidRole, isEmailExist, isUserByIdExist } = require("../helpers/db-validators");
const { validateData } = require("../middlewares/validates");

const router = Router;

router.post("/login", [
    check('email', 'El email no es correcto').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateData
], login);


module.exports = router;
