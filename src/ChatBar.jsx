import React, {Component} from 'react';

class ChatBar extends Component {

  render() {
   console.log("Rendering <ChatBar/>")
    return (
      <footer className="chatbar">
        <input
        className="chatbar-username"
        defaultValue={this.props.currentUser.name}
        placeholder="Your Name (Optional)"
        onKeyDown={(event) => {
          if(event.key === 'Enter') {
            this.props.onUserNameChange(event.target.value);
          }
          }
        }/>

        <input
        className="chatbar-message"
        placeholder="Type a message and hit ENTER"
        type="text"
        onKeyDown={(event) => {
          if(event.key === 'Enter') {
            this.props.onPost(event.target.value);
            event.target.value = "";
          }
        }
        }/>
      </footer>
    );
  }
}

export default ChatBar;


