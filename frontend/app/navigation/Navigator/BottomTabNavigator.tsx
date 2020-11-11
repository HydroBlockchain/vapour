import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../../style";

import TabBarIcon from "../../components/TabBarIcon";
import { t } from "../../utils";

import ActNavigator from "./BottomTab/PhotosNavigator";
import BudgetNavigator from "./BottomTab/BudgetNavigator";
import EmissionsNavigator from "./BottomTab/EmissionsNavigator";
import SettingsNavigator from "./BottomTab/SettingsNavigator";
import PhotosNavigator from "./BottomTab/PhotosNavigator";
import NewsFeedNavigator from "./BottomTab/NewsFeedNavigator";
import PostNavigator from "./BottomTab/PostNavigator";

const BottomTab = createBottomTabNavigator();

const BudgetOptions = {
  tabBarLabel: t("BUDGET_SCREEN_TAB_NAME"),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-calculator"} />
  ),
};

const EmissionsOptions = {
  tabBarLabel: t("EMISSIONS_SCREEN_TAB_NAME"),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-stats"} />
  ),
};

// const PhotosOptions = {
//   tabBarLabel: t('PHOTOS_SCREEN_TITLE'),
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon focused={focused} name={"md-image"} />
//   ),
// };
const PostOptions = {
  tabBarLabel: t('POST_SCREEN_TITLE'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-document"} />
  ),
};
const NewsFeedOptions = {
  tabBarLabel: t('NEWS_FEED_SCREEN_TITLE'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-paper"} />
  ),
};

const SettingsOptions = {
  tabBarLabel: t("SETTINGS_SCREEN_TAB_NAME"),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"md-switch"} />
  ),
};

const MainTabNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    tabBarOptions={{
      activeTintColor: Colors.blue50,
      inactiveTintColor: Colors.grey40,
      style: {
        paddingTop: 6,
        backgroundColor: Colors.blue10,
        borderTopWidth: 0,
      },
    }}
  >
    <BottomTab.Screen
      name="BudgetNavigator"
      options={BudgetOptions}
      component={BudgetNavigator}
    />
    <BottomTab.Screen
      name="EmissionsNavigator"
      options={EmissionsOptions}
      component={EmissionsNavigator}
    />
    {/* <BottomTab.Screen
      name="Photos"
      options={PhotosOptions}
      component={PhotosNavigator}
    /> */}
    <BottomTab.Screen
      name="Post"
      options={PostOptions}
      component={PostNavigator}
    />
    <BottomTab.Screen
      name="NewsFeed"
      options={NewsFeedOptions}
      component={NewsFeedNavigator}
    />
    <BottomTab.Screen
      name="SettingsNavigator"
      options={SettingsOptions}
      component={SettingsNavigator}
    />
  </BottomTab.Navigator>
);

export default MainTabNavigator;
