import fs from "fs";
import { getAllPosts, createPost, updatePost } from "../models/postsModel.js";
import generateDescriptionGemini from "../services/geminiService.js";

export async function listPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function postNewPost(req, res){
    const newPost = req.body;
    try{
        const postCreated = await createPost(newPost);
        res.status(200).json(postCreated);
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"Error": "request failure"});
    }
}   

export async function uploadImage(req, res){
    const newPost = req.body;
    try{
        const postCreated = await createPost(newPost);
        const updatedImage = `uploads/${postCreated.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImage);
        res.status(200).json(postCreated);
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"Error": "request failure"});
    }
}   

export async function updateNewPost(req, res){
    const id = req.params.id;
    const imgUrl = `https://instabytes-api-66028862719.southamerica-east1.run.app/${id}.png`;
    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const description = await generateDescriptionGemini(imgBuffer);

        const post = {
            imageUrl: imgUrl,
            description: description,
            alt: req.body.alt
        }

        const postCreated = await updatePost(id, post);

        res.status(200).json(postCreated);
    }catch(erro){
        console.error(erro.message);
        res.status(500).json({"Error": "request failure"});
    }
}