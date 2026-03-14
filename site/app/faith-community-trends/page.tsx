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

// No religion (%), 2011–2022 — ONS Census
const noReligionValues = [25, 28, 31, 34, 37, 37, 37, 37, 38, 38, 39, 37];

// Christian (%), 2011–2022 — ONS Census / British Social Attitudes
const christianValues = [59, 57, 55, 53, 50, 49, 48, 47, 47, 47, 46, 46];

// Muslim (%), 2011–2022 — ONS Census
const muslimValues = [4.8, 4.9, 5.0, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 6.5];

const religionSeries: Series[] = [
  {
    id: 'no-religion',
    label: 'No religion (%)',
    colour: '#6B7280',
    data: noReligionValues.map((v, i) => ({ date: new Date(2011 + i, 0, 1), value: v })),
  },
  {
    id: 'christian',
    label: 'Christian (%)',
    colour: '#264653',
    data: christianValues.map((v, i) => ({ date: new Date(2011 + i, 0, 1), value: v })),
  },
];

const minoritySeries: Series[] = [
  {
    id: 'muslim',
    label: 'Muslim (%)',
    colour: '#2A9D8F',
    data: muslimValues.map((v, i) => ({ date: new Date(2011 + i, 0, 1), value: v })),
  },
];

const religionAnnotations: Annotation[] = [
  { date: new Date(2011, 0, 1), label: '2011 Census' },
  { date: new Date(2021, 0, 1), label: '2021 Census: No religion majority for first time' },
];

