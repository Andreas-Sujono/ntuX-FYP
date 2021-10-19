import React, { memo } from 'react';
import {
  Container,
  Title,
  CardsContainer,
  SubscriptionCard,
  // BottomSection,
  PopularTag,
} from './Styles';
import { PageContentContainer } from '../../../shared/Shared.styles';

const { PUBLIC_URL } = process.env;
const data = [
  {
    name: 'Newbie',
    imagePath: PUBLIC_URL + '/assets/LP/subscription1.svg',
    features: [
      { name: 'Limited Access to Material' },
      { name: 'Limited Access to Interview Prep' },
      { name: 'Basic Layout of Portfolio Site' },
      { name: 'Blog Management' },
      { name: 'QnA Management' },
      { name: 'Access to Free Event' },
    ],
    price: 'FREE',
  },
  {
    name: 'Junior',
    imagePath: PUBLIC_URL + '/assets/LP/subscription2.svg',
    features: [
      { name: 'Full Access to Material', highlighted: true },
      { name: 'Full Access to Interview Prep', highlighted: true },
      { name: 'Access to Review & Practices', highlighted: true },
      { name: 'Full Custom Layout of Portfolio Site', highlighted: true },
      { name: 'Blog Management' },
      { name: 'QnA Management' },
      { name: 'Access to Free and limited paid Event', highlighted: true },
      { name: '24 Hours Customer Service', highlighted: true },
    ],
    price: 'US$8.9',
    popular: true,
  },
  {
    name: 'Master',
    imagePath: PUBLIC_URL + '/assets/LP/subscription3.svg',
    features: [
      { name: 'Full Access to Material' },
      { name: 'Full Access to Interview Prep' },
      { name: 'Access to Review & Practices' },
      { name: 'Full Custom Layout of Portfolio Site' },
      { name: 'Blog Management' },
      { name: 'QnA Management' },
      { name: 'Access to Free and All paid Event', highlighted: true },
      { name: 'Mentorship Programme', highlighted: true },
      { name: 'Career Consultation', highlighted: true },
      { name: '24 Hours Customer Service' },
    ],
    price: 'US$14.9',
  },
];

const Subscriptions: React.FC = () => {
  return (
    <Container id="subscription" className="dt-bsecondary">
      <PageContentContainer>
        <Title className="dt-tprimary">Subscription</Title>

        <CardsContainer>
          {data.map((item: typeof data[0]) => (
            <SubscriptionCard key={item.name}>
              <div className="name">{item.name}</div>
              <img src={item.imagePath} />
              <ul>
                {item.features.map((feature: typeof item.features[0]) => (
                  <li
                    key={feature.name}
                    style={{
                      fontWeight: feature.highlighted ? 'bold' : 'normal',
                    }}
                  >
                    {feature.name}
                  </li>
                ))}
              </ul>
              <div className="price">
                {item.price}
                <span>{item.price !== 'FREE' && '/Month'}</span>
              </div>
              {item.popular && <PopularTag>Most Popular</PopularTag>}
            </SubscriptionCard>
          ))}
        </CardsContainer>
      </PageContentContainer>
    </Container>
  );
};

export default memo(Subscriptions);
