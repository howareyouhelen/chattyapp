/// (╯°□°）╯︵ ┻━┻

import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
const ws = new WebSocket("ws://0.0.0.0:3001");
window.ws = ws;

class App extends Component {
  componentDidMount() {
    console.log("componentDidMount <App />");
    //Create a new Websocket
    ws.onopen = function(event) {
      console.log("Connected to server!");
    };
    ws.onmessage = this.receivePost;
  }

  receivePost(event){
    const postwithId = JSON.parse(event.data);
    switch(postwithId.type) {
      case "incomingMessage":
        //handle incoming message
        const newPosts = this.state.posts.concat(postwithId);
        this.setState({posts: newPosts});
        break;
      case "incomingNotification":
        //handle incoming notification
        this.setState({notificationContent: postwithId.content})
        break;
      case "clientSize":
        console.log(postwithId.content);
        this.setState({clientSize: postwithId.content})
        break;
      default:
        //show an error in the console if message type is unknown
        throw new Error("Unkown event type" + postwithId.type);
    }

  }

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      posts: [],
      notificationContent: "",
      clientSize: ""
    };
    this.onNewPost = this.onNewPost.bind(this);
    this.receivePost = this.receivePost.bind(this);
    this.newUserName = this.newUserName.bind(this);
  }

  onNewPost(content) {
    const updatedPosts = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: content
    };
    console.log(JSON.stringify(updatedPosts));
    ws.send(JSON.stringify(updatedPosts));
  }

  newUserName(name) {
    if (!name) {
      name = "Anonymous"
    }
    const updatedUserName = {
      type: "postNotification",
      content: `${this.state.currentUser.name} has set their name to ${name}`
    };
    ws.send(JSON.stringify(updatedUserName));
    this.setState({currentUser: {name: name}})
  }

  render() {
    console.log("Rendering <App/>")
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="clientSize"># of user(s) online: {this.state.clientSize}</span>
        </nav>
        <div>
          <MessageList messages={this.state.posts} notification={this.state.notificationContent}/>
        </div>
        <div>
          <ChatBar currentUser={ this.state.currentUser } onPost={ this.onNewPost} onUserNameChange={ this.newUserName }/>
        </div>
      </div>
    );
  }
}

export default App;
