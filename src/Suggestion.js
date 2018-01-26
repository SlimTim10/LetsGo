import React, { Component } from 'react';
import Status from './Status';

class Suggestion extends Component {
  constructor(props) {
    super(props);

    this.handleButton = this.handleButton.bind(this);
    this.submitSuggestion = this.submitSuggestion.bind(this);
  }

  submitSuggestion() {
    const me = this.props.user;
    me.status = Status.going;
    
    const newMessage = {
      id: 4,
      date: "Jan 26 2:46 PM",
      content: "Tim suggests gym on Sat Jan 27 at 11:00 AM",
      people: [ me ]
    };
    this.props.sendNewMessage(newMessage);
  }

  handleButton() {
    this.submitSuggestion();
  }
  
  render() {
    return (
      <section className="suggestion">
        <button className="btn-suggestion" onClick={this.handleButton}>New suggestion</button>
      </section>
    );
  }
}

export default Suggestion;
