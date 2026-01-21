'use client'

import { useTranslations } from "@/hooks/useTranslations"

export default function ContactSection() {
  const { t } = useTranslations();

  return (
    <section className="sticky top-0 h-screen w-full" style={{ zIndex: 8, background: '#007B79', minHeight: '100vh' }}>
      <div className="h-full flex flex-col justify-center py-12 px-4 sm:px-8 lg:px-16">
        
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
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col items-center text-center border-2 border-[#007B79]">
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
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col items-center text-center border-2 border-[#007B79]">
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
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex flex-col items-center text-center border-2 border-[#007B79]">
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
    </section>
  )
}
