

const Post    = require('../model/Post');
const sharp   = require('sharp');
const path = require('path');// biblioteca do proprio node.
const fs      = require('fs');// biblioteca do proprio node.


module.exports = {

    //lista todos os post por ordem de criação mais recentes.
    async index(req, res){
        const posts = await Post.find().sort('-createdAt');
        return res.json(posts);                
    },
    // cria um post no banco de dados
    async store(req, res){
       
       const { author, place, description, hashtags} = req.body;
       const { filename: image} = req.file;

       /* busca no mongoose se post ja existe
       const postExist = await Post.findOne({image: image});
       //se post ja existe ele retorna o post senao cria um novo
       //if(postExist) return res.json(postExist);
       */

       //pegando o nome da imagem e alterando a extensão para jpg
       const [name] = image.split('.');
       const fileName = `${name}.jpg`;

       //redimensiona a foto e salva em outra pasta  
       await sharp(req.file.path)
             .resize(500)
             .jpeg({ quality: 90})
             .toFile(
                 path.resolve(req.file.destination, 'resized', fileName)
             )
        //apaga a imagem q não foi redimensinada.
        fs.unlinkSync(req.file.path);
       //salva os dados do post no banco de dados
       const post = await Post.create({
           author,
           place,
           description,
           hashtags,
           image: fileName,
       });
       //faz em tempo real q todos usuarios logados recebam o novo post
       req.io.emit('post', post);

       return res.json(post);
    }


};