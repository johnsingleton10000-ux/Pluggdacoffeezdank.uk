import './globals.css';

export const metadata = {
  title: 'DCBD | Player Ecosystem',
  description: 'The connected DCBD player ecosystem foundation.',
};

export default function RootLayout(props) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  );
}
