import { ISentMsg } from '../screens/ChatScreen';

export interface IUserInfo {
  userId: string;
  username: string;
  avatar: string;
}

export interface IConversations {
  [key: string]: { messages: ISentMsg[]; userName: string };
}

export interface IState {
  usersOnline: IUserInfo[];
  selfUser: IUserInfo | undefined;
  conversations: IConversations;
}

interface IAction {
  type: string;
  data: any;
}

const initialState: IState = {
  usersOnline: [],
  selfUser: undefined,
  conversations: {},
};

export const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'users_online':
      const conversations = { ...state.conversations };
      const usersOnline: IUserInfo[] = action.data;
      for (let i = 0; i < usersOnline.length; i++) {
        const userId = usersOnline[i].userId;
        if (conversations[userId] === undefined) {
          conversations[userId] = {
            messages: [],
            userName: usersOnline[i].username,
          };
        }
      }
      return { ...state, usersOnline, conversations };
    case 'private_message':
      const conversationId = action.data.conversationId;
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...state.conversations[conversationId],
            messages: [
              action.data.message,
              ...state.conversations[conversationId].messages,
            ],
          },
        },
      };
    case 'self_user':
      return { ...state, selfUser: action.data };
    default:
      return state;
  }
};
