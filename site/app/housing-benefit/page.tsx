'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';
import RelatedTopics from '@/components/RelatedTopics';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Shelter / Resolution Foundation', dataset: 'LHA Affordability Analysis', date: '2024', note: 'Only 5% of privately rented homes affordable at LHA rates' },
  { num: 2, name: 'Valuation Office Agency', dataset: 'Local Housing Allowance Rates', url: 'https://www.gov.uk/guidance/local-housing-allowance', date: '2024', note: 'LHA reduced to 30th percentile in 2011; frozen 2016-2020 and 2020-2024' },
  { num: 3, name: 'DWP', dataset: 'Housing Benefit and UC Housing Cost Statistics', url: 'https://www.gov.uk/government/collections/dwp-statistics-publications', date: '2024', note: '1.8 million households facing LHA shortfall; average gap £345/month' },
  { num: 4, name: 'DLUHC', dataset: 'Statutory Homelessness Statistics', date: '2024', note: 'Section 21 evictions: 24% of homelessness applications; £25,000/yr temporary accommodation cost' },
];

export default function HousingBenefitPage() {
  const colour = '#F4A261';

  // LHA rates vs median private rents 2010–2024 (£/month, indexed to 100 in 2010)
  const lhaIndexData   = [100, 105, 110, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 125, 130];
  const rentIndexData  = [100, 103, 107, 111, 116, 122, 128, 133, 140, 148, 156, 163, 170, 180, 190];

  const lhaAnnotations: Annotation[] = [
    { date: new Date(2012, 0, 1), label: '2012: LHA capped at CPI, then frozen' },
    { date: new Date(2020, 0, 1), label: '2020: Unfrozen to 30th percentile' },
    { date: new Date(2024, 0, 1), label: '2024: Uprated to 30th percentile again' },
  ];

  const lhaSeries: Series[] = [
    {
      id: 'lha',
      label: 'LHA rates (indexed, 2010=100)',
      colour: '#264653',
      data: lhaIndexData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'rent',
      label: 'Median private rents (indexed, 2010=100)',
      colour: colour,
      data: rentIndexData.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  // Households facing LHA shortfall 2015–2024 (millions)
  const shortfallData = [0.6, 0.7, 0.8, 1.0, 1.2, 1.3, 1.4, 1.5, 1.6, 1.8];
  const shortfallAnnotations: Annotation[] = [
    { date: new Date(2016, 0, 1), label: '2016: LHA frozen for 4 years' },
    { date: new Date(2020, 0, 1), label: '2020: LHA uprated' },
  ];

  const shortfallSeries: Series[] = [
    {
      id: 'shortfall',
      label: 'Households facing LHA shortfall (millions)',
      colour: colour,
      data: shortfallData.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  return (
    <>
      <TopicNav topic="Housing Benefit" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Housing Benefit"
          question="Why Isn't Housing Benefit Covering Rents?"
          finding="Local Housing Allowance hasn't kept pace with rents — only 5% of privately rented homes are affordable at LHA rates in most areas — pushing low-income renters into homelessness."
          colour={colour}
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-gap', label: 'LHA vs Rents' },
          { id: 'sec-shortfall', label: 'Households in Shortfall' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Homes affordable at LHA (%)"
              value="5"
              direction="down"
              polarity="down-is-bad"
              changeText="2024 · down from 30% in 2010 · LHA designed to cover 30th percentile rent"
              sparklineData={[30, 28, 25, 22, 18, 15, 12, 9, 7, 5]}
              source="Shelter / Resolution Foundation — LHA affordability analysis, 2024"
            />
            <MetricCard
              label="LHA shortfall vs median rent (£/month)"
              value="345"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · average gap across England · some London areas exceed £800/month"
              sparklineData={[45, 65, 95, 125, 155, 185, 215, 255, 300, 345]}
              source="Shelter — LHA tracker, 2024"
            />
            <MetricCard
              label="Households in LHA shortfall (millions)"
              value="1.8"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 · private renters receiving housing support · must make up the gap from other income"
              sparklineData={[0.6, 0.7, 0.8, 1.0, 1.2, 1.3, 1.4, 1.5, 1.6, 1.8]}
              source="DWP — Housing Benefit and UC housing cost statistics, 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-gap" className="mb-12">
            <LineChart
              title="LHA rates vs median private rents, England, 2010–2024 (indexed, 2010=100)"
              subtitle="Both series indexed to 100 in 2010. LHA was frozen from 2016 to 2020 and again from 2020 to 2024, while rents rose continuously. LHA is meant to cover the 30th percentile of local rents."
              series={lhaSeries}
              annotations={lhaAnnotations}
              yLabel="Index (2010=100)"
              source={{
                name: 'Valuation Office Agency / ONS',
                dataset: 'LHA rates; Private rental market statistics',
                frequency: 'annual',
                url: 'https://www.gov.uk/guidance/local-housing-allowance',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-shortfall" className="mb-12">
            <LineChart
              title="Households facing LHA shortfall, England, 2015–2024 (millions)"
              subtitle="Number of private-renting households receiving housing support whose LHA award falls below the actual rent, requiring them to make up the difference from other income."
              series={shortfallSeries}
              annotations={shortfallAnnotations}
              yLabel="Households (millions)"
              source={{
                name: 'DWP',
                dataset: 'Housing Benefit and Universal Credit housing cost statistics',
                frequency: 'quarterly',
                url: 'https://www.gov.uk/government/collections/dwp-statistics-publications',
                date: 'Jan 2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="2024 uprating"
            value="30th percentile"
            unit="LHA restored to cover 30th percentile of local rents in April 2024 — the first uprating since 2020"
            description="In April 2024, the government uprated LHA to cover the 30th percentile of local rents — restoring the original policy intent after four years of effective freeze. This cost £1.3 billion annually and benefits an estimated 1.6 million households. However, the uprating is a one-off to the 2023/24 rent level; if it is not maintained in future years, the gap will re-emerge as rents continue to rise. Shelter and the National Housing Federation have called for LHA to be uprated annually in line with rents, rather than subject to discretionary government decisions. The Renters (Reform) Bill also strengthens security of tenure, reducing forced evictions that can push LHA claimants into homelessness."
            source="Source: DWP — LHA uprating announcement, Autumn Statement 2023; Shelter — LHA gap analysis 2024."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12 mt-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">What the data shows</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Local Housing Allowance is the mechanism through which the state helps low-income private renters pay their rent. It was originally set at the median rent in each Broad Rental Market Area — covering 50% of available properties — and then reduced to the 30th percentile in 2011. It was then frozen in cash terms from 2016 to 2020, and again from 2020 to 2024, while private rents rose continuously. The consequence is that LHA now covers fewer than 5% of privately rented homes in most areas of England, compared to the 30% it was designed to cover.<Cite nums={[1,2]} /></p>
              <p>The practical effect on 1.8 million renting households is a monthly gap between what LHA pays and what their landlord charges. In 2024, the average shortfall across England was £345 per month — in London, it frequently exceeds £800 per month.<Cite nums={3} /> This gap must be made up from other income, including earnings, other benefits, or savings. For households already at subsistence level — many of them single parents, disabled people, or those with mental health conditions — there is nothing to make it up from. The result is rent arrears, eviction, and homelessness.</p>
              <p>The homelessness link is direct and measurable. Section 21 (no-fault) evictions from private rented accommodation are the single largest cause of statutory homelessness applications in England, accounting for around 24% of applications in 2023/24.<Cite nums={4} /> A significant proportion of these involve households in receipt of housing benefit whose landlord has decided the LHA shortfall makes tenancy commercially unworkable. Local authorities are legally required to house these households — at an average cost of £25,000 per year for temporary accommodation<Cite nums={4} /> — creating a perverse situation in which freezing LHA saves central government money while costing local government far more.</p>
            </div>
          </section>
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/guidance/local-housing-allowance" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Valuation Office Agency — LHA rates</a> — annual.</p>
            <p><a href="https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/indexofprivatehousingrentalprices" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Index of Private Housing Rental Prices</a> — monthly.</p>
            <p><a href="https://www.gov.uk/government/collections/dwp-statistics-publications" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">DWP — Housing Benefit and UC housing cost statistics</a> — quarterly.</p>
            <p>Affordability figures (% of homes affordable at LHA) from Shelter and Resolution Foundation analysis of Valuation Office Agency private rental data. All figures are for England unless otherwise stated.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
