import { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Also hide when window loads
    const handleLoad = () => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 500);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[300] bg-warm-white flex flex-col items-center justify-center transition-opacity duration-500">
      {/* Logo Animation */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-gold/10 flex items-center justify-center animate-pulse">
          <Camera size={40} className="text-gold" />
        </div>
        
        {/* Rotating rings */}
        <div className="absolute inset-0 w-24 h-24">
          <div className="absolute inset-0 border-2 border-gold/20 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-2 border-2 border-gold/30 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
        </div>
      </div>

      {/* Brand Name */}
      <h1 className="font-serif text-2xl text-[#1A1A1A] mb-2">Dsr Photos & Videos</h1>
      <p className="text-[#6E6E6E] text-sm mb-8">Loading amazing visuals...</p>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gold transition-all duration-200 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Progress Percentage */}
      <p className="text-gold text-sm mt-3 font-medium">
        {Math.min(Math.round(progress), 100)}%
      </p>
    </div>
  );
}
