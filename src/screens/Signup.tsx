import { RootTabScreenProps } from '../../types';
import MainContainer from '../components/Containers/MainContainer';
import BigText from '../components/Texts/BigText';
import RegularText from '../components/Texts/RegularText';
import SmallText from '../components/Texts/SmallText';
import StyledTextInput from '../components/Inputs/StyledTextInput';
import { useState } from 'react';
import RegularButton from '../components/Buttons/RegularButton';
import { emailValidator, passwordValidator, nameValidator } from '../utils/validators';

export default function Signup({ navigation }: RootTabScreenProps<'Signup'>) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [fullName, setFullName] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const _onSignUpPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const nameError = nameValidator(fullName.value);

    if (emailError || passwordError || nameError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setFullName({ ...fullName, error: nameError });
      alert(emailError || passwordError || nameError);
      return;
    }

    // navigation.navigate('Root');
  };
  return (
    <MainContainer>
      <BigText>Tab One</BigText>
      <RegularText> Tab One </RegularText>
      <SmallText style={{marginBottom: 20}}>Tab One</SmallText>
      <StyledTextInput 
        label="Email Address" 
        icon="email-variant" 
        value={email.value} 
        onChangeText={text => setEmail({ value: text, error: '' })}
        errorText={email.error}
        placeholder="example@mail.com"
        keyboardType='email-address'
        style={{marginBottom: 20}}
        />
      <StyledTextInput 
        label="Full Name" 
        icon="account" 
        value={fullName.value}
        errorText={fullName.error}
        onChangeText={text => setFullName({ value: text, error: '' })} 
        placeholder="Tu Nombre"
        style={{marginBottom: 20}}
        />
      <StyledTextInput 
        label="Password" 
        icon="lock-open" 
        value={password.value}
        errorText={password.error}
        onChangeText={text => setPassword({ value: text, error: '' })} 
        placeholder="********"
        isPassword={true}
        style={{marginBottom: 20}}
        />

      {/* <StyledTextInput 
        label="Confirm Password" 
        icon="lock-open" 
        value={password.value}
        errorText={password.error}
        onChangeText={text => setPassword({ value: text, error: '' })} 
        placeholder="********"
        isPassword={true}
        style={{marginBottom: 20}}
        /> */}

        <RegularButton onPress={_onSignUpPressed}>Press me</RegularButton>
    </MainContainer>
  );
}
