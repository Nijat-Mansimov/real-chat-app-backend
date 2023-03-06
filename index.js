const express = require('express');
const cors  = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

app.set('port', process.env.PORT || 3001);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://madmandev.onrender.com",
        methods: ["GET", "POST"]
      }
});

io.on('connection', (socket)=>{

    socket.on("join_qrup", (qrup)=>{
        socket.join(qrup)
    })

    socket.on('backende_mesaj',(data)=>{
        socket.to(data.qrup).emit("frontende_mesaj", data)
    })
})

server.listen(port, ()=>{
    console.log("Server is running on port: 3001");
})
