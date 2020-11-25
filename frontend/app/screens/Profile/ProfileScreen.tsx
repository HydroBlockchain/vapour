import React from 'react';
import navigationOptions from "./ProfileScreen.navigationOptions";
import MainProfileScreen from './MainProfileScreen';
import MainProfileScreen2 from './MainProfileScreen2';
import ProfileData from './ProfileData';

const ProfileScreen = () => {
  return (
    <ProfileData />
  )
}

ProfileScreen.navigationOptions = navigationOptions;

export default ProfileScreen;
