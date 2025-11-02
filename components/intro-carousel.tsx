
import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, UsersRound, RefreshCw, BarChart3 } from 'lucide-react';

interface IntroSlide {
  id: number;
  title: string;
  description: string;
  illustration: string;
}

interface IntroCarouselProps {
  onComplete: () => void;
}

const IntroCarousel: React.FC<IntroCarouselProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  console.log('currentSlide', currentSlide);

  const slides: IntroSlide[] = [
    {
      id: 1,
      title: "Track Finances Together",
      description: "Easily sync your spending and savings with your partner. Couple Mode gives you a shared wallet and seamless expense tracking for two.",
      illustration: "couple"
    },
    {
      id: 2,
      title: "Manage Your Whole Family's Budget",
      description: "Add multiple family members, assign roles, and keep your household expenses organized in one place. It's like a shared spreadsheet — but smarter.",
      illustration: "family"
    },
    {
      id: 3,
      title: "Set It and Forget It",
      description: "No more entering the same bills every month. Just tag a transaction as recurring, and we'll handle the rest — on schedule, every time.",
      illustration: "recurring"
    },
    {
      id: 4,
      title: "Know Where Your Money Goes",
      description: "Get full monthly breakdowns and downloadable e-statements delivered to your inbox. Your money, your insights — right at your fingertips.",
      illustration: "reports"
    }
  ];

  const getSlideIcon = (illustration: string) => {
    switch (illustration) {
      case 'couple':
        return <Users size={80} className="text-blue-500" />;
      case 'family':
        return <UsersRound size={80} className="text-green-500" />;
      case 'recurring':
        return <RefreshCw size={80} className="text-purple-500" />;
      case 'reports':
        return <BarChart3 size={80} className="text-orange-500" />;
      default:
        return <Users size={80} className="text-gray-500" />;
    }
  };

  useEffect(() => {
    setProgress(0);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100; // Stop at 100
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [currentSlide]); // Only reset when slide changes

  // Separate effect for auto-advance
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(curr => curr + 1);
        } else {
          onComplete();
        }
      }, 500); // Small delay before advancing
      
      return () => clearTimeout(timeout);
    }
  }, [progress, currentSlide, slides.length, onComplete]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setProgress(0);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      setProgress(0);
    } 
  }

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Progress Indicators */}
      <div className="flex space-x-2 p-6 pt-12">
        {slides.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out"
              style={{
                width: index < currentSlide ? '100%' : index === currentSlide ? `${progress}%` : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-8 animate-fade-in">
          {getSlideIcon(slides[currentSlide].illustration)}
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-fade-in">
          {slides[currentSlide].title}
        </h1>
        
        <p className="text-lg text-gray-600 leading-relaxed max-w-sm animate-fade-in">
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Navigation */}
      <div className="p-6 flex justify-between items-center">
        {currentSlide === 0 ? (
          <button
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            Skip
          </button>
        ) : (
          <button
            onClick={handlePrevious}
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            Prev
          </button>
        )}
        
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={handleNext}
          className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 font-medium"
        >
          <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default IntroCarousel;
