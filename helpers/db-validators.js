const Role = require("../models/role");

const isValidRole = async (rol = "") => {
  const existRole = await Role.findOne({ rol });
  if (!existRole) {
    throw new Error(`El role ${rol} no es válido`);
  }
};

module.exports = {
    isValidRole
}