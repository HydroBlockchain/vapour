import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking } from "expo";
import { Colors } from "../../style";

import styles from "./SocialMedia.styles";

const socialMedia = [
  {
    iconName: "slack",
    url:
      "https://projecthydro.org/",
  },
  {
    iconName: "github-circle",
    url: "https://github.com/HydroBlockchain",
  },
  {
    iconName: "twitter",
    url: "https://twitter.com/HydroBlockchain",
  },
  {
    iconName: "mastodon",
    url: "https://projecthydro.org/",
  },
  {
    iconName: "medium",
    url: "https://medium.com/@ProjectHydro",
  },
];

export default () => (
  <View style={styles.container}>
    <View style={styles.box}>
      {socialMedia.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => Linking.openURL(item.url)}>
          <MaterialCommunityIcons
            name={item.iconName}
            size={32}
            color={Colors.grey70}
          />
        </TouchableOpacity>
      ))}
    </View>
  </View>
);
