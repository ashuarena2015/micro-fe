import React, { useEffect } from 'react';
import { loadRemoteModule } from './loadRemoteModules'; // adjust path

const OnboardingApp = () => {
  useEffect(() => {
    const load = async () => {
      const remote = await loadRemoteModule({
        url: 'http://localhost:3003/remoteEntry.js',
        scope: 'profileApp',
        module: './bootstrap',
      });

      const el = document.getElementById('app-root');
      if (el && remote?.mount) {
        remote.mount(el);
      }
    };

    load();

    return () => {
      const el = document.getElementById('app-root');
      if (el) el.innerHTML = '';
    };
  }, []);

  return <div id="app-root" />;
};

export default OnboardingApp;
