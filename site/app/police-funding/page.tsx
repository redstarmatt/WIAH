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

// Police officer numbers (thousands), England & Wales, 2010–2024 — Home Office
const officerValues = [143.8, 139.1, 134.1, 129.6, 127.9, 126.8, 124.0, 122.4, 123.2, 124.5, 129.6, 135.3, 142.8, 147.4, 149.6];

// Neighbourhood/community officers (thousands), 2010–2024 — estimated from HMICFRS
const neighbourhoodValues = [20.5, 18.8, 17.2, 15.8, 14.5, 13.0, 11.8, 10.5, 9.8, 9.2, 8.9, 8.5, 8.2, 7.9, 7.6];

// Police funding in real terms (£ billions, 2023 prices), 2010–2024
const fundingRealValues = [14.2, 13.8, 13.2, 12.6, 12.1, 11.9, 11.6, 11.3, 11.5, 11.8, 12.4, 13.1, 13.6, 13.8, 13.9];

// 999 call volume (millions), 2010–2024
const callVolumeValues = [8.2, 8.5, 8.9, 9.1, 9.3, 9.5, 10.1, 10.8, 11.4, 10.9, 12.1, 13.5, 14.8, 15.2, 15.6];

const series1: Series[] = [
  {
    id: 'total-officers',
    label: 'Total police officers (thousands)',
    colour: '#6B7280',
    data: officerValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'neighbourhood',
    label: 'Neighbourhood officers (thousands)',
    colour: '#E63946',
    data: neighbourhoodValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'real-funding',
    label: 'Total police funding (£bn, 2023 prices)',
    colour: '#264653',
    data: fundingRealValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'call-volume',
    label: '999 call volume (millions)',
    colour: '#E63946',
    data: callVolumeValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2010, 5, 1), label: '2010: Austerity cuts begin' },
  { date: new Date(2019, 8, 1), label: '2019: Police Uplift Programme launched' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Home Office', dataset: 'Police workforce, England and Wales', url: 'https://www.gov.uk/government/collections/police-workforce-england-and-wales', date: '2024' },
  { num: 2, name: 'HMICFRS', dataset: 'State of Policing: annual assessment', url: 'https://hmicfrs.justiceinspectorates.gov.uk/publications/', date: '2024' },
  { num: 3, name: 'Institute for Government', dataset: 'Police funding and spending analysis', url: 'https://www.instituteforgovernment.org.uk/explainer/police-funding-england-and-wales', date: '2024' },
];

export default function PoliceFundingPage() {
  return (
    <>
      <TopicNav topic="Police Funding" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Police Funding"
          question="Has Policing Actually Been Cut?"
          finding="Police officer numbers in England and Wales fell by 21,400 between 2010 and 2017. The Police Uplift Programme has restored headline numbers to 149,600 — but neighbourhood policing has been hollowed out, and 999 demand has nearly doubled."
          colour="#6B7280"
          preposition="with"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>When austerity began in 2010, there were 143,800 police officers in England and Wales. By March 2017, that number had fallen to 122,400 — the lowest level since comparable records began in the 1990s.<Cite nums={1} /> The Police Uplift Programme, launched in September 2019, pledged to recruit 20,000 additional officers by March 2023. The target was met, bringing the total to 149,600 by 2024.<Cite nums={1} /> But the headline figure conceals a fundamental shift in how policing operates. Neighbourhood policing teams — the officers who walk beats, attend community meetings, and build local intelligence — have been cut from 20,500 in 2010 to just 7,600 today, a 63% reduction that has not been reversed by the uplift.<Cite nums={2} /></p>
            <p>Meanwhile, demand has transformed. 999 call volumes have risen from 8.2 million in 2010 to 15.6 million in 2024 — a 90% increase driven by the growing role of police as first responders to mental health crises, missing persons, and domestic abuse.<Cite nums={1} /> In real terms, total police funding fell from £14.2 billion in 2010 to £11.3 billion in 2017 before partially recovering to £13.9 billion in 2024 — still 2% below its 2010 level in real terms.<Cite nums={3} /> HMICFRS has warned repeatedly that forces are stretched to breaking point, with investigation standards declining, charge rates falling, and experienced officers leaving for better-paid roles elsewhere. The uplift recruited officers at entry level; replacing the experience lost during the decade of cuts will take far longer than it took to lose it.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Officer numbers' },
          { id: 'sec-chart2', label: 'Funding vs demand' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Police officers (England & Wales)"
              value="149.6k"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="recovered from 122.4k low in 2017 · above 2010 level"
              sparklineData={officerValues.slice(-8)}
              source="Home Office — Police workforce statistics 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Neighbourhood officers"
              value="7,600"
              unit="2024"
              direction="down"
              polarity="up-is-good"
              changeText="down 63% from 20,500 in 2010 · not restored by uplift"
              sparklineData={neighbourhoodValues.slice(-8)}
              source="HMICFRS — Neighbourhood policing assessment 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="999 call volume"
              value="15.6M"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="up 90% since 2010 · mental health and DA driving growth"
              sparklineData={callVolumeValues.slice(-8)}
              source="Home Office — Police workforce statistics 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Police officer numbers, England & Wales, 2010–2024"
              subtitle="Total officers (grey) have recovered to above 2010 levels. Neighbourhood officers (red) have been cut by 63% and not replaced."
              series={series1}
              annotations={annotations}
              yLabel="Officers (thousands)"
              source={{ name: 'Home Office', dataset: 'Police workforce, England and Wales', url: 'https://www.gov.uk/government/collections/police-workforce-england-and-wales', frequency: 'annual', date: 'Jul 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Police funding (real terms) vs 999 demand, 2010–2024"
              subtitle="Funding (blue) has partially recovered but remains below 2010 in real terms. 999 call volume (red) has nearly doubled."
              series={series2}
              annotations={[{ date: new Date(2017, 0, 1), label: '2017: Funding trough' }]}
              yLabel="£bn / Calls (millions)"
              source={{ name: 'Institute for Government / Home Office', dataset: 'Police funding analysis and call volume data', url: 'https://www.instituteforgovernment.org.uk/explainer/police-funding-england-and-wales', frequency: 'annual', date: 'Sep 2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Police Uplift Programme: 20,000 officers recruited on schedule"
            value="20,951"
            unit="additional officers recruited"
            description="The Police Uplift Programme, launched in September 2019, met its target of recruiting 20,000 additional officers by March 2023 — ultimately delivering 20,951. This brought total officer numbers in England and Wales to their highest level since 2003. While the programme has been criticised for replacing experienced officers with new recruits who require years to reach full effectiveness, it represents the largest single investment in police capacity in a generation. Forces have also increased diversity: 17.3% of new recruits were from ethnic minority backgrounds, compared with 8.1% of the existing workforce."
            source="Source: Home Office — Police Uplift Programme final report 2023. College of Policing diversity data."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/police-workforce-england-and-wales" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Home Office — Police workforce, England and Wales</a> — primary source for officer headcount by rank and function. Published annually with biannual updates.</p>
            <p><a href="https://hmicfrs.justiceinspectorates.gov.uk/publications/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">HMICFRS — State of Policing</a> — annual assessment of police effectiveness, efficiency and legitimacy. Source for neighbourhood policing analysis.</p>
            <p>All figures are for the 43 territorial police forces in England and Wales. Funding data is adjusted to 2023 prices using the GDP deflator. Neighbourhood officer estimates prior to 2018 are based on HMICFRS force-level assessments and are approximate. 999 call volumes include all emergency calls received, not calls answered.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
