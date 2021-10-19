import React, { memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { ProjectDetail } from '../../../../Models/Project';
import { TextInput, TextAreaInput } from 'common/Components/Input';
import {
  Container,
  TopSection,
  StyledForm,
  Description,
  OrderText,
} from './Styles';
import { PrimaryButton } from 'common/Components/Button';

interface Props {
  detail: ProjectDetail;
}

const ProjectDetails: React.FC<Props> = ({
  detail,
}: {
  detail: ProjectDetail;
}) => {
  return (
    <Container>
      <TopSection>
        <div className="left-section">
          <div className="name">{detail.name}</div>
          <div className="posted-date">
            Posted on {detail.postedDate.toDateString()}
          </div>
          <div className="type">
            {detail.status}&nbsp;
            {detail.projectType}
          </div>
        </div>
        <div className="right-section">
          <div className="budget">Budget: ${detail.price}</div>
        </div>
      </TopSection>

      <Description>
        <ReactMarkdown>{detail.description}</ReactMarkdown>
      </Description>
      <StyledForm>
        <div className="left-section">
          <TextInput
            label="Offer Price"
            value=""
            onChange={() => null}
            placeholder="Price that you willing to pay"
            mt="24px"
            required
            type="text"
          />
          <TextAreaInput
            label="Message"
            value=""
            onChange={() => null}
            placeholder="Give message to employer"
            mt="16px"
            required
            type="text"
            cols={20}
          />
          <PrimaryButton color="#2E3C85" style={{ marginTop: '24px' }}>
            Make an Offer
          </PrimaryButton>
        </div>

        <div className="right-section">
          Tips:
          <ul>
            <li>
              Make Sure to finish your profile and build your portfolio site
              before make an offer
            </li>
            <li>
              Employer will contact the successfull offerant through email and
              this project status will be changed to closed
            </li>
          </ul>
        </div>
      </StyledForm>

      <OrderText>
        {detail.orders.length} People has made an offer with average pay of $200
      </OrderText>
    </Container>
  );
};

export default memo(ProjectDetails);
