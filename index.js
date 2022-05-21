const express = require('express');

const path = require('path');

const app = express();

const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.use(express.static(path.join(__dirname, './public')));

io.on('connection', (socket) => {
  socket.on('chat message', (data) => {
    io.emit('chat message', {
      message: data.message,
      name: data.name,
    });
  });
});

http.listen(3000, () => {
  console.log('Server started');
});
