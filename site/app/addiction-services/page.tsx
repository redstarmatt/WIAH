'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// Drug poisoning deaths, England & Wales, 2012–2024 — ONS
const drugDeathsValues = [2597, 2955, 3346, 3674, 3744, 4359, 4393, 2822, 3726, 4561, 4907, 4859, 4907];

// People in structured treatment (thousands), 2010–2024 — OHID NDTMS
const treatmentValues = [338, 325, 310, 298, 289, 284, 278, 275, 272, 275, 281, 285, 289, 292, 295];

// Treatment funding per head £, 2013–2024 — OHID
const fundingValues = [8.42, 8.10, 7.68, 7.20, 6.80, 6.40, 6.00, 5.70, 5.50, 5.89, 6.20, 6.50];

const series1: Series[] = [
  {
    id: 'drug-deaths',
    label: 'Drug poisoning deaths',
    colour: '#E63946',
    data: drugDeathsValues.map((v, i) => ({ date: new Date(2012 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'treatment',
    label: 'People in structured treatment (thousands)',
    colour: '#264653',
    data: treatmentValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'funding',
    label: 'Treatment funding per head (£)',
    colour: '#F4A261',
    data: fundingValues.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2013, 0, 1), label: '2013: Public health grant cuts begin' },
  { date: new Date(2021, 0, 1), label: '2021: Dame Carol Black review' },
];

export default function AddictionServicesPage() {
  return (
    <>
      <TopicNav topic="Mental Health & Wellbeing" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Mental Health & Wellbeing"
          question="Are addiction services actually working?"
          finding="Drug poisoning deaths in England and Wales have nearly doubled since 2012, reaching 4,907 in 2024. Treatment funding was cut by over 30% per head between 2013 and 2020. The number of people in structured treatment fell to a decade low before partially recovering."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>England and Wales are in the grip of a drug deaths crisis that has received remarkably little public attention. Drug poisoning deaths have risen almost every year since 2012, reaching 4,907 registered deaths in 2024 — an 89% increase in just over a decade. The victims are disproportionately men aged 40–49, from the most deprived communities. Opioids remain the single largest contributor, involved in roughly half of all drug poisoning deaths. The North East of England has the highest drug death rate in the country at 11.4 per 100,000, nearly three times the rate in London. This is not a crisis distributed evenly; it maps almost perfectly onto deprivation, deindustrialisation, and the withdrawal of public services.</p>
            <p>The treatment system that should be catching these people was hollowed out during the 2010s. Local authority spending on drug and alcohol services fell by more than 30% per head between 2013 and 2020. The number of people in structured treatment dropped from 338,000 in 2010 to a low of 272,000 in 2020. Dame Carol Black's landmark independent review, published in 2021, described the treatment system as "not fit for purpose" and called for an additional £552 million per year in funding. Treatment numbers have since recovered to around 295,000, still below 2010 levels. Alcohol treatment is a particular gap — only one in five people who are dependent on alcohol are in treatment. Naloxone distribution programmes, which provide overdose-reversal kits, have expanded significantly and are saving lives.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Drug deaths' },
          { id: 'sec-chart2', label: 'Treatment & Funding' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Drug poisoning deaths"
              value="4,907"
              unit="2024"
              direction="up"
              polarity="up-is-bad"
              changeText="+89% since 2012 · opioids involved in ~50% of deaths"
              sparklineData={drugDeathsValues.slice(-8)}
              source="ONS · Deaths related to drug poisoning 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="People in structured treatment"
              value="295K"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="Down from 338K in 2010 · recovering from 272K low in 2020"
              sparklineData={treatmentValues.slice(-8)}
              source="OHID · NDTMS adult substance misuse statistics 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Treatment funding per head"
              value="£6.50"
              unit="2024"
              direction="up"
              polarity="up-is-good"
              changeText="Down from £8.42 in 2013 · partial recovery since 2020"
              sparklineData={fundingValues.slice(-8)}
              source="OHID · Public health grant expenditure 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Drug poisoning deaths, England & Wales, 2012–2024"
              subtitle="Deaths registered each year where the underlying cause is drug poisoning. Near-continuous rise over 12 years."
              series={series1}
              annotations={annotations}
              yLabel="Deaths"
              source={{ name: 'ONS', dataset: 'Deaths related to drug poisoning in England and Wales', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoninginenglandandwales/latest', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="People in treatment and funding per head, England, 2010–2024"
              subtitle="Structured treatment numbers (thousands, blue) and funding per head (£, amber). Both fell sharply after 2013 public health grant cuts."
              series={series2}
              annotations={[]}
              yLabel="Treatment (thousands) / Funding (£)"
              source={{ name: 'OHID', dataset: 'National Drug Treatment Monitoring System (NDTMS) & Public Health Grant expenditure', url: 'https://www.gov.uk/government/collections/statistics-from-the-national-drug-treatment-monitoring-system-ndtms', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Naloxone distribution is expanding and saving lives"
            value="Tens of thousands"
            unit="of overdose-reversal kits distributed"
            description="Naloxone — a medicine that rapidly reverses opioid overdose — is now being distributed at scale through drug treatment services, homelessness charities, and peer networks across England. Since regulations were relaxed in 2019 to allow wider distribution, tens of thousands of kits have been supplied annually. Evidence from Scotland, where a national naloxone programme has operated since 2011, shows that community distribution measurably reduces opioid overdose deaths. The government's 10-year drug strategy committed to making naloxone available to all those at risk."
            source="Source: OHID — Naloxone provision data 2024. Dame Carol Black — Independent Review of Drugs 2021."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/bulletins/deathsrelatedtodrugpoisoninginenglandandwales/latest" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Deaths Related to Drug Poisoning in England and Wales</a> — annual publication. Deaths are based on registration year, not year of occurrence.</p>
            <p><a href="https://www.gov.uk/government/collections/statistics-from-the-national-drug-treatment-monitoring-system-ndtms" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OHID / NDTMS — Adult Drug and Alcohol Statistics</a> — structured treatment numbers covering publicly funded services in England.</p>
            <p>Funding figures cover local authority public health grant expenditure on substance misuse services. They do not include NHS secondary care or criminal justice spending. Data covers England and Wales (deaths) and England only (treatment and funding).</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
