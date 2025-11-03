'use client'

import IntroCarousel from '@/components/organisms/intro-carousel';
import { useAppIntro } from '@/lib/hooks/use-intro';

const HomeScreen: React.FC = () => {
  const { hasSeenIntro, markIntroAsSeen, isLoading } = useAppIntro();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!hasSeenIntro) {
    return <IntroCarousel onComplete={markIntroAsSeen} />;
  }

  return <div>Your actual app content</div>;
}

export default HomeScreen;