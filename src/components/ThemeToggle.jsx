import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      className="floating-theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
    >
      <div className="theme-toggle-icon-wrap">
        {theme === 'light' ? (
          <FaMoon className="theme-icon moon-icon" />
        ) : (
          <FaSun className="theme-icon sun-icon" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
