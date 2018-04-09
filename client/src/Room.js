import * as R from 'ramda';

import React, { Component } from 'react';

import Navbar from './Navbar';
import Messages from './Messages';
import Suggestion from './Suggestion';

import './Room.css';

const MSG = Object.freeze({
  new: 'new',
  update: 'update',
  delete: 'delete'
});

const SERVER_PORT = 3001;

const Users = [
  {id: 0, name: 'Tim'},
  {id: 1, name: 'Fred'},
  {id: 2, name: 'Mary'},
  {id: 3, name: 'Bob'},
  {id: 4, name: 'Alice'},
];

class Room extends Component {
  constructor(props) {
    super(props);

    this.socket = null;

    this.state = {
      currentUser: Users[0],
      messages: []
    };
  }

  sendData = type => message => {
    this.socket.send(JSON.stringify({
      type: type,
      message: message
    }));
  };

  sendNewMessage = this.sendData(MSG.new);

  sendUpdateMessage = this.sendData(MSG.update);

  sendDeleteMessage = this.sendData(MSG.delete);

  newMessage = message => {
    const messages = R.append(message, this.state.messages);
    this.setState({ messages: messages });
  };

  updateMessage = message => {
    const messages = this.state.messages;
    const i = R.findIndex(R.propEq('id', message.id))(messages);
    messages[i] = message;
    this.setState({ messages: messages });
  };

  deleteMessage = message => {
    const messages = R.filter(m => m.id !== message.id, this.state.messages);
    this.setState({ messages: messages });
  };

  componentDidMount() {
    this.socket = new WebSocket(`ws://localhost:${SERVER_PORT}`);
    
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    };

    this.socket.onmessage = (event) => {
      console.log('Message received', event);
      
      if (!event.isTrusted) return;
      
      const msg = JSON.parse(event.data);
      switch (msg.type) {
      case MSG.new:
        this.newMessage(msg.message);
        break;
      case MSG.update:
        this.updateMessage(msg.message);
        break;
      case MSG.delete:
        this.deleteMessage(msg.message);
        break;
      default:
        break;
      }
    };
  }
  
  render() {
    return (
      <div className="Room">
        <Navbar
          username={this.state.currentUser.name}
          />
        <Messages
          messages={this.state.messages}
          user={this.state.currentUser}
          deleteMessage={this.sendDeleteMessage}
          updateMessage={this.sendUpdateMessage}
          />
        <Suggestion
          user={this.state.currentUser}
          newMessage={this.sendNewMessage}
          />
      </div>
    );
  }
}

export default Room;
