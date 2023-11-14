import User from "../models/user.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    try {
        const {
            full_name,
            user_name,
            user_mail,
            user_password,
            user_gender
        } = req.body;
        const saltRounds = 10; 
        const hashPass = await bcrypt.hash(
            user_password, saltRounds
        );
        const user = await User.create({
            full_name,
            user_name,
            user_mail,
            user_password: hashPass,
            user_gender
        });
        res.status(200).json(user);
    }catch(err){
        console.error(err);
        res.status(500).json({
            error: "Erro ao tentar criar usuário."
        });
    }
};
