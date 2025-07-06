'use client';
import { useTheme } from '@/context/ThemeContext';

export default function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 bg-black dark:bg-[#363632] text-white rounded cursor-pointer
      transition-transform duration-200 ease-in-out transform hover:scale-95"
    >
      {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}
