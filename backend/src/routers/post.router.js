import express from "express";
import {createPost, getAllPosts,
    updatePost, deletePost} from "../controllers/post.controller.js";

const router  = express.Router();

router.post("/posts", createPost);
router.get("/posts", getAllPosts);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;
