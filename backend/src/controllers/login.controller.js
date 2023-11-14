import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try{
        const {user_mail, user_password} = req.body;
        if(!user_mail || !user_password) return res.status(401).json("Email inválido.");
        const user = await User.findOne({where: {user_mail}});
        if(!user) return res.status(401).json({error: "usuário não encontrado."});
        const comparePass = await bcrypt.compare(user_password, user.user_password);
        if(!comparePass) return res.status(401).json({error: "senha incorreta!"});
        const token = jwt.sign(
            {userID: user.id, userMail: user.user_mail}, 
            process.env.AUTHERTOKEN, {expiresIn: 200}
        );
        res.status(200).json({token: token});
    }catch(err){
        console.error(err);
        res.status(500).json({error: "tentariva de login inválida."});
    }
};