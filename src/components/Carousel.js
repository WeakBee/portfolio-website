import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useTheme } from '@/context/ThemeContext';
import Link from "next/link";

const DEFAULT_ITEMS = [
  {
    id: 1,
    title: "Cocopav Website",
    description: "Website created for marketing Cocopav electric pods. This website is made with attention to the back-end for clients to add or edit content using Admin Dashboard. This website was created using Laravel and also has interesting animation features using Gsap",
    tectstack: ["laravel","jquery","tailwind","gsap"],
    preview: "/assets/project/cocopav.mp4",
    previewType: "video",
    url: "https://cocopav.netlify.app/",
  },
  {
    id: 2,
    title: "Eva Recruitment - Hashmicro",
    description: "The website created for marketing the Eva HR application belongs to Hashmicro. Website made with fully complex animated features using gsap",
    tectstack: ["javascript","jquery","bootstrap","gsap"],
    preview: "/assets/project/evarec.mp4",
    previewType: "video",
    url: "https://eva-rec-new.netlify.app/",
  },
  {
    id: 3,
    title: "Ezypolis Company Profile Website",
    description: "This website was created as a company profile for Ezypolis or PT. Manggala Artha Sejahtera, and is also used to sell insurance online (B2C). This website was created using next JS for the frontend and Golang for the backend as an API provider for the frontend",
    tectstack: ["nextjs","golang","javascript","tailwind"],
    preview: "/assets/project/ezypolis.mp4",
    previewType: "video",
    url: "https://ezypolis.com/",
  },
  {
    id: 4,
    title: "Bikaro Harum Indonesia Company Profile Website",
    description: "The website was created as a company profile for the Bikaro Harum Indonesia company, a company engaged in the field of cleaning products, such as laundry soap, dishes and others. This website uses many scroll trigger features as per client request such as, parallax, animate on scroll, number counter, and others. This website was created using next js, typescript, and gsap",
    tectstack: ["nextjs","typescript","tailwind","gsap"],
    preview: "/assets/project/bikaro.mp4",
    previewType: "video",
    url: "https://www.bikaroindonesia.com/",
  },
  {
    id: 5,
    title: "MAS Brokerage System",
    description: "This web application is a web with complex features. This website was created using Laravel. This website has a feature to create documents automatically from Word, Excel or PDF and perform calculations directly from the database. You can immediately create financial reports for the year and month. This website also uses automatic email features and other complex features.",
    tectstack: ["laravel","jquery","bootstrap"],
    preview: "/assets/project/masbro.mp4",
    previewType: "video",
    url: "",
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
      dragConstraints: {
        left: -trackItemOffset * (carouselItems.length - 1),
        right: 0,
      },
    };

  const { isDark, toggleDarkMode } = useTheme();

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${round
        ? "rounded-full border border-white"
        : "rounded-[24px] border border-[#222]"
        }`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px` }),
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const outputRange = [90, 0, -90];
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          return (
            <motion.div
              key={index}
              className={`relative shrink-0 flex flex-col ${round
                ? "items-center justify-center text-center bg-[#060010] border-0"
                : `items-start justify-between ${isDark ? 'bg-[#363632]' : 'bg-gray-200'} border border-[#363632] rounded-[12px]`
                } overflow-hidden cursor-grab active:cursor-grabbing`}
              style={{
                width: itemWidth,
                height: round ? itemWidth : "100%",
                rotateY: rotateY,
                ...(round && { borderRadius: "50%" }),
              }}
              transition={effectiveTransition}
            >
              <div className="py-3 px-3 md:py-5 md:px-10 w-full">
                <div className={`${isDark ? 'text-[#9a9a89]' : 'text-black'} text-2xl font-bold mb-3`}>
                  {item.title}
                </div>
                <p className={`${isDark ? 'text-[#9a9a89]' : 'text-black'} text-medium`}>{item.description}</p>
                <div className="flex flex-col md:flex-row items-center gap-3 flex-wrap mt-3 px-3 md:px-10 justify-center">
                    <p className="font-bold italic underline">Tech Stack : </p>
                    <div className="flex justify-center items-center gap-3">
                        {item.tectstack.map((tech, index) => (
                            <img
                            key={index}
                            src={`/assets/techstack/${tech}.png`}
                            alt={tech}
                            title={tech}
                            className="h-16 w-16 object-contain"
                            />
                        ))}
                    </div>
                </div>
                <p className={`${isDark ? 'text-[#9a9a89]' : 'text-black'} text-medium`}>Link/URL : {item.url ? <Link target="_blank" className="underline text-blue-700" href={item.url}>{item.url}</Link> : "Website is no longer available or is private only"} </p>
              </div>
              <div className={`${round ? "p-0 m-0" : "mb-4 pb-3 px-3 md:pb-3 md:px-8 "} w-full`}>
                <video className="w-full rounded-lg shadow-lg" autoPlay controls loop>
                    <source src={item.preview} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div
        className={`flex w-full justify-center ${round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""
          }`}
      >
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${currentIndex % items.length === index
                ? round
                  ? "bg-white"
                  : "bg-[#333333]"
                : round
                  ? "bg-[#555]"
                  : "bg-[rgba(51,51,51,0.4)]"
                }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
