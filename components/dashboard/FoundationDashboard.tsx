import { MEMBERSHIP_TIER_CONFIG } from "../../config/dcbd";
import { DashboardShell } from "../layout/DashboardShell";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Panel } from "../ui/Panel";
import { ProgressBar } from "../ui/ProgressBar";
import { SectionHeading } from "../ui/SectionHeading";

const systemCards = [
  {
    number: "01",
    title: "Blood Test",
    detail: "Weighted identity assessment boundary",
    status: "Architecture ready",
    tone: "purple" as const,
  },
  {
    number: "02",
    title: "Avatar",
    detail: "Core pool and customization boundary",
    status: "Artwork pending",
    tone: "gold" as const,
  },
  {
    number: "03",
    title: "Starter Deck",
    detail: "AI generation and deck history boundary",
    status: "Rules pending",
    tone: "orange" as const,
  },
  {
    number: "04",
    title: "Collection",
    detail: "Ownership and trade state foundation",
    status: "Schema ready",
    tone: "purple" as const,
  },
];

const futureSystems = [
  ["Membership", "Tier catalogue prepared"],
  ["XP Ledger", "Server-side transaction boundary"],
  ["Community", "Posts and comments model"],
  ["Trading", "Ownership-safe proposal model"],
  ["Flip", "Match orchestration boundary"],
  ["Shop", "Order reward hook prepared"],
];

export function FoundationDashboard() {
  return (
    <DashboardShell>
      <section className="dcbd-hero dcbd-container">
        <div className="dcbd-hero-copy">
          <Badge tone="orange">FOUNDATION / 001</Badge>
          <h1>
            One ecosystem.
            <br />
            <span>Many ways in.</span>
          </h1>
          <p>
            DCBD connects player identity, collecting, community and competition.
            The foundation keeps those systems ready to connect without guessing the
            rules that come next.
          </p>
          <div className="dcbd-hero-actions">
            <Button type="button" disabled>
              Begin Blood Test <span aria-hidden="true">→</span>
            </Button>
            <Button type="button" variant="secondary" disabled>
              Account setup soon
            </Button>
          </div>
          <p className="dcbd-microcopy">
            Current mode: guest preview / no account data connected
          </p>
        </div>

        <Panel className="dcbd-identity-card" inset="large">
          <div className="dcbd-card-topline">
            <span className="dcbd-eyebrow">PLAYER PROFILE</span>
            <Badge tone="gold">UNCLAIMED</Badge>
          </div>
          <div className="dcbd-identity-mark">?</div>
          <h2>Your identity starts here.</h2>
          <p>
            Blood Test results will eventually inform your archetype, avatar and
            starter deck. Nothing is assigned in this foundation preview.
          </p>
          <div className="dcbd-identity-footer">
            <span>CONTROL</span>
            <span>ATTACK</span>
            <span>DEFENCE</span>
          </div>
        </Panel>
      </section>

      <section className="dcbd-container dcbd-section">
        <SectionHeading
          eyebrow="THE CONNECTED LOOP"
          title="Built to compound."
          description="Each domain has its own boundary, while the account remains the connective tissue."
        />
        <div className="dcbd-system-grid">
          {systemCards.map((system) => (
            <Panel as="article" key={system.number} className="dcbd-system-card">
              <div className="dcbd-card-topline">
                <span className="dcbd-system-number">{system.number}</span>
                <Badge tone={system.tone}>{system.status}</Badge>
              </div>
              <h3>{system.title}</h3>
              <p>{system.detail}</p>
              <span className="dcbd-card-arrow" aria-hidden="true">
                ↗
              </span>
            </Panel>
          ))}
        </div>
      </section>

      <section className="dcbd-container dcbd-section dcbd-dashboard-grid">
        <Panel inset="large" className="dcbd-xp-panel">
          <div className="dcbd-card-topline">
            <div>
              <p className="dcbd-eyebrow">PROGRESSION</p>
              <h2>XP ledger</h2>
            </div>
            <Badge tone="purple">SERVER-LED</Badge>
          </div>
          <div className="dcbd-xp-value">
            <strong>0</strong>
            <span>current XP</span>
          </div>
          <ProgressBar value={0} label="Progression is not connected for guest preview" />
          <div className="dcbd-stat-row">
            <div>
              <span>Earned</span>
              <strong>—</strong>
            </div>
            <div>
              <span>Spent</span>
              <strong>—</strong>
            </div>
            <div>
              <span>Entries</span>
              <strong>—</strong>
            </div>
          </div>
          <p className="dcbd-note">
            XP will be written as traceable transactions. Client-side balances are
            never authoritative.
          </p>
        </Panel>

        <Panel inset="large" className="dcbd-loop-panel">
          <p className="dcbd-eyebrow">SYSTEM MAP</p>
          <h2>Ready when the rules arrive.</h2>
          <div className="dcbd-future-list">
            {futureSystems.map(([title, detail]) => (
              <div className="dcbd-future-item" key={title}>
                <span className="dcbd-status-dot" aria-hidden="true" />
                <div>
                  <strong>{title}</strong>
                  <span>{detail}</span>
                </div>
                <span className="dcbd-future-chevron" aria-hidden="true">
                  →
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="dcbd-container dcbd-section">
        <div className="dcbd-membership-heading">
          <SectionHeading
            eyebrow="MEMBERSHIP FOUNDATION"
            title="Four tiers. No invented benefits."
            description="The tier catalogue is configured now; entitlements can be added later without changing account or billing boundaries."
          />
          <Badge tone="gold">PRODUCT OWNER PRICING</Badge>
        </div>
        <div className="dcbd-membership-grid">
          {Object.entries(MEMBERSHIP_TIER_CONFIG).map(([tier, config]) => (
            <Panel as="article" key={tier} className={`dcbd-tier-card dcbd-tier-${tier.toLowerCase()}`}>
              <div className="dcbd-card-topline">
                <span className="dcbd-tier-name">{config.label}</span>
                {tier === "FOUNDER" ? <Badge tone="gold">ORIGINAL</Badge> : null}
              </div>
              <strong className="dcbd-tier-price">{config.priceLabel}</strong>
              <p>{config.description}</p>
              <span className="dcbd-tier-status">Benefits to be defined</span>
            </Panel>
          ))}
        </div>
      </section>

      <section className="dcbd-container dcbd-section dcbd-principles">
        <div>
          <p className="dcbd-eyebrow">FOUNDATION PRINCIPLES</p>
          <h2>Make the next system easier to add.</h2>
        </div>
        <div className="dcbd-principle-list">
          <span>01 / Domain logic stays out of visual components.</span>
          <span>02 / Provider access stays behind server boundaries.</span>
          <span>03 / Ownership, XP and membership are never client-trusted.</span>
        </div>
      </section>
    </DashboardShell>
  );
}
