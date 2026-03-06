'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface UCPoint {
  date: string;
  claimantsM: number;
}

interface PIPPoint {
  year: number;
  awardedThousands: number;
}

interface SanctionPoint {
  year: number;
  sanctionDecisionsThousands: number;
}

interface FoodBankPoint {
  year: string;
  parcelsThousands: number;
}

interface BenefitsData {
  topic: string;
  national: {
    universalCredit: {
      timeSeries: UCPoint[];
      latestClaimants: number;
      latestDate: string;
      inWork: number;
      inWorkPct: number;
    };
    pip: {
      timeSeries: PIPPoint[];
      latestAwards: number;
      latestYear: number;
    };
    sanctions: {
      timeSeries: SanctionPoint[];
    };
    foodBanks: {
      timeSeries: FoodBankPoint[];
      latestYear: string;
      latestParcels: number;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function monthToDate(d: string): Date {
  // "2016-04" → new Date(2016, 3, 1)
  const parts = d.split('-');
  if (parts.length === 2) {
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    return new Date(year, month, 1);
  }
  return new Date();
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function fyToDate(fy: string): Date {
  // "2015/16" → new Date(2015, 3, 1) (April)
  const start = parseInt(fy.split('/')[0]);
  return new Date(start, 3, 1);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function BenefitsPage() {
  const [data, setData] = useState<BenefitsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/benefits/benefits.json')
      .then((res) => res.json())
      .then((json: BenefitsData) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load benefits data:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  // ── Series ────────────────────────────────────────────────────────────────

  const ucSeries: Series[] = [
    {
      id: 'uc-claimants',
      label: 'UC claimants (millions)',
      colour: '#264653',
      data: data.national.universalCredit.timeSeries.map((p) => ({
        date: monthToDate(p.date),
        value: p.claimantsM,
      })),
    },
  ];

  const pipSeries: Series[] = [
    {
      id: 'pip-awards',
      label: 'PIP awards (thousands)',
      colour: '#F4A261',
      data: data.national.pip.timeSeries.map((p) => ({
        date: yearToDate(p.year),
        value: p.awardedThousands,
      })),
    },
  ];

  const sanctionSeries: Series[] = [
    {
      id: 'sanctions',
      label: 'Sanction decisions (thousands)',
      colour: '#E63946',
      data: data.national.sanctions.timeSeries.map((p) => ({
        date: yearToDate(p.year),
        value: p.sanctionDecisionsThousands,
      })),
    },
  ];

  const foodBankSeries: Series[] = [
    {
      id: 'food-bank',
      label: 'Food bank parcels (thousands)',
      colour: '#E63946',
      data: data.national.foodBanks.timeSeries.map((p) => ({
        date: fyToDate(p.year),
        value: p.parcelsThousands,
      })),
    },
  ];

  // ── Annotations ──────────────────────────────────────────────────────────

  const ucAnnotations: Annotation[] = [
    {
      date: new Date(2020, 2, 1),
      label: '2020: COVID surge',
    },
  ];

  const sanctionAnnotations: Annotation[] = [
    {
      date: new Date(2020, 2, 1),
      label: '2020: COVID suspension',
    },
  ];

  return (
    <main>
      <TopicNav topic="Benefits" />

      <div className="max-w-5xl mx-auto px-6 pt-12">
        <TopicHeader
          topic="Benefits"
          question="Is the Safety Net Actually Catching People?"
          finding="6.78 million people now claim Universal Credit — nearly three times the 2018 level. Alongside a surge in PIP recipients and food bank use, Britain's safety net is catching more people, but not necessarily catching them better."
          colour="#F4A261"
          preposition="with"
        />
      </div>

      {/* Metric Cards */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ScrollReveal>
            <MetricCard
              label="Universal Credit claimants"
              value="6.78M"
              direction="up"
              polarity="up-is-bad"
              changeText="Jan 2025 · 44.9% in work · Tripled since 2018"
              sparklineData={[0.37, 0.80, 1.35, 2.11, 3.97, 5.74, 5.83, 6.05, 6.37, 6.61, 6.78]}
            />
          </ScrollReveal>

          <ScrollReveal>
            <MetricCard
              label="PIP recipients"
              value="3.66M"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · Up 93% since 2019 · Driven by mental health and musculoskeletal"
              sparklineData={[800, 1050, 1320, 1670, 1980, 2220, 2490, 2870, 3350, 3660]}
            />
          </ScrollReveal>

          <ScrollReveal>
            <MetricCard
              label="Food bank parcels/yr"
              value="3.1M"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 Trussell Trust · Up 65% since 2019/20 · 1 million were children"
              sparklineData={[1109, 1182, 1332, 1583, 1893, 2534, 2173, 3026, 3121]}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Charts */}
      <section id="sec-charts" className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        <ScrollReveal>
          <LineChart
            title="Universal Credit claimants, 2016–2025"
            subtitle="Millions of people receiving UC each month. Surged during pandemic; has continued growing as legacy benefit migration completes."
            series={ucSeries}
            annotations={ucAnnotations}
            yLabel="Claimants (millions)"
            source={{
              name: 'DWP',
              dataset: 'Universal Credit statistics',
              frequency: 'monthly',
              url: 'https://www.gov.uk/government/collections/universal-credit-statistics',
            }}
          />
        </ScrollReveal>

        <ScrollReveal>
          <LineChart
            title="Personal Independence Payment recipients, 2013–2024"
            subtitle="Thousands of live PIP awards. Nearly 4 million people now receive PIP — up from 190,000 when it launched in 2013."
            series={pipSeries}
            yLabel="Recipients (thousands)"
            source={{
              name: 'DWP',
              dataset: 'Personal Independence Payment statistics',
              frequency: 'quarterly',
              url: 'https://www.gov.uk/government/collections/personal-independence-payment-statistics',
            }}
          />
        </ScrollReveal>

        <ScrollReveal>
          <LineChart
            title="UC and legacy benefit sanction decisions, 2015–2024"
            subtitle="Thousands of decisions to apply a benefit sanction. Suspended during COVID; now at record levels."
            series={sanctionSeries}
            annotations={sanctionAnnotations}
            yLabel="Sanction decisions (thousands)"
            source={{
              name: 'DWP',
              dataset: 'Benefit sanctions statistics',
              frequency: 'quarterly',
              url: 'https://www.gov.uk/government/collections/benefit-sanctions-statistics',
            }}
          />
        </ScrollReveal>

        <ScrollReveal>
          <LineChart
            title="Food bank parcels distributed, Trussell Trust, 2015–2024"
            subtitle="Thousands of emergency food parcels. 3.1 million in 2023/24 — the highest on record. This is the Trussell Trust network only; total UK use is higher."
            series={foodBankSeries}
            yLabel="Parcels (thousands)"
            source={{
              name: 'Trussell Trust',
              dataset: 'End of Year Stats',
              frequency: 'annual',
              url: 'https://www.trusselltrust.org/news-and-blog/latest-stats/end-year-stats/',
            }}
          />
        </ScrollReveal>
      </section>

      {/* Context */}
      <section id="sec-context" className="max-w-4xl mx-auto px-6 py-16 space-y-6 text-wiah-black leading-relaxed">
        <p>
          Universal Credit covers 6.78 million claimants as of January 2025, nearly triple the 2018 level. Its design embeds specific policy choices with measurable consequences: the five-week wait for a first payment sent over 100,000 people to food banks; the two-child limit affects roughly 500,000 families and saves the Treasury an estimated £3.6 billion a year; the benefit cap constrains a further 150,000 households. Personal Independence Payment has grown even faster — 3.66 million recipients in 2024, up 93% since 2019, with DWP spending £26 billion on PIP in 2024/25. The government's 2025 welfare reform white paper proposes cutting 1.2 million people from PIP by 2030, targeting £5 billion in savings through stricter eligibility criteria.
        </p>

        <p>
          The downstream indicators tell a consistent story of a safety net under strain. The Trussell Trust distributed 3.1 million emergency food parcels in 2023/24 — one million to children, one in three to first-time users. Benefit sanctions returned to 612,000 decisions in 2024 after the COVID suspension, with an average sanction length of four weeks. The Joseph Rowntree Foundation counted 3.8 million people in destitution in 2023, unable to afford food or shelter on two or more days in a month. The safety net is large; whether it is adequate is a different question.
        </p>
      </section>

      {/* Positive Callout */}
      <section id="sec-positive" className="max-w-4xl mx-auto px-6 py-12">
        <PositiveCallout
          title="What's improving"
          value="44.9%"
          unit="of UC claimants are in work"
          description="Despite UC's reputation as an out-of-work benefit, nearly half of all 6.78 million claimants were in employment as of January 2025. This reflects a deliberate design choice to extend in-work support to low earners. UC has simplified access to top-up payments for the working poor, and its real-time interface with HMRC's systems means support adjusts automatically as earnings change."
          source="Source: DWP — Universal Credit statistics, January 2025."
        />
      </section>

      {/* Sources */}
      <section id="sec-sources" className="max-w-4xl mx-auto px-6 py-16 border-t border-wiah-border">
        <h3 className="font-bold text-wiah-black mb-6">Sources and methodology</h3>
        <div className="space-y-4 text-sm text-wiah-mid font-mono">
          {data.metadata.sources.map((src, idx) => (
            <div key={idx}>
              <p className="font-bold text-wiah-black">{src.name}</p>
              <p>
                <a
                  href={src.url}
                  className="text-wiah-blue hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {src.dataset}
                </a>
              </p>
              <p>Updated {src.frequency}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4 text-sm text-wiah-mid">
          <div>
            <p className="font-bold text-wiah-black mb-2">Methodology</p>
            <p>{data.metadata.methodology}</p>
          </div>

          <div>
            <p className="font-bold text-wiah-black mb-2">Known issues</p>
            <ul className="list-disc list-inside space-y-1">
              {data.metadata.knownIssues.map((issue, idx) => (
                <li key={idx}>{issue}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SectionNav sections={[
        { id: 'sec-charts', label: 'Charts' },
        { id: 'sec-context', label: 'Context' },
        { id: 'sec-positive', label: "What\'s improving" },
        { id: 'sec-sources', label: 'Sources' },
      ]} />
    </main>
  );
}
