import { Request, Response, NextFunction } from "express"

export const errorHandler = (err:Error ,
    req:Request,
    res:Response,
    next:NextFunction) => {

        console.log("Something wrong happened");
        res.status(400).send({"error":"Something went wrong"})

}