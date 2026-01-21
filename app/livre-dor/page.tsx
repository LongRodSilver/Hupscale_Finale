'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from '@/hooks/useTranslations';
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
  const { t } = useTranslations();
  const [expandedTestimonials, setExpandedTestimonials] = useState<{ [key: number]: boolean }>({});
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback testimonials (hardcoded from homepage)
  const fallbackTestimonials: Testimonial[] = [
    {
      name: "Haesoo",
      testimony: t('testimonials.reviews.haesoo'),
      instagram: "haesoo"
    },
    {
      name: "Josef L.",
      testimony: t('testimonials.reviews.josef'),
      instagram: "josef"
    },
    {
      name: "Géraud D.",
      testimony: t('testimonials.reviews.geraud'),
      instagram: "geraud"
    },
    {
      name: "Anissa L.",
      testimony: t('testimonials.reviews.anissa'),
      instagram: "anissa"
    },
    {
      name: "Rory H.",
      testimony: t('testimonials.reviews.rory'),
      instagram: "rory"
    },
    {
      name: "Franck B.",
      testimony: t('testimonials.reviews.franck'),
      instagram: "franck"
    },
    {
      name: "Jazmin P.",
      testimony: t('testimonials.reviews.jazmin'),
      instagram: "jazmin"
    }
  ];

  // Load approved testimonials from Google Sheets
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setTestimonials(data);
          } else {
            // Use fallback if no approved testimonials
            setTestimonials(fallbackTestimonials);
          }
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.error('Failed to load testimonials:', error);
        setTestimonials(fallbackTestimonials);
      } finally {
        setIsLoading(false);
      }
    };

    loadTestimonials();
  }, []);

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
    <div className="min-h-screen bg-gradient-to-b from-white to-[#E8F5F5]">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#181818] mb-6">
            {t('navigation.guestbook')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share your experience with Hupscale and read what others have to say about working with us.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#181818] text-center mb-12">
            What Our Clients Say
          </h2>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#007B79]"></div>
              <p className="mt-4 text-gray-600">Loading testimonials...</p>
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
                          href={`https://instagram.com/${testimonial.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#007B79] hover:text-[#006666] transition-colors"
                        >
                          @{testimonial.instagram}
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
                      {expandedTestimonials[index] ? 'Show less' : 'Read more'}
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
            Share Your Experience
          </h2>
          <p className="text-gray-600 text-center mb-12">
            We'd love to hear about your experience working with Hupscale. Your testimonial helps others discover how we can help them grow.
          </p>
          <TestimonialForm />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#007B79] to-[#00A8A6] rounded-3xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Scale Your Business?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join our growing community of successful clients and let's make your brand shine.
          </p>
          <a
            href={getImagePath('/#contact')}
            className="inline-block bg-white text-[#007B79] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}
