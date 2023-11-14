import Post from "../models/post.js";
import User from "../models/user.js";

export const createPost = async (req, res) => {
    try {
        const {
            post_title,
            post_description,
            post_imgURL,
            post_userID
        } = req.body;
        const post = await Post.create({
            post_title,
            post_description,
            post_imgURL,
            post_userID
        });
        const user = await User.findByPk(post_userID);
        if(!user){
            return res.status(404).json({
                error: "usuário não existe."
            });
        }
        await post.setClient(user);
        
        res.status(200).json(post);
    }catch(err){
        console.error(err);
        res.status(500).json({error: "erro ao tentar criar post."});
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        if(!posts) return res.status(401).json({error: "Posts não encontrados."});
        res.status(200).json(posts);
    }catch(err){
        console.error(err);
        res.status(500).json({error: "erro eo tentar obter os posts"});
    }
};