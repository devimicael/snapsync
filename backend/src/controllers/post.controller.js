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

export const updatePost = async(req, res) => {
    try {
        const {id} = req.params;
        const {
            post_title,
            post_description,
            post_imgURL
        } = req.body;

        const post = await Post.findByPk(id);
        if(!post) return res.status(404).json({error: "Post não encontrado."});

        post.post_title = post_title || post.post_title;
        post.post_description = post_description || post.post_description;
        post.post_imgURL = post_imgURL || post.post_imgURL;

        await post.save();
        res.status(200).json(post);
    }catch(err){
        console.error(err);
        res.status(500).json({error: "Erro ao atualizar o post."});
    }
};

export const deletePost = async(req, res) => {
    try {
        const {id} = req.params;
        const post = await Post.findByPk(id);
        if(!post) return res.status(404).json({error: "Post não encontrado"});
        await post.destroy();
        res.status(204).end();
    }catch(err){
        console.error(err);
        res.status(500).json({error: "Erro ao tentar excluir post."});
    }
};