'use client';

import { useState, useEffect } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';

interface RewildingData {
  national: {
    timeSeries: Array<{ date: string; protectedLandPct: number; speciesIndex: number }>;
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

export default function RewildingPage() {
  const [data, setData] = useState<RewildingData | null>(null);

  useEffect(() => {
    fetch('/data/rewilding/rewilding.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const protectedSeries: Series[] = data
    ? [{
        id: 'protected-land',
        label: 'Land in statutory protected areas',
        colour: '#2A9D8F',
        data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.protectedLandPct })),
      }]
    : [];

  const speciesSeries: Series[] = data
    ? [{
        id: 'species-index',
        label: 'UK species abundance index (1970=100)',
        colour: '#264653',
        data: data.national.timeSeries.map(d => ({ date: yearToDate(d.date), value: d.speciesIndex })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Rewilding" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Rewilding"
          question="Is Britain Actually Bringing Nature Back?"
          finding="The UK has committed to protecting 30&percnt; of land for nature by 2030 &mdash; the so-called 30x30 pledge &mdash; but only 3.2&percnt; of land currently meets ecological standards. With fewer than four years remaining, the target is almost certainly out of reach without a step-change in both ambition and delivery."
          colour="#2A9D8F"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>The UK is one of the most nature-depleted countries in the world. The Natural History Museum&apos;s 2021 Biodiversity Intactness Index ranked Britain 189th out of 218 nations &mdash; behind every G7 peer. The State of Nature 2023 report, compiled by 60-plus wildlife organisations led by the RSPB and JNCC, found that 41&percnt; of UK species have declined since 1970 and 15&percnt; are at risk of extinction. Against this backdrop, the government signed the Kunming-Montreal Global Biodiversity Framework at COP15 in December 2022, committing to the 30x30 target: protecting 30&percnt; of land and 30&percnt; of seas in a good ecological condition by 2030. The problem is the gap between designation and reality &mdash; land within a protected boundary is not the same as land genuinely recovering for nature. DEFRA&apos;s own assessment shows just 3.2&percnt; of England&apos;s land meets the 30x30 ecological standard, even though 8.5&percnt; sits within statutory protected areas. The majority of SSSIs &mdash; the foundation of England&apos;s protected area network &mdash; are in unfavourable condition.</p>
            <p>Rewilding as a distinct approach &mdash; allowing natural processes to resume rather than actively managing habitat toward a fixed endpoint &mdash; has gained significant momentum since the early 2010s. The Knepp Estate in West Sussex became the emblematic case: 3,500 acres returned to free-roaming cattle, pigs, ponies, and deer since 2001, producing extraordinary results. Purple emperor butterflies, turtle doves, nightingales, and peregrine falcons have returned without deliberate introduction. White storks have bred in Sussex for the first time in 600 years, reintroduced via a partnership between Knepp, the White Stork Project, and the Roy Dennis Wildlife Foundation &mdash; six chicks fledged in 2023. Wolves, lynx, and bison have been proposed for Scottish and Welsh uplands, and European bison were reintroduced to Kent woodland in 2022, the first wild bison in the UK for over 6,000 years. Rewilding Britain estimates that rewilding 30&percnt; of UK land could sequester 47 million tonnes of CO2 annually, roughly equivalent to taking all UK cars off the road.</p>
            <p>The Nature Recovery Network &mdash; a government commitment to create and restore wildlife-rich habitat across England &mdash; sits at the centre of domestic policy. The Environment Act 2021 introduced legally binding targets including halting net species decline by 2030. Biodiversity Net Gain became mandatory for major developments from January 2024, requiring all new construction to demonstrate a 10&percnt; net improvement in biodiversity value. Environmental Land Management schemes &mdash; Sustainable Farming Incentive, Countryside Stewardship, and Landscape Recovery &mdash; direct agricultural payments toward environmental outcomes, replacing EU Common Agricultural Policy subsidies. By March 2024, around 34,000 farm businesses had active SFI agreements, covering 1.8 million hectares. Landscape Recovery, the most ambitious tier, has 56 projects approved in two rounds, covering around 700,000 hectares &mdash; a promising start, but less than 2&percnt; of UK land area. Cairngorms Connect, a 200-year restoration partnership covering 60,000 hectares of Highland Scotland, is one of the most ambitious rewilding projects in Europe, targeting natural regeneration of native woodland and restoration of river systems.</p>
            <p>The geography of rewilding in the UK is deeply uneven. Scotland hosts the majority of large-scale rewilding ambitions, underpinned by vast upland estates and stronger government support: NatureScot&apos;s peatland restoration programme has restored over 50,000 hectares since 2012. Wales launched its Nature Recovery Action Plan in 2022, with a target of 30&percnt; of land in good ecological condition by 2030. England lags, partly because higher land values, more intensive agriculture, and denser settlement reduce the supply of viable rewilding land. The Cambrian Wildwood project in mid-Wales aims to restore 10,000 hectares of Celtic rainforest. In Northern Ireland, just 9&percnt; of land is in protected areas and nature recovery planning is at an early stage. Urban rewilding &mdash; wildflower verges, rewilded parks, pollinator corridors &mdash; has expanded rapidly in cities including London and Manchester but contributes only marginally to national biodiversity targets. Rewilding projects disproportionately occur on land that was already relatively wildlife-rich; the deepest conservation deficits are in intensively farmed lowland England, precisely where rewilding is hardest to achieve.</p>
            <p>The 30x30 target is ambitious but its measurement is contested. The UK currently counts 26&percnt; of seas as &ldquo;protected&rdquo; via Marine Protected Areas, but independent assessments find most MPAs offer minimal ecological benefit because damaging activities including bottom trawling are still permitted within their boundaries. On land, the gap between the 8.5&percnt; in protected areas and the 3.2&percnt; in good condition reflects the extent to which designation has outpaced management. The species index used in State of Nature is a composite of well-monitored taxa &mdash; birds, butterflies, plants &mdash; and may not capture trends in less-studied groups including invertebrates and fungi. Carbon sequestration estimates from rewilding are highly sensitive to assumptions about soil carbon dynamics, tree species, and counterfactual land use. Rewilding Britain&apos;s 47 million tonne figure assumes the most optimistic combination of land use change and natural regeneration rates, and independent peer review has questioned whether it can be achieved at the speed claimed.</p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Metrics' },
          { id: 'sec-protected', label: 'Protected Land' },
          { id: 'sec-species', label: 'Species Decline' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Land meeting 30x30 standard"
              value="3.2"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="Target: 30&percnt; by 2030 &mdash; barely moving despite pledges"
              sparklineData={[2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2]}
              source="DEFRA &mdash; 30x30 ecological condition assessment"
              onExpand={() => {}}
            />
            <MetricCard
              label="UK species in long-term decline since 1970"
              value="41"
              unit="%"
              direction="flat"
              polarity="up-is-bad"
              changeText="State of Nature 2023 &mdash; 15&percnt; at risk of extinction"
              sparklineData={[26, 28, 30, 33, 35, 37, 39, 41]}
              source="RSPB / JNCC &mdash; State of Nature 2023"
              onExpand={() => {}}
            />
            <MetricCard
              label="Sea meeting 30x30 standard"
              value="8"
              unit="%"
              direction="flat"
              polarity="up-is-good"
              changeText="Target: 30&percnt; by 2030 &mdash; most MPAs lack effective management"
              sparklineData={[5, 5.5, 6, 6.5, 7, 7.5, 7.8, 8]}
              source="JNCC &mdash; UK Marine Protected Area network 2024"
              onExpand={() => {}}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-protected" className="mb-12">
            <LineChart
              title="Land within statutory protected areas, UK, 2010&ndash;2024"
              subtitle="Percentage of UK land area in SSSIs, NNRs, and National Parks. 30&percnt; target line shown. JNCC / DEFRA."
              series={protectedSeries}
              yLabel="% of land area"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-species" className="mb-12">
            <LineChart
              title="UK wildlife species abundance index, 2010&ndash;2024"
              subtitle="Composite of over 1,000 monitored UK species, indexed to 1970 = 100. State of Nature 2023."
              series={speciesSeries}
              yLabel="Index (1970=100)"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Signs of Recovery"
            value="600 years"
            unit="since white storks last bred in Britain"
            description="Knepp Estate, Cairngorms Connect, and Cambrian Wildwood are demonstrating that rapid nature recovery is possible. White storks bred in Sussex in 2023 for the first time in 600 years. European bison were reintroduced to Kent woodland in 2022 &mdash; the first wild bison in the UK for over 6,000 years. Red kites, once reduced to a single Welsh population, now number over 10,000 across Britain following a three-decade reintroduction programme &mdash; one of Europe&apos;s most successful conservation stories."
            source="Source: White Stork Project 2023; Rewilding Britain; Roy Dennis Wildlife Foundation."
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
