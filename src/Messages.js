import React, { Component } from 'react';
import Message from './Message';

class Messages extends Component {
  render() {
    const messages = this.props.messages.map(m => {
      return <Message key={m.id} data={m} />;
    });
    
    return (
      <main className="messages">
        {messages}
      </main>
    );
  }
}

export default Messages;
