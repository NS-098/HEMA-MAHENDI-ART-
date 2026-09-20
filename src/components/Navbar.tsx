import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logo from '../assets/images/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-4' : 'bg-white py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 z-50">
            <img src={logo} alt="Hema Mehendi Art" className="h-10 w-10 md:h-12 md:w-12 object-contain" />
            <span className="font-serif text-2xl font-bold tracking-wider text-mehendi">
              Hema Mehendi
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm uppercase tracking-widest hover:text-gold transition-colors ${
                  location.pathname === link.path ? 'text-gold font-bold' : 'text-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/book"
              className="bg-gold text-white px-6 py-2 rounded-full uppercase text-xs tracking-widest hover:bg-mehendi transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-cream-dark/60 transition-colors focus:outline-none focus:ring-2 focus:ring-gold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-mehendi" />
            ) : (
              <Menu className="w-6 h-6 text-mehendi" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-cream z-40 flex flex-col justify-center items-center space-y-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-serif text-3xl hover:text-gold transition-colors ${
                  location.pathname === link.path ? 'text-gold' : 'text-mehendi'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-mehendi text-cream px-8 py-3 rounded-full text-lg font-serif hover:bg-gold transition-colors mt-8"
            >
              Book Appointment
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
