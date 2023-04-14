import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

export function Title(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono', fontSize: 24, fontWeight: 'bold' }]} />;
}

export function SubTitle(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono', fontSize: 20 }]} />;
}

export function InputLabel(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono', fontSize: 16, textAlign: 'left' }]} />;
}