import React from 'react';
import type { Theme } from '../types';

interface ThemeSwitcherProps {
  themes: Theme[];
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM10 18a1 1 0 100-2 1 1 0 000 2zM3.05 4.95A1 1 0 004.464 3.536L5.17 4.243a1 1 0 101.414-1.414L5.879 2.121a1 1 0 00-1.414 0l-.707.707a1 1 0 000 1.414zM16.95 15.05a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM18 10a1 1 0 11-2 0 1 1 0 012 0zM4.95 16.95l.707-.707a1 1 0 10-1.414-1.414l-.707.707a1 1 0 001.414 1.414z" clipRule="evenodd" />
  </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
);


const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ themes, currentTheme, setTheme }) => {
  return (
    <div className="flex flex-row items-center space-x-1 bg-black/30 backdrop-blur-sm p-1 rounded-full">
      {themes.map(theme => (
        <button
          key={theme.id}
          onClick={() => setTheme(theme)}
          className={`
            p-2 rounded-full transition-colors duration-300
            ${currentTheme.id === theme.id 
              ? 'bg-sky-500 text-white' 
              : 'text-gray-300 hover:bg-white/20'
            }
          `}
          title={theme.name}
          aria-label={`Beralih ke tema ${theme.name}`}
        >
          {theme.isDark ? <MoonIcon /> : <SunIcon />}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;