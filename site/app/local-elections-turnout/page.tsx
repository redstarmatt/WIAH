'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';
import References, { Reference } from '@/components/References';
import Cite from '@/components/Cite';

const editorialRefs: Reference[] = [
  { num: 1, name: 'Electoral Commission', dataset: 'Local Election Data', url: 'https://www.electoralcommission.org.uk/', date: '2024' },
  { num: 2, name: 'Democratic Audit UK', dataset: 'State of Democracy', url: 'https://www.democraticaudit.com/', date: '2024' }
];

export default function LocalElectionsTurnoutPage() {
  return (
    <>
      <TopicNav topic="Local Election Turnout" colour="#6B7280" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Local Election Turnout"
          question="Does anyone vote in local elections?"
          finding="Average local election turnout has fallen from 41% in 2000 to 34% in 2024. With 7.4% of council seats now uncontested, democratic accountability at local level is weakening."
          colour="#6B7280"
          preposition="in"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Local government in England controls roughly a quarter of total public spending — around £120 billion annually — yet the average turnout in local elections has fallen from 41% in 2000 to just 34% in 2024. In some wards, particularly in metropolitan boroughs, turnout dips below 20%, meaning that councillors making decisions about housing, social care, planning, and local transport are elected by fewer than one in five eligible voters.<Cite nums={1} /> The consequences are not abstract. Low turnout concentrates political power among older, wealthier, homeowning demographics who vote more reliably, producing councils that are systematically less responsive to the needs of younger residents, renters, and lower-income communities. The Electoral Commission has noted that awareness of local elections is consistently lower than for general elections, with many voters unable to name their local councillor or identify what powers their council holds. This is partly a media problem — the contraction of local journalism means that council decisions increasingly go unreported — and partly a structural one: the complexity of English local government, with its overlapping tiers of districts, counties, unitaries, and combined authorities, makes it genuinely difficult for voters to know who is responsible for what.</p>
            <p>The candidate pipeline is drying up alongside voter participation. In 2024, 7.4% of council seats were uncontested — meaning a single candidate stood and was elected without a vote being cast — up from 5.2% in 2015.<Cite nums={2} /> The problem is most acute in rural areas and in wards held by dominant parties where the opposition has given up fielding candidates. Councillor demographics tell their own story: the average age of a councillor in England is 60, over 60% are male, and 96% are white — a profile that bears little resemblance to the communities being represented. Postal voting has partially offset in-person decline, now accounting for 28% of all votes cast in local elections, but this reflects convenience rather than enthusiasm. The deeper question is whether local democracy in England is entering a self-reinforcing decline: low turnout reduces the perceived legitimacy of councils, which reduces media and public attention, which further depresses turnout, until local government becomes an increasingly technocratic exercise conducted largely out of public view.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="Average local election turnout"
          value="34%"
          unit=""
          direction="down"
          polarity="up-is-good"
          changeText="2024 · Electoral Commission · Down from 41% in 2000"
          sparklineData={[41, 39, 38, 37, 36, 35, 35, 34, 34]}
          source="Electoral Commission — Local Election Data 2024"
        />
        <MetricCard
          label="Postal votes as % of votes cast"
          value="28%"
          unit=""
          direction="up"
          polarity="up-is-good"
          changeText="2024 · Electoral Commission · Up from 15% in 2010"
          sparklineData={[15, 17, 19, 20, 22, 24, 25, 26, 27, 28]}
          source="Electoral Commission 2024"
        />
        <MetricCard
          label="Uncontested council seats"
          value="7.4%"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Democratic Audit · Candidate recruitment crisis"
          sparklineData={[5.2, 5.5, 5.8, 6.0, 6.2, 6.5, 6.8, 7.0, 7.2, 7.4]}
          source="Democratic Audit UK 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="local-elections-turnout" />
      </main>
    </>
  );
}
