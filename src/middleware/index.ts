import { validationResult } from "express-validator"
import { Request, Response, NextFunction } from 'express'


export const handleInputErrors = ( req : Request, res : Response, next : NextFunction ) => {

    // If don't pass validation
    let errors = validationResult(req)
    if ( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array()})
    }
    next()

}

    