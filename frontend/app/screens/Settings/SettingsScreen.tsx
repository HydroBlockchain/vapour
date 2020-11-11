import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { Button, Text, SocialMedia } from "../../components";
import { SettingsRow } from "./components";
import * as WebBrowser from "expo-web-browser";
import styles from "./SettingsScreen.styles";
import navigationOptions from "./SettingsScreen.navigationOptions";
import { t } from "../../utils";
import ImagesAssets from "../../constants/ImagesAssets";
import { navigate } from "../../navigation";
import SvgUri from 'react-native-svg-uri';
import Asset7SVG from "./components/Asset7SVG";

const SettingsScreen = (props) => {
  const navigator = navigate(props.navigation);

  const rowItems = [
    {
      title: t("PROFILE_SCREEN_TITLE"),
      onPress: navigator.openProfile,
    },
    {
      title: t("SETTINGS_SCREEN_ABOUT"),
      onPress: navigator.openAbout,
    },
    {
      title: t("SETTINGS_SCREEN_MY_LOCATION"),
      onPress: navigator.openMyLocation,
    },
    {
      title: t("SETTINGS_SCREEN_SUPPORT_US"),
      onPress: navigator.openSupportUs,
    },
    // {
    //   title: t("SETTINGS_SCREEN_NMF_EARTH"),
    //   onPress: () => WebBrowser.openBrowserAsync("https://projecthydro.org/"),
    // },
    {
      title: t("SETTINGS_SCREEN_ROADMAP"),
      onPress: () =>
        WebBrowser.openBrowserAsync(
          "https://projecthydro.org/#roadmaps"
        ),
    },
    {
      title: t("SETTINGS_SCREEN_FEEDBACK"),
      onPress: () =>
        WebBrowser.openBrowserAsync("https://projecthydro.org/#footer"),
    },
    {
      title: t("SETTINGS_SCREEN_TERMS_OF_USE"),
      onPress: () =>
        WebBrowser.openBrowserAsync("https://projecthydro.org/"),
    },
  ];
  const [steps, setSteps] = useState(0);

  return (
    <ScrollView style={styles.container}>
      {rowItems.map((item, index) => (
        <SettingsRow key={index} onPress={item.onPress} title={item.title} />
      ))}
      <TouchableWithoutFeedback onPress={() => setSteps(steps + 1)}>
        {/* <View style={styles.logoNMFContainer}>
          <Image
            style={styles.logoNMF}
            resizeMode="contain"
            source={ImagesAssets.logos.nmf}
          />
        </View> */}
        <View style={styles.logoNMFContainer}>
          <Asset7SVG />
        </View>
      </TouchableWithoutFeedback>
      <Text.Tertiary bold lightGray style={styles.appVersionTitle}>
        {t("SETTINGS_SCREEN_APP_VERSION", {
          version: Constants.manifest.version,
        })}
      </Text.Tertiary>
      <SocialMedia />

      {steps > 4 ? (
        <View>
          <Button.Primary
            style={styles.hiddenBtn}
            textType={"Primary"}
            onPress={navigator.openStorybook}
          >
            <Text.Primary white center>
              Open Storybook
            </Text.Primary>
          </Button.Primary>
          <Button.Primary
            black
            style={styles.hiddenBtn}
            textType={"Primary"}
            onPress={() => {
              const date = new Date();
              const timestamp = date.getTime();
              throw new Error("Developer error test: " + timestamp);
            }}
          >
            <Text.Primary white center>
              Crash test
            </Text.Primary>
          </Button.Primary>
        </View>
      ) : null}
    </ScrollView>
  );
};

SettingsScreen.navigationOptions = navigationOptions;

export default SettingsScreen;
