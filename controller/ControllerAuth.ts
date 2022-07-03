import express from "express";
import jwt from "jsonwebtoken";

const AuthController = {
    login: async (req: express.Request, res: express.Response) => {
        const userAuth = req.body;

        //Vérification Form Body
        if (!userAuth.pseudo || !userAuth.password) {
            return res.status(401).send({ MayoAPIError: "Invalid form body." })
        }

        //Vérification identifiants
        const { pseudo, password } = require("../db/login.json");
        if (userAuth.pseudo !== pseudo || userAuth.password !== password) {
            return res.status(401).send({ error: "Pseudo ou mot de passe incorect." });
        } else {
            try {
                //Création de token
                const token = jwt.sign({
                    "pseudo": userAuth.pseudo,
                    "password": userAuth.password,
                }, "JeSuisMayoEtJeSuisLePlusBeauDuMonde");
                //Partie logs
                const dateOfConnexion = [`${new Date().getDate()}`, `${new Date().getMonth() + 1}`, `${new Date().getFullYear()}`];
                const hoursOfConnexion = `${new Date().getHours()}h ` + `${new Date().getMinutes()}m ` + `${new Date().getSeconds()}s`
                console.log("[Connexion] " + `${userAuth.pseudo} as been connected : ${dateOfConnexion.join("/")} at ${hoursOfConnexion};`);
                //Réponse
                return res.status(201).send({ success: token });
            } catch (err) {
                return res.status(401).send({ error: "Une erreur s'est produite." });
            };
        };
    }
};

export default AuthController;