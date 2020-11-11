import React, { useEffect } from "react";
import { Animated, View } from "react-native";
import styles from "./SplashScreen.styles";
import Asset7SVG from "../Settings/components/Asset7SVG";

interface Props {
  screenAnimationComplete: (boolean) => void;
}

const SplashScreen = (props: Props) => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start(({ finished }) => {
      props.screenAnimationComplete(finished);
    });
  }, [fadeAnim]);

  return (
    <View style={styles.view}>
      <Animated.View style={[styles.animationImage, { opacity: fadeAnim }]} >
        <Asset7SVG  />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
