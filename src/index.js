import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { StripeProvider } from "react-stripe-elements";

ReactDOM.render(
  <StripeProvider apiKey="pk_test_3BtN0SGVaiX5VYBspMgql5uX">
    <App />
  </StripeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
