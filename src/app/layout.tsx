import React from 'react';
import '@styles/global.css';
interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="root-container">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;