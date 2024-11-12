const Router = require("express");
const userRoute = Router();
const userController = require("../Controller/userController");

userRoute.post(
  "/signup",
  userController.hashPasswordMiddleWare,
  userController.userSignup
);

userRoute.post(
  "/login",
  userController.passwordMiddleware,
  userController.userLogin
);

userRoute.get("/users", userController.getUsers);

userRoute.put("/edit", userController.userEdit);

userRoute.delete("/delete", userController.userDelete);

module.exports = userRoute;
