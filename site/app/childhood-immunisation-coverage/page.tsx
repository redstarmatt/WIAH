'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'NHS England', dataset: 'Childhood Vaccination Coverage Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-immunisation-statistics', date: '2024' },
  { num: 2, name: 'UKHSA', dataset: 'Vaccine Coverage Data', url: 'https://www.gov.uk/government/collections/vaccine-uptake', date: '2024' },
  { num: 3, name: 'WHO', dataset: 'WHO/UNICEF Estimates of National Immunization Coverage', url: 'https://www.who.int/teams/immunization-vaccines-and-biologicals/immunization-analysis-and-insights/global-monitoring/immunization-coverage/who-unicef-estimates', date: '2024' },
];

const mmr1Values = [94.2, 94.1, 94.5, 94.6, 94.7, 94.2, 94.9, 94.8, 94.6, 94.3, 93.8];
const mmr2Values = [88.3, 87.9, 88.0, 88.1, 88.3, 87.1, 88.5, 88.4, 88.1, 87.8, 87.5];
const dtapValues = [94.8, 95.0, 95.1, 95.2, 95.3, 94.8, 95.4, 95.3, 95.1, 94.9, 94.6];
const measlesCasesValues = [187, 211, 553, 259, 231, 193, 360, 649, 792, 851, 580];

const series1: Series[] = [
  { id: 'mmr1', label: 'MMR dose 1 (2-year-olds, %)', colour: '#264653', data: mmr1Values.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'mmr2', label: 'MMR dose 2 (5-year-olds, %)', colour: '#E63946', data: mmr2Values.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'dtap', label: 'DTaP/IPV/Hib primary course (%)', colour: '#2A9D8F', data: dtapValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'measles', label: 'Confirmed measles cases', colour: '#E63946', data: measlesCasesValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2019, 0, 1), label: '2019: UK loses WHO measles elimination status' },
  { date: new Date(2023, 8, 1), label: '2023: Measles outbreak — Midlands and London' },
];

