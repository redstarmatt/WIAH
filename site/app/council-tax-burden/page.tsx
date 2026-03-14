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

// Central government grant as % of council funding, 2010–2025
const centralGrantPct = [57, 54, 51, 47, 43, 40, 37, 34, 31, 28, 26, 24, 22, 20];
const councilTaxPct = [43, 46, 49, 53, 57, 60, 63, 66, 69, 72, 74, 76, 78, 80];

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
    data: centralGrantPct.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'council-tax-share',
    label: 'Council tax share (%)',
    colour: '#E63946',
    data: councilTaxPct.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2012, 0, 1), label: '2012: Council tax freeze grants introduced' },
  { date: new Date(2016, 0, 1), label: '2016: Adult social care precept added' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'DLUHC', dataset: 'Council tax levels set by local authorities in England', url: 'https://www.gov.uk/government/collections/council-tax-statistics', date: '2025' },
  { num: 2, name: 'Institute for Fiscal Studies', dataset: 'Council tax reform analysis', url: 'https://ifs.org.uk/publications/council-tax', date: '2024' },
  { num: 3, name: 'ONS', dataset: 'Household finances and council tax burden', url: 'https://www.ons.gov.uk/', date: '2024' },
];

export default function CouncilTaxBurdenPage() {
  return (
    <>
      <TopicNav topic="Council Tax Burden" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Council Tax Burden"
          question="Is Council Tax Actually Fair?"
          finding="Council tax is based on 1991 property valuations — 34 years out of date. It is regressive: the lowest bands pay proportionally more of their property value. The average Band D bill is now £2,065, and councils are increasingly dependent on it as central government grants have been cut by 60% since 2010."
          colour="#F4A261"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Council tax was introduced in 1993 as a replacement for the poll tax, based on property valuations carried out in April 1991. Those valuations have never been updated, meaning every household in England pays a tax based on what their home was worth 34 years ago.<Cite nums={1} /> The consequences are stark: a property in Kensington worth £5 million pays Band H council tax of roughly £3,000, while a terraced house in Burnley worth £80,000 in Band A pays around £1,200. Proportionally, the Burnley household pays more than ten times the effective rate.<Cite nums={2} /> The IFS has described council tax as &quot;the most regressive major tax in the UK system&quot;, with the poorest 10% of households paying 8% of their income in council tax compared with 1.5% for the richest.<Cite nums={2} /></p>
            <p>The fiscal pressure on local authorities has intensified dramatically since 2010. Central government grants to English councils were cut by approximately 60% in real terms between 2010 and 2020, forcing councils to rely ever more heavily on council tax revenue.<Cite nums={1} /> By 2025, council tax and business rates account for roughly 80% of local authority core spending power, up from 43% in 2010. Successive governments have permitted annual increases of up to 5% (including the adult social care precept) without a referendum, but this still falls short of rising demand for services — particularly adult social care, children&apos;s services, and temporary accommodation for homeless households.<Cite nums={3} /> Every major review — the Lyons Inquiry in 2007, the IFS report in 2020 — has recommended reform. None has been implemented.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Band D trend' },
          { id: 'sec-chart2', label: 'Funding split' },
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
              changeText="up from £1,439 in 2010 · +43% in 15 years"
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
              changeText="valuations from April 1991 · never updated"
              sparklineData={[25, 26, 27, 28, 29, 30, 31, 32, 33, 34]}
              source="DLUHC — Council tax banding"
              href="#sec-chart1"
            />
            <MetricCard
              label="Central grant funding cut since 2010"
              value="~60%"
              unit="real terms"
              direction="up"
              polarity="up-is-bad"
              changeText="councils now rely on council tax for 80% of funding"
              sparklineData={centralGrantPct.slice(-8)}
              source="IFS — Local government funding analysis 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Average Band D council tax, England, 2010–2025"
              subtitle="Annual average Band D council tax set by local authorities. Includes adult social care precept from 2016."
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
              title="Central government grant vs council tax share of local funding, 2010–2025"
              subtitle="Central grants (blue) have fallen from 57% to 20% of council core spending power, while the council tax share (red) has risen from 43% to 80%."
              series={series2}
              annotations={[]}
              yLabel="Share of funding (%)"
              source={{ name: 'DLUHC / IFS', dataset: 'Local authority core spending power analysis', url: 'https://ifs.org.uk/publications/council-tax', frequency: 'annual', date: 'Jan 2025' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Wales revalued in 2003 — and the sky did not fall"
            value="2003"
            unit="last Welsh revaluation"
            description="Wales conducted a council tax revaluation in 2003, creating a new Band I and adjusting bands to reflect actual property values. While some households saw their bills change, the process was orderly and the Welsh Government is now consulting on a further revaluation for 2028. This demonstrates that revaluation is politically and practically achievable — England simply has not done it."
            source="Source: Welsh Government — Council tax revaluation consultation 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/council-tax-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DLUHC — Council tax levels set by local authorities in England</a> — annual publication of Band D equivalents and council tax requirement for all billing authorities.</p>
            <p><a href="https://ifs.org.uk/publications/council-tax" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Institute for Fiscal Studies — Council tax analysis</a> — detailed modelling of regressivity and reform options, including distributional impact of revaluation.</p>
            <p><a href="https://www.ons.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Household finances data</a> — council tax as proportion of household income by decile.</p>
            <p>All figures are for England unless otherwise stated. Band D is the reference band used for comparisons; actual bills vary by band and local authority area. Real-terms cuts calculated using GDP deflator.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
