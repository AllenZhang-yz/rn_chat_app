import Server from 'socket.io';
import { IUsers, IUserInfo } from '../server';

let currentMessageId = 1;

const createMessage = (user: IUserInfo, messageText: string) => {
  return {
    _id: currentMessageId++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: user.userId,
      name: user.username,
      avatar: user.avatar,
    },
  };
};

export const handleMsg = (socket: Server.Socket, users: IUsers) => {
  socket.on('message', (messageText: string) => {
    const message = createMessage(users[socket.id], messageText);
    console.log(message);
    socket.broadcast.emit('message', message);
  });
};
