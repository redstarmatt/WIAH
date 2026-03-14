'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series, Annotation } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import Cite from '@/components/Cite';
import References, { Reference } from '@/components/References';
import RelatedTopics from '@/components/RelatedTopics';

const editorialRefs: Reference[] = [
  { num: 1, name: 'PDSA', dataset: 'Animal Wellbeing (PAW) Report', url: 'https://www.pdsa.org.uk/what-we-do/pdsa-animal-wellbeing-report', date: '2024' },
  { num: 2, name: 'RSPCA', dataset: 'Annual Cruelty Statistics', url: 'https://www.rspca.org.uk/whatwedo/latest/facts', date: '2024' },
  { num: 3, name: 'Dogs Trust / Cats Protection / Blue Cross', dataset: 'Pet Surrender and Rehoming Statistics', date: '2024', url: 'https://www.dogstrust.org.uk/' },
];

// ── Types ────────────────────────────────────────────────────────────────────

interface OrganisationPoint {
  year: number;
  organisations: number;
}

interface SurrenderPoint {
  year: number;
  surrendersThousands: number;
}

interface StressPoint {
  year: number;
  stressedPct: number;
}

interface PetFoodBankData {
  national: {
    petFoodBankOrganisations: {
      timeSeries: OrganisationPoint[];
      latestYear: number;
      latestCount: number;
    };
    petSurrenders: {
      timeSeries: SurrenderPoint[];
      latestYear: number;
      latestThousands: number;
    };
    financialStressPetCare: {
      timeSeries: StressPoint[];
      latestYear: number;
      latestPct: number;
    };
  };
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

export default function PetFoodBanksPage() {
  const [data, setData] = useState<PetFoodBankData | null>(null);

  useEffect(() => {
    fetch('/data/pet-food-banks/pet_food_banks.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // ── Derived series ──────────────────────────────────────────────────────

  const orgSeries: Series[] = data
    ? [
        {
          id: 'organisations',
          label: 'Pet food bank organisations',
          colour: '#F4A261',
          data: data.national.petFoodBankOrganisations.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.organisations,
          })),
        },
      ]
    : [];

  const surrenderSeries: Series[] = data
    ? [
        {
          id: 'surrenders',
          label: 'Annual pet surrenders to rescue charities (thousands)',
          colour: '#E63946',
          data: data.national.petSurrenders.timeSeries.map(d => ({
            date: yearToDate(d.year),
            value: d.surrendersThousands,
          })),
        },
      ]
    : [];

  const orgAnnotations: Annotation[] = [
    { date: new Date(2021, 5, 1), label: '2021: Cost of living crisis begins' },
    { date: new Date(2022, 5, 1), label: '2022: Energy bills spike — pet food banks triple' },
  ];

  const surrenderAnnotations: Annotation[] = [
    { date: new Date(2020, 5, 1), label: '2020: Pandemic adoption surge' },
    { date: new Date(2022, 5, 1), label: '2022: Returns begin as costs rise' },
  ];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      <TopicNav topic="Pet Food Banks" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="Poverty &amp; Cost of Living"
          question="Are People Going Hungry to Feed Their Pets?"
          finding="Usage of pet food banks has increased 300% since 2021. The PDSA estimates 2.1 million pet owners cannot afford veterinary care. Surrendering pets to shelters has increased 25% since the cost of living crisis began."
          colour="#F4A261"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              The cost of living crisis has created a hidden animal welfare emergency. Pet food banks — a concept almost unknown five years ago — now number 280 across the UK. They reflect the arithmetic of poverty: for a family choosing between their electricity bill and their cat's food, the cat's food loses. The same families often acquired pets during the 2020 lockdown surge, when millions of people adopted dogs and cats. Those animals are now being surrendered to rescues at record rates.<Cite nums={3} />
            </p>
            <p>
              The PDSA's Annual Wellbeing Report estimates 2.1 million pet owners cannot afford veterinary care for their animals — up from 1.5 million in 2020.<Cite nums={1} /> Pets are not registered with vets, so there is no equivalent of the NHS to catch animals whose owners are struggling. The PDSA and RSPCA provide subsidised and free care for qualifying owners, but capacity is far below demand.<Cite nums={[1, 2]} /> Many animals are surrendered to shelters not because owners have stopped caring, but because keeping them has become financially impossible.<Cite nums={3} />
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-foodbanks', label: 'Pet food banks' },
          { id: 'sec-surrenders', label: 'Pet surrenders' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            <MetricCard
              label="Pet food bank organisations (UK)"
              value="280"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+1,300% since 2019 · Concentrated in deprived areas"
              sparklineData={[20, 25, 60, 120, 200, 280]}
              href="#sec-foodbanks"
            />
            <MetricCard
              label="Pet surrenders to rescue charities"
              value="115,000"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="+25% since 2019 · Record shelter occupancy"
              sparklineData={[92, 87, 95, 100, 108, 115]}
              href="#sec-foodbanks"
            />
            <MetricCard
              label="Pet owners who cannot afford vet care"
              value="2.1M"
              unit=""
              direction="up"
              polarity="up-is-bad"
              changeText="PDSA Animal Wellbeing Report 2024 · Up from 1.5M in 2020"
              sparklineData={[1.5, 1.6, 1.8, 1.9, 2.0, 2.1]}
              href="#sec-foodbanks"
            />
          </div>
        

        {/* Charts */}
        <ScrollReveal>
          <section id="sec-foodbanks" className="mb-12">
            <LineChart
              title="Pet food bank organisations, UK, 2019–2024"
              subtitle="Number of pet food bank organisations operating across the UK. The explosion from 2021 directly tracks the onset of the cost of living crisis and energy price spike. Most are run by volunteers alongside existing food banks."
              series={orgSeries}
              annotations={orgAnnotations}
              yLabel="Number of organisations"
            />
          </section>
        </ScrollReveal>

        <ScrollReveal>
          <section id="sec-surrenders" className="mb-12">
            <LineChart
              title="Annual pet surrenders to rescue charities, UK, 2019–2024"
              subtitle="Combined annual pet surrenders to RSPCA, Dogs Trust, Cats Protection and Blue Cross. Numbers fell in 2020 during the pandemic adoption surge, then rose sharply as the cost of living crisis made pet ownership unaffordable for many families."
              series={surrenderSeries}
              annotations={surrenderAnnotations}
              yLabel="Thousands of animals"
            />
          </section>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="What's helping"
            value="PDSA &amp; Vets Now"
            unit="subsidised care for low-income owners"
            description="Many food banks now accept pet food donations alongside human food. Vets Now, PDSA, RSPCA and Blue Cross provide subsidised or free veterinary care for qualifying low-income pet owners, collectively treating over 400,000 animals per year. The Pet Theft Reform Act 2022 strengthened protections against the rise in pet theft that accompanied the lockdown adoption surge. Some local authorities now include pet food in emergency welfare payments."
            source="Source: PDSA — Animal Wellbeing (PAW) Report, 2024. RSPCA — Annual Statistics, 2024."
          />
        </ScrollReveal>

        <div className="mt-6">
          <References items={editorialRefs} />
        </div>

        {/* Sources */}
        <section className="mt-16 pt-8 border-t border-wiah-border max-w-2xl">
          <h2 className="text-xl font-bold text-wiah-black mb-4">Sources &amp; Methodology</h2>
          <div className="text-sm text-wiah-mid space-y-3 font-mono">
            {data?.metadata.sources.map((src, i) => (
              <div key={i}>
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-wiah-blue hover:underline">
                  {src.name} — {src.dataset}
                </a>
                <div className="text-xs text-wiah-mid">Updated {src.frequency}</div>
              </div>
            ))}
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Methodology</h3>
            <p>{data?.metadata.methodology}</p>
          </div>
          <div className="text-sm text-wiah-mid mt-6 space-y-2">
            <h3 className="font-bold">Known issues</h3>
            <ul className="list-disc list-inside space-y-1">
              {data?.metadata.knownIssues.map((issue, i) => (
                <li key={i}>{issue}</li>
              ))}
            </ul>
          </div>
        </section>
              <RelatedTopics />
      </main>
    </>
  );
}
