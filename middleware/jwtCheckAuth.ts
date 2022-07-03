import express from "express";
import jwt from "jsonwebtoken";

const checkAuthentificationJWT = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const jwtToken = req.headers.authorization;

    //Si pas de token
    if (!jwtToken) return res.status(401).send({error:"Aucun token"});

    //Vérifiation du token
    try {
        jwt.verify(jwtToken, 'JeSuisMayoEtJeSuisLePlusBeauDuMonde');
    } catch (err) {
        //Si token invalide
        return res.status(401).send({error:"Invalid Token"});
    };
    //Si token valide
    next();
};

export default checkAuthentificationJWT;