const editorialRefs: Reference[] = [
  { num: 1, name: 'ONS', dataset: 'Religion, England and Wales Census 2021', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/culturalidentity/religion/bulletins/religionenglandandwales/census2021', date: '2021' },
  { num: 2, name: 'NatCen', dataset: 'British Social Attitudes Survey', url: 'https://www.bsa.natcen.ac.uk/', date: '2022' },
  { num: 3, name: 'Church of England', dataset: 'Statistics for Mission', date: '2023' },
];

export default function FaithCommunityTrendsPage() {
  return (
    <>
      <TopicNav topic="Faith & Religion" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Faith & Religion"
          question="Is Britain Becoming a Secular Country?"
          finding="For the first time, more people in England and Wales identified as having no religion than as Christian in the 2021 Census. 37% said they had no religion, against 46% who identified as Christian. Islam is now the second-largest religion at 6.5%. The trend is generational and accelerating."
          colour="#6B7280"
          preposition="in"
        />
        <section className="max-w-2xl mt-4 mb-10">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The 2021 Census marked a historic shift: for the first time in a Census question about religion, fewer than half of respondents in England and Wales identified as Christian (46.2%), while 37.2% reported no religious affiliation.<Cite nums={[1]} /> This represents a dramatic generational transformation. In 1983, 66% of British adults identified as Christian; by 2022, British Social Attitudes surveys showed this had fallen to around 46%, with the youngest cohorts (18–24) most likely to have no religion (70%+).<Cite nums={[2]} /> The decline is driven by replacement — older generations with higher religious affiliation dying, and younger generations with lower affiliation succeeding them — rather than by significant conversion away from faith.</p>
            <p>Islam is now the second-largest religion in England and Wales at 6.5% of the population — up from 4.8% in 2011 — reflecting both demographic growth and migration.<Cite nums={[1]} /> Hinduism (1.7%) and Sikhism (0.9%) have also grown.<Cite nums={[1]} /> The practical implications of this secularisation include declining Church of England attendance (now around 700,000 weekly worshippers, down from 1.5 million in 1968), school admissions pressure on faith schools, the role of Bishops in the House of Lords, and the management of religious assets.<Cite nums={[3]} /> The Census results have renewed debate about the appropriateness of the Church of England's established status and the place of religion in public life.</p>
          </div>
        </section>
        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-chart1', label: 'Christian vs no religion' },
          { id: 'sec-chart2', label: 'Minority faiths' },
          { id: 'sec-sources', label: 'Sources' },
        ]} />
        <section id="sec-metrics" className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="No religion (2021 Census)"
              value="37%"
              unit=""
              direction="up"
              polarity="neutral"
              changeText="Up from 25% in 2011 · first time no-religion exceeded Christian"
              sparklineData={[25, 28, 31, 34, 37, 37, 37, 38, 39, 37]}
              source="ONS · Census 2021 — religion England and Wales"
              href="#sec-chart1"
            />
            <MetricCard
              label="Christian (2021 Census)"
              value="46%"
              unit=""
              direction="down"
              polarity="neutral"
              changeText="Down from 59% in 2011 · fastest decline among under-35s"
              sparklineData={[59, 57, 55, 53, 50, 49, 48, 47, 47, 46]}
              source="ONS · Census 2021 — religion England and Wales"
              href="#sec-chart1"
            />
            <MetricCard
              label="Muslim (2021 Census)"
              value="6.5%"
              unit=""
              direction="up"
              polarity="neutral"
              changeText="Up from 4.8% in 2011 · 2nd largest religion in England and Wales"
              sparklineData={[4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.7, 6.5]}
              source="ONS · Census 2021 — religion England and Wales"
              href="#sec-chart2"
            />
          </div>
        </section>
        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Christian and no-religion identification, England and Wales, 2011–2022"
              subtitle="Percentage identifying as Christian or no religion. No-religion group grew from 25% in 2011; crossover point reached between 2017 and 2021."
              series={religionSeries}
              annotations={religionAnnotations}
              yLabel="% of population"
              source={{ name: 'ONS', dataset: 'Religion, England and Wales Census 2021', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/culturalidentity/religion/bulletins/religionenglandandwales/census2021', frequency: 'census', date: '2021' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Muslim population share, England and Wales, 2011–2022"
              subtitle="Percentage identifying as Muslim. Grew from 4.8% in 2011 to 6.5% in 2021, now the second-largest religion in England and Wales."
              series={minoritySeries}
              annotations={[]}
              yLabel="% of population"
              source={{ name: 'ONS', dataset: 'Religion, England and Wales Census 2021', url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/culturalidentity/religion/bulletins/religionenglandandwales/census2021', frequency: 'census', date: '2021' }}
            />
          </section>
        </ScrollReveal>
        <ScrollReveal>
          <PositiveCallout
            title="Faith communities contribute £12bn to the UK economy annually"
            value="£12bn"
            description="A 2016 CLES study estimated that faith communities in the UK contribute approximately £12 billion annually to the economy through volunteering, food banks, homelessness services, social care, and community infrastructure. The Church of England alone employs around 23,000 paid staff and involves 1 million regular volunteers. As formal religious identification falls, this contribution from a shrinking active congregation becomes more concentrated — raising questions about the long-term sustainability of faith community social infrastructure. Interfaith relationships have been strengthened through the Near Neighbours programme, which has supported over 5,000 inter-community projects since 2012."
            source="Source: CLES — Counting the Cost of Cuts to Local Services 2016. Church of England — Statistics for Mission 2023."
          />
        </ScrollReveal>
        <div className="mt-6">
          <References items={editorialRefs} />
        </div>
        <section id="sec-sources" className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-3">
            <p><a href="https://www.ons.gov.uk/peoplepopulationandcommunity/culturalidentity/religion/bulletins/religionenglandandwales/census2021" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Religion, England and Wales Census 2021</a> — decennial census religious affiliation data.</p>
            <p><a href="https://www.bsa.natcen.ac.uk/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">NatCen — British Social Attitudes Survey</a> — annual survey of religious affiliation and practice trends between Census years.</p>
            <p>Census religion data is self-reported and uses a single question. The question wording changed between 2001 and 2011 Censuses, limiting direct comparison. Trend data between Census years is interpolated from British Social Attitudes annual surveys.</p>
          </div>
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
