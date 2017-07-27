import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
    <main className="messages">
      {this.props.messages.map((message) => {
        //write a conditional statement here that returns diffe kind of msg if it's a system message
        return <Message username={message.username} content={message.content} key={message.id}/>
      })}

      <div className="message system">
        <span>{this.props.notification}</span>
      </div>
    </main>
    )
  }
}

export default MessageList;