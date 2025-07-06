import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

const Button = ({ children,link, className = '' }) => {
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <Link href={`${link}`}>
        <div
            className={`flex justify-center font-medium items-center gap-3 py-4 
            ${isDark ? 'bg-[#1a1a1a] text-[#9a9a89]' : 'bg-black text-white'} 
            ${className} 
            rounded-xl border-2 border-[#232323] 
            transition-transform duration-200 ease-in-out transform hover:scale-95`}
        >
            {children}
        </div>
    </Link>
  );
};

export default Button;
