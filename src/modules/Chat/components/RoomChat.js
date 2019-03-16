import React, { Component } from "react"
import { getQueryStringParams, formatTime } from "../../../utils"
import SocketContext from "../../../socket-context"

function Users({ users }) {
  return (
    <div className="chat__sidebar">
      <h3>People</h3>
      <div id="users">
        <ol>
          {users.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function Message({ messages }) {
  return (
    <div>
      {messages.length > 0 &&
        messages.map((message, index) => (
          <li key={index} className="message">
            <div className="message__title">
              <h4>{message.from}</h4>
              <span>{formatTime(message.createdAt)}</span>
            </div>
            <div className="message_body">
              <p>{message.text}</p>
            </div>
          </li>
        ))}
    </div>
  )
}

export class RoomChat extends Component {
  state = {
    users: [],
    messages: [],
    text: ""
  }

  socket = this.context

  handleUpdateText = e => {
    this.setState({
      text: e.target.value
    })
  }

  handleCreateSendNewMessage = e => {
    e.preventDefault()
    this.socket.emit(
      "createMessage",
      {
        from: "user",
        text: this.state.text
      },
      () => {
        this.setState({text:''})
        this.scrollToBottom()
      }
    )
  }

  scrollToBottom() {
    var messages = document.getElementById("messages")
    if (messages.scrollHeight > messages.clientHeight) {
      messages.scrollTop = messages.scrollHeight
    }
  }

  componentDidMount() {
    const params = getQueryStringParams(this.props.location.search)
    this.socket.emit("join", params, err => {
      if (err) {
        console.log(err)
        window.location.href = "/apps/chat";
      }
    })
    this.socket.on("newMessage", result => {
      let temp = this.state.messages
      temp.push(result)
      this.setState({
        messages: temp
      })
    })

    this.socket.on("updateUserList", usersList => {
      this.setState({
        users: usersList
      })
    })
  }

  componentWillUnmount() {
    this.socket.close()
  }

  render() {
    return (
      <div className="chat">
        <Users users={this.state.users} />
        <div className="chat__main">
          <ol id="messages" className="chat__messages">
            <Message messages={this.state.messages} />
          </ol>
          <div className="chat__footer">
            <form id="message-form">
              <input
                name="message"
                type="text"
                placeholder="Message"
                autoFocus
                autoComplete="off"
                onChange={this.handleUpdateText}
                value={this.state.text}
              />
              <button onClick={this.handleCreateSendNewMessage}>Send</button>
            </form>
            <button id="send-location">Send location</button>
          </div>
        </div>
      </div>
    )
  }
}

RoomChat.contextType = SocketContext

// export function RoomChat(props) {
//   const [messages, updateMessage] = useState([])
//   const [users, updateUsers] = useState([])
//   const [text, updateText] = useState("")
//   const socket = useContext(SocketContext)

//   function scrollToBottom() {
//     //selectors
//     var messages = document.getElementById("messages")
//     // var newMessage = messages.children("li:last-child");
//     // var clientHeight = messages.prop("clientHeight");
//     // var scrollTop = messages.prop("scrollTop");

//     // // Heights
//     // var scrollHeight = messages.prop("scrollHeight"); // heightest scroll value
//     // var newMessageHeight = newMessage.innerHeight();
//     // var lastMessageHeight = newMessage.prev().innerHeight();

//     if (messages.scrollHeight > messages.clientHeight) {
//       messages.scrollTop = messages.scrollHeight
//     }
//   }

//   useEffect(() => {
//     const params = getQueryStringParams(props.location.search)
//     socket.emit("join", params, err => {
//       if (err) {
//         console.log(err)

//         // window.location.href = "/chat";
//       }
//     })
//     socket.on("newMessage", result => {
//       let temp = messages
//       temp.push(result)
//       updateMessage(temp)
//     })

//     socket.on("updateUserList", usersList => {
//       updateUsers(usersList)
//     })

//     return function cleanUP(params) {
//       socket.close()
//     }
//   }, messages || users) // Only update state when messages or users have been changed

//   return (
//     <div className="chat">
//       <Users users={users} />
//       <div className="chat__main">
//         <ol id="messages" className="chat__messages">
//           <Message messages={messages} />
//         </ol>
//         <div className="chat__footer">
//           <form id="message-form">
//             <input
//               name="message"
//               type="text"
//               placeholder="Message"
//               autoFocus
//               autoComplete="off"
//               onChange={e => updateText(e.target.value)}
//               value={text}
//             />
//             <button
//               onClick={e => {
//                 e.preventDefault()
//                 socket.emit(
//                   "createMessage",
//                   {
//                     from: "user",
//                     text: text
//                   },
//                   () => {
//                     updateText("")
//                     scrollToBottom()
//                   }
//                 )
//               }}
//             >
//               Send
//             </button>
//           </form>
//           <button id="send-location">Send location</button>
//         </div>
//       </div>
//     </div>
//   )
// }
