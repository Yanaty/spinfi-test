import React from "react";
import ReactDOM from "react-dom/client";
import { Buffer } from "buffer";
import "./index.css";
import App from "./App";
import { initContract } from "./near-api";

const reactRoot = ReactDOM.createRoot(document.getElementById("root"));

window.nearInitPromise = initContract()
  .then(() => {
    reactRoot.render(<App />);
  })
  .catch((e) => {
    reactRoot.render(
      <div style={{ color: "red" }}>
        Error: <code>{e.message}</code>
      </div>
    );
    console.error(e);
  });

window.Buffer = Buffer;
