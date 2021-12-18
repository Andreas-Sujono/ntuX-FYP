import React, { memo, useState, useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { darkThemeRoutePaths } from '../../common/platformSetting';
import { colors } from '../../common/styling';
import { PlatformSetting } from '../../Models/PlatformSetting';
import GlobalStyle, { ThemeProps } from './GlobalStyle';
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from '@mui/material/styles';

const ThemeContext = React.createContext({
  bgColor: colors.bg,
  textColor: colors.text,
  darkTheme: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDarkTheme: (val: boolean) => {
    return;
  },
});

const useThemeContext = (): ThemeProps => React.useContext(ThemeContext);

const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [darkTheme, setDarkTheme] = useState(false);
  const location = useLocation();

  const getPlatformSetting = () => {
    try {
      const settingString = localStorage.getItem('platformSetting');
      if (!settingString) {
        return {} as any;
      }

      return (JSON.parse(settingString) || {}) as PlatformSetting;
    } catch {
      return {} as any;
    }
  };

  const handleChangeTheme = () => {
    const isUsingDarkTheme = darkThemeRoutePaths.reduce(
      (acc: any, current: string) =>
        acc && matchPath(location.pathname, { path: current }),
      true,
    );

    if (isUsingDarkTheme && !darkTheme) setDarkTheme(true);
    else {
      const setting = getPlatformSetting();
      setDarkTheme(!!setting?.darkTheme);
    }
  };

  const initializeTheme = () => {
    const setting = getPlatformSetting();
    setDarkTheme(!!setting?.darkTheme);
  };

  //override certain path to use dark theme
  useEffect(() => {
    handleChangeTheme();
  }, [location.pathname]);

  useEffect(() => {
    initializeTheme();
  }, []);

  const value: ThemeProps = {
    bgColor: colors.bg,
    textColor: colors.text,
    darkTheme,
    setDarkTheme: (val: boolean) => {
      const setting = getPlatformSetting();
      setDarkTheme(val);
      localStorage.setItem(
        'platformSetting',
        JSON.stringify({ ...setting, darkTheme: val }),
      );
    },
  };

  const MUITheme = createTheme({
    palette: {
      primary: {
        main: colors.primary,
      },
      text: colors.text,
    },
    components: {
      // Name of the component
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              background: '#EFEFEF',
            },
            '&.Mui-selected:hover': {
              background: '#EFEFEF',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={MUITheme}>
        <GlobalStyle {...value} />
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export default memo(ThemeProvider);
export { ThemeContext, useThemeContext };
