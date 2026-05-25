import { Card } from "@/components/atoms/Card";
import { Heading } from "@/components/atoms/Heading";

export function ShowcaseCard({
  clientLabel,
  industry,
  challenge,
  delivery,
  outcome,
  tags,
  labels,
}: {
  clientLabel: string;
  industry: string;
  challenge: string;
  delivery: string;
  outcome: string;
  tags: readonly string[];
  labels: { challenge: string; delivery: string; outcome: string };
}) {
  return (
    <Card>
      <p className="text-sm font-normal uppercase tracking-wider text-neutral-500">
        {industry}
      </p>
      <Heading level={3} className="mt-2 mb-4">
        {clientLabel}
      </Heading>
      <dl className="space-y-3 text-base">
        <div>
          <dt className="font-bold text-black">{labels.challenge}</dt>
          <dd className="text-neutral-600">{challenge}</dd>
        </div>
        <div>
          <dt className="font-bold text-black">{labels.delivery}</dt>
          <dd className="text-neutral-600">{delivery}</dd>
        </div>
        <div>
          <dt className="font-bold text-black">{labels.outcome}</dt>
          <dd className="text-neutral-600">{outcome}</dd>
        </div>
      </dl>
      <ul className="mt-6 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-neutral-200 px-2.5 py-0.5 text-sm text-neutral-700"
          >
            {tag}
          </li>
        ))}
      </ul>
    </Card>
  );
}
