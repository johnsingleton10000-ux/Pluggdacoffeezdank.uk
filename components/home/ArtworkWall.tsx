import { Card } from "@/components/ui/Card";

const ARTWORK = [
  { name: "Blueberry Slush", image: "/images/blueberry-slush-card.svg", label: "Card art" },
  { name: "Wedding Cake Reserve", image: "/images/wedding-cake-card.svg", label: "Card art" },
  { name: "Temple Ball Reserve", image: "/images/temple-ball-card.svg", label: "Card art" },
  { name: "Danish Crumble", image: "/images/danish-crumble-card.svg", label: "Card art" },
] as const;

export function ArtworkWall() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ARTWORK.map((item) => (
        <Card key={item.name}>
          <div className="relative h-72 overflow-hidden bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image} alt={`${item.name} artwork`} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-gold)]">{item.label}</p>
              <h3 className="display mt-1 text-2xl">{item.name}</h3>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
