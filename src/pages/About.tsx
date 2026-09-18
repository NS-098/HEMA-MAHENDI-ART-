import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import aboutImage from '../assets/images/regenerated_image_1785661721449.jpg';

const reasons = [
  "10+ Years of Professional Experience",
  "100% Organic, Chemical-Free Henna",
  "Bespoke, Custom-Designed Patterns",
  "Guaranteed Dark, Long-Lasting Stain",
  "Hygienic and Professional Setup",
  "Specialized in Bridal & Portrait Art",
];

export default function About() {
  return (
    <div className="bg-cream pt-24">
      {/* Hero Header */}
      <section className="py-20 px-4 text-center bg-mehendi text-cream">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-6 text-gold">About Hema</h1>
          <p className="text-xl font-light text-cream/80 max-w-2xl mx-auto">
            A journey of passion, precision, and the timeless art of henna.
          </p>
        </motion.div>
      </section>

      {/* Story & Experience */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img 
              src={aboutImage} 
              alt="Hema working on mehendi" 
              className="rounded-2xl shadow-xl w-full object-cover aspect-square md:aspect-[4/5] lg:aspect-square"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl text-mehendi mb-6">Our Story</h2>
            <div className="w-16 h-1 bg-gold mb-8"></div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Founded on a deep love for Indian heritage and artistry, Hema Mehendi Art began over a decade ago. What started as a childhood fascination blossomed into a professional endeavor dedicated to adorning clients on their most significant days.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              Every stroke of the henna cone is applied with precision and intention. We believe that mehendi is more than just a temporary tattoo; it's a blessing, a symbol of joy, and a deeply personal piece of art tailored to reflect your unique journey.
            </p>
            <div className="grid grid-cols-2 gap-8 text-mehendi border-t border-cream-dark pt-8">
              <div>
                <span className="block font-serif text-4xl text-gold mb-2">10+</span>
                <span className="uppercase tracking-widest text-sm font-semibold">Years Experience</span>
              </div>
              <div>
                <span className="block font-serif text-4xl text-gold mb-2">500+</span>
                <span className="uppercase tracking-widest text-sm font-semibold">Happy Brides</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-cream-dark px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-white p-12 shadow-sm rounded-lg border-t-4 border-mehendi">
            <h3 className="font-serif text-3xl text-mehendi mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To provide an unparalleled henna experience through exquisite designs, professional service, and the use of the highest quality, organic ingredients, ensuring safety and a stunning stain for every client.
            </p>
          </div>
          <div className="bg-white p-12 shadow-sm rounded-lg border-t-4 border-gold">
            <h3 className="font-serif text-3xl text-mehendi mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To elevate the traditional art of mehendi onto the global stage, blending heritage with modern aesthetics, and setting the standard for luxury henna services worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-mehendi mb-4">Why Choose Us</h2>
          <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
          {reasons.map((reason, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-cream-dark transition-colors"
            >
              <CheckCircle2 className="text-gold w-6 h-6 shrink-0" />
              <span className="text-lg text-gray-800">{reason}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-mehendi text-center px-4">
        <h2 className="font-serif text-4xl md:text-5xl text-gold mb-6">Let's Create Art Together</h2>
        <p className="text-cream/80 text-lg mb-10 max-w-2xl mx-auto">
          Contact us to discuss your vision and book your personalized henna session.
        </p>
        <Link to="/book" className="bg-gold hover:bg-white hover:text-mehendi text-white px-10 py-4 rounded-full uppercase tracking-widest text-sm font-semibold transition-all shadow-xl inline-block">
          Book Appointment
        </Link>
      </section>
    </div>
  );
}
