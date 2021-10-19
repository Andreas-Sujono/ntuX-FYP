import React, { memo, useState } from 'react';
import { SearchBar } from 'react-dre/lib/SearchBar';
import {
  mockProjects,
  mockProjectDetail,
} from '../../../Models/mockData/project';
import ProjectDetails from './ProjectDetails';
import {
  BackgroundContainer,
  TopContainer,
  SearchBarContainer,
  Title,
  ContentRow,
  LeftSection,
  Card,
  RightSection,
  TabsContainer,
  Tab,
} from './Styles';

export type TabValue = 'ALL' | 'REQUEST' | 'OFFER';

const MainPage: React.FC = () => {
  const [tabValue, setTabValue] = useState<TabValue>('ALL');

  const handleChangeTab = (value: TabValue) => {
    setTabValue(value);
  };

  return (
    <>
      <BackgroundContainer>
        <TopContainer>
          <Title>Create a Request or make an offer</Title>
          <SearchBarContainer>
            <SearchBar
              value=""
              onChange={() => null}
              width="100%"
              placeholder="Search Request or Offer"
            />
          </SearchBarContainer>
          <img src="https://res.cloudinary.com/dx6juznlw/image/upload/v1625826641/devThinker/freelance_zuqzch.png" />
        </TopContainer>
      </BackgroundContainer>

      <ContentRow>
        <TabsContainer>
          <Tab
            isActive={tabValue === 'ALL'}
            onClick={() => handleChangeTab('ALL')}
          >
            All
          </Tab>
          <Tab
            isActive={tabValue === 'REQUEST'}
            onClick={() => handleChangeTab('REQUEST')}
          >
            Request
          </Tab>
          <Tab
            isActive={tabValue === 'OFFER'}
            onClick={() => handleChangeTab('OFFER')}
          >
            Offer
          </Tab>
        </TabsContainer>
        <LeftSection>
          {mockProjects.map((item) => (
            <Card key={item.id} status={item.status}>
              <div className="name">{item.name}</div>
              <div className="desc">{item.description}</div>
              <div className="price">
                Average offer: <span>${item.price}</span>
              </div>

              <div className="dt-row">
                <div className="posted-date">
                  Posted on {item.postedDate.toDateString()}
                </div>
                <div className="type">
                  {item.status}&nbsp;
                  {item.projectType}
                </div>
              </div>
            </Card>
          ))}
        </LeftSection>
        <RightSection>
          <ProjectDetails detail={mockProjectDetail} />
        </RightSection>
      </ContentRow>
    </>
  );
};

export default memo(MainPage);
