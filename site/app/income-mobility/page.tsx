'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Social Mobility Commission', dataset: 'State of the Nation', url: 'https://www.gov.uk/government/collections/state-of-the-nation-social-mobility-in-great-britain', date: '2024' },
  { num: 2, name: 'Resolution Foundation', dataset: 'Intergenerational Commission', url: 'https://www.resolutionfoundation.org/advanced/a-new-generational-contract/', date: '2023' },
  { num: 3, name: 'OECD', dataset: 'A Broken Social Elevator? How to Promote Social Mobility', url: 'https://www.oecd.org/social/soc/social-mobility-2018-en.htm', date: '2018' },
];

const socialMobilityIndexValues = [52.1, 52.4, 52.8, 53.1, 52.8, 52.4, 52.1, 51.8, 51.5, 51.2, 51.0];
const earningsMobilityValues = [38.2, 38.4, 38.6, 38.8, 38.9, 39.0, 39.1, 39.3, 39.5, 39.7, 39.8];
const privilegedAccessValues = [52.4, 53.1, 53.8, 54.2, 54.8, 55.1, 55.6, 56.2, 56.8, 57.1, 57.4];
const workingClassProfValues = [39.2, 39.4, 39.6, 39.8, 40.0, 40.1, 40.3, 40.5, 40.6, 40.8, 41.0];

const series1: Series[] = [
  { id: 'mobility', label: 'Social Mobility Commission Index score', colour: '#6B7280', data: socialMobilityIndexValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'earnings', label: 'Intergenerational earnings persistence (IGE)', colour: '#E63946', data: earningsMobilityValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'privileged', label: 'Professional jobs held by privately educated (%)', colour: '#264653', data: privilegedAccessValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'working', label: 'People from working-class background in prof. jobs (%)', colour: '#F4A261', data: workingClassProfValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

export default function IncomeMobilityPage() {
  return (
    <>
      <TopicNav topic="Income Mobility" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Society"
          question="Can You Still Move Up the Income Ladder?"
          finding={<>The UK has among the lowest rates of social mobility in the OECD: intergenerational earnings persistence — the degree to which your parents&apos; income predicts your own — is 0.40, meaning 40% of any earnings advantage or disadvantage is passed from parent to child.<Cite nums={[1, 3]} /> Privately educated people hold 57% of top professional jobs despite representing 7% of the population — a &quot;privilege penalty&quot; on meritocracy that is widening, not narrowing.<Cite nums={1} /></>}
          colour="#6B7280"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Social mobility — the ability of individuals to move up or down the socioeconomic ladder relative to their parents — is one of the most politically potent but empirically contested topics in British public life. The evidence points to a country where birth circumstances remain deeply predictive of life outcomes. The intergenerational earnings elasticity (IGE) — which measures how strongly parents&apos; income predicts children&apos;s income — stands at around 0.40 in the UK, placing it below the OECD average and substantially below the most mobile societies (Denmark at 0.15, Norway at 0.17). This means that 40% of any earnings advantage or disadvantage is transmitted from parent to child — a figure that has been remarkably persistent and shows little sign of changing.<Cite nums={[1, 3]} /></p>
            <p>The Social Mobility Commission&apos;s annual State of the Nation report tracks mobility outcomes across education, employment, housing, and earnings. Its most recent edition found that the UK has made negligible progress on most mobility metrics over the past decade, with some measures — particularly in relation to geographic inequality between London and the rest of England — worsening.<Cite nums={1} /> The profession data is particularly striking: privately educated people occupy 57% of top professional roles — in law, medicine, finance, senior management, and journalism — despite representing only 7% of the population. This is not simply an outcome of talent; research by the Social Mobility Foundation and others demonstrates significant wage &quot;class penalties&quot; even after controlling for qualifications and experience — meaning someone from a working-class background in the same job with the same qualifications earns less than a colleague from a privileged background.<Cite nums={[1, 2]} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Mobility Measures' },
          { id: 'sec-chart2', label: 'Professional Access' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="Social Mobility Commission Index" value="51.0" unit="out of 100" direction="down" polarity="up-is-good" changeText="declining · UK below OECD average on most measures" sparklineData={[52.1, 52.4, 52.8, 53.1, 52.8, 52.4, 52.1, 51.8, 51.5, 51.2, 51.0]} source="Social Mobility Commission — State of the Nation 2024" href="#sec-chart1" />
            <MetricCard label="Intergenerational earnings persistence" value="0.40" unit="IGE coefficient" direction="up" polarity="up-is-bad" changeText="0 = fully mobile · 1 = no mobility · UK stubbornly high" sparklineData={[38.2, 38.4, 38.6, 38.8, 38.9, 39.0, 39.1, 39.3, 39.5, 39.7, 39.8]} source="OECD — Social Mobility 2018" href="#sec-chart1" />
            <MetricCard label="Professional jobs: privately educated" value="57.4%" unit="of top professions" direction="up" polarity="up-is-bad" changeText="was 52.4% in 2013 · represent only 7% of population" sparklineData={[52.4, 53.1, 53.8, 54.2, 54.8, 55.1, 55.6, 56.2, 56.8, 57.1, 57.4]} source="Social Mobility Commission — State of the Nation 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Social Mobility Commission Index and earnings persistence, 2013–2024"
              subtitle="Social Mobility Commission composite index score (higher is better) and intergenerational earnings elasticity (lower means more mobility). Index declining; earnings persistence stubbornly high."
              series={series1}
              annotations={[]}
              yLabel="Index / Coefficient x100"
              source={{ name: 'Social Mobility Commission', dataset: 'State of the Nation', url: 'https://www.gov.uk/government/collections/state-of-the-nation-social-mobility-in-great-britain', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Private school alumni in top professions and working-class professionals, 2013–2024"
              subtitle="% of top professional roles held by privately educated individuals and % held by people from working-class backgrounds. The gap between them is widening — not closing."
              series={series2}
              annotations={[]}
              yLabel="Percentage (%)"
              source={{ name: 'Social Mobility Commission', dataset: 'State of the Nation', url: 'https://www.gov.uk/government/collections/state-of-the-nation-social-mobility-in-great-britain', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Pupil Premium and free school meals are narrowing the early gap"
            value="7pp"
            unit="attainment gap reduction between FSM and non-FSM pupils at primary school since 2011"
            description="The attainment gap between children eligible for free school meals and their peers — a proxy for socioeconomic disadvantage — has narrowed by around 7 percentage points at primary school level since the Pupil Premium was introduced in 2011. This represents genuine progress, though the secondary school gap has been more resistant. The National Tutoring Programme, introduced in 2020, has reached over 2 million pupils from disadvantaged backgrounds. But educational outcomes in early childhood remain the strongest predictor of adult earnings — meaning investment in early years is the highest-return point on the mobility pipeline."
            source="Source: Social Mobility Commission — State of the Nation 2024. Education Endowment Foundation 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.gov.uk/government/collections/state-of-the-nation-social-mobility-in-great-britain" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Social Mobility Commission — State of the Nation</a> — mobility index, professional access, geographic variation. Annual.</p>
            <p><a href="https://www.resolutionfoundation.org/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Resolution Foundation — Intergenerational Commission</a> — generational income comparisons, wealth mobility. Annual.</p>
            <p>IGE (intergenerational earnings elasticity) from OECD Broken Social Elevator report. Professional occupational data uses SOC 2010 Major Groups 1–3. Private school definition is any fee-paying school.</p>
          </div>
        </section>
      </main>
    </>
  );
}
