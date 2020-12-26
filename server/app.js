var express = require('express');
const mysql = require('mysql');
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require('body-parser');

var app = express();

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

let interval;

const connection = mysql.createConnection({
  host:'localhost',
  user:'bento',
  password:'bojangles',
  database:'trivia_game'
});

const SQLPORT = process.env.SQLPORT || 3002;
const WSPORT = process.env.SQLPORT || 3003;

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

module.exports = app;

connection.connect(function(err){
	(err)?console.log(err+'++++++++++++++//////////'):
	console.log('connected###########');
});

require('./routes/html-routes')(app, connection, io);

app.listen(SQLPORT, () => {
  console.log(`app running on port ${SQLPORT}`);
});

var users = [];

io.on("connection", (socket) => {

  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");

    console.log("deleting user: "+(socket.user && socket.user.userName));
    users.pop(socket.user);
    socket.broadcast.emit("getCurUsers", users);
  });

  socket.on("submit_answer", (answer)=>{
    answer.userName = socket.user && socket.user.userName;
    socket.broadcast.emit("submit_answer", answer);
    console.log(answer);
  });

  socket.on("addUser", (user) => {
    const matchUser = users.find((u)=>{return u.userName ==user.userName});
    console.log(matchUser);
    if(!matchUser){
      socket.user = user
      users.push(user);
      console.log("new user added: "+user.userName);
      console.log("cur user count: " + users.length)
      socket.broadcast.emit("getCurUsers", users);
    }else{
      console.log("user found, not adding");
    }
  });

  socket.on("get_question", (q) =>{
    socket.broadcast.emit("get_question", q);
  });
});

server.listen(WSPORT, () => console.log(`Listening on port ${WSPORT}`));