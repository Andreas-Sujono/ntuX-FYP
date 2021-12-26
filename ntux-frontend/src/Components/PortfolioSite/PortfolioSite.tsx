import { TEMPLATE_TYPE } from 'Models/PortfolioSite';
import React, { memo } from 'react';
import DefaultTemplate from './DefaultTemplate';

const PortfolioSite: React.FC = () => {
  const chosenTemplate = 'default';

  if (chosenTemplate === TEMPLATE_TYPE.DEFAULT) return <DefaultTemplate />;
  return <DefaultTemplate />;
};

export default memo(PortfolioSite);
