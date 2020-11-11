import React from 'react';
import { View } from "react-native";
import navigationOptions from "./ProfileScreen.navigationOptions";
import { Text } from '../../components';
import MainProfileScreen from './MainProfileScreen';


const ProfileScreen = () => {
  return (
    <View>
      <MainProfileScreen />
    </View>
  )
}

ProfileScreen.navigationOptions = navigationOptions;

export default ProfileScreen;
