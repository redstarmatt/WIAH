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

// Drug poisoning deaths, England & Wales, 2012–2022 — ONS
const poisoningValues = [2652, 2732, 2952, 3346, 3744, 3756, 4359, 4393, 4561, 4859, 4907];

// Scotland drug death rate per 100k, 2013–2022 — NRS
const scotlandRateValues = [6.8, 9.2, 12.3, 15.8, 17.5, 20.1, 21.3, 22.1, 22.4, 22.4];

const poisoningSeries: Series[] = [
  {
    id: 'deaths',
    label: 'Drug poisoning deaths (England & Wales)',
    colour: '#E63946',
    data: poisoningValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const scotlandSeries: Series[] = [
  {
    id: 'scotland-rate',
    label: 'Deaths per 100,000 (Scotland)',
    colour: '#E63946',
    data: scotlandRateValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
];

const poisoningAnnotations: Annotation[] = [
  { date: new Date(2016, 0, 1), label: '2016: First record broken' },
  { date: new Date(2020, 0, 1), label: '2020: COVID lockdown surge' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Deaths related to drug poisoning in England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoningenglandandwales/latest', date: '2022' },
  { num: 2, name: 'National Records of Scotland', dataset: 'Drug-related deaths in Scotland', url: 'https://www.nrscotland.gov.uk/statistics-and-data/statistics/statistics-by-theme/vital-events/deaths/drug-related-deaths-in-scotland', date: '2022' },
  { num: 3, name: 'OHID / NDTMS', dataset: 'Adult substance misuse treatment statistics', url: 'https://www.ndtms.net/', date: '2022/23' },
];

export default function DrugDeathsPage() {
  return (
    <>
      <TopicNav topic="Health" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Why Is Britain's Drug Death Toll Rising?"
          finding="Drug poisoning deaths in England and Wales reached 4,907 in 2022 — a record. Scotland's rate is the highest in Europe at 22.4 deaths per 100,000. Drug treatment funding was cut 30% in real terms between 2013 and 2020."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Drug poisoning deaths in England and Wales rose from 2,652 in 2012 to a record 4,907 in 2022, climbing in nearly every intervening year.<Cite nums={1} /> Opioids account for 48% of fatalities; cocaine for 18%; benzodiazepines — increasingly mixed into street heroin — for 12%.<Cite nums={1} /> These are not deaths concentrated among young recreational users: the typical profile is a man in his 40s or 50s with a long history of opioid dependency, tracking back to the heroin epidemic that flooded post-industrial towns in the 1980s and 1990s. Scotland&apos;s rate of 22.4 deaths per 100,000 is the highest in Europe — three times England&apos;s — driven by concentrated poverty in post-industrial cities like Glasgow and Dundee.<Cite nums={2} /> From 2023, nitazenes and other synthetic opioids were detected in the UK supply with increasing frequency, raising the risk of mass casualty events seen in North America.</p>
            <p>Drug treatment funding fell by around 35% in real terms from 2013 to 2020, hollowing out the infrastructure needed to reach people at highest risk. The 2021 Ten-Year Drugs Plan committed £780 million over three years to rebuilding the treatment system. By 2022/23, 275,896 adults were in structured treatment, with 45% completing free from dependence.<Cite nums={3} /> Community naloxone distribution reached 110,000 doses in 2022; in high-coverage areas it has been shown to reduce overdose deaths by 30%.<Cite nums={3} /> The fundamental challenge remains: demand for treatment outstrips supply in many areas, and the cohort of long-term opioid users is ageing with compounding health needs.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Deaths trend' },
          { id: 'sec-chart2', label: 'Scotland rate' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Drug poisoning deaths (England & Wales)"
              value="4,907"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2022 · Record high · up from 2,652 in 2012"
              sparklineData={[2652, 2952, 3346, 3744, 4359, 4393, 4561, 4859, 4907]}
              source="ONS · Deaths related to drug poisoning 2022"
              href="#sec-chart1"
            />
            <MetricCard
              label="Scotland drug death rate per 100k"
              value="22.4"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="2022 · Highest in Europe · 3× England rate"
              sparklineData={[6.8, 9.2, 12.3, 17.5, 21.3, 22.4]}
              source="National Records of Scotland · Drug-related deaths 2022"
              href="#sec-chart2"
            />
            <MetricCard
              label="People in drug treatment (England)"
              value="275K"
              unit=""
              direction="flat"
              polarity="up-is-good"
              changeText="2022/23 · 45% complete treatment free from dependence"
              sparklineData={[300, 310, 295, 280, 273, 270, 271, 275]}
              source="OHID · Adult substance misuse treatment statistics 2022/23"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Drug poisoning deaths, England & Wales, 2012–2022"
              subtitle="All drug poisoning deaths where substances are mentioned on the death certificate. Near-continuous rise over a decade."
              series={poisoningSeries}
              annotations={poisoningAnnotations}
              yLabel="Deaths"
              source={{ name: 'ONS', dataset: 'Deaths related to drug poisoning in England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoningenglandandwales/latest', frequency: 'annual', date: '2022' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Drug death rate, Scotland, 2013–2022"
              subtitle="Deaths per 100,000 population. Scotland has the highest rate in Europe — approximately three times that of England and Wales."
              series={scotlandSeries}
              annotations={[]}
              yLabel="Deaths per 100,000"
              source={{ name: 'National Records of Scotland', dataset: 'Drug-related deaths in Scotland', url: 'https://www.nrscotland.gov.uk/statistics-and-data/statistics/statistics-by-theme/vital-events/deaths/drug-related-deaths-in-scotland', frequency: 'annual', date: '2022' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Naloxone saving lives"
            value="110K"
            unit="naloxone doses distributed in 2022"
            description="Naloxone reverses opioid overdose and saves lives in minutes. NHS England expanded community naloxone distribution in 2023, with 110,000 doses distributed through drug services, pharmacies, and community organisations. The Ten-Year Drugs Plan committed £780 million over 2022–25 to rebuild the treatment system. Recovery rates have improved: 45% of those completing treatment are recorded as free from dependence. Take-home naloxone programmes reduce overdose deaths by 30% in areas with high coverage."
            source="Source: ONS — Drug poisoning deaths 2022; OHID — Adult substance misuse treatment statistics 2022/23."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoningenglandandwales/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Deaths related to drug poisoning in England and Wales</a> — annual publication based on coroner's verdicts.</p>
            <p><a href="https://www.nrscotland.gov.uk/statistics-and-data/statistics/statistics-by-theme/vital-events/deaths/drug-related-deaths-in-scotland" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">National Records of Scotland — Drug-related deaths in Scotland</a> — annual statistics using slightly different classification from ONS.</p>
            <p><a href="https://www.ndtms.net/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OHID / NDTMS — Adult substance misuse treatment statistics</a> — adults in structured drug and alcohol treatment in England.</p>
            <p>Deaths lag by 12–18 months due to the inquest process. Scotland uses a different mortality coding approach from England and Wales.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
