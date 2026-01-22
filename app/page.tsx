'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import BaseImage from "@/components/BaseImage"
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext"
import { useTranslations } from "@/hooks/useTranslations"
import PdfModal from "@/components/PdfModal"
import ContactSection from "@/components/ContactSection"

// Helper function to get proper image path for GitHub Pages
const getImagePath = (path: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/Hupscale_Finale' : ''
  return `${basePath}${path}`
}

// Image constants from Figma - Updated with exact Figma assets
const imgVideo = "/fe540649cf394e58a3b8ab82969a56c8986eabd0.png";
const imgImage = "/ca16dd70619f6181cdc0736e25281ce5ce01a00f.png";
const imgImage1 = "/9f9c6ec5cd42f0de2ce9daa8177aea3ffbd1c251.png";
const imgImage2 = "/60e78bf03c5763350f3f59eb986b8f1161881bf8.png";
const imgImage15 = "/90b0d00cdb8d93a4639e55a1c4c931e564f43944.png";

// Exact Figma icon assets with yellow circular backgrounds
const imgVector = "/81417d56ddb0e91c48261e33fa79e8836ffe91fb.svg";
const imgGroup = "/ddb0f713051b1968eb5b31559b96b90e0d5b8269.svg";
const imgGroup1 = "/247fdaea7f0190f36fe3725ca7f53bfbbf32e6dd.svg";
const imgGroup2 = "/f302ba4a760693ecef74be423376db6cbfdcdd8b.svg";
const imgGroup3 = "/d0ddeba688dce871000a2f59380399df9f722106.svg";
const imgGroup4 = "/97bf03cf831983789e546c82b209089c2e88c5d4.svg";
const imgGroup5 = "/19b982bde308c54c36c8b1041c97ddacad9e504f.svg";
const imgGroup6 = "/2628b9befc9bfb78ab53b4208d27350d2c3c79b0.svg";
const imgGroup7 = "/87e17e7ac1aac184f78d55c1bae380d352574d1e.svg";
const imgGroup8 = "/413721b31b56ea1b3c4a7cfe47ea585c51af8dd7.svg";
const imgGroup9 = "/dac0790b5695b094e9224eaf2e3e8618c2352bff.svg";
const imgGroup10 = "/db2269603e19b2893ac9b7f4b68e0def59298972.svg";
const imgGroup11 = "/1d4bc412bcf41351946fd6762cb511d557e44ddd.svg";
const imgGroup12 = "/b11a2b22ff9f4ab6e12557d4b40dfdd0e7d1d50c.svg";
const imgGroup13 = "/ec7e36d90074dcb2987757da53887cf07309485c.svg";
const imgGroup14 = "/cbaba1434d448391a98b32934ddbef4a6bd4c3f9.svg";
const imgGroup15 = "/778292292843c35f3ccd007069f4bfa68a27e3f0.svg";
const imgGroup16 = "/5bb61d9240d8a6618426ce2fdcd073a203bb1899.svg";
const imgGroup17 = "/ab3cb107a656ec2efc0e2aa893521b21c5dc0f95.svg";
const imgGroup18 = "/a055e9a0312f2cada01d3d71c58169355ad7d8be.svg";

// Correct icons from Figma icons page (exact matches from node 12-1880)
const imgIconMotorsport = "/247fdaea7f0190f36fe3725ca7f53bfbbf32e6dd.svg";
const imgIconContentCreators = "/d0ddeba688dce871000a2f59380399df9f722106.svg";
const imgIconGolfAthletes = "/19b982bde308c54c36c8b1041c97ddacad9e504f.svg";
const imgIconSoccerTeams = "/2628b9befc9bfb78ab53b4208d27350d2c3c79b0.svg";
const imgIconPersonalBrand = "/dac0790b5695b094e9224eaf2e3e8618c2352bff.svg";
const imgIconRealEstate = "/b11a2b22ff9f4ab6e12557d4b40dfdd0e7d1d50c.svg";
const imgIconModels = "/cbaba1434d448391a98b32934ddbef4a6bd4c3f9.svg";
const imgIconInfluencers = "/413721b31b56ea1b3c4a7cfe47ea585c51af8dd7.svg";
const imgIconCarRentals = "/5bb61d9240d8a6618426ce2fdcd073a203bb1899.svg";
const imgIconMedical = "/a055e9a0312f2cada01d3d71c58169355ad7d8be.svg";

// Service card data
const serviceCards = {
  'Social Media': {
    backgroundImage: '/4e74ec9b8a2bccfe99d73407a423b8bc34be4d99.png',
    title: 'Social media',
    content: [
      {
        label: 'Boost AI:',
        description: ' Hupscale helps you upscale your content — smarter reach, more freedom.'
      },
      {
        label: 'Engagement Groups:',
        description: ' Upscale your community with Hupscale — connect, grow, repeat.'
      },
      {
        label: 'Community Manager:',
        description: ' Your life is offline. Hupscale keeps your presence upscale — always on point.'
      }
    ]
  },
  'Website': {
    backgroundImage: '/website-bg.png',
    title: 'Website',
    content: [
      {
        label: 'Landing Page:',
        description: ' Perfect for course sale, subscription boosts, early projects needing idea validation.'
      },
      {
        label: 'Corporative web:',
        description: ' recommended for businesses seeking analytics measurement, SEO strategy, and Google visibility.'
      },
      {
        label: 'E-commerce:',
        description: ' Suggested for companies with validated products and internal web management capabilities.'
      }
    ]
  },
  'Design': {
    backgroundImage: '/design-bg.png',
    title: 'Design',
    content: [
      {
        label: 'Brand Identity:',
        description: ' Complete visual identity creation including logo, colors, and brand guidelines.'
      },
      {
        label: 'UI/UX Design:',
        description: ' User-centered design approach for optimal user experience and interface design.'
      },
      {
        label: 'Print Design:',
        description: ' Professional print materials including brochures, business cards, and marketing collateral.'
      }
    ]
  },
  'Press': {
    backgroundImage: '/press-bg.png',
    title: 'Press',
    content: [
      {
        label: 'Media Relations:',
        description: ' Strategic media outreach and relationship building with key industry publications.'
      },
      {
        label: 'Press Releases:',
        description: ' Professional press release writing and distribution to relevant media outlets.'
      },
      {
        label: 'Crisis Management:',
        description: ' Proactive crisis communication strategies and reputation management services.'
      }
    ]
  }
};

