/*eslint-env browser*/
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import './firebase.js';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);
