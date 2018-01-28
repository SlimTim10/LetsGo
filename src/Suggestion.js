import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
import Status from './Status';

class Suggestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      makingSuggestion: false,
      value: '',
      date: null,
      time: null
    };

    this.createSuggestionButton = this.createSuggestionButton.bind(this);
    this.createSuggestionInput = this.createSuggestionInput.bind(this);

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    
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

  createSuggestionInput() {
    if (this.state.makingSuggestion) {
      const name = this.props.user.name;
      return (
        <div>
          <p>{name} suggests <input type="text" value={this.state.value} onChange={this.handleValueChange} /></p>
          <MuiThemeProvider>
            <DatePicker
              hintText="Date"
              value={this.state.date}
              onChange={this.handleDateChange}
              firstDayOfWeek={0}
              />
          </MuiThemeProvider>
          <MuiThemeProvider>
            <TimePicker
              hintText="Time"
              value={this.state.time}
              onChange={this.handleTimeChange}
              />
          </MuiThemeProvider>
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

  handleDateChange(event, date) {
    this.setState({ date: date });
  }

  handleTimeChange(event, date) {
    this.setState({ time: date });
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
    
    const datePick = moment(this.state.date).startOf('hour');
    const timePick = moment(this.state.time);
    const eventDate = combineDateTime(datePick, timePick);

    const newMessage = {
      id: 4,
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

function combineDateTime(mdate, mtime) {
  return mdate.add({
    hours: mtime.hours(),
    minutes: mtime.minutes()
  });
}
