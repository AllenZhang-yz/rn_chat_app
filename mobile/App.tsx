import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer';
import { reducer } from './redux/reducer';

const socket = io('http://192.168.1.2:3001');
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');
const middleWares = [applyMiddleware(socketIoMiddleware)];
const store = createStore(reducer, compose(...middleWares));

store.subscribe(() => console.log('new state', store.getState()));

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
