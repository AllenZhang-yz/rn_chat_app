import React from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { IState, IUserInfo, IConversations } from '../redux/reducer';
import { IStackNavigation, StackParamList } from '../AppContainer';

interface IUser {
  _id: number;
  name: string;
  avatar: string;
}

export interface ISentMsg {
  _id: number | string;
  text: string;
  createdAt: Date | number;
  user: IUser;
}

const ChatScreen = () => {
  const dispatch = useDispatch();
  const selfUser = useSelector<IState, IUserInfo | undefined>(
    (state) => state.selfUser
  );
  const conversations = useSelector<IState, IConversations>(
    (state) => state.conversations
  );
  const navigation = useNavigation<IStackNavigation>();
  const route = useRoute<RouteProp<StackParamList, 'Chat'>>();
  const { name, userId } = route.params;
  navigation.setOptions({ headerTitle: name });
  const messages = conversations[userId].messages;
  console.log('messages', messages);
  return (
    <View style={styles.container}>
      <GiftedChat
        renderUsernameOnMessage={true}
        showUserAvatar
        messages={messages}
        onSend={(messages: ISentMsg[]) => {
          dispatch({
            type: 'private_message',
            data: { message: messages[0], conversationId: userId },
          });
          dispatch({
            type: 'server/private_message',
            data: { message: messages[0], conversationId: userId },
          });
        }}
        user={{
          _id: selfUser?.userId as string,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatScreen;
