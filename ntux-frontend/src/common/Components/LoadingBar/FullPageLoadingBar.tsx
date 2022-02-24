import React, { memo } from 'react';
import { FullPageLoadingBar } from 'react-dre/lib/LoadingBar';
import ReactLoading from 'react-loading';
import { useThemeContext } from '../../../App/ThemeProvider';

const FullPageLoadingBar_: React.FC = () => {
  const { darkTheme } = useThemeContext();
  const background = darkTheme ? '#1D1D1D' : 'white';
  return <FullPageLoadingBar backgroundColor={background} />;
};

export const LoadingBar = ({ height }: any) => {
  height = height || '100px';
  return (
    <div
      style={{
        height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <ReactLoading color="rgb(53, 126, 221)" type="spin" />
    </div>
  );
};

export default memo(FullPageLoadingBar_);
