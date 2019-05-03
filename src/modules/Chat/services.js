import httpClient from '../../services/request-wrapper';

const getRoomList = () =>{
  return httpClient.get('groups')
}

const joinRoom = (userId, groupId) =>{
  return httpClient.post('users/join-group', {
    userId, groupId
  })
}

export {
  getRoomList,
  joinRoom
}