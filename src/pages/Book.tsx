import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Clock, MapPin, MessageCircle, Phone, ChevronDown, ChevronUp, AlertCircle, Loader2, CheckCircle2, X } from 'lucide-react';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1DTn5iROXWs-nmxP9x3a2eEMFbg5EKyHU6LPcIB8thuU9YjC5r6TiXcO6VfuAemb4/exec';

type FormData = {
  fullName: string;
  phoneNumber: string;
  eventLocation: string;
  eventDate: string;
  preferredTime: string;
  mehendiType: string;
  numberOfPeople?: string;
  additionalMessage?: string;
};

const faqs = [
  { question: "How long does a bridal mehendi application take?", answer: "Bridal mehendi typically takes between 3 to 6 hours depending on the intricacy and length of the design." },
  { question: "What kind of henna do you use?", answer: "We use 100% natural, organic henna powder mixed with essential oils (like eucalyptus or lavender) and lemon juice. We never use chemical 'black' henna." },
  { question: "How far in advance should I book?", answer: "For bridal bookings, we recommend securing your date at least 3-6 months in advance. For other events, 2-4 weeks is usually sufficient." },
  { question: "Do you travel to the venue?", answer: "Yes, we provide on-location services for bridal and group bookings. Travel fees may apply depending on the distance." },
];

