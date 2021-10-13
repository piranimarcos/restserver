const { response } = require("express");
const User = require("../models/user");

const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/generate-jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos - email" });

    if (!user.state)
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos - estado" });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos - password" });

    const token = await generateJWT(user.id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo Salió mal, hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
