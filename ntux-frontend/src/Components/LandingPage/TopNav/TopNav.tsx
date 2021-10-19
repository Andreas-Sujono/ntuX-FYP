import React, { memo } from 'react';
import DefaultTopNav from './DefaultTopNav';

const TopNav: React.FC = () => {
  const isAuthenticated = false;

  if (isAuthenticated) return <DefaultTopNav />;
  return <DefaultTopNav />;
};

export default memo(TopNav);
