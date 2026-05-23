import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Experience } from './pages/Experience';
import { Awards } from './pages/Awards';
import Merch from './pages/Merch';
import Partners from './pages/Partners';
import { History } from './pages/History';
import { GetDP } from './pages/GetDP';
import { NotFound } from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PageTitleManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seoData: Record<string, { title: string; description: string; image: string }> = {
      '/': {
        title: 'KWASU Tech Festival | KTF 2026',
        description: 'Welcome to KTF 2026 - The premier student-led tech ecosystem in North Central Nigeria. Join us for innovation, networking, and excellence.',
        image: '/ktf.png'
      },
      '/register': {
        title: 'Registration Terminal | KTF 2026',
        description: 'Secure your spot at KTF 2026. Register now to be part of the largest student tech festival.',
        image: '/events.jpg'
      },
      '/experience': {
        title: 'Deep-Dive Experience | KTF 2026',
        description: 'Explore the immersive activities, workshops, and technical deep-dives planned for KTF 2026.',
        image: '/events (3).jpg'
      },
      '/awards': {
        title: 'Awards & Nominations | KTF 2026',
        description: 'Nominate outstanding innovators and projects for the KTF 2026 Awards Registry.',
        image: '/pitch battle.jpg'
      },
      '/get-dp': {
        title: 'Attendee Campaign | KTF 2026',
        description: 'Generate your official KWASU Tech Festival attendee flyer and avatar. Join the ecosystem on 20th June 2026.',
        image: '/ktf.png'
      },
      '/merch': {
        title: 'Official Merchandise | KTF 2026',
        description: 'Get your official KTF 2026 gear. Exclusive hoodies, tees, and tech accessories.',
        image: '/merch/hoodies 1.jpg'
      },
      '/partners': {
        title: 'Partnership & Sponsorship | KTF 2026',
        description: 'Partner with KTF 2026 to reach thousands of young tech talents and innovators.',
        image: '/networking.jpg'
      },
      '/history': {
        title: 'Our Story | KTF 2026',
        description: 'Discover the journey and evolution of the KWASU Tech Festival.',
        image: '/events (4).jpg'
      },
    };

    const currentSEO = seoData[pathname] || {
      title: 'Error 404 | Page Not Found',
      description: 'The requested resource could not be resolved on this system.',
      image: '/ktf.png'
    };
    document.title = currentSEO.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', currentSEO.description);
    }

    // Also update OG and Twitter tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', currentSEO.title);
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', currentSEO.description);

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', `https://kwasutechfestival.com.ng${currentSEO.image}`);

    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', currentSEO.title);

    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', currentSEO.description);

    const twitterImage = document.querySelector('meta[property="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', `https://kwasutechfest.com${currentSEO.image}`);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `https://kwasutechfest.com${pathname}`);

  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary overflow-x-hidden max-w-full">
      <ScrollToTop />
      <PageTitleManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/get-dp" element={<GetDP />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
