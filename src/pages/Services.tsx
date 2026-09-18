import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: "Bridal Mehendi",
    image: "https://images.unsplash.com/photo-1594957434771-8bc6bcf95221?auto=format&fit=crop&q=80&w=800",
    description: "Intricate, full-length designs for the bride, blending traditional motifs with personal elements to tell a beautiful love story.",
    occasion: "Weddings",
    pricing: "From $250",
  },
  {
    title: "Arabic Mehendi",
    image: "https://images.unsplash.com/photo-1589418652438-e6b7b2520330?auto=format&fit=crop&q=80&w=800",
    description: "Elegant and flowing designs characterized by bold outlines, floral patterns, and negative space for a modern, chic look.",
    occasion: "Parties, Festivals",
    pricing: "From $50",
  },
  {
    title: "Traditional Indian",
    image: "https://images.unsplash.com/photo-1632207393457-30292518e390?auto=format&fit=crop&q=80&w=800",
    description: "Dense, symmetrical designs featuring peacocks, lotuses, and intricate filler patterns that cover the hands completely.",
    occasion: "Festivals, Weddings",
    pricing: "From $100",
  },
  {
    title: "Rajwadi Mehendi",
    image: "https://images.unsplash.com/photo-1549466556-9b54c86e2eb9?auto=format&fit=crop&q=80&w=800",
    description: "Royal and majestic designs inspired by the heritage of Rajasthan, featuring detailed architecture and royal figures.",
    occasion: "Weddings, Special Events",
    pricing: "From $150",
  },
  {
    title: "Portrait Mehendi",
    image: "https://images.unsplash.com/photo-1595290293434-7164971c26cc?auto=format&fit=crop&q=80&w=800",
    description: "Highly specialized realistic portraits drawn with henna. Perfect for depicting the bride and groom or loved ones.",
    occasion: "Weddings, Anniversaries",
    pricing: "From $300",
  },
  {
    title: "Engagement Mehendi",
    image: "https://images.unsplash.com/photo-1550269324-4f938d839bb0?auto=format&fit=crop&q=80&w=800",
    description: "Sophisticated designs up to the mid-arm, perfect for the bride-to-be looking for elegance without full bridal heaviness.",
    occasion: "Engagements",
    pricing: "From $120",
  },
];

export default function Services() {
  return (
    <div className="bg-cream pt-24 pb-24">
      {/* Header */}
      <section className="py-16 text-center px-4">
        <h1 className="font-serif text-5xl md:text-6xl text-mehendi mb-6">Mehendi Categories</h1>
        <div className="w-24 h-1 bg-gold mx-auto rounded-full mb-8"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Explore our diverse range of henna styles. Each design is uniquely crafted to complement your occasion and personal aesthetic.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-cream-dark flex flex-col"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-cream/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-mehendi uppercase tracking-wide shadow-sm">
                  {service.pricing}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow text-center">
                <h3 className="font-serif text-2xl text-mehendi mb-3">{service.title}</h3>
                <p className="text-sm text-gray-500 mb-4 font-semibold uppercase tracking-wider">For {service.occasion}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>
                <Link
                  to={`/book?type=${encodeURIComponent(service.title)}`}
                  className="w-full min-h-[44px] flex items-center justify-center bg-cream-dark text-mehendi hover:bg-mehendi hover:text-white border border-mehendi/20 py-3 rounded-full uppercase tracking-widest text-xs font-bold transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
