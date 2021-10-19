import { routes } from 'Components/Routes';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  TopBox,
  Content,
  FeatureBox,
  ChecklistContainer,
} from './Styles';

const { PUBLIC_URL } = process.env;

const Dashboard: React.FC = () => {
  return (
    <Container>
      <TopBox>
        <div className="title">Welcome Andreas Sujono, </div>
        <div className="subtitle">What are you going to do today?</div>
      </TopBox>
      <Content>
        <div>
          <FeatureBox>
            <img src={PUBLIC_URL + '/assets/LP/features1.svg'} />
            <div>
              <div className="title">Start Learning</div>
              <div className="subtitle">
                Choose your specialization and start learning from 0 to master.
                Videos, Handbooks, Practices, and Reviews are available
              </div>
            </div>
          </FeatureBox>
          <br />
          <FeatureBox>
            <div>
              <div className="title">Manage Blog</div>
              <div className="subtitle">
                Write Your own blog to share your expertise to the world
              </div>
            </div>
            <img src={PUBLIC_URL + '/assets/LP/features2.svg'} />
          </FeatureBox>
          <br />
          <FeatureBox>
            <img src={PUBLIC_URL + '/assets/LP/features3.svg'} />
            <div>
              <div className="title">Manage Forum</div>
              <div className="subtitle">
                Ask and answer question to help communities
              </div>
            </div>
          </FeatureBox>
          <br />
          <FeatureBox>
            <div>
              <div className="title">Settings</div>
              <div className="subtitle">
                Manage Your Profile setting, your portfolio setting
              </div>
            </div>
          </FeatureBox>
        </div>
        <ChecklistContainer>
          <div className="name">Checklist</div>
          <ol>
            <li>
              Finish Basic Profile in the{' '}
              <Link to={routes.SETTINGS.PROFILE.BASE}>Profile Setting</Link>
            </li>
            <li>
              Choose your major and{' '}
              <Link to={routes.SETTINGS.PROFILE.BASE}>start learning</Link>
            </li>
            <li>
              Write your first{' '}
              <Link to={routes.SETTINGS.PROFILE.BASE}>Blog</Link>
            </li>
            <li>
              <Link to={routes.SETTINGS.PROFILE.BASE}>
                Ask your first question
              </Link>
            </li>
            <li>Answer to other’s question</li>
            <li>
              Create your{' '}
              <Link to={routes.SETTINGS.PROFILE.BASE}>portfolio site</Link>
            </li>
          </ol>
        </ChecklistContainer>
      </Content>
    </Container>
  );
};

export default memo(Dashboard);
