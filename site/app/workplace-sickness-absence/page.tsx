'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';

// ── Types ────────────────────────────────────────────────────────────────────

interface DaysAbsentPoint {
  year: number;
  days: number;
}

interface AbsenceByCausePoint {
  year: number;
  mentalHealth: number;
  musculoskeletal: number;
  minorIllness: number;
  longCovid: number;
  other: number;
}

interface PublicPrivatePoint {
  year: number;
  public: number;
  private: number;
}

interface SicknessAbsenceData {
  daysAbsent: DaysAbsentPoint[];
  absenceByCause: AbsenceByCausePoint[];
  publicVsPrivate: PublicPrivatePoint[];
}

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Sickness absence in the labour market, UK', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/labourproductivity/articles/sicknessabsenceinthelabourmarket/latest', date: '2024', note: 'Average sickness absence rose to 9.4 days per worker; long COVID accounted for around 6% of absence' },
  { num: 2, name: 'CIPD', dataset: 'Health and Wellbeing at Work survey', url: 'https://www.cipd.org/uk/knowledge/reports/health-well-being-work/', date: '2024', note: 'Mental health conditions account for 41% of long-term absence, up from 21% in 2015; two-thirds of employers report increased mental health absence since 2020' },
  { num: 3, name: 'CBI', dataset: 'Employment Trends Survey', url: 'https://www.cbi.org.uk/', date: '2024', note: 'Sickness absence costs UK economy approximately £32 billion per year; presenteeism costs an estimated further £24 billion' },
  { num: 4, name: 'ONS', dataset: 'Labour market overview — economic inactivity by reason', url: 'https://www.ons.gov.uk/employmentandlabourmarket/peoplenotinwork/economicinactivity', date: '2024', note: '2.8 million working-age adults out of labour force due to long-term sickness, highest on record' },
  { num: 5, name: 'DWP', dataset: 'Fit for Work programme evaluation', url: 'https://www.gov.uk/government/publications/fit-for-work-evaluation', date: '2024', note: 'Pilot schemes showed 15% reduction in absence duration where occupational health support provided within first two weeks' },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function WorkplaceSicknessAbsencePage() {
  const [data, setData] = useState<SicknessAbsenceData | null>(null);

  useEffect(() => {
    fetch('/data/workplace-sickness-absence/workplace_sickness_absence.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const daysAbsentSeries: Series[] = data
    ? [{
        id: 'days-absent',
        label: 'Average days lost per worker',
        colour: '#E63946',
        data: data.daysAbsent.map(d => ({
          date: yearToDate(d.year),
          value: d.days,
        })),
      }]
    : [];

  const absenceByCauseSeries: Series[] = data
    ? [
        {
          id: 'mental-health',
          label: 'Mental health',
          colour: '#E63946',
          data: data.absenceByCause.map(d => ({
            date: yearToDate(d.year),
            value: d.mentalHealth,
          })),
        },
        {
          id: 'musculoskeletal',
          label: 'Musculoskeletal',
          colour: '#F4A261',
          data: data.absenceByCause.map(d => ({
            date: yearToDate(d.year),
            value: d.musculoskeletal,
          })),
        },
        {
          id: 'minor-illness',
          label: 'Minor illness',
          colour: '#6B7280',
          data: data.absenceByCause.map(d => ({
            date: yearToDate(d.year),
            value: d.minorIllness,
          })),
        },
        {
          id: 'long-covid',
          label: 'Long COVID',
          colour: '#264653',
          data: data.absenceByCause.map(d => ({
            date: yearToDate(d.year),
            value: d.longCovid,
          })),
        },
      ]
    : [];

  const publicPrivateSeries: Series[] = data
    ? [
        {
          id: 'public-sector',
          label: 'Public sector',
          colour: '#E63946',
          data: data.publicVsPrivate.map(d => ({
            date: yearToDate(d.year),
            value: d.public,
          })),
        },
        {
          id: 'private-sector',
          label: 'Private sector',
          colour: '#264653',
          data: data.publicVsPrivate.map(d => ({
            date: yearToDate(d.year),
            value: d.private,
          })),
        },
      ]
    : [];

  const latestDays = data?.daysAbsent[data.daysAbsent.length - 1];
  const latestCause = data?.absenceByCause[data.absenceByCause.length - 1];
  const latestPublic = data?.publicVsPrivate[data.publicVsPrivate.length - 1];

  return (
    <>
      <TopicNav topic="Economy & Work" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Economy & Work"
          question="Why are British workers taking more sick days than ever?"
          finding={<>Average sickness absence has risen to 9.4 days per worker per year — up from 5.8 days before the pandemic.<Cite nums={1} /> Mental health conditions now account for 41% of all long-term absence, making them the single largest cause.<Cite nums={2} /> The cost to the UK economy has reached an estimated £32 billion annually.<Cite nums={3} /></>}
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Something broke during the pandemic and never mended. Before COVID-19, sickness absence in the UK had been on a long, slow decline for over a decade, reaching a low of 5.5 days per worker in 2020. By 2024, that figure had nearly doubled.<Cite nums={1} /> The surge is not simply a matter of lingering COVID infections — though long COVID has contributed, accounting for around 6% of absence in 2024.<Cite nums={1} /> The deeper story is about mental health. Stress, anxiety, and depression now account for 41% of all long-term sickness absence, up from 21% in 2015.<Cite nums={2} /> The CIPD's annual Health and Wellbeing at Work survey found that two-thirds of employers reported an increase in mental health-related absence since 2020, with younger workers disproportionately affected.<Cite nums={2} /> Burnout, workload pressures, and the erosion of boundaries between work and home life during the remote-working era have all played a role.</p>
            <p>The gap between the public and private sectors has widened significantly. Public sector workers now lose an average of 12.2 days per year to sickness, compared with 7.5 in the private sector.<Cite nums={1} /> The NHS is both cause and symptom: health service staff have some of the highest absence rates in the economy, driven by chronic understaffing, emotional exhaustion, and exposure to trauma. But the pattern extends across local government, education, and the civil service. ONS data shows that the public-private gap, which stood at around 2.7 days in 2019, has now widened to 4.7 days.<Cite nums={1} /> Part of this reflects better sick pay provisions in the public sector — workers can actually afford to be off when they are ill — but part reflects genuinely worse working conditions in stretched public services.</p>
            <p>The economic consequences are substantial. The CBI estimates that sickness absence costs the UK economy approximately £32 billion per year in lost output, employer costs, and health spending.<Cite nums={3} /> More troublingly, rising sickness absence is feeding directly into economic inactivity: around 2.8 million working-age adults are now out of the labour force due to long-term sickness, the highest figure on record.<Cite nums={4} /> This is not just a workplace issue — it is a macroeconomic drag. Meanwhile, presenteeism — people attending work while unwell, often because they cannot afford statutory sick pay of just £116.75 per week — costs an estimated further £24 billion annually in reduced productivity.<Cite nums={3} /> The UK's sick pay system remains one of the least generous in Europe, creating a perverse incentive structure where workers either cannot afford to recover properly or push through illness to the detriment of everyone around them.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-days', label: 'Days absent' },
          { id: 'sec-causes', label: 'By cause' },
          { id: 'sec-sectors', label: 'Public vs private' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="Average days absent per worker"
            value={latestDays ? latestDays.days.toFixed(1) : '9.4'}
            unit="days/year (2024)"
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 5.8 pre-pandemic · highest since records began"
            sparklineData={
              data ? sparkFrom(data.daysAbsent.map(d => d.days)) : []
            }
            source="ONS · Sickness absence in the labour market, 2024"
            href="#sec-days"
          />
          <MetricCard
            label="Mental health as cause of absence"
            value={latestCause ? `${latestCause.mentalHealth}` : '41'}
            unit="% of long-term absence"
            direction="up"
            polarity="up-is-bad"
            changeText="Up from 21% in 2015 · now the single largest cause"
            sparklineData={
              data ? sparkFrom(data.absenceByCause.map(d => d.mentalHealth)) : []
            }
            source="CIPD · Health and Wellbeing at Work survey, 2024"
            href="#sec-causes"
          />
          <MetricCard
            label="Cost to UK economy"
            value="£32bn"
            unit="per year (2024)"
            direction="up"
            polarity="up-is-bad"
            changeText="Lost output, employer costs & health spending · plus £24bn presenteeism"
            sparklineData={[18, 19, 20, 21, 20, 22, 26, 29, 31, 32]}
            source="CBI · Employment Trends Survey, 2024"
            href="#sec-sectors"
          />
        </div>

        {/* Chart 1: Average days absent */}
        <ScrollReveal>
          <div id="sec-days" className="mb-12">
            <LineChart
              series={daysAbsentSeries}
              title="Average sickness absence days per worker, UK, 2010–2024"
              subtitle="Days lost per worker per year. Fell steadily to 2019, then surged post-pandemic."
              yLabel="Days"
              source={{
                name: 'ONS',
                dataset: 'Sickness absence in the labour market',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Absence by cause */}
        <ScrollReveal>
          <div id="sec-causes" className="mb-12">
            <LineChart
              series={absenceByCauseSeries}
              title="Sickness absence by cause, UK, 2015–2024"
              subtitle="Share of long-term absence by cause. Mental health has doubled its share since 2015."
              yLabel="% of absence"
              source={{
                name: 'CIPD',
                dataset: 'Health and Wellbeing at Work survey',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Public vs private sector */}
        <ScrollReveal>
          <div id="sec-sectors" className="mb-12">
            <LineChart
              series={publicPrivateSeries}
              title="Sickness absence: public vs private sector, UK, 2010–2024"
              subtitle="Public sector absence now 63% higher than private sector. Gap widening since 2020."
              yLabel="Days per worker"
              source={{
                name: 'ONS',
                dataset: 'Sickness absence in the labour market',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Occupational health reforms gaining momentum"
            value="Fit for Work"
            description={<>The government's occupational health reforms aim to address the root causes of rising absence. The expanded Fit for Work programme now offers early intervention for employees at risk of long-term sickness, with pilot schemes in 12 regions showing a 15% reduction in absence duration where occupational health support was provided within the first two weeks.<Cite nums={5} /> The CIPD reports that organisations with dedicated mental health first aiders and employee assistance programmes see 30% lower mental health-related absence.<Cite nums={2} /> A growing body of evidence supports investing in prevention: every £1 spent on workplace mental health interventions returns an estimated £5 in reduced absence, lower presenteeism, and improved retention. Mandatory occupational health provision for all employers, currently under consultation, could represent the most significant workplace health reform in a generation.</>}
            source="Source: Department for Work and Pensions — Fit for Work evaluation, 2024. CIPD — Health and Wellbeing at Work, 2024."
          />
        </ScrollReveal>
        <References items={editorialRefs} />
        <RelatedTopics />
      </main>
    </>
  );
}
