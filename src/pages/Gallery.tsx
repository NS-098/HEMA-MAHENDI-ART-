import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, Eye, Calendar, Sparkles } from 'lucide-react';

import port1 from '../assets/images/portfolio1.jpg';
import port2 from '../assets/images/portfolio2.jpg';
import port3 from '../assets/images/portfolio3.jpg';
import port4 from '../assets/images/portfolio4.jpg';
import port5 from '../assets/images/portfolio5.jpg';
import port6 from '../assets/images/portfolio6.jpg';
import traditionalImg from '../assets/images/regenerated_image_1785665258951.jpg';
import engagementImg from '../assets/images/regenerated_image_1785665571021.jpg';
import bridalImg from '../assets/images/regenerated_image_1785665806005.jpg';
import rajwadiImg from '../assets/images/regenerated_image_1785772746413.jpg';

type GalleryItem = {
  id: number;
  title: string;
  category: 'Bridal' | 'Engagement' | 'Traditional' | 'Royal Rajwadi' | 'Feet Mehndi';
  image: string;
  description: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Signature Bridal Full Arm",
    category: "Bridal",
    image: bridalImg,
    description: "Detailed bridal composition with portraiture, peacock elements, and fine geometric lattices."
  },
  {
    id: 2,
    title: "Royal Rajwadi Wedding Set",
    category: "Royal Rajwadi",
    image: rajwadiImg,
    description: "Inspired by Rajasthani jharokhas and royal court processions."
  },
  {
    id: 3,
    title: "Contemporary Engagement Henna",
    category: "Engagement",
    image: engagementImg,
    description: "Delicate negative space florets tailored for the modern bride-to-be."
  },
  {
    id: 4,
    title: "Classic Traditional Gujarati Motif",
    category: "Traditional",
    image: traditionalImg,
    description: "Symmetrical auspicious paisley designs with deep organic stain."
  },
  {
    id: 5,
    title: "Intricate Palm & Wrist Flow",
    category: "Bridal",
    image: 'https://res.cloudinary.com/iokrdk9i/image/upload/f_auto,q_auto/v1789731290/IMG_0073.jpg',
    description: "High-density micro-mandala with lace borders and shading."
  },
  {
    id: 6,
    title: "Backhand Floral Mandala",
    category: "Engagement",
    image: 'https://res.cloudinary.com/iokrdk9i/image/upload/f_auto,q_auto/v1789731287/IMG_7687.jpg',
    description: "Minimalist yet striking lotus centerpiece with finger lace work."
  },
  {
    id: 7,
    title: "Artisan Cuff & Finger Motifs",
    category: "Traditional",
    image: 'https://res.cloudinary.com/iokrdk9i/image/upload/f_auto,q_auto/v1789731286/IMG_7099.jpg',
    description: "Graceful fusion of Mughal archways and traditional leaf tendrils."
  },
  {
    id: 8,
    title: "Bridal Feet Henna Design",
    category: "Feet Mehndi",
    image: port4,
    description: "Matching feet design featuring anklet borders and toe accents."
  },
  {
    id: 9,
    title: "Festive Sangeet Celebration",
    category: "Engagement",
    image: port2,
    description: "Airy, fast-drying organic henna designed for wedding guests."
  },
  {
    id: 10,
    title: "Heritage Bridal Palms",
    category: "Bridal",
    image: port1,
    description: "Complete elbow-length bridal mehndi with couple love story elements."
  },
  {
    id: 11,
    title: "Royal Anklet Pattern",
    category: "Feet Mehndi",
    image: port5,
    description: "Intricate payal-inspired foot henna with central mandala medallion."
  },
  {
    id: 12,
    title: "Modern Minimalist Charm",
    category: "Traditional",
    image: port6,
    description: "Clean vine motifs and shaded florals for family celebrations."
  }
];

