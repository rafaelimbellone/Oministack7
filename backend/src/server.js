const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const routes    = require('./routes');
const path      = require('path');

//criar a aplicação
const app = express();
// server tem acesso ao protocolo http
const server = require('http').Server(app);
// tem acesso ao protocollo  websocket.
const io     = require('socket.io')(server);


//servidor reconhecer as requisiçoes JSON.
app.use(express.json());


//conexao com o banco de dados.
mongoose.connect('mongodb+srv://oministack8:rafael321@cluster0-5qcu3.mongodb.net/oministack7?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//permite que todas as rotas abaixo tenha acesso ao req.io
app.use((req, res, next) => {
    req.io = io;
    next();
})

// habilta acesso externo a aplicação (mongoose Atlas, frontEnd e Molile)
app.use(cors());
//criando uma rota estatica para exibir as fotos no browser
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
//servidor buscar as rotas.
app.use(routes);
// porta de acesso
server.listen(1333);
