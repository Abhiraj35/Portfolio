import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { ThemeProvider } from '@/components/common/ThemeProviders';
import { generateMetadata as getMetadata } from '@/config/Meta';
import ReactLenis from 'lenis/react';
// import { ViewTransition } from 'react';

import './globals.css';

// Workaround for Bun's broken localStorage implementation on server
if (
  typeof globalThis !== 'undefined' &&
  typeof globalThis.localStorage !== 'undefined' &&
  typeof globalThis.localStorage.getItem === 'undefined'
) {
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: () => null,
      setItem: () => { },
      removeItem: () => { },
      clear: () => { },
      length: 0,
      key: () => null,
    },
    writable: true,
  });
}

export const metadata = getMetadata('/');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ViewTransition>
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`font-hanken-grotesk antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactLenis root>
            <Navbar />
            {children}
            <Footer />
          </ReactLenis>
        </ThemeProvider>
      </body>
    </html>
    // </ViewTransition>
  );
}
