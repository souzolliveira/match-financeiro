import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState('dark');
  const [componentMounted, setComponentMounted] = useState(false);

  const setThemeMode = mode => {
    document.documentElement.setAttribute('data-theme', mode);
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme) setThemeMode('dark');
    // eslint-disable-next-line no-unused-expressions
    else localTheme ? setThemeMode(localTheme) : setThemeMode('dark');

    setComponentMounted(true);
  }, []);

  return { theme, setThemeMode, componentMounted };
};

export default useTheme;
