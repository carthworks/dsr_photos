import { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const phoneNumber = '919843619091'; // Replace with actual WhatsApp number

const quickMessages = [
  'Hi! I want to book a wedding photoshoot',
  'Hello! I need a fashion photography session',
  'Hi! I want to know about your packages',
  'Hello! Can you share your portfolio?',
];

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 3000);

    // Hide tooltip after 8 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleSend = () => {
    const text = message || 'Hi! I want to know more about your services';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  const handleQuickMessage = (msg: string) => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-[100]">
        {/* Tooltip */}
        {showTooltip && !isOpen && (
          <div className="absolute bottom-full right-0 mb-3 animate-fade-in-up">
            <div className="bg-white rounded-xl shadow-lg p-3 pr-8 relative max-w-[200px]">
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute top-1 right-1 p-1 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
              <p className="text-sm text-gray-700">Need help? Chat with us on WhatsApp!</p>
              <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white rotate-45" />
            </div>
          </div>
        )}

        {/* Chat Widget */}
        {isOpen && (
          <div className="absolute bottom-full right-0 mb-4 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            {/* Header */}
            <div className="bg-[#25D366] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Dsr Photos & Videos</h4>
                  <p className="text-white/80 text-xs">Typically replies in minutes</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-white/80 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Quick Messages */}
            <div className="p-4 bg-gray-50">
              <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">Quick Messages</p>
              <div className="space-y-2">
                {quickMessages.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickMessage(msg)}
                    className="w-full text-left p-3 bg-white rounded-lg text-sm text-gray-700 hover:bg-[#25D366]/10 hover:text-[#25D366] transition-colors border border-gray-100"
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Message */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#25D366]"
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                  onClick={handleSend}
                  className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:bg-[#128C7E] transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
            isOpen ? 'bg-gray-700 rotate-90' : 'bg-[#25D366] hover:bg-[#128C7E] hover:scale-110'
          }`}
        >
          {isOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <MessageCircle size={28} className="text-white" fill="white" />
          )}
        </button>
      </div>
    </>
  );
}