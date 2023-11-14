import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticate = async (req, res, next) => {
    const token = req.header("Authorization");
    if(!token) return res.status(401).json({error: "token de autorização não fornecido."});
    try {
        const tokenVerify = jwt.verify(token, process.env.AUTHERTOKEN);
        req.user_mail = tokenVerify;
        next();
    }catch(err){
        console.error(err);
        res.status(403).json({error: "Token inválido."});
    }
};