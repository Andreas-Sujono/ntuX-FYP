import React from 'react';
import { Card, Title, Subtitle } from './Styles';

const { REACT_APP_ADS_EMAIL } = process.env;

interface IOpenForAdsProps {
  contactEmail?: string;
  top?: string;
  bottom?: string;
  widths?: string[];
  sizeRatio?: number;
}

const OpenForAds: React.FunctionComponent<IOpenForAdsProps> = ({
  contactEmail = REACT_APP_ADS_EMAIL,
  top = '0',
  bottom = '0',
  widths = ['240px', '100px', '100%'],
  sizeRatio = 1,
}: IOpenForAdsProps) => {
  return (
    <Card
      style={{
        width: widths[0] || '240px',
        minWidth: widths[1] || '100px',
        maxWidth: widths[2] || '100%',
        marginTop: top,
        marginBottom: bottom,
      }}
    >
      <a href={`mailto:${contactEmail}`}>
        <img
          src={process.env.PUBLIC_URL + '/assets/hiddenAds/open.png'}
          alt="open for ads"
        />
        <Title sizeRatio={sizeRatio}>Open for Ads</Title>
        <Subtitle sizeRatio={sizeRatio}>Contact us at {contactEmail}</Subtitle>
      </a>
    </Card>
  );
};

export default OpenForAds;
