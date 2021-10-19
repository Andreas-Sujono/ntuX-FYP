import React, { memo } from 'react';
import AuthForm from '../../../Auth/AuthForm';
import {
  Container,
  LeftSection,
  RightSection,
  TaglineContainer,
} from './Styles';

const WelcomeSection: React.FC = () => {
  return (
    <Container id="login">
      <LeftSection>
        <img src={process.env.PUBLIC_URL + '/assets/LP/welcome.png'} />
        <TaglineContainer>
          <p>One Stop Journey from Developer to Developer</p>
        </TaglineContainer>
      </LeftSection>
      <RightSection>
        <AuthForm />
      </RightSection>
    </Container>
  );
};

export default memo(WelcomeSection);
