
const express          = require('express');
const PostController   = require('./controller/PostController');
const multer           = require('multer');
const uploadConfig     = require('./config/upload');
const LikeController   = require('./controller/likeController');

const routes = new express.Router();
//multer permite q o express entenda o corpo da requisição Multipart
const upload = multer(uploadConfig);
// rota para listar todos os posts
routes.get('/posts',PostController.index);
//rota para criar um post
routes.post('/posts', upload.single('image'), PostController.store);
// rota para criar um like em um post.
routes.post('/posts/:id/likes', LikeController.store);

module.exports = routes;