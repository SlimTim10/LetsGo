import React, { Component } from 'react';
import './App.css';

const Status = Object.freeze({
  going: Symbol("going"),
  notGoing: Symbol("not going")
});

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <span className="navbar-user">{this.props.username}</span>
        <a href="/" className="navbar-brand">Let&apos;s Go</a>
      </nav>
    );
  }
}

class Messages extends Component {
  render() {
    const messages = this.props.messages.map(m => {
      return <Message key={m.id} data={m} />;
    });
    
    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}

class Message extends Component {
  render() {
    const data = this.props.data;
    const people = data.people.map(p => {
      switch (p.status) {
      case Status.going:
        return <div key={p.id} className="person going">{p.name}</div>;
      case Status.notGoing:
        return <div key={p.id} className="person not-going">{p.name}</div>;
      default:
        console.error("Invalid status");
        break;
      };
      return undefined;
    });
    
    return (
      <div className="message">
        <div className="message-date">{data.date}</div>
        <div className="message-content">{data.content}</div>
        <div className="message-people">
          {people}
        </div>
        <div className="message-controls">
          <button className="btn btn-plus">+</button>
          <button className="btn btn-minus">-</button>
        </div>
      </div>
    );
  }
}

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
