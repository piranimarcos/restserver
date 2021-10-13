const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-access-token");

  if (!token) {
    return res.status(401).json({ msg: "No se envio un token" });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_JWT);

    const user = await User.findById(uid);
    req.user = user;

    if (!user) {
      return res.status(401).json({
        msg: "Token no válido - usuario no existe en DB",
      });
    }

    if (!user.state) {
      return res.status(401).json({
        msg: "Token no válido - usuario con estado false",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Token no válido" });
  }
};

module.exports = {
  validateJWT,
};
