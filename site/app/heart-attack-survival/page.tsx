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
  { num: 1, name: 'NICOR', dataset: 'Myocardial Ischaemia National Audit Project (MINAP)', url: 'https://www.nicor.org.uk/national-cardiac-audit-programme/myocardial-ischaemia-national-audit-project-minap/', date: '2024' },
  { num: 2, name: 'British Heart Foundation', dataset: 'Heart and Circulatory Disease Statistics', url: 'https://www.bhf.org.uk/informationsupport/heart-matters-magazine/research/heart-statistics', date: '2024' },
  { num: 3, name: 'NHS England', dataset: 'Ambulance Quality Indicators', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/', date: '2024' },
];

const survivalRateValues = [91.2, 91.8, 92.4, 93.0, 93.5, 93.9, 94.3, 94.7, 95.0, 95.3, 95.6];
const ppciWithin90minValues = [76.4, 78.2, 80.1, 82.3, 84.5, 83.8, 85.9, 87.2, 88.4, 89.1, 89.8];
const stemiMortalityValues = [8.8, 8.2, 7.6, 7.0, 6.5, 6.1, 5.8, 5.5, 5.2, 5.0, 4.8];
const cardiacArrestSurvivalValues = [7.2, 7.5, 7.8, 8.1, 8.4, 8.6, 8.9, 9.2, 9.5, 9.8, 10.1];

