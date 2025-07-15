// routes/ProfileRoutes.tsx
import React from 'react';
import { loadRemoteEntry } from '../utils/loadRemoteEntry';
import { loadRemoteModule } from '../utils/loadRemoteModule';

const ChildApp = React.lazy(async () => {
  await loadRemoteEntry('http://localhost:3002/remoteEntry.js', 'childApp');
  const Module = await loadRemoteModule('childApp', './App');
  return Module;
});

export default ChildApp;
