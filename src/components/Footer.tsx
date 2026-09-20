import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-mehendi text-cream-dark pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand & Intro */}
          <div>
            <h3 className="font-serif text-3xl text-gold mb-4">Hema Mehendi Art</h3>
            <p className="text-cream/80 leading-relaxed mb-6">
              Elevating traditional mehendi into a modern art form. Specializing in bespoke bridal, traditional, and contemporary henna designs tailored for your special moments.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/hema_mahendi_art/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://wa.me/919016613509" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="WhatsApp (+91 90166 13509)"
                title="Chat on WhatsApp (+91 90166 13509)"
                className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-xl mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-cream/80 hover:text-gold transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-cream/80 hover:text-gold transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-cream/80 hover:text-gold transition-colors">Mehendi Services</Link></li>
              <li><Link to="/gallery" className="text-cream/80 hover:text-gold transition-colors">Design Gallery</Link></li>
              <li><Link to="/contact" className="text-cream/80 hover:text-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/book" className="text-cream/80 hover:text-gold transition-colors">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-xl mb-4 text-white">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-cream/80">
                <MapPin size={20} className="text-gold shrink-0 mt-1" />
                <div>
                  <span>Ahmedabad, Gujarat, India - 380061</span>
                  <a 
                    href="https://maps.google.com/?q=Ahmedabad,+Gujarat,+India+380061" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block text-xs text-gold hover:text-white mt-1 underline"
                  >
                    View on Google Maps &rarr;
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-cream/80">
                <Phone size={20} className="text-gold shrink-0" />
                <div className="flex gap-2 items-center">
                  <a href="tel:+919016613509" className="hover:text-gold transition-colors">
                    +91 90166 13509
                  </a>
                  <span className="text-cream/40">|</span>
                  <a href="https://wa.me/919016613509" target="_blank" rel="noopener noreferrer" className="text-xs bg-[#25D366]/20 text-green-300 border border-[#25D366]/40 px-2 py-0.5 rounded-full hover:bg-[#25D366] hover:text-white transition-all">
                    WhatsApp
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-cream/80">
                <Mail size={20} className="text-gold shrink-0" />
                <a href="mailto:hemasuthar3700@gmail.com" className="hover:text-gold transition-colors">
                  hemasuthar3700@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-cream/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-cream/60">
          <p>&copy; {new Date().getFullYear()} Hema Mehendi Art. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="hover:text-gold">Privacy Policy</Link>
            <Link to="#" className="hover:text-gold">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
