import "./globals.css";

export const metadata = {
  title: "Tic Tac Toe",
  description: "A simple tic tac toe game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-screen h-[100lvh] overflow-hidden">
      <body
        className={`w-full h-full p-8 overflow-hidden gradient-background`}
      >
        {children}
      </body>
    </html>
  );
}
