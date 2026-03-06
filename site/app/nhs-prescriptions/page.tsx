'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface PrescriptionsData {
  national: {
    prescriptionVolume: {
      timeSeries: Array<{ year: number; itemsMillions: number }>;
      latestYear: number;
      latestMillions: number;
      chargePerItemGBP: number;
      freePct: number;
    };
    nhsDrugCost: {
      timeSeries: Array<{ year: number; costBillionGBP: number }>;
      latestYear: number;
      latestBillionGBP: number;
    };
    byExemptionType: Array<{ type: string; sharePct: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PrescriptionsPage() {
  const [data, setData] = useState<PrescriptionsData | null>(null);

  useEffect(() => {
    fetch('/data/nhs-prescriptions/nhs_prescriptions.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const volumeSeries: Series[] = data
    ? [{
        id: 'volume',
        label: 'Items (millions)',
        colour: '#2A9D8F',
        data: data.national.prescriptionVolume.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.itemsMillions,
        })),
      }]
    : [];

  const costSeries: Series[] = data
    ? [{
        id: 'cost',
        label: '&pound; billion',
        colour: '#2A9D8F',
        data: data.national.nhsDrugCost.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.costBillionGBP,
        })),
      }]
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="NHS Prescriptions" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS Prescriptions"
          question="Who Can Actually Afford Their NHS Prescriptions?"
          finding="1.1 billion prescriptions are dispensed in England each year. The prescription charge is &pound;9.90 per item &mdash; up 60% in real terms since 2000. 90% of prescriptions are dispensed free of charge due to exemptions. An estimated 750,000 people skip medication each year due to cost. Scotland, Wales and Northern Ireland abolished prescription charges entirely."
          colour="#2A9D8F"
          preposition="for"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England dispenses 1.1 billion prescription items each year at a total net ingredient cost of &pound;10.8 billion. The prescription charge stands at &pound;9.90 per item (April 2024), up 60% in real terms since 2000, but 90% of items are dispensed free &mdash; the over-60s account for 43% of all items, medical exemption certificates a further 31%. The charge falls almost entirely on working-age adults without a qualifying condition. England is alone in the UK in maintaining the charge: Scotland abolished it in 2011, Wales in 2007, Northern Ireland in 2010. An estimated 750,000 people skip or cut medication each year due to cost &mdash; a rationing effect invisible to the health system. The exemption certificate list, last updated substantively in 1968, covers diabetes and epilepsy but excludes asthma, rheumatoid arthritis, depression, and most chronic pain conditions.</p>
            <p>The burden falls hardest on working-age adults with chronic conditions outside the exemption list and on those earning just above means-tested benefit thresholds. A patient with rheumatoid arthritis on three items faces &pound;356 in charges annually unless they buy the Prescription Prepayment Certificate &mdash; requiring upfront payment many cannot afford. Prescription charge revenue is highest per capita in the Midlands and North, where chronic disease prevalence is greatest and household incomes lowest. Black and Asian patients, disproportionately in working age without exemption, pay charges at higher rates. The government cites &pound;570 million in annual revenue as justification &mdash; roughly 0.4% of the NHS England budget &mdash; without accounting for the downstream costs of non-adherence.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-volume', label: 'Prescription Volume' },
          { id: 'sec-cost', label: 'NHS Drug Cost' },
          { id: 'sec-exemptions', label: 'Who Pays' },
        ]} />

        <ScrollReveal>
          <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Prescriptions dispensed annually (England)"
              value="1.1bn"
              direction="up"
              polarity="up-is-good"
              changeText="2023 &middot; 90% free of charge &middot; &pound;10.8bn total cost &middot; 43% dispensed to those aged 60+"
              sparklineData={[900, 930, 953, 971, 990, 1016, 1025, 1040, 1001, 1060, 1080, 1100]}
              href="#sec-volume"
            />
            <MetricCard
              label="Prescription charge per item (England)"
              value="&pound;9.90"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; Up 60% in real terms since 2000 &middot; Scotland, Wales &amp; NI: free &middot; 750K skip medication due to cost"
              sparklineData={[7.65, 7.85, 8.05, 8.20, 8.40, 8.60, 8.80, 9.00, 9.15, 9.35, 9.65, 9.90]}
              href="#sec-volume"
            />
            <MetricCard
              label="NHS prescribing cost (annual)"
              value="&pound;10.8bn"
              direction="up"
              polarity="up-is-bad"
              changeText="2023 &middot; Up 35% since 2012 &middot; Biologics and cancer drugs fastest-growing &middot; NICE cost-effectiveness thresholds &pound;20k&ndash;&pound;30k per QALY"
              sparklineData={[8.0, 8.3, 8.7, 9.0, 9.2, 9.0, 9.1, 9.3, 9.5, 9.8, 10.2, 10.8]}
              href="#sec-volume"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-volume" className="mb-12">
            <LineChart
              title="Prescription items dispensed in England, 2012&ndash;2023"
              subtitle="Individual items on all prescriptions in NHS England, including those dispensed free of charge."
              series={volumeSeries}
              yLabel="Items (millions)"
              source={{
                name: 'NHS Business Services Authority',
                dataset: 'Prescription Cost Analysis',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-cost" className="mb-12">
            <LineChart
              title="Net NHS prescribing cost, England (&pound; billion), 2012&ndash;2023"
              subtitle="Net ingredient cost to the NHS for all prescriptions dispensed, excluding dispensing fees and other pharmacy costs."
              series={costSeries}
              yLabel="&pound; billion"
              source={{
                name: 'NHS Business Services Authority',
                dataset: 'Prescription Cost Analysis',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-exemptions" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-2">Prescription items by patient group, England, 2023</h2>
            <p className="text-sm text-wiah-mid font-mono mb-6">Share of all prescription items dispensed, by exemption category. Note: categories overlap &mdash; individuals may qualify under multiple grounds.</p>
            {data && (
              <div className="space-y-3">
                {data.national.byExemptionType.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-wiah-black flex-shrink-0">{item.type}</div>
                    <div className="flex-1 bg-wiah-border rounded h-5 overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{ width: `${(item.sharePct / 43) * 100}%`, backgroundColor: '#2A9D8F' }}
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-mono text-wiah-black">{item.sharePct}%</div>
                  </div>
                ))}
              </div>
            )}
            <p className="font-mono text-xs text-wiah-mid mt-4">Source: NHS Business Services Authority &mdash; Prescription Charges Statistics 2024</p>
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What&apos;s improving"
            value="90%"
            unit="of all prescriptions are dispensed free &mdash; exemptions protect most vulnerable groups from charges"
            description="Nine in ten prescription items in England are dispensed free of charge, with exemptions covering over-60s, those with medical exemption certificates (for conditions like diabetes, epilepsy, or thyroid disorders), children and full-time students, and recipients of means-tested benefits. The Prescription Prepayment Certificate (PPC) caps annual spending at &pound;111.60 (2024) for those needing more than 12 items &mdash; saving the average person with a long-term condition over &pound;600 per year. NHS England&apos;s medicines optimisation programme saved &pound;540 million in 2022/23 by switching to cheaper biosimilar drugs without clinical disadvantage."
            source="Source: NHS Business Services Authority &mdash; Prescription Cost Analysis 2023; DHSC &mdash; Prescription Charges Statistics 2024."
          />
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} &mdash; {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
