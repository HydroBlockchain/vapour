import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewsFeed from "../../../screens/NewsFeed";
import NewsDetail from "../../../screens/NewsDetail";

const Stack = createStackNavigator();

const NewsFeedNavigator = (): React.ReactElement => (
  <Stack.Navigator>
    <Stack.Screen
      name="newsFeed"
      options={NewsFeed.navigationOptions}
      component={NewsFeed}
    />
    <Stack.Screen
      name="NewsDetail"
      options={NewsDetail.navigationOptions}
      component={NewsDetail}
    />
  </Stack.Navigator>
);

export default NewsFeedNavigator;
