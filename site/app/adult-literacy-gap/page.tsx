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

// Adults below Level 2 literacy (% of working-age), 2003–2024 — NLT / OECD PIAAC
const literacyPctValues = [19.5, 19.3, 19.2, 19.0, 18.9, 18.8, 18.7, 18.6, 18.5, 18.4, 18.3, 18.2, 18.1, 18.0, 18.0, 17.9, 18.0, 18.0, 18.0, 18.0, 18.0, 18.0];

// Adult education funding real terms £bn, 2010–2024 — Learning and Work Institute
const fundingValues = [4.3, 4.0, 3.7, 3.4, 3.2, 2.9, 2.7, 2.4, 2.2, 2.0, 1.9, 1.8, 1.7, 1.7, 1.7];

// ESOL waiting list (thousands), 2015–2024 — Learning and Work Institute
const esolWaitingValues = [32, 38, 45, 54, 62, 70, 68, 78, 90, 97];

const series1: Series[] = [
  {
    id: 'literacy-pct',
    label: 'Adults below Level 2 (%)',
    colour: '#E63946',
    data: literacyPctValues.map((v, i) => ({ date: new Date(2003 + i, 0, 1), value: v })),
  },
];

const series2: Series[] = [
  {
    id: 'funding',
    label: 'Adult education budget (£bn, real terms)',
    colour: '#264653',
    data: fundingValues.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
  },
  {
    id: 'esol',
    label: 'ESOL waiting list (thousands)',
    colour: '#F4A261',
    data: esolWaitingValues.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
  },
];

const annotations: Annotation[] = [
  { date: new Date(2010, 0, 1), label: '2010: AEB cuts begin' },
  { date: new Date(2012, 0, 1), label: '2012: OECD PIAAC survey' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'OECD', dataset: 'PIAAC Survey of Adult Skills', url: 'https://www.oecd.org/skills/piaac/', date: '2024' },
  { num: 2, name: 'National Literacy Trust', dataset: 'Adult Literacy Statistics', url: 'https://literacytrust.org.uk/research-services/', date: '2024' },
  { num: 3, name: 'Learning and Work Institute', dataset: 'Adult Education Budget Analysis; ESOL Provision Survey', url: 'https://learningandwork.org.uk', date: '2024' },
];

export default function AdultLiteracyGapPage() {
  return (
    <>
      <TopicNav topic="Education & Skills" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Education & Skills"
          question="How many British adults can't read properly?"
          finding="An estimated 8.5 million adults in England — roughly one in six — have literacy skills below Level 2, the standard expected of an 11-year-old. Despite this, adult education funding has been cut by 60% in real terms since 2010, and ESOL waiting lists have tripled."
          colour="#E63946"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain has a hidden literacy crisis. The OECD's Survey of Adult Skills found that England's adults perform below the international average in literacy — and the problem has barely improved in two decades.<Cite nums={1} /> Around 8.5 million working-age adults read at or below Level 1, meaning they can understand short, simple texts but struggle with anything more complex: a tenancy agreement, a medicine leaflet, a letter from their child's school.<Cite nums={2} /> The economic cost is estimated at over £40 billion per year in lost productivity, higher welfare spending, and increased demand on health and justice services.<Cite nums={3} /> Adults with poor literacy are twice as likely to be unemployed, three times more likely to suffer from depression, and significantly more likely to report poor physical health.<Cite nums={1} /></p>
            <p>The damage is intergenerational. Children whose parents have low literacy are themselves far more likely to fall behind at school. Meanwhile, the infrastructure that might break this cycle has been systematically dismantled. Real-terms adult education funding has fallen from £4.3 billion in 2010 to £1.7 billion in 2024 — a 60% cut.<Cite nums={3} /> ESOL (English for Speakers of Other Languages) provision has been hit particularly hard: waiting lists have tripled since 2015, with an estimated 97,000 people now waiting for a place.<Cite nums={3} /> In some London boroughs and northern cities, the wait exceeds two years. For refugees and recent migrants, the inability to access language support creates cascading barriers — to employment, to healthcare, to their children's schooling, and to any meaningful integration.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Literacy levels' },
          { id: 'sec-chart2', label: 'Funding & ESOL' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Adults with poor literacy"
              value="8.5M"
              unit="below Level 2"
              direction="flat"
              polarity="up-is-bad"
              changeText="18% of working-age adults · roughly 1 in 6 · unchanged since 2003"
              sparklineData={literacyPctValues.slice(-8)}
              source="National Literacy Trust · OECD PIAAC 2024"
              href="#sec-chart1"
            />
            <MetricCard
              label="Economic cost of poor literacy"
              value="£40bn"
              unit="per year"
              direction="up"
              polarity="up-is-bad"
              changeText="Lost productivity, welfare, health & justice costs"
              sparklineData={[32, 34, 35, 36, 37, 38, 38, 39, 40, 40]}
              source="Learning and Work Institute · Economic Impact Assessment 2024"
              href="#sec-chart2"
            />
            <MetricCard
              label="Adult education funding"
              value="£1.7bn"
              unit="real terms"
              direction="down"
              polarity="down-is-bad"
              changeText="Cut 60% since 2010 · from £4.3bn"
              sparklineData={fundingValues.slice(-8)}
              source="Learning and Work Institute · Adult Education Budget analysis 2024"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Adults with literacy below Level 2, England, 2003–2024"
              subtitle="Percentage of working-age adults reading below the standard expected of an 11-year-old. Despite two decades of programmes, the rate has barely moved."
              series={series1}
              annotations={annotations}
              yLabel="% below Level 2"
              source={{ name: 'National Literacy Trust / OECD PIAAC', dataset: 'Survey of Adult Skills', url: 'https://www.oecd.org/skills/piaac/', frequency: 'periodic', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Adult education funding and ESOL waiting lists, England, 2010–2024"
              subtitle="AEB funding in real terms (£bn, blue) has halved since 2010. ESOL waiting lists (thousands, amber) have tripled since 2015."
              series={series2}
              annotations={[]}
              yLabel="£bn (funding) / Thousands (ESOL)"
              source={{ name: 'Learning and Work Institute', dataset: 'Adult Education Budget Analysis; ESOL Provision Survey', url: 'https://learningandwork.org.uk', frequency: 'annual', date: '2024' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Read Easy and the National Literacy Trust: building readers one by one"
            value="5,500+"
            unit="volunteer reading coaches"
            description="Read Easy, a national charity, pairs trained volunteer reading coaches with adults who want to learn to read — for free, one-to-one, for as long as it takes. Operating in over 50 communities across England and Wales, they have helped thousands of adults gain functional literacy, often after decades of hiding their difficulty. The National Literacy Trust works across 30 literacy hubs in the most deprived communities. Their evidence shows that targeted community-level intervention can close the literacy gap by up to 6 months within a single year. These organisations demonstrate that the problem is solvable — what is missing is not knowledge of what works, but the funding and political will to deliver it at scale."
            source="Source: Read Easy Annual Report 2024. National Literacy Trust — Literacy Hubs Impact Report 2024."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.oecd.org/skills/piaac/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">OECD — PIAAC Survey of Adult Skills</a> — international adult literacy and numeracy assessment. Includes England-specific data.</p>
            <p><a href="https://learningandwork.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Learning and Work Institute — Adult Education Budget Analysis; ESOL Provision Survey</a> — annual analysis of funding and ESOL waiting lists.</p>
            <p>Level 2 literacy corresponds to GCSE grades 4–9 (former A*–C). Adults below Level 2 can read simple texts but struggle with complex documents. ESOL waiting list figures are estimates based on provider surveys, not administrative data.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
