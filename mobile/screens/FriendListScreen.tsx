import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import Constant from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { IState, IUserInfo } from '../redux/reducer';
import { IStackNavigation } from '../AppContainer';

const FriendListScreen = () => {
  const navigation = useNavigation<IStackNavigation>();
  const usersOnline = useSelector<IState, IUserInfo[]>(
    (state) => state.usersOnline
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={usersOnline}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Chat', {
                name: item.username,
                userId: item.userId,
              })
            }
          >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item.avatar }} />
              <View style={styles.textContainer}>
                <Text style={styles.text}>{item.username}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.userId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Constant.statusBarHeight,
    marginLeft: 10,
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontStyle: 'italic',
  },
});

export default FriendListScreen;
