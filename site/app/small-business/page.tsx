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
  { num: 1, name: 'The Insolvency Service', dataset: 'Company Insolvency Statistics', url: 'https://www.gov.uk/government/collections/insolvency-statistics', date: 'Q4 2024' },
  { num: 2, name: 'ONS', dataset: 'Business Demography, UK', url: 'https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/bulletins/businessdemography/latest', date: '2024' },
  { num: 3, name: 'Federation of Small Businesses', dataset: 'Late Payment Report', url: 'https://www.fsb.org.uk/', date: '2024' },
  { num: 4, name: 'British Retail Consortium', dataset: 'Retail sector analysis', url: 'https://brc.org.uk/', date: '2023' },
  { num: 5, name: 'National Audit Office', dataset: 'Bounce Back Loan Scheme fraud estimate', url: 'https://www.nao.org.uk/', date: '2023' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface SmallBusinessData {
  national: {
    insolvencies: {
      timeSeries: Array<{ year: number; totalInsolvencies: number }>;
    };
    survivalRate: {
      timeSeries: Array<{ year: number; fiveYearSurvivalPct: number }>;
    };
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

export default function SmallBusinessPage() {
  const [data, setData] = useState<SmallBusinessData | null>(null);

  useEffect(() => {
    fetch('/data/small-business/small_business.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const insolvencySeries: Series[] = data
    ? [{
        id: 'insolvencies',
        label: 'Company insolvencies',
        colour: '#E63946',
        data: data.national.insolvencies.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.totalInsolvencies,
        })),
      }]
    : [];

  const survivalSeries: Series[] = data
    ? [{
        id: 'survival-rate',
        label: 'Five-year survival rate (%)',
        colour: '#F4A261',
        data: data.national.survivalRate.timeSeries.map(d => ({
          date: yearToDate(d.year),
          value: d.fiveYearSurvivalPct,
        })),
      }]
    : [];

  const insolvencyAnnotations: Annotation[] = [
    { date: yearToDate(2020), label: '2020: COVID support suppresses insolvencies' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Small Business" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Small Business"
          question="Are Small Businesses Actually Surviving?"
          finding="Company insolvencies in England and Wales reached 27,500 in 2024 — the highest level in over 30 years. The five-year survival rate for new businesses has fallen to 38%, down from 44% a decade ago. Late payment by large firms costs small businesses an estimated £23 billion per year in cash flow, with the average SME owed £22,000 in overdue invoices."
          colour="#F4A261"
          preposition="for"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Small and medium-sized enterprises account for 99.9% of the UK's 5.5 million businesses, employ 16.7 million people, and generate approximately £2.3 trillion in annual turnover.<Cite nums={2} /> Yet the environment for small businesses has deteriorated sharply since 2022. Company insolvencies in England and Wales reached 27,500 in 2024, the highest level since records began in their current form in 1993.<Cite nums={1} /> This exceeds the peak during the 2008–09 financial crisis and represents an 88% increase on 2019 levels. The surge is driven by a toxic combination of factors: post-pandemic debt from Bounce Back Loans (of which £47 billion was disbursed, with an estimated £4.9 billion in fraud),<Cite nums={5} /> rising interest rates that doubled borrowing costs between 2022 and 2024, energy costs that remain 40–50% above pre-crisis levels for business tariffs, and persistent labour shortages in hospitality, construction, and logistics.</p>
            <p>The five-year survival rate for new businesses has fallen from 44% for firms born in 2013 to approximately 38% for those born in 2019.<Cite nums={2} /> ONS business demography data shows that while business births recovered from the pandemic, deaths have outpaced births in seven of the last ten quarters. The retail sector has been hardest hit: over 17,000 retail stores closed in 2023, and the British Retail Consortium reports a net loss of 6,000 stores per year since 2018.<Cite nums={4} /> Late payment remains a structural problem: the Federation of Small Businesses estimates that £23 billion is owed to SMEs in overdue invoices at any given time, with the average small firm waiting 52 days for payment despite standard 30-day terms.<Cite nums={3} /> The Prompt Payment Code is voluntary and has no enforcement mechanism; large companies that breach its terms face no penalties beyond potential removal from the code's signatory list.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-insolvencies', label: 'Insolvencies' },
          { id: 'sec-survival', label: 'Survival Rate' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Company insolvencies (England &amp; Wales)"
              value="27,500"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · Highest in 30+ years · Up 88% on 2019 · Construction worst sector"
              sparklineData={[14630, 15520, 15080, 16090, 17200, 12550, 14150, 22100, 25158, 27500]}
              href="#sec-insolvencies"
            />
            <MetricCard
              label="Five-year business survival rate"
              value="38.2%"
              direction="down"
              polarity="up-is-good"
              changeText="2024 · Down from 44% in 2015 · Retail worst-affected · 17K store closures in 2023"
              sparklineData={[44.1, 43.2, 42.5, 42.0, 41.6, 40.8, 39.9, 39.4, 38.7, 38.2]}
              href="#sec-insolvencies"
            />
            <MetricCard
              label="Late payment debt owed to SMEs"
              value="£23bn"
              direction="up"
              polarity="up-is-bad"
              changeText="At any time · Avg SME owed £22K overdue · Avg wait: 52 days vs 30-day terms"
              sparklineData={[18, 19, 19, 20, 21, 20, 21, 22, 23]}
              href="#sec-insolvencies"
            />
          </div>
        

        <ScrollReveal>
          <section id="sec-insolvencies" className="mb-12">
            <LineChart
              title="Company insolvencies, England &amp; Wales, 2015–2024"
              subtitle="Total company insolvencies including compulsory liquidations, CVLs, administrations, and CVAs."
              series={insolvencySeries}
              yLabel="Insolvencies"
              annotations={insolvencyAnnotations}
              source={{
                name: 'The Insolvency Service',
                dataset: 'Company Insolvency Statistics',
                frequency: 'quarterly',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-survival" className="mb-12">
            <LineChart
              title="Five-year business survival rate, UK, 2015–2024"
              subtitle="Proportion of businesses born in a given year that are still active five years later."
              series={survivalSeries}
              yLabel="%"
              source={{
                name: 'ONS',
                dataset: 'Business Demography, UK',
                frequency: 'annual',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's supporting growth"
            value="£12bn"
            unit="in finance provided to smaller businesses by British Business Bank in 2023/24"
            description="The British Business Bank has significantly expanded access to finance for SMEs. Start Up Loans have disbursed over £1 billion to 100,000+ entrepreneurs since 2012. The small profits rate (19% corporation tax for profits under £50,000) protects the smallest firms from the April 2023 increase. Full expensing provides 100% first-year capital allowances for plant and machinery investment. The Recovery Loan Scheme has been extended to 2026, providing government-guaranteed lending to growing businesses."
            source="Source: The Insolvency Service — Company Insolvency Statistics Q4 2024; ONS — Business Demography 2024; FSB — Late Payment Report 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
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
              <RelatedTopics />
      </main>
    </>
  );
}
