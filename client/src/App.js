import React, { Component } from 'react';

import Navbar from './Navbar';
import Messages from './Messages';
import Suggestion from './Suggestion';
import './App.css';

const SERVER_PORT = 3001;

const Users = [
  {id: 0, name: "Tim"},
  {id: 1, name: 'Fred'},
  {id: 2, name: 'Mary'},
  {id: 3, name: "Bob"},
  {id: 4, name: "Alice"},
];

class App extends Component {
  constructor(props) {
    super(props);

    this.socket = null;

    this.state = {
      currentUser: Users[0],
      messages: []
    };

    this.sendData = this.sendData.bind(this);

    this.sendNewMessage = this.sendNewMessage.bind(this);
    this.sendUpdateMessage = this.sendUpdateMessage.bind(this);
    this.sendDeleteMessage = this.sendDeleteMessage.bind(this);
    
    this.newMessage = this.newMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  sendData(type, message) {
    this.socket.send(JSON.stringify({
      type: type,
      message: message
    }));
  }

  sendNewMessage(newMessage) {
    this.sendData('new', newMessage);
  }

  sendUpdateMessage(message) {
    this.sendData('update', message);
  }

  sendDeleteMessage(message) {
    this.sendData('delete', message);
  }

  newMessage(message) {
    const messages = this.state.messages.concat(message);
    this.setState({ messages: messages });
  }

  updateMessage(message) {
    const messages = this.state.messages;
    const i = messages.findIndex(m => m.id === message.id);
    messages[i] = message;
    this.setState({ messages: messages });
  }

  deleteMessage(message) {
    const messages = this.state.messages.filter(m => m.id !== message.id);
    this.setState({ messages: messages });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    
    this.socket = new WebSocket(`ws://localhost:${SERVER_PORT}`);
    
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    };

    this.socket.onmessage = (event) => {
      console.log('Message received', event);
      if (!event.isTrusted) return;
      const msg = JSON.parse(event.data);

      switch (msg.type) {
      case 'new':
        this.newMessage(msg.message);
        break;
      case 'update':
        this.updateMessage(msg.message);
        break;
      case 'delete':
        this.deleteMessage(msg.message);
        break;
      default:
        break;
      }
    };
  }
  
  render() {
    return (
      <div className="App">
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

export default App;
