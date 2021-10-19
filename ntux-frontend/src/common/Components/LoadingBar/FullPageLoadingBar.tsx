import React, { memo } from 'react';
import { FullPageLoadingBar } from 'react-dre/lib/LoadingBar';
import { useThemeContext } from '../../../App/ThemeProvider';

const FullPageLoadingBar_: React.FC = () => {
  const { darkTheme } = useThemeContext();
  const background = darkTheme ? '#1D1D1D' : 'white';
  return <FullPageLoadingBar backgroundColor={background} />;
};

export default memo(FullPageLoadingBar_);
