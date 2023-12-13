import { useState, useEffect } from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

const DarkModeToggle = () => {
  const storedPreference = localStorage.getItem('darkModePreference');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    storedPreference === null ? false : JSON.parse(storedPreference)
  );

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkModePreference', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode((prevMode: boolean) => !prevMode);
  };

  return (
    <div className={`dark-mode-toggle ${isDarkMode ? 'dark' : 'light'}`}>
      <Toggle
        checked={isDarkMode}
        onChange={handleToggle}
        icons={{
          checked: <span role="img" aria-label="Dark Mode">🌜</span>,
          unchecked: <span role="img" aria-label="Light Mode">🌞</span>,
        }}
        aria-label="Dark mode toggle"
      />
    </div>
  );
};

export default DarkModeToggle;
