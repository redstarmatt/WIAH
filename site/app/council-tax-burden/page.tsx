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

// Average Band D council tax (£), England, 2010–2025
const bandDValues = [1439, 1439, 1444, 1456, 1468, 1484, 1530, 1591, 1671, 1750, 1818, 1898, 1966, 2065];

// Central government grant as % of council revenue, 2010–2025
const centralGrantValues = [57, 54, 51, 47, 43, 40, 37, 35, 33, 30, 28, 26, 24, 22];
const councilTaxShareValues = [43, 46, 49, 53, 57, 60, 63, 65, 67, 70, 72, 74, 76, 78];

const series1: Series[] = [
  {
    id: 'band-d',
    label: 'Average Band D council tax (£)',
    colour: '#F4A261',
    data: bandDValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'central-grant',
    label: 'Central government grant (%)',
    colour: '#264653',
    data: centralGrantValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'council-tax-share',
    label: 'Council tax share (%)',
    colour: '#E63946',
    data: councilTaxShareValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2013, 0, 1), label: '2013: Council tax benefit localised' },
  { date: new Date(2016, 0, 1), label: '2016: Adult social care precept introduced' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DLUHC', dataset: 'Council tax levels set by local authorities in England', url: 'https://www.gov.uk/government/collections/council-tax-statistics', date: '2025' },
  { num: 2, name: 'Institute for Fiscal Studies', dataset: 'Council tax: the case for reform', url: 'https://ifs.org.uk/publications/council-tax', date: '2023' },
  { num: 3, name: 'ONS', dataset: 'Household finances and council tax burden', url: 'https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes', date: '2024' },
];

export default function CouncilTaxBurdenPage() {
  return (
    <>
      <TopicNav topic="Council Tax Burden" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Council Tax Burden"
          question="Is Council Tax Actually Fair?"
          finding="Council tax is still based on 1991 property valuations — 34 years out of date. Band D now averages £2,065 in England, the tax is regressive by design, and councils have become increasingly dependent on it as central government grants have been cut by 40% since 2010."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Council tax remains one of the most regressive taxes in the UK. Households in Band A properties pay roughly a third of the tax levied on Band H, despite Band H properties being worth at least eight times as much.<Cite nums={2} /> The valuations underpinning the entire system date from April 1991 — before the World Wide Web was publicly available. A terraced house in Salford that was worth £40,000 in 1991 may now sell for £180,000, while a detached home in Surrey valued at £320,000 then could fetch £1.2 million, yet both remain in the same bands. The IFS has described the system as &ldquo;arbitrarily unfair&rdquo; and called for a revaluation linked to proportional values.<Cite nums={2} /> No government has attempted revaluation in England since the tax was introduced in 1993.</p>
            <p>The burden has intensified because councils now raise a far greater share of their own revenue. Central government grants to local authorities have fallen by approximately 40% in real terms since 2010, forcing councils to raise council tax by the maximum permitted each year.<Cite nums={1} /> The introduction of the adult social care precept in 2016 added further increases. In 2010, central grants funded 57% of council revenue; by 2025 that figure had fallen to around 22%, with council tax making up the difference.<Cite nums={3} /> For low-income households in high-band properties — particularly pensioners who bought decades ago — the disconnect between property wealth and disposable income creates genuine hardship. Council tax support schemes vary wildly between authorities, adding a postcode lottery to an already unfair system.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Band D trend' },
          { id: 'sec-chart2', label: 'Funding shift' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Average Band D council tax (England)"
              value="£2,065"
              unit="2024/25"
              direction="up"
              polarity="up-is-bad"
              changeText="up from £1,439 in 2010 · +43% in 14 years"
              sparklineData={bandDValues.slice(-8)}
              source="DLUHC — Council tax levels 2025"
              href="#sec-chart1"
            />
            <MetricCard
              label="Years since property revaluation"
              value="34"
              unit="years"
              direction="up"
              polarity="up-is-bad"
              changeText="valuations set April 1991 · never updated in England"
              sparklineData={[25, 26, 27, 28, 29, 30, 31, 32, 33, 34]}
              source="DLUHC — Council tax valuation bands"
              href="#sec-chart1"
            />
            <MetricCard
              label="Central grant funding cut since 2010"
              value="40%"
              unit="real terms"
              direction="up"
              polarity="up-is-bad"
              changeText="central grants now fund just 22% of council revenue"
              sparklineData={centralGrantValues.slice(-8)}
              source="IFS — Local government funding analysis 2023"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Average Band D council tax, England, 2010–2025"
              subtitle="Annual average Band D bill set by local authorities. Includes adult social care precept from 2016. Figures in cash terms."
              series={series1}
              annotations={annotations}
              yLabel="Council tax (£)"
              source={{ name: 'DLUHC', dataset: 'Council tax levels set by local authorities', url: 'https://www.gov.uk/government/collections/council-tax-statistics', frequency: 'annual', date: 'Mar 2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Council revenue: central grants vs council tax, 2010–2025"
              subtitle="Central government grants have fallen from 57% to 22% of council revenue, with council tax filling the gap."
              series={series2}
              annotations={[{ date: new Date(2016, 0, 1), label: '2016: Social care precept begins' }]}
              yLabel="Share of revenue (%)"
              source={{ name: 'IFS / DLUHC', dataset: 'Local government finance statistics', url: 'https://ifs.org.uk/publications/council-tax', frequency: 'annual', date: 'Nov 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Wales revalued in 2003 — and the sky didn't fall"
            value="2003"
            unit="last Welsh revaluation"
            description="Wales carried out a council tax revaluation in 2003, updating property bands to reflect 2003 values. While some households moved bands, the transition was managed with safeguards and the system continued to function. The Welsh Government announced a further revaluation for 2025 with more proportional bands. This demonstrates that revaluation is politically and administratively feasible — England simply hasn't tried."
            source="Source: Welsh Government — Council tax reform consultation 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/council-tax-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Council tax levels set by local authorities in England</a> — primary source for Band D averages. Covers all billing authorities in England.</p>
            <p><a href="https://ifs.org.uk/publications/council-tax" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Institute for Fiscal Studies — Council tax reform</a> — analysis of regressivity, revaluation options, and the funding shift from central to local government.</p>
            <p>All figures are for England unless otherwise stated. Band D is the reference band used for comparison; most households are in Bands A–C. Cash figures are not adjusted for inflation unless specified.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
