import { Instagram, Facebook, Youtube, AtSign } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/murali_dsr_photo_point', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/dsrphotopoint', label: 'Facebook' },
  { icon: Youtube, href: 'https://www.youtube.com/@muralipmy', label: 'YouTube' },
  { icon: AtSign, href: 'https://threads.net/@dsrphotopoint', label: 'Threads' },
];

const quickLinks = [
  { label: 'Portfolio', href: '#portfolio' },
  // { label: 'Packages', href: '#packages' },
  { label: 'Process', href: '#process' },
  // { label: 'Booking', href: '#booking' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-[100] bg-background py-6 px-6 lg:px-12 border-t border-border transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-4">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="group flex-shrink-0"
          >
            <img
              src="/logo_transparent.png"
              alt="Dsr Photos & Videos"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          {/* Quick Links - Horizontal */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {quickLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-3 flex-shrink-0">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:border-cyan-400 hover:text-cyan-400 transition-all"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-4 border-t border-border">
          <p className="text-muted-foreground/60 text-xs">
            © 2026 Dsr Photos & Videos. Crafted by{' '}
            <a
              href="https://github.com/carthworks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              carthworks
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}