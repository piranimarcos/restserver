const Router = require("express").Router();
const { check } = require("express-validator");
const {
  usersGet,
  usersPut,
  usersDelete,
  usersPatch,
  usersPost,
} = require("../controllers/users");
const { isValidRole } = require("../helpers/db-validators");
const { validateData } = require("../middlewares/validates");

const router = Router;

router.get("/", usersGet);

router.post("/", [
    check('email', 'El email no es correcto').isEmail(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROL']),
    check('rol').custom( isValidRole ),
    validateData
], usersPost);

router.put("/:id", usersPut);

router.delete("/", usersDelete);

router.patch("/", usersPatch);

module.exports = router;
