import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export default function Auth (req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({error : "token not found"});
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        if(decodedToken.userID){
            req.userID = decodedToken.userID;
            next();
        }
        else{
            return res.status(403).json({error : "please try again."});
        }

    } catch (error) {
        return res.status(403).json({error : "Invalid token"});
    }

}