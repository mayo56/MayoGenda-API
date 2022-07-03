import express from "express";
import fs from "node:fs";

/**
 * Récupération image
 */
import path from "node:path";
let ImageGetOption = {
    root: path.join(__dirname, '../StockageImage'),
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};

/**
 * Variable de logs (temps)
 */
const dateOfConnexion = [`${new Date().getDate()}`, `${new Date().getMonth() + 1}`, `${new Date().getFullYear()}`];
const hoursOfConnexion = `${new Date().getHours()}h ` + `${new Date().getMinutes()}m ` + `${new Date().getSeconds()}s`

//---------------------------------------------
const DocumentsController = {
    /**
     * Get toutes les image et les envoie (seulement leurs données)
     * @param req 
     * @param res 
     */
    GetImageAll: async (req: express.Request, res: express.Response) => {
        const AllImage = fs.readdirSync("StockageImage", { encoding: "utf-8" });
        console.log("[All Image] send all image : " + dateOfConnexion.join("/") + " at " + hoursOfConnexion + ";")
        return res.status(201).send({ images: AllImage })
    },
    /**
     * Get l'image demandée et l'envoie
     * @param req 
     * @param res 
     * @param next 
     */
    GetImageSpecific: async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const name = req.params.name;
        res.sendFile(name, ImageGetOption, (err) => {
            if (err) {
                next(err);
            } else {
                console.log("[Specific Image] send { " + name + " } : " + dateOfConnexion.join("/") + " at " + hoursOfConnexion + ";");
            }
        })
    },
    /**
     * Get tous les textes et les envoie (seulement leurs données)
     * @param req 
     * @param res 
     * @returns 
     */
    GetTextAll: async (req: express.Request, res: express.Response) => {
        const AllImage = fs.readdirSync("StockageText", { encoding: "utf-8" });
        console.log("[All Text] send all text : " + dateOfConnexion.join("/") + " at " + hoursOfConnexion + ";")
        return res.status(201).send({ text: AllImage })
    },
    /**
     * Get le texte demandé et l'envoie
     * @param req 
     * @param res 
     */
    GetTextSpecific: async (req: express.Request, res: express.Response) => {
        const name = req.params.name;
        fs.readFile(`StockageText/${name}`, { encoding: "utf-8" }, (err, data) => {
            if (err) {
                console.log("[Specific Text] Error for reading text : " + dateOfConnexion.join("/") + " at " + hoursOfConnexion + ";");
                res.status(401).send({error: err});
            } else {
                console.log("[Specific Text] send { " + name + " } : " + dateOfConnexion.join("/") + " at " + hoursOfConnexion + ";");
                return res.status(201).send({text:data});
            };
        });
    },
    DeleteImage: async (req: express.Request, res: express.Response) =>{
        const name = req.params.name;
        fs.unlink(`StockageImage/${name}`, (err) => {
            if(err) {
                return res.status(401).send({error:err});
            }else {
                return res.status(201).send({succes:"Image supprimé"});
            };
        });
    }
};

export default DocumentsController;