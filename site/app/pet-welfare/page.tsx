'use client'

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// ── Types ────────────────────────────────────────────────────────────────────

interface PetWelfareData {
  rspcaReports: Array<{ year: number; reports: number }>;
  dogAttackAdmissions: Array<{ year: number; admissions: number }>;
  rescueCentreOccupancy: Array<{ year: number; occupancyPct: number }>;
  metadata: {
    sources: { name: string; dataset: string; url: string; frequency: string }[];
    methodology: string;
    knownIssues: string[];
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function PetWelfarePage() {
  const [data, setData] = useState<PetWelfareData | null>(null);

  useEffect(() => {
    fetch('/data/pet-welfare/pet_welfare.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const rspcaSeries: Series[] = data
    ? [{
        id: 'rspca-reports',
        label: 'Cruelty/neglect reports received',
        colour: '#E63946',
        data: data.rspcaReports.map(d => ({
          date: yearToDate(d.year),
          value: d.reports,
        })),
      }]
    : [];

  const dogAttackSeries: Series[] = data
    ? [{
        id: 'dog-attack-admissions',
        label: 'Hospital admissions (dog attacks)',
        colour: '#E63946',
        data: data.dogAttackAdmissions.map(d => ({
          date: yearToDate(d.year),
          value: d.admissions,
        })),
      }]
    : [];

  const rescueSeries: Series[] = data
    ? [{
        id: 'rescue-occupancy',
        label: 'Rescue centre occupancy',
        colour: '#F4A261',
        data: data.rescueCentreOccupancy.map(d => ({
          date: yearToDate(d.year),
          value: d.occupancyPct,
        })),
      }]
    : [];

  return (
    <>
      <TopicNav topic="Animal Welfare" parentTopic="Health" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Animal Welfare"
          question="What's Happening to the UK's Animals?"
          finding="The RSPCA received over 137,000 cruelty and neglect reports in 2023 — up 25% since before the pandemic. Dog attacks requiring hospital admission have risen 15% since 2019 to over 8,000 per year, and rescue centres across the country are operating at or beyond capacity as the pandemic puppy abandonment wave continues."
          colour="#F4A261"
          preposition="with"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The UK experienced a pet ownership surge during the COVID-19 pandemic: an estimated 3.2 million new pets were acquired between 2020 and 2021, many by first-time owners making impulsive decisions during lockdowns. The consequences are now unfolding at scale. Rescue centres operated by ADCH member organisations reported occupancy rates above 100% in 2023 and 2024, meaning they are housing more animals than their facilities were designed for. The RSPCA&rsquo;s cruelty line received 137,000 reports in 2023, up from 109,800 in 2019 — a 25% rise that reflects both genuine welfare deterioration and a cost-of-living crisis that has made pet ownership unaffordable for millions. The PDSA estimates that 5.2 million pets across the UK are not receiving veterinary treatment they need, primarily due to cost — the average annual expense of owning a dog has risen to roughly &pound;2,000, up 30% since 2020. Puppy farming persists despite Lucy&rsquo;s Law, which banned third-party puppy sales in 2020; online platforms like Gumtree and Facebook Marketplace remain largely unregulated marketplaces for breeders operating below the radar. The exotic pet trade is a growing concern, with the RSPCA reporting rising numbers of reptiles, primates, and other non-traditional animals being surrendered or seized.
            </p>
            <p>
              Dog attacks have become a significant public health issue: over 8,000 people were admitted to hospital in England in 2023 after being bitten or struck by a dog, a 15% increase since 2019. The XL Bully ban, introduced in February 2024 following a series of fatal attacks, required owners to register their dogs on the Index of Exempted Dogs — over 50,000 were registered and 18,000 exemption applications submitted, but early data suggests a substantial number have been surrendered or euthanised rather than registered. Meanwhile, livestock worrying by dogs costs farmers an estimated &pound;2 million per year across more than 15,000 reported incidents, destroying livelihoods in rural communities. The Animal Welfare (Sentience) Act 2022 formally recognised animals as sentient beings in law for the first time, establishing an Animal Sentience Committee to scrutinise government policy — a landmark moment in principle, though enforcement resources remain thin and the committee&rsquo;s practical influence on policy outcomes is still being tested.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-metrics', label: 'Overview' },
          { id: 'sec-rspca', label: 'Cruelty Reports' },
          { id: 'sec-dog-attacks', label: 'Dog Attacks' },
          { id: 'sec-rescue', label: 'Rescue Centres' },
        ]} />

        <ScrollReveal>
          <div id="sec-metrics" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="RSPCA cruelty/neglect reports"
              value="137,200"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 25% from 109,800 in 2019 · 2020 dip due to lockdown"
              sparklineData={[89420, 94310, 97560, 101200, 103750, 109800, 98400, 117650, 128300, 137200]}
              source="RSPCA · Annual Cruelty Statistics 2023"
              href="#sec-rspca"
            />
            <MetricCard
              label="Dog attack hospital admissions"
              value="8,210"
              direction="up"
              polarity="up-is-bad"
              changeText="Up 15% from 7,150 in 2019 · England only"
              sparklineData={[5970, 6280, 6510, 6830, 7040, 7150, 6420, 7380, 7890, 8210]}
              source="NHS Digital · Hospital Episode Statistics 2023"
              href="#sec-dog-attacks"
            />
            <MetricCard
              label="Pets not receiving needed vet care"
              value="5.2M"
              direction="up"
              polarity="up-is-bad"
              changeText="Cost-of-living crisis · Average dog costs £2,000/year"
              sparklineData={[3.1, 3.4, 3.6, 3.8, 3.9, 4.2, 4.0, 4.5, 4.9, 5.2]}
              source="PDSA · PAW Report 2023"
              href="#sec-rspca"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-rspca" className="mb-12">
            {rspcaSeries.length > 0 ? (
              <LineChart
                title="RSPCA cruelty and neglect reports received, 2014–2024"
                subtitle="Total reports received by the RSPCA national cruelty line per year. The 2020 dip reflects reduced reporting during COVID-19 lockdowns, not improved welfare."
                series={rspcaSeries}
                yLabel="Reports"
                source={{
                  name: 'RSPCA',
                  dataset: 'Annual Cruelty and Neglect Reports',
                  frequency: 'annual',
                  url: 'https://www.rspca.org.uk/whatwedo/latest/facts',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-dog-attacks" className="mb-12">
            {dogAttackSeries.length > 0 ? (
              <LineChart
                title="Dog attack hospital admissions, England, 2014–2024"
                subtitle="Finished admission episodes for dog bites and strikes (ICD-10 W54). England only — UK total estimated 20–25% higher."
                series={dogAttackSeries}
                yLabel="Admissions"
                source={{
                  name: 'NHS Digital',
                  dataset: 'Hospital Admitted Patient Care — Dog Bites and Strikes',
                  frequency: 'annual',
                  url: 'https://digital.nhs.uk/data-and-information/publications/statistical/hospital-admitted-patient-care-activity',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-rescue" className="mb-12">
            {rescueSeries.length > 0 ? (
              <LineChart
                title="Rescue centre occupancy, UK, 2018–2025"
                subtitle="Average occupancy rate across ADCH member rescue centres. Above 100% indicates centres operating beyond intended capacity."
                series={rescueSeries}
                yLabel="Occupancy %"
                source={{
                  name: 'ADCH',
                  dataset: 'Annual Sector Report — Rescue Centre Capacity',
                  frequency: 'annual',
                  url: 'https://www.adch.org.uk/sector-report',
                }}
              />
            ) : (
              <div className="h-64 bg-wiah-light rounded animate-pulse mb-12" />
            )}
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <PositiveCallout
            title="Lucy's Law and legal recognition of animal sentience"
            value="93%+"
            unit="RSPCA prosecution success rate"
            description="Lucy's Law (2020) ended third-party puppy and kitten sales, requiring buyers to deal directly with breeders or adopt from rescue centres. The Animal Welfare (Sentience) Act 2022 gave animals legal recognition as sentient beings in UK policy-making for the first time, establishing the Animal Sentience Committee to scrutinise government decisions. The RSPCA's prosecution success rate remains above 93%, demonstrating continued effectiveness in holding those who harm animals to account."
            source="Source: RSPCA Annual Prosecutions Data 2023; DEFRA — Animal Welfare (Sentience) Act 2022."
          />
        </ScrollReveal>

        {/* Sources */}
        <section className="border-t border-wiah-border pt-8 mt-12">
          <h2 className="text-lg font-bold text-wiah-black mb-4">Sources &amp; methodology</h2>
          <div className="text-sm text-wiah-mid space-y-2">
            {data?.metadata.sources.map((src, i) => (
              <p key={i}>
                <strong>{src.name}.</strong> <em>{src.dataset}</em>. {src.frequency} —{' '}
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline text-wiah-blue hover:no-underline">
                  {src.url}
                </a>
              </p>
            ))}
          </div>
          <p className="text-sm text-wiah-mid mt-6">{data?.metadata.methodology}</p>
          {data?.metadata.knownIssues && data.metadata.knownIssues.length > 0 && (
            <div className="mt-6 p-4 bg-wiah-light rounded">
              <p className="font-bold text-wiah-black mb-2">Known issues:</p>
              <ul className="text-sm text-wiah-mid space-y-1 list-disc list-inside">
                {data.metadata.knownIssues.map((issue, i) => (
                  <li key={i}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
        <RelatedTopics />
      </main>
    </>
  );
}
