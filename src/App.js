import React, { Component } from 'react';
import Navbar from './Navbar';
import Messages from './Messages';
import Suggestion from './Suggestion';
import Status from './Status';
import './App.css';

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

    const message1 = {
      id: 1,
      date: new Date('May 20, 2017 18:00:00'),
      content: {
        user: Users[3],
        event: 'party at my house',
        date: new Date('May 27, 2017 19:00:00')
      },
      people: [
        { user: Users[1], status: Status.going },
        { user: Users[2], status: Status.going },
      ]
    };
    const message2 = {
      id: 2,
      date: new Date('May 21, 2017 22:57:00'),
      content: {
        user: Users[0],
        event: 'gym',
        date: new Date('May 24, 2017 18:30:00')
      },
      people: [
        { user: Users[3], status: Status.going },
        { user: Users[1], status: Status.notGoing },
        { user: Users[4], status: Status.going },
        { user: Users[2], status: Status.notGoing },
      ]
    };
    
    this.state = {
      currentUser: Users[0],
      messages: [message1, message2]
    };

    this.sendNewMessage = this.sendNewMessage.bind(this);
  }

  sendNewMessage(newMessage) {
    const messages = this.state.messages.concat(newMessage);
    this.setState({ messages: messages });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {
        id: 3,
        date: new Date('January 24, 2018 12:13:00'),
        content: {
          user: Users[1],
          event: 'hang out',
          date: new Date('Jan 25, 2018 10:00:00')
        },
        people: [
          { user: Users[4], status: Status.notGoing },
          { user: Users[3], status: Status.going },
        ]
      };
      this.sendNewMessage(newMessage);
    }, 3000);
  }
  
  render() {
    return (
      <div className="App">
        <Navbar username={this.state.currentUser.name} />
        <Messages messages={this.state.messages} user={this.state.currentUser} />
        <Suggestion user={this.state.currentUser} sendNewMessage={this.sendNewMessage} />
      </div>
    );
  }
}

export default App;
