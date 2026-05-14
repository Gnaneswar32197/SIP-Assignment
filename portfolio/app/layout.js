
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ProfileProvider from "./core/providers/ProfileProviders";
import InvestorIDProvider from "./core/providers/InvestorIDProvider";

import Sidebar from "./components/Sidebar";
import DashHeader from "./components/DashHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SafePay",
  description: "Investment Portfolio Dashboard",
};

export default function RootLayout({ children }) {

  return (

    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        antialiased
      `}
    >

      <body className="
        h-screen
        overflow-hidden
        bg-[#f5f6fa]
      ">

        <ProfileProvider>

          <InvestorIDProvider>

            {/* Main Layout */}

            <div className="
              flex
              h-screen
              overflow-hidden
            ">

              {/* Fixed Sidebar */}

              <div className="
                fixed
                left-0
                top-0
                h-screen
                z-50
              ">

                <Sidebar />

              </div>

              {/* Right Content Area */}

              <div className="
                flex
                flex-col
                flex-1
                ml-[260px]
                overflow-hidden
              ">

                {/* Header */}

                <DashHeader />

                {/* Scrollable Content */}

                <main className="
                  flex-1
                  overflow-y-auto
                  bg-[#f5f6fa]
                ">

                  {children}

                </main>

              </div>

            </div>

          </InvestorIDProvider>

        </ProfileProvider>

      </body>

    </html>
  );
}