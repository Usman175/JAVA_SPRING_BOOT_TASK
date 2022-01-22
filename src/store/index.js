import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunkMiddleware from "redux-thunk";
import allReducers from "./reducer/index.js";

const defaultMiddlewares = [thunkMiddleware, promiseMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedMiddlewares = (middlewares) =>
  process.env.NODE_ENV === "development"
    ? composeEnhancers(
        applyMiddleware(
          ...defaultMiddlewares,
          ...middlewares,
          require("redux-immutable-state-invariant").default()
        )
      )
    : composeEnhancers(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState, middlewares = []) =>
  createStore(allReducers, initialState, composedMiddlewares(middlewares));

export default initialize;
