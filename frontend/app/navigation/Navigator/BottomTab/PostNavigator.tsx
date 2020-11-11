import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Post from "../../../screens/Post";
import PostEdit from "../../../screens/PostEdit";


const Stack = createStackNavigator();

const NewsFeedNavigator = (): React.ReactElement => (
  <Stack.Navigator>
    <Stack.Screen
      name="Post"
      options={Post.navigationOptions}
      component={Post}
    />
  </Stack.Navigator>
);

export default NewsFeedNavigator;
