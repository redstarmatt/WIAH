'use client';

import { useState } from 'react';

interface IcbResult {
  name: string;
  avgWaitDays: number;
}

interface TrustResult {
  name: string;
  cat2MeanMins: number;
}

interface LookupResult {
  postcode: string;
  icb?: IcbResult;
  trust?: TrustResult;
  nationalGpWait?: number;
  nationalCat2?: number;
}

interface PostcodeLookupProps {
  gpIcbs?: { code: string; name: string; fullName?: string; avgWaitDays: number }[];
  ambTrusts?: { code: string; name: string; cat2MeanMins?: number }[];
  nationalGpWait?: number;
  nationalCat2?: number;
}

// Map postcode area (first 1-2 letters) → ambulance trust name
// Based on NHS ambulance trust catchment areas
const POSTCODE_TO_TRUST: Record<string, string> = {
  // London
  E: 'London', EC: 'London', N: 'London', NW: 'London', SE: 'London',
  SW: 'London', W: 'London', WC: 'London', BR: 'London', CR: 'London',
  DA: 'London', EN: 'London', HA: 'London', IG: 'London', KT: 'London',
  RM: 'London', SM: 'London', TW: 'London', UB: 'London',
  // North East
  DH: 'North East', DL: 'North East', NE: 'North East', SR: 'North East',
  TS: 'North East',
  // North West
  BB: 'North West', BL: 'North West', CA: 'North West', CH: 'North West',
  CW: 'North West', FY: 'North West', L: 'North West', LA: 'North West',
  M: 'North West', OL: 'North West', PR: 'North West', SK: 'North West',
  WA: 'North West', WN: 'North West',
  // Yorkshire
  BD: 'Yorkshire', DN: 'Yorkshire', HD: 'Yorkshire', HG: 'Yorkshire',
  HU: 'Yorkshire', HX: 'Yorkshire', LS: 'Yorkshire', S: 'Yorkshire',
  WF: 'Yorkshire', YO: 'Yorkshire',
  // East Midlands
  DE: 'East Midlands', LE: 'East Midlands', LN: 'East Midlands',
  NG: 'East Midlands', NN: 'East Midlands', PE: 'East Midlands',
  // West Midlands
  B: 'West Midlands', CV: 'West Midlands', DY: 'West Midlands',
  HR: 'West Midlands', ST: 'West Midlands', SY: 'West Midlands',
  TF: 'West Midlands', WR: 'West Midlands', WS: 'West Midlands',
  WV: 'West Midlands',
  // East of England
  AL: 'East of England', CB: 'East of England', CM: 'East of England',
  CO: 'East of England', HP: 'East of England', IP: 'East of England',
  LU: 'East of England', MK: 'East of England', NR: 'East of England',
  SG: 'East of England', SS: 'East of England',
  // South East Coast
  BN: 'South East Coast', CT: 'South East Coast', ME: 'South East Coast',
  RH: 'South East Coast', TN: 'South East Coast',
  // South Central
  GU: 'South Central', OX: 'South Central', PO: 'South Central',
  RG: 'South Central', SL: 'South Central', SO: 'South Central',
  SP: 'South Central',
  // South Western
  BA: 'South Western', BS: 'South Western', BH: 'South Western',
  DT: 'South Western', EX: 'South Western', GL: 'South Western',
  PL: 'South Western', SN: 'South Western', TA: 'South Western',
  TQ: 'South Western', TR: 'South Western',
  // Isle of Wight
  // (PO30-PO41 are IoW but we'll catch the broader PO under South Central)
};

function getPostcodeArea(postcode: string): string {
  const cleaned = postcode.replace(/\s+/g, '').toUpperCase();
  // Extract area: 1-2 letters at start
  const match = cleaned.match(/^([A-Z]{1,2})/);
  return match ? match[1] : '';
}

