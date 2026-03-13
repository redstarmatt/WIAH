'use client';

import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import ScrollReveal from '@/components/ScrollReveal';
import PositiveCallout from '@/components/PositiveCallout';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

export default function InsecureWorkPage() {
  const zeroHoursContracts = [174, 250, 586, 697, 744, 801, 883, 896, 974, 1026, 974, 1100];
  const insecureWorkers    = [3.2, 3.5, 3.8, 4.2, 4.6, 5.0, 5.3, 5.8, 6.0, 5.9, 6.1, 6.2];

  const chart1Series: Series[] = [
    {
      id: 'zero-hours',
      label: 'Zero-hours contract workers (thousands)',
      colour: '#F4A261',
      data: zeroHoursContracts.map((v, i) => ({ date: new Date(2013 + i, 0, 1), value: v })),
    },
  ];

  const chart2Series: Series[] = [
    {
      id: 'insecure-workers',
      label: 'Workers in temporary and agency employment (millions)',
      colour: '#6B7280',
      data: insecureWorkers.map((v, i) => ({ date: new Date(2015 + i, 0, 1), value: v })),
    },
  ];

  const chart1Annotations: Annotation[] = [
    { date: new Date(2015, 0, 1), label: '2015: ONS begins formal measurement' },
    { date: new Date(2020, 0, 1), label: '2020: Covid reduces ZHC use temporarily' },
  ];

  const chart2Annotations: Annotation[] = [
    { date: new Date(2017, 0, 1), label: '2017: Taylor Review of Modern Working Practices' },
    { date: new Date(2022, 0, 1), label: '2022: Post-Covid gig economy growth' },
  ];

  return (
    <>
      <TopicNav topic="Insecure Work" />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Insecure Work"
          question="How Many People Are in Insecure Work?"
          finding="Around 6 million people are in insecure work — zero-hours contracts, agency work or bogus self-employment — with low pay, unpredictable hours and few employment rights."
          colour="#F4A261"
          preposition="with"
        />

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Key metrics' },
          { id: 'sec-chart1', label: 'Zero-hours contracts' },
          { id: 'sec-chart2', label: 'Insecure employment' },
        ]} />

        <section id="sec-metrics" className="mt-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              label="Zero-hours contract workers (millions)"
              value="1.1"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 174k in 2013 · 3.4% of the workforce"
              sparklineData={[0.17, 0.25, 0.59, 0.70, 0.74, 0.80, 0.88, 0.90, 0.97, 1.03, 0.97, 1.10]}
              source="ONS — Labour Force Survey 2024"
            />
            <MetricCard
              label="Workers in insecure employment (millions)"
              value="6.2"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 3.2m in 2015 · includes ZHC, agency, involuntary PT"
              sparklineData={[3.2, 3.5, 3.8, 4.2, 4.6, 5.0, 6.2]}
              source="TUC / Resolution Foundation — 2024"
            />
            <MetricCard
              label="Gig economy workers (millions)"
              value="2.8"
              direction="up"
              polarity="up-is-bad"
              changeText="up from 0.5m in 2016 · platforms not liable for employment rights"
              sparklineData={[0.5, 0.8, 1.1, 1.5, 2.0, 2.4, 2.8]}
              source="CIPD Gig Economy Research — 2024"
            />
          </div>
        </section>

        <ScrollReveal>
          <section id="sec-chart1" className="mb-12">
            <LineChart
              title="Zero-hours contract workers, UK 2013–2024 (thousands)"
              subtitle="Workers whose employment contract guarantees no minimum hours. Source: ONS Labour Force Survey."
              series={chart1Series}
              annotations={chart1Annotations}
              yLabel="Workers (thousands)"
              source={{
                name: 'ONS Labour Force Survey',
                dataset: 'Zero-hours contracts — people in employment',
                frequency: 'quarterly',
                url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/datasets/zerohourcontracts',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-chart2" className="mb-12">
            <LineChart
              title="Workers in temporary and agency employment, UK 2015–2024 (millions)"
              subtitle="Includes temporary contracts, agency work, and involuntary part-time employment. Source: TUC / Resolution Foundation."
              series={chart2Series}
              annotations={chart2Annotations}
              yLabel="Workers (millions)"
              source={{
                name: 'TUC / Resolution Foundation',
                dataset: 'Insecure work — temporary and agency employment',
                frequency: 'annual',
                url: 'https://www.tuc.org.uk',
                date: '2024',
              }}
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="What is changing"
            value="Employment Rights Bill 2024"
            unit="2024–2025"
            description="The Employment Rights Bill, introduced in October 2024, proposes to give zero-hours contract workers the right to request guaranteed hours after 12 weeks, end exploitative practices that require workers to be available without pay, and strengthen protections against unfair dismissal from day one. If enacted, this would be the most significant expansion of employment rights in a generation. Full implementation is expected by 2026, though enforcement capacity at HMRC and employment tribunals remains a concern."
            source="Source: DBEIS — Employment Rights Bill 2024; TUC analysis; ONS Labour Force Survey 2024."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="max-w-2xl mb-12">
            <h2 className="text-xl font-bold text-wiah-black mb-4">The data on insecure work</h2>
            <div className="text-base text-wiah-black leading-[1.7] space-y-4">
              <p>Insecure work in the UK has grown substantially since the 2008 financial crisis. Zero-hours contracts — which guarantee no minimum hours and give workers no control over their schedule — rose from around 174,000 in 2013, when the ONS began formally tracking them, to over 1.1 million by 2024. These figures capture only people who describe their main job as a zero-hours contract; the true number affected at any point during the year is substantially higher.</p>
              <p>Beyond zero-hours contracts, the TUC and Resolution Foundation estimate that around 6 million workers are in some form of insecure employment, including agency workers, those on short-term or casual contracts, and workers classified as self-employed while working exclusively for one platform or employer. This last category — sometimes described as bogus or dependent self-employment — strips workers of sick pay, holiday pay, and pension contributions while giving them no guaranteed income. Deliveroo, Uber, and similar platforms have been the most visible examples, though the model is now widespread in logistics, cleaning, and care.</p>
              <p>Insecure work is heavily concentrated in lower-paying sectors and among younger workers, women, and ethnic minorities. Research from the Resolution Foundation finds that insecure workers earn around 25% less per hour than equivalent workers in secure employment, and are significantly more likely to experience in-work poverty and housing instability.</p>
            </div>
          </section>
        </ScrollReveal>

        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid font-mono space-y-2">
            <p><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours/datasets/zerohourcontracts" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">ONS — Zero-hours contracts</a> — Labour Force Survey data. Quarterly. Retrieved 2024.</p>
            <p><a href="https://www.tuc.org.uk" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">TUC — Insecure Work Analysis</a> — includes agency, temporary and involuntary part-time. Annual. Retrieved 2024.</p>
            <p><a href="https://www.cipd.org/uk/knowledge/reports/gig-economy/" target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">CIPD — Gig Economy Research</a> — platform worker estimates. Annual. Retrieved 2024.</p>
            <p>Insecure work encompasses zero-hours contracts, agency and casual work, and involuntary part-time employment. The 6 million estimate is a broad measure and includes some overlap between categories. All figures are for the UK unless otherwise stated.</p>
          </div>
        </section>

        <RelatedTopics />
      </main>
    </>
  );
}
