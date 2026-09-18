import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, X, ChevronLeft, ChevronRight } from 'lucide-react';
import traditionalMahendiImg from '../assets/images/regenerated_image_1785665258951.jpg';
import engagementMahendiImg from '../assets/images/regenerated_image_1785665571021.jpg';
import thirdCategoryImg from '../assets/images/regenerated_image_1785665806005.jpg';
import rajwadiImg from '../assets/images/regenerated_image_1785772746413.jpg';

const categories = [
  { name: 'Traditional Mahendi', image: traditionalMahendiImg },
  { name: 'Engagement Mahendi', image: engagementMahendiImg },
  { name: 'Bridal Mehendi', image: thirdCategoryImg },
  { name: 'Royal Mahendi Art', image: rajwadiImg },
];

const portfolio = [
  'https://res.cloudinary.com/iokrdk9i/image/upload/f_auto,q_auto/v1789731290/IMG_0073.jpg',
  'https://res.cloudinary.com/iokrdk9i/image/upload/f_auto,q_auto/v1789731287/IMG_7687.jpg',
  'https://res.cloudinary.com/iokrdk9i/image/upload/f_auto,q_auto/v1789731286/IMG_7099.jpg',
];

export default function Home() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % portfolio.length));
  }, []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + portfolio.length) % portfolio.length));
  }, []);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setLightboxIndex(null);
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [lightboxIndex, showNext, showPrev]);

  return (
    <div className="bg-cream">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1610660429781-b51f7bb99307?auto=format&fit=crop&q=80&w=2000" 
            alt="Mehendi Background" 
            className="w-full h-full object-cover opacity-80 scale-105 transform hover:scale-100 transition-transform duration-[10s]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-cream"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-wide drop-shadow-lg">
              Hema Mehendi Art
            </h1>
            <p className="font-sans text-lg md:text-2xl text-cream-dark mb-10 max-w-2xl mx-auto font-light drop-shadow-md">
              Bespoke luxury henna design by the best mehndi artist for your most cherished moments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/book" className="bg-gold hover:bg-gold/90 text-white px-10 py-4 rounded-full uppercase tracking-widest text-sm font-semibold transition-all transform hover:scale-105 shadow-xl">
                Book Appointment
              </Link>
              <a href="#portfolio" className="text-white hover:text-gold border border-white/30 hover:border-gold px-10 py-4 rounded-full uppercase tracking-widest text-sm font-semibold transition-all backdrop-blur-sm">
                View Portfolio
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-mehendi mb-8">The Art of Tradition</h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light max-w-4xl mx-auto mb-10">
            With over a decade of experience, Hema transforms traditional henna application into a luxurious, bespoke experience. Every swirl and motif is a testament to heritage, tailored to tell your unique story on your special day.
          </p>
          <Link to="/about" className="inline-flex items-center text-mehendi font-semibold tracking-wider hover:text-gold transition-colors">
            READ OUR STORY <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Categories (Inspired by Tea Leaves circles in image) */}
      <section className="py-24 bg-cream-dark px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
             <h2 className="font-serif text-4xl md:text-5xl text-mehendi mb-4">Our Services</h2>
             <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {categories.map((cat, idx) => (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: idx * 0.15 + 0.2, type: "spring", stiffness: 100 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-transparent group-hover:border-gold transition-all duration-500 mb-6 relative">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-mehendi/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <h3 className="font-serif text-2xl text-mehendi group-hover:text-gold transition-colors">{cat.name}</h3>
                <Link to="/services" className="text-sm tracking-widest text-gray-500 mt-2 hover:text-mehendi uppercase">Explore</Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Portfolio Gallery */}
      <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
         <div className="text-center mb-16">
             <h2 className="font-serif text-4xl md:text-5xl text-mehendi mb-4">Portfolio</h2>
             <p className="text-gray-600 font-light mb-6">A glimpse into our artistic creations</p>
             <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {portfolio.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="aspect-[3/4] overflow-hidden rounded-xl cursor-pointer relative group shadow-md hover:shadow-2xl transition-all duration-500 bg-cream-dark border border-gold/15"
                onClick={() => setLightboxIndex(idx)}
              >
                <img 
                  src={img} 
                  alt={`Hema Mehendi Art Design ${idx + 1}`} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                  <span className="text-white border border-white/60 bg-black/30 backdrop-blur-md px-6 py-2.5 rounded-full tracking-widest text-xs font-semibold uppercase shadow-lg">VIEW DESIGN</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Change Link to /services or keep it, since there is no /portfolio route. Just link to /services or remove */}
          <div className="mt-16 text-center">
             <Link to="/services" className="border-2 border-mehendi text-mehendi hover:bg-mehendi hover:text-white px-10 py-4 rounded-full uppercase tracking-widest text-sm font-semibold transition-all">
                View All Services
             </Link>
          </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar with Counter & Close */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-center z-10">
              <span className="text-white/80 text-sm font-medium tracking-widest bg-black/40 px-3 py-1.5 rounded-full border border-white/20">
                {lightboxIndex + 1} / {portfolio.length}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(null);
                }}
                className="text-white/70 hover:text-white p-2.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gold"
                aria-label="Close lightbox"
              >
                <X size={24} />
              </button>
            </div>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-3 sm:left-6 text-white/70 hover:text-white p-3 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 transition-all z-10 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Current Image */}
            <div 
              className="relative max-w-4xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={portfolio[lightboxIndex]} 
                alt={`Hema Mehendi Design ${lightboxIndex + 1}`} 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-3 sm:right-6 text-white/70 hover:text-white p-3 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 transition-all z-10 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials */}
      <section className="py-24 bg-mehendi text-cream px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <Star className="w-12 h-12 text-gold mx-auto mb-8 opacity-80" />
          <h2 className="font-serif text-3xl md:text-5xl mb-12 leading-tight">"Hema's artistry made my bridal look complete. The color was incredibly dark and the designs were flawlessly intricate."</h2>
          <p className="tracking-widest uppercase text-gold font-bold">Priya S. &mdash; Bride</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 text-center bg-cream-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-mehendi/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-serif text-5xl md:text-6xl text-mehendi mb-6">Ready to Adorn Your Hands?</h2>
          <p className="text-xl text-gray-600 font-light mb-10">Secure your date for an unforgettable henna experience.</p>
          <Link to="/book" className="bg-gold hover:bg-gold/90 text-white px-12 py-5 rounded-full uppercase tracking-widest text-sm font-semibold transition-all shadow-lg inline-block">
             Book Your Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
