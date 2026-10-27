import React from 'react';
import { Navbar } from './Navbar';
import { MobileNavigation } from './MobileNavigation';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, hideFooter = false }) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>
      {!hideFooter && <Footer />}
      <MobileNavigation />
    </div>
  );
};
