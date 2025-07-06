'use client';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/context/ThemeContext';
import Squares from '@/components/background/Squares';
import SplitText from '@/components/SplitText';
import ShinyText from '@/components/ShinyText';
import SpotlightCard from '@/components/SpotlightCard';
import Button from '@/components/Button';
import Carousel from '@/components/Carousel';
import { useEffect, useRef, useState } from 'react';

import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  const { isDark } = useTheme();
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  return (
    <div className="w-full h-full relative">
      <div className="fixed w-full h-full">
        {isDark ? (
          <div key="dark" className="flex w-full h-full absolute top-0 left-0 opacity-5">
            <Squares 
              speed={0.5} 
              squareSize={40}
              direction='diagonal'
              borderColor='#fff'
              hoverFillColor='#161616'
            />
          </div>
        ) : (
          <div key="light" className="flex w-full h-full absolute top-0 left-0 opacity-5">
            <Squares 
              speed={0.5} 
              squareSize={40}
              direction='diagonal'
              borderColor='#161616'
              hoverFillColor='#fff'
            />
          </div>
        )}
      </div>
      <main className="container mx-auto px-5 relative z-10">  
        <Navbar/>
        <div className="w-full min-h-screen md:min-h-[35rem] flex justify-center items-center">
          <div className="flex flex-col justify-center items-center text-center px-0 md:px-24">
            <Image
              src="/assets/ichwankotak.jpg"
              width={500}
              height={500}
              alt="Picture of UI & UX"
              className='w-28 h-28 mb-5 rounded-full object-cover shadow-lg'
            />
            <SplitText
              text="Hi, I'm Ichwan 👋"
              className="text-xl font-semibold text-center"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />
            <SplitText
              text="Web Developer & Digital Illustrator"
              className="text-xl font-semibold text-center"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            />

            <ShinyText text="Building Website, digital products, and experience." disabled={false} speed={3} className='text-2xl md:text-6xl font-medium mt-5 z-10 h-full mb-10' />
            
            <Button link="mailto:ichwanul.muslim.pramono@gmail.com" className='w-48'>
              Get In Touch
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </Button>
          </div>
        </div>
        <div className="w-full min-h-screen md:min-h-[35rem] flex flex-col justify-center items-center">
        <ShinyText text="My Projects." disabled={false} speed={3} className='mb-10 text-xl md:text-4xl font-medium mt-5' />
          <div className="flex w-full h-full flex-col text-center px-0 md:px-24">
            <div ref={containerRef} className="h-full w-full relative">
              {width > 0 && (
                <Carousel
                  baseWidth={width}
                  autoplay={true}
                  autoplayDelay={10000}
                  pauseOnHover={true}
                  loop={true}
                />
              )}
            </div>
          </div>
        </div>
        <div className="w-full min-h-screen md:min-h-[35rem] flex justify-center items-center">
          <div className="flex flex-col text-center px-0 md:px-24">
            <ShinyText text="Collaborate with Clients to create impactful results." disabled={false} speed={3} className='mb-10 text-xl md:text-4xl font-medium mt-5 z-10 h-full' />
  
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 100, 255, 0.2)">
                <Image
                  src="/assets/uiuxdesign.jpg"
                  width={500}
                  height={500}
                  alt="Picture of UI & UX"
                  className='w-full h-48 mb-5 rounded-lg object-cover'
                />
                <p className="font-bold">UI & UX</p>
                <p className="">Designing interfaces that are intuitive, efficient, and enjoyable to use.</p>
              </SpotlightCard>
              <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 100, 255, 0.2)">
                <Image
                  src="/assets/app-dev.jpg"
                  width={500}
                  height={500}
                  alt="Picture of UI & UX"
                  className='w-full h-48 mb-5 rounded-lg object-cover'
                />
                <p className="font-bold">Web App</p>
                <p className="">Transforming ideas into exceptional web app experiences.</p>
              </SpotlightCard>
              <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 100, 255, 0.2)">
                <Image
                  src="/assets/design.jpg"
                  width={500}
                  height={500}
                  alt="Picture of UI & UX"
                  className='w-full h-48 mb-5 rounded-lg object-cover'
                />
                <p className="font-bold">Design & Creative</p>
                <p className="">Crafting visually stunning designs that connect with your audience.</p>
              </SpotlightCard>
              <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 100, 255, 0.2)">
                <Image
                  src="/assets/development.jpg"
                  width={500}
                  height={500}
                  alt="Picture of UI & UX"
                  className='w-full h-48 mb-5 rounded-lg object-cover'
                />
                <p className="font-bold">Development</p>
                <p className="">Bringing your vision to life with the latest technology and design trends.</p>
              </SpotlightCard>

            </div>
          </div>
        </div>
        <div className="w-full min-h-screen md:min-h-[35rem] flex justify-center items-center">
          <div className="flex flex-col text-center px-0 md:px-24">
            <ShinyText text="Tell me about your next project." disabled={false} speed={3} className='mb-10 text-xl md:text-4xl font-medium mt-5 z-10 h-full' />

            <div className="flex flex-col gap-4 justify-center items-center">
              <Button link="mailto:ichwanul.muslim.pramono@gmail.com" className='w-48'>
                Email me
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </Button>
              <Button link="https://api.whatsapp.com/send?phone=6281384402435&text=Saya%20ingin%20mendiskusikan%20tentang%20projek%20saya." className='w-48'>
                Whatsapp me
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center border-t border-[#9a9a89] py-5 px-10">
          <div>© {new Date().getFullYear()} All rights reserved.</div>
          <div className="md:ml-auto">
            <Link href="https://www.linkedin.com/in/ichwanul-muslim/" className="hover:underline nav-text-link">
              Linkedin
            </Link>
            / 
            <Link href="https://www.instagram.com/wanjaaiy/" className="hover:underline nav-text-link">
              Instagram
          </Link>
          </div>
        </div>
      </main>
    </div>
  );
}