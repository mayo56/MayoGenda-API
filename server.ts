import express from "express";
import cors from "cors"
const app = express();
const versionAPI = "/api/beta";

//-------------------------------------------
/**
 * Cette API sert pour la gestion, envoie et stockeage
 * des données sur un projet d'agenda pour la première.
 */
//---------------------------------------------

/**
 * Utilisation json dans les requêtes
 */
app.use(express.json());


/**
 * Configuration de cors
 */
app.use(cors({
    "origin": "*",
    "methods": ["post", "get"]
}))

/**
 * Authentification utilisateur
 */
import AuthRouter from "./router/RouteAuth";
app.use(`${versionAPI}/auth`, AuthRouter);

/**
 * Ajout de texte et image à notre stockage
 */
import DocumentRoute from "./router/RouteDocuments";
app.use(`${versionAPI}/document`, DocumentRoute);

/**
 * Chack si le token est bon
 */
import jwt from "jsonwebtoken";
app.post(`${versionAPI}/checkToken`, (req, res, next) => {
    if (!req.body.token) return res.status(401).send({error:"Pas de token"});
    try {
        jwt.verify(req.body.token, "JeSuisMayoEtJeSuisLePlusBeauDuMonde");
    }catch (err) {
        return res.status(401).send({error: "Invalid Token"});
    };
    return res.status(201).send({success:"Token correct"})
})


app.listen(2000, () => {
    console.log("[System] API ready !");
});