import Link from "next/link";
import { NAVIGATION_ITEMS } from "../../config/dcbd";
import { Badge } from "../ui/Badge";

export function TopNav() {
  return (
    <header className="dcbd-topnav">
      <Link className="dcbd-brand" href="/" aria-label="DCBD home">
        <span className="dcbd-brand-mark">D</span>
        <span>
          <strong>DCBD</strong>
          <small>PLAYER ECOSYSTEM</small>
        </span>
      </Link>

      <nav className="dcbd-nav-links" aria-label="Primary navigation">
        {NAVIGATION_ITEMS.map((item) =>
          item.enabled ? (
            <Link key={item.label} href={item.href} className="dcbd-nav-link dcbd-nav-link-active">
              {item.label}
            </Link>
          ) : (
            <span key={item.label} className="dcbd-nav-link dcbd-nav-link-disabled" aria-disabled="true">
              {item.label}
              <span className="dcbd-nav-soon">Soon</span>
            </span>
          ),
        )}
      </nav>

      <button className="dcbd-account-button" type="button" disabled aria-label="Account coming soon">
        <span className="dcbd-avatar-chip">DC</span>
        <span className="dcbd-account-copy">
          <strong>Guest player</strong>
          <small>Account soon</small>
        </span>
        <Badge tone="gold">FREE</Badge>
      </button>
    </header>
  );
}
