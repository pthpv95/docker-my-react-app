import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/index";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import createHistory from "history/createBrowserHistory";
import configureStore from "./configureStore";
import ApolloClient from "apollo-boost";
import { ApolloProvider, withApollo } from "react-apollo";

const client = new ApolloClient({
  uri: "https://lee-graphql-blogging-server.herokuapp.com/",
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
});
const AppWithClient = withApollo(App);
const history = createHistory();
const store = configureStore({}, history);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <AppWithClient />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept("./app/index", () => {
    ReactDOM.render(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>,
      document.getElementById("root")
    );
  });
}

registerServiceWorker();
