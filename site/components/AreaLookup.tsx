'use client';

import { useState } from 'react';

interface AreaMetric {
  /** Label shown above the result, e.g. "Your region" */
  label: string;
  /** postcodes.io result field to extract: 'region', 'pfa', 'admin_district', 'ccg', etc. */
  apiField: string;
  /** Dataset: array of { name, value } — name is matched case-insensitively against the API field */
  data: { name: string; value: number }[];
  /** National comparison value, shown below the result */
  nationalValue?: number;
  /** Label for the value, e.g. "× earnings", "days", "%" */
  unit: string;
  /** Thresholds for colour: values above `bad` are red, above `warning` are amber, else green */
  thresholds?: { bad: number; warning: number };
  /** Whether higher is worse (default true). If false, lower = red. */
  higherIsWorse?: boolean;
}

interface AreaLookupProps {
  /** Metrics to look up and display for the matched postcode */
  metrics: AreaMetric[];
}

export default function AreaLookup({ metrics }: AreaLookupProps) {
  const [value, setValue] = useState('');
  const [results, setResults] = useState<
    { metric: AreaMetric; areaName: string; areaValue: number }[]
  >([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResults([]);

    const cleaned = value.trim().toUpperCase();
    if (!cleaned || cleaned.length < 2) {
      setError('Please enter a valid postcode.');
      return;
    }

    setLoading(true);
    try {
      const resp = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(cleaned)}`
      );
      if (!resp.ok) {
        setError('Postcode not found. Please check and try again.');
        setLoading(false);
        return;
      }
      const data = await resp.json();
      const apiResult = data.result;
      if (!apiResult) {
        setError('No data returned for this postcode.');
        setLoading(false);
        return;
      }

      const matched: { metric: AreaMetric; areaName: string; areaValue: number }[] = [];

      for (const metric of metrics) {
        const areaName: string | undefined = apiResult[metric.apiField];
        if (!areaName) continue;

        // Case-insensitive match against the dataset
        const match = metric.data.find(
          d => d.name.toLowerCase() === areaName.toLowerCase()
        );
        if (match) {
          matched.push({ metric, areaName, areaValue: match.value });
        }
      }

      if (matched.length === 0) {
        setError(
          `No matching data found for this postcode. It may be outside England.`
        );
      } else {
        setResults(matched);
      }
    } catch {
      setError('Could not look up postcode. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  function getColour(val: number, metric: AreaMetric): string {
    const { thresholds, higherIsWorse = true } = metric;
    if (!thresholds) return '#0D1117';
    if (higherIsWorse) {
      return val > thresholds.bad ? '#E63946' : val > thresholds.warning ? '#F4A261' : '#2A9D8F';
    } else {
      return val < thresholds.bad ? '#E63946' : val < thresholds.warning ? '#F4A261' : '#2A9D8F';
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Enter your postcode"
          className="flex-1 px-4 py-2.5 border border-wiah-border rounded-lg font-mono text-sm text-wiah-black placeholder:text-wiah-mid focus:outline-none focus:ring-2 focus:ring-wiah-blue focus:border-transparent"
          aria-label="Postcode"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-wiah-blue text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {loading ? '…' : 'Look up'}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-wiah-red">{error}</p>}

      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          {results.map(({ metric, areaName, areaValue }, i) => (
            <div key={i} className="flex-1">
              <p className="text-sm text-wiah-mid mb-1">{metric.label}</p>
              <p className="text-base font-bold text-wiah-black">{areaName}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span
                  className="font-mono text-2xl font-bold"
                  style={{ color: getColour(areaValue, metric) }}
                >
                  {areaValue.toFixed(1)}{metric.unit}
                </span>
              </div>
              {metric.nationalValue != null && (
                <p className="font-mono text-xs text-wiah-mid mt-1">
                  National average: {metric.nationalValue.toFixed(1)}{metric.unit}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