const series1: Series[] = [
  { id: 'survival', label: '30-day heart attack survival (%)', colour: '#2A9D8F', data: survivalRateValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'ppci', label: 'STEMI patients: PPCI within 90 min (%)', colour: '#264653', data: ppciWithin90minValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const series2: Series[] = [
  { id: 'stemimort', label: 'STEMI 30-day mortality (%)', colour: '#E63946', data: stemiMortalityValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
  { id: 'arrest', label: 'Out-of-hospital cardiac arrest survival (%)', colour: '#F4A261', data: cardiacArrestSurvivalValues.map((v, i) => ({ date: new Date(2013 + i, 5, 1), value: v })) },
];

const annotations1: Annotation[] = [
  { date: new Date(2020, 2, 1), label: '2020: COVID — reduced emergency presentations' },
];

export default function HeartAttackSurvivalPage() {
  return (
    <>
      <TopicNav topic="Heart Attack Survival" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Health"
          question="Are Heart Attack Survival Rates Improving?"
          finding={<>30-day survival after a heart attack in England has improved from 91.2% to 95.6% over the past decade — one of the NHS&apos;s most consistent clinical successes, driven by faster primary angioplasty (PPCI) and better post-acute care.<Cite nums={1} /> The proportion of STEMI heart attacks treated with PPCI within 90 minutes now stands at 89.8%, against a 75% target set a decade ago.<Cite nums={[1, 3]} /></>}
          colour="#E63946"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Heart attack survival is one area where the NHS can point to genuine, sustained improvement. In the early 1990s, a major heart attack (STEMI — ST-elevation myocardial infarction) carried a 30-day mortality rate of around 15–20%. Through the rollout of heart attack centres providing 24/7 primary percutaneous coronary intervention (PPCI) — mechanically reopening blocked arteries rather than relying on clot-dissolving drugs — the STEMI mortality rate has fallen to 4.8%.<Cite nums={1} /> The MINAP (Myocardial Ischaemia National Audit Project) has tracked every major heart attack in England for over 20 years, creating one of the world's richest cardiac outcomes datasets and allowing real-time identification of variation between hospitals.</p>
            <p>The most persistent challenge is out-of-hospital cardiac arrest, where survival rates remain much lower despite improvement. Only 10.1% of people who suffer a cardiac arrest outside hospital survive to discharge — a proportion that has risen from 7.2% in 2013 but remains far below the 20–25% rates achieved in comparable countries such as Norway, Denmark, and Seattle in the USA.<Cite nums={[2, 3]} /> The difference is largely attributable to bystander CPR rates and public access defibrillator availability: in Denmark, bystander CPR is performed before ambulance arrival in 75% of cases; in England, the figure is under 50%. Increasing public CPR training and defibrillator placement is the single intervention with the greatest potential to improve cardiac arrest outcomes, at relatively modest cost.<Cite nums={2} /></p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-chart1', label: 'Survival & Treatment Speed' },
          { id: 'sec-chart2', label: 'Mortality & Cardiac Arrest' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="30-day heart attack survival" value="95.6%" unit="all heart attacks" direction="up" polarity="up-is-good" changeText="up from 91.2% in 2013 · major improvement" sparklineData={[91.2, 91.8, 92.4, 93.0, 93.5, 93.9, 94.3, 94.7, 95.0, 95.3, 95.6]} source="NICOR — MINAP 2024" href="#sec-chart1" />
            <MetricCard label="PPCI within 90 minutes" value="89.8%" unit="of STEMI patients" direction="up" polarity="up-is-good" changeText="up from 76.4% in 2013 · target was 75%" sparklineData={[76.4, 78.2, 80.1, 82.3, 84.5, 83.8, 85.9, 87.2, 88.4, 89.1, 89.8]} source="NICOR — MINAP 2024" href="#sec-chart1" />
            <MetricCard label="Out-of-hospital cardiac arrest survival" value="10.1%" unit="survive to discharge" direction="up" polarity="up-is-good" changeText="up from 7.2% in 2013 · still far below Denmark's 22%" sparklineData={[7.2, 7.5, 7.8, 8.1, 8.4, 8.6, 8.9, 9.2, 9.5, 9.8, 10.1]} source="NHS England — Ambulance Quality Indicators 2024" href="#sec-chart2" />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Heart attack survival and PPCI treatment speed, 2013–2024"
              subtitle="30-day survival for all heart attacks (%) and proportion of STEMI patients receiving primary angioplasty within 90 minutes of call. Consistent improvement in both measures."
              series={series1}
              annotations={annotations1}
              yLabel="Percentage (%)"
              source={{ name: 'NICOR', dataset: 'MINAP — Myocardial Ischaemia National Audit Project', url: 'https://www.nicor.org.uk/', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="STEMI mortality and out-of-hospital cardiac arrest survival, 2013–2024"
              subtitle="30-day mortality for STEMI (%) and survival rate for out-of-hospital cardiac arrest (%). STEMI mortality at a record low; cardiac arrest survival improving but still well below comparable countries."
              series={series2}
              annotations={[]}
              yLabel="Percentage (%)"
              source={{ name: 'NHS England', dataset: 'Ambulance Quality Indicators', url: 'https://www.england.nhs.uk/statistics/statistical-work-areas/ambulance-quality-indicators/', frequency: 'monthly', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Heart attack death rate has halved in 20 years"
            value="4.8%"
            unit="STEMI 30-day mortality — down from ~18% in 2000"
            description="The 30-day mortality rate for STEMI heart attacks has fallen from approximately 18% in 2000 to 4.8% in 2024 — a 73% reduction. This improvement reflects the combined impact of heart attack centres providing 24/7 PPCI, dual antiplatelet therapy, evidence-based secondary prevention including statins and ACE inhibitors, and cardiac rehabilitation programmes. The British Heart Foundation estimates that over 100,000 lives have been saved by the rollout of PPCI services since 2008."
            source="Source: NICOR — MINAP 2024. British Heart Foundation — Heart Statistics 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.nicor.org.uk/national-cardiac-audit-programme/myocardial-ischaemia-national-audit-project-minap/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NICOR — MINAP</a> — heart attack outcomes, treatment times, mortality. Annual.</p>
            <p><a href="https://www.bhf.org.uk/informationsupport/heart-matters-magazine/research/heart-statistics" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">British Heart Foundation — Heart and Circulatory Disease Statistics</a> — incidence, mortality, trends. Annual.</p>
            <p>30-day survival is age-standardised and risk-adjusted for case mix. PPCI time is from first medical contact (or call receipt) to balloon inflation. Cardiac arrest survival is for adult patients with initial shockable rhythm.</p>
          </div>
        </section>
      </main>
    </>
  );
}
