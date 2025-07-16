// child/bootstrap.tsx
import React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store as childStore } from "./redux/store";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

export const mount = (container: HTMLElement) => {
  const root = createRoot(container);
  root.render(
    <Provider store={childStore}>
      <App />
    </Provider>
  );
};
