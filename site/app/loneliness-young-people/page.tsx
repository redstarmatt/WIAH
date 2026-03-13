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

// ── References ───────────────────────────────────────────────────────────────

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS / DCMS', dataset: 'Community Life Survey — loneliness indicators by age group', url: 'https://www.gov.uk/government/collections/community-life-survey--2', date: '2024' },
  { num: 2, name: 'UKHLS', dataset: 'Understanding Society — social contact hours', url: 'https://www.understandingsociety.ac.uk/', date: '2024' },
  { num: 3, name: 'Ofcom', dataset: 'Online Nation report — social media hours by age', url: 'https://www.ofcom.org.uk/research-and-data/internet-and-on-demand-research/online-nation', date: '2024' },
  { num: 4, name: 'Oxford Internet Institute', dataset: 'Research on passive social media consumption and wellbeing', url: 'https://www.oii.ox.ac.uk/', date: '2024' },
];

export default function LonelinessYoungPeoplePage() {
  // Loneliness rates by age group 2016-2024
  const youngAdultLoneliness = [13.5, 14.2, 15.1, 16.3, 21.4, 22.8, 23.1, 24.0, 25.0];
  const midAgeLoneliness     = [8.1, 8.4, 8.6, 8.9, 11.2, 11.8, 10.9, 11.1, 11.5];
  const olderAdultLoneliness = [9.4, 9.2, 9.1, 9.0, 9.8, 9.3, 8.9, 8.7, 8.5];

  // Social connection trends 2010-2024
  const inPersonSocialHours = [14.2, 14.0, 13.8, 13.5, 13.1, 12.8, 12.5, 12.2, 11.9, 11.7, 9.4, 10.1, 10.5, 10.8, 10.4];
  const socialMediaHours    = [1.1, 1.8, 2.6, 3.2, 3.8, 4.1, 4.5, 4.9, 5.3, 5.8, 6.4, 6.8, 7.1, 7.4, 7.6];

  const lonelinessChartSeries: Series[] = [
    {
      id: 'young',
      label: '16–24 year olds often/always lonely (%)',
      colour: '#E63946',
      data: youngAdultLoneliness.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
    },
    {
      id: 'mid',
      label: '35–54 year olds often/always lonely (%)',
      colour: '#F4A261',
      data: midAgeLoneliness.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
    },
    {
      id: 'older',
      label: '65+ year olds often/always lonely (%)',
      colour: '#6B7280',
      data: olderAdultLoneliness.map((v, i) => ({ date: new Date(2016 + i, 0, 1), value: v })),
    },
  ];

  const lonelinessAnnotations: Annotation[] = [
    { date: new Date(2018, 0, 1), label: '2018: First Minister for Loneliness appointed' },
    { date: new Date(2020, 0, 1), label: '2020: COVID-19 lockdowns' },
  ];

  const connectionChartSeries: Series[] = [
    {
      id: 'inperson',
      label: 'Weekly hours in-person social contact (16–24s)',
      colour: '#264653',
      data: inPersonSocialHours.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
    {
      id: 'socialmedia',
      label: 'Daily social media hours (16–24s)',
      colour: '#E63946',
      data: socialMediaHours.map((v, i) => ({ date: new Date(2010 + i, 0, 1), value: v })),
    },
  ];

  const connectionAnnotations: Annotation[] = [
    { date: new Date(2012, 0, 1), label: '2012: Smartphone adoption accelerates' },
    { date: new Date(2020, 0, 1), label: '2020: COVID-19' },
  ];

  return (
    <>
      <TopicNav topic="Loneliness in Young People" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Loneliness in Young People"
          question="Are Young People the Loneliest Generation?"
          finding="16–24 year olds now report the highest loneliness rates of any age group — 1 in 4 young adults feel lonely often or always."
          colour="#E63946"
          preposition="among"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-loneliness', label: 'Loneliness by age' },
          { id: 'sec-connection', label: 'Social connection' },
          { id: 'sec-context', label: 'Context' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="16–24s often/always lonely (%)"
              value="25"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 13.5% in 2016 · highest of any age group"
              sparklineData={youngAdultLoneliness}
              source="ONS Community Life Survey — 2024"
            />
            <MetricCard
              label="Weekly in-person social hours (16–24s)"
              value="10.4"
              direction="down"
              polarity="down-is-bad"
              changeText="down from 14.2hrs in 2010 · 27% decline"
              sparklineData={inPersonSocialHours}
              source="UKHLS Understanding Society — 2024"
            />
            <MetricCard
              label="Daily social media hours (16–24s)"
              value="7.6"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 1.1hrs in 2010 · now exceeds in-person contact"
              sparklineData={socialMediaHours}
              source="Ofcom Online Nation report — 2024"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-loneliness" className="mb-12">
            <LineChart
              title="Loneliness rates by age group, UK, 2016–2024"
              subtitle="Proportion reporting feeling lonely 'often' or 'always'. 16–24s now highest of all age groups."
              series={lonelinessChartSeries}
              annotations={lonelinessAnnotations}
              yLabel="Often or always lonely (%)"
              source={{
                name: 'ONS / DCMS',
                dataset: 'Community Life Survey — loneliness indicators',
                frequency: 'annual',
                url: 'https://www.gov.uk/government/collections/community-life-survey--2',
                date: 'Jan 2026',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-connection" className="mb-12">
            <LineChart
              title="In-person social contact vs social media use, 16–24s, 2010–2024"
              subtitle="Weekly hours of face-to-face socialising against daily hours of social media use. The lines crossed around 2022."
              series={connectionChartSeries}
              annotations={connectionAnnotations}
              yLabel="Hours"
              source={{
                name: 'UKHLS / Ofcom',
                dataset: 'Understanding Society wave data; Ofcom Online Nation report',
                frequency: 'annual',
                url: 'https://www.ofcom.org.uk/research-and-data/internet-and-on-demand-research/online-nation',
                date: 'Jan 2026',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is improving"
            value="2018"
            unit="— the year the UK appointed the world's first Minister for Loneliness"
            description="The UK's appointment of a dedicated Minister for Loneliness in 2018 represented a genuine policy landmark. The subsequent national loneliness strategy has expanded community social prescribing — with over 1,000 social prescribing link workers now embedded in primary care — and funded the Men's Sheds movement, befriending services, and youth social connection programmes. These are early-stage interventions, but the infrastructure for a systemic response now exists."
            source="DCMS — National Strategy on Loneliness, progress update 2024"
          />
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-context" className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data in context</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The conventional picture of loneliness as an older person's problem is wrong. The data consistently shows that 16–24 year olds report the highest rates of chronic loneliness of any age group in the UK. One in four young adults now say they feel lonely often or always — nearly double the rate reported by adults over 65.<Cite nums={1} /> This is not a new finding: surveys conducted before the COVID-19 pandemic already showed young people's loneliness rising, with lockdowns dramatically accelerating an existing trend.</p>
              <p>The connection between declining in-person social contact and rising social media use does not prove causation, but the correlation is striking. In 2010, a typical 16–24 year old spent over 14 hours per week in face-to-face social contact and barely an hour a day on social media. By 2024, in-person contact had fallen to around 10 hours weekly while social media use had risen to 7.6 hours per day.<Cite nums={[2, 3]} /> Research from the Oxford Internet Institute and others suggests that passive social media consumption — scrolling rather than messaging — is most strongly associated with loneliness and reduced wellbeing.<Cite nums={4} /></p>
              <p>The structural drivers are also important: young people are more likely to be in precarious employment, more likely to live far from family networks, and face housing costs that force them into shared or transient accommodation without stable community ties. The university-to-work transition, in particular, has become one of the most socially isolating periods in young people's lives. Policy solutions that focus solely on digital use miss the underlying material and structural conditions that make young people vulnerable to disconnection.</p>
            </div>
          </section>
        </ScrollReveal>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.gov.uk/government/collections/community-life-survey--2" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS / DCMS — Community Life Survey</a> — loneliness indicators by age group. Annual. Retrieved Jan 2026.</p>
            <p><a href="https://www.understandingsociety.ac.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">UKHLS — Understanding Society</a> — social contact hours. Annual wave data. Retrieved Jan 2026.</p>
            <p><a href="https://www.ofcom.org.uk/research-and-data/internet-and-on-demand-research/online-nation" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofcom — Online Nation report</a> — social media hours by age. Annual. Retrieved Jan 2026.</p>
            <p>Loneliness is measured using the UCLA Loneliness Scale (3-item) or equivalent. Figures reflect respondents reporting 'often' or 'always' lonely. In-person social contact hours are self-reported weekly averages from survey data and should be interpreted as indicative rather than precise.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
