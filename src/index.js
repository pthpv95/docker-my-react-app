import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/index";
import { Provider } from 'react-redux';
import registerServiceWorker from "./registerServiceWorker";
import createHistory from "history/createBrowserHistory";
import configureStore from "./configureStore";

const history = createHistory();
const store = configureStore({}, history);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
