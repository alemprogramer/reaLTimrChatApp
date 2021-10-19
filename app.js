const express = require('express')
const app = express();
const http = require('http');

const htttpServer = http.createServer(app);
app.use(express.static('./public'))

app.get('/',(req, res) => {
    // res.send('!ok')
    res.sendFile('./index.html')
})
console.log('here');
const io = require('socket.io')(htttpServer)

io.on('connection',(socket)=> {
    console.log('connection established');
    

    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })


    socket.on('disconnect',()=> console.log('disconnect') )
})


htttpServer.listen(3000,()=>{
    console.log(`server is running on port  3000`);
})