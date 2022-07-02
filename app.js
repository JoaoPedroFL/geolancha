var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'hbs');
app.set('views', './views')

var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//////////////////
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/map', urlencodedParser, (req, res) => {
    res.render('map');
});
const PORT = process.env.PORT || 3000;
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(PORT);
var load = [];
io.on('connection', (socket) => {
    console.log(socket.id + "ta aqui");
    socket.on('Client_send_pos', (data) => {

        if(load.length == 0){
            load.push(data)
            console.log(load)
        }else {
            load.shift(data)
            console.log(load)
        }

        io.emit('send_load_pos', load);
        
    })
})