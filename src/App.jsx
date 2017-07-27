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
    ws.onmessage = this.receivePost
  }

  receivePost(event){
    const postwithId = JSON.parse(event.data);
    const newPosts = this.state.posts.concat(postwithId);
    this.setState({posts: newPosts});
  }

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      posts: []
    };
    this.onNewPost = this.onNewPost.bind(this);
    this.receivePost = this.receivePost.bind(this);
    this.newUserName = this.newUserName.bind(this);
  }

  onNewPost(content) {
    const updatedPosts = {
      username: this.state.currentUser.name,
      content: content
    };
    console.log(JSON.stringify(updatedPosts));
    ws.send(JSON.stringify(updatedPosts));
  }

  newUserName(name) {
    this.setState({currentUser: {name: name}})
  }

  render() {
    console.log("Rendering <App/>")
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <div>
          <MessageList messages={this.state.posts} />
        </div>
        <div>
          <ChatBar currentUser={ this.state.currentUser } onPost={ this.onNewPost} onUserNameChange={ this.newUserName }/>
        </div>
      </div>
    );
  }
}

export default App;
