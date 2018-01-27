import React, { Component } from 'react';
import moment from 'moment';
import Status from './Status';

class Message extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      people: this.props.data.people,
      myStatus: Status.none
    };
    
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton(status) {
    const me = this.props.user;

    const people = removePersonById(this.state.people, me.id);
    
    this.setState({
      people: addPerson(people, {user: me, status: status}),
      myStatus: status
    });
  }
  
  render() {
    const data = this.props.data;
    const messageDate = moment(data.date).format("MMM D h:mmA");
    const messageContent = createMessageContent(data.content);
    const people = this.state.people;

    const buttonPlus = createButtonPlus(this.state.myStatus, this.handleButton);
    const buttonMinus = createButtonMinus(this.state.myStatus, this.handleButton);
    
    return (
      <div className="message">
        <div className="message-date">{messageDate}</div>
        {messageContent}
        <div className="message-people">
          <div className="people-going">{peopleGoing(people)}</div>
          <div className="people-not-going">{peopleNotGoing(people)}</div>
        </div>
        <div className="message-controls">
          {buttonPlus}{buttonMinus}
        </div>
      </div>
    );
  }
}

export default Message;

function peopleGoing(people) {
  return people
    .filter(p => p.status === Status.going)
    .map(p => {
      return <div key={p.user.id} className="person going">{p.user.name}</div>;
    });
}

function peopleNotGoing(people) {
  return people
    .filter(p => p.status === Status.notGoing)
    .map(p => {
      return <div key={p.user.id} className="person not-going">{p.user.name}</div>;
    });
}

function addPerson(people, person) {
  return people.concat(person);
}

function removePersonById(people, id) {
  return people.filter(p => p.user.id !== id);
}

function createButtonPlus(status, onclick) {
  if (status !== Status.going) {
    return <button className="btn btn-plus" onClick={onclick.bind(this, Status.going)}>+</button>;
  } else {
    return <button className="btn btn-disabled">+</button>;
  }
}

function createButtonMinus(status, onclick) {
  if (status !== Status.notGoing) {
    return <button className="btn btn-minus" onClick={onclick.bind(this, Status.notGoing)}>-</button>;
  } else {
    return <button className="btn btn-disabled">-</button>;
  }
}

function createMessageContent(content) {
  const date = moment(content.date).format('ddd MMM D');
  const time = moment(content.date).format('h:mma');
  const user = <span className="message-content-user">{content.user.name}</span>;
  const event = <span className="message-content-event">{content.event}</span>;
  return <div className="message-content">{user} suggests {event} on {date} at {time}</div>;
}
