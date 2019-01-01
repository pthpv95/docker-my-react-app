export const SOCKET_IO_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://node-chat-server-by-lee.herokuapp.com/"
    : "http://localhost:3000";

//"https://node-chat-server-by-lee.herokuapp.com/";
