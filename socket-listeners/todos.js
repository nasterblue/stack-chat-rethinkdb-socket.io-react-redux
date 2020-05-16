// socket-listeners/todos.js
import io from 'socket.io-client';

const socket = io.connect('/');

export default function (store) {
  socket.on('todo:insert', (todo) => {
    console.log(['client.socket', 'todo:client:insert', todo]);
    store.dispatch({
      type: 'todo:insert',
      todo: todo
    });
  });

  socket.on('todo:update', function (todo) {
    console.log(['client.socket', 'todo:client:update', todo]);
    store.dispatch({
      type: 'todo:update',
      todo: todo
    });
  });

  socket.on('todo:delete', function (todo) {
    console.log(['client.socket', 'todo:client:delete', todo]);
    store.dispatch({
      type: 'todo:delete',
      todo: todo
    });
  });
}
