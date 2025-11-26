"use client";
import Aos from "aos";
import "aos/dist/aos.css";
import "../styles/index.scss";
import { useEffect } from "react";
import ScrollToTop from "../components/common/ScrollTop";
import { Provider } from "react-redux";
import { store } from "../store/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Wrapper from "@/layout/Wrapper";
import 'bootstrap/dist/css/bootstrap.min.css';
import { WebSocketProvider } from "@/context/WebSocketProvider";

export default function RootLayout({ children }) {
  useEffect(() => {
    // Khởi tạo hiệu ứng AOS
    Aos.init({
      duration: 1400,
      once: true,
    });

    // Import Bootstrap JS chỉ khi chạy ở client
    if (typeof window !== "undefined") {
      import("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap"
        />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="keywords"
          content="job portal, job search, recruitment, resume, employment"
        />
        <meta
          name="description"
          content="Superio - Job Board React NextJS Template"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body>
        <Provider store={store}>
          <WebSocketProvider>
            <div className="page-wrapper">
              <Wrapper>{children}</Wrapper>

              {/* ✅ Toastify */}
              <ToastContainer
                position="bottom-right"
                autoClose={500}
                theme="colored"
                pauseOnHover
              />

              {/* ✅ Scroll to Top */}
              <ScrollToTop />
            </div>
          </WebSocketProvider>
        </Provider>
      </body>
    </html>
  );
}