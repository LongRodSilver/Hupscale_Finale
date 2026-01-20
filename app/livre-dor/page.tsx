'use client';

import { useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
import BaseImage from '@/components/BaseImage';

// Helper function to get proper image path for GitHub Pages
const getImagePath = (path: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/Hupscale_Finale' : ''
  return `${basePath}${path}`
}

interface Testimonial {
  id: number;
  name: string;
  photo: string;
  testimonial: string;
  instagram?: string;
}

export default function LivreDor() {
  const { t } = useTranslations();
  const [expandedTestimonials, setExpandedTestimonials] = useState<{ [key: number]: boolean }>({});

  // Existing testimonials from the homepage
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Haesoo",
      photo: getImagePath("/testimonials/haesoo.jpg"),
      testimonial: t('testimonials.reviews.haesoo'),
      instagram: "haesoo"
    },
    {
      id: 2,
      name: "Josef L.",
      photo: getImagePath("/testimonials/josef.jpg"),
      testimonial: t('testimonials.reviews.josef'),
      instagram: "josef"
    },
    {
      id: 3,
      name: "Géraud D.",
      photo: getImagePath("/testimonials/geraud.jpg"),
      testimonial: t('testimonials.reviews.geraud'),
      instagram: "geraud"
    },
    {
      id: 4,
      name: "Anissa L.",
      photo: getImagePath("/testimonials/anissa.jpg"),
      testimonial: t('testimonials.reviews.anissa'),
      instagram: "anissa"
    },
    {
      id: 5,
      name: "Rory H.",
      photo: getImagePath("/testimonials/rory.jpg"),
      testimonial: t('testimonials.reviews.rory'),
      instagram: "rory"
    },
    {
      id: 6,
      name: "Franck B.",
      photo: getImagePath("/testimonials/franck.jpg"),
      testimonial: t('testimonials.reviews.franck'),
      instagram: "franck"
    },
    {
      id: 7,
      name: "Jazmin P.",
      photo: getImagePath("/testimonials/jazmin.jpg"),
      testimonial: t('testimonials.reviews.jazmin'),
      instagram: "jazmin"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E8F5F5]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#181818] mb-6">
            {t('guestbook.title')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('guestbook.subtitle')}
          </p>
        </div>
      </section>

      {/* Existing Testimonials Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#181818] text-center mb-12">
            {t('guestbook.testimonials_title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <BaseImage
                      src={testimonial.photo}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#181818]">
                      {testimonial.name}
                    </h3>
                    {testimonial.instagram && (
                      <a 
                        href={`https://instagram.com/${testimonial.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#007B79] hover:underline"
                      >
                        @{testimonial.instagram}
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="text-gray-600">
                  <p className={expandedTestimonials[testimonial.id] ? '' : 'line-clamp-4'}>
                    {testimonial.testimonial}
                  </p>
                  {testimonial.testimonial.length > 150 && (
                    <button
                      onClick={() => setExpandedTestimonials(prev => ({ 
                        ...prev, 
                        [testimonial.id]: !prev[testimonial.id] 
                      }))}
                      className="text-[#007B79] text-sm mt-2 hover:underline"
                    >
                      {expandedTestimonials[testimonial.id] 
                        ? t('guestbook.read_less') 
                        : t('guestbook.read_more')}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Form Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#181818] mb-4">
              {t('guestbook.form_title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('guestbook.form_subtitle')}
            </p>
          </div>

          {/* Google Form Embed - Placeholder */}
          <div className="bg-gradient-to-br from-[#E8F5F5] to-white rounded-2xl p-8 shadow-lg">
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#007B79] rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#181818] mb-4">
                {t('guestbook.form_placeholder_title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('guestbook.form_placeholder_text')}
              </p>
              
              {/* This is where the Google Form iframe will be embedded */}
              <div id="google-form-container" className="min-h-[600px] bg-white rounded-xl">
                {/* Google Form iframe will be inserted here */}
                <iframe 
                  src="GOOGLE_FORM_URL_HERE"
                  width="100%" 
                  height="600" 
                  frameBorder="0" 
                  marginHeight={0} 
                  marginWidth={0}
                  className="rounded-xl"
                >
                  {t('guestbook.form_loading')}
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#007B79] to-[#006666] rounded-2xl p-12 text-white shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t('guestbook.cta_title')}
            </h2>
            <p className="text-lg mb-8 opacity-90">
              {t('guestbook.cta_subtitle')}
            </p>
            <a 
              href="mailto:hello@hupscale.com"
              className="inline-block bg-white text-[#007B79] px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              {t('guestbook.cta_button')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
