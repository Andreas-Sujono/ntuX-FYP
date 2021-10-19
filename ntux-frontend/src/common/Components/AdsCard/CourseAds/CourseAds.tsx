import React from 'react';
import { Card, Title, Subtitle } from './Styles';

interface IOpenForAdsProps {
  courseName?: string;
  top?: string;
  bottom?: string;
  widths?: string[];
}

const OpenForAds: React.FunctionComponent<IOpenForAdsProps> = ({
  courseName = 'Web Dev',
  top = '0',
  bottom = '0',
  widths = ['240px', '100px', '100%'],
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
      <img
        src={process.env.PUBLIC_URL + '/assets/hiddenAds/web-dev.png'}
        alt="open for ads"
      />
      <Title>
        Want to Learn <span>{courseName}</span>?
      </Title>
      <Subtitle>
        <strong>LOGIN</strong> now to get Lesson for <strong>FREE</strong>
      </Subtitle>
    </Card>
  );
};

export default OpenForAds;
