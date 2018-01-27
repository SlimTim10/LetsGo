import React, { Component } from 'react';
import Navbar from './Navbar';
import Messages from './Messages';
import Suggestion from './Suggestion';
import Status from './Status';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const message1 = {
      id: 1,
      date: new Date('May 20, 2017 18:00:00'),
      content: "Bob suggests party at my house on Sat May 27 at 7:00 PM - 10:00 PM",
      people: [
        { id: 1, name: "Fred", status: Status.going },
        { id: 2, name: "Mary", status: Status.going },
      ]
    };
    const message2 = {
      id: 2,
      date: new Date('May 21, 2017 22:57:00'),
      content: "Tim suggests gym on Wed May 24 at 6:30 PM",
      people: [
        { id: 3, name: "Bob", status: Status.going },
        { id: 1, name: "Fred", status: Status.notGoing },
        { id: 4, name: "Alice", status: Status.going },
        { id: 2, name: "Mary", status: Status.notGoing },
      ]
    };
    
    this.state = {
      currentUser: {
        id: 0,
        name: "Tim"
      },
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
        content: "Fred suggests event on Thu Jan 25 at 10:00 AM",
        people: [
          { id: 4, name: "Alice", status: Status.notGoing },
          { id: 3, name: "Bob", status: Status.going },
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