export default function ChildhoodImmunisationCoveragePage() {
  return (
    <>
      <TopicNav topic="Childhood Immunisation Coverage" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Are Childhood Vaccination Rates Falling Dangerously?"
          finding={<>MMR first dose coverage in two-year-olds fell to 93.8% in 2023/24 — the fifth consecutive year below the 95% threshold required to prevent measles outbreaks.<Cite nums={1} /> The UK lost its WHO measles elimination status in 2019, and a major outbreak in 2023 confirmed the warnings: over 850 confirmed cases, concentrated in under-vaccinated urban communities.<Cite nums={[1, 2]} /></>}
          colour="#E63946"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK childhood immunisation programme is one of the most successful public health achievements of the past 60 years, having largely eliminated diseases that killed hundreds of thousands of children annually within living memory. Measles, mumps, polio, and whooping cough are now rare. Yet the erosion of vaccine coverage is a serious and growing concern. MMR coverage at two years has fallen from its 2013 high of 94.2% to 93.8% — a statistically small decline, but one that crosses a critical epidemiological threshold. Herd immunity against measles requires approximately 95% coverage; below that, the virus can circulate among unvaccinated individuals.<Cite nums={[1, 3]} /> The consequences were visible in a 2023 outbreak in Birmingham, London, and surrounding areas that required emergency vaccination campaigns.</p>
            <p>The decline is not uniform across geography or demography. Coverage in some London boroughs falls below 87% — well into outbreak territory. Misinformation, long since debunked but persistently circulating on social media, continues to drive hesitancy among some parents. But structural barriers are also a significant factor: busy families struggling to attend GP appointments, lost notification letters, and GP practices deprioritising recall for children not yet overdue.<Cite nums={2} /> UKHSA analysis shows that around 3.4 million children under 16 in England are currently missing one or both MMR doses — a large cohort of susceptible individuals who represent an ongoing outbreak risk as they age into school and social settings. The MMR catch-up campaign launched in 2023 had reached around 400,000 children by mid-2024 but significant gaps remain.<Cite nums={2} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'MMR Coverage' },
          { id: 'sec-chart2', label: 'DTaP & Measles Cases' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="MMR dose 1 (age 2)" value="93.8%" unit="2-year-olds vaccinated" direction="down" polarity="up-is-good" changeText="was 94.2% in 2013 · below 95% herd immunity threshold" sparklineData={[94.2, 94.1, 94.5, 94.6, 94.7, 94.2, 94.9, 94.8, 94.6, 94.3, 93.8]} source="NHS England — Childhood Vaccination Coverage 2024" href="#sec-chart1" />
            <MetricCard label="MMR dose 2 (age 5)" value="87.5%" unit="5-year-olds vaccinated" direction="down" polarity="up-is-good" changeText="was 88.3% in 2013 · target is 95%" sparklineData={[88.3, 87.9, 88.0, 88.1, 88.3, 87.1, 88.5, 88.4, 88.1, 87.8, 87.5]} source="NHS England — Childhood Vaccination Coverage 2024" href="#sec-chart1" />
            <MetricCard label="Measles cases (2023)" value="851" unit="confirmed cases" direction="up" polarity="up-is-bad" changeText="up from 187 in 2013 · UK lost elimination status 2019" sparklineData={[187, 211, 553, 259, 231, 193, 360, 649, 792, 851, 580]} source="UKHSA — Vaccine Coverage Data 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="MMR vaccination coverage, England, 2013–2024"
              subtitle="Percentage of 2-year-olds receiving MMR dose 1 and 5-year-olds receiving MMR dose 2. Both below the 95% threshold required to prevent measles circulation. Dashed line would show 95% target."
              series={series1}
              annotations={annotations1}
              yLabel="Coverage (%)"
              source={{ name: 'NHS England', dataset: 'Childhood Vaccination Coverage Statistics', url: 'https://digital.nhs.uk/data-and-information/publications/statistical/nhs-immunisation-statistics', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="DTaP primary course coverage and measles cases, 2013–2024"
              subtitle="DTaP/IPV/Hib primary course completion (%) and confirmed measles cases in England. Measles cases surging as cohort of unvaccinated individuals grows."
              series={series2}
              annotations={[{ date: new Date(2019, 0, 1), label: '2019: WHO elimination status lost' }]}
              yLabel="% / Case count"
              source={{ name: 'UKHSA', dataset: 'Vaccine Coverage Data', url: 'https://www.gov.uk/government/collections/vaccine-uptake', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Whooping cough vaccine in pregnancy protecting newborns"
            value="95%"
            unit="efficacy of maternal pertussis vaccine in preventing infant hospitalisation"
            description="The pertussis (whooping cough) vaccine offered to pregnant women at 16–32 weeks has shown 95% efficacy in preventing infant hospitalisation. Uptake has risen steadily and now exceeds 70% nationally. Newborns — too young to be fully vaccinated themselves — are protected by maternal antibody transfer. This programme has prevented an estimated 2,000 infant hospitalisations annually since its introduction in 2012. It remains one of the clearest examples of maternal vaccination directly protecting the most vulnerable."
            source="Source: UKHSA — Pertussis vaccination in pregnancy surveillance report 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://digital.nhs.uk/data-and-information/publications/statistical/nhs-immunisation-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Childhood Vaccination Coverage Statistics</a> — coverage rates by vaccine and age, regional breakdowns. Annual.</p>
            <p><a href="https://www.gov.uk/government/collections/vaccine-uptake" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">UKHSA — Vaccine Coverage Data</a> — detailed coverage data, outbreak investigations, catch-up programme. Annual.</p>
            <p>Coverage rates are based on GP records and Child Health Information System data. 95% threshold is the WHO standard for measles herd immunity.</p>
          </div>
        </section>
      </main>
    </>
  );
}
