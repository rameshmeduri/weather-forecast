import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  weather?: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center relative">
      <div className="absolute top-4 right-4 mt-6 sm:top-0 sm:right-0 sm:left-0 w-full flex justify-center sm:justify-center">
        <h1 className="mb-4 text-4xl font-extrabold">Weather Forecast</h1>
      </div>
      <div className="w-full max-w-2xl px-4">
        {children}
      </div>
    </div>
  );

};

export default Layout;