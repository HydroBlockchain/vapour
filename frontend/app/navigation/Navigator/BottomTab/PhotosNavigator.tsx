import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PhotosScreen from "../../../screens/Photos";

const Stack = createStackNavigator();

const PhotosNavigator = (): React.ReactElement => (
  <Stack.Navigator>
    <Stack.Screen
      name="Photos"
      options={PhotosScreen.navigationOptions}
      component={PhotosScreen}
    />
  </Stack.Navigator>
);

export default PhotosNavigator;
