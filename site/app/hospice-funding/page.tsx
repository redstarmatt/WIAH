'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import PositiveCallout from '@/components/PositiveCallout';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// ── Types ────────────────────────────────────────────────────────────────────

interface HospiceFundingData {
  timeSeries: Array<{ date: string; nhsFundingPct: number; charityFundingPct: number; hospicesInDeficitPct: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 5, 1);
}

const editorialRefs: Reference[] = [
  { num: 1, name: 'Hospice UK', dataset: 'Funding Analysis & Financial Sustainability Report', url: 'https://www.hospiceuk.org/about-us/media-centre/press-releases', date: '2023' },
  { num: 2, name: 'CQC', dataset: 'Registered Palliative Care Capacity', url: 'https://www.cqc.org.uk/', date: '2023' },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HospiceFundingPage() {
  const [data, setData] = useState<HospiceFundingData | null>(null);

  useEffect(() => {
    fetch('/data/hospice-funding/hospice_funding.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const fundingSeries: Series[] = data
    ? [
        {
          id: 'nhs-share',
          label: 'NHS share of hospice income (%)',
          colour: '#264653',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.nhsFundingPct })),
        },
        {
          id: 'charity-share',
          label: 'Charity &amp; fundraising share (%)',
          colour: '#6B7280',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.charityFundingPct })),
        },
      ]
    : [];

  const deficitSeries: Series[] = data
    ? [
        {
          id: 'deficit',
          label: 'Hospices reporting financial deficit (%)',
          colour: '#E63946',
          data: data.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.hospicesInDeficitPct })),
        },
      ]
    : [];

  return (
    <>
      <TopicNav topic="Hospice Funding" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Hospice Funding"
          question="Why Are Hospices Struggling to Stay Open?"
          finding="Hospices provide 30% of all specialist palliative care in the UK but receive only 27% of their funding from the NHS — down from 34% in 2014 — relying instead on charity fundraising, which is increasingly squeezed by rising costs and competition for donations."
          colour="#6B7280"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              There are around 200 hospices in the UK, providing specialist palliative care to approximately 225,000 people each year.<Cite nums={1} /> They deliver roughly 30% of all inpatient specialist palliative care beds, and an even larger share of community palliative care through hospice-at-home services, day therapy, and bereavement support.<Cite nums={2} /> Yet unlike NHS hospitals or GP practices, which are funded almost entirely by the public purse, hospices receive on average only 27% of their income from NHS commissioners — down from 34% in 2014.<Cite nums={1} /> The remaining 73% must be raised from charity shops, fundraising events, legacies, and public donations. This structural dependency on charitable income makes hospices acutely vulnerable to economic downturns, rising costs, and the shifting priorities of an increasingly competitive charity fundraising market.
            </p>
            <p>
              The financial crisis in the hospice sector deepened sharply after 2021. Staff pay — the largest cost for any care organisation — rose significantly as the care sector competed for workers with NHS employers who could offer Agenda for Change pay rates. Energy costs surged after the Ukrainian invasion of 2022. Meanwhile, NHS commissioning rates — which are negotiated locally and vary enormously between integrated care boards — did not keep pace with inflation. Hospice UK reported in 2023 that 58% of member hospices were in deficit, up from 20% in 2014.<Cite nums={1} /> Several hospices cut bed numbers, reduced opening hours, or closed day therapy services entirely.<Cite nums={2} /> Kirkwood Hospice in Yorkshire closed its inpatient unit temporarily in 2023; Nottinghamshire Hospice scaled back community services. These are not isolated incidents but symptoms of a systemic funding model that has not been reviewed since the 1980s.
            </p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-funding', label: 'Funding Mix' },
          { id: 'sec-deficit', label: 'Financial Deficit' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="NHS share of hospice income"
              value="27%"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 34% in 2014 · 73% now from charity fundraising"
              sparklineData={[34, 33, 32, 31, 30, 29, 28, 27]}
              source="Hospice UK · Funding analysis 2023"
              href="#sec-funding"
            />
            <MetricCard
              label="Hospices reporting financial deficit"
              value="58%"
              direction="up"
              polarity="up-is-bad"
              changeText="Up from 20% in 2014 · Sector-wide financial crisis"
              sparklineData={[20, 25, 30, 35, 42, 50, 55, 58]}
              source="Hospice UK · Annual member survey 2023"
              href="#sec-funding"
            />
            <MetricCard
              label="Hospice inpatient beds"
              value="4,900"
              direction="down"
              polarity="up-is-good"
              changeText="Down from 5,400 in 2014 · Beds cut as deficits deepen"
              sparklineData={[5400, 5300, 5200, 5100, 5000, 4950, 4920, 4900]}
              source="CQC · Registered palliative care capacity 2023"
              href="#sec-funding"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-funding" className="mb-12">
            {fundingSeries.length > 0 ? (
              <LineChart
                title="NHS vs charity share of hospice income, UK, 2014–2024"
                subtitle="Percentage of total hospice income from NHS commissioners (dark) vs charity fundraising, legacies, and trading (grey). NHS share has fallen 7 percentage points in a decade."
                series={fundingSeries}
                yLabel="Share of income (%)"
                source={{
                  name: 'Hospice UK / NHS England',
                  dataset: 'Hospice funding analysis &amp; palliative care commissioning data',
                  frequency: 'annual',
                  url: 'https://www.hospiceuk.org/about-us/media-centre/press-releases',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-deficit" className="mb-12">
            {deficitSeries.length > 0 ? (
              <LineChart
                title="Proportion of hospices in financial deficit, 2014–2024"
                subtitle="Percentage of Hospice UK member hospices reporting an annual operating deficit. Rising sharply since 2016 as staff costs and energy bills outpace fundraising income and NHS contract increases."
                series={deficitSeries}
                yLabel="Hospices in deficit (%)"
                source={{
                  name: 'Hospice UK',
                  dataset: 'Annual member survey &amp; financial sustainability report',
                  frequency: 'annual',
                  url: 'https://www.hospiceuk.org/about-us/media-centre/press-releases',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What the evidence shows"
            value="84%"
            unit="excellent satisfaction"
            description="Every £1 invested in hospice care saves approximately £3 in acute hospital costs — and 84% of people who use hospice care describe it as excellent, the highest satisfaction rate of any NHS service. The 2024 Palliative and End of Life Care National Programme commits to reviewing NHS commissioning arrangements, with the potential to increase the NHS funding share to 35% by 2027."
            source="NHS England · Palliative and End of Life Care Strategy 2024 · Hospice UK cost-benefit analysis 2023"
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} — 
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue hover:no-underline">
                  {src.url}
                </a>
              </p>
            ))}
          </div>
          <p className="text-sm text-wiah-mid mt-6">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-6 p-4 bg-wiah-light rounded">
              <p className="font-bold text-wiah-black mb-2">Known issues:</p>
              <ul className="text-sm text-wiah-mid space-y-1 list-disc list-inside">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
              <RelatedTopics />
      </main>
    </>
  );
}
