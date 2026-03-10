'use client';

import { useState, useEffect } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

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
          question="Are Britain's Unique Chalk Streams Being Destroyed?"
          finding="England holds 85% of the world's chalk streams — rare ecosystems sometimes called &ldquo;the rainforest of the rivers&rdquo; — yet 95% are in poor ecological condition. Over-abstraction, sewage discharges, and invasive species have devastated habitats that took millennia to form and cannot be recreated elsewhere on Earth."
          colour="#264653"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>Chalk streams are among the rarest and most ecologically valuable freshwater habitats on Earth. They form where rainwater percolates through chalk downland, emerging as crystal-clear, mineral-rich springs with a remarkably stable temperature of around 10–11&deg;C year-round. There are approximately 200 chalk rivers in the world, of which around 85% — roughly 160 rivers covering 4,000 kilometres — are in England, concentrated in Hampshire, Wiltshire, Dorset, Berkshire, Hertfordshire, and East Anglia. The Test, Itchen, Kennet, Avon, Ver, and Misbourne are among the best known. These rivers support unique communities of wildlife: water crowfoot meadows, wild brown trout and Atlantic salmon, white-clawed crayfish, water voles, otters, kingfishers, and rare invertebrates including the southern damselfly. The Chalk Stream Restoration Group — a coalition of conservation organisations, anglers, and scientists — estimated in 2021 that 95% of England's chalk streams are in poor condition, failing Water Framework Directive standards. They described chalk streams as &ldquo;the equivalent of the tropical rainforest&rdquo; — irreplaceable ecosystems suffering from a combination of threats that no single intervention can fix.</p>
            <p>Over-abstraction of groundwater is the most fundamental and chronic threat. Chalk aquifers — the geological formations that feed chalk streams — are among the UK's most important water sources. Southern Water, Thames Water, and other companies abstract billions of litres from chalk aquifers daily to supply homes and industry, particularly in south-east England where groundwater dominates supply. When abstraction exceeds natural recharge — as it frequently does in dry summers — water tables fall, springs cease to flow, and rivers become intermittent. The Environment Agency has classified around 60% of chalk stream catchments as over-licensed or over-abstracted. The Misbourne in Buckinghamshire, once a perennial chalk stream, now runs dry in its upper reaches for most of the year. Reforming abstraction licences to protect minimum ecological flows has been a policy commitment for over two decades but progress has been slow: the EA's own assessment shows that less than 20% of problematic abstraction licences had been reformed by 2023.</p>
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
              changeText="Target: 100% — 95% failing WFD standards for 15+ years"
              sparklineData={[8, 7, 6.5, 6, 5.5, 5.5, 5, 5]}
              source="EA — WFD river classification; Chalk Stream Restoration Group 2021"
              href="#sec-ecology"
            />
            <MetricCard
              label="Catchments classified as over-abstracted"
              value="60"
              unit="%"
              direction="flat"
              polarity="up-is-bad"
              changeText="Groundwater levels below ecological minimums in dry years"
              sparklineData={[62, 62, 61, 61, 60, 60, 60, 60]}
              source="Environment Agency — Water stressed areas assessment 2023"
              href="#sec-ecology"
            />
            <MetricCard
              label="Sewage discharges on chalk catchments (2022)"
              value="12,000+"
              direction="up"
              polarity="up-is-bad"
              changeText="Sharply rising since EDM monitoring expanded from 2016"
              sparklineData={[6000, 7000, 8500, 9800, 10800, 11500, 12000, 12000]}
              source="Environment Agency — Event Duration Monitoring 2022"
              href="#sec-ecology"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-ecology" className="mb-12">
            <LineChart
              title="Chalk streams in good ecological status, England, 2010–2023"
              subtitle="Percentage meeting WFD good ecological status. Target 100%. EA WFD river classification."
              series={ecologySeries}
              yLabel="% in good ecological status"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-sewage" className="mb-12">
            <LineChart
              title="Sewage discharge events on chalk stream catchments, 2010–2023"
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
            unit="Atlantic salmon recovering on Hampshire's finest chalk rivers"
            description="The Test and Itchen support resurgent wild Atlantic salmon populations following headwater restoration by the Wild Trout Trust and abstraction reductions negotiated with Southern Water. Rewetting of wet meadows along Hampshire rivers has brought back water voles after decades of absence — proving that targeted restoration works when abstraction is reduced and water quality improved. The Chalk Stream Restoration Group's Blueprint for Chalk Streams provides a science-based roadmap for recovery."
            source="Source: Wild Trout Trust — chalk stream restoration monitoring; Environment Agency fish count surveys."
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
                        <strong className="text-wiah-black">{src.name}:</strong> 
                        <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue">
                          {src.dataset}
                        </a>
                         ({src.frequency})
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
              <RelatedTopics />
      </main>
    </>
  );
}
