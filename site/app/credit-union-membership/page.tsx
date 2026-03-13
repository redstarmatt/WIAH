'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// Credit union membership (millions), 2010–2024
const membershipValues = [0.92, 1.02, 1.12, 1.24, 1.38, 1.52, 1.64, 1.74, 1.84, 1.94, 1.98, 2.02, 2.08, 2.12, 2.14];

// Total assets (£bn), 2010–2024
const assetValues = [0.9, 1.1, 1.3, 1.6, 1.9, 2.3, 2.7, 3.0, 3.3, 3.6, 3.7, 3.8, 3.9, 4.1, 4.2];

// Debt consolidation as % of loans, 2015–2024
const consolidationValues = [38, 37, 36, 35, 34, 34, 36, 37, 39, 40];

const series1: Series[] = [
  {
    id: 'membership',
    label: 'Credit union members (millions)',
    colour: '#2A9D8F',
    data: membershipValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'assets',
    label: 'Total assets (£ billions)',
    colour: '#264653',
    data: assetValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'consolidation',
    label: 'Debt consolidation loans (%, scaled ÷2)',
    colour: '#E63946',
    data: consolidationValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v / 2 })),
  },
];

const annotations1: Annotation[] = [
  { date: new Date(2012, 0, 1), label: '2012: Legislative Reform Order expands CU powers' },
  { date: new Date(2020, 2, 1), label: '2020: COVID-19 pandemic' },
  { date: new Date(2022, 0, 1), label: '2022: Cost-of-living crisis' },
];

const annotations2: Annotation[] = [
  { date: new Date(2014, 0, 1), label: '2014: PRA new regulatory framework' },
  { date: new Date(2022, 0, 1), label: '2022: Cost-of-living crisis drives demand' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Bank of England', dataset: 'Credit Union Quarterly Statistics', url: 'https://www.bankofengland.co.uk/prudential-regulation/credit-unions', date: 'Dec 2024' },
  { num: 2, name: 'ABCUL', dataset: 'Annual Statistics and Trends', url: 'https://www.abcul.org/media-and-research/facts-statistics', date: 'Nov 2024' },
  { num: 3, name: 'World Council of Credit Unions', dataset: 'Statistical Report 2024', url: 'https://www.woccu.org', date: '2024' },
];

export default function CreditUnionMembershipPage() {
  return (
    <>
      <TopicNav topic="Credit Union Membership" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Credit Union Membership"
          question="Why Does Britain Have So Few Credit Union Members?"
          finding="Only 2.1 million people — around 3% of the adult population — belong to a credit union in Great Britain, compared to 75% in Ireland and 37% in the United States. Credit unions offer affordable loans and savings accounts to people excluded from mainstream banking, yet Britain remains an outlier among comparable nations."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain's credit union sector has been growing steadily for over a decade. Membership has more than doubled since 2010, rising from 920,000 to 2.14 million by the end of 2024, while total assets have grown from under £1 billion to £4.2 billion over the same period.<Cite nums={1} /> These are genuine signs of progress. But context matters: credit unions still hold less than 0.1% of UK banking assets, and the penetration rate of around 3% is dwarfed by Ireland (75%), the United States (37%), and Canada (33%).<Cite nums={3} /> The gap is not explained by demand. Around 1.1 million adults in the UK have no bank account at all, and millions more rely on high-cost credit — precisely the people credit unions exist to serve.</p>
            <p>The roots of this gap are structural. Britain's credit union movement was legally recognised only in 1979, decades after Ireland, the US, and Canada had built mature cooperative finance networks embedded in workplaces, parishes, and communities. Regulatory constraints limited what British credit unions could offer until reforms in 2012 and 2014 expanded their lending powers. The cost-of-living crisis has sharpened both the need and the opportunity. Demand for affordable small loans surged in 2022 and 2023, with debt consolidation now accounting for 40% of credit union lending.<Cite nums={2} /> Payroll partnerships — where employers deduct savings and loan repayments directly from wages — have driven much of the recent membership growth.<Cite nums={2} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Membership' },
          { id: 'sec-chart2', label: 'Assets & Loans' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Credit union members (Great Britain)"
              value="2.14M"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="+133% since 2010 · still only 3% of adult population"
              sparklineData={[1.52, 1.64, 1.74, 1.84, 1.94, 1.98, 2.02, 2.08, 2.12, 2.14]}
              source="Bank of England / ABCUL — Dec 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Total credit union assets"
              value="£4.2B"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="up from £0.9B in 2010 · <0.1% of UK banking assets"
              sparklineData={[2.3, 2.7, 3.0, 3.3, 3.6, 3.7, 3.8, 3.9, 4.1, 4.2]}
              source="Bank of England / PRA — Dec 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Loans for debt consolidation"
              value="40%"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 38% in 2015 · cost-of-living crisis driving demand"
              sparklineData={[38, 37, 36, 35, 34, 34, 36, 37, 39, 40]}
              source="ABCUL member survey — 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Credit union membership, Great Britain, 2010–2024"
              subtitle="Total members in millions. Membership has more than doubled in 14 years but remains a fraction of the adult population compared to Ireland (75%) and the United States (37%)."
              series={series1}
              annotations={annotations1}
              yLabel="Members (millions)"
              source={{ name: 'Bank of England / ABCUL', dataset: 'Credit Union Quarterly Statistics', url: 'https://www.bankofengland.co.uk/prudential-regulation/credit-unions', frequency: 'quarterly', date: 'Dec 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Credit union assets and debt consolidation lending, 2010–2024"
              subtitle="Total assets (£bn) and share of loans for debt consolidation (%, scaled ÷2 for comparison). The cost-of-living crisis has pushed more members into consolidating high-cost debt through their credit union."
              series={series2}
              annotations={annotations2}
              yLabel="Assets (£bn) / Consolidation % (÷2)"
              source={{ name: 'Bank of England / ABCUL', dataset: 'Credit Union Annual Report; member survey', url: 'https://www.bankofengland.co.uk/prudential-regulation/publication/credit-union-annual-report', frequency: 'annual', date: 'Dec 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Payroll partnerships driving membership growth"
            value="+133%"
            unit="membership growth since 2010"
            description="Payroll deduction schemes — where employers deduct credit union savings and loan repayments directly from wages — have been the single most effective driver of membership growth. The NHS, several major local authorities, and a growing number of private employers now offer credit union access as a workplace benefit. These schemes reduce default rates to below 2%, making it viable for credit unions to lend to people who would otherwise turn to high-cost credit. The Fair4All Finance initiative has invested over £30 million since 2019 to help credit unions modernise their technology and reach underserved communities."
            source="Source: ABCUL Annual Statistics 2024. Fair4All Finance — Impact Report 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.bankofengland.co.uk/prudential-regulation/credit-unions" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Bank of England — Credit Union Quarterly Statistics</a> — regulatory returns covering membership and asset data. Retrieved Dec 2024.</p>
            <p><a href="https://www.abcul.org/media-and-research/facts-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ABCUL — Annual Statistics and Trends</a> — voluntary reporting from member credit unions, including loan purpose surveys. Retrieved Nov 2024.</p>
            <p><a href="https://www.woccu.org" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">World Council of Credit Unions — Statistical Report 2024</a> — international penetration rates using economically active population as denominator.</p>
            <p>All figures are for Great Britain (England, Scotland, Wales) unless otherwise stated. Northern Ireland credit unions (~27% penetration) report separately and are excluded. Pre-2012 data uses earlier reporting standards and may not be directly comparable.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
