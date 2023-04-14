import React, { FunctionComponent } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { colors } from "../colors";
const  { primary, secondary, black, gray, accent } = colors;

const StyledText = styled.Text`
    font-size: 10px;
    color: ${black};
    text-align: left;
`;

import { TextProps } from "./types";

type PressableTextProps = {
  onPress?: () => void;
} & TextProps;

const PressableText: FunctionComponent<PressableTextProps> = (props) => {
  const { onPress, ...textProps } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <StyledText {...textProps}>{props.children}</StyledText>
    </TouchableOpacity>
  );
};

export default PressableText;