function matchTrust(
  area: string,
  trusts: { code: string; name: string; cat2MeanMins?: number }[]
): TrustResult | undefined {
  const trustName = POSTCODE_TO_TRUST[area];
  if (!trustName) return undefined;
  const match = trusts.find(t => t.name.toLowerCase().includes(trustName.toLowerCase()));
  if (match && match.cat2MeanMins) {
    return { name: match.name, cat2MeanMins: match.cat2MeanMins };
  }
  return undefined;
}

export default function PostcodeLookup({
  gpIcbs,
  ambTrusts,
  nationalGpWait,
  nationalCat2,
}: PostcodeLookupProps) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const cleaned = value.trim().toUpperCase();
    if (!cleaned || cleaned.length < 2) {
      setError('Please enter a valid postcode.');
      return;
    }

    const area = getPostcodeArea(cleaned);
    if (!area) {
      setError('Could not parse postcode area.');
      return;
    }

    const lookupResult: LookupResult = {
      postcode: cleaned,
      nationalGpWait,
      nationalCat2,
    };

    // Match ambulance trust
    if (ambTrusts) {
      lookupResult.trust = matchTrust(area, ambTrusts);
    }

    // Try postcodes.io API to get ICB name for GP matching
    try {
      const resp = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(cleaned)}`);
      if (resp.ok) {
        const data = await resp.json();
        const icbName = data.result?.ccg; // postcodes.io returns the CCG/ICB name
        if (icbName && gpIcbs) {
          // Fuzzy match: the API returns names like "NHS Gloucestershire" and we have "Gloucestershire"
          const match = gpIcbs.find(icb => {
            const apiClean = icbName.replace(/^NHS\s+/i, '').toLowerCase();
            return icb.name.toLowerCase().includes(apiClean) ||
                   apiClean.includes(icb.name.toLowerCase());
          });
          if (match) {
            lookupResult.icb = { name: match.name, avgWaitDays: match.avgWaitDays };
          }
        }
      }
    } catch {
      // API failed — still show trust result if we have it
    }

    if (!lookupResult.icb && !lookupResult.trust) {
      setError(`No data found for postcode area ${area}. Try a different postcode.`);
      return;
    }

    setResult(lookupResult);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your postcode"
          className="flex-1 px-4 py-2.5 border border-wiah-border rounded-lg font-mono text-sm text-wiah-black placeholder:text-wiah-mid focus:outline-none focus:ring-2 focus:ring-wiah-blue focus:border-transparent"
          aria-label="Postcode"
        />
        <button
          type="submit"
          className="px-5 py-2.5 bg-wiah-blue text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Look up
        </button>
      </form>

      {error && (
        <p className="mt-3 text-sm text-wiah-red">{error}</p>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          {result.trust && (
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-sm text-wiah-mid mb-1">Your ambulance trust</p>
                <p className="text-base font-bold text-wiah-black">{result.trust.name}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-mono text-2xl font-bold" style={{
                    color: result.trust.cat2MeanMins > 30 ? '#E63946' :
                           result.trust.cat2MeanMins > 18 ? '#F4A261' : '#2A9D8F'
                  }}>
                    {result.trust.cat2MeanMins.toFixed(0)} min
                  </span>
                  <span className="text-sm text-wiah-mid">Cat 2 mean response</span>
                </div>
                {result.nationalCat2 && (
                  <p className="font-mono text-xs text-wiah-mid mt-1">
                    National average: {result.nationalCat2.toFixed(0)} min · Target: 18 min
                  </p>
                )}
              </div>
            </div>
          )}

          {result.icb && (
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-sm text-wiah-mid mb-1">Your ICB area</p>
                <p className="text-base font-bold text-wiah-black">{result.icb.name}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-mono text-2xl font-bold" style={{
                    color: result.icb.avgWaitDays > 8 ? '#E63946' :
                           result.icb.avgWaitDays > 6 ? '#F4A261' : '#2A9D8F'
                  }}>
                    {result.icb.avgWaitDays.toFixed(1)} days
                  </span>
                  <span className="text-sm text-wiah-mid">avg GP wait</span>
                </div>
                {result.nationalGpWait && (
                  <p className="font-mono text-xs text-wiah-mid mt-1">
                    National average: {result.nationalGpWait.toFixed(1)} days
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
