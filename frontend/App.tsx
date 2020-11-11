import React, { useEffect, useState } from "react";
import { View, AsyncStorage } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { FormattedProvider } from "react-native-globalize";
import { locale as localeExpo } from "expo-localization";
import { includes } from "ramda";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Sentry from "sentry-expo";
import { Provider } from "react-redux";
import AppNavigator from "./app/navigation/Navigator/AppNavigator";
import store from "./app/redux/store";
import SplashScreen from "./app/screens/Splash";
import { enableScreens } from "react-native-screens";
import { LocalizationContext } from "./app/utils";
import * as firebase from 'firebase';
import LoginScreen from "./app/screens/Login";
// import './global.js';
import './shim.js'
import w3s from "./app/utils/services";
// import * as Crypto from 'expo-crypto';

const supportedLanguages = ["en", "fr", "de", "sv"];

const secret =
  require("./secret.ts").default || require("./secret.example.ts").default;

/* TODO: change secret.dsn to Constants.manifest.extra.sentryPublicDsn */
Sentry.init({
  dsn: secret.dsn,
  enableInExpoDevelopment: false,
  debug: true,
});

/* TODO: set Constants.manifest.revisionId with expo */
Sentry.setRelease(Constants.manifest.revisionId);

const firebaseConfig = {
  apiKey: "AIzaSyC9yZ2ibqfOqiP5RhBMOLzRhkCVc9LgyMA",
  authDomain: "the-hyper-storage.firebaseapp.com",
  databaseURL: "https://the-hyper-storage.firebaseio.com",
  projectId: "the-hyper-storage",
  storageBucket: "the-hyper-storage.appspot.com",
  messagingSenderId: "476420788986",
  appId: "1:476420788986:web:e8c842aa362f5590312f43",
  measurementId: "G-LTKW86V6GE"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

interface Props {
  skipLoadingScreen: boolean;
}
interface State {
  locale: string;
  language: string;
  setLanguage: (language: string) => void;
  setLocale: (locale: string) => void;
  isLoadingComplete: boolean;
}

const App = () => {
  enableScreens();

  let lang = localeExpo.substring(0, 2);

  if (!includes(lang, supportedLanguages)) {
    lang = "en";
  }

  const [ready, setReady] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [splashAnimation, setSplashAnimation] = useState(__DEV__); // to track splashScreen animation
  const [language, setLanguage] = useState(lang);
  const [locale, setLocale] = useState(localeExpo);

  useEffect(() => {
    getUserDetail()
    w3s.initContract();

    Promise.all([
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialCommunityIcons.font,
        "Inter-Black": require("./assets/fonts/Inter-Black.ttf"),
        "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
        "Inter-BoldItalic": require("./assets/fonts/Inter-BoldItalic.ttf"),
        "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
        "Inter-ExtraBoldItalic": require("./assets/fonts/Inter-ExtraBoldItalic.ttf"),
        "Inter-ExtraLight-BETA": require("./assets/fonts/Inter-ExtraLight-BETA.ttf"),
        "Inter-ExtraLightItalic-BETA": require("./assets/fonts/Inter-ExtraLightItalic-BETA.ttf"),
        "Inter-Italic": require("./assets/fonts/Inter-Italic.ttf"),
        "Inter-Light-BETA": require("./assets/fonts/Inter-Light-BETA.ttf"),
        "Inter-LightItalic-BETA": require("./assets/fonts/Inter-LightItalic-BETA.ttf"),
        "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
        "Inter-MediumItalic": require("./assets/fonts/Inter-MediumItalic.ttf"),
        "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
        "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
        "Inter-SemiBoldItalic": require("./assets/fonts/Inter-SemiBoldItalic.ttf"),
        "Inter-Thin-BETA": require("./assets/fonts/Inter-Thin-BETA.ttf"),
        "Inter-ThinItalic-BETA": require("./assets/fonts/Inter-ThinItalic-BETA.ttf"),
      }),
    ])
      .then(() => {
        setReady(true);
      })
      .catch((error) => Sentry.captureException(error));
  }, []);
  const getUserDetail = async () => {
    let user = await AsyncStorage.getItem("userInfo")
    console.log(user, "user Info")
    if (user) {
      setUserInfo(JSON.parse(user))
    }
  }
  // callback to get splashScreen animation completion
  const screenAnimationComplete = (animation) => {
    setSplashAnimation(animation);
  };
  console.log()
  return (
    <SafeAreaProvider>
      <StatusBar />
      {ready && splashAnimation ? (
        <Provider store={store}>
          <FormattedProvider locale={language || "en"}>
            <LocalizationContext.Provider
              value={{
                locale: locale || "en-US",
                setLocale: setLocale,
                language: language || "en",
                setLanguage: setLanguage,
              }}
            >
              <AppNavigator />
            </LocalizationContext.Provider>
          </FormattedProvider>
        </Provider>
      ) : __DEV__ ? (
        <View />
      ) : (
            <SplashScreen screenAnimationComplete={screenAnimationComplete} />
          )}
    </SafeAreaProvider>
  );
};

export default App;
