// routes/ProfileRoutes.tsx
import React from 'react';
import { loadRemoteEntry } from '../utils/loadRemoteEntry';
import { loadRemoteModule } from '../utils/loadRemoteModule';

const ProfileApp = React.lazy(async () => {
  await loadRemoteEntry('http://localhost:3003/remoteEntry.js', 'profileApp');
  const Module = await loadRemoteModule('profileApp', './App');
  return Module;
});

export default ProfileApp;
