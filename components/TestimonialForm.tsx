'use client';

import { useState } from 'react';
import { useTranslations } from '@/hooks/useTranslations';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx3EhzXxBPrjyXlPa1Ki772FZjyUpuxHyl5WxHnAt6CkwgKbwgKr9WoF_3jx4HfyQsT/exec';

export default function TestimonialForm() {
  const { t } = useTranslations();
  const [formData, setFormData] = useState({
    name: '',
    instagram: '',
    testimony: '',
    photo: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const uploadPhotoToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'hupscale_testimonials');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dwerrbdot/image/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        return data.secure_url;
      }
    } catch (error) {
      console.error('Photo upload failed:', error);
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.testimony) {
      setErrorMessage('Please fill in all required fields (Name and Testimony)');
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Upload photo if provided
      let photoUrl = '';
      if (formData.photo) {
        const uploadedUrl = await uploadPhotoToCloudinary(formData.photo);
        photoUrl = uploadedUrl || '';
      }

      // Submit to Google Sheets
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          instagram: formData.instagram,
          testimony: formData.testimony,
          photo_url: photoUrl
        })
      });

      // Since mode is 'no-cors', we can't read the response
      // Assume success if no error was thrown
      setSubmitStatus('success');
      setFormData({
        name: '',
        instagram: '',
        testimony: '',
        photo: null
      });
      
      // Reset file input
      const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('An error occurred while submitting your testimonial. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#E8F5F5] to-white rounded-2xl p-8 shadow-lg">
      {submitStatus === 'success' ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[#181818] mb-4">
            Thank You!
          </h3>
          <p className="text-gray-600 mb-6">
            Your testimonial has been submitted successfully. It will appear on the page once approved.
          </p>
          <button
            onClick={() => setSubmitStatus('idle')}
            className="bg-[#007B79] text-white px-8 py-3 rounded-full font-bold hover:bg-[#006666] transition-all duration-300"
          >
            Submit Another Testimonial
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-[#181818] mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#007B79] focus:outline-none transition-colors"
              placeholder="Your full name"
            />
          </div>

          {/* Instagram Handle */}
          <div>
            <label htmlFor="instagram" className="block text-sm font-bold text-[#181818] mb-2">
              Instagram Handle <span className="text-gray-400">(Optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-400">@</span>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#007B79] focus:outline-none transition-colors"
                placeholder="yourusername"
              />
            </div>
          </div>

          {/* Testimony */}
          <div>
            <label htmlFor="testimony" className="block text-sm font-bold text-[#181818] mb-2">
              Your Testimonial <span className="text-red-500">*</span>
            </label>
            <textarea
              id="testimony"
              name="testimony"
              value={formData.testimony}
              onChange={handleInputChange}
              required
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#007B79] focus:outline-none transition-colors resize-none"
              placeholder="Share your experience with Hupscale..."
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label htmlFor="photo-upload" className="block text-sm font-bold text-[#181818] mb-2">
              Photo <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="file"
              id="photo-upload"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#007B79] focus:outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#007B79] file:text-white hover:file:bg-[#006666]"
            />
            {formData.photo && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {formData.photo.name}
              </p>
            )}
          </div>

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#007B79] text-white py-4 rounded-full font-bold text-lg hover:bg-[#006666] hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Your testimonial will be reviewed before being published on the page.
          </p>
        </form>
      )}
    </div>
  );
}
