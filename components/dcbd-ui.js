export function Kicker({ children, tone = "purple" }) {
  return <p className={`kicker kicker--${tone}`}>{children}</p>;
}

export function SectionTitle({ eyebrow, title, copy, align = "left", id }) {
  return (
    <header className={`section-title section-title--${align}`}>
      {eyebrow && <Kicker>{eyebrow}</Kicker>}
      <h2 id={id}>{title}</h2>
      {copy && <p>{copy}</p>}
    </header>
  );
}

export function Bolt({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.4 2 4.7 13.2h6.2L9.8 22l9.5-12.4h-6.5L13.4 2Z" fill="currentColor" />
    </svg>
  );
}

export function Crown({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 42" aria-hidden="true">
      <path d="m5 10 13 11L31 3l14 18L59 10l-5 27H10L5 10Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M12 37h40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function InfinityMark({ className = "" }) {
  return <span className={`infinity-mark ${className}`} aria-hidden="true">∞</span>;
}

export function ArrowIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DcbdButton({ href, children, tone = "gold", className = "", disabled = false, onClick }) {
  const classes = `dcbd-button dcbd-button--${tone} ${className}`.trim();

  if (disabled) {
    return <span className={`${classes} is-disabled`} aria-disabled="true">{children}</span>;
  }

  if (href) {
    return <a href={href} className={classes}>{children}</a>;
  }

  return <button type="button" className={classes} onClick={onClick}>{children}</button>;
}

export function RivetFrame({ children, className = "" }) {
  return (
    <div className={`rivet-frame ${className}`}>
      <i className="rivet rivet--tl" aria-hidden="true" />
      <i className="rivet rivet--tr" aria-hidden="true" />
      <i className="rivet rivet--bl" aria-hidden="true" />
      <i className="rivet rivet--br" aria-hidden="true" />
      {children}
    </div>
  );
}
