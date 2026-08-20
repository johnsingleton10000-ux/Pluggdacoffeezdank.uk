interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="dcbd-section-heading">
      {eyebrow ? <p className="dcbd-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {description ? <p className="dcbd-section-description">{description}</p> : null}
    </div>
  );
}
