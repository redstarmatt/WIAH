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
  { num: 1, name: 'Ofcom', dataset: 'Media Nations Report', url: 'https://www.ofcom.org.uk/research-and-data/tv-radio-and-on-demand/media-nations-reports', date: '2024' },
  { num: 2, name: 'Press Gazette', dataset: 'Newspaper Closure Tracker', url: 'https://pressgazette.co.uk/', date: '2024' }
];

export default function MediaPluralityPage() {
  return (
    <>
      <TopicNav topic="Media Plurality" colour="#6B7280" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Media Plurality"
          question="Who owns the news you read?"
          finding="Three media groups own 71% of national newspaper circulation in the UK. Meanwhile, 255 communities now have no regular local news coverage, up from 80 in 2016."
          colour="#6B7280"
          preposition="in"
        />

        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Britain's national press is controlled by a remarkably small number of hands. Three groups — News UK (Murdoch), DMG Media (Rothermere), and Reach plc — between them account for 71% of national newspaper circulation, a concentration ratio that has crept upward as mid-market titles have folded or been absorbed.<Cite nums={1} /> Online, the picture is more fragmented but no less concerning: the same legacy owners dominate digital news reach, while new entrants struggle to build sustainable business models. Ofcom's plurality framework, designed to prevent any single voice from exerting undue influence over public opinion, has not been substantively updated since 2003. The result is a media landscape in which editorial diversity is shrinking even as the platforms for distributing news have multiplied.</p>
            <p>The damage is most visible at the local level. More than 320 local newspapers have closed since 2008, leaving 255 communities — predominantly in post-industrial towns and rural areas — without any regular news coverage at all.<Cite nums={2} /> These "news deserts" are not merely a cultural loss. Research consistently links the absence of local journalism to lower voter turnout, reduced scrutiny of council decisions, and higher levels of corruption in public procurement. The BBC's Local Democracy Reporting Service and a handful of philanthropically funded outlets have attempted to fill the gap, but their combined output is a fraction of what was lost. What remains is a structural asymmetry: national narratives are shaped by a few proprietors, while the granular, place-based reporting that holds local power to account has been hollowed out by the collapse of advertising revenue and a failure to treat local journalism as the civic infrastructure it is.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />

        <section id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          
        <MetricCard
          label="National papers owned by top 3 groups"
          value="71%"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Ofcom · Murdoch, DMG, Reach"
          sparklineData={[62, 65, 66, 67, 68, 69, 70, 70, 71]}
          source="Ofcom — Media Nations 2024"
        />
        <MetricCard
          label="Local news coverage gaps"
          value="255 areas"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Ofcom · No regular local news"
          sparklineData={[80, 110, 145, 175, 195, 215, 235, 248, 255]}
          source="Ofcom 2024"
        />
        <MetricCard
          label="Local newspaper closures (2008-24)"
          value="320+"
          unit=""
          direction="up"
          polarity="up-is-bad"
          changeText="2024 · Press Gazette"
          sparklineData={[10, 30, 60, 95, 140, 185, 230, 275, 310, 320]}
          source="Press Gazette 2024"
        />
        </section>

        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <References items={editorialRefs} />
        </section>

        <RelatedTopics currentSlug="media-plurality" />
      </main>
    </>
  );
}
