import { useEffect } from 'react';

const OnboardingLoader = () => {
  useEffect(() => {
    import('profileApp/bootstrap').then(({ mount }) => {
      const container = document.getElementById('app-root');
      if (container) mount(container);
    });
  }, []);

  return <div id="app-root" />;
};

export default OnboardingLoader;
