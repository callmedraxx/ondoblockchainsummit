'use client';

import { motion, useMotionValue, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const easeCurve: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

// Reusable scroll animation component
const ScrollAnimation = ({ children, className = "", delay = 0, direction = "up" }: { children: React.ReactNode; className?: string; delay?: number; direction?: "up" | "down" | "left" | "right" | "scale" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      scale: direction === "scale" ? 0.8 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: easeCurve,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger animation for lists
const StaggerContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const contentTracks = [
  {
    title: 'Infrastructure & Interoperability',
    description: 'Building the rails for seamless, scalable digital transactions.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        {/* Three interconnected cubes in isometric triangular arrangement */}
        <path d="M8 6L4 10L8 14L12 10L8 6Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M16 10L12 14L16 18L20 14L16 10Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M8 14L4 18L8 22L12 18L8 14Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="10" y1="14" x2="14" y2="18" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    title: 'Regulation, Trust & Policy',
    description: 'Shaping clear, inclusive frameworks for digital innovation.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        {/* Pentagon/house shape */}
        <path d="M12 2L20 7L18 16L6 16L4 7L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        {/* Gavel inside */}
        <rect x="10" y="10" width="4" height="6" rx="0.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <line x1="12" y1="10" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="8" y1="8" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8" cy="8" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: 'Financial Inclusion & User Access',
    description: 'Expanding access to financial tools for the underserved.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        {/* Person head */}
        <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
        {/* Person body */}
        <path d="M6 20C6 16 8 14 12 14C16 14 18 16 18 20" stroke="currentColor" strokeWidth="2" fill="none"/>
        {/* Arc above head */}
        <path d="M8 6C8 6 10 4 12 4C14 4 16 6 16 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Cross-Border Trade & Mobility',
    description: 'Powering frictionless trade, remittances, and mobility.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        {/* Airplane */}
        <path d="M3 12L12 4L21 12L18 14L12 10L6 14L3 12Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M12 10L12 20" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M8 14L16 14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
  },
  {
    title: 'Real-World Adoption',
    description: 'Showcasing solutions solving real problems at scale.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        {/* Globe */}
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M3 12C3 12 6 8 12 8C18 8 21 12 21 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M3 12C3 12 6 16 12 16C18 16 21 12 21 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <line x1="3" y1="7" x2="21" y2="7" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="3" y1="17" x2="21" y2="17" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    title: 'Builders, Capital & Scaling',
    description: 'Connecting founders, capital, and ecosystem enablers.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        {/* Two stacked drawers/rectangles */}
        <rect x="6" y="6" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
        <rect x="6" y="16" width="12" height="6" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
        <line x1="8" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="8" y1="19" x2="16" y2="19" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="18" cy="10" r="1" fill="currentColor"/>
        <circle cx="18" cy="19" r="1" fill="currentColor"/>
      </svg>
    ),
  },
];

const ondoImageGallery = [
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Akure_City%2C_Capital_of_Ondo_State%2C_Nigeria.jpg',
    alt: 'A sweeping view of Akure city, capital of Ondo State, Nigeria.',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Welcome_to_Akure%2C_Ondo_State_.jpg',
    alt: 'The Welcome to Akure, Ondo State signage along the highway.',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/A_rock_in_Akure.jpg',
    alt: 'A dramatic rock formation located within Akure, Ondo State.',
  },
  {
    src: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Idanre_Hill.jpg',
    alt: 'The iconic Idanre Hills landscape near Akure in Ondo State, Nigeria.',
  },
];

function ContentTracksSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [cardsVisible, setCardsVisible] = useState(1);

  useEffect(() => {
    const updateCardsVisible = () => {
      if (window.innerWidth >= 1024) setCardsVisible(3);
      else if (window.innerWidth >= 768) setCardsVisible(2);
      else setCardsVisible(1);
    };
    updateCardsVisible();
    window.addEventListener('resize', updateCardsVisible);
    return () => window.removeEventListener('resize', updateCardsVisible);
  }, []);

  const maxIndex = Math.max(0, contentTracks.length - cardsVisible);
  const cardWidthPercent = 100 / cardsVisible;

  const handleDragEnd = (_event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (info.offset.x < -threshold && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
    x.set(0);
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-16 -left-10 w-72 h-72 rounded-full overflow-hidden shadow-2xl border border-white/40"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: easeCurve }}
        >
          <img
            src={ondoImageGallery[1].src}
            alt={ondoImageGallery[1].alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          className="absolute bottom-10 -right-14 w-80 h-80 rounded-[3rem] overflow-hidden shadow-2xl border border-white/40"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: easeCurve, delay: 0.2 }}
        >
          <img
            src={ondoImageGallery[3].src}
            alt={ondoImageGallery[3].alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white/95" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <ScrollAnimation>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">Shaping What's Next</h2>
          </ScrollAnimation>
          <ScrollAnimation delay={0.2}>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Each content track dives deep into the forces redefining Ondo State's digital economy.
            </p>
          </ScrollAnimation>
        </div>
        
        {/* Desktop: Show grid layout */}
        <StaggerContainer className="hidden lg:grid lg:grid-cols-3 gap-8">
          {contentTracks.map((track, index) => (
            <StaggerItem key={index}>
              <motion.div
                className="bg-[#f5f1e8] p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ y: -8, scale: 1.02, rotate: 1 }}
              >
              <div className="w-20 h-20 mb-6 text-[#2d1f1a]">
                {track.icon}
              </div>
              <h3 className="text-xl font-bold text-[#2d1f1a] mb-4 leading-tight">
                {track.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {track.description}
              </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mobile/Tablet: Show swipeable carousel */}
        <div className="lg:hidden relative overflow-hidden">
          <motion.div
            ref={containerRef}
            className="flex gap-8"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            dragElastic={0.2}
            style={{ x }}
            animate={{
              x: `-${currentIndex * cardWidthPercent}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
          >
            {contentTracks.map((track, index) => (
              <motion.div
                key={index}
                className="bg-[#f5f1e8] p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-grab active:cursor-grabbing flex-shrink-0"
                whileHover={{ y: -4 }}
                style={{ width: `${cardWidthPercent}%` }}
              >
                <div className="w-20 h-20 mb-6 text-[#2d1f1a]">
                  {track.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2d1f1a] mb-4 leading-tight">
                  {track.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  {track.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? 'bg-[#a0430a] w-8' : 'bg-gray-300 w-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#dfe8e6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <a href="#" className="text-[#a0430a] font-bold text-lg">Ondo Blockchain Summit</a>
              <div className="hidden md:flex space-x-6">
                <a href="#speakers" className="text-gray-700 hover:text-[#a0430a] transition">Speakers</a>
                <a href="#hackathon" className="text-gray-700 hover:text-[#a0430a] transition">Hackathon</a>
                <a href="#agenda" className="text-gray-700 hover:text-[#a0430a] transition">Agenda</a>
              </div>
            </div>
            <button className="bg-[#a0430a] text-white px-6 py-2 rounded-full hover:bg-[#8a3a08] transition">
              Register Now
            </button>
          </div>
        </div>
      </nav>
      

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://windows10spotlight.com/wp-content/uploads/2023/11/ff761cca6f7efcda516fce6bd4ba73af.jpg')" }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/70" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 text-white">
            <ScrollAnimation delay={0.1}>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4">
                #OndoSummit2026
              </h1>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <h2 className="text-4xl lg:text-6xl font-bold text-[#a0430a] mb-8">
                Ondo Blockchain Summit 2026
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.3}>
              <p className="text-2xl text-gray-100 mb-12 max-w-3xl mx-auto">
                Welcome to Ondo State's First Conference on Blockchain Innovation
              </p>
            </ScrollAnimation>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <StaggerItem>
                <motion.div 
                  className="bg-[#dfe8e6] p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div 
                    className="text-4xl font-bold text-[#a0430a] mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  >
                    2,500+
                  </motion.div>
                  <div className="text-gray-700">Attendees</div>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div 
                  className="bg-[#dfe8e6] p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div 
                    className="text-4xl font-bold text-[#a0430a] mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.95, type: "spring", stiffness: 200 }}
                  >
                    50+
                  </motion.div>
                  <div className="text-gray-700">Speakers</div>
                </motion.div>
              </StaggerItem>
              <StaggerItem>
                <motion.div 
                  className="bg-[#dfe8e6] p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div 
                    className="text-4xl font-bold text-[#a0430a] mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                  >
                    500+
                  </motion.div>
                  <div className="text-gray-700">C-Suite</div>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>
            <ScrollAnimation delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  className="bg-[#a0430a] text-white px-8 py-4 rounded-full hover:bg-[#8a3a08] transition font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  APPLY TO SPONSOR
                </motion.button>
                <motion.button 
                  className="bg-white border-2 border-[#a0430a] text-[#a0430a] px-8 py-4 rounded-full hover:bg-[#dfe8e6] transition font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register Now
                </motion.button>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Date section */}
      <section className="relative bg-gradient-to-br from-[#dfe8e6] to-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.img
            src={ondoImageGallery[0].src}
            alt={ondoImageGallery[0].alt}
            className="w-full h-full object-cover opacity-50"
            initial={{ scale: 1.1, rotate: -1 }}
            animate={{ scale: 1.02, rotate: 0 }}
            transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/55 to-white/65" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ScrollAnimation delay={0.1}>
              <div className="mb-6">
                <span className="text-[#a0430a] font-semibold text-lg">Ondo State, Nigeria</span>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <div className="mb-6">
                <span className="text-gray-600 text-lg">Livespot Entertainment Center</span>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.3}>
              <div className="mb-8">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">20–21 February 2026</h2>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.4}>
              <div className="mb-8 space-y-2">
                <p className="text-lg text-gray-700">Early bird tickets now available</p>
                <p className="text-lg text-gray-700">Limited seats available</p>
                <p className="text-lg text-gray-700 font-semibold">Join us Live in Ondo State</p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.5} direction="scale">
              <div className="mb-8">
                <span className="text-[#a0430a] font-bold text-xl">#ONDOSUMMIT2026</span>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="relative py-16 bg-[#dfe8e6] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <motion.img
            src={ondoImageGallery[1].src}
            alt={ondoImageGallery[1].alt}
            className="w-full h-full object-cover"
            initial={{ scale: 1.15, rotate: 2 }}
            animate={{ scale: 1.05, rotate: 0 }}
            transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse' }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left space-y-8">
              <ScrollAnimation direction="scale">
                <motion.div 
                  className="bg-white/95 backdrop-blur-lg p-8 rounded-lg shadow-lg border border-white/50"
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)" }}
                >
                  <h3 className="text-2xl font-bold text-[#a0430a] mb-4 tracking-wide uppercase">EKO CONVENTION CENTER</h3>
                  <p className="text-xl text-gray-700 mb-2">ONDO STATE, NIGERIA</p>
                  <p className="text-lg text-gray-600">20–21 FEBRUARY 2026</p>
                </motion.div>
              </ScrollAnimation>
              <ScrollAnimation delay={0.2}>
                <p className="text-gray-700 leading-relaxed">
                  Explore Akure's vibrant energy—from the bustling Alagbaka business district to the serene landscapes that surround the capital of Ondo State. The summit venue places you at the heart of culture, innovation, and natural beauty.
                </p>
              </ScrollAnimation>
            </div>
            <div className="relative flex flex-col gap-6">
              <motion.div
                className="rounded-3xl overflow-hidden shadow-xl border border-white/70"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: easeCurve }}
              >
                <img
                  src={ondoImageGallery[2].src}
                  alt={ondoImageGallery[2].alt}
                  className="w-full h-60 object-cover"
                />
              </motion.div>
              <motion.div
                className="rounded-3xl overflow-hidden shadow-xl border border-white/70 md:ml-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: easeCurve, delay: 0.2 }}
              >
                <img
                  src={ondoImageGallery[3].src}
                  alt={ondoImageGallery[3].alt}
                  className="w-full h-56 object-cover"
                />
              </motion.div>
              <motion.div
                className="absolute -top-8 -right-6 bg-white/90 shadow-lg px-6 py-4 rounded-2xl uppercase text-xs font-semibold tracking-[0.3em] text-[#a0430a]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                Akure • Ondo State
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tracks */}
      <ContentTracksSection />

      {/* Live Performances */}
      <section className="relative py-20 bg-gradient-to-br from-[#dfe8e6] to-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.img
            src={ondoImageGallery[2].src}
            alt={ondoImageGallery[2].alt}
            className="w-full h-full object-cover opacity-35"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1.03 }}
            transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-white/50 to-white/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Live Performances – Feel the Vibe
              </h2>
              <p className="text-xl text-gray-600">
                Experience unforgettable live music at the Ondo Blockchain Summit.
              </p>
            </div>
          </ScrollAnimation>
          <div className="relative mb-16">
            <motion.div
              className="hidden md:grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: easeCurve }}
            >
              {[ondoImageGallery[0], ondoImageGallery[3], ondoImageGallery[1]].map((image, index) => (
                <div key={index} className="rounded-3xl overflow-hidden shadow-lg border border-white/70">
                  <img src={image.src} alt={image.alt} className="w-full h-44 object-cover" />
                </div>
              ))}
            </motion.div>
            <motion.div
              className="absolute -top-12 right-6 bg-white/90 px-4 py-2 rounded-full text-sm font-semibold text-[#a0430a] shadow-md"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Scenes from Akure
            </motion.div>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StaggerItem>
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg text-center"
                whileHover={{ y: -10, scale: 1.05, rotate: -2 }}
              >
                <motion.div 
                  className="w-32 h-32 bg-[#a0430a] rounded-full mx-auto mb-4 flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-white text-4xl">A</span>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Adeola Adedewe</h3>
                <p className="text-gray-600 mb-4">Founder & CEO</p>
                <p className="text-[#a0430a] font-semibold">Kredete</p>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg text-center"
                whileHover={{ y: -10, scale: 1.05, rotate: 2 }}
              >
                <motion.div 
                  className="w-32 h-32 bg-[#a0430a] rounded-full mx-auto mb-4 flex items-center justify-center"
                  whileHover={{ rotate: -360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-white text-4xl">F</span>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Femi Leye</h3>
                <p className="text-gray-600 mb-4">electrifying rhythms on the strings.</p>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg text-center"
                whileHover={{ y: -10, scale: 1.05, rotate: -2 }}
              >
                <motion.div 
                  className="w-32 h-32 bg-[#a0430a] rounded-full mx-auto mb-4 flex items-center justify-center"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-white text-4xl">J</span>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Johnny Drille</h3>
                <p className="text-gray-600 mb-4">soulful sounds that move hearts.</p>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
          <ScrollAnimation delay={0.3}>
            <div className="text-center mt-8">
              <p className="text-xl text-[#a0430a] font-semibold">Music, energy, and pure inspiration.</p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="relative py-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-10 -left-24 w-64 h-64 rounded-full overflow-hidden shadow-2xl border border-white/60"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: easeCurve }}
          >
            <img
              src={ondoImageGallery[0].src}
              alt={ondoImageGallery[0].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute bottom-6 -right-16 w-72 h-72 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/60"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: easeCurve, delay: 0.1 }}
          >
            <img
              src={ondoImageGallery[2].src}
              alt={ondoImageGallery[2].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/45 to-white/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Meet the Voices of Ondo Blockchain Summit
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A glimpse at the thinkers, builders, and leaders shaping Ondo State's financial and innovation future.
              </p>
            </div>
          </ScrollAnimation>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Adeola Adedewe", title: "Founder & CEO", company: "Kredete" },
              { name: "Clarisse Hagege", title: "Founder And CEO", company: "Dfns" },
              { name: "Jeff Handler", title: "Founder & CCO", company: "OpenTrade" },
              { name: "Ogedegbe Uyoyo", title: "Managing Director, MD", company: "cNGN" },
              { name: "Gabriel Olokunwonlu", title: "Founder And CEO", company: "Khaime" },
              { name: "Yele W. Oyekola", title: "Founder & CEO", company: "Duplo" },
              { name: "Bentzi Rabi", title: "Founder & CEO", company: "Utila" },
              { name: "Amar Odedra", title: "Head of Investments", company: "Algorand Ventures" },
            ].map((speaker, idx) => (
              <StaggerItem key={idx}>
                <motion.div 
                  className="bg-[#dfe8e6] p-6 rounded-lg text-center"
                  whileHover={{ y: -8, scale: 1.05, rotate: 1 }}
                >
                  <motion.div 
                    className="w-24 h-24 bg-[#a0430a] rounded-full mx-auto mb-4 flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white text-2xl font-bold">{speaker.name[0]}</span>
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{speaker.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{speaker.title}</p>
                  <p className="text-[#a0430a] font-semibold text-sm">{speaker.company}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <ScrollAnimation delay={0.3}>
            <div className="text-center mt-12">
              <motion.button 
                className="text-[#a0430a] font-semibold hover:underline"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full Speaker Lineup
              </motion.button>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Agenda Section */}
      <section id="agenda" className="relative py-20 bg-[#dfe8e6] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.img
            src={ondoImageGallery[3].src}
            alt={ondoImageGallery[3].alt}
            className="w-full h-full object-cover opacity-30"
            initial={{ scale: 1.12, y: 20 }}
            animate={{ scale: 1.05, y: 0 }}
            transition={{ duration: 16, repeat: Infinity, repeatType: 'mirror' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#dfe8e6]/60 via-white/50 to-[#dfe8e6]/55" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">Agenda Overview</h2>
            </div>
          </ScrollAnimation>
          <StaggerContainer className="space-y-12">
            <StaggerItem>
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg"
                whileHover={{ x: 10, scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold text-[#a0430a] mb-4">Thursday, February 19th, 2026</h3>
                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold">Pre-Summit Hackathon & Builder Day</p>
                  <p className="font-semibold">Interactive Exhibitions</p>
                  <p>Side Events & Mixers</p>
                </div>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg"
                whileHover={{ x: 10, scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold text-[#a0430a] mb-4">Friday, February 20th, 2026</h3>
                <div className="space-y-2 text-gray-700">
                  <p>Registration & Breakfast</p>
                  <p>Welcome Remarks</p>
                  <p>Keynote & Fireside Chat</p>
                  <p>Panel Sessions</p>
                  <p>Breakout Sessions</p>
                  <p>Demo & Product Showcase</p>
                  <p>Lunch Break & Networking</p>
                  <p>Afternoon Panels Sessions</p>
                  <p className="mt-4 font-semibold">All-Day Immersive Experiences</p>
                  <p>- Curated Networking Sessions</p>
                  <p>- Interactive Exhibitions</p>
                  <p>- Product Demos & Startup Pitches</p>
                </div>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg"
                whileHover={{ x: 10, scale: 1.02 }}
              >
                <h3 className="text-2xl font-bold text-[#a0430a] mb-4">Saturday, February 21st, 2026</h3>
                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold">Closing Beach Celebration</p>
                  <p>Side Events & Mixers</p>
                </div>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Creator Corner */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute inset-x-0 top-0 h-64"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <img
              src={ondoImageGallery[1].src}
              alt={ondoImageGallery[1].alt}
              className="w-full h-full object-cover opacity-30"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/55 to-white/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Creator Corner – Be Part of the Movement
              </h2>
              <p className="text-xl text-gray-600">
                Celebrate Ondo State's boldest voices in tech and creativity.
              </p>
            </div>
          </ScrollAnimation>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Kagan", "Eric"].map((name, idx) => (
              <StaggerItem key={idx}>
                <motion.div 
                  className="bg-[#dfe8e6] p-8 rounded-lg text-center"
                  whileHover={{ y: -10, scale: 1.05, rotate: 2 }}
                >
                  <motion.div 
                    className="w-32 h-32 bg-[#a0430a] rounded-full mx-auto mb-4 flex items-center justify-center"
                    whileHover={{ rotate: 360, scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="text-white text-4xl font-bold">{name[0]}</span>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900">{name}</h3>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Hackathon Section */}
      <section id="hackathon" className="relative py-20 bg-gradient-to-br from-[#dfe8e6] to-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.img
            src={ondoImageGallery[0].src}
            alt={ondoImageGallery[0].alt}
            className="w-full h-full object-cover opacity-25"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-[#dfe8e6]/50 to-white/55" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Building Ondo State's Stable Future with Blockchain
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A 10-week hybrid program designed to connect Ondo State's top talent with real-world blockchain challenges.
              </p>
            </div>
          </ScrollAnimation>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <StaggerItem>
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg text-center"
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <h3 className="text-2xl font-bold text-[#a0430a] mb-4">Price</h3>
                <p className="text-gray-700">Bonus prizes for innovation & community impact</p>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg text-center"
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <h3 className="text-2xl font-bold text-[#a0430a] mb-4">Timeline</h3>
                <p className="text-gray-700">July 2 – September 10, 2026</p>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg text-center"
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <h3 className="text-2xl font-bold text-[#a0430a] mb-4">Team Size</h3>
                <p className="text-gray-700 mb-2">4–5 members per team</p>
                <p className="text-sm text-gray-600">Focus Areas: Blockchain, Fintech, Stablecoins, Impact, DeFi</p>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute inset-x-0 bottom-0 h-72"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.35 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={ondoImageGallery[2].src}
              alt={ondoImageGallery[2].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-white/55 to-white/70" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScrollAnimation>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Title Sponsor</h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2} direction="scale">
              <motion.div 
                className="bg-[#dfe8e6] p-12 rounded-lg mb-12"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-[#a0430a] font-bold text-2xl">Sponsor Logo</div>
              </motion.div>
            </ScrollAnimation>
            <ScrollAnimation delay={0.3}>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Other Sponsors</h2>
            </ScrollAnimation>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <StaggerItem key={i}>
                  <motion.div 
                    className="bg-[#dfe8e6] p-8 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                  >
                    <div className="text-[#a0430a] font-semibold text-center">Sponsor {i}</div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <ScrollAnimation delay={0.4}>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Companies That Attend</h2>
            </ScrollAnimation>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <StaggerItem key={i}>
                  <motion.div 
                    className="bg-[#dfe8e6] p-8 rounded-lg"
                    whileHover={{ scale: 1.1, rotate: -2 }}
                  >
                    <div className="text-[#a0430a] font-semibold text-center">Company {i}</div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
            <ScrollAnimation delay={0.5}>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Media Partners</h2>
            </ScrollAnimation>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <StaggerItem key={i}>
                  <motion.div 
                    className="bg-[#dfe8e6] p-8 rounded-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="text-[#a0430a] font-semibold text-center">Media {i}</div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#a0430a] to-[#8a3a08] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-25 pointer-events-none mix-blend-screen">
          <motion.img
            src={ondoImageGallery[3].src}
            alt={ondoImageGallery[3].alt}
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 22, repeat: Infinity, repeatType: 'mirror' }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation direction="scale">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Don't Miss Ondo State's Boldest Innovation Summit
            </h2>
          </ScrollAnimation>
          <ScrollAnimation delay={0.2}>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Secure your spot to connect with fintech leaders, policy shapers, builders, and investors shaping Ondo State's digital economy.
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={0.3}>
            <motion.button 
              className="bg-white text-[#a0430a] px-8 py-4 rounded-full hover:bg-[#dfe8e6] transition font-semibold text-lg"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Ticket Now
            </motion.button>
          </ScrollAnimation>
          <ScrollAnimation delay={0.4}>
            <p className="mt-4 text-lg">Tickets are limited. Be part of the movement.</p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="relative py-20 bg-[#dfe8e6] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.img
            src={ondoImageGallery[1].src}
            alt={ondoImageGallery[1].alt}
            className="w-full h-full object-cover opacity-35"
            initial={{ scale: 1.1, x: -20 }}
            animate={{ scale: 1.03, x: 0 }}
            transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#dfe8e6]/55 via-white/50 to-[#dfe8e6]/55" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay in the Loop</h2>
          </ScrollAnimation>
          <ScrollAnimation delay={0.2}>
            <p className="text-lg text-gray-600 mb-8">
              Be the first to hear about new speakers, schedules, and exclusive updates.
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={0.3}>
            <motion.form 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a0430a]"
                whileFocus={{ scale: 1.05 }}
              />
              <motion.button
                type="submit"
                className="bg-[#a0430a] text-white px-8 py-3 rounded-full hover:bg-[#8a3a08] transition font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Notify Me
              </motion.button>
            </motion.form>
          </ScrollAnimation>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-gray-950 text-white py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-24 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-[#facc15]/40 via-[#f97316]/20 to-transparent opacity-80 blur-3xl mix-blend-screen" />
          <div className="absolute -bottom-40 right-0 h-[36rem] w-[36rem] rounded-full bg-gradient-to-tr from-[#fde68a]/20 via-[#db2777]/25 to-transparent opacity-70 blur-3xl mix-blend-screen" />
          <div className="absolute top-1/2 left-1/2 h-[24rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 rotate-6 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-60 blur-2xl" />
        </div>

        <div className="relative px-4 sm:px-6 lg:px-10">
          <ScrollAnimation>
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              <h3 className="text-lg md:text-xl font-semibold tracking-[0.35em] uppercase text-white/70">
                Connect With Us Online
              </h3>
              <motion.div 
                className="w-full max-w-[min(92vw,60rem)] font-black uppercase tracking-[0.06em] sm:tracking-[0.1em] md:tracking-[0.14em] lg:tracking-[0.18em] text-white/90 leading-tight drop-shadow-[0_30px_60px_rgba(160,67,10,0.45)] mx-auto whitespace-nowrap"
                style={{ fontSize: "clamp(1.9rem, 4.8vw, 4.75rem)" }}
                whileHover={{ scale: 1.03, y: -6 }}
              >
                #OndoSummit2026
              </motion.div>
            </div>
          </ScrollAnimation>
        </div>
      </footer>
    </div>
  );
}
