import './ShinyText.css';
import { useTheme } from '@/context/ThemeContext';

const ShinyText = ({ text, disabled = false, speed = 10, className = '' }) => {
  const animationDuration = `${speed}s`;
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <div
      className={`${isDark ? 'shiny-text-dark' : 'shiny-text'} ${disabled ? 'disabled' : ''} ${className}`}
      style={{ animationDuration }}
    >
      {text}
    </div>
  );
};

export default ShinyText;
