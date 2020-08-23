import Server from 'socket.io';
import { v1 as uuidv1 } from 'uuid';

const io = new Server();

export interface IUserInfo {
  userId: string;
  username: string;
  avatar: string;
}

export interface IUsers {
  [key: string]: IUserInfo;
}

const users: IUsers = {};

const createUserAvatarUrl = () => {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/${rand1}/${rand2}/any`;
};

const createUsersOnline = () => {
  const values = Object.values(users);
  const onlyWithUserNames = values.filter((u) => u.username !== '');
  return onlyWithUserNames;
};

io.on('connection', (socket) => {
  users[socket.id] = { userId: uuidv1(), username: '', avatar: '' };
  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('action', { type: 'users_online', data: createUsersOnline() });
  });
  socket.on('action', (action: { type: string; data: any }) => {
    switch (action.type) {
      case 'server/join':
        users[socket.id].username = action.data;
        users[socket.id].avatar = createUserAvatarUrl();
        console.log(users);
        io.emit('action', { type: 'users_online', data: createUsersOnline() });
        socket.emit('action', { type: 'self_user', data: users[socket.id] });
        break;
      case 'server/private_message':
        const conversationId = action.data.conversationId;
        const from = users[socket.id].userId;
        const userValues = Object.values(users);
        const socketIds = Object.keys(users);
        for (let i = 0; i < userValues.length; i++) {
          if (userValues[i].userId === conversationId) {
            const socketId = socketIds[i];
            io.sockets.sockets[socketId].emit('action', {
              type: 'private_message',
              data: {
                ...action.data,
                conversationId: from,
              },
            });
            break;
          }
        }
        break;
    }
  });
});

io.listen(3001);
