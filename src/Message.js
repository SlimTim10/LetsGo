import React, { Component } from 'react';
import Status from './Status';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      people: this.props.data.people
    };
    
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton(status) {
    const me = this.props.user;

    switch () {
    case _:
      me.status = Status.going;
      break;
    case _:
      me.status = Status.notGoing;
      break;
    }

    const newPeople = this.state.people.concat(me);
    this.setState({
      people: newPeople
    });
    console.log("handleButton", status, this.props.data.id);
  }
  
  render() {
    const data = this.props.data;
    const people = this.state.people.map(p => {
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
          <button className="btn btn-plus" onClick={this.handleButton.bind(this, Status.going)}>+</button>
          <button className="btn btn-minus" onClick={this.handleButton.bind(this, Status.notGoing)}>-</button>
        </div>
      </div>
    );
  }
}

export default Message;
