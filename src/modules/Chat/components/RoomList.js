import React, { Component } from "react"
import { getRoomList, joinRoom } from "../services"

const Room = ({ room, onJoinRoom }) => {
  return (
    <div className="cellContainer">
      <div className="form-field">
        <h3>{room.name}</h3>
      </div>
      <button onClick={() => onJoinRoom(room.id)}>Join</button>
    </div>
  )
}



class RoomList extends Component {
  state = {
    roomList: []
  }

  componentDidMount() {
    getRoomList().then(rooms => {
      this.setState({
        roomList: rooms
      })
    })
  }

  handleJoinRoom(roomId){
    // joinRoom(roomId)
  }
  render() {
    return (
      <div>
        <h3>Rooms</h3>
        {this.state.roomList.length > 0 ? (
          this.state.roomList.map((item, index) => (
            <Room
              room={item}
              key={index}
              onJoinRoom={this.handleJoinRoom}
            />
          ))
        ) : (
          <div>
            <p>No online rooms</p>
          </div>
        )}
      </div>
    )
  }
}

export default RoomList
