import { Instagram, Facebook, Youtube, Twitter, Linkedin } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

const navLinks = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Packages', href: '#packages' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-[100] bg-background py-16 px-6 lg:px-12 border-t border-border transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <a
              href="#"
              className="flex items-center mb-6 group"
            >
              <img
                src="/logo_alone.png"
                alt="Dsr Photos & Videos"
                className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Artistic photographer transforming fashion, wedding and many more
              shoot types into visual masterpieces. Based in Coimbatore, Tamil Nadu.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-foreground/50 text-xs uppercase tracking-[0.18em] mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-foreground/50 text-xs uppercase tracking-[0.18em] mb-4">
              Follow Along
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:bg-gold hover:text-white transition-all"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground/60 text-sm">
            © 2026 Dsr Photos & Videos. All rights reserved. Crafted by{' '}
            <a
              href="https://github.com/carthworks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-gold transition-colors font-medium underline underline-offset-4"
            >
              carthworks
            </a>
          </p>
          <div className="flex gap-6">
            <button className="text-muted-foreground/60 hover:text-foreground transition-colors text-sm">
              Privacy Policy
            </button>
            <button className="text-muted-foreground/60 hover:text-foreground transition-colors text-sm">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}