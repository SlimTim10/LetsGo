import React, { Component } from 'react';
import moment from 'moment';

import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import Status from './Status';

import './Suggestion.css';

class Suggestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      makingSuggestion: false,
      value: '',
      date: null,
      time: null
    };
  }

  createSuggestionButton = () => {
    if (!this.state.makingSuggestion) {
      return <button className="btn-suggestion" onClick={this.handleSuggestionButton}>New suggestion</button>;
    } else {
      return null;
    }
  };

  createSuggestionInput = () => {
    if (this.state.makingSuggestion) {
      const name = this.props.user.name;
      const errorMessage = this.renderErrorMessage();
      
      return (
        <div>
          <p>{name} suggests <input type="text" value={this.state.value} onChange={this.handleValueChange} /></p>
          <DatePicker
            value={this.state.date}
            onChange={this.handleDateChange}
            />
          <TimePicker
            value={this.state.time}
            onChange={this.handleTimeChange}
            />
          {this.state.hasError && errorMessage}
          <button className="btn-submit-suggestion" onClick={this.handleSubmitButton}>Submit</button>
          <button className="btn-cancel-suggestion" onClick={this.handleCancelButton}>Cancel</button>
        </div>
      );
    } else {
      return null;
    }
  }

  handleValueChange = event => {
    this.setState({ value: event.target.value });
  };

  handleDateChange = event => {
    this.setState({ date: event.target.value });
  };

  handleTimeChange = event => {
    this.setState({ time: event.target.value });
  };

  handleSuggestionButton = () => {
    this.setState({ makingSuggestion: true });
  };

  handleSubmitButton = () => {
    this.submitSuggestion();
  };

  handleCancelButton = () => {
    this.setState({ makingSuggestion: false });
    this.setState({ hasError: false });
  };

  submitSuggestion = () => {
    const me = this.props.user;

    const suggestion = this.state.value;

    if (!suggestion || !this.state.date || !this.state.time) {
      this.setState({ hasError: true });
      return;
    } else {
      this.setState({ hasError: false });
    }
    
    const datePick = moment(this.state.date).startOf('hour');
    const timePick = moment(this.state.time, "HH:mm");
    const eventDate = combineDateTime(datePick, timePick);

    const message = {
      date: moment(),
      content: {
        user: me,
        event: suggestion,
        date: eventDate
      },
      people: [
        { user: me, status: Status.going }
      ]
    };
    
    this.props.newMessage(message);

    this.setState({ makingSuggestion: false });
  };

  renderErrorMessage = () => {
    if (this.state.hasError) {
      return <p className="error">Oops! I didn't get that.</p>;
    } else {
      return null;
    }
  };

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

const combineDateTime = (mdate, mtime) => {
  return mdate.add({
    hours: mtime.hours(),
    minutes: mtime.minutes()
  });
};
