const userController = {};

userController.getUser = (req, res) => {
  res.send("Hola");
};

userController.postUser = (req, res) => {
  res.send();
};

userController.patchUser = (req, res) => {
  res.send();
};

module.exports = userController;
