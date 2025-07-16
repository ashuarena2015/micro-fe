import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

console.log({store});
// Add a non-null assertion to tell TypeScript "this will definitely exist"
const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(<Provider store={store}><App /></Provider>
);
