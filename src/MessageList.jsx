import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
    <main className="messages">
      {this.props.messages.map(message => {
        //TODO: will have to write a conditional statement here that returns different kind of message if it's a system message
        return <Message username={message.username} content={message.content} key={message.id}/>
      })}
    </main>
    )
  }
}

export default MessageList;