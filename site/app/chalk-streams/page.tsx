'use client';

import { useState, useEffect } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface ChalkStreamsData {
  national: {
    timeSeries: Array<{ date: string; goodEcologyPct: number; sewageEvents: number }>;
  };
  metadata: {
    sources: Array<{ name: string; dataset: string; url: string; frequency: string }>;
    methodology: string;
    knownIssues: string[];
  };
}

function yearToDate(y: string): Date {
  return new Date(parseInt(y), 6, 1);
}

export default function ChalkStreamsPage() {
  const [data, setData] = useState<ChalkStreamsData | null>(null);

  useEffect(() => {
    fetch('/data/chalk-streams/chalk_streams.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const ecologySeries: Series[] = data
    ? [{
        id: 'ecology',
        label: 'Chalk streams in good ecological status',
        colour: '#264653',
        data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.goodEcologyPct })),
      }]
    : [];

  const sewageSeries: Series[] = data
    ? [{
        id: 'sewage',
        label: 'Sewage discharge events on chalk stream catchments',
        colour: '#E63946',
        data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.sewageEvents })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Chalk Streams" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Chalk Streams"
          question="Are Britain&apos;s Unique Chalk Streams Being Destroyed?"
          finding="England holds 85% of the world&apos;s chalk streams &mdash; rare ecosystems sometimes called &ldquo;the rainforest of the rivers&rdquo; &mdash; yet 95% are in poor ecological condition. Over-abstraction, sewage discharges, and invasive species have devastated habitats that took millennia to form and cannot be recreated elsewhere on Earth."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Chalk streams are among the rarest and most ecologically valuable freshwater habitats on Earth. They form where rainwater percolates through chalk downland, emerging as crystal-clear, mineral-rich springs with a remarkably stable temperature of around 10&ndash;11&deg;C year-round. There are approximately 200 chalk rivers in the world, of which around 85% &mdash; roughly 160 rivers covering 4,000 kilometres &mdash; are in England, concentrated in Hampshire, Wiltshire, Dorset, Berkshire, Hertfordshire, and East Anglia. The Test, Itchen, Kennet, Avon, Ver, and Misbourne are among the best known. These rivers support unique communities of wildlife: water crowfoot meadows, wild brown trout and Atlantic salmon, white-clawed crayfish, water voles, otters, kingfishers, and rare invertebrates including the southern damselfly. The Chalk Stream Restoration Group &mdash; a coalition of conservation organisations, anglers, and scientists &mdash; estimated in 2021 that 95% of England&apos;s chalk streams are in poor condition, failing Water Framework Directive standards. They described chalk streams as &ldquo;the equivalent of the tropical rainforest&rdquo; &mdash; irreplaceable ecosystems suffering from a combination of threats that no single intervention can fix.</p>
            <p>Over-abstraction of groundwater is the most fundamental and chronic threat. Chalk aquifers &mdash; the geological formations that feed chalk streams &mdash; are among the UK&apos;s most important water sources. Southern Water, Thames Water, and other companies abstract billions of litres from chalk aquifers daily to supply homes and industry, particularly in south-east England where groundwater dominates supply. When abstraction exceeds natural recharge &mdash; as it frequently does in dry summers &mdash; water tables fall, springs cease to flow, and rivers become intermittent. The Environment Agency has classified around 60% of chalk stream catchments as over-licensed or over-abstracted. The Misbourne in Buckinghamshire, once a perennial chalk stream, now runs dry in its upper reaches for most of the year. Reforming abstraction licences to protect minimum ecological flows has been a policy commitment for over two decades but progress has been slow: the EA&apos;s own assessment shows that less than 20% of problematic abstraction licences had been reformed by 2023.</p>
            </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-ecology', label: 'Ecological Status' },
          { id: 'sec-sewage', label: 'Sewage Discharges' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Chalk streams in good ecological status"
              value="5"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="Target: 100% &mdash; 95% failing WFD standards for 15+ years"
              sparklineData={[8, 7, 6.5, 6, 5.5, 5.5, 5, 5]}
              source="EA &mdash; WFD river classification; Chalk Stream Restoration Group 2021"
              onExpand={() => {}}
            />
            <MetricCard
              label="Catchments classified as over-abstracted"
              value="60"
              unit="%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Groundwater levels below ecological minimums in dry years"
              sparklineData={[62, 62, 61, 61, 60, 60, 60, 60]}
              source="Environment Agency &mdash; Water stressed areas assessment 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Sewage discharges on chalk catchments (2022)"
              value="12,000+"
              direction="up"
              polarity="up-is-bad"
              changeText="Sharply rising since EDM monitoring expanded from 2016"
              sparklineData={[6000, 7000, 8500, 9800, 10800, 11500, 12000, 12000]}
              source="Environment Agency &mdash; Event Duration Monitoring 2022"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-ecology" className="mb-12">
            <LineChart
              title="Chalk streams in good ecological status, England, 2010&ndash;2023"
              subtitle="Percentage meeting WFD good ecological status. Target 100%. EA WFD river classification."
              series={ecologySeries}
              yLabel="% in good ecological status"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sewage" className="mb-12">
            <LineChart
              title="Sewage discharge events on chalk stream catchments, 2010&ndash;2023"
              subtitle="Storm overflow discharges recorded by EA Event Duration Monitoring. Increase partly reflects better monitoring coverage."
              series={sewageSeries}
              yLabel="Discharge events per year"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Wild Salmon &amp; Water Voles Returning"
            value="Test &amp; Itchen"
            unit="Atlantic salmon recovering on Hampshire&apos;s finest chalk rivers"
            description="The Test and Itchen support resurgent wild Atlantic salmon populations following headwater restoration by the Wild Trout Trust and abstraction reductions negotiated with Southern Water. Rewetting of wet meadows along Hampshire rivers has brought back water voles after decades of absence &mdash; proving that targeted restoration works when abstraction is reduced and water quality improved. The Chalk Stream Restoration Group&apos;s Blueprint for Chalk Streams provides a science-based roadmap for recovery."
            source="Source: Wild Trout Trust &mdash; chalk stream restoration monitoring; Environment Agency fish count surveys."
          />
        </ScrollReveal>

        <ScrollReveal>
          <section className="mt-8 pt-12 border-t border-wiah-border">
            <h2 className="font-sans text-2xl font-bold text-wiah-black mb-6">Sources &amp; Methodology</h2>
            {data && (
              <div className="font-sans text-sm space-y-6">
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Data sources</h3>
                  <ul className="space-y-2">
                    {data.metadata.sources.map((src, idx) => (
                      <li key={idx} className="text-wiah-mid">
                        <strong className="text-wiah-black">{src.name}:</strong>&nbsp;
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue">
                          {src.dataset}
                        </a>
                        &nbsp;({src.frequency})
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Methodology</h3>
                  <p className="text-wiah-mid">{data.metadata.methodology}</p>
                </div>
                <div>
                  <h3 className="font-bold text-wiah-black mb-2">Known issues</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {data.metadata.knownIssues.map((issue, idx) => (
                      <li key={idx} className="text-wiah-mid">{issue}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