function HomeContent() {
  const { t, language } = useTranslations();
  const { setLanguage } = useLanguage();
  const [activeService, setActiveService] = useState('Social Media');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [expandedBios, setExpandedBios] = useState<{[key: number]: boolean}>({});
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Get translated testimonials data
  const getTestimonials = () => [
    {
      id: 1,
      name: "Haesoo",
      image: "/idolnation_.jpg",
      instagram: "IdolNation_",
      text: t('testimonials.reviews.haesoo')
    },
    {
      id: 2,
      name: "Josef L.",
      image: "/JosefCEO.jpg",
      instagram: "Josef.Ceo",
      text: t('testimonials.reviews.josef')
    },
    {
      id: 3,
      name: "Géraud D.",
      image: "/Gereau_Dellea.jpg",
      instagram: "Geraud_Dellea",
      text: t('testimonials.reviews.geraud')
    },
    {
      id: 4,
      name: "Anissa L.",
      image: "/AnissaLalahoum.jpg",
      instagram: "AnissaLalahoum",
      text: t('testimonials.reviews.anissa')
    },
    {
      id: 5,
      name: "Rory H.",
      image: "/RoryHarven.jpg",
      instagram: "RoryHarven",
      text: t('testimonials.reviews.rory')
    },
    {
      id: 6,
      name: "Franck B.",
      image: "/FrankBurnss_.jpg",
      instagram: "FrankBurnss_",
      text: t('testimonials.reviews.franck')
    },
    {
      id: 7,
      name: "Jazmin P.",
      image: "/JazminmPerez.jpg",
      instagram: "JazminmPerez",
      text: t('testimonials.reviews.jazmin')
    }
  ];

  // Get translated FAQ data
  const getFaqs = () => [
    {
      q: t('faq.questions.whyChoose'),
      a: t('faq.answers.whyChoose')
    },
    {
      q: t('faq.questions.whyGrow'),
      a: t('faq.answers.whyGrow')
    },
    {
      q: t('faq.questions.guarantees'),
      a: t('faq.answers.guarantees')
    },
    {
      q: t('faq.questions.information'),
      a: t('faq.answers.information')
    }
  ];

  // Get translated service card data
  const getServiceCard = (service: string) => {
    const serviceKey = service.replace(' ', '').toLowerCase();
    const originalCard = serviceCards[service as keyof typeof serviceCards];
    
    if (!originalCard) return null;
    
    return {
      backgroundImage: originalCard.backgroundImage,
      title: t(`services.${serviceKey === 'socialmedia' ? 'socialMedia' : serviceKey}.title`),
      content: originalCard.content.map((item, index) => {
        const keys = ['boostAI', 'engagementGroups', 'communityManager'];
        const websiteKeys = ['landingPage', 'corporativeWeb', 'ecommerce'];
        const designKeys = ['brandIdentity', 'uiUxDesign', 'printDesign'];
        const pressKeys = ['mediaRelations', 'pressReleases', 'crisisManagement'];
        
        let contentKeys = keys;
        if (service === 'Website') contentKeys = websiteKeys;
        else if (service === 'Design') contentKeys = designKeys;
        else if (service === 'Press') contentKeys = pressKeys;
        
        const contentKey = contentKeys[index];
        return {
          label: t(`services.${serviceKey === 'socialmedia' ? 'socialMedia' : serviceKey}.${contentKey}.label`),
          description: t(`services.${serviceKey === 'socialmedia' ? 'socialMedia' : serviceKey}.${contentKey}.description`)
        };
      })
    };
  };

  // GALLERY CAROUSEL FOR HUPSCALE YOUR BUSINESS SECTION
  const galleryImages = [
    "/AiDesign-Shopfront3dlogobillboardmockup.png",
    "/AiDesign-BusinessmanisworkingoncomputeradobeAIinterfacevilogoprototyperenderings.png",
    "/AiDesign-Papertearingvilogomockuprenderings.png",
    "/AiDesign-Outdoorstreetwallbillboardlogomockup.png",
    "/AiDesign-Outdoorwallshadowbillboardlogomockup.png",
    "/AiDesign-Outdoorgoldenbillboardlogodisplayeffect.png"
  ];

  const [galleryIndex, setGalleryIndex] = useState(0);

  // Auto-scroll gallery every 4 seconds
  useEffect(() => {
    const galleryInterval = setInterval(() => {
      setGalleryIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(galleryInterval);
  }, []);

  const GalleryCarousel = () => (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
      {galleryImages.map((img, idx) => (
        <div
          key={idx}
          className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000"
          style={{
            opacity: galleryIndex === idx ? 1 : 0,
            zIndex: galleryIndex === idx ? 1 : 0
          }}
        >
          <BaseImage
            src={img}
            alt={`Gallery ${idx + 1}`}
            className="w-full h-full object-cover"
          />
          {/* Semi-transparent dark overlay for better text readability */}
          <div 
            className="absolute top-0 left-0 w-full h-full" 
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          />
        </div>
      ))}
    </div>
  );

  // TESTIMONIALS CAROUSEL - 50 CARD INFINITE SCROLL IMPLEMENTATION
  
  // FIGMA SPECIFICATIONS WITH NATURAL FLOW
  // Mobile: full width minus padding, Desktop: Figma spec
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  const isMobile = windowWidth < 1024
  const CARD_WIDTH = isMobile ? windowWidth - 64 : 354.4 // Full width on mobile, Figma width on desktop
  const CARD_HEIGHT = 390 // Exact height from Figma
  const GAP = isMobile ? 16 : 32 // Smaller gap on mobile
  const STEP = CARD_WIDTH + GAP // Used for transform calculations
  
  // CREATE EXACTLY 50 TESTIMONIAL CARDS (10 SETS OF 5)
  const createInfiniteArray = () => {
    const baseTestimonials = [...getTestimonials()] // 5 cards
    const infiniteArray = []
    for (let i = 0; i < 10; i++) { // Repeat 10 times = 50 cards total
      infiniteArray.push(...baseTestimonials.map(t => ({...t, id: `${t.id}-set${i}` })))
    }
    return infiniteArray
  }
  const infiniteTestimonials = createInfiniteArray()
  
  const [currentIndex, setCurrentIndex] = useState(20) // Start at card 20 (middle)
  // Disable auto-play on mobile, enable on desktop
  const [isAutoPlaying, setIsAutoPlaying] = useState(typeof window !== 'undefined' && window.innerWidth >= 1024)

  // NATURAL VIEWPORT EDGE CUTTING - Center 3 cards, let viewport cut the edges naturally
  const translateX = -((currentIndex - 0.5) * STEP)

  // Automatic rotation with boundary resets (disabled on mobile)
  useEffect(() => {
    // Only auto-play on desktop
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024
    if (!isAutoPlaying || !isDesktop) return
    
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        let nextIndex = prevIndex + 1
        
        // When index > 35: jump to index - 25
        if (nextIndex > 35) {
          nextIndex = nextIndex - 25
        }
        
        return nextIndex
      })
    }, 3000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Left arrow navigation with boundary reset
  const handlePrevious = () => {
    setIsAutoPlaying(false) // Pause auto-rotation
    
    setCurrentIndex(prevIndex => {
      let nextIndex = prevIndex - 1
      
      // When index < 10: jump to index + 25
      if (nextIndex < 10) {
        nextIndex = nextIndex + 25
      }
      
      return nextIndex
    })
    
    // Resume auto-rotation after 4 seconds
    setTimeout(() => setIsAutoPlaying(true), 4000)
  }

  // Right arrow navigation with boundary reset
  const handleNext = () => {
    setIsAutoPlaying(false) // Pause auto-rotation
    
    setCurrentIndex(prevIndex => {
      let nextIndex = prevIndex + 1
      
      // When index > 35: jump to index - 25
      if (nextIndex > 35) {
        nextIndex = nextIndex - 25
      }
      
      return nextIndex
    })
    
    // Resume auto-rotation after 4 seconds (only on desktop)
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024
    if (isDesktop) {
      setTimeout(() => setIsAutoPlaying(true), 4000)
    }
  }

  // Touch swipe handlers for mobile
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swiped left - go to next
      handleNext()
    }
    if (touchStart - touchEnd < -75) {
      // Swiped right - go to previous
      handlePrevious()
    }
  }

  // Handle service change with animation
  const handleServiceChange = (service: string) => {
    if (service !== activeService) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveService(service);
        setIsAnimating(false);
      }, 200); // Half of the animation duration
    }
  };


  useEffect(() => {
    // Simple CSS for carousel scrollbars only
    const style = document.createElement('style');
    style.setAttribute('data-carousel-styles', 'true');
    style.textContent = `
      /* Hide scrollbars for clean carousel look */
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      
      /* Prevent horizontal scroll */
      body {
        overflow-x: hidden;
      }
      
      /* Text wrapping for French translations */
      h1, h2, h3, h4, h5, h6 {
        word-break: break-word;
        white-space: normal;
        hyphens: auto;
      }
      
      /* Ensure section containers can handle longer text */
      .sticky section, section {
        word-wrap: break-word;
        overflow-wrap: break-word;
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      const existingStyle = document.querySelector('style[data-carousel-styles]');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Responsive navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-fit px-4" style={{
        backgroundColor: 'rgb(244, 244, 244)',
        borderRadius: '206px',
        height: '60px',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0 auto',
        border: '1px solid rgb(35, 35, 35)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 9999,
        minWidth: 'fit-content'
      }}>
        
        {/* HUPSCALE Logo - Image */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            visibility: 'visible',
            opacity: 1,
            zIndex: 10001
          }}
          aria-label="Scroll to top"
        >
          <img 
            src={getImagePath("/HUPSCALE%20Without%20Slogan.png")}
            alt="Hupscale logo"
            className="navbar-logo"
            style={{
              height: '40px',
              width: 'auto',
              display: 'block',
              visibility: 'visible',
              opacity: 1,
              zIndex: 10000,
              objectFit: 'contain'
            }}
          />
        </button>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden flex items-center justify-center mobile-menu-button text-[rgb(35,35,35)]" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            marginLeft: 'auto',
            zIndex: 10001,
            position: 'relative'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div 
          className="hidden md:flex items-center flex-1 justify-center"
          style={{ gap: '12px' }}
        >
          {/* Benefits */}
          <button
            onClick={() => {
              // Simple scroll with timing that works with sticky animations
              setTimeout(() => {
                window.scrollTo({ top: window.innerHeight * 1, behavior: 'smooth' });
              }, 100);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgb(35, 35, 35)',
              fontSize: '13px',
              fontWeight: '500',
              fontFamily: 'LEMONMILK, Morgan, sans-serif',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              borderRadius: '100px',
              padding: '8px 12px',
              backgroundColor: 'rgba(0, 0, 0, 0)'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = 'rgb(0, 176, 129)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            }}
          >
            {t('navigation.benefits')}
          </button>

          {/* Services */}
          <button
            onClick={() => {
              setTimeout(() => {
                window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' });
              }, 100);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgb(35, 35, 35)',
              fontSize: '13px',
              fontWeight: '500',
              fontFamily: 'LEMONMILK, Morgan, sans-serif',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              borderRadius: '100px',
              padding: '8px 12px',
              backgroundColor: 'rgba(0, 0, 0, 0)'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = 'rgb(0, 176, 129)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            }}
          >
            {t('navigation.services')}
          </button>

          {/* Testimonials */}
          <button
            onClick={() => {
              setTimeout(() => {
                window.scrollTo({ top: window.innerHeight * 4, behavior: 'smooth' });
              }, 100);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgb(35, 35, 35)',
              fontSize: '13px',
              fontWeight: '500',
              fontFamily: 'LEMONMILK, Morgan, sans-serif',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              borderRadius: '100px',
              padding: '8px 12px',
              backgroundColor: 'rgba(0, 0, 0, 0)'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = 'rgb(0, 176, 129)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            }}
          >
            {t('navigation.testimonials')}
          </button>

          {/* FAQ's */}
          <button
            onClick={() => {
              setTimeout(() => {
                window.scrollTo({ top: window.innerHeight * 6, behavior: 'smooth' });
              }, 100);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgb(35, 35, 35)',
              fontSize: '13px',
              fontWeight: '500',
              fontFamily: 'LEMONMILK, Morgan, sans-serif',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              borderRadius: '100px',
              padding: '8px 12px',
              backgroundColor: 'rgba(0, 0, 0, 0)'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = 'rgb(0, 176, 129)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            }}
          >
            {t('navigation.faqs')}
          </button>

          {/* Guestbook / Livre d'Or */}
          <button
            onClick={() => {
              window.location.href = getImagePath('/livre-dor/');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgb(35, 35, 35)',
              fontSize: '13px',
              fontWeight: '500',
              fontFamily: 'LEMONMILK, Morgan, sans-serif',
              transition: 'background-color 0.3s ease',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              borderRadius: '100px',
              padding: '8px 12px',
              backgroundColor: 'rgba(0, 0, 0, 0)'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = 'rgb(0, 176, 129)';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            }}
          >
            {t('navigation.guestbook')}
          </button>
        </div>
        
        {/* Language Toggle Buttons */}
        <div 
          className="hidden md:flex items-center"
          style={{ gap: '6px', marginLeft: '12px' }}
        >
          {/* French Flag Button */}
          <button
            aria-label={t('navigation.switchToFrench')}
            className={`w-10 h-10 rounded-full border-0 bg-white flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-gray-50 cursor-pointer shadow-sm ${
              language === 'fr' ? 'ring-2 ring-[#007B79] ring-offset-2' : ''
            }`}
            onClick={() => setLanguage('fr')}
          >
            <svg width="24" height="24" viewBox="0 0 24 18" className="w-6 h-4">
              <rect x="0" y="0" width="8" height="18" fill="#002395"/>
              <rect x="8" y="0" width="8" height="18" fill="#FFFFFF"/>
              <rect x="16" y="0" width="8" height="18" fill="#ED2939"/>
            </svg>
          </button>
          
          {/* British Flag Button */}
          <button
            aria-label={t('navigation.switchToEnglish')}
            className={`w-10 h-10 rounded-full border-0 bg-white flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-gray-50 cursor-pointer shadow-sm ${
              language === 'en' ? 'ring-2 ring-[#007B79] ring-offset-2' : ''
            }`}
            onClick={() => setLanguage('en')}
          >
            <svg width="24" height="24" viewBox="0 0 24 18" className="w-6 h-4">
              <rect width="24" height="18" fill="#012169"/>
              <path d="M0,0 L24,18 M24,0 L0,18" stroke="#FFFFFF" strokeWidth="2"/>
              <path d="M0,0 L24,18 M24,0 L0,18" stroke="#C8102E" strokeWidth="1"/>
              <path d="M12,0 L12,18 M0,9 L24,9" stroke="#FFFFFF" strokeWidth="3"/>
              <path d="M12,0 L12,18 M0,9 L24,9" stroke="#C8102E" strokeWidth="2"/>
            </svg>
          </button>
        </div>
        
        {/* Get Started Button - Responsive */}
        <a
          href="mailto:contact@hupscale.com"
          className="hidden md:block bg-[rgb(0,123,121)] text-[rgb(5,5,5)] border border-[rgb(5,5,5)] rounded-full px-4 lg:px-5 py-2 lg:py-3 text-xs lg:text-sm font-medium font-inter cursor-pointer transition-all duration-200 shadow-sm whitespace-nowrap no-underline inline-block text-center"
          style={{ marginLeft: '12px', fontSize: '13px', fontFamily: 'LEMONMILK, Morgan, sans-serif' }}
        >
          {t('navigation.getStarted')}
        </a>
        
      </nav>

      {/* Mobile Menu Overlay - Outside nav for proper z-index stacking */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay md:hidden fixed inset-0 bg-black bg-opacity-50"
          style={{ zIndex: 100000 }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="fixed top-20 left-4 right-4 bg-white rounded-2xl p-6 shadow-xl"
            style={{ 
              maxWidth: 'calc(100vw - 32px)', 
              zIndex: 100001,
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          > 
            <div className="flex flex-col space-y-4">
              <button
                className="text-left min-h-[44px] py-3 px-4 text-[rgb(35,35,35)] hover:bg-gray-100 rounded-lg"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    window.scrollTo({ top: window.innerHeight * 1, behavior: 'smooth' });
                  }, 100);
                }}
              >
                {t('navigation.benefits')}
              </button>
              <button
                className="text-left min-h-[44px] py-3 px-4 text-[rgb(35,35,35)] hover:bg-gray-100 rounded-lg"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' });
                  }, 100);
                }}
              >
                {t('navigation.services')}
              </button>
              <button
                className="text-left min-h-[44px] py-3 px-4 text-[rgb(35,35,35)] hover:bg-gray-100 rounded-lg"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    window.scrollTo({ top: window.innerHeight * 4, behavior: 'smooth' });
                  }, 100);
                }}
              >
                {t('navigation.testimonials')}
              </button>
              <button
                className="text-left min-h-[44px] py-3 px-4 text-[rgb(35,35,35)] hover:bg-gray-100 rounded-lg"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    window.scrollTo({ top: window.innerHeight * 6, behavior: 'smooth' });
                  }, 100);
                }}
              >
                {t('navigation.faqs')}
              </button>
              
              {/* Language Toggle Buttons - Mobile */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {/* French Flag Button */}
                <button
                  aria-label={t('navigation.switchToFrench')}
                  className={`w-10 h-10 rounded-full border-0 bg-white flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-gray-50 cursor-pointer shadow-sm ${
                    language === 'fr' ? 'ring-2 ring-[#007B79] ring-offset-2' : ''
                  }`}
                  onClick={() => setLanguage('fr')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 18" className="w-6 h-4">
                    <rect x="0" y="0" width="8" height="18" fill="#002395"/>
                    <rect x="8" y="0" width="8" height="18" fill="#FFFFFF"/>
                    <rect x="16" y="0" width="8" height="18" fill="#ED2939"/>
                  </svg>
                </button>
                
                {/* British Flag Button */}
                <button
                  aria-label={t('navigation.switchToEnglish')}
                  className={`w-10 h-10 rounded-full border-0 bg-white flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-gray-50 cursor-pointer shadow-sm ${
                    language === 'en' ? 'ring-2 ring-[#007B79] ring-offset-2' : ''
                  }`}
                  onClick={() => setLanguage('en')}
                >
                  <svg width="24" height="24" viewBox="0 0 24 18" className="w-6 h-4">
                    <rect width="24" height="18" fill="#012169"/>
                    <path d="M0,0 L24,18 M24,0 L0,18" stroke="#FFFFFF" strokeWidth="2"/>
                    <path d="M0,0 L24,18 M24,0 L0,18" stroke="#C8102E" strokeWidth="1"/>
                    <path d="M12,0 L12,18 M0,9 L24,9" stroke="#FFFFFF" strokeWidth="3"/>
                    <path d="M12,0 L12,18 M0,9 L24,9" stroke="#C8102E" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
              
              <a
                href="mailto:contact@hupscale.com"
                className="bg-[rgb(0,123,121)] text-[rgb(5,5,5)] border border-[rgb(5,5,5)] rounded-full px-6 py-3 text-sm font-medium text-center mt-4 no-underline inline-block"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                }}
              >
                {t('navigation.getStarted')}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Scroll container wrapper around ALL sticky sections */}
      <div className="scroll-container">
        
        {/* Section 1: Hero - Base layer */}
        <section className="sticky top-0 h-screen w-full" style={{ zIndex: 1, background: '#1a1a1a' }}>
        {/* Video Container with Mobile Optimization */}
        <div className="hero-video-container absolute inset-0 w-full h-full">
          <video 
            className="hero-video absolute inset-0 w-full h-full object-cover"
            style={{
              objectFit: 'cover',
              objectPosition: 'center center',
              width: '100%',
              height: '100%',
              minWidth: '100%',
              minHeight: '100%',
              maxWidth: '100%',
              maxHeight: '100%'
            }}
            src={getImagePath("/HUPSCALE_Final.mp4")}
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            preload="metadata"
            poster={getImagePath("/video-poster.jpg")}
            onEnded={(e) => {
              const video = e.target as HTMLVideoElement;
              video.currentTime = 0;
              video.play();
            }}
          />
          
          {/* Mobile Video Quality Enhancement Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-10 sm:bg-opacity-0 pointer-events-none" />
        </div>
        </section>

        {/* Section 2: What is Hupscale - Layer 2 */}
        <section className="sticky top-0 h-screen w-full" style={{ zIndex: 2, background: '#007B79', minHeight: '100vh' }}>
        <div className="flex w-full h-full flex-col lg:flex-row items-center justify-between gap-4 sm:gap-8 lg:gap-16 px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16">
        {/* What is Hupscale - Left side content */}
        <div className="flex-1 max-w-2xl">
          {/* Heading - Responsive */}
          <div className="mb-6">
            <h2 className="font-inter font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight text-[#efefef]">
              {t('benefits.heading.what')} {t('benefits.heading.is')}
            </h2>
            <h2 className="font-inter font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight text-[#181818]">
              {t('benefits.company')}
            </h2>
          </div>
          
          {/* Description - Responsive */}
          <div className="max-w-md">
            <p className="font-onest text-lg sm:text-xl lg:text-2xl leading-relaxed text-[#181818]">
              {t('benefits.description')}
            </p>
          </div>
        </div>

        {/* We work with - Dark container responsive */}
        <div className="bg-[#181818] flex-1 w-full rounded-tl-[60px] rounded-bl-[60px] p-8 lg:p-12 xl:p-16">
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-12">
            {/* We work with heading - Responsive */}
            <div>
              <h3 className="font-inter font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-[#efefef]">
                <span>{t('benefits.weWorkWith.we')} </span>
                <span className="text-[#007B79]">{t('benefits.weWorkWith.work')} </span>
                <span>{t('benefits.weWorkWith.with')}</span>
                <span className="text-[#007B79]">{t('benefits.weWorkWith.dots')}</span>
              </h3>
            </div>
            
            {/* Industry categories - 2 Column Grid (All Screens) */}
            <div className="grid grid-cols-2 gap-x-2 md:gap-x-8 gap-y-2 md:gap-y-4 mb-4 sm:mb-6 lg:mb-8 px-4 md:px-0 justify-items-start" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {/* LEFT COLUMN */}
              <div className="space-y-2 md:space-y-4">
                <div className="flex items-center space-x-2 md:space-x-3 text-white overflow-hidden">
                  <img alt="Motorsport" className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" src={getImagePath("/svg-motorsport.svg")} />
                  <span className="font-onest text-sm md:text-lg text-[#efefef]">{t('benefits.categories.motorsport')}</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3 text-white overflow-hidden">
                  <img alt="Content creators" className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" src={getImagePath("/svg-content.svg")} />
                  <span className="font-onest text-sm md:text-lg text-[#efefef]">{t('benefits.categories.contentCreators')}</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3 text-white overflow-hidden">
                  <img alt="Golf athletes" className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" src={getImagePath("/svg-golf.svg")} />
                  <span className="font-onest text-sm md:text-lg text-[#efefef]">{t('benefits.categories.golfAthletes')}</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3 text-white overflow-hidden">
                  <img alt="Soccer teams" className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" src={getImagePath("/svg-soccer.svg")} />
                  <span className="font-onest text-sm md:text-lg text-[#efefef]">{t('benefits.categories.soccerTeams')}</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3 text-white overflow-hidden">
                  <img alt="Personal brand" className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" src={getImagePath("/svg-personal.svg")} />
                  <span className="font-onest text-sm md:text-lg text-[#efefef]">{t('benefits.categories.personalBrand')}</span>
                </div>
              </div>
              
              {/* RIGHT COLUMN */}
              <div className="space-y-2 md:space-y-4">
                <div className="flex items-center space-x-2 md:space-x-3 text-white overflow-hidden">
                  <img alt="Real estate" className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" src={getImagePath("/svg-real.svg")} />
                  <span className="font-onest text-sm md:text-lg text-[#efefef]">{t('benefits.categories.realEstate')}</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3 text-white overflow-hidden -ml-1 md:ml-0">
                  <img alt="Models" className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" src={getImagePath("/svg-models.svg")} />
                  <span className="font-onest text-sm md:text-lg text-[#efefef]">{t('benefits.categories.models')}</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3 text-white overflow-hidden">
                  <img alt="Influencers" className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" src={getImagePath("/svg-influencer.svg")} />
                  <span className="font-onest text-sm md:text-lg text-[#efefef]">{t('benefits.categories.influencers')}</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3 text-white overflow-hidden">
                  <img alt="Car rentals" className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" src={getImagePath("/svg-car.svg")} />
                  <span className="font-onest text-sm md:text-lg text-[#efefef]">{t('benefits.categories.carRentals')}</span>
                </div>
                <div className="flex items-center space-x-2 md:space-x-3 text-white overflow-hidden -ml-1 md:ml-0">
                  <img alt="Medical" className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" src={getImagePath("/svg-medical.svg")} />
                  <span className="font-onest text-sm md:text-lg text-[#efefef]">{t('benefits.categories.medical')}</span>
                </div>
              </div>
            </div>

            
            {/* Social Media Logos - Responsive */}
            <div className="flex items-center justify-center md:justify-start gap-2 md:gap-4 lg:gap-5 mt-0 sm:mt-4 md:mt-8 lg:mt-10 mb-6 md:mb-8 px-2 md:px-0">
              {/* Facebook Logo */}
              <img 
                src={getImagePath("/Facebook.png")} 
                alt="Facebook" 
                className="w-14 h-14 sm:w-18 sm:h-18 md:w-auto md:h-7 lg:h-8 object-contain"
              />
              
              {/* Instagram Logo */}
              <img 
                src={getImagePath("/Instagram.png")} 
                alt="Instagram" 
                className="w-14 h-14 sm:w-18 sm:h-18 md:w-auto md:h-7 lg:h-8 object-contain"
              />
              
              {/* YouTube Logo */}
              <img 
                src={getImagePath("/YouTube.png")} 
                alt="YouTube" 
                className="w-14 h-14 sm:w-18 sm:h-18 md:w-auto md:h-7 lg:h-8 object-contain"
              />
            </div>
          </div>
        </div>
        </div>
        </section>

        {/* Section 3: What we do - Layer 3 */}
        <section className="sticky top-0 h-screen w-full" style={{ zIndex: 3, background: '#181818', minHeight: '100vh' }}>
        <div className="max-w-7xl mx-auto h-auto lg:h-full flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-8 lg:gap-16 px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
            {/* Left Content - Responsive */}
            <div className="text-white flex-1 max-w-2xl text-center lg:text-left">
              <h2 className="font-black leading-tight mb-5 text-white">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase">
                  {t('services.heading.what')}
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase">
                  {t('services.weDoQuestion.we')} <span style={{ color: '#007B79' }}>{t('services.weDoQuestion.do')}</span>{t('services.weDoQuestion.question')}
                </div>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-white mb-2 font-onest">
                {t('services.subtitle1')}
              </p>
              <p className="text-lg sm:text-xl lg:text-2xl text-white mb-8 lg:mb-12 font-onest">
                <span className="text-[#007B79]">{t('services.subtitle2.human')}</span> {t('services.subtitle2.experiences')}
              </p>
              
              {/* 2x2 Button Grid - Responsive */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 lg:mt-8 max-w-sm mx-auto lg:mx-0">
                  {/* Social Media Button */}
                  <button
                    className={`min-h-[44px] transition-all duration-200 hover:scale-105 flex justify-center items-center rounded-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-medium font-inter cursor-pointer ${
                      activeService === 'Social Media' 
                        ? 'bg-[#EFEFEF] text-[#00B081] shadow-lg' 
                        : 'bg-[#00B081] text-black hover:shadow-md'
                    }`}
                    onClick={() => handleServiceChange('Social Media')}
                  >
                    {t('services.socialMedia.title')}
                  </button>

                  {/* Website Button */}
                  <button
                    className={`min-h-[44px] transition-all duration-200 hover:scale-105 flex justify-center items-center rounded-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-medium font-inter cursor-pointer ${
                      activeService === 'Website' 
                        ? 'bg-[#EFEFEF] text-[#00B081] shadow-lg' 
                        : 'bg-[#00B081] text-black hover:shadow-md'
                    }`}
                    onClick={() => handleServiceChange('Website')}
                  >
                    {t('services.website.title')}
                  </button>

                  {/* Design Button */}
                  <button
                    className={`min-h-[44px] transition-all duration-200 hover:scale-105 flex justify-center items-center rounded-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-medium font-inter cursor-pointer ${
                      activeService === 'Design' 
                        ? 'bg-[#EFEFEF] text-[#00B081] shadow-lg' 
                        : 'bg-[#00B081] text-black hover:shadow-md'
                    }`}
                    onClick={() => handleServiceChange('Design')}
                  >
                    {t('services.design.title')}
                  </button>

                  {/* Press Button */}
                  <button
                    className={`min-h-[44px] transition-all duration-200 hover:scale-105 flex justify-center items-center rounded-full px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base font-medium font-inter cursor-pointer ${
                      activeService === 'Press' 
                        ? 'bg-[#EFEFEF] text-[#00B081] shadow-lg' 
                        : 'bg-[#00B081] text-black hover:shadow-md'
                    }`}
                    onClick={() => handleServiceChange('Press')}
                  >
                    {t('services.press.title')}
                  </button>
              </div>
            </div>
            
            {/* Right Content - Dynamic Service Card - Responsive */}
            <Card 
              key={activeService}
              className={`border-none shadow-lg transition-all duration-700 ease-out flex-1 max-w-2xl w-full ${isAnimating ? 'animate-slide-down' : ''}`}
              style={{
                minHeight: '400px',
                height: 'auto',
                borderRadius: '40px',
                backgroundImage: `url("${getImagePath(getServiceCard(activeService)?.backgroundImage || '')}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#f0f0f0',
                transform: isAnimating ? 'translateY(-100%)' : 'translateY(0)',
                opacity: isAnimating ? 0 : 1
              }}
            >
              <CardContent className="relative h-auto p-6 sm:p-8 lg:p-12">
                {/* Service Title Pill - Responsive */}
                <div className="bg-[#00BCBE] text-[#232323] font-inter font-black rounded-full px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl lg:text-2xl xl:text-3xl leading-tight mb-6 lg:mb-8 inline-block transition-all duration-500 ease-out">
                  {getServiceCard(activeService)?.title}
                </div>
                
                {/* Dynamic Content - Responsive */}
                <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                  {getServiceCard(activeService)?.content?.map((item, i) => (
                    <div 
                      key={i}
                      className="flex items-start transition-all duration-300 ease-out"
                      style={{
                        transitionDelay: `${i * 100}ms`
                      }}
                    >
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#007B79] rounded-full mr-3 sm:mr-4 mt-1.5 flex-shrink-0"></div>
                      <div className="font-onest text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-[#181818] max-w-full">
                        <span className="font-bold">{item.label}</span>
                        <span className="font-normal">{item.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
        </div>
        </section>

        {/* Section 4: Idea to Execution - Layer 4 */}
        <section 
          className="sticky top-0 h-screen w-full" 
          style={{ 
            zIndex: 4,
            background: '#F5F5F5',
            backgroundImage: `url('${getImagePath('/gradient-background-teal.png')}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh'
          }}
        >
        <div className="max-w-6xl mx-auto h-full flex items-center justify-center px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-16">
        <div className="bg-[#181818] rounded-3xl lg:rounded-[84px] p-8 sm:p-12 lg:p-16 xl:p-20 shadow-2xl flex flex-col items-center gap-8 lg:gap-12">
          {/* Main Title - Responsive */}
          <div className="text-center">
            <h2 className="font-black leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#EFEFEF]">
              {t('process.heading.idea')} {t('process.heading.to')} <span style={{ color: '#007B79' }}>{t('process.heading.execution')}</span>
            </h2>
          </div>

          {/* Process Steps Container - Responsive */}
          <div className="w-full">
            {/* Desktop Process Steps Row */}
            <div className="hidden lg:flex items-start justify-between w-full max-w-5xl mx-auto mb-12">
              {/* Step 1: We listen */}
              <div className="flex flex-col items-start flex-1 max-w-xs">
                <h3 className="font-black text-2xl lg:text-3xl xl:text-4xl mb-6 lg:mb-8 whitespace-nowrap">
                  <span style={{ color: '#007B79', textTransform: 'uppercase' }}>{t('process.listen.we')}</span> <span style={{ color: '#EFEFEF' }}>{t('process.listen.listen')}</span>
                </h3>
                <p className="font-onest text-base lg:text-lg xl:text-xl leading-relaxed text-[#EFEFEF] max-w-full">
                  {t('process.listen.description')}
                </p>
              </div>

              {/* Step 2: We create */}
              <div className="flex flex-col items-start flex-1 max-w-xs">
                <h3 className="font-black text-2xl lg:text-3xl xl:text-4xl mb-6 lg:mb-8 whitespace-nowrap">
                  <span style={{ color: '#007B79', textTransform: 'uppercase' }}>{t('process.create.we')}</span> <span style={{ color: '#EFEFEF' }}>{t('process.create.create')}</span>
                </h3>
                <p className="font-onest text-base lg:text-lg xl:text-xl leading-relaxed text-[#EFEFEF] max-w-full">
                  {t('process.create.description')}
                </p>
              </div>

              {/* Step 3: We analyze */}
              <div className="flex flex-col items-start flex-1 max-w-xs">
                <h3 className="font-black text-2xl lg:text-3xl xl:text-4xl mb-6 lg:mb-8 whitespace-nowrap">
                  <span style={{ color: '#007B79', textTransform: 'uppercase' }}>{t('process.analyze.we')}</span> <span style={{ color: '#EFEFEF' }}>{t('process.analyze.analyze')}</span>
                </h3>
                <p className="font-onest text-base lg:text-lg xl:text-xl leading-relaxed text-[#EFEFEF] max-w-full">
                  {t('process.analyze.description')}
                </p>
              </div>
            </div>


          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col items-center space-y-8 sm:space-y-12 w-full">
            {/* Mobile Step 1 */}
            <div className="flex flex-col items-center text-center max-w-sm">
              <h3 className="text-xl sm:text-2xl font-black mb-4">
                <span style={{ color: '#007B79' }}>{t('process.listen.we')}</span>&nbsp;<span style={{ color: '#EFEFEF' }}>{t('process.listen.listen')}</span>
              </h3>
              <p className="text-sm sm:text-base text-[#EFEFEF] font-onest leading-relaxed">
                {t('process.listen.description')}
              </p>
            </div>

            {/* Mobile Arrow 1 */}
            <div className="transform rotate-90 hidden">
              <svg width="40" height="30" viewBox="0 0 40 30" className="sm:w-16 sm:h-12">
                <path 
                  d="M5 25 Q 20 5, 35 25" 
                  stroke="#00BCBE" 
                  strokeWidth="6" 
                  fill="none" 
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Mobile Step 2 */}
            <div className="flex flex-col items-center text-center max-w-sm">
              <h3 className="text-xl sm:text-2xl font-black mb-4">
                <span style={{ color: '#007B79' }}>{t('process.create.we')}</span>&nbsp;<span style={{ color: '#EFEFEF' }}>{t('process.create.create')}</span>
              </h3>
              <p className="text-sm sm:text-base text-[#EFEFEF] font-onest leading-relaxed">
                {t('process.create.description')}
              </p>
            </div>

            {/* Mobile Arrow 2 */}
            <div className="transform rotate-90 hidden">
              <svg width="40" height="30" viewBox="0 0 40 30" className="sm:w-16 sm:h-12">
                <path 
                  d="M5 25 Q 20 5, 35 25" 
                  stroke="#00BCBE" 
                  strokeWidth="6" 
                  fill="none" 
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Mobile Step 3 */}
            <div className="flex flex-col items-center text-center max-w-sm">
              <h3 className="text-xl sm:text-2xl font-black mb-4">
                <span style={{ color: '#007B79' }}>{t('process.analyze.we')}</span>&nbsp;<span style={{ color: '#EFEFEF' }}>{t('process.analyze.analyze')}</span>
              </h3>
              <p className="text-sm sm:text-base text-[#EFEFEF] font-onest leading-relaxed">
                {t('process.analyze.description')}
              </p>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Section 5: Testimonials - Layer 5 */}
      <section className="sticky top-0 h-screen w-full" style={{ zIndex: 5, background: '#007B79', minHeight: '100vh' }}>
        <div className="h-full flex flex-col justify-center py-6 overflow-hidden">
          {/* Header Section - Constrained */}
          <div className="px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
            <div className="w-full flex flex-col items-center gap-6 lg:gap-8">
              <div className="text-center flex flex-col gap-2 lg:gap-4">
                {/* "Great work" text - Responsive */}
                <p className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white m-0">
                  {t('testimonials.heading.we')} {t('testimonials.heading.scale')}
                </p>
                
                {/* "For great people" text - Responsive */}
                <p className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-[rgb(35,35,35)] m-0">
                  {t('testimonials.forGreatPeople.for')} {t('testimonials.forGreatPeople.great')} {t('testimonials.forGreatPeople.people')}
                </p>
                
                {/* Subtext - Responsive */}
                <p className="font-onest text-base sm:text-lg lg:text-xl xl:text-2xl text-center text-[rgb(35,35,35)] mt-4 mb-8 lg:mb-12 max-w-4xl mx-auto">
                  {t('testimonials.subtitle.since')} <span className="font-bold">{t('testimonials.subtitle.weWork')}</span> {t('testimonials.subtitle.toCreate')}<br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>{t('testimonials.subtitle.meaningful')}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Section - Full Viewport Width */}
          <div className="relative mt-2">
            {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
            <div className="hidden lg:flex absolute -top-12 sm:-top-16 right-4 sm:right-8 lg:right-16 gap-2 sm:gap-3 z-10">
              {/* Left Arrow Button - Responsive */}
              <button
                className="min-w-[44px] min-h-[44px] w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white bg-opacity-40 hover:bg-opacity-60 rounded-full border-2 border-white border-opacity-50 cursor-pointer flex items-center justify-center transition-all duration-200 text-white shadow-lg hover:shadow-xl hover:scale-105"
                onClick={handlePrevious}
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </button>
              
              {/* Right Arrow Button - Responsive */}
              <button
                className="min-w-[44px] min-h-[44px] w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white bg-opacity-40 hover:bg-opacity-60 rounded-full border-2 border-white border-opacity-50 cursor-pointer flex items-center justify-center transition-all duration-200 text-white shadow-lg hover:shadow-xl hover:scale-105"
                onClick={handleNext}
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
              </button>
            </div>

            {/* Desktop Carousel */}
            <div 
              className="hidden lg:block relative overflow-x-hidden overflow-y-hidden scrollbar-hide"
              style={{
                width: '100vw',
                marginLeft: '50%',
                transform: 'translateX(-50%)',
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-y',
                paddingLeft: '2rem',
                paddingRight: '2rem'
              }}
            >
              <div 
                className="flex transition-transform duration-500 ease-out cursor-grab select-none"
                style={{
                  gap: `${GAP}px`,
                  transform: `translateX(${translateX}px)`,
                  touchAction: 'pan-x',
                  width: 'max-content',
                  minWidth: `${infiniteTestimonials.length * STEP}px`
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {infiniteTestimonials.map((testimonial, index) => {
                  return (
                    <div 
                      key={testimonial.id}
                      className="testimonial-card bg-white rounded-3xl lg:rounded-[54px] p-6 flex flex-col justify-between select-none"
                      style={{
                        width: `${CARD_WIDTH}px`,
                        height: `${CARD_HEIGHT}px`,
                        flexShrink: 0,
                        minWidth: `${CARD_WIDTH}px`
                      }}
                      onMouseEnter={() => setIsAutoPlaying(false)}
                      onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                      {/* Star Rating - Compact Spacing */}
                      <div className="mb-3">
                        <svg className="w-24 sm:w-32 lg:w-36 xl:w-40 h-auto" viewBox="0 0 154 26" fill="none">
                          <g>
                            <path d="M13 1L15.09 6.26L21 7.27L17 11.14L18.18 17.02L13 14.77L7.82 17.02L9 11.14L5 7.27L10.91 6.26L13 1Z" fill="#00B081"/>
                            <path d="M44 1L46.09 6.26L52 7.27L48 11.14L49.18 17.02L44 14.77L38.82 17.02L40 11.14L36 7.27L41.91 6.26L44 1Z" fill="#00B081"/>
                            <path d="M75 1L77.09 6.26L83 7.27L79 11.14L80.18 17.02L75 14.77L69.82 17.02L71 11.14L67 7.27L72.91 6.26L75 1Z" fill="#00B081"/>
                            <path d="M106 1L108.09 6.26L114 7.27L110 11.14L111.18 17.02L106 14.77L100.82 17.02L102 11.14L98 7.27L103.91 6.26L106 1Z" fill="#00B081"/>
                            <path d="M137 1L139.09 6.26L145 7.27L141 11.14L142.18 17.02L137 14.77L131.82 17.02L133 11.14L129 7.27L134.91 6.26L137 1Z" fill="#00B081"/>
                          </g>
                        </svg>
                      </div>
                      
                      {/* Testimonial Text - Contained Within Card */}
                      <div className="flex-grow flex flex-col justify-between">
                        <p className="font-onest text-sm sm:text-base lg:text-lg text-[rgb(24,24,24)] leading-relaxed mb-4">
                          {testimonial.text}
                        </p>
                        
                        {/* Profile Section - Contained Within Card Boundaries */}
                        <div className="flex items-center justify-between gap-3 lg:gap-4">
                          <div className="flex items-center gap-3 lg:gap-4">
                            <img 
                              src={getImagePath(testimonial.image)} 
                              alt={testimonial.name} 
                              className="w-16 h-16 aspect-square rounded-full object-cover flex-shrink-0"
                            />
                            <p className="font-onest text-base sm:text-lg lg:text-xl font-bold text-[rgb(24,24,24)]">
                              {testimonial.name}
                            </p>
                          </div>
                          {testimonial.instagram && (
                            <a 
                              href={`https://instagram.com/${testimonial.instagram}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-full hover:scale-110 transition-transform duration-200"
                              aria-label={`Visit ${testimonial.name} on Instagram`}
                            >
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Mobile Snap Scroll - Like Team Section */}
            <div className="lg:hidden w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide flex gap-4 px-4">
              {getTestimonials().map((testimonial) => {
                return (
                  <div 
                    key={testimonial.id}
                    className="shrink-0 w-11/12 max-w-sm snap-center bg-white rounded-3xl p-6 flex flex-col justify-between"
                    style={{
                      height: `${CARD_HEIGHT}px`
                    }}
                  >
                    {/* Star Rating */}
                    <div className="mb-3">
                      <svg className="w-24 sm:w-32 h-auto" viewBox="0 0 154 26" fill="none">
                        <g>
                          <path d="M13 1L15.09 6.26L21 7.27L17 11.14L18.18 17.02L13 14.77L7.82 17.02L9 11.14L5 7.27L10.91 6.26L13 1Z" fill="#00B081"/>
                          <path d="M44 1L46.09 6.26L52 7.27L48 11.14L49.18 17.02L44 14.77L38.82 17.02L40 11.14L36 7.27L41.91 6.26L44 1Z" fill="#00B081"/>
                          <path d="M75 1L77.09 6.26L83 7.27L79 11.14L80.18 17.02L75 14.77L69.82 17.02L71 11.14L67 7.27L72.91 6.26L75 1Z" fill="#00B081"/>
                          <path d="M106 1L108.09 6.26L114 7.27L110 11.14L111.18 17.02L106 14.77L100.82 17.02L102 11.14L98 7.27L103.91 6.26L106 1Z" fill="#00B081"/>
                          <path d="M137 1L139.09 6.26L145 7.27L141 11.14L142.18 17.02L137 14.77L131.82 17.02L133 11.14L129 7.27L134.91 6.26L137 1Z" fill="#00B081"/>
                        </g>
                      </svg>
                    </div>

                    {/* Testimonial Text */}
                    <div className="flex-1 mb-4">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {testimonial.text}
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {testimonial.image && (
                          <img 
                            src={getImagePath(testimonial.image)} 
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
                        </div>
                      </div>
                      {testimonial.instagram && (
                        <a 
                          href={`https://instagram.com/${testimonial.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-full hover:scale-110 transition-transform duration-200"
                          aria-label={`Visit ${testimonial.name} on Instagram`}
                        >
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        </section>

        {/* Section 6: Team - Layer 6 */}
        <section className="sticky top-0 h-screen w-full" style={{ zIndex: 6, backgroundImage: `url(${getImagePath('/answers-section-bg-teal-vectorized.png')})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
          <div className="h-full flex flex-col justify-center py-8 px-4 sm:py-12 sm:px-8 lg:py-16 lg:px-16">
            
            {/* Title - Always visible at top on all devices */}
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="font-inter font-black text-2xl sm:text-3xl lg:text-5xl xl:text-6xl text-[#181818]">
                {t('team.title')}
              </h2>
            </div>
            
            {/* Mobile: Horizontal Slider (< lg) */}
            <div className="flex-1 flex items-center lg:hidden">
              <div className="w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide flex gap-4 px-4">
                
                {/* Team Member 1 */}
                <div className="shrink-0 w-11/12 max-w-sm snap-center bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                    <img 
                      src={getImagePath("/team-scalpa-new.jpg")} 
                      alt="Pascal Delorantis"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center' }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#181818] text-center mb-2">
                    {t('team.members.pascal.name')}
                  </h3>
                  <p className="text-base text-[#007B79] text-center mb-3">
                    {t('team.members.pascal.role')}
                  </p>
                  <div className="text-sm text-gray-600 text-center mb-4">
                    <p className={expandedBios[1] ? '' : 'line-clamp-3'}>
                      {t('team.members.pascal.bio')}
                    </p>
                    <button 
                      onClick={() => setExpandedBios(prev => ({ ...prev, 1: !prev[1] }))}
                      className="text-[#007B79] underline text-sm mt-1 hover:text-[#006666] transition"
                    >
                      {expandedBios[1] ? t('team.readLess') : t('team.readMore')}
                    </button>
                  </div>
                  <div className="flex justify-center gap-3">
                    <a href="https://instagram.com/scalpadelorantis" className="w-14 h-14 flex items-center justify-center bg-[#007B79] rounded-full hover:bg-[#006666] transition">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href="mailto:contact@hupscale.com" className="w-14 h-14 flex items-center justify-center bg-[#007B79] rounded-full hover:bg-[#006666] transition">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
                    </a>
                  </div>
                </div>
                
                {/* Team Member 2 - Frédéric Cordat */}
                <div className="shrink-0 w-11/12 max-w-sm snap-center bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-full">
                    <img 
                      src={getImagePath("/team-frederic.png")} 
                      alt="Frédéric Cordat"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center' }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#181818] text-center mb-2">
                    {t('team.members.frederic.name')}
                  </h3>
                  <p className="text-base text-[#007B79] text-center mb-3">
                    {t('team.members.frederic.role')}
                  </p>
                  <div className="text-sm text-gray-600 text-center mb-4">
                    <p className={expandedBios[2] ? '' : 'line-clamp-3'}>
                      {t('team.members.frederic.bio')}
                    </p>
                    <button 
                      onClick={() => setExpandedBios(prev => ({ ...prev, 2: !prev[2] }))}
                      className="text-[#007B79] underline text-sm mt-1 hover:text-[#006666] transition"
                    >
                      {expandedBios[2] ? t('team.readLess') : t('team.readMore')}
                    </button>
                  </div>
                  <div className="flex justify-center gap-3">
                    <a href="https://fr.linkedin.com/in/fr%C3%A9d%C3%A9ric-cordat-94653b31" target="_blank" rel="noopener noreferrer" className="w-14 h-14 flex items-center justify-center bg-[#007B79] rounded-full hover:bg-[#006666] transition">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="mailto:frederic.cordat@gmail.com" className="w-14 h-14 flex items-center justify-center bg-[#007B79] rounded-full hover:bg-[#006666] transition">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
                    </a>
                  </div>
                </div>
                
                {/* Team Member 3 - Rodney */}
                <div className="shrink-0 w-11/12 max-w-sm snap-center bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-24 h-24 mx-auto mb-4">
                    <img 
                      src={getImagePath("/team-rodney.jpg")} 
                      alt="Rodney Onanga"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#181818] text-center mb-1">
                    {t('team.members.rodney.name')}
                  </h3>
                  <p className="text-base text-[#007B79] text-center mb-3">
                    {t('team.members.rodney.role')}
                  </p>
                  <div className="text-sm text-gray-600 text-center mb-4">
                    <p className={expandedBios[3] ? '' : 'line-clamp-3'}>
                      {t('team.members.rodney.bio')}
                    </p>
                    <button 
                      onClick={() => setExpandedBios(prev => ({ ...prev, 3: !prev[3] }))}
                      className="text-[#007B79] underline text-sm mt-1 hover:text-[#006666] transition"
                    >
                      {expandedBios[3] ? t('team.readLess') : t('team.readMore')}
                    </button>
                  </div>
                  <div className="flex justify-center gap-3">
                    <a href="https://instagram.com/yudi_q" target="_blank" rel="noopener noreferrer" className="w-14 h-14 flex items-center justify-center bg-[#007B79] rounded-full hover:bg-[#006666] transition">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href="mailto:onangaro@hotmail.com" className="w-14 h-14 flex items-center justify-center bg-[#007B79] rounded-full hover:bg-[#006666] transition">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
                    </a>
                  </div>
                </div>
                
                {/* Team Member 3 */}
                <div className="shrink-0 w-11/12 max-w-sm snap-center bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-24 h-24 mx-auto mb-4">
                    <img 
                      src={getImagePath("/team-leandro.jpeg")} 
                      alt="Leandro Schmidt"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#181818] text-center mb-1">
                    {t('team.members.leandro.name')}
                  </h3>
                  <p className="text-base text-[#007B79] text-center mb-3">
                    {t('team.members.leandro.role')}
                  </p>
                  <div className="text-sm text-gray-600 text-center mb-4">
                    <p className={expandedBios[3] ? '' : 'line-clamp-3'}>
                      {t('team.members.leandro.bio')}
                    </p>
                    <button 
                      onClick={() => setExpandedBios(prev => ({ ...prev, 3: !prev[3] }))}
                      className="text-[#007B79] underline text-sm mt-1 hover:text-[#006666] transition"
                    >
                      {expandedBios[3] ? t('team.readLess') : t('team.readMore')}
                    </button>
                  </div>
                  <div className="flex justify-center gap-3">
                    <a href="https://instagram.com/schmidtleanok" target="_blank" rel="noopener noreferrer" className="w-14 h-14 flex items-center justify-center bg-[#007B79] rounded-full hover:bg-[#006666] transition">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href="mailto:Leandoschmidt@gmail.com" className="w-14 h-14 flex items-center justify-center bg-[#007B79] rounded-full hover:bg-[#006666] transition">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
                    </a>
                  </div>
                </div>
                
              </div>
            </div>
            
            {/* Desktop: Horizontal Row (>= lg) */}
            <div className="hidden lg:flex flex-1 items-center justify-center">
              <div className="flex gap-8 max-w-7xl mx-auto">
                
                {/* Team Member 1 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-sm">
                  <div className="w-32 h-32 mx-auto mb-4">
                    <img 
                      src={getImagePath("/team-scalpa-new.jpg")} 
                      alt="Pascal Delorantis"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#181818] text-center mb-1">
                    {t('team.members.pascal.name')}
                  </h3>
                  <p className="text-lg text-[#007B79] text-center mb-3">
                    {t('team.members.pascal.role')}
                  </p>
                  <div className="text-base text-gray-600 text-center mb-4">
                    <p className={expandedBios[1] ? '' : 'line-clamp-3'}>
                      {t('team.members.pascal.bio')}
                    </p>
                    <button 
                      onClick={() => setExpandedBios(prev => ({ ...prev, 1: !prev[1] }))}
                      className="text-[#007B79] underline text-sm mt-1 hover:text-[#006666] transition"
                    >
                      {expandedBios[1] ? t('team.readLess') : t('team.readMore')}
                    </button>
                  </div>
                  <div className="flex justify-center gap-3">                    <a href="https://instagram.com/scalpadelorantis" className="w-11 h-11 flex items-center justify-center bg-[#007B79] rounded-full hover:bg-[#006666] transition">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>                    </a>
                    <a href="mailto:contact@hupscale.com" className="w-11 h-11 flex items-center justify-center bg-[#007B79] rounded-full hover:bg-[#006666] transition">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
                    </a>
                  </div>
                </div>
                
                {/* Team Member 2 - Frédéric Cordat */}
                <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-sm">
                  <div className="w-32 h-32 mx-auto mb-4">
                    <img 
                      src={getImagePath("/team-frederic.png")} 
                      alt="Frédéric Cordat"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#181818] text-center mb-1">
                    {t('team.members.frederic.name')}
                  </h3>
                  <p className="text-lg text-[#007B79] text-center mb-3">
                    {t('team.members.frederic.role')}
                  </p>
                  <div className="text-base text-gray-600 text-center mb-4">
                    <p className={expandedBios[2] ? '' : 'line-clamp-3'}>
                      {t('team.members.frederic.bio')}
                    </p>
                    <button 
                      onClick={() => setExpandedBios(prev => ({ ...prev, 2: !prev[2] }))}
                      className="text-[#007B79] underline text-sm mt-1 hover:text-[#006666] transition"
                    >
                      {expandedBios[2] ? t('team.readLess') : t('team.readMore')}
                    </button>
                  </div>
                  <div className="flex justify-center gap-3">                    <a href="https://fr.linkedin.com/in/fr%C3%A9d%C3%A9ric-cordat-94653b31" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center bg-[#007B79] rounded-full hover:bg-[#006666] transition">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>                    </a>
                    <a href="mailto:frederic.cordat@gmail.com" className="w-11 h-11 flex items-center justify-center bg-[#007B79] rounded-full hover:bg-[#006666] transition">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
                    </a>
                  </div>
                </div>
                
                {/* Team Member 3 - Rodney */}
                <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-sm">
                  <div className="w-32 h-32 mx-auto mb-4">
                    <img 
                      src={getImagePath("/team-rodney.jpg")} 
                      alt="Rodney Onanga"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#181818] text-center mb-1">
                    {t('team.members.rodney.name')}
                  </h3>
                  <p className="text-lg text-[#007B79] text-center mb-3">
                    {t('team.members.rodney.role')}
                  </p>
                  <div className="text-base text-gray-600 text-center mb-4">
                    <p className={expandedBios[3] ? '' : 'line-clamp-3'}>
                      {t('team.members.rodney.bio')}
                    </p>
                    <button 
                      onClick={() => setExpandedBios(prev => ({ ...prev, 3: !prev[3] }))}
                      className="text-[#007B79] underline text-sm mt-1 hover:text-[#006666] transition"
                    >
                      {expandedBios[3] ? t('team.readLess') : t('team.readMore')}
                    </button>
                  </div>
                  <div className="flex justify-center gap-3">
                    <a href="https://instagram.com/yudi_q" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center bg-[#007B79] rounded-full hover:bg-[#006666] transition">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href="mailto:onangaro@hotmail.com" className="w-11 h-11 flex items-center justify-center bg-[#007B79] rounded-full hover:bg-[#006666] transition">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
                    </a>
                  </div>
                </div>
                
                {/* Team Member 4 - Leandro */}
                <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-sm">
                  <div className="w-32 h-32 mx-auto mb-4">
                    <img 
                      src={getImagePath("/team-leandro.jpeg")} 
                      alt="Leandro Schmidt"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-[#181818] text-center mb-1">
                    {t('team.members.leandro.name')}
                  </h3>
                  <p className="text-lg text-[#007B79] text-center mb-3">
                    {t('team.members.leandro.role')}
                  </p>
                  <div className="text-base text-gray-600 text-center mb-4">
                    <p className={expandedBios[4] ? '' : 'line-clamp-3'}>
                      {t('team.members.leandro.bio')}
                    </p>
                    <button 
                      onClick={() => setExpandedBios(prev => ({ ...prev, 4: !prev[4] }))}
                      className="text-[#007B79] underline text-sm mt-1 hover:text-[#006666] transition"
                    >
                      {expandedBios[4] ? t('team.readLess') : t('team.readMore')}
                    </button>
                  </div>
                  <div className="flex justify-center gap-3">
                    <a href="https://instagram.com/schmidtleanok" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center bg-[#007B79] rounded-full hover:bg-[#006666] transition">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href="mailto:Leandoschmidt@gmail.com" className="w-11 h-11 flex items-center justify-center bg-[#007B79] rounded-full hover:bg-[#006666] transition">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
                    </a>
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </section>

        {/* Section 7: Interaction - Final layer (NOT sticky) */}
        <section 
          className="relative w-full overflow-hidden flex items-center justify-center lg:justify-end px-4 sm:px-8 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-20" 
          style={{ 
            zIndex: 7,
            minHeight: '100vh',
            background: `url('${getImagePath('/answers-section-bg-teal-vectorized.png')}') center center`,
            backgroundSize: 'cover'
          }}
        >
        
        {/* Gallery Carousel */}
        <GalleryCarousel />
        
        {/* Text content overlay - Responsive */}
        <div className="relative text-center lg:text-right text-white max-w-2xl" style={{ zIndex: 1 }}>
          <h1 className="font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 lg:mb-5 leading-tight" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            {t('interaction.heading1')}
          </h1>
          <p className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-8 lg:mb-10 leading-tight" style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
{t('interaction.heading2.your')} <span style={{ color: '#007B79' }}>{t('interaction.heading2.business')}</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end items-center">
            <a href="mailto:hello@hupscale.com" className="bg-[#007B79] text-white border-none rounded-full px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold cursor-pointer uppercase shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-[#006666] transition-all duration-300 min-h-[44px] min-w-[44px] no-underline inline-block text-center">
              {t('interaction.cta')}
            </a>
            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="bg-white text-[#007B79] border-2 border-[#007B79] rounded-full px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold cursor-pointer uppercase shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-[#007B79] hover:text-white transition-all duration-300 min-h-[44px] min-w-[44px]"
            >
              {t('cta.learnMore')}
            </button>
            <a href={getImagePath('/livre-dor/')} className="bg-white text-[#007B79] border-2 border-[#007B79] rounded-full px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-bold cursor-pointer uppercase shadow-lg hover:shadow-2xl hover:scale-105 hover:bg-[#007B79] hover:text-white transition-all duration-300 min-h-[44px] min-w-[44px] no-underline inline-block text-center">
              {t('interaction.guestbook')}
            </a>
          </div>
        </div>
        
        </section>
        
        {/* Section 7: Contact Us - Layer 7 */}
        <ContactSection />
        
      </div> {/* End scroll-container */}

      {/* FAQ section stays outside - it's not sticky */}
      <section 
        className="bg-cover bg-center bg-no-repeat py-16 px-4 sm:px-8 lg:px-16" 
        style={{
          zIndex: 7,
          backgroundImage: `url(${getImagePath("/answers-section-bg-teal-vectorized.png")})`,
          height: 'auto'
        }}
      >
        <div className="w-full relative overflow-visible">

        {/* FAQ Container - Responsive */}
        <div className="relative z-10 flex justify-center py-12 lg:py-16 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 overflow-visible">
          
          {/* Main FAQ Container - Responsive */}
          <div className="inline-flex flex-col h-auto w-full max-w-5xl bg-[#007B79] shadow-2xl p-6 sm:p-8 lg:p-12 xl:p-16 mx-auto overflow-visible transition-all duration-300 rounded-3xl lg:rounded-[60px]">

            {/* Title - Responsive */}
            <h2 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-[rgb(239,239,239)] mb-6 lg:mb-8 leading-tight">
{t('faq.heading.answers')} <span className="text-[rgb(35,35,35)] font-black">{t('faq.heading.youNeed')}</span>
            </h2>

            {/* FAQ Items - Responsive */}
            {getFaqs().map((item, i) => (
              <div key={i}>
                <div
                  className="flex items-center justify-center md:justify-start gap-3 lg:gap-4 cursor-pointer py-2"
                  onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}
                >
                  {/* Custom Plus/Minus Icon - Responsive */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center relative flex-shrink-0">
                    {/* Horizontal bar (always visible) */}
                    <div className="absolute w-3 sm:w-4 h-0.5 bg-[#232323] rounded-sm" />
                    {/* Vertical bar (hidden when open) */}
                    {openFaqIdx !== i && (
                      <div className="absolute w-0.5 h-3 sm:h-4 bg-[#232323] rounded-sm" />
                    )}
                  </div>
                  <span className="font-onest text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-[#232323] flex-1 text-center md:text-left">
                    {item.q}
                  </span>
                </div>
                {openFaqIdx === i && item.a && (
                  <div className="font-onest text-base sm:text-lg lg:text-xl xl:text-2xl text-white max-w-full w-full ml-0 md:ml-8 lg:ml-12 mt-2 mb-4 lg:mb-6 leading-relaxed break-words text-center md:text-left">
                    {item.a}
                  </div>
                )}
                <div className="h-px bg-[#232323] w-full my-3 lg:my-4" />
              </div>
            ))}

          </div>
        </div>

        {/* CTA Content - Inside FAQ Section */}
        <div className="relative z-10 flex flex-col items-center gap-12 lg:gap-16 pt-20 lg:pt-32 pb-20 lg:pb-32">
          
          {/* Main Heading - Responsive */}
          <h1 className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center text-[#232323] leading-tight uppercase max-w-4xl mx-auto">
            {t('cta.heading')}
          </h1>
          
          {/* Contact Info Text - Responsive */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mt-4 lg:mt-6 mb-6 lg:mb-8 text-center">
            <span className="font-onest text-base sm:text-lg lg:text-xl text-[#232323]">
              {t('cta.contactText')}
            </span>
            <a
              href={`mailto:${t('cta.email')}`}
              className="font-onest text-base sm:text-lg lg:text-xl text-[#232323] underline hover:no-underline transition-all duration-200 inline-block align-baseline"
            >
              {t('cta.email')}
            </a>
          </div>
          
          {/* CTA Button - Responsive */}
          <a 
            href="mailto:contact@hupscale.com"
            className="bg-white text-[#007B79] rounded-full px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 no-underline inline-block mt-4 lg:mt-6 hover:bg-opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="font-onest text-base sm:text-lg lg:text-xl xl:text-2xl font-bold uppercase tracking-wide">
              {t('cta.button')}
            </span>
          </a>
          
        </div>

        {/* Footer Container with Teal Background */}
        <div className="w-full bg-[#007B79] mt-20">
          <footer className="relative px-4 sm:px-8 lg:px-16 py-8 lg:py-12">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">
              
              {/* Left: Copyright - Responsive */}
              <p className="text-base sm:text-lg text-white font-onest font-normal text-center lg:text-left order-3 lg:order-1">
                2025 Hupscale. All rights reserved.
              </p>
              
              {/* Center: Instagram Link with Icon - Responsive */}
              <div className="flex items-center gap-2 sm:gap-3 order-2">
                {/* Instagram Icon */}
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.8 0H14.2C17.4 0 20 2.6 20 5.8V14.2C20 17.4 17.4 20 14.2 20H5.8C2.6 20 0 17.4 0 14.2V5.8C0 2.6 2.6 0 5.8 0ZM5.6 2C3.61 2 2 3.61 2 5.6V14.4C2 16.39 3.61 18 5.6 18H14.4C16.39 18 18 16.39 18 14.4V5.6C18 3.61 16.39 2 14.4 2H5.6ZM15.25 3.5C15.94 3.5 16.5 4.06 16.5 4.75C16.5 5.44 15.94 6 15.25 6C14.56 6 14 5.44 14 4.75C14 4.06 14.56 3.5 15.25 3.5ZM10 5C12.76 5 15 7.24 15 10C15 12.76 12.76 15 10 15C7.24 15 5 12.76 5 10C5 7.24 7.24 5 10 5ZM10 7C8.34 7 7 8.34 7 10C7 11.66 8.34 13 10 13C11.66 13 13 11.66 13 10C13 8.34 11.66 7 10 7Z" fill="white"/>
                </svg>
                <a href="https://www.instagram.com/lets.hupscale/" target="_blank" rel="noopener" className="text-base sm:text-lg text-white font-onest font-semibold hover:text-opacity-80 transition-all duration-200">
                  Instagram
                </a>
              </div>
              
              {/* Right: Logo + Terms & Privacy - Responsive */}
              <div className="flex flex-col items-center gap-3 lg:gap-4 order-1 lg:order-3">
                {/* HUPSCALE Logo */}
                <div className="text-xl sm:text-2xl font-bold text-white font-inter">
                  HUPSCALE
                </div>
                
                {/* Terms & Privacy */}
                <div className="flex items-center gap-4 sm:gap-6 text-white">
                  <span className="text-base sm:text-lg font-onest cursor-pointer hover:text-opacity-80 transition-all duration-200">Terms</span>
                  <span className="text-base sm:text-lg font-onest cursor-pointer hover:text-opacity-80 transition-all duration-200">Privacy</span>
                </div>
              </div>
              
            </div>
          </footer>
        </div>
        </div>
      </section>

      {/* PDF Modal */}
      <PdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfUrl={getImagePath('/LaunchingUPSCALE_ABrilleenMarketing.pdf')}
      />
    </div>
  )
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
