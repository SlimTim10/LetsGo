import React, { Component } from 'react';
import Navbar from './Navbar';
import Messages from './Messages';
import Status from './Status';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const message1 = {
      id: 1,
      date: "May 20 6:00 PM",
      content: "Bob suggests party at my house on Sat May 27 at 7:00 PM - 10:00 PM",
      people: [
        { id: 1, name: "Fred", status: Status.going },
        { id: 2, name: "Mary", status: Status.going },
      ]
    };
    const message2 = {
      id: 2,
      date: "May 21 10:57 PM",
      content: "Tim suggests gym on Wed May 24 at 6:30 PM",
      people: [
        { id: 3, name: "Bob", status: Status.going },
        { id: 4, name: "Alice", status: Status.going },
        { id: 1, name: "Fred", status: Status.notGoing },
        { id: 2, name: "Mary", status: Status.notGoing },
      ]
    };
    
    this.state = {
      currentUser: {name: "Tim"},
      messages: [message1, message2]
    };
  }
  
  render() {
    return (
      <div className="App">
        <Navbar username={this.state.currentUser.name} />
        <Messages messages={this.state.messages} />
      </div>
    );
  }
}

export default App;
