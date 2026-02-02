import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Delay showing the banner
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[110] p-4 animate-fade-in-up">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Cookie size={24} className="text-gold" />
          </div>
          <div>
            <h4 className="font-medium text-[#1A1A1A] mb-1">We value your privacy</h4>
            <p className="text-sm text-[#6E6E6E]">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking &quot;Accept All&quot;, you consent to our use of cookies.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleDecline}
            className="flex-1 md:flex-none px-4 py-2 text-sm text-[#6E6E6E] hover:text-[#1A1A1A] transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 md:flex-none px-6 py-2 bg-gold text-white text-sm rounded-full hover:bg-gold-dark transition-colors"
          >
            Accept All
          </button>
          <button
            onClick={handleDecline}
            className="p-2 text-[#6E6E6E] hover:text-[#1A1A1A] transition-colors md:hidden"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
