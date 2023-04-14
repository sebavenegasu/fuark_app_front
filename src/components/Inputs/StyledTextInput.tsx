import React, { FunctionComponent, useState } from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SmallText from "../Texts/SmallText";

import { colors } from "../colors";
const  { primary, secondary, black, gray, accent } = colors;

const InputWrapper = styled.View`
    width: 100%;
`
const InputField = styled.TextInput`
    background-color: ${primary};
    height: 60px;
    border-radius: 10px;
    border-width: 2px;
    border-color: ${secondary};
    margin-vertical: 10px;
    margin-bottom: 10px;
    padding: 15px;
    padding-left: 65px;
    padding-right: 55px;
    font-size: 16px;
    color: ${black};
`

const LeftIcon = styled.View`
    position: absolute;
    top: 35px;
    left: 15px;
    z-index: 1;
    border-right-width: 2px;
    border-color: ${secondary};
    padding-right: 10px;
`
const RightIcon = styled.TouchableOpacity`
    position: absolute;
    top: 35px;
    right: 15px;
    z-index: 1;
`
import { InputProps } from "./types";

const StyledTextInput: FunctionComponent<InputProps> = ({icon, label, isPassword, errorText, ...props}) => {
    const [inputBackgroundColor, setInputBackgroundColor] = useState(primary);
    const [hidePassword, setHidePassword] = useState(true);

    const customOnFocus = () => {
        props?.onFocus
        setInputBackgroundColor(secondary);
    }
    const customOnBlur = () => {
        props?.onBlur
        setInputBackgroundColor(primary);
    }
    return <InputWrapper>
        <LeftIcon>
            <MaterialCommunityIcons name={icon} size={30} color={accent}/>
        </LeftIcon>
        <SmallText>{label}</SmallText>
        <InputField 
            {...props} 
            style={[{ backgroundColor: inputBackgroundColor}, props.style]}
            onFocus={customOnFocus}
            onBlur={customOnBlur}
            secureTextEntry={isPassword && hidePassword}
            autoCapitalize='none'
        />
        
       { isPassword && <RightIcon onPress={() => setHidePassword(!hidePassword)}>
            <MaterialCommunityIcons name={hidePassword ? "eye-off" : "eye"} size={30} color={black}/>
        </RightIcon>}
        {errorText && <SmallText style={{color: "red", position: "absolute", bottom: 5}}>{errorText}</SmallText>}
       
    </InputWrapper>
};

export default StyledTextInput;