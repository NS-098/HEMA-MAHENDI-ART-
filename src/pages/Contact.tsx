import { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail, MessageCircle, Clock, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw1DTn5iROXWs-nmxP9x3a2eEMFbg5EKyHU6LPcIB8thuU9YjC5r6TiXcO6VfuAemb4/exec';

type ContactFormData = {
  fullName: string;
  phoneNumber: string;
  email?: string;
  subject?: string;
  message: string;
};

const faqs = [
  { 
    question: "Where is Hema Mehendi Art studio located?", 
    answer: "Our studio is located in Ahmedabad, Gujarat, India - 380061. We also offer doorstep and on-location bridal mehndi services across Ahmedabad and surrounding areas." 
  },
  { 
    question: "How can I book an appointment?", 
    answer: "You can book directly through our online Booking form, call us at +91 90166 13509, or message us on WhatsApp for instant confirmation." 
  },
  { 
    question: "What products do you use for mehndi?", 
    answer: "We strictly use 100% natural, chemical-free organic henna prepared with essential eucalyptus and lavender oils, ensuring a rich dark burgundy/brown stain with zero irritation." 
  },
  { 
    question: "Do you travel for destination weddings?", 
    answer: "Yes, we travel across Gujarat and all over India for destination weddings, bridal events, and sangeet parties." 
  }
];

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      eventLocation: data.email || 'Contact Page Inquiry',
      eventDate: new Date().toISOString().split('T')[0],
      preferredTime: 'General Inquiry',
      mehendiType: data.subject || 'Contact Inquiry',
      numberOfPeople: '1',
      additionalMessage: data.message,
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      setIsSuccess(true);
      reset();
    } catch {
      setSubmitError('Unable to send message right now. Please call or WhatsApp us directly at +91 90166 13509.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-cream pt-24 pb-24 min-h-screen">
      {/* Header */}
      <section className="py-16 text-center px-4 bg-mehendi text-cream">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-gold uppercase tracking-widest text-sm font-semibold mb-2 block">
            We'd Love to Hear From You
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-gold mb-4">Contact Hema Mehendi Art</h1>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-6"></div>
          <p className="text-cream/80 max-w-2xl mx-auto text-lg font-light">
            Have a question about bridal designs, dates, or booking our team for your special occasion? Reach out directly via WhatsApp, call, or send us a message below.
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Cards & Studio Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-cream-dark">
              <h2 className="font-serif text-2xl text-mehendi mb-6">Studio Information</h2>
              
              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-cream-dark flex items-center justify-center shrink-0 text-gold">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Studio Address</h3>
                    <p className="text-gray-600 text-sm mt-0.5">Ahmedabad, Gujarat, India - 380061</p>
                    <a 
                      href="https://maps.google.com/?q=Ahmedabad,+Gujarat,+India+380061" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1 mt-1 text-xs text-gold hover:text-mehendi font-semibold transition-colors"
                    >
                      Open in Google Maps &rarr;
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-cream-dark flex items-center justify-center shrink-0 text-gold">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Direct Phone</h3>
                    <a 
                      href="tel:+919016613509" 
                      className="text-gray-600 text-sm mt-0.5 block hover:text-gold transition-colors"
                    >
                      +91 90166 13509
                    </a>
                    <span className="text-xs text-gray-400">Available Mon - Sun (9 AM - 9 PM)</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0 text-[#25D366]">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">WhatsApp Chat</h3>
                    <a 
                      href="https://wa.me/919016613509" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#25D366] font-medium text-sm mt-0.5 inline-flex items-center gap-1 hover:underline"
                    >
                      Chat on WhatsApp (+91 90166 13509) &rarr;
                    </a>
                    <span className="text-xs text-gray-400 block">Instant response for bookings & photos</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-cream-dark flex items-center justify-center shrink-0 text-gold">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Address</h3>
                    <a 
                      href="mailto:hemasuthar3700@gmail.com" 
                      className="text-gray-600 text-sm mt-0.5 block hover:text-gold transition-colors"
                    >
                      hemasuthar3700@gmail.com
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-cream-dark flex items-center justify-center shrink-0 text-gold">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Operating Hours</h3>
                    <p className="text-gray-600 text-sm mt-0.5">Mon - Sun: 9:00 AM - 9:00 PM</p>
                    <p className="text-xs text-gold font-medium mt-0.5">Events & Weddings by Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-cream-dark h-64 rounded-2xl overflow-hidden shadow-sm border border-cream-dark">
              <iframe
                title="Hema Mehendi Art Ahmedabad Location"
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
          </div>

          {/* Right Column: Inquiry Form & FAQs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-cream-dark">
              <h2 className="font-serif text-3xl text-mehendi mb-2">Send Us an Inquiry</h2>
              <p className="text-gray-600 text-sm mb-6">
                Fill in your details below and we will get back to you promptly with pricing and availability.
              </p>

              {isSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900">Message Sent Successfully!</h4>
                    <p className="text-sm mt-0.5 text-green-700">
                      Thank you for contacting Hema Mehendi Art. We will respond within a few hours. For immediate confirmation, please WhatsApp us at +91 90166 13509.
                    </p>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-900">Notice</h4>
                    <p className="text-sm mt-0.5 text-amber-700">{submitError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      {...register('fullName', { required: 'Please enter your name' })}
                      placeholder="e.g. Priya Patel"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold transition-colors text-sm"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      {...register('phoneNumber', { required: 'Please enter your phone number' })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold transition-colors text-sm"
                    />
                    {errors.phoneNumber && (
                      <p className="text-xs text-red-500 mt-1">{errors.phoneNumber.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                      Inquiry Subject
                    </label>
                    <select
                      {...register('subject')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold transition-colors text-sm bg-white"
                    >
                      <option value="Bridal Mehndi Inquiry">Bridal Mehndi Inquiry</option>
                      <option value="Engagement / Sangeet Booking">Engagement / Sangeet Booking</option>
                      <option value="Festival / Family Mehndi">Festival / Family Mehndi</option>
                      <option value="Destination Wedding Travel">Destination Wedding Travel</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                    Your Message / Event Details *
                  </label>
                  <textarea
                    rows={4}
                    {...register('message', { required: 'Please enter your message' })}
                    placeholder="Tell us about your event date, location in Ahmedabad, number of people, or preferred mehndi styles..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-gold transition-colors text-sm"
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-mehendi hover:bg-mehendi/90 text-gold px-8 py-3.5 rounded-full uppercase tracking-widest text-xs font-semibold transition-all inline-flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send size={14} /> Send Message
                      </>
                    )}
                  </button>

                  <Link
                    to="/book"
                    className="text-xs text-gray-600 hover:text-gold transition-colors underline"
                  >
                    Need a specific date reservation? Go to Booking form &rarr;
                  </Link>
                </div>
              </form>
            </div>

            {/* FAQs */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-cream-dark">
              <h3 className="font-serif text-2xl text-mehendi mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-cream-dark pb-4 last:border-0 last:pb-0">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">{faq.question}</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">{faq.answer}</p>
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
