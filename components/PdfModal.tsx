'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from '@/hooks/useTranslations';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export default function PdfModal({ isOpen, onClose, pdfUrl }: PdfModalProps) {
  const { t } = useTranslations();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prevent right-click on modal content
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-75 p-4"
      onClick={handleBackdropClick}
      onContextMenu={handleContextMenu}
    >
      <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#232323]">
            {t('pdf.title')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden relative">
          <iframe
            src={`${pdfUrl}#page=${currentPage}&toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full border-0"
            title="PDF Viewer"
            onLoad={() => setIsLoading(false)}
            style={{ pointerEvents: 'auto' }}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007B79]"></div>
            </div>
          )}
        </div>

        {/* Footer with Navigation */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#007B79] text-white rounded-full hover:bg-[#006666] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
          >
            {t('pdf.previous')}
          </button>

          <div className="text-[#232323] font-semibold">
            {t('pdf.page')} {currentPage} / {totalPages || '...'}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#007B79] text-white rounded-full hover:bg-[#006666] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
          >
            {t('pdf.next')}
          </button>
        </div>

        {/* Watermark overlay to prevent easy screenshots */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(0,123,121,0.02) 100px, rgba(0,123,121,0.02) 200px)',
          }}
        />
      </div>
    </div>
  );
}
