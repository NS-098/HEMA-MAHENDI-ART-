import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingInstagram from './FloatingInstagram';
import FloatingWhatsApp from './FloatingWhatsApp';
import CanvasBackground from './CanvasBackground';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen relative">
      <CanvasBackground />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingInstagram />
      <FloatingWhatsApp />
    </div>
  );
}
