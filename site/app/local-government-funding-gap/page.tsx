'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// ── References ───────────────────────────────────────────────────────────────

const editorialRefs: Reference[] = [
  { num: 1, name: 'NAO', dataset: 'Financial Sustainability of Local Authorities in England', url: 'https://www.nao.org.uk/reports/financial-sustainability-of-local-authorities-in-england/', date: '2025' },
  { num: 2, name: 'LGA', dataset: 'Local Government Funding Gap Analysis', url: 'https://www.local.gov.uk/', date: '2025' },
  { num: 3, name: 'IFS / DLUHC', dataset: 'Core Spending Power data tables', url: 'https://ifs.org.uk/publications/local-government-funding-and-service-data', date: '2024' },
  { num: 4, name: 'MHCLG', dataset: 'Section 114 notices and government intervention reports', url: 'https://www.gov.uk/government/collections/local-authority-capital-expenditure-receipts-and-financing', date: '2025' },
  { num: 5, name: 'DfE', dataset: 'SEND statistics — Education, Health and Care Plans', url: 'https://explore-education-statistics.service.gov.uk/', date: '2025' },
  { num: 6, name: 'CIPFA', dataset: 'Resilience Index — council reserves guidance', url: 'https://www.cipfa.org/', date: '2024' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface FundingGapPoint {
  year: number;
  gapBn: number;
  note?: string;
}

interface Section114Point {
  year: number;
  notices: number;
  councils: string[];
  note?: string;
}

interface SpendingByServicePoint {
  year: number;
  socialCare: number;
  housing: number;
  highways: number;
  culture: number;
  planning: number;
  waste: number;
}

interface CoreSpendingPowerPoint {
  year: number;
  realTermsBn: number;
}

interface FundingGapData {
  fundingGap: FundingGapPoint[];
  section114Notices: Section114Point[];
  spendingByService: SpendingByServicePoint[];
  coreSpendingPower: CoreSpendingPowerPoint[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LocalGovernmentFundingGapPage() {
  const [data, setData] = useState<FundingGapData | null>(null);

  useEffect(() => {
    fetch('/data/local-government-funding-gap/local_government_funding_gap.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const fundingGapSeries: Series[] = data
    ? [{
        id: 'funding-gap',
        label: 'Predicted funding gap (£bn)',
        colour: '#E63946',
        data: data.fundingGap.map(d => ({
          date: yearToDate(d.year),
          value: d.gapBn,
        })),
      }]
    : [];

  const section114Series: Series[] = data
    ? [{
        id: 'section-114',
        label: 'Section 114 notices issued',
        colour: '#E63946',
        data: data.section114Notices.map(d => ({
          date: yearToDate(d.year),
          value: d.notices,
        })),
      }]
    : [];

  const spendingSeries: Series[] = data
    ? [
        {
          id: 'social-care',
          label: 'Adult & children social care',
          colour: '#E63946',
          data: data.spendingByService.map(d => ({
            date: yearToDate(d.year),
            value: d.socialCare,
          })),
        },
        {
          id: 'highways',
          label: 'Highways & transport',
          colour: '#6B7280',
          data: data.spendingByService.map(d => ({
            date: yearToDate(d.year),
            value: d.highways,
          })),
        },
        {
          id: 'housing',
          label: 'Housing services',
          colour: '#F4A261',
          data: data.spendingByService.map(d => ({
            date: yearToDate(d.year),
            value: d.housing,
          })),
        },
        {
          id: 'culture',
          label: 'Culture & leisure',
          colour: '#2A9D8F',
          data: data.spendingByService.map(d => ({
            date: yearToDate(d.year),
            value: d.culture,
          })),
        },
      ]
    : [];

  const latestGap = data?.fundingGap.find(d => d.year === 2025);
  const latestSection114 = data?.section114Notices[data.section114Notices.length - 1];
  const coreSpending2010 = data?.coreSpendingPower.find(d => d.year === 2010);
  const coreSpending2024 = data?.coreSpendingPower.find(d => d.year === 2024);
  const coreSpendingCutPct = coreSpending2010 && coreSpending2024
    ? Math.round(((coreSpending2010.realTermsBn - coreSpending2024.realTermsBn) / coreSpending2010.realTermsBn) * 100)
    : 27;

  return (
    <>
      <TopicNav topic="Society & Democracy" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society & Democracy"
          question="Can councils afford to keep services running?"
          finding="England's councils face a predicted funding gap of £4.1 billion. Seven have effectively declared bankruptcy since 2018. Core spending power has been cut by 27% in real terms since 2010, while demand for adult social care, children's services, and SEND transport has surged beyond anything the remaining budgets can absorb."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              In September 2023 Birmingham City Council — Europe's largest local authority, serving 1.1 million people — issued a Section 114 notice, the legal declaration that it could no longer balance its books.<Cite nums={4} /> It was not alone. Croydon had already issued two such notices. Thurrock had lost over £500 million in a catastrophic solar farm investment scheme. Woking had accumulated £1.8 billion in debt through commercial property speculation. Slough and Nottingham followed.<Cite nums={4} /> These were not reckless outliers — they were canaries. The National Audit Office found that one in five councils in England now show signs of financial stress, and the Local Government Association estimates the sector faces a funding gap of £4.1 billion for 2025/26 alone.<Cite nums={[1, 2]} />
            </p>
            <p>
              The arithmetic is straightforward and unforgiving. Between 2010 and 2020, central government funding to councils was cut by approximately 50% in real terms under austerity.<Cite nums={3} /> Councils were told to raise more through council tax and business rates, but these are slow-growing revenue streams that cannot keep pace with rocketing demand. Adult social care now consumes over 40% of the average upper-tier council's budget — up from around 35% a decade ago. Children's social care costs have risen 25% since 2018, driven by a surge in referrals and the spiralling cost of children's home placements, many now run by private equity-backed providers charging over £5,000 per child per week. SEND (Special Educational Needs and Disabilities) transport costs have doubled in many areas as the number of children with Education, Health and Care Plans has increased by 60% since 2015, with councils legally obligated to fund placements regardless of whether the money exists.<Cite nums={5} />
            </p>
            <p>
              The result is a hollowing out of everything that is not a statutory obligation. Libraries have closed. Parks are unmaintained. Potholes go unrepaired. Planning departments are skeletal. Leisure centres have been handed to trusts or shut entirely. Council reserves — the rainy-day funds that once provided a buffer — have been run down across the sector, with some councils operating with less than 5% of their annual revenue in reserve, well below the level the Chartered Institute of Public Finance and Accountancy considers prudent.<Cite nums={6} /> Council tax, meanwhile, has risen by over 30% since 2015 in many areas, with councils forced to levy the maximum increases allowed under referendum caps simply to stand still. The system has reached a point where even well-managed councils cannot deliver the services residents expect — not because of poor decisions, but because the funding model is structurally broken.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-funding-gap', label: 'Funding gap' },
          { id: 'sec-section-114', label: 'Section 114 notices' },
          { id: 'sec-spending', label: 'Spending by service' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Predicted funding gap"
            value={latestGap ? `£${latestGap.gapBn}bn` : '£4.1bn'}
            unit="2025/26"
            direction="up"
            polarity="up-is-bad"
            changeText="Up from £0.5bn in 2015 · growing £400m+ per year · LGA central estimate"
            sparklineData={
              data ? sparkFrom(data.fundingGap.map(d => d.gapBn)) : []
            }
            source="LGA · Local Government Funding Gap Analysis, 2025"
            href="#sec-funding-gap"
          />
          <MetricCard
            label="Section 114 notices issued"
            value="7"
            unit="since 2018"
            direction="up"
            polarity="up-is-bad"
            changeText="Birmingham, Croydon, Thurrock, Slough, Woking, Nottingham · 1 in 5 councils showing financial stress"
            sparklineData={
              data ? data.section114Notices.map(d => d.notices) : []
            }
            source="NAO · Financial Sustainability of Local Authorities, 2025"
            href="#sec-section-114"
          />
          <MetricCard
            label="Core spending power (real terms)"
            value={`-${coreSpendingCutPct}%`}
            unit="since 2010"
            direction="down"
            polarity="down-is-bad"
            changeText={
              coreSpending2010 && coreSpending2024
                ? `£${coreSpending2010.realTermsBn}bn to £${coreSpending2024.realTermsBn}bn in 2024 prices · demand up 40%+ for social care`
                : '£49.1bn to £35.8bn in 2024 prices · demand up 40%+ for social care'
            }
            sparklineData={
              data ? sparkFrom(data.coreSpendingPower.map(d => d.realTermsBn)) : []
            }
            source="IFS / DLUHC · Core Spending Power data tables, 2024"
            href="#sec-spending"
          />
        </div>

        {/* Chart 1: Funding gap projection */}
        <ScrollReveal>
          <div id="sec-funding-gap" className="mb-12">
            <LineChart
              series={fundingGapSeries}
              title="Local government funding gap, England, 2015–2028"
              subtitle="Projected gap between council funding and spending pressures (£bn). Dashed line indicates projections from 2026."
              yLabel="£ billion"
              source={{
                name: 'Local Government Association',
                dataset: 'Funding Gap Analysis',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Section 114 notices */}
        <ScrollReveal>
          <div id="sec-section-114" className="mb-12">
            <LineChart
              series={section114Series}
              title="Section 114 notices issued by councils, England, 2018–2026"
              subtitle="Formal declarations of inability to balance the budget. Each notice represents a council effectively declaring bankruptcy."
              yLabel="Notices"
              source={{
                name: 'National Audit Office',
                dataset: 'Financial Sustainability of Local Authorities',
                frequency: 'periodic',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Spending by service */}
        <ScrollReveal>
          <div id="sec-spending" className="mb-12">
            <LineChart
              series={spendingSeries}
              title="Council spending by service area, England, 2010–2024 (real terms, £bn)"
              subtitle="Social care dominates and grows while all other services have been cut. Culture, planning, and housing services halved or worse."
              yLabel="£ billion (2024 prices)"
              source={{
                name: 'DLUHC / IFS',
                dataset: 'Revenue Outturn data, adjusted to 2024 prices',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Devolution deals and multi-year settlements offer a path forward"
            value="12 devolution deals"
            description="The government has committed to multi-year funding settlements from 2026/27, ending the annual cycle that has made long-term financial planning impossible for councils. Twelve devolution deals are transferring powers and consolidated funding to combined authorities, enabling more strategic investment. The Extended Producer Responsibility scheme begins redirecting packaging waste costs from councils to manufacturers. Several councils that entered intervention — including Croydon and Thurrock — are now showing early signs of financial recovery under improvement plans. These structural reforms, if sustained, could begin to address the systemic mismatch between council responsibilities and the resources available to deliver them."
            source="Source: DLUHC — English Devolution Accountability Framework, 2025. LGA — Local Government Finance Settlement analysis, 2025/26."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <RelatedTopics />
      </main>
    </>
  );
}
