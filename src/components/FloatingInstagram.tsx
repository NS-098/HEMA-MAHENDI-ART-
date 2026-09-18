import { Instagram } from 'lucide-react';
import { motion } from 'motion/react';

export default function FloatingInstagram() {
  return (
    <motion.a
      href="https://www.instagram.com/hema_mahendi_art/"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.8 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-full shadow-lg z-50 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dc2743] touch-manipulation"
      aria-label="Follow Hema Mehendi Art on Instagram"
      title="Follow on Instagram"
    >
      <Instagram size={24} />
    </motion.a>
  );
}