export default function Book() {
  const { search } = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const type = params.get('type');
    if (type) {
      setValue('mehendiType', type);
    }
  }, [search, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      eventLocation: data.eventLocation,
      eventDate: data.eventDate,
      preferredTime: data.preferredTime,
      mehendiType: data.mehendiType,
      numberOfPeople: data.numberOfPeople || '1',
      additionalMessage: data.additionalMessage || '',
    };

    try {
      // Send as JSON POST request via fetch API
      // Using 'text/plain;charset=utf-8' prevents preflight CORS issues with Google Apps Script
      // while delivering standard JSON string in the request body
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned error code ${response.status}.`);
      }

      // Read response if possible
      try {
        const resJson = await response.json();
        if (resJson && resJson.status === 'error') {
          throw new Error(resJson.message || 'The submission was rejected by the server.');
        }
      } catch {
        // Successful response without JSON body is also considered success
      }

      setIsSuccess(true);
      reset();
    } catch (err: any) {
      console.error('Error submitting form:', err);
      // Try fallback with no-cors mode in case of strict cross-origin browser redirect policy
      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });
        setIsSuccess(true);
        reset();
      } catch (fallbackErr: any) {
        setSubmitError(
          err?.message || 'Unable to submit your request at this time. Please check your connection or contact us directly on WhatsApp.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cream pt-24 pb-24">
      {/* Header */}
      <section className="py-16 text-center px-4">
        <h1 className="font-serif text-5xl md:text-6xl text-mehendi mb-6">Book an Appointment</h1>
        <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-8"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Please fill out the form below with your event details. We will get back to you within 24 hours to confirm your booking.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Booking Form */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-xl shadow-sm border border-cream-dark">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-3xl text-mehendi mb-4">Request Sent Successfully!</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Thank you for reaching out to Hema Mehendi Art. Your message and booking request have been saved and sent. We will get back to you shortly!
                </p>
                <button 
                  onClick={() => {
                    setIsSuccess(false);
                    setSubmitError(null);
                  }}
                  className="mt-8 bg-gold hover:bg-mehendi text-white px-8 py-3 rounded-full uppercase tracking-widest text-xs font-semibold transition-all shadow"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {submitError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-red-800">Submission Error</p>
                      <p className="mt-0.5 text-red-600">{submitError}</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setSubmitError(null)}
                      className="text-red-400 hover:text-red-700 p-1"
                      aria-label="Dismiss error"
                    >
                      <X size={16} />
                    </button>
                  </motion.div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input 
                      id="fullName"
                      {...register("fullName", { required: true })}
                      className="w-full text-base px-4 py-3 bg-cream-dark border border-transparent focus:border-gold focus:bg-white focus:ring-0 rounded-md transition-colors"
                      placeholder="Jane Doe"
                      aria-invalid={errors.fullName ? "true" : "false"}
                    />
                    {errors.fullName && <span className="text-red-500 text-xs mt-1" role="alert">This field is required</span>}
                  </div>
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input 
                      id="phoneNumber"
                      type="tel"
                      {...register("phoneNumber", { required: true })}
                      className="w-full text-base px-4 py-3 bg-cream-dark border border-transparent focus:border-gold focus:bg-white focus:ring-0 rounded-md transition-colors"
                      placeholder="+91 90166 13509"
                      aria-invalid={errors.phoneNumber ? "true" : "false"}
                    />
                    {errors.phoneNumber && <span className="text-red-500 text-xs mt-1" role="alert">This field is required</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-semibold text-gray-700 mb-2">Event Date *</label>
                    <input 
                      id="eventDate"
                      type="date"
                      {...register("eventDate", { required: true })}
                      className="w-full text-base px-4 py-3 bg-cream-dark border border-transparent focus:border-gold focus:bg-white focus:ring-0 rounded-md transition-colors"
                      aria-invalid={errors.eventDate ? "true" : "false"}
                    />
                    {errors.eventDate && <span className="text-red-500 text-xs mt-1" role="alert">This field is required</span>}
                  </div>
                  <div>
                    <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time *</label>
                    <input 
                      id="preferredTime"
                      type="time"
                      {...register("preferredTime", { required: true })}
                      className="w-full text-base px-4 py-3 bg-cream-dark border border-transparent focus:border-gold focus:bg-white focus:ring-0 rounded-md transition-colors"
                      aria-invalid={errors.preferredTime ? "true" : "false"}
                    />
                    {errors.preferredTime && <span className="text-red-500 text-xs mt-1" role="alert">This field is required</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="eventLocation" className="block text-sm font-semibold text-gray-700 mb-2">Event Location *</label>
                    <input 
                      id="eventLocation"
                      {...register("eventLocation", { required: true })}
                      className="w-full text-base px-4 py-3 bg-cream-dark border border-transparent focus:border-gold focus:bg-white focus:ring-0 rounded-md transition-colors"
                      placeholder="Surat, Gujarat, India"
                      aria-invalid={errors.eventLocation ? "true" : "false"}
                    />
                    {errors.eventLocation && <span className="text-red-500 text-xs mt-1" role="alert">This field is required</span>}
                  </div>
                  <div>
                    <label htmlFor="mehendiType" className="block text-sm font-semibold text-gray-700 mb-2">Mehendi Type *</label>
                    <select 
                      id="mehendiType"
                      {...register("mehendiType", { required: true })}
                      className="w-full text-base px-4 py-3 bg-cream-dark border border-transparent focus:border-gold focus:bg-white focus:ring-0 rounded-md transition-colors"
                      aria-invalid={errors.mehendiType ? "true" : "false"}
                    >
                      <option value="">Select a style...</option>
                      <option value="Bridal Mehendi">Bridal Mehendi</option>
                      <option value="Arabic Mehendi">Arabic Mehendi</option>
                      <option value="Traditional Indian">Traditional Indian</option>
                      <option value="Rajwadi Mehendi">Rajwadi Mehendi</option>
                      <option value="Portrait Mehendi">Portrait Mehendi</option>
                      <option value="Engagement Mehendi">Engagement Mehendi</option>
                    </select>
                    {errors.mehendiType && <span className="text-red-500 text-xs mt-1" role="alert">This field is required</span>}
                  </div>
                </div>

                <div>
                  <label htmlFor="additionalMessage" className="block text-sm font-semibold text-gray-700 mb-2">Additional Message</label>
                  <textarea 
                    id="additionalMessage"
                    {...register("additionalMessage")}
                    rows={4}
                    className="w-full text-base px-4 py-3 bg-cream-dark border border-transparent focus:border-gold focus:bg-white focus:ring-0 rounded-md transition-colors resize-none"
                    placeholder="Tell us more about your event or specific design requirements..."
                  ></textarea>
                </div>

                <div className="text-xs text-gray-500 mb-6">
                  By submitting this form, you agree to our privacy policy and consent to being contacted regarding your inquiry.
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold/90 text-white py-4 rounded-full uppercase tracking-widest text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending Request...</span>
                    </>
                  ) : (
                    <span>Book Now</span>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
            
            {/* Contact Info Card */}
            <div className="bg-mehendi text-cream p-8 rounded-xl shadow-lg">
              <h3 className="font-serif text-2xl text-gold mb-6">Contact Info</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <div>
                    <p className="font-bold mb-1">Studio Location</p>
                    <p className="text-cream/80 text-sm">Ahmedabad, Gujarat, India - 380061</p>
                    <a 
                      href="https://maps.google.com/?q=Ahmedabad,+Gujarat,+India+380061" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1 mt-1.5 text-xs text-gold hover:text-white transition-colors underline font-medium"
                    >
                      Open in Google Maps &rarr;
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MessageCircle className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <div>
                    <p className="font-bold mb-1">Contact & Inquiries</p>
                    <div className="flex flex-col gap-1.5 text-sm mt-1">
                      <a 
                        href="https://wa.me/919016613509" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-cream/80 hover:text-gold transition-colors inline-flex items-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                        <span>WhatsApp: +91 90166 13509</span>
                      </a>
                      <a 
                        href="tel:+919016613509" 
                        className="text-cream/80 hover:text-gold transition-colors inline-flex items-center gap-2"
                      >
                        <Phone className="w-3.5 h-3.5 text-gold" />
                        <span>Call: +91 90166 13509</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <div>
                    <p className="font-bold mb-1">Business Hours</p>
                    <p className="text-cream/80 text-sm">Mon - Sun: 9:00 AM - 9:00 PM<br/>Events by Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Google Map */}
            <div className="bg-cream-dark h-64 rounded-xl overflow-hidden relative shadow-sm border border-cream-dark">
              <iframe
                title="Hema Mehendi Art Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Ahmedabad%2C%20Gujarat%2C%20India%20380061&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full"
              ></iframe>
            </div>

            {/* FAQs */}
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-cream-dark">
              <h3 className="font-serif text-2xl text-mehendi mb-6">FAQ</h3>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-cream-dark pb-4 last:border-0 last:pb-0">
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full min-h-[44px] py-2 flex justify-between items-center text-left text-gray-800 font-semibold focus:outline-none focus:text-gold transition-colors"
                      aria-expanded={openFaq === idx}
                    >
                      <span className="pr-2 text-sm sm:text-base">{faq.question}</span>
                      {openFaq === idx ? (
                        <ChevronUp className="w-5 h-5 text-gold shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                      )}
                    </button>
                    {openFaq === idx && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2 text-gray-600 text-sm leading-relaxed"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
