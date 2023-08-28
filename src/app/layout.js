import StoreProvider from '@/store/StoreProvider';
import DarkModeProvider from '@/theme/ThemeProvider';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ backgroundColor: '#00000099' }}
      >
        <StoreProvider>
          <DarkModeProvider>{children}</DarkModeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
