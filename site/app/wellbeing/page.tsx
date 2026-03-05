'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

// ── Types ────────────────────────────────────────────────────────────────────

interface LifeSatisfactionPoint {
  year: string;
  avgScore: number;
  highPct: number;
}

interface AnxietyPoint {
  year: string;
  avgScore: number;
  highPct: number;
}

interface LonelinessPoint {
  year: number;
  oftenLonelyPct: number;
}

interface WorthwhilePoint {
  year: string;
  avgScore: number;
}

interface WellbeingData {
  topic: string;
  national: {
    lifeSatisfaction: {
      timeSeries: LifeSatisfactionPoint[];
      latestYear: string;
      latestAvg: number;
    };
    anxiety: {
      timeSeries: AnxietyPoint[];
      latestYear: string;
      latestHighPct: number;
    };
    loneliness: {
      timeSeries: LonelinessPoint[];
      latestYear: number;
      latestPct: number;
    };
    worthwhile: {
      timeSeries: WorthwhilePoint[];
      latestYear: string;
      latestAvg: number;
    };
  };
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function apsYearToDate(y: string): Date {
  // "2011/12" → new Date(2011, 3, 1) (April = financial year)
  const start = parseInt(y.split('/')[0]);
  return new Date(start, 3, 1);
}

function yearToDate(y: number): Date {
  return new Date(y, 0, 1);
}

// ── Component ────────────────────────────────────────────────────────────────

export default function WellbeingPage() {
  const [data, setData] = useState<WellbeingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/wellbeing/wellbeing.json')
      .then((res) => res.json())
      .then((json: WellbeingData) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load wellbeing data:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  // ── Series ────────────────────────────────────────────────────────────────

  const lifeSatisfactionSeries: Series[] = [
    {
      id: 'life-satisfaction',
      label: 'Life satisfaction (0–10)',
      colour: '#264653',
      data: data.national.lifeSatisfaction.timeSeries.map((p) => ({
        date: apsYearToDate(p.year),
        value: p.avgScore,
      })),
    },
  ];

  const anxietySeries: Series[] = [
    {
      id: 'anxiety',
      label: 'High anxiety (%)',
      colour: '#E63946',
      data: data.national.anxiety.timeSeries.map((p) => ({
        date: apsYearToDate(p.year),
        value: p.highPct,
      })),
    },
  ];

  const lonelinessSeries: Series[] = [
    {
      id: 'loneliness',
      label: 'Often lonely (%)',
      colour: '#F4A261',
      data: data.national.loneliness.timeSeries.map((p) => ({
        date: yearToDate(p.year),
        value: p.oftenLonelyPct,
      })),
    },
  ];

  const worthwhileSeries: Series[] = [
    {
      id: 'worthwhile',
      label: 'Sense of worthwhile (0–10)',
      colour: '#2A9D8F',
      data: data.national.worthwhile.timeSeries.map((p) => ({
        date: apsYearToDate(p.year),
        value: p.avgScore,
      })),
    },
  ];

  // ── Annotations ──────────────────────────────────────────────────────────

  const lifeSatisfactionAnnotations: Annotation[] = [
    {
      date: new Date(2020, 3, 1),
      label: '2020: COVID lockdowns',
    },
  ];

  const anxietyAnnotations: Annotation[] = [
    {
      date: new Date(2020, 3, 1),
      label: '2020: Pandemic peak 30.4%',
    },
  ];

  return (
    <main>
      <TopicNav topic="Wellbeing" />

      <TopicHeader
        topic="Wellbeing"
        question="Are People in Britain Actually Happy?"
        finding="Life satisfaction has fallen below pre-pandemic levels, anxiety is higher than at any time since records began, and one in four adults now feels lonely. After peaking in 2018/19, British wellbeing has been in steady decline."
        colour="#2A9D8F"
      />

      {/* Metric Cards */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ScrollReveal>
            <MetricCard
              label="Life satisfaction (0–10)"
              value="7.45"
              direction="down"
              polarity="up-is-good"
              changeText="2023/24 &middot; Peak 7.56 in 2018/19 &middot; COVID knocked it below pre-pandemic trend"
              sparklineData={[7.41, 7.46, 7.52, 7.56, 7.52, 7.36, 7.51, 7.48, 7.45]}
            />
          </ScrollReveal>

          <ScrollReveal>
            <MetricCard
              label="High anxiety"
              value="26.5%"
              direction="up"
              polarity="up-is-bad"
              changeText="2023/24 &middot; Was 23.1% pre-pandemic &middot; 1 in 4 adults"
              sparklineData={[20.0, 21.3, 22.9, 23.1, 30.4, 24.8, 25.7, 26.5]}
            />
          </ScrollReveal>

          <ScrollReveal>
            <MetricCard
              label="Often lonely"
              value="7.8%"
              direction="up"
              polarity="up-is-bad"
              changeText="2024 &middot; ~4M adults &middot; Up from 5% in 2018 &middot; Young adults most affected"
              sparklineData={[5.0, 5.0, 5.0, 7.2, 6.3, 7.1, 7.4, 7.8]}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Charts */}
      <section id="sec-charts" className="max-w-5xl mx-auto px-6 py-16 space-y-20">
        <ScrollReveal>
          <LineChart
            title="Life satisfaction, UK, 2011–2024"
            subtitle="Mean score out of 10. ONS Annual Population Survey. Peaked in 2018/19 at 7.56; fell sharply during COVID; still below pre-pandemic peak."
            series={lifeSatisfactionSeries}
            annotations={lifeSatisfactionAnnotations}
            yLabel="Life satisfaction (0–10)"
            source={{
              name: 'ONS',
              dataset: 'Personal well-being in the UK',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing/bulletins/measuringnationalwellbeing/latest',
            }}
          />
        </ScrollReveal>

        <ScrollReveal>
          <LineChart
            title="Adults reporting high anxiety, UK, 2011–2024"
            subtitle="Percentage scoring 6–10 on anxiety (0–10 scale). One in four adults now reports high anxiety &mdash; up from one in five in 2011."
            series={anxietySeries}
            annotations={anxietyAnnotations}
            yLabel="High anxiety (%)"
            source={{
              name: 'ONS',
              dataset: 'Personal well-being in the UK',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing/bulletins/measuringnationalwellbeing/latest',
            }}
          />
        </ScrollReveal>

        <ScrollReveal>
          <LineChart
            title="Adults often feeling lonely, UK, 2016–2024"
            subtitle="Percentage of adults who often or always feel lonely. Has risen from 5% in 2016 to 7.8% in 2024 &mdash; roughly 4 million people."
            series={lonelinessSeries}
            yLabel="Often lonely (%)"
            source={{
              name: 'DCMS',
              dataset: 'Community Life Survey',
              frequency: 'annual',
              url: 'https://www.gov.uk/government/statistics/community-life-survey-202223',
            }}
          />
        </ScrollReveal>

        <ScrollReveal>
          <LineChart
            title="Sense of worthwhile life, UK, 2011–2024"
            subtitle="Mean score out of 10. Reflects people&apos;s sense of meaning and purpose. More resilient than life satisfaction; dropped less during COVID."
            series={worthwhileSeries}
            yLabel="Worthwhile (0–10)"
            source={{
              name: 'ONS',
              dataset: 'Personal well-being in the UK',
              frequency: 'annual',
              url: 'https://www.ons.gov.uk/peoplepopulationandcommunity/wellbeing/bulletins/measuringnationalwellbeing/latest',
            }}
          />
        </ScrollReveal>
      </section>

      {/* Context */}
      <section id="sec-context" className="max-w-4xl mx-auto px-6 py-16 space-y-6 text-wiah-black leading-relaxed">
        <p>
          The ONS surveys roughly 300,000 adults each year across four dimensions scored on a 0&ndash;10 scale. Life satisfaction rose from 7.41 in 2011/12 to a peak of 7.56 in 2018/19, fell to 7.36 during COVID, and sat at 7.45 in 2023/24 &mdash; still below its pre-pandemic peak. Anxiety moved in the opposite direction: the share of adults classified as high anxiety rose from 20% before the pandemic to 30.4% at its COVID peak, and by 2023/24 had only eased to 26.5% &mdash; one in four adults. The 2022 cost-of-living crisis compounded the damage, pushing the average anxiety score from 3.08 in 2021/22 to 3.22 in 2023/24 as energy bills doubled.
        </p>

        <p>
          Loneliness has worsened despite dedicated policy attention. The share of adults reporting they often or always feel lonely rose from 5% in 2016&ndash;2019 to 7.8% in 2024 &mdash; roughly 4 million people &mdash; with young adults aged 16&ndash;24 and those over 75 recording the highest rates. The government appointed a Minister for Loneliness in 2018 and expanded social prescribing, yet the trajectory has not changed; the Campaign to End Loneliness estimates the annual cost at &pound;6.4 billion in lost productivity and NHS demand. The direction across all four wellbeing measures has been consistently downward since 2019.
        </p>
      </section>

      {/* Positive Callout */}
      <section id="sec-positive" className="max-w-4xl mx-auto px-6 py-12">
        <PositiveCallout
          title="What&apos;s improving"
          value="7.85→7.74"
          unit="sense of worthwhile life remains high"
          description="Despite anxiety and loneliness rising, the proportion of UK adults who feel their life is worthwhile remains above 77%. This measure &mdash; unique to the ONS national wellbeing framework &mdash; reflects people&apos;s broader sense of meaning and purpose. It has proved more resilient than life satisfaction and dropped less sharply during COVID."
          source="Source: ONS &mdash; Personal well-being in the UK, Annual Population Survey 2023/24."
        />
      </section>

      {/* Sources */}
      <section id="sec-sources" className="max-w-4xl mx-auto px-6 py-16 border-t border-wiah-border">
        <h3 className="font-bold text-wiah-black mb-6">Sources and methodology</h3>
        <div className="space-y-4 text-sm text-wiah-mid font-mono">
          {data.metadata.sources.map((src, idx) => (
            <div key={idx}>
              <p className="font-bold text-wiah-black">{src.name}</p>
              <p>
                <a
                  href={src.url}
                  className="text-wiah-blue hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {src.dataset}
                </a>
              </p>
              <p>Updated {src.frequency}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4 text-sm text-wiah-mid">
          <div>
            <p className="font-bold text-wiah-black mb-2">Methodology</p>
            <p>{data.metadata.methodology}</p>
          </div>

          <div>
            <p className="font-bold text-wiah-black mb-2">Known issues</p>
            <ul className="list-disc list-inside space-y-1">
              {data.metadata.knownIssues.map((issue, idx) => (
                <li key={idx}>{issue}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SectionNav sections={[
        { id: 'sec-charts', label: 'Charts' },
        { id: 'sec-context', label: 'Context' },
        { id: 'sec-positive', label: 'What\'s improving' },
        { id: 'sec-sources', label: 'Sources' },
      ]} />
    </main>
  );
}
