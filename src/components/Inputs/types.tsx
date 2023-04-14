import { ReactNode, ComponentProps } from 'react';
import { TextInputProps } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ExtraInputProps {
    label: ReactNode;
    icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
    isPassword?: boolean;
    errorText?: string;
}

export type InputProps = TextInputProps & ExtraInputProps;