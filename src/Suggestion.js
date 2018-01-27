import React, { Component } from 'react';
import Status from './Status';

class Suggestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      makingSuggestion: false,
      value: ''
    };

    this.createSuggestionButton = this.createSuggestionButton.bind(this);
    this.createSuggestionInput = this.createSuggestionInput.bind(this);

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSuggestionButton = this.handleSuggestionButton.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
    this.handleCancelButton = this.handleCancelButton.bind(this);
    
    this.submitSuggestion = this.submitSuggestion.bind(this);
  }

  createSuggestionButton() {
    if (!this.state.makingSuggestion) {
      return <button className="btn-suggestion" onClick={this.handleSuggestionButton}>New suggestion</button>;
    } else {
      return null;
    }
  }

  // TODO: Add date selector
  createSuggestionInput() {
    if (this.state.makingSuggestion) {
      const name = this.props.user.name;
      return (
        <div>
          <p>{name} suggests <input type="text" value={this.state.value} onChange={this.handleValueChange} /></p>
          <button className="btn-submit-suggestion" onClick={this.handleSubmitButton}>Submit</button>
          <button className="btn-cancel-suggestion" onClick={this.handleCancelButton}>Cancel</button>
        </div>
      );
    } else {
      return null;
    }
  }

  handleValueChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSuggestionButton() {
    this.setState({ makingSuggestion: true });
  }

  handleSubmitButton() {
    this.setState({ makingSuggestion: false });
    this.submitSuggestion();
  }

  handleCancelButton() {
    this.setState({ makingSuggestion: false });
  }

  submitSuggestion() {
    const me = this.props.user;

    const suggestion = this.state.value;
    const eventDate = new Date('Jan 27, 2018 11:00:00'); // TODO: Use value from date selector
    
    const newMessage = {
      id: 4,
      date: new Date(),
      content: {
        user: me,
        event: suggestion,
        date: eventDate
      },
      people: [
        { user: me, status: Status.going }
      ]
    };
    this.props.sendNewMessage(newMessage);
  }

  render() {
    const suggestionButton = this.createSuggestionButton();
    const suggestionInput = this.createSuggestionInput();
    
    return (
      <section className="suggestion">
        {suggestionButton}
        {suggestionInput}
      </section>
    );
  }
}

export default Suggestion;
