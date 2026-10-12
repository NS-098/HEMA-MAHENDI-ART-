/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

// Route-level code splitting: lazy load secondary pages
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Book = lazy(() => import('./pages/Book'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-cream">
      <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin"></div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="about.html" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="services.html" element={<Services />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="gallery.html" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
            <Route path="contact.html" element={<Contact />} />
            <Route path="book" element={<Book />} />
            <Route path="book.html" element={<Book />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
