'use client';

import { useEffect, useState } from 'react';
import TopicNav from '@/components/TopicNav';
import TopicHeader from '@/components/TopicHeader';
import MetricCard from '@/components/MetricCard';
import LineChart, { Series } from '@/components/charts/LineChart';
import PositiveCallout from '@/components/PositiveCallout';
import ScrollReveal from '@/components/ScrollReveal';
import SectionNav from '@/components/SectionNav';
import RelatedTopics from '@/components/RelatedTopics';

// -- Types --------------------------------------------------------------------

interface PatientsSeenPoint {
  year: number;
  patients: number;
}

interface WorkforcePoint {
  year: number;
  nhs: number;
  private: number;
}

interface ChildExtractionsPoint {
  year: number;
  extractions: number;
}

interface DentalAccessData {
  patientsSeen: PatientsSeenPoint[];
  workforce: WorkforcePoint[];
  childExtractions: ChildExtractionsPoint[];
}

// -- Helpers ------------------------------------------------------------------

function yearToDate(y: number): Date {
  return new Date(y, 5, 1);
}

function sparkFrom(arr: number[], n = 10) {
  return arr.slice(-n);
}

// -- Page ---------------------------------------------------------------------

export default function DentalAccessCrisisPage() {
  const [data, setData] = useState<DentalAccessData | null>(null);

  useEffect(() => {
    fetch('/data/dental-access-crisis/dental_access_crisis.json')
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // -- Derived series ---------------------------------------------------------

  const patientsSeenSeries: Series[] = data
    ? [{
        id: 'patients-seen',
        label: 'Patients seen by NHS dentist (24-month)',
        colour: '#E63946',
        data: data.patientsSeen.map(d => ({
          date: yearToDate(d.year),
          value: d.patients,
        })),
      }]
    : [];

  const workforceSeries: Series[] = data
    ? [
        {
          id: 'nhs-dentists',
          label: 'NHS dentists',
          colour: '#264653',
          data: data.workforce.map(d => ({
            date: yearToDate(d.year),
            value: d.nhs,
          })),
        },
        {
          id: 'private-dentists',
          label: 'Private-only dentists',
          colour: '#F4A261',
          data: data.workforce.map(d => ({
            date: yearToDate(d.year),
            value: d.private,
          })),
        },
      ]
    : [];

  const childExtractionsSeries: Series[] = data
    ? [{
        id: 'child-extractions',
        label: 'Tooth extractions under GA (0-17)',
        colour: '#E63946',
        data: data.childExtractions.map(d => ({
          date: yearToDate(d.year),
          value: d.extractions,
        })),
      }]
    : [];

  // -- Derived metrics --------------------------------------------------------

  const latestPatients = data?.patientsSeen[data.patientsSeen.length - 1];
  const peakPatients = data?.patientsSeen[0];

  const latestNHS = data?.workforce[data.workforce.length - 1];
  const firstNHS = data?.workforce[0];

  const latestExtractions = data?.childExtractions[data.childExtractions.length - 1];

  const nhsDecline = latestNHS && firstNHS
    ? Math.round(((firstNHS.nhs - latestNHS.nhs) / firstNHS.nhs) * 100)
    : 19;

  return (
    <>
      <TopicNav topic="NHS & Healthcare" />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <TopicHeader
          topic="NHS & Healthcare"
          question="Can you actually get an NHS dentist?"
          finding="Millions of people in England cannot access NHS dental care. Since 2012, the number of patients seen by an NHS dentist has fallen by over 8 million. Dentists are leaving the NHS in droves, and children are having rotten teeth pulled under general anaesthetic at record rates."
          colour="#E63946"
        />

        <section id="sec-context" className="max-w-2xl mt-4 mb-12">
          <div className="text-base text-wiah-black leading-[1.7] space-y-4">
            <p>
              NHS dentistry is in structural collapse. The 2006 NHS dental contract — universally regarded as a disaster by the profession — replaced fee-per-item payments with a system of Units of Dental Activity (UDAs) that set fixed prices regardless of treatment complexity. A simple check-up and a root canal earn a practice almost the same amount. The result was predictable: dentists began limiting NHS work, cherry-picking simpler cases, and eventually leaving the NHS altogether. Between 2015 and 2024, the number of dentists performing NHS work fell from an estimated 23,700 to 19,200, while the number working exclusively in private practice nearly doubled from 5,100 to 9,800. The exodus accelerated after COVID-19, when infection control requirements made NHS work even less financially viable.
            </p>
            <p>
              The consequences fall hardest on those who can least afford private care. Coastal towns, rural areas, and deprived communities have become dental deserts — places where no NHS dentist is accepting new patients within a 25-mile radius. In parts of Cornwall, Devon, Somerset, and Lincolnshire, people report waiting years to register. Some resort to DIY dentistry, pulling their own teeth or using superglue on broken fillings. The human cost is visible in hospital data: around 40,000 children a year are admitted for tooth extractions under general anaesthetic — the single most common reason for a child to be hospitalised in England. These are overwhelmingly preventable extractions caused by tooth decay from sugar consumption, compounded by the inability to access routine dental check-ups. The fluoridation of water supplies, proven to reduce childhood tooth decay by up to 28%, remains stalled by political reluctance despite consistent scientific evidence and broad public health support.
            </p>
            <p>
              The cost barriers compound the access crisis. NHS dental charges — currently up to {"\u00A3"}306.80 for Band 3 treatment — are the highest patient contribution in the NHS, deterring the very people who most need care. An estimated 13 million adults in England have unmet dental needs, and 97% of NHS dental practices are not accepting new adult patients for routine care. The government has announced a Dental Recovery Plan with additional UDA allocations and a new patient premium, but the BDA has described these measures as insufficient to reverse a structural failure two decades in the making. Without fundamental contract reform that makes NHS work financially viable for practices, the drift toward a two-tier system — private care for those who can pay, nothing for those who cannot — will continue.
            </p>
          </div>
        </section>

        <SectionNav sections={[
          { id: 'sec-overview', label: 'Overview' },
          { id: 'sec-patients', label: 'Patients seen' },
          { id: 'sec-workforce', label: 'Workforce' },
          { id: 'sec-children', label: 'Child extractions' },
        ]} />

        {/* Metric cards */}
        <div id="sec-overview" className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <MetricCard
            label="NHS practices not accepting new adults"
            value="97%"
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText="Unable to access NHS dental care · survey of all NHS practices"
            sparklineData={[82, 85, 88, 90, 91, 93, 95, 96, 97]}
            source="NHS BSA · NHS Dental Statistics, 2024"
            href="#sec-patients"
          />
          <MetricCard
            label="NHS dentist vacancies"
            value="3,000+"
            unit="2024"
            direction="up"
            polarity="up-is-bad"
            changeText={
              latestNHS && firstNHS
                ? `NHS workforce down ${nhsDecline}% since 2015 · private sector nearly doubled`
                : 'NHS workforce down 19% since 2015 · private sector nearly doubled'
            }
            sparklineData={
              data ? sparkFrom(data.workforce.map(d => firstNHS ? firstNHS.nhs - d.nhs : 0)) : [500, 800, 1200, 1600, 2100, 2500, 2800, 3000]
            }
            source="BDA · Dental Workforce Analysis, 2024"
            href="#sec-workforce"
          />
          <MetricCard
            label="Unmet dental need"
            value="13M"
            unit="people"
            direction="up"
            polarity="up-is-bad"
            changeText="Adults in England with unmet dental needs · up from 9M in 2019"
            sparklineData={[6.2, 6.8, 7.5, 8.1, 9.0, 10.2, 11.5, 12.1, 12.8, 13.0]}
            source="NHS Digital · GP Patient Survey dental supplement, 2024"
            href="#sec-children"
          />
        </div>

        {/* Chart 1: Patients seen by NHS dentist */}
        <ScrollReveal>
          <div id="sec-patients" className="mb-12">
            <LineChart
              series={patientsSeenSeries}
              title="Patients seen by an NHS dentist, England, 2012-2024"
              subtitle="Unique patients seen in 24-month period (adults) or 12-month period (children). Sharp COVID drop in 2020, with no recovery to pre-pandemic levels."
              yLabel="Patients"
              source={{
                name: 'NHS BSA',
                dataset: 'NHS Dental Statistics',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 2: Dentist workforce NHS vs private */}
        <ScrollReveal>
          <div id="sec-workforce" className="mb-12">
            <LineChart
              series={workforceSeries}
              title="Dentist workforce: NHS vs private-only, England, 2015-2024"
              subtitle="Dentists performing NHS activity declining steadily while private-only practitioners nearly double."
              yLabel="Dentists"
              source={{
                name: 'BDA / NHS BSA',
                dataset: 'Dental Workforce Data',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Chart 3: Child tooth extractions under GA */}
        <ScrollReveal>
          <div id="sec-children" className="mb-12">
            <LineChart
              series={childExtractionsSeries}
              title="Child tooth extractions under general anaesthetic, England, 2012-2024"
              subtitle="Hospital admissions for tooth extraction under GA, ages 0-17. The single most common reason for childhood hospitalisation in England."
              yLabel="Extractions"
              source={{
                name: 'NHS Digital',
                dataset: 'Hospital Episode Statistics — Tooth Extractions',
                frequency: 'annual',
              }}
            />
          </div>
        </ScrollReveal>

        {/* Positive callout */}
        <ScrollReveal>
          <PositiveCallout
            title="Dental vans and supervised brushing making a difference"
            value="1,800+ schools"
            description="Community dental vans — mobile practices that visit underserved areas — are providing check-ups and treatment in places where no NHS dentist is available, reaching over 120,000 patients in 2023/24. Supervised tooth-brushing programmes, now running in over 1,800 primary schools in the most deprived areas of England, have been shown to reduce tooth decay by up to 28% among participating children. Public Health England data shows the programmes cost less than 50p per child per week and prevent hospital admissions that cost the NHS over 1,000 per extraction under general anaesthetic. These programmes demonstrate that prevention works — the challenge is scaling them nationally."
            source="Source: Office for Health Improvement and Disparities — Supervised Tooth Brushing Programme, 2024. NHS BSA — Community Dental Services Activity Data, 2023/24."
          />
        </ScrollReveal>
        <RelatedTopics />
      </main>
    </>
  );
}
