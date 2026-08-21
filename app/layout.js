import './globals.css';

export const metadata = {
  title: {
    default: "DCBD Estate | Da Coffeez Dank",
    template: "%s | DCBD Estate",
  },
  description: "Enter the DCBD Estate: commerce, collectible cards, character identity, decks, progression and Flip Three in one connected world.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#030304",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
