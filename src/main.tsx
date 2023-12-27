import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ReactFlowProvider } from "reactflow";
import { store } from "./app/store";
import "@fontsource/ibm-plex-sans";
import "./index.css"
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </Provider>
  </React.StrictMode>
);
