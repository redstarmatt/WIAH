'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Labour Productivity', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/labourproductivity', date: '2023' },
  { num: 2, name: 'ONS', dataset: 'National Accounts — Business Investment', url: 'https://www.ons.gov.uk/economy/nationalaccounts', date: '2023' },
  { num: 3, name: 'OBR', dataset: 'Economic and Fiscal Outlook — Business Investment Analysis', url: 'https://obr.uk/', date: '2023' },
  { num: 4, name: 'LSE Centre for Economic Performance', dataset: 'World Management Survey — UK Productivity Gap', url: 'https://cep.lse.ac.uk/', date: '2023' },
  { num: 5, name: 'The Productivity Institute', dataset: 'UK Productivity Gap Analysis', url: 'https://www.productivity.ac.uk/', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface ProductivityTimeSeries {
  year: number;
  indexUKEq100: number;
}

interface BusinessInvestmentSeries {
  year: number;
  pctGDP: number;
}

interface RegionalData {
  region: string;
  indexUKEq100: number;
}

interface ProductivityData {
  national: {
    outputPerHour: {
      timeSeries: ProductivityTimeSeries[];
      latestYear: number;
      latestIndex: number;
      g7AverageIndex: number;
      usaIndex: number;
      germanyIndex: number;
      franceIndex: number;
    };
    businessInvestment: {
      timeSeries: BusinessInvestmentSeries[];
      latestYear: number;
      latestPctGDP: number;
      g7AveragePctGDP: number;
    };
    byRegion: RegionalData[];
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 12): number[] {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ProductivityPage() {
  const [data, setData] = useState<ProductivityData | null>(null);

  useEffect(() => {
    fetch('/data/productivity/productivity.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const outputPerHourSeries: Series[] = data
    ? [
        {
          id: 'output-per-hour',
          label: 'Output per hour (index)',
          colour: '#264653',
          data: data.national.outputPerHour.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.indexUKEq100,
          })),
        },
      ]
    : [];

  const businessInvestmentSeries: Series[] = data
    ? [
        {
          id: 'business-investment',
          label: 'Business investment',
          colour: '#F4A261',
          data: data.national.businessInvestment.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.pctGDP,
          })),
        },
      ]
    : [];

  const outputAnnotations: Annotation[] = [
    { date: yearToDate(2008), label: '2008: Financial crisis' },
    { date: yearToDate(2020), label: '2020: COVID-19' },
  ];

  return (
    <>
      <TopicNav topic="Productivity" />
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <TopicHeader
          topic="Productivity"
          question="Why Is Britain's Productivity So Persistently Low?"
          finding="UK output per hour worked is 14% below the G7 average and 18% below the United States. Productivity growth flatlined after the 2008 financial crisis — a decade of near-zero growth economists call the &lsquo;productivity puzzle&rsquo;. Regional inequality is severe: London's productivity is 70% above the UK average; the North East is 30% below."
          colour="#264653"
          preposition="with"
        />

        {/* Section Nav */}
        <SectionNav
          sections={[
            { id: 'sec-overview', label: 'Overview' },
            { id: 'sec-trend', label: 'Productivity Trend' },
            { id: 'sec-investment', label: 'Investment' },
            { id: 'sec-regions', label: 'By Region' },
          ]}
        />

        {/* Metric Cards */}
        <div id="sec-overview" className="mb-12 scroll-mt-20">
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricCard
                label="Output per hour worked (index, UK = 100)"
                value="100"
                direction="flat"
                polarity="up-is-good"
                changeText="2023 · G7 average: 114 · USA: 118 · Germany: 111 · France: 118 · UK lags all peers"
                sparklineData={sparkFrom([95, 96, 96, 97, 97, 97, 97, 98, 98, 99, 97, 99, 100, 100])}
                href="#sec-trend"/>
              <MetricCard
                label="Annual productivity growth (output per hour)"
                value="0.4%"
                direction="flat"
                polarity="up-is-good"
                changeText="2022/23 · Pre-2008: avg 2.1%/yr · Post-2008: avg 0.3%/yr · &lsquo;Productivity puzzle&rsquo; not solved"
                sparklineData={sparkFrom([2.4, 2.8, 1.6, -1.2, 0.5, 0.8, 0.2, 0.1, 0.3, 0.4, -0.8, 1.2, 0.4, 0.4])}
                href="#sec-investment"/>
              <MetricCard
                label="Business investment as % of GDP"
                value="9.8%"
                direction="down"
                polarity="up-is-good"
                changeText="2023 · One of lowest in G7 · Post-Brexit uncertainty a factor · G7 average: 14% · Japan: 17%"
                sparklineData={sparkFrom([11.2, 11.0, 10.8, 10.5, 10.2, 10.0, 9.8, 9.6, 9.5, 9.8, 9.4, 9.8, 9.8])}
                href="#sec-regions"/>
            </div>
          </ScrollReveal>
        </div>

        {/* Context */}
        <div className="mb-12 text-wiah-black leading-relaxed space-y-4">
          <ScrollReveal>
            <p>UK output per hour worked is approximately 14% below the G7 average, 18% below the United States, 18% below France, and 11% below Germany.<Cite nums={1} /> From 1948 to 2007, UK productivity grew at roughly 2% per year — consistent with other advanced economies. Since 2008, growth has averaged 0.3% per year, the weakest sustained period in the historical record.<Cite nums={1} /> This &lsquo;productivity puzzle&rsquo; is the single most important explanation for why real wages grew so slowly in the 2010s despite record employment. ONS data show UK labour productivity in 2023 remains barely above its 2007 peak — 16 years of near-stagnation on the aggregate measure.<Cite nums={1} /> The UK has a &lsquo;long tail&rsquo; of low-productivity businesses: the gap between the most productive and least productive firms is wider than in Germany, France, or the United States.<Cite nums={5} /></p>
          </ScrollReveal>
          <ScrollReveal>
            <p>Business investment is the most cited cause. UK fixed capital formation by businesses has averaged 9–10% of GDP since 2016, against a G7 average of 14%.<Cite nums={2} /> Post-Brexit uncertainty is part of the explanation: OBR analysis shows business investment was flat from the 2016 referendum until 2022.<Cite nums={3} /> Management quality matters too — UK firms have significantly lower average management practice scores than their US or German equivalents according to the World Management Survey, and LSE Centre for Economic Performance research attributes approximately 25% of the UK–US productivity gap to management.<Cite nums={4} /> R&amp;D investment, at 1.7% of GDP, is below the 2.4% OECD average. Geographic concentration is extreme: London's productivity is 70% above the UK average, a level of capital-city dominance unmatched by any other large economy. The North East and Wales produce roughly 70–76 on an index where the UK equals 100.<Cite nums={1} /></p>
          </ScrollReveal>
          <ScrollReveal>
            <p>Full expensing, introduced in 2023 and made permanent, provides 100% first-year capital allowances for plant and machinery investment; the OBR estimates a 1% of GDP increase in business investment by 2028.<Cite nums={3} /> The government's new Industrial Strategy targets five sectors — advanced manufacturing, clean energy, creative industries, defence, and financial services — though evidence from past sectoral strategies is mixed. The UK's weak vocational training system is widely cited as a constraint: the productivity gap with Germany is largest in construction, manufacturing and food processing, sectors that depend heavily on intermediate vocational qualifications. The Levelling Up Fund committed £4.8 billion to English regions, but early evaluations show limited aggregate productivity impact. The Productivity Institute identifies five key drivers — investment, innovation, management, skills, and infrastructure — none of which has shown sustained improvement since 2010.<Cite nums={5} /></p>
          </ScrollReveal>
        </div>

        {/* Chart 1: Output per hour */}
        <div id="sec-trend" className="mb-12 scroll-mt-20">
          <ScrollReveal>
            {outputPerHourSeries.length > 0 && (
              <LineChart
                title="UK output per hour worked, 2000–2023 (index, 2008=100)"
                subtitle="Indexed productivity growth. Pre-2008 growth averaging 2%/year has stalled to near-zero since the financial crisis."
                series={outputPerHourSeries}
                yLabel="Index (2008 = 100)"
                annotations={outputAnnotations}
                source={{ name: 'ONS', dataset: 'Labour Productivity', frequency: 'quarterly' }}
              />
            )}
          </ScrollReveal>
        </div>

        {/* Chart 2: Business investment */}
        <div id="sec-investment" className="mb-12 scroll-mt-20">
          <ScrollReveal>
            {businessInvestmentSeries.length > 0 && (
              <LineChart
                title="Business investment as % of GDP, UK, 2010–2023"
                subtitle="Gross fixed capital formation by private businesses as a share of GDP. The UK invests significantly less than the G7 average of 14%."
                series={businessInvestmentSeries}
                yLabel="% of GDP"
                source={{ name: 'ONS', dataset: 'National Accounts', frequency: 'quarterly' }}
              />
            )}
          </ScrollReveal>
        </div>

        {/* Bar chart: By region */}
        <div id="sec-regions" className="mb-12 scroll-mt-20">
          <ScrollReveal>
            <div>
              <h2 className="text-xl font-bold text-wiah-black mb-2">Productivity by region (GVA per hour, UK = 100)</h2>
              <p className="text-sm text-wiah-mid mb-6">Output per hour worked by English region, Wales, and Scotland. London's productivity is 70% above the UK average.</p>
              <div className="space-y-2">
                {data?.national.byRegion.map(item => (
                  <div key={item.region} className="flex items-center gap-3">
                    <div className="w-24 text-sm text-wiah-black font-mono">{item.region}</div>
                    <div className="flex-1 h-8 bg-wiah-light rounded relative" style={{ width: `${(item.indexUKEq100 / 170) * 100}%`, backgroundColor: '#264653' }}>
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 font-mono text-xs font-bold text-white">
                        {item.indexUKEq100}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Positive Callout */}
        <ScrollReveal>
          <PositiveCallout
            title="The opportunity"
            value="+35%"
            unit="productivity gain if UK matched G7 average — equivalent to an extra £9,000 per worker per year"
            description="If the UK matched the G7 average productivity level, output per worker would be 35% higher — equivalent to an extra £9,000 per worker per year. The Productivity Institute estimates that closing the UK's productivity gap with Germany and France would add £370 billion to annual GDP. The 2023 Autumn Statement introduced full expensing — 100% first-year capital allowances for plant and machinery — which the OBR forecasts will increase business investment by 1% of GDP by 2028. The UK's R&amp;D tax credits system is among the most generous in the OECD, and R&amp;D spending has reached 1.7% of GDP, albeit still below the 2.4% OECD average."
            source="Source: ONS — Labour Productivity 2023; The Productivity Institute — UK Productivity Gap Analysis 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources */}
        <ScrollReveal>
          <div className="border-t border-wiah-border pt-8">
            <h3 className="text-sm font-bold text-wiah-black mb-4">Sources &amp; Methodology</h3>
            <div className="space-y-2 text-xs text-wiah-mid font-mono">
              {data?.metadata.sources.map((src, idx) => (
                <p key={idx}>
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                    {src.name} — {src.dataset}
                  </a>
                  {' '} ({src.frequency})
                </p>
              ))}
            </div>
          </div>
        </ScrollReveal>
              <RelatedTopics />
      </main>
    </>
  );
}
