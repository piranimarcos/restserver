const { response } = require("express");

const bcrypt = require("bcrypt");

const User = require("../models/user");

const usersGet = (req, res = response) => {
  res.json({ msg: "get API" });
};

const usersPost = async (req, res = response) => {


  const { name, email, password, rol } = req.body;

  const user = new User({ name, email, password, rol });

  // encrypt pass
  const salt = await bcrypt.genSaltSync();
  user.password = await bcrypt.hashSync(user.password, salt);

  // save data in db
  await user.save();

  res.json({ msg: "Usuario creado", user });
};

const usersPut = (req, res = response) => {
  const { id } = req.params;

  res.json({ msg: "Put API", id });
};

const usersDelete = (req, res = response) => {
  res.json({ msg: "Delete API" });
};

const usersPatch = (req, res = response) => {
  res.json({ msg: "Patch API" });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
  usersPatch,
};
