import React, { Component } from 'react';
import Status from './Status';

function peopleGoing(people) {
  return people
    .filter(p => p.status === Status.going)
    .map(p => {
      return <div key={p.id} className="person going">{p.name}</div>;
    });
}

function peopleNotGoing(people) {
  return people
    .filter(p => p.status === Status.notGoing)
    .map(p => {
      return <div key={p.id} className="person not-going">{p.name}</div>;
    });
}

function addPerson(people, person) {
  return people.concat(person);
}

function removePersonById(people, id) {
  return people.filter(p => p.id !== id);
}

function createButtonPlus(status, onclick) {
  if (status !== Status.going) {
    return <button className="btn btn-plus" onClick={onclick.bind(this, Status.going)}>+</button>;
  } else {
    return null;
  }
}

function createButtonMinus(status, onclick) {
  if (status !== Status.notGoing) {
    return <button className="btn btn-minus" onClick={onclick.bind(this, Status.notGoing)}>-</button>;
  } else {
    return null;
  }
}

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
    me.status = status;

    const people = removePersonById(this.state.people, me.id);
    
    this.setState({
      people: addPerson(people, me),
      myStatus: status
    });
  }
  
  render() {
    const data = this.props.data;
    const people = this.state.people;

    const buttonPlus = createButtonPlus(this.state.myStatus, this.handleButton);
    const buttonMinus = createButtonMinus(this.state.myStatus, this.handleButton);
    
    return (
      <div className="message">
        <div className="message-date">{data.date}</div>
        <div className="message-content">{data.content}</div>
        <div className="message-people">
          {peopleGoing(people)}{peopleNotGoing(people)}
        </div>
        <div className="message-controls">
          {buttonPlus}{buttonMinus}
        </div>
      </div>
    );
  }
}

export default Message;
