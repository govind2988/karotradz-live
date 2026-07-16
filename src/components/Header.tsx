import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, ShieldCheck, Mail, Linkedin } from 'lucide-react';
import LogoK from './LogoK';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({ onScrollToSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'HOW IT WORKS', id: 'how-it-works' },
    { name: 'FOR MANUFACTURERS', id: 'manufacturers' },
    { name: 'FOR BUYERS', id: 'buyers' },
  ];

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-beige/95 backdrop-blur-md border-b border-editorial-dark/10 py-3'
          : 'bg-brand-beige/80 backdrop-blur-sm border-b border-editorial-dark/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div 
            id="brand-logo"
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="flex items-center justify-center text-brand-orange transition-transform group-hover:scale-105">
              <LogoK className="h-12" />
            </div>
           
          </div>

          {/* Desktop Nav */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onScrollToSection(item.id)}
                className="font-sans text-xs font-bold tracking-[0.2em] text-editorial-dark/60 hover:text-brand-orange transition-colors duration-200 cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="mailto:info@karotradz.com"
              className="p-2.5 bg-editorial-dark/5 border border-editorial-dark/10 hover:border-brand-orange hover:bg-brand-orange/5 text-editorial-dark hover:text-brand-orange rounded-full transition-all duration-200 flex items-center justify-center"
              title="Email KaroTradz"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/company/karotradz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-editorial-dark/5 border border-editorial-dark/10 hover:border-brand-orange hover:bg-brand-orange/5 text-editorial-dark hover:text-brand-orange rounded-full transition-all duration-200 flex items-center justify-center"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={() => onScrollToSection('early-access')}
              className="bg-editorial-dark text-brand-beige font-sans text-[10px] font-bold tracking-[0.2em] px-6 py-3 hover:bg-brand-orange hover:text-brand-beige transition-all duration-200 rounded-full cursor-pointer ml-1"
            >
              GET EARLY ACCESS
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="text-editorial-dark p-2 hover:bg-editorial-dark/5 rounded-full transition-colors focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-brand-beige border-b border-editorial-dark/10 shadow-lg z-40 px-4 py-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
               {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setIsOpen(false);
                    // Short timeout to let the drawer close before scrolling
                    setTimeout(() => onScrollToSection(item.id), 250);
                  }}
                  className="font-sans text-xs font-bold tracking-[0.2em] text-editorial-dark/70 hover:text-brand-orange py-2.5 text-left border-b border-editorial-dark/5 last:border-b-0"
                >
                  {item.name}
                </button>
              ))}
              <div className="flex items-center gap-3 py-2 border-b border-editorial-dark/5">
                <a
                  href="mailto:info@karotradz.com"
                  className="flex-1 p-2.5 bg-editorial-dark/5 border border-editorial-dark/10 text-editorial-dark hover:text-brand-orange rounded-full transition-all duration-200 flex items-center justify-center gap-2"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                  <span className="font-sans text-[10px] font-bold tracking-[0.1em]">EMAIL</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/karotradz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-2.5 bg-editorial-dark/5 border border-editorial-dark/10 text-editorial-dark hover:text-brand-orange rounded-full transition-all duration-200 flex items-center justify-center gap-2"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                  <span className="font-sans text-[10px] font-bold tracking-[0.1em]">LINKEDIN</span>
                </a>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => onScrollToSection('early-access'), 250);
                }}
                className="mt-2 w-full text-center bg-editorial-dark text-brand-beige font-sans text-xs font-bold tracking-[0.2em] py-3.5 hover:bg-brand-orange transition-all duration-200 rounded-full"
              >
                GET EARLY ACCESS
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
