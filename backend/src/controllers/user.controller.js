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

export const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll();
        if(!users) return res.status(401).json({error: "Usuários não encontrados."});
        res.status(200).json(users);
    }catch(err){
        console.error(err);
        res.status(500).json({error: "erro ao tentar listar usuários."});
    }
};

export const updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {
            full_name,
            user_name,
            user_mail,
            user_password,
            user_gender
        } = req.body;
        const user = await User.findByPk(id);
        if(!user) return res.status(404).json({error: "usuário não foi encontrado."});
        user.full_name = full_name || user.full_nama;
        user.user_name = user_name || user.user_name;
        user.user_mail = user_mail || user.user_mail;
        user.user_password = user_password || user.user_password;
        user.user_gender = user_gender || user.user_gender;
        await user.save();
        res.status(200).json(user);
    }catch(err){
        console.error(err);
        res.status(500).json({error: "erro ao tentar atualizar usuário."});
    }
};

export const deleteUser = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByPk(id);
        if(!user) return res.status(404).json({error: "Usuário não encontrado"});
        await user.destroy();
        res.status(204).end();
    }catch(err){
        console.error(err);
        res.status(500).json({error: "Erro ao tentar excluir usuário."});
    }
};