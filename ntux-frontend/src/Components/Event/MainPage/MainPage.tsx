import React, { memo } from 'react';
import { SearchBar } from 'react-dre/lib/SearchBar';
import { PrimaryButton } from '../../../common/Components/Button';
import {
  Container,
  TopContainer,
  SearchBarContainer,
  Title,
  SectionContainer,
  NoEventText,
} from './Styles';

const MainPage: React.FC = () => {
  return (
    <Container>
      <TopContainer>
        <img src={`${process.env.PUBLIC_URL}/assets/LP/event-welcome.svg`} />
        <div className="slogan">
          <span>Study</span>, <span>Learn</span>, and <span>Connect</span>{' '}
          Through Events
          <PrimaryButton color="#2E3C85">Browse Events</PrimaryButton>
        </div>
      </TopContainer>
      <SearchBarContainer>
        <SearchBar
          value=""
          onChange={() => null}
          width="100%"
          placeholder="Search Events"
        />
      </SearchBarContainer>

      <SectionContainer>
        <Title>Upcoming Events</Title>
        <NoEventText>No Event right now</NoEventText>
      </SectionContainer>

      <SectionContainer>
        <Title>Past Events</Title>
        <NoEventText>No Event right now</NoEventText>
      </SectionContainer>
    </Container>
  );
};

export default memo(MainPage);
