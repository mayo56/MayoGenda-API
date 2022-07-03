import express from "express";
import AuthController from "../controller/ControllerAuth";
const AuthRouter = express();

/**
 * Connexion utilisateur
 */
AuthRouter.post("/login", AuthController.login);

export default AuthRouter;