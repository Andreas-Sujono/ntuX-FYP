import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { routes } from '../../../../Components/Routes';
import { Card, Title } from './Styles';

interface IOpenForAdsProps {
  top?: string;
  bottom?: string;
  widths?: string[];
}

const WriteBlogAds: React.FunctionComponent<IOpenForAdsProps> = ({
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
        src="https://res.cloudinary.com/dx6juznlw/image/upload/v1624076201/devThinker/writeBlog_yqj9ol.png"
        alt="open for ads"
      />
      <Title>
        <HashLink smooth to={routes.LP_HOMEPAGE + '/#login'}>
          <span>Login</span>
        </HashLink>
        &nbsp;to write your own blog!
      </Title>
    </Card>
  );
};

export default WriteBlogAds;
