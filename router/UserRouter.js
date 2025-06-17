import { createUser, loginUser } from "../controller/Users.js";
import express from "express";

export const AuthRouter  = express.Router();

AuthRouter .post("/signup", createUser);
AuthRouter .post("/signin", loginUser);