'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import { useLanguage } from '@/contexts/LanguageContext';
import TestimonialForm from '@/components/TestimonialForm';

// Helper function to get proper image path for GitHub Pages
const getImagePath = (path: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/Hupscale_Finale' : ''
  return `${basePath}${path}`
}

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx3EhzXxBPrjyXlPa1Ki772FZjyUpuxHyl5WxHnAt6CkwgKbwgKr9WoF_3jx4HfyQsT/exec';

interface Testimonial {
  name: string;
  photo_url?: string;
  testimony: string;
  instagram?: string;
  timestamp?: string;
}

export default function LivreDor() {
  const { t, language } = useTranslations();
  const { setLanguage } = useLanguage();
  const [expandedTestimonials, setExpandedTestimonials] = useState<{ [key: number]: boolean }>({});
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fallback testimonials (hardcoded from homepage) - will use translation keys
  const getFallbackTestimonials = (): Testimonial[] => [
    {
      name: t('testimonials.customers.haesoo'),
      testimony: t('testimonials.reviews.haesoo'),
      instagram: "haesoo"
    },
    {
      name: t('testimonials.customers.josef'),
      testimony: t('testimonials.reviews.josef'),
      instagram: "josef"
    },
    {
      name: t('testimonials.customers.geraud'),
      testimony: t('testimonials.reviews.geraud'),
      instagram: "geraud"
    },
    {
      name: t('testimonials.customers.anissa'),
      testimony: t('testimonials.reviews.anissa'),
      instagram: "anissa"
    },
    {
      name: t('testimonials.customers.rory'),
      testimony: t('testimonials.reviews.rory'),
      instagram: "rory"
    },
    {
      name: t('testimonials.customers.franck'),
      testimony: t('testimonials.reviews.franck'),
      instagram: "franck"
    },
    {
      name: t('testimonials.customers.jazmin'),
      testimony: t('testimonials.reviews.jazmin'),
      instagram: "jazmin"
    }
  ];

  // Load approved testimonials from Google Sheets
  useEffect(() => {
    const loadTestimonials = async () => {
      setIsLoading(true);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setTestimonials(data);
          } else {
            // Use fallback if no approved testimonials
            setTestimonials(getFallbackTestimonials());
          }
        } else {
          setTestimonials(getFallbackTestimonials());
        }
      } catch (error) {
        console.error('Failed to load testimonials:', error);
        setTestimonials(getFallbackTestimonials());
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, [language]); // Reload when language changes

  const toggleTestimonial = (index: number) => {
    setExpandedTestimonials(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-[#E8F5F5]">
      {/* EXACT NAVIGATION MENU FROM HOMEPAGE */}
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
          onClick={() => window.location.href = getImagePath('/')}
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
          aria-label="Go to homepage"
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
            onClick={() => window.location.href = getImagePath('/#benefits')}
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
            onClick={() => window.location.href = getImagePath('/#services')}
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
            onClick={() => window.location.href = getImagePath('/#testimonials')}
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
            onClick={() => window.location.href = getImagePath('/#faqs')}
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
            onClick={() => window.location.href = getImagePath('/livre-dor/')}
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
        
        {/* Get Started Button - Updated to contact@hupscale.com */}
        <a
          href="mailto:contact@hupscale.com"
          className="hidden md:block bg-[rgb(0,123,121)] text-[rgb(5,5,5)] border border-[rgb(5,5,5)] rounded-full px-4 lg:px-5 py-2 lg:py-3 text-xs lg:text-sm font-medium font-inter cursor-pointer transition-all duration-200 shadow-sm whitespace-nowrap no-underline inline-block text-center"
          style={{ marginLeft: '12px', fontSize: '13px', fontFamily: 'LEMONMILK, Morgan, sans-serif' }}
        >
          {t('navigation.getStarted')}
        </a>
        
      </nav>

      {/* Mobile Menu Overlay */}
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
                  window.location.href = getImagePath('/#benefits');
                }}
              >
                {t('navigation.benefits')}
              </button>
              <button
                className="text-left min-h-[44px] py-3 px-4 text-[rgb(35,35,35)] hover:bg-gray-100 rounded-lg"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = getImagePath('/#services');
                }}
              >
                {t('navigation.services')}
              </button>
              <button
                className="text-left min-h-[44px] py-3 px-4 text-[rgb(35,35,35)] hover:bg-gray-100 rounded-lg"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = getImagePath('/#testimonials');
                }}
              >
                {t('navigation.testimonials')}
              </button>
              <button
                className="text-left min-h-[44px] py-3 px-4 text-[rgb(35,35,35)] hover:bg-gray-100 rounded-lg"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.location.href = getImagePath('/#faqs');
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

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#181818] mb-6">
            {t('guestbook.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('guestbook.subtitle')}
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#181818] text-center mb-12">
            {t('guestbook.testimonials_title')}
          </h2>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#007B79]"></div>
              <p className="mt-4 text-gray-600">{t('guestbook.loading')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Profile */}
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-[#007B79] to-[#00A8A6] flex items-center justify-center text-white text-2xl font-bold mr-4">
                      {testimonial.photo_url ? (
                        <img
                          src={testimonial.photo_url}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        testimonial.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#181818]">
                        {testimonial.name}
                      </h3>
                      {testimonial.instagram && (
                        <a
                          href={`https://instagram.com/${testimonial.instagram.replace('@', '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#007B79] hover:text-[#006666] transition-colors"
                        >
                          @{testimonial.instagram.replace('@', '')}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 mb-4">
                    {expandedTestimonials[index]
                      ? testimonial.testimony
                      : truncateText(testimonial.testimony)}
                  </p>

                  {/* Read More Button */}
                  {testimonial.testimony.length > 150 && (
                    <button
                      onClick={() => toggleTestimonial(index)}
                      className="text-[#007B79] hover:text-[#006666] font-semibold transition-colors"
                    >
                      {expandedTestimonials[index] ? t('guestbook.show_less') : t('guestbook.read_more')}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Submission Form Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-[#181818] text-center mb-4">
            {t('guestbook.form_title')}
          </h2>
          <p className="text-gray-600 text-center mb-12">
            {t('guestbook.form_subtitle')}
          </p>
          <TestimonialForm />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#007B79] to-[#00A8A6] rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            {t('guestbook.cta_title')}
          </h2>
          <p className="text-white/90 text-lg mb-8">
            {t('guestbook.cta_subtitle')}
          </p>
          <a
            href="mailto:contact@hupscale.com"
            className="inline-block bg-white text-[#007B79] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            {t('guestbook.cta_button')}
          </a>
        </div>
      </section>
    </div>
  );
}
