import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { Provider } from "react-redux";
import store from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={2000} />
     <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