const categories = ['All', 'Bridal', 'Engagement', 'Traditional', 'Royal Rajwadi', 'Feet Mehndi'] as const;

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const showNext = useCallback(() => {
    setLightboxIndex(prev => (prev === null ? null : (prev + 1) % filteredItems.length));
  }, [filteredItems.length]);

  const showPrev = useCallback(() => {
    setLightboxIndex(prev => (prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length));
  }, [filteredItems.length]);

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
    <div className="bg-cream pt-24 pb-24 min-h-screen">
      {/* Header */}
      <section className="py-16 text-center px-4 bg-mehendi text-cream">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-gold uppercase tracking-widest text-sm font-semibold flex items-center justify-center gap-2 mb-3">
            <Sparkles size={16} /> Exclusive Henna Portfolio
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-gold mb-4">Mehndi Design Gallery</h1>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-6"></div>
          <p className="text-cream/80 max-w-2xl mx-auto text-lg font-light">
            Explore authentic hand-drawn henna designs crafted by Hema Suthar in Ahmedabad. Every piece features 100% natural, chemical-free organic henna for deep, long-lasting stains.
          </p>
        </motion.div>
      </section>

      {/* Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-10">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                setSelectedCategory(cat);
                setLightboxIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-mehendi text-gold shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-cream-dark border border-cream-dark'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-cream-dark flex flex-col"
            >
              <div 
                className="relative aspect-[4/5] overflow-hidden cursor-pointer bg-neutral-100"
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mehendi/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <span className="text-xs uppercase tracking-widest text-gold font-semibold block mb-1">
                      {item.category}
                    </span>
                    <p className="font-serif text-xl font-bold flex items-center gap-2">
                      <Eye size={18} className="text-gold" /> Click to Zoom
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-cream-dark text-mehendi mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl text-mehendi font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-cream-dark flex items-center justify-between">
                  <button 
                    onClick={() => setLightboxIndex(index)}
                    className="text-xs text-mehendi font-semibold hover:text-gold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    View Details &rarr;
                  </button>
                  <Link 
                    to={`/book?type=${encodeURIComponent(item.category)}`}
                    className="text-xs text-gold font-semibold hover:text-mehendi transition-colors"
                  >
                    Book This Style
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
              aria-label="Close Preview"
            >
              <X size={28} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>

            <div 
              className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={filteredItems[lightboxIndex].id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-white/10"
              />
              <div className="text-center text-white mt-4 max-w-xl">
                <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h3 className="font-serif text-2xl text-white font-bold mt-1">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-sm text-white/80 mt-1">
                  {filteredItems[lightboxIndex].description}
                </p>
                <div className="mt-4 flex items-center justify-center gap-4">
                  <Link
                    to={`/book?type=${encodeURIComponent(filteredItems[lightboxIndex].category)}`}
                    onClick={() => setLightboxIndex(null)}
                    className="bg-gold text-white hover:bg-gold/90 px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all inline-flex items-center gap-2"
                  >
                    <Calendar size={14} /> Book This Mehndi Style
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 mt-20 text-center bg-white rounded-3xl p-10 sm:p-12 border border-cream-dark shadow-sm">
        <h2 className="font-serif text-3xl sm:text-4xl text-mehendi mb-4">Want a Custom Bridal Design?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Bring your own inspiration photos or let Hema Suthar craft a personalized bridal motif featuring your wedding date, groom's name, or love story.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/book"
            className="bg-gold hover:bg-gold/90 text-white px-8 py-3.5 rounded-full uppercase tracking-wider text-sm font-semibold transition-all shadow-md"
          >
            Book Appointment
          </Link>
          <Link
            to="/contact"
            className="bg-cream hover:bg-cream-dark text-mehendi border border-mehendi/20 px-8 py-3.5 rounded-full uppercase tracking-wider text-sm font-semibold transition-all"
          >
            Contact Studio
          </Link>
        </div>
      </section>
    </div>
  );
}
