import React, { memo } from 'react';
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
} from 'react-share';
import { Container } from './Styles';

interface Props {
  facebookUrl?: string;
  telegramUrl?: string;
  twitterUrl?: string;
}

function ShareTooltip({
  facebookUrl = '',
  telegramUrl = '',
  twitterUrl = '',
}: Props): React.ReactElement {
  return (
    <Container>
      <FacebookShareButton url={facebookUrl}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TelegramShareButton url={telegramUrl}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <TwitterShareButton url={twitterUrl}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </Container>
  );
}

export default memo(ShareTooltip);
