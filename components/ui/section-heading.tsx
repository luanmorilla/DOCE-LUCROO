export function SectionHeading({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-pink-600">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-bold leading-tight md:text-3xl">{title}</h2>
        {description ? <p className="mt-2 max-w-3xl text-sm text-neutral-500">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
