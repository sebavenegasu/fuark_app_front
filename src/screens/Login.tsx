import { RootTabScreenProps } from '../../types';
import MainContainer from '../components/Containers/MainContainer';
import BigText from '../components/Texts/BigText';
import RegularText from '../components/Texts/RegularText';
import SmallText from '../components/Texts/SmallText';
import StyledTextInput from '../components/Inputs/StyledTextInput';
import { useState } from 'react';
import RegularButton from '../components/Buttons/RegularButton';
import { emailValidator, passwordValidator, nameValidator } from '../utils/validators';
import { Image } from 'react-native';
import PressableText  from '../components/Texts/PressableText';

export default function Login({ navigation }: RootTabScreenProps<'Login'>) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const _onSignUpPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError ) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      alert(emailError || passwordError );
      return;
    }
    navigation.navigate('Root');
    console.log(email.value, password.value)
  };
  return (
    <MainContainer>
      <Image style={{height: "15%", width: "100%"}}source={require("../assets/images/guts.jpg")}/>
      <BigText>Fuark App</BigText>
      {/* <RegularText>  </RegularText>
      <SmallText style={{marginBottom: 20}}>Tab One</SmallText> */}
      <StyledTextInput 
        label="Direccion de email" 
        icon="email-variant" 
        value={email.value} 
        onChangeText={text => setEmail({ value: text, error: '' })}
        errorText={email.error}
        placeholder="example@mail.com"
        keyboardType='email-address'
        style={{marginBottom: 20}}
      />
      <StyledTextInput 
        label="Contraseña" 
        icon="lock-open" 
        value={password.value}
        errorText={password.error}
        onChangeText={text => setPassword({ value: text, error: '' })} 
        placeholder="********"
        isPassword={true}
        style={{marginBottom: 20}}
      />

        <RegularButton onPress={_onSignUpPressed}>Iniciar sesion</RegularButton>
        <SmallText style={{marginTop: 20}}>¿No tienes cuenta? <PressableText onPress={() => navigation.navigate('Signup')} style={{color: "#0000EE", marginTop: 6}}>Registrate</PressableText></SmallText>
    </MainContainer>

  );
}
