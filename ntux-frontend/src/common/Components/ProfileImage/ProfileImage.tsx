import React, { memo } from 'react';
import { Container } from './Styles';

interface Props {
  name: string;
  image?: string;
}

function ProfileImage({ name, image }: Props): React.ReactElement {
  const renderContent = () => {
    if (image) return <img src={image} />;

    let initial = '';
    const nameSplits = name.split(' ').slice(0, 2);
    for (const _name of nameSplits) {
      initial += _name.slice(0, 1);
    }

    return initial;
  };

  return <Container>{renderContent()}</Container>;
}

export default memo(ProfileImage);
