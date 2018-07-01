const express = require('express')
const path = require('path')
const socketIO = require('socket.io')
const PORT = process.env.PORT || 5000
var chall = require('../ChallengeModule/challenge_module')

CountPresses = () => {

    NumPresses = 0;
    NumDataPresses = 0;
    //counter function
    onPress = (data) => {

        this.NumPresses++;
        this.NumDataPresses += data;

    }

     const server = express()
        .use(express.static(path.join(__dirname, '../client')))
        .set('views', path.join(__dirname, '../client'))
        .set('view engine', 'ejs')
        .get('/', (req, res) => res.render('index_ex', { challenge_name: chall.load_challenge() }))
        .listen(PORT, () => console.log(`Listening on ${PORT}`))

    //Web Socket
    const io = socketIO(server);

    //log connection and disconnection
    io.on('connection', (socket) => {
        console.log('Client connected');
        socket.on('press', onPress );
        socket.on('disconnect', () => console.log('Client disconnected'));
    });

    //regularly send data
    setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

    //button presses
    setInterval(() => io.emit('presses', '100'/*this.  NumPresses*/), 1000);

} 

CountPresses();
 