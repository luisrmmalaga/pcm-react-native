import { combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import usersReducer from "./usuarios_reducers";

const rootReducer = combineReducers({ usersReducer });

export const Store = configureStore(rootReducer, applyMiddleware(thunk));
