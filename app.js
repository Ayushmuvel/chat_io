const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

//system variables
dotenv.config()
const express_port = process.env.Express_Port;

// addind express
const app = express();
const server = http.createServer(app);
const io = socketio(server);

//defining static files
app.use(express.static('v1/public'));

//adding middleware cors
app.use(cors());

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);

const users = []

// socket io connection
io.on('connection', socket => {

    // wellcome message for all user
    socket.emit('message', { name: "Chat Bot.io", msg: 'welcome to chat io' });

    // broad cast when a user join the chat room
    socket.on('new_user', (data) => {
        // console.log(socket.id + "  " + data.name)
        socket.join(data.group)
        users[socket.id] = {
            name: data.name,
            group: data.group
        }
        socket.broadcast.to(users[socket.id].group).emit('message', { name: data.name, msg: 'has joined the chat' });
    })

    //send recieved message
    socket.on('msg-send', (msg) => {
        if (socket.id in users) {
            let name = users[socket.id].name
            socket.broadcast.to(users[socket.id].group).emit('msg', { name: name, msg: msg })
        }
    })

    // broadcast when a user disconnect
    socket.on('disconnect', () => {
        if (socket.id in users) {
            let name = users[socket.id].name
            io.emit('message', { name: name, msg: 'A user has left the chat room' })
        }
    })
});

// calling routes filesystem
const start_chat = require('./v1/routes/chat_route')

// redirecting routes
app.use('/start_chat', start_chat)

// / end point
app.get('/', (req, res) => {
    res.render('./v1/public/html/login_page.html')
})

// defining ports
server.listen(express_port, () => {
    console.log('server start at port ' + express_port)
})