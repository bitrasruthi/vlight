
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter} from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import App from "./App.js";


ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
 <App/>
  </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
);
