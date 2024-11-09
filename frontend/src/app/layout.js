import './globals.css';
import Header from './components/Header';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-text">
        <Header />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
