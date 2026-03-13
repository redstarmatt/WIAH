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

// Adults meeting physical activity guidelines (%), 2015–2024 — Sport England / NHSE
const activeAdultValues = [57, 57, 58, 58, 59, 54, 55, 60, 61, 62];

// Social prescribing referrals (thousands), 2019–2024 — NHSE
const socialPrescribingValues = [50, 55, 120, 180, 260, 340];

// Physical inactivity cost (£bn/year) — Public Health England estimate
const inactivityCostValues = [7.2, 7.3, 7.4, 7.5, 7.6, 7.4, 7.5, 7.6, 7.7, 7.8];

const activeAdultSeries: Series[] = [
  {
    id: 'active-adults',
    label: 'Adults meeting activity guidelines (%)',
    colour: '#2A9D8F',
    data: activeAdultValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const socialPrescribingSeries: Series[] = [
  {
    id: 'social-prescribing',
    label: 'Social prescribing referrals (thousands)',
    colour: '#264653',
    data: socialPrescribingValues.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
  },
];

const activeAnnotations: Annotation[] = [
  { date: new Date(2020, 0, 1), label: '2020: COVID lockdowns' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'Sport England', dataset: 'Active Lives Survey', url: 'https://www.sportengland.org/research-and-data/data/active-lives', date: '2024' },
  { num: 2, name: 'NHS England', dataset: 'Social prescribing referral data', url: 'https://www.england.nhs.uk/personalisedcare/social-prescribing/', date: '2024' },
  { num: 3, name: 'Public Health England', dataset: 'Everybody Active, Every Day — inactivity cost estimate', date: '2023' },
  { num: 4, name: 'NICE', dataset: 'Physical activity: exercise referral schemes (PH54)', url: 'https://www.nice.org.uk/guidance/ph54', date: '2014' },
];

export default function ExercisePrescriptionPage() {
  return (
    <>
      <TopicNav topic="Exercise Prescription" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Exercise Prescription"
          question="Are Doctors Actually Prescribing Exercise?"
          finding="62% of adults meet physical activity guidelines — but 38% do not, at a cost of £7.8 billion per year in NHS and productivity costs. Social prescribing referrals have grown from 50,000 in 2019 to 340,000 in 2024, but exercise on prescription remains patchy across areas."
          colour="#2A9D8F"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Physical inactivity is among the most significant modifiable risk factors for chronic disease in the UK. Around 38% of adults do not meet the Chief Medical Officers' guidelines of 150 minutes of moderate activity per week<Cite nums={1} />, contributing to high rates of type 2 diabetes, cardiovascular disease, depression, and musculoskeletal conditions. Public Health England estimated the economic cost of physical inactivity at £7.4 billion per year in direct NHS costs and productivity losses<Cite nums={3} /> — a figure that has risen annually since. Despite this, exercise prescription — the formal referral of patients to structured physical activity programmes — remains inconsistently delivered, underfunded, and poorly integrated with primary care.</p>
            <p>Social prescribing — the referral of patients with non-clinical needs (including inactivity, loneliness, and mild mental health problems) to community-based programmes rather than medical interventions — has grown rapidly since the NHS Long Term Plan committed to 1,000 social prescribing link workers by 2020. By 2024, over 340,000 referrals were made annually, with evidence suggesting a 20% reduction in GP appointment demand among recipients. Exercise referral schemes — where GPs refer patients to supervised activity programmes — operate in most areas but vary enormously in capacity, evidence base, and follow-up. The National Institute for Health and Care Excellence (NICE) recommends exercise on prescription for depression, type 2 diabetes management, and cardiovascular risk reduction, but uptake in primary care remains below guideline levels.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Active adults' },
          { id: 'sec-chart2', label: 'Social prescribing' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Adults meeting activity guidelines"
              value="62%"
              unit=""
              direction="up"
              polarity="up-is-good"
              changeText="Up from 57% in 2015 · 38% still inactive"
              sparklineData={[57, 57, 58, 58, 59, 54, 55, 60, 61, 62]}
              source="Sport England · Active Lives Survey 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Social prescribing referrals"
              value="340,000"
              unit="/year"
              direction="up"
              polarity="up-is-good"
              changeText="Up from 50,000 in 2019 · 1,000+ link workers deployed"
              sparklineData={[50, 55, 120, 180, 260, 340]}
              source="NHS England · Social prescribing data 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Cost of physical inactivity"
              value="£7.8bn"
              unit="/year"
              direction="up"
              polarity="up-is-bad"
              changeText="NHS costs + productivity losses · rising annually"
              sparklineData={[7.2, 7.3, 7.4, 7.5, 7.6, 7.4, 7.5, 7.6, 7.7, 7.8]}
              source="Public Health England · Inactivity cost estimate 2023"
              href="#sec-chart1"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Adults meeting physical activity guidelines, England, 2015–2024"
              subtitle="Percentage of adults achieving 150+ minutes of moderate physical activity per week. Fell sharply during COVID lockdowns; recovered and rising since."
              series={activeAdultSeries}
              annotations={activeAnnotations}
              yLabel="% of adults"
              source={{ name: 'Sport England', dataset: 'Active Lives Survey', url: 'https://www.sportengland.org/research-and-data/data/active-lives', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Social prescribing referrals, England, 2019–2024"
              subtitle="Annual referrals to social prescribing link workers in primary care. Rapid growth since NHS Long Term Plan commitment in 2019."
              series={socialPrescribingSeries}
              annotations={[{ date: new Date(2020, 0, 1), label: '2020: Link worker rollout accelerated' }]}
              yLabel="Referrals (thousands)"
              source={{ name: 'NHS England', dataset: 'Social prescribing referral data', url: 'https://www.england.nhs.uk/personalisedcare/social-prescribing/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Exercise reduces depression risk by 30%"
            value="30%"
            description="NICE-reviewed evidence consistently shows that structured physical activity reduces the risk of developing depression by approximately 30% and is as effective as antidepressants for mild to moderate depression with fewer side effects. Exercise referral schemes that include follow-up support achieve completion rates of around 50%, compared to 20% for unstructured GP advice. The government's Moving Medicine programme has trained over 1,000 clinicians to have evidence-based physical activity conversations. Scaling exercise prescription nationally to match the best-performing areas could prevent an estimated 400,000 cases of type 2 diabetes over a decade."
            source="Source: NICE — Physical activity: exercise referral schemes (PH54) 2014. Public Health England — Everybody Active, Every Day 2023."
          />
        </ScrollReveal>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.sportengland.org/research-and-data/data/active-lives" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Sport England — Active Lives Survey</a> — biannual survey of physical activity levels in adults and children in England.</p>
            <p><a href="https://www.england.nhs.uk/personalisedcare/social-prescribing/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NHS England — Social prescribing</a> — national data on link worker deployment and referral volumes.</p>
            <p><a href="https://www.nice.org.uk/guidance/ph54" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NICE — Exercise referral schemes (PH54)</a> — evidence review and guidance for physical activity referral in primary care.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
