"use client";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { useState } from "react";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import { PostHogProvider } from "./providers";
import dynamic from "next/dynamic";

const PostHogPageView = dynamic(() => import("../components/PostHogPageView"), {
  ssr: false,
});

const metadata = {
  title: "CuratedProducts",
  description:
    "Discover the Essentials from collection of curated websites for Your Next Big Idea ,a collection of handpicked websites—products, agencies, courses, and resources—all in one place. ",
};

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.curatedproducts.tech/" />
        <meta property="og:title" content={metadata.title} />
        <meta
          property="og:description"
          content="Discover the Essentials from the collection of curated websites for Your Next Big Idea"
        />
        <meta
          property="og:image"
          content="https://sinhuqhzbdfdhuquxnxs.supabase.co/storage/v1/object/public/images//curatedproducts.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://www.curatedproducts.tech/"
        />
        <meta property="twitter:title" content={metadata.title} />
        <meta
          property="twitter:description"
          content="Discover the Essentials from collection of curated websites for Your Next Big Idea"
        />
        <meta
          property="twitter:image"
          content="https://sinhuqhzbdfdhuquxnxs.supabase.co/storage/v1/object/public/images//curatedproducts.png"
        />

        <link rel="icon" href="favicon.ico" type="image/x-icon" />
      </head>

      <body className={GeistSans.className}>
        <div className="min-h-screen bg-white">
          <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* Main Content */}
          <div className="flex mt-16">
            <Categories
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />

            {/* Content Area */}
            <main className="flex-1 transition-all duration-300 md:ml-64 p-6">
              <PostHogProvider>
                <PostHogPageView />
                {children}
              </PostHogProvider>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
