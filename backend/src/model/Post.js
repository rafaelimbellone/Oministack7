
const mongoose = require('mongoose');

// representação de tabela no banco de dados
const PostSchema = new mongoose.Schema({
     author: String,
     place: String,
     description: String,
     image: String,
     hashtags: String,
     likes:{
         type:Number,
         default: 0,
     }

}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', PostSchema);