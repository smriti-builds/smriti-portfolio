type ImpactMetricRow = {
  label: string;
  metric: string;
};

const METRIC_LABEL_PATTERN = /^(.+?)\s*[—–-]\s*(.+)$/;
const LABEL_METRIC_PATTERN =
  /^(.+?)\s+((?:\+)?\d+(?:\.\d+)?(?:%|x|×)(?:\s+in\s+\d+\s+months)?)\s*$/i;

function parseImpactLine(line: string): ImpactMetricRow | null {
  const dashMatch = line.match(METRIC_LABEL_PATTERN);
  if (dashMatch) {
    const metric = dashMatch[1].trim();
    const label = dashMatch[2].trim();
    if (metric && label) return { label, metric };
  }

  const legacyMatch = line.match(LABEL_METRIC_PATTERN);
  if (!legacyMatch) return null;

  return {
    label: legacyMatch[1].trim(),
    metric: legacyMatch[2].trim(),
  };
}

function parseImpactMetrics(impact: string): ImpactMetricRow[] | null {
  const lines = impact
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) return null;

  const rows = lines.flatMap((line) => {
    const parsed = parseImpactLine(line);
    if (parsed) return [parsed];
    return [{ label: line, metric: "" }];
  });

  return rows.length > 0 ? rows : null;
}

function formatImpactMetric(metric: string) {
  return metric;
}

type CaseStudyImpactMetricsProps = {
  impact: string;
};

export default function CaseStudyImpactMetrics({
  impact,
}: CaseStudyImpactMetricsProps) {
  const rows = parseImpactMetrics(impact);

  if (!rows) {
    return <span>{impact}</span>;
  }

  return (
    <div className="flex flex-col">
      {rows.map((row, index) => (
        <div
          key={`${row.label}-${row.metric}`}
          className={
            index > 0 ? "border-t border-neutral-200/80" : undefined
          }
        >
          <div className="flex items-center justify-between gap-4 py-3">
            <span className="min-w-0 text-text-secondary">{row.label}</span>
            {row.metric ? (
              <span className="shrink-0 font-semibold text-[#626c81]">
                {formatImpactMetric(row.metric)}
              </span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}
