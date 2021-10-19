import React, { memo } from 'react';
import { TEMPLATE } from '../../Store/Constants/PortfolioSite/general';
import DefaultTemplate from './DefaultTemplate';

const PortfolioSite: React.FC = () => {
  const chosenTemplate = 'default';

  if (chosenTemplate === TEMPLATE.DEFAULT) return <DefaultTemplate />;
  return <DefaultTemplate />;
};

export default memo(PortfolioSite);
