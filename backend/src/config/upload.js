
const multer = require('multer');

const path = require('path');

// exporta um objeto com configuraçoes do multer qual tipo de staroge (salvar no disco)
module.exports = {
   storage: new multer.diskStorage({
       destination: path.resolve(__dirname, '..', '..', 'uploads'),
       filename: function(req, file, cb){
           cb(null, file.originalname);
       }
   })
};