import React, { Component } from 'react';

const Status = Object.freeze({
  going: Symbol("going"),
  notGoing: Symbol("not going")
});

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

export default Message;
