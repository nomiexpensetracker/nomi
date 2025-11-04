'use client'

import { useAppIntro } from '@/lib/hooks/use-intro';

import IntroCarousel from '@/components/organisms/intro-carousel';
import LoadingScreen from '@/components/organisms/loading-screen';

const HomeScreen: React.FC = () => {
  const { hasSeenIntro, markIntroAsSeen, isLoading } = useAppIntro();

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!hasSeenIntro) {
    return <IntroCarousel onComplete={markIntroAsSeen} />;
  }

  return <div>Your actual app content</div>;
}

export default HomeScreen;