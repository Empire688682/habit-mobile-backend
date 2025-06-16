import { createUser } from "../controller/CreateUser.js";
import express from "express";

export const UserRouter = express.Router();

UserRouter.post("/", createUser);