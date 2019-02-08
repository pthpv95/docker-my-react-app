const submitUserInfo = (name, room) => ({
  type: "SUBMIT_CURRENT_CHAT_USER",
  payload: {
    name,
    room
  }
});
export { submitUserInfo };
