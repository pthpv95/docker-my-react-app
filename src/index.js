import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/index";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import createHistory from "history/createBrowserHistory";
import configureStore from "./configureStore";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const history = createHistory();
const store = configureStore({}, history);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
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
