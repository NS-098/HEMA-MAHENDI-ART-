/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Book from './pages/Book';

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
