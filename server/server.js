const express = require('express');
const WebSocket = require('ws');
const uuid = require('uuid/v4');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (msg) => {
    console.log('received: %s', msg);

    const data = JSON.parse(msg);

    switch (data.type) {
    case 'new':
      data.message.id = uuid();
      broadcastAll(data);
      break;
    case 'update':
      broadcastAll(data);
      break;
    case 'delete':
      broadcastAll(data);
      break;
    default:
      break;
    }
  });

  ws.on('close', () => console.log('Client disconnected'));
});

const broadcastAll = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};
