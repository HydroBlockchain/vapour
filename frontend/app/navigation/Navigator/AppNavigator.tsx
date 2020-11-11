import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import ModalNavigator from "./ModalNavigator";
import MethodologyModalNavigator from "./MethodologyModalNavigator";
import RootNavigator from "./RootNavigator";
import ComingSoonScreen from "../../screens/ComingSoon";
import Methodology from "../../screens/Methodology";
import LoginScreen from "../../screens/Login";
import PostEditScreen from "../../screens/PostEdit";

const AppStack = createStackNavigator();

const App = (): React.ReactElement => {
  return (
    <NavigationContainer>
      <AppStack.Navigator mode="modal">
        <AppStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="AppStack"
          component={RootNavigator}
          options={{ headerShown: false }}
        />
        <AppStack.Screen
          name="ComingSoon"
          options={ComingSoonScreen.navigationOptions}
          component={ModalNavigator}
        />
        <AppStack.Screen
          name="Methodology"
          options={Methodology.navigationOptions}
          component={MethodologyModalNavigator}
        />
        <AppStack.Screen
          name="PostEdit"
          options={PostEditScreen.navigationOptions}
          component={PostEditScreen}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
