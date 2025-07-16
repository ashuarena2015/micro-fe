import React from "react";
// import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import MainRoutes from "./Routes";

const OnboardingApp: React.FC = () => {
  return (
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
  );
};

export default OnboardingApp;
