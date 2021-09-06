const Router = require("express").Router();
const { usersGet, usersPut, usersDelete , usersPatch, usersPost} = require("../controllers/users");

const router = Router;

router.get("/", usersGet);

router.post("/", usersPost);

router.put("/:id", usersPut);

router.delete("/", usersDelete);

router.patch("/", usersPatch);

module.exports = router;
