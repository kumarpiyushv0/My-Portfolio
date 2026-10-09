import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { trackButtonClick } from '../analytics';

const ThemeToggle = ({ theme, toggleTheme }) => {
  const handleClick = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    trackButtonClick('btn-theme-toggle', 'Theme Mode Toggle', {
      previous_theme: theme,
      new_theme: nextTheme,
    });
    toggleTheme();
  };

  return (
    <button
      id="btn-theme-toggle"
      name="theme-toggle-button"
      data-analytics-id="btn-theme-toggle"
      className="floating-theme-toggle"
      onClick={handleClick}
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
