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

const editorialRefs: Reference[] = [
  { num: 1, name: 'Ofcom', dataset: 'Children and Parents Media Use and Attitudes report', url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/adults-media-use-and-attitudes/children-and-parents-media-use-and-attitudes', date: '2024' },
  { num: 2, name: "Children's Commissioner", dataset: 'Growing Up Digital — Online harms report', date: '2022', url: 'https://www.gov.uk/government/organisations/ofsted/about/statistics' },
  { num: 3, name: 'Internet Watch Foundation', dataset: 'Annual Report — CSAM reports actioned', url: 'https://www.iwf.org.uk/annual-report/', date: '2024' },
  { num: 4, name: 'Ofcom', dataset: 'Online Safety Act implementation', url: 'https://www.ofcom.org.uk/online-safety', date: '2024' },
];

export default function OnlineHarmsPage() {
  const csamReports       = [61.5, 80.0, 98.0, 121.0, 130.0, 122.0, 156.0];
  const harmfulContentPct = [45.0, 52.0, 60.0, 65.0, 68.0, 71.0, 74.0];
  const selfHarmContent   = [15.0, 20.0, 28.0, 34.0, 40.0, 43.0, 46.0];
  const hateSpeech        = [25.0, 30.0, 35.0, 40.0, 44.0, 46.0, 48.0];
  const misinformation    = [20.0, 25.0, 32.0, 38.0, 42.0, 45.0, 47.0];

  const chart1Series: Series[] = [
    {
      id: 'csam-reports',
      label: 'Online CSAM reports to IWF (thousands)',
      colour: '#E63946',
      data: csamReports.map((v, i) => ({ date: new Date(2018 + i, 0, 1), value: v })),
    },
  ];

  const chart2Series: Series[] = [
    {
      id: 'harmful-content',
      label: 'Children exposed to any harmful content (%)',
      colour: '#E63946',
      data: harmfulContentPct.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
    {
      id: 'self-harm',
      label: 'Children exposed to self-harm content (%)',
      colour: '#F4A261',
      data: selfHarmContent.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
    {
      id: 'hate-speech',
      label: 'Children exposed to hate speech (%)',
      colour: '#6B7280',
      data: hateSpeech.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
    {
      id: 'misinfo',
      label: 'Children exposed to misinformation (%)',
      colour: '#264653',
      data: misinformation.map((v, i) => ({ date: new Date(2019 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Covid — children online dramatically more' },
    { date: new Date(2023, 0, 1), label: '2023: Online Safety Act receives Royal Assent' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2020, 0, 1), label: '2020: Lockdown — screen time doubles' },
    { date: new Date(2024, 0, 1), label: '2024: Ofcom begins OSA enforcement' },
  ];

  return (
    <>
      <TopicNav topic="Online Harms" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Online Harms"
          question="What Are Online Harms Actually Doing to Young People?"
          finding="74% of children aged 9–17 have seen harmful content online — self-harm content, extreme content and grooming are the top risks — and the Online Safety Act is only now coming into force."
          colour="#E63946"
          preposition="in"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-chart1', label: 'CSAM reports' },
          { id: 'sec-chart2', label: "Children's exposure" },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Children exposed to harmful content (%)"
              value="74"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 45% in 2019 · 9–17 year olds · Ofcom Children's Media Use"
              sparklineData={[45, 52, 60, 65, 68, 71, 74]}
              source="Ofcom — Children and Parents Media Use 2024"
            />
            <MetricCard
              label="Reports of online CSAM (thousands/yr)"
              value="156"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 61k in 2018 · Internet Watch Foundation 2024"
              sparklineData={[61, 80, 98, 121, 130, 122, 156]}
              source="Internet Watch Foundation — Annual Report 2024"
            />
            <MetricCard
              label="Platforms live to Online Safety Act (count)"
              value="34"
              direction="up"
              polarity="up-is-good"
              changeText="of 100+ in-scope platforms · Ofcom enforcement began Jan 2024"
              sparklineData={[0, 0, 0, 0, 0, 10, 34]}
              source="Ofcom — Online Safety Act implementation 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Online CSAM reports to Internet Watch Foundation 2018–2024 (thousands)"
              subtitle="Reports of child sexual abuse material (CSAM) actioned by the IWF. Reflects both increased prevalence and increased reporting capacity. Source: IWF Annual Reports."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Reports (thousands)"
              source={{
                name: 'Internet Watch Foundation',
                dataset: 'IWF Annual Report — CSAM reports actioned',
                frequency: 'annual',
                url: 'https://www.iwf.org.uk/annual-report/',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Children's exposure to harmful content by type 2019–2024 (%)"
              subtitle="Share of children aged 9–17 who encountered each category of harmful content online in the past year. Source: Ofcom Children and Parents Media Use survey."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Children exposed (%)"
              source={{
                name: 'Ofcom',
                dataset: "Children and Parents Media Use and Attitudes report",
                frequency: 'annual',
                url: 'https://www.ofcom.org.uk/research-and-data/telecoms-research/adults-media-use-and-attitudes/children-and-parents-media-use-and-attitudes',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What has changed"
            value="Online Safety Act 2023"
            unit="Royal Assent October 2023"
            description="The Online Safety Act received Royal Assent in October 2023 after five years of parliamentary debate. It places new duties on platforms to assess and mitigate risks to children, requires the largest platforms to remove illegal content proactively, and gives Ofcom the power to fine non-compliant platforms up to 10% of global turnover or £18m. Age verification requirements for pornography sites and child protection codes for social media are among the specific measures. Ofcom began enforcement from January 2024. The Act is the most significant regulation of online platforms in UK history — though critics argue enforcement capacity and the scope of 'legal but harmful' content provisions remain insufficient."
            source="Source: Ofcom — Online Safety Act implementation; DCMS — Online Safety Act 2023 explanatory notes; IWF — Annual Report 2024."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on online harms</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>The scale of harmful content encountered by children online has grown dramatically in the past decade and accelerated sharply during the Covid pandemic. Ofcom's annual Children and Parents Media Use survey found that 74% of children aged 9–17 had encountered at least one category of harmful content online<Cite nums={1} /> — including self-harm, pornography, violent content, hate speech, or content promoting eating disorders — in the previous year. The survey has been running since 2019; exposure has risen in every measured category in every year. This is not marginal; it is the majority experience of childhood online in the UK.</p>
              <p>Self-harm and suicide content represents a particular concern. Research from the Samaritans and the Children's Commissioner has found that recommendation algorithms on TikTok, YouTube, and Instagram can serve increasingly extreme self-harm content to vulnerable young people within minutes of a first exposure. A 2022 report by the Children's Commissioner found that a 13-year-old creating a new account and expressing the mildest interest in mental health topics would be served graphic self-harm content within hours.<Cite nums={2} /> Causal evidence linking social media use to mental health outcomes is contested, but evidence that algorithmic amplification concentrates harmful content toward vulnerable users is strong.</p>
              <p>Child sexual abuse material (CSAM) online has grown at an alarming rate. The Internet Watch Foundation — which identifies and removes CSAM from the internet — actioned reports of 156,000 individual pieces of content in 2024, up from 61,000 in 2018.<Cite nums={3} /> The organisation estimates that around 30% of all known CSAM URLs are now AI-generated, representing a new and qualitatively different threat.<Cite nums={3} /> Law enforcement capacity to investigate online child abuse has not kept pace with the scale of the problem.</p>
            </div>

            <div className="mt-6">
              <References items={editorialRefs} />
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ofcom.org.uk/research-and-data/telecoms-research/adults-media-use-and-attitudes/children-and-parents-media-use-and-attitudes" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofcom — Children and Parents Media Use and Attitudes</a> — harmful content exposure survey. Annual. Retrieved 2024.</p>
            <p><a href="https://www.iwf.org.uk/annual-report/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Internet Watch Foundation — Annual Report</a> — CSAM reports actioned. Annual. Retrieved 2024.</p>
            <p><a href="https://www.ofcom.org.uk/online-safety" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">Ofcom — Online Safety</a> — Online Safety Act implementation and platform compliance data. Retrieved 2024.</p>
            <p>Harmful content exposure figures are from self-reported survey data (children aged 9–17). CSAM figures reflect reports actioned by IWF — actual prevalence is substantially higher. Platform compliance figures reflect Ofcom's published list of platforms that have completed initial risk assessments under the OSA as of March 2024.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
