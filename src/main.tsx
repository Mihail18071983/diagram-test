import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ReactFlowProvider } from "reactflow";
import { store } from "./app/store";
import App from "./App";
// import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </Provider>
  </React.StrictMode>
);
