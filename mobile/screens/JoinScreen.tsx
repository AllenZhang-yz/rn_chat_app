import React, { FC, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { IStackNavigation } from '../AppContainer';

interface IJoinScreenProps {
  joinChat: (userName: string) => void;
}

const JoinScreen: FC<IJoinScreenProps> = ({ joinChat }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<IStackNavigation>();
  const [userName, setUserName] = useState('');
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require('../assets/chat-icon.jpeg')}
      />
      <View>
        <TextInput
          placeholder="Enter username"
          style={styles.input}
          value={userName}
          onChangeText={(text) => setUserName(text)}
        />
        <Button
          title="Join Chat"
          onPress={() => {
            dispatch({ type: 'server/join', data: userName });
            navigation.navigate('FriendList');
          }}
        />
      </View>

      {Platform.OS === 'ios' && (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={205} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default JoinScreen;
