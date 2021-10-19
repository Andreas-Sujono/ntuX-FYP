import { routes } from 'Components/Routes';
import React, { FormEvent, memo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextInput } from '../../../common/Components/Input';
import {
  Container,
  Title,
  TabsContainer,
  Tab,
  StyledForm,
  StyledButton,
  AlternativeText,
  AlternativeLoginContainer,
} from './Styles';

enum AuthModeTab {
  LOGIN,
  SIGNUP,
}

const AuthForm: React.FC = () => {
  const [authModeTab, setAuthModeTab] = useState(AuthModeTab.SIGNUP);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const loginMode = authModeTab === AuthModeTab.LOGIN;

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    resetForm();
    console.log('submitted');
    history.push(routes.ADMIN.DASHBOARD);
  };

  return (
    <Container>
      <TabsContainer>
        <Tab
          isActive={authModeTab === AuthModeTab.LOGIN}
          onClick={() => setAuthModeTab(AuthModeTab.LOGIN)}
        >
          Login
        </Tab>
        <Tab
          isActive={authModeTab === AuthModeTab.SIGNUP}
          onClick={() => setAuthModeTab(AuthModeTab.SIGNUP)}
        >
          Sign Up
        </Tab>
      </TabsContainer>
      <StyledForm onSubmit={handleSubmitForm}>
        <Title>{loginMode ? 'Welcome Back!' : 'Join Us for FREE'}</Title>
        <TextInput
          label="Email"
          value={email}
          onChange={(value) => setEmail(value)}
          placeholder="Enter your email address"
          type="email"
          required
        />
        <TextInput
          label="password"
          value={password}
          onChange={(value) => setPassword(value)}
          placeholder={
            loginMode ? 'Enter your password' : 'Min 8 Characters and a number'
          }
          mt="24px"
          required
          type="password"
        />

        <StyledButton onClick={() => null} type="submit">
          {loginMode ? 'Login' : 'Sign Up'}
        </StyledButton>
      </StyledForm>

      <AlternativeText>
        Or {loginMode ? 'login' : 'sign up'} using
      </AlternativeText>
      <AlternativeLoginContainer>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXdZstnFOO87-aJ43mJ_-R2gGYO8SV9A_GAw&usqp=CAU"
          alt="google"
        />
      </AlternativeLoginContainer>
    </Container>
  );
};

export default memo(AuthForm);
