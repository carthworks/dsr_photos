import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Packages', href: '#packages' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
          ? 'bg-background/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
          }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center transition-transform duration-300 hover:scale-105"
            >
              <img
                src="/logo_alone.png"
                alt="Dsr Photos & Videos"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`label-uppercase transition-colors duration-300 hover:text-gold ${isScrolled ? 'text-foreground' : 'text-white'
                    }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors duration-300 ${isScrolled ? 'text-foreground' : 'text-white'
                }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[90] bg-background transition-transform duration-500 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="font-serif text-2xl text-foreground hover:text-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}