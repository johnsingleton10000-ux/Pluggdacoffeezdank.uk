import './globals.css';

export const metadata = {
  title: "DCBD Estate | Own It. Control It. Live It.",
  description: "Enter the connected DCBD world of vault products, collectible cards, AI deck identity, Flip Three and Estate community.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050308",
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
