const Role = require("../models/role");
const User = require("../models/user");

const isValidRole = async (rol = "") => {
  const existRole = await Role.findOne({ rol });
  if (!existRole) {
    throw new Error(`El role ${rol} no es válido`);
  }
};

const isEmailExist = async (email = "") => {
    const existUser = await User.findOne({ email });
    if (existUser) {
      throw new Error(`El email ${email} ya existe`);
    }
  };

module.exports = {
    isValidRole,
    isEmailExist
}