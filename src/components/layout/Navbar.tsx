import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const LINKS = [
    { name: 'Experience', href: '/experience', isExternal: false },
    { name: 'Awards', href: '/awards', isExternal: false },
    { name: 'Merchandise', href: '/merch', isExternal: false },
    { name: 'Partners', href: '/#partners', isExternal: false }
  ];

  return (
    <header className="sticky top-0 z-[100] w-full bg-background/80 backdrop-blur-md border-b border-outline-variant/30">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex-shrink-0">
            <img src="/ktf.png" alt="KWASU Tech Festival Logo" className="h-10 w-auto object-contain" />
          </Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-10">
          {LINKS.map((link) => (
            link.isExternal ? (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors tracking-wide"
              >
                {link.name}
              </a>
            ) : (
              <Link 
                key={link.name} 
                to={link.href} 
                className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors tracking-wide"
              >
                {link.name}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/register">
            <Button size="md" className="hidden sm:inline-flex rounded-none uppercase tracking-widest text-xs font-bold">Get Access</Button>
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 right-0 h-screen bg-background p-6 border-t border-outline-variant/20 z-[99] md:hidden"
          >
            <nav className="flex flex-col space-y-8 mt-8">
              {LINKS.map((link) => (
                link.isExternal ? (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="text-3xl font-bold text-primary hover:text-secondary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    key={link.name} 
                    to={link.href} 
                    className="text-3xl font-bold text-primary hover:text-secondary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
              <div className="pt-8">
                 <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button size="lg" className="w-full rounded-none uppercase tracking-widest font-bold">Get Access Permit</Button>
                 </Link>
              </div>
            </nav>
            
            {/* Background design flair for mobile menu */}
            <div className="absolute bottom-40 right-10 h-64 w-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
