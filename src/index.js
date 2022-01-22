import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "react-notifications-component/dist/theme.css";
import ReactNotifications from "react-notifications-component";
// Redux
import { Provider } from "react-redux";
import initStore from "./store/index";

const store = initStore();
console.warn = console.error = () => {};
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactNotifications />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorker.unregister();
