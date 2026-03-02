/**
 * Load a JSON data file from public/data/.
 * In static export, data is loaded at build time via fetch or import.
 */
export async function loadTopicData<T>(topic: string): Promise<T> {
  const res = await fetch(`/data/${topic}.json`);
  if (!res.ok) throw new Error(`Failed to load data for ${topic}`);
  return res.json();
}

/**
 * Types for topic data following the WIAH schema.
 */
export interface TopicMetadata {
  sources: {
    name: string;
    dataset: string;
    url: string;
    retrieved: string;
    frequency: string;
  }[];
  methodology: string;
  knownIssues: string[];
}

export interface TopicData {
  topic: string;
  lastUpdated: string;
  national: {
    timeSeries: Record<string, number | string>[];
  };
  regional: Record<string, Record<string, number | string>[]>;
  metadata: TopicMetadata;
}
