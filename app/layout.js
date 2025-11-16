// app/layout.js
// ❌ KHÔNG CÓ "use client"; ở đây

import "../styles/index.scss";
import "aos/dist/aos.css"; // Chỉ import CSS
import "bootstrap/dist/css/bootstrap.min.css"; // Chỉ import CSS
import { ClientProviders } from "./providers"; // 👈 Import component mới

export const metadata = [
  {
    name: "keywords",
    content: "job portal, job search, recruitment, resume, employment",
  },
  {
    name: "description",
    content: "Superio - Job Board React NextJS Template",
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&display=swap"
        />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        {metadata.map((meta, index) => (
          <meta key={index} name={meta.name} content={meta.content} />
        ))}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
