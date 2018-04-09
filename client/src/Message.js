import * as R from 'ramda';

import React, { Component } from 'react';
import moment from 'moment';

import Status from './Status';

import './Message.css';

class Message extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      myStatus: Status.none
    };
  }

  handleButton = status => {
    const me = this.props.user;

    const message = this.props.data;
    const people = removePersonById(me.id)(message.people);
    const newPeople = addPerson({user: me, status: status})(people);

    message.people = newPeople;
    this.props.updateMessage(message);
  }

  handleDelete = status => {
    this.props.deleteMessage(this.props.data);
  }
  
  render() {
    const data = this.props.data;
    const messageDate = moment(data.date).format("MMM D h:mmA");
    const messageContent = createMessageContent(data.content);
    const people = data.people;

    const buttonDelete = createButtonDelete(this.handleDelete);
    const buttonPlus = createButtonPlus(this.handleButton)(this.state.myStatus);
    const buttonMinus = createButtonMinus(this.handleButton)(this.state.myStatus);
    
    return (
      <div className="message">
        <div className="message-date">{messageDate}</div>
        {messageContent}
        <div className="message-people">
          <div className="people-going">{peopleGoing(people)}</div>
          <div className="people-not-going">{peopleNotGoing(people)}</div>
        </div>
        <div className="message-controls">
          {buttonDelete}{buttonPlus}{buttonMinus}
        </div>
      </div>
    );
  }
}

export default Message;

const peopleGoing = R.compose(
  R.map(p => {
    return <div key={p.user.id} className="person going">{p.user.name}</div>;
  }),
  R.filter(R.propEq('status', Status.going))
);

const peopleNotGoing = R.compose(
  R.map(p => {
    return <div key={p.user.id} className="person not-going">{p.user.name}</div>;
  }),
  R.filter(R.propEq('status', Status.notGoing))
);

const addPerson = person => R.append(person);

const removePersonById = id => R.filter(R.pathEq(['user', 'id'], Status.going));

const createButtonDelete = onclick => {
  return <button className="btn btn-delete" onClick={onclick}>Delete</button>;
};

const createButtonPlus = onclick => status => {
  if (status !== Status.going) {
    return <button className="btn btn-plus" onClick={onclick.bind(this, Status.going)}>+</button>;
  } else {
    return <button className="btn btn-disabled">+</button>;
  }
};

const createButtonMinus = onclick => status => {
  if (status !== Status.notGoing) {
    return <button className="btn btn-minus" onClick={onclick.bind(this, Status.notGoing)}>-</button>;
  } else {
    return <button className="btn btn-disabled">-</button>;
  }
};

const createMessageContent = content => {
  const mDate = moment(content.date);
  const date = mDate.format('ddd MMM D');
  const time = mDate.format('h:mma');
  const user = <span className="message-content-user">{content.user.name}</span>;
  const event = <span className="message-content-event">{content.event}</span>;
  return <div className="message-content">{user} suggests {event} on {date} at {time}</div>;
};
