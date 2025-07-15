import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "../redux/store";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

// Add a non-null assertion to tell TypeScript "this will definitely exist"
const containerProfile = document.getElementById("root") as HTMLElement;
const root = createRoot(containerProfile);

root.render(<Provider store={store}><App /></Provider>
);
