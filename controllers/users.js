const { response } = require("express");

const usersGet = (req, res = response) => {
  res.json({ msg: "get API" });
};

const usersPost = (req, res = response) => {
  const body = req.body;

  res.json({ msg: "Post API", body });
};

const usersPut = (req, res = response) => {
  const {id} = req.params;

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
