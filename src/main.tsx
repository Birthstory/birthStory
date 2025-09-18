import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";  // Tailwind 쓰면 여기에 @tailwind 지시자

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
