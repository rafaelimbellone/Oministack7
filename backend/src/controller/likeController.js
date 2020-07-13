
const express = require('express');
const Post = require('../model/Post');


module.exports = {

    async store(req, res){
        // pega o post atraves do id.
        const post = await Post.findById(req.params.id);

        post.likes += 1;
       //salva o post
       await post.save();

       //faz em tempo real q todos usuarios logados recebam o like
       req.io.emit('like', post);
       //retorna o post atualizado.       
       return res.json(post);
    }


};