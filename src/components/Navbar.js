'use client';

import Link from 'next/link';
import DarkModeToggle from '@/components/DarkModeToggle';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname
import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setVisible] = useState(true);
  const [isScrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isDark, toggleDarkMode } = useTheme();

  const pathname = usePathname(); // Get the current URL path

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
  
      if (window.scrollY > 450) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
  
      if (currentScrollY > lastScrollY) {
        // Scroll ke bawah -> Navbar hilang dan tutup menu di mobile
        setVisible(false);
        setMobileMenuOpen(false);
      } else {
        // Scroll ke atas -> Navbar muncul kembali
        setVisible(true);
      }
  
      setLastScrollY(currentScrollY);
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);  

  // Determine navbar background based on pathname
  const navbarBackground =
    pathname === '/' // Check if the user is on the home page
    ? isScrolled
        ? `${isDark ? 'bg-[#161616]/80' : 'bg-white/80'} bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40`
        : 'bg-transparent'
      : 'bg-white shadow-md';

  return (
    <nav
      className={`navbar w-full fixed left-0 top-0 py-4 z-50 transition-all duration-300 ${
        navbarBackground
      } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className='menu-background' onClick={toggleMobileMenu}></div>
      <div className="container mx-auto px-5 xl:px-20 flex justify-between items-center">
        {/* Gambar Logo */}
        <div className="logo">
          <Link href="mailto:ichwanul.muslim.pramono@gmail.com" className="hover:underline nav-text-link">
        
            <div className='flex items-center gap-2'>    
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              Get in Touch
            </div>
          </Link>     
        </div>
        <div className={`menu md:flex md:items-center gap-10 ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className={`mb-3 md:mb-0 font-bold flex justify-end ${isMobileMenuOpen ? 'block' : 'hidden'}`} onClick={toggleMobileMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>     
          <div className='mb-3 md:mb-0 w-auto'>
            <Link href="https://www.linkedin.com/in/ichwanul-muslim/" className="hover:underline nav-text-link">
                Linkedin
            </Link>
          </div>
          <div className='mb-3 md:mb-0 w-auto'>
          <Link href="https://www.instagram.com/wanjaaiy/" className="hover:underline nav-text-link">
              Instagram
          </Link>
          </div>
          <div className='mb-3 md:mb-0'>
            <DarkModeToggle />
          </div>
        </div>
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <style jsx>{`
        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          font-size: 1rem;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .menu-background {
            display: ${isMobileMenuOpen ? 'block' : 'none'};
            position: absolute;
            top: 0;
            left: 0;
            background: #00000070;
            width: 100%;
            height:100vh;
            z-index:-1;
          }
          .menu {
            position: absolute;
            transform: ${isMobileMenuOpen ? 'translate(-100vw,0px)' : 'translate(0px,0px)'};
            top: 0;
            right: -100%;
            background: ${isDark ? '#262626' : 'white'};
            width: auto;
            height:120vh;
            padding: 40px 20px;
            text-align: start;
            box-shadow: 0px 15px 14px 0px #56565660;
            z-index:100;
            transition: all 0.51s ;
          }
          .mobile-menu-button {
            display: flex;
            justify-content: center;
            align-items:center;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
