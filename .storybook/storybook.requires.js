/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
} from "@storybook/react-native";

import "@storybook/addon-ondevice-controls/register";
import "@storybook/addon-ondevice-actions/register";

import { argsEnhancers } from "@storybook/addon-actions/dist/modern/preset/addArgs";

import { decorators, parameters } from "./preview";

if (decorators) {
  decorators.forEach((decorator) => addDecorator(decorator));
}

if (parameters) {
  addParameters(parameters);
}

// temporary fix for https://github.com/storybookjs/react-native/issues/327 whilst the issue is investigated
try {
  argsEnhancers.forEach((enhancer) => addArgsEnhancer(enhancer));
} catch {}

const getStories = () => {
  return [
    require("../app/components/Button/Button.stories.tsx"),
    require("../app/components/EditingListView/EditingListView.stories.tsx"),
    require("../app/components/ElevatedButton/ElevatedButton.stories.tsx"),
    require("../app/components/InsetGroup/InsetGroup.stories.tsx"),
    require("../app/components/NeomorphShadow/NeomorphShadow.stories.tsx"),
    require("../app/components/RubberButton/RubberButton.stories.tsx"),
    require("../app/components/Switch/Switch.stories.tsx"),
    require("../app/components/TableView/TableView.stories.tsx"),
    require("../app/components/Text/Text.stories.tsx"),
    require("../app/components/TextInput/TextInput.stories.tsx"),
  ];
};

configure(getStories, module, false);
