import express from "express";
import {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser
} from "../controllers/users.js";

const users = express.Router(); //router-methode kommt aus express package

//um alle users zu bekommen
users.route("/").get(getAllUsers).post(createUser);

//um nur einen user zu bekommen
users.route("/:id").get(getSingleUser).delete(deleteUser).put(updateUser)

export default users;
