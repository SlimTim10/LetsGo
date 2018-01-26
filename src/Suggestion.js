import React, { Component } from 'react';

class Suggestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };

    this.handleButton = this.handleButton.bind(this);
  }

  handleButton() {
    
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
