import { BrowserRouter, Routes, Route } from 'react-router';
import { Navigation } from '@/app/components/Navigation';
import { Footer } from '@/app/components/Footer';
import { Home } from '@/app/pages/Home';
import { Projects } from '@/app/pages/Projects';
import { About } from '@/app/pages/About';
import { Contact } from '@/app/pages/Contact';
import { useEffect } from 'react';

export default function App() {
  // Suppress MetaMask and other browser extension errors
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Suppress errors from browser extensions (MetaMask, etc.)
      if (
        event.filename?.includes('chrome-extension://') ||
        event.filename?.includes('moz-extension://') ||
        event.message?.toLowerCase().includes('metamask')
      ) {
        event.preventDefault();
        return;
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-neutral-900">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}