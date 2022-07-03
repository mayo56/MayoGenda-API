import express from "express";
import multer from "multer";
import DocumentsController from "../controller/ControllerDocument";
import checkAuthentificationJWT from "../middleware/jwtCheckAuth";
const DocumentRoute = express();

/**
 * Fonctions pour récupérer les images et les stockées
 */
const storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/avatarFile');
    },
    filename: function (req, file, cb) {
        const name = req.body.name + `.${file.mimetype.slice(6)}`;
        cb(null, "image" + '-' + name);
    }
});
const imageStock = multer({ storage: storageImage });


//----------------------------------------------
/**
 * Partie GET des données dans notre stockage
 */
DocumentRoute.get("/text/all", checkAuthentificationJWT, DocumentsController.GetTextAll);
DocumentRoute.get("/text/specific/:name", checkAuthentificationJWT, DocumentsController.GetTextSpecific);
DocumentRoute.get("/image/all", checkAuthentificationJWT, DocumentsController.GetImageAll);
DocumentRoute.get("/image/specific/:name", DocumentsController.GetImageSpecific);

/**
 * Partie POST des données dans notre stockage
 */
DocumentRoute.post("/text/new", checkAuthentificationJWT);
DocumentRoute.post("/image/new",checkAuthentificationJWT, imageStock.single("image"));

/**
 * Partie PATCH des données dans notre stockage
 */
DocumentRoute.patch("/text/modify", checkAuthentificationJWT);
DocumentRoute.patch("/image/modify", checkAuthentificationJWT);

/**
 * Partie DELETE des données dans notre stockage
 */
DocumentRoute.delete("/text/delete/:name", checkAuthentificationJWT);
DocumentRoute.delete("/image/delete/:name", checkAuthentificationJWT);

//Export de la constante
export default DocumentRoute;