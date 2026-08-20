import { Card } from "@/components/ui/Panel";

const cards = [
  { name: "Blueberry Slush", label: "Special Edition", image: "/images/blueberry-slush-card.svg" },
  { name: "Wedding Cake Reserve", label: "Founder Drop", image: "/images/wedding-cake-card.svg" },
  { name: "Temple Ball Reserve", label: "Legendary", image: "/images/temple-ball-card.svg" },
  { name: "Danish Crumble", label: "Rare Card", image: "/images/danish-crumble-card.svg" },
];

export function CardWallSection() {
  return (
    <section id="gallery" className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="font-display text-sm uppercase tracking-[0.2em] text-gold">Artwork archive</p>
        <h2 className="mt-3 font-display text-4xl uppercase leading-none sm:text-5xl">The card wall</h2>
        <p className="mt-4 max-w-2xl text-muted">
          Existing collectible artwork is preserved here. Final card mechanics, rarity odds and ownership rules will be added later.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Card key={card.name}>
              <div className="relative h-72 bg-ink">
                <img src={card.image} alt={`${card.name} artwork`} className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-ink/80 p-4">
                  <p className="font-display text-xs uppercase tracking-[0.2em] text-ember">{card.label}</p>
                  <h3 className="mt-1 font-display text-2xl uppercase leading-none">{card.name}</h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
