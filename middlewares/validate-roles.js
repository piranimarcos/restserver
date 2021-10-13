const { response, request } = require("express");

const isAdminRole = async (req = request, res = response, next) => {
  if (!req.user) {
    return res
      .status(500)
      .json({ msg: "Se quiere verificar el role sin tener un token" });
  }

  const { rol, name } = req.user;

  if (rol !== "ADMIN_ROLE") {
    return res
      .status(401)
      .json({ msg: `${name} no posee permisos de administrador` });
  }
  next();
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res
        .status(500)
        .json({ msg: "Se quiere verificar el role sin tener un token" });
    }

    if(!roles.includes(req.user.rol)){
      return res
        .status(500)
        .json({ msg: `Se requiere alguno de estos roles ${roles}` });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
