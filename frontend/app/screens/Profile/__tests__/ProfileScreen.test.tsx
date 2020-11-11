import React from "react";
import renderer from "react-test-renderer";
import ProfileScreen from "../ProfileScreen";
import { GuideCategory } from "../../../types/guide";

const props = {
  route: {
    name: GuideCategory.technology,
  },
  navigation: {
    push: () => {
      // do nothing.
    },
  },
};

it("ActScreen renders correctly", () => {
  const tree = renderer.create(<ProfileScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
