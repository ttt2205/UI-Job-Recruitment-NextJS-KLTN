"use client";

import { useEffect } from "react";
import Aos from "aos";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "../components/common/ScrollTop";
import Wrapper from "@/layout/Wrapper";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export function ClientProviders({ children }) {
  useEffect(() => {
    Aos.init({
      duration: 1400,
      once: true,
    });
  }, []);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  if (!clientId) {
    console.error("Thiếu NEXT_PUBLIC_GOOGLE_CLIENT_ID");
    // Bạn có thể không render provider nếu không có ID
  }

  return (
    <Provider store={store}>
      {/* Chỉ render GoogleProvider nếu có clientId */}
      {clientId ? (
        <GoogleOAuthProvider clientId={clientId}>
          <div className="page-wrapper">
            <Wrapper>{children}</Wrapper>
            <ToastContainer
              position="bottom-right"
              autoClose={500}
              theme="colored"
              pauseOnHover
            />
            <ScrollToTop />
          </div>
        </GoogleOAuthProvider>
      ) : (
        // Fallback nếu không có ID
        <div className="page-wrapper">
          <Wrapper>{children}</Wrapper>
          <ToastContainer
            position="bottom-right"
            autoClose={500}
            theme="colored"
            pauseOnHover
          />
          <ScrollToTop />
        </div>
      )}
    </Provider>
  );
}
