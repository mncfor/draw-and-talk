const { json } = require('express');
const express = require('express');
const app = express();
const WSserver = require('express-ws')(app);
const aWss = WSserver.getWss();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


let users = [];

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {

        msg = JSON.parse(msg);
        switch (msg.method){
            case 'connection':
                ws.session = msg.session
                ws.uid = msg.uid
                ws.uname = msg.uname
                connectionHandler(ws, msg)
                break
            case 'message':
            case 'pushToUndo':
            case 'redo':
            case 'undo':
            case 'clear':
                messageHandler(ws, msg)
                break
            case 'draw':
                drawHandler(ws, msg)
                break
        }
    })

    ws.on('close', () => {
        disconnectHandler(ws)
    })
})

app.listen(PORT, () => console.log(`server is started on ${PORT}`));

function connectionHandler(ws, msg){
    users.push({
        session: msg.session,
        uid: msg.uid,
        uname: msg.uname
    })
    msg.users = users.filter(user => user.session === msg.session);
    broadcastConnection(ws, msg);
}

function disconnectHandler(ws){
    const disconnected = users.splice(users.findIndex(user => user.uid === ws.uid), 1)
    const filteredUsers = users
                    .filter(user => user.session === ws.session)
                    .filter(user => user.uid !== ws.uid)

    aWss.clients.forEach(client => {
        if(client.session === ws.session){    
            client.send(JSON.stringify({
                method: 'disconnect',
                disconnected: disconnected,
                users: filteredUsers
            }))
        }
    })
}

function messageHandler(ws, msg){
    msg.time = Date.now();
    broadcastConnection(ws, msg);
}

function drawHandler(ws, msg){
    broadcastConnection(ws, msg);
}

function broadcastConnection(ws, msg){
    aWss.clients.forEach(client => {
        if(client.session === msg.session){
            client.send(JSON.stringify(msg));
        }
    })
}