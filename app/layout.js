import './globals.css';

export const metadata = {
  title: 'DCBD Estate | Da Coffeez Dank',
  description: 'The DCBD Estate: vaults, membership, AI onboarding, decks, cards and Flip Three.',
};

export default function RootLayout(props) {
  return <html lang="en"><body>{props.children}</body></html>;
}
