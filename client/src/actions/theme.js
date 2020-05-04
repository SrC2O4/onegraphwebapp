import { createMuiTheme } from '@material-ui/core/styles';
import { setState, getState } from 'statezero';

const themeLight = createMuiTheme({ palette: { type: 'light' } });
const themeDark = createMuiTheme({ palette: { type: 'dark' } });

function setThemeClass(themeType) {
  const themeClass = document.body.classList;
  if (themeType === 'light') {
    themeClass.remove('theme--dark');
    themeClass.add('theme--light');
  } else {
    themeClass.add('theme--dark');
    themeClass.remove('theme--light');
  }
}

export function getCurrentTheme(themeType) {
  switch (themeType) {
    default:
    case 'light':
      return themeLight;
    case 'dark':
      return themeDark;
    case 'system':
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addListener(function (e) {
          if (getState('userTheme') === 'system')
            setState('currentTheme', e.matches ? 'dark' : 'light');
        });
        if (mediaQuery.matches) return themeDark;
        else return themeLight;
      }
      return createMuiTheme({ palette: { type: 'light' } });
  }
}

export function updateTheme() {
  const userTheme = getState('userTheme');

  switch (userTheme) {
    case 'light':
      setState('currentTheme', 'light');
      setThemeClass('light');
      break;
    case 'dark':
      setState('currentTheme', 'dark');
      setThemeClass('dark');
      break;
    default:
    case 'system':
      if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addListener(function (e) {
          if (getState('userTheme') === 'system')
            setState('currentTheme', e.matches ? 'dark' : 'light');
        });
        setState('currentTheme', mediaQuery.matches ? 'dark' : 'light');
      }
  }
}

export function setUserTheme(themeType) {
  setState('userTheme', themeType);
  updateTheme();
}
