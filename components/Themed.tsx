import * as React from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  TouchableOpacity as DefaultButton,
  FlatList as DefaultSectionList,
  TextInput as DefaultTextInput,
  ScrollView as DefaultScrollView,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { Theme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type ButtonProps = ThemeProps &
  DefaultButton["props"] & { title?: string; contrastBg?: boolean };
export type ListProps = ThemeProps & DefaultSectionList["props"];
export type InputProps = ThemeProps & DefaultTextInput["props"];
export type ScrollViewProps = ThemeProps & DefaultScrollView["props"];
export function ScrollView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <DefaultText style={[{ color }, style]} {...otherProps}>
      {props.children != null ? props.children + "  " : ""}
    </DefaultText>
  );
}

export function Button(props: ButtonProps) {
  const { style, contrastBg, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor(
    {
      light: contrastBg ? darkColor : lightColor,
      dark: contrastBg ? lightColor : darkColor,
    },
    "text"
  );
  const bg = color == lightColor ? darkColor : lightColor;
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        backgroundColor: bg,
        padding: 10,
        borderRadius: 10,
      }}
      {...otherProps}
    >
      <Text style={[{ color }, style]}>{otherProps.title}</Text>
    </TouchableOpacity>
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextInput(props: InputProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <DefaultTextInput style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function SectionList(props: ListProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  return (
    <DefaultSectionList style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

interface RGB {
  b: number;
  g: number;
  r: number;
}
function rgbToYIQ({ r, g, b }: RGB): number {
  return (r * 299 + g * 587 + b * 114) / 1000;
}
function hexToRgb(hex: string): RGB | undefined {
  if (!hex || hex === undefined || hex === "") {
    return undefined;
  }

  const result: RegExpExecArray | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex
  );

  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : undefined;
}
export function contrast(
  colorHex: string | undefined,
  threshold: number = 128
): string {
  if (colorHex === undefined) {
    return "#000";
  }

  const rgb: RGB | undefined = hexToRgb(colorHex);

  if (rgb === undefined) {
    return "#000";
  }

  return rgbToYIQ(rgb) >= threshold ? "#000" : "#fff";
}
