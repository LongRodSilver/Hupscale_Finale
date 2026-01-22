'use client'

import { useTranslations } from "@/hooks/useTranslations"

export default function ContactSection() {
  const { t } = useTranslations();

  return (
    <section className="sticky top-0 h-screen w-full" style={{ zIndex: 7, background: '#007B79', minHeight: '100vh' }}>
      <div className="h-auto lg:h-screen flex flex-col justify-center py-12 px-4 sm:px-8 lg:px-16">
        
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {t('contact.heading')}
          </h2>
          <p className="font-onest text-base sm:text-lg lg:text-xl text-white opacity-90">
            {t('contact.subheading')}
          </p>
        </div>

        {/* 3 Cards Container */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: Email */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 md:hover:scale-105 flex flex-col items-center text-center border-2 border-[#007B79]">
            {/* Icon */}
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#007B79] rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 lg:w-10 lg:h-10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            {/* Title */}
            <h3 className="font-black text-xl lg:text-2xl text-[#232323] mb-4">
              {t('contact.email.title')}
            </h3>
            {/* Description */}
            <p className="font-onest text-sm lg:text-base text-[#232323] mb-6 flex-grow">
              {t('contact.email.description')}
            </p>
            {/* Email Display */}
            <p className="font-onest text-base lg:text-lg text-[#007B79] font-bold mb-6">
              contact@hupscale.com
            </p>
            {/* Button */}
            <a
              href="mailto:contact@hupscale.com"
              className="bg-[#007B79] text-white rounded-full px-6 py-3 font-bold uppercase hover:bg-[#006666] transition-all duration-200 shadow-lg hover:shadow-xl w-full text-center no-underline"
            >
              {t('contact.email.button')}
            </a>
          </div>

          {/* Card 2: Free Coaching */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 md:hover:scale-105 flex flex-col items-center text-center border-2 border-[#007B79]">
            {/* Icon */}
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#007B79] rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 lg:w-10 lg:h-10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            {/* Title */}
            <h3 className="font-black text-xl lg:text-2xl text-[#232323] mb-4">
              {t('contact.coaching.title')}
            </h3>
            {/* Description */}
            <p className="font-onest text-sm lg:text-base text-[#232323] mb-6 flex-grow">
              {t('contact.coaching.description')}
            </p>
            {/* Button */}
            <a
              href="#questionnaire"
              className="bg-[#007B79] text-white rounded-full px-6 py-3 font-bold uppercase hover:bg-[#006666] transition-all duration-200 shadow-lg hover:shadow-xl w-full text-center no-underline"
            >
              {t('contact.coaching.button')}
            </a>
          </div>

          {/* Card 3: Paid Call */}
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 md:hover:scale-105 flex flex-col items-center text-center border-2 border-[#007B79]">
            {/* Icon */}
            <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#007B79] rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 lg:w-10 lg:h-10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            {/* Title */}
            <h3 className="font-black text-xl lg:text-2xl text-[#232323] mb-4">
              {t('contact.paidCall.title')}
            </h3>
            {/* Description */}
            <p className="font-onest text-sm lg:text-base text-[#232323] mb-6 flex-grow">
              {t('contact.paidCall.description')}
            </p>
            {/* Button */}
            <a
              href="#stripe-payment"
              className="bg-[#007B79] text-white rounded-full px-6 py-3 font-bold uppercase hover:bg-[#006666] transition-all duration-200 shadow-lg hover:shadow-xl w-full text-center no-underline"
            >
              {t('contact.paidCall.button')}
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
