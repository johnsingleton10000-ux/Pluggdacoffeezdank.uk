import { VAULTS } from "@/lib/data/vaults";
import { VaultIcon } from "@/components/ui/Marks";
import Link from "next/link";

export function VaultStrip() {
  const icons = VAULTS.filter((vault) => ["flowers", "extracts", "edibles", "tinctures", "merch", "goodies"].includes(vault.id));
  return (
    <section className="px-4 py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-3 sm:grid-cols-6">
        {icons.map((vault) => (
          <Link key={vault.id} href={`/shop?vault=${vault.id}`} className="gold-frame flex min-h-24 flex-col items-center justify-center gap-2 rounded-2xl p-3 text-center" style={{ color: vault.glow }}>
            <VaultIcon name={vault.icon} />
            <span className="text-[0.65rem] font-black uppercase tracking-widest">{vault.navLabel}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
