// Procedural DCBD collectible-card artwork.
//
// Renders in the exact visual language of the committed reference cards in
// /public/images (900x1200 frame, gradient into near-black, fractal-noise
// grain, a signature sweep stroke, a rarity label top-left and the big product
// name bottom-left). Motifs echo the reference set: orbs (Blueberry Slush),
// ball (Temple Ball), crystal (Danish Crumble) and poster (Wedding Cake), plus
// wave / mist / canopy variations for the wider catalog.

function Motif({ motif, colorA }) {
  switch (motif) {
    case 'ball':
      return (
        <>
          <circle cx="450" cy="430" r="200" fill="#1c1917" />
          <circle cx="450" cy="430" r="158" fill={colorA} opacity="0.9" />
          <circle cx="392" cy="366" r="58" fill="#ffffff" opacity="0.16" />
        </>
      );
    case 'crystal':
      return (
        <>
          <path d="M450 210 L650 415 L525 665 L275 655 L188 395 Z" fill="#ffffff" opacity="0.72" />
          <path d="M450 210 L525 665 L360 430 Z" fill={colorA} opacity="0.6" />
        </>
      );
    case 'poster':
      return (
        <>
          <rect x="175" y="255" width="550" height="330" rx="48" fill="#ffffff" opacity="0.16" />
          <rect x="215" y="320" width="470" height="66" rx="26" fill={colorA} opacity="0.85" />
          <rect x="215" y="426" width="470" height="66" rx="26" fill="#ffffff" opacity="0.22" />
        </>
      );
    case 'wave':
      return (
        <>
          <path d="M60 470 C260 360 470 560 860 400" fill="none" stroke={colorA} strokeWidth="26" opacity="0.55" />
          <path d="M40 560 C260 470 470 660 880 500" fill="none" stroke="#ffffff" strokeWidth="14" opacity="0.28" />
          <circle cx="470" cy="430" r="150" fill={colorA} opacity="0.35" />
        </>
      );
    case 'mist':
      return (
        <>
          <ellipse cx="360" cy="380" rx="230" ry="150" fill={colorA} opacity="0.4" />
          <ellipse cx="540" cy="470" rx="200" ry="130" fill="#ffffff" opacity="0.14" />
          <ellipse cx="450" cy="300" rx="150" ry="90" fill={colorA} opacity="0.3" />
        </>
      );
    case 'canopy':
      return (
        <>
          <path d="M250 520 L430 250 L610 520 Z" fill={colorA} opacity="0.6" />
          <path d="M360 560 L520 300 L690 560 Z" fill="#ffffff" opacity="0.16" />
          <path d="M170 560 L330 320 L500 560 Z" fill={colorA} opacity="0.4" />
        </>
      );
    case 'orbs':
    default:
      return (
        <>
          <circle cx="255" cy="360" r="128" fill={colorA} opacity="0.72" />
          <circle cx="410" cy="315" r="98" fill="#ffffff" opacity="0.14" />
          <circle cx="545" cy="430" r="150" fill={colorA} opacity="0.45" />
        </>
      );
  }
}

export default function CardArtwork({ uid, name, tierLabel, colorA, colorB, motif, className }) {
  const gid = `grad-${uid}`;
  const nid = `noise-${uid}`;
  const useRadial = motif === 'orbs' || motif === 'ball' || motif === 'mist';
  const words = name.toUpperCase().split(' ');

  return (
    <svg viewBox="0 0 900 1200" className={className} preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${name} collectible artwork`}>
      <defs>
        {useRadial ? (
          <radialGradient id={gid} cx="34%" cy="24%" r="90%">
            <stop offset="0" stopColor={colorA} />
            <stop offset="0.5" stopColor={colorB} />
            <stop offset="1" stopColor="#050505" />
          </radialGradient>
        ) : (
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={colorA} />
            <stop offset="0.5" stopColor={colorB} />
            <stop offset="1" stopColor="#050505" />
          </linearGradient>
        )}
        <filter id={nid}>
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.17" />
          </feComponentTransfer>
        </filter>
      </defs>

      <rect width="900" height="1200" rx="70" fill={`url(#${gid})`} />
      <Motif motif={motif} colorA={colorA} />
      <rect width="900" height="1200" filter={`url(#${nid})`} opacity="0.55" />
      <path d="M90 860 C240 740 420 970 810 780" fill="none" stroke="#ffffff" strokeWidth="10" opacity="0.35" />

      <text x="70" y="120" fill="#ffffff" fontFamily="Arial Black, Arial" fontSize="38" letterSpacing="12" opacity="0.9">{tierLabel}</text>
      {words.map((w, i) => (
        <text key={i} x="70" y={1000 - (words.length - 1 - i) * 84} fill="#ffffff" fontFamily="Arial Black, Arial" fontSize="74">{w}</text>
      ))}
      <text x="70" y="1125" fill="#d4d4d8" fontFamily="Arial" fontSize="30">DCBD collectible card artwork</text>
    </svg>
  );
}
