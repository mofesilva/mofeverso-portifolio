import "./globals.css";

export const metadata = {
  title: "Mofeverso Portifolio",
  description: "Next.js app initialized with Turbopack and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
