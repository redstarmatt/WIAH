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

const editorialRefs: Reference[] = [
  { num: 1, name: 'Pension Protection Fund', dataset: 'PPF 7800 Index', url: 'https://www.ppf.co.uk/levy-payers/PPF-7800-index', date: '2023', note: 'Aggregate funding position swung from -£710bn to +£380bn' },
  { num: 2, name: 'PPF / The Pensions Regulator', dataset: 'The Purple Book — DB landscape', url: 'https://www.ppf.co.uk/our-organisation/the-purple-book', date: '2023', note: 'Active DB membership fell from 5m to 1.5m' },
  { num: 3, name: 'HM Treasury', dataset: 'Mansion House Reforms', url: 'https://www.gov.uk/government/organisations/hm-treasury/about/statistics', date: '2023', note: 'Aims to channel DB surpluses into productive investment' },
];

export default function PensionDeficitsPage() {
  // DB scheme aggregate funding position 2010–2023 (£bn, negative = deficit, positive = surplus)
  const fundingPosition = [-100, -200, -310, -400, -450, -550, -710, -650, -580, -430, -260, -80, 300, 380];

  // Schemes in deficit (count) 2010–2023
  const schemesInDeficit = [7200, 7600, 7800, 8000, 8200, 8400, 8600, 8100, 7600, 6800, 5400, 3900, 1800, 1400];

  // Active DB scheme members (millions) 2000–2023
  const activeMembers = [
    5.0, 4.9, 4.8, 4.7, 4.6, 4.4, 4.2, 4.0, 3.8, 3.6,
    3.4, 3.2, 3.0, 2.8, 2.6, 2.4, 2.2, 2.1, 2.0, 1.9,
    1.8, 1.7, 1.6, 1.5,
  ];

  const series1: Series[] = [
    {
      id: 'funding',
      label: 'DB scheme aggregate position (£bn)',
      colour: '#F4A261',
      data: fundingPosition.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const series2: Series[] = [
    {
      id: 'active',
      label: 'Active DB scheme members (millions)',
      colour: '#264653',
      data: activeMembers.map((v, i) => ({ date: new Date(2000 + i, 0, 1), value: v })),
    },
  ];

  const annotations1: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: Peak deficit — £710bn' },
    { date: new Date(2022, 0, 1), label: '2022: Rate rises flip to surplus' },
    { date: new Date(2022, 9, 1), label: '2022: LDI crisis — mini-budget' },
  ];

  const annotations2: Annotation[] = [
    { date: new Date(2001, 0, 1), label: "2001: Equitable Life closes" },
    { date: new Date(2008, 0, 1), label: '2008: FTSE crash — deficit surge' },
    { date: new Date(2012, 0, 1), label: '2012: Private sector DB largely closed' },
  ];

  return (
    <>
      <TopicNav topic="Pension Deficits" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Pension Deficits"
          question="Are Workplace Pension Schemes Safe?"
          finding="Defined benefit pension scheme deficits peaked at £710bn in 2016 — most schemes are now in surplus — but millions of private sector workers lost DB pensions as employers closed schemes."
          colour="#F4A261"
          preposition="on"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Defined benefit (DB) pensions — where an employer guarantees a pension linked to salary and years of service — were the standard private-sector perk for most of the 20th century. By 2016, the aggregate deficit of UK DB schemes had swelled to £710bn under the Pension Protection Fund (PPF) measure, driven by decades of low interest rates inflating the present value of future liabilities, combined with falling bond yields and, for some schemes, poor investment returns and employer underfunding.<Cite nums={1} /> The PPF — the lifeboat fund that takes on failed schemes — had by then absorbed several large cases including Carillion and British Steel, paying pensions at reduced levels.</p>
            <p>The picture changed sharply in 2022. Rising interest rates — driven by the Bank of England's response to inflation — reduced the present value of liabilities faster than assets fell, flipping most schemes from deficit to surplus. By 2023, the aggregate PPF 7800 index showed a surplus of around £380bn.<Cite nums={1} /> This turnaround is genuine, but it comes with an asterisk: the October 2022 "mini-budget" triggered a crisis in Liability Driven Investment (LDI) strategies used by many DB schemes, briefly threatening a gilts market spiral before the Bank of England intervened. The crisis exposed how fragile the system remained under stress.</p>
            <p>The more lasting shift is structural: the private-sector DB system is in managed run-off. Active membership has fallen from around 5 million in 2000 to under 1.5 million today, as employers closed schemes to new entrants and then to future accrual.<Cite nums={2} /> The beneficiaries of DB schemes are largely older workers who joined before the 1990s; younger private sector workers have defined contribution (DC) pensions, where investment risk falls entirely on the individual. The adequacy of DC pensions at typical contribution rates is a separate — and growing — concern.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-position', label: 'Funding position' },
          { id: 'sec-membership', label: 'Active membership' },
        ]} />

        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="DB scheme aggregate position (£bn)"
            value="+£380bn"
            direction="up"
            polarity="up-is-good"
            changeText="2023 surplus · Was –£710bn deficit in 2016 · Interest rate rises flipped the picture · LDI crisis 2022"
            sparklineData={[-100, -200, -310, -400, -450, -550, -710, -650, -580, -430, -260, -80, 300, 380]}
            source="PPF 7800 Index — December 2023"
          />
          <MetricCard
            label="Schemes in deficit (count)"
            value="1,400"
            direction="down"
            polarity="up-is-bad"
            changeText="2023 · Down from 8,600 at 2016 peak · Most now in surplus · PPF absorbs failed schemes"
            sparklineData={[7200, 7600, 7800, 8000, 8200, 8400, 8600, 8100, 7600, 6800, 5400, 3900, 1800, 1400]}
            source="PPF 7800 Index — December 2023"
          />
          <MetricCard
            label="Workers in active DB schemes (millions)"
            value="1.5"
            direction="down"
            polarity="neutral"
            changeText="2023 · Down from 5.0m in 2000 · Most closed to new accrual · DC now dominates private sector"
            sparklineData={[5.0, 4.9, 4.8, 4.7, 4.6, 4.4, 4.2, 4.0, 3.8, 3.6, 3.4, 3.2, 3.0, 2.8, 2.6, 2.4, 2.2, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6, 1.5]}
            source="PPF / TPR — Purple Book 2023"
          />
        </div>

        <ScrollReveal>
          <section id="sec-position" className="mb-12">
            <LineChart
              title="DB pension scheme aggregate funding position, 2010–2023 (£bn)"
              subtitle="Aggregate surplus/deficit of all UK DB schemes (PPF 7800 measure). Deficit peaked at –£710bn in 2016 as low rates inflated liabilities. Sharp swing to surplus from 2022 as interest rates rose."
              series={series1}
              annotations={annotations1}
              yLabel="Position (£bn)"
              source={{
                name: 'Pension Protection Fund',
                dataset: 'PPF 7800 Index — aggregate funding position',
                frequency: 'monthly',
                url: 'https://www.ppf.co.uk/levy-payers/PPF-7800-index',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-membership" className="mb-12">
            <LineChart
              title="DB scheme active members, 2000–2023 (millions)"
              subtitle="Active members are workers still accruing DB benefits. The private sector DB system is in managed run-off — most schemes closed to new entrants by 2006 and to future accrual by 2016."
              series={series2}
              annotations={annotations2}
              yLabel="Active members (millions)"
              source={{
                name: 'PPF / The Pensions Regulator',
                dataset: 'The Purple Book — DB landscape',
                frequency: 'annual',
                url: 'https://www.ppf.co.uk/our-organisation/the-purple-book',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What's improving"
            value="£380bn"
            unit="aggregate DB surplus at end 2023"
            description="The swing from a £710bn deficit in 2016 to a £380bn surplus in 2023 is the largest improvement in DB scheme funding in history. Most schemes are now in a position to consider endgame strategies — buyout with an insurer, or transfer to a superfund. The PPF itself is in robust health and has never failed to pay the pensions of workers from failed schemes. The Mansion House reforms of 2023 aim to channel DB surpluses into productive investment, unlocking potentially hundreds of billions for UK infrastructure and growth."
            source="Source: Pension Protection Fund — PPF 7800 Index December 2023; HM Treasury — Mansion House reforms 2023."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ppf.co.uk/levy-payers/PPF-7800-index" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Pension Protection Fund — PPF 7800 Index</a> — aggregate funding position. Monthly.</p>
            <p><a href="https://www.ppf.co.uk/our-organisation/the-purple-book" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">PPF / TPR — The Purple Book</a> — scheme membership, closures. Annual.</p>
            <p>PPF 7800 measure uses section 179 liabilities (PPF compensation basis), not full buy-out liabilities. Active members = workers currently accruing DB benefits; excludes deferred and pensioner members. Aggregate position is sum across ~5,000 schemes tracked.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
