'use client';

import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

interface MapDatum {
  name: string;
  value: number;
}

interface RegionalMapProps {
  title: string;
  subtitle?: string;
  geoUrl: string;
  data: MapDatum[];
  nameField: string;
  valueLabel: string;
  colourDirection: 'low-is-good' | 'high-is-good';
  source?: {
    name: string;
    dataset: string;
    url?: string;
    frequency?: string;
  };
}

export default function RegionalMap({
  title,
  subtitle,
  geoUrl,
  data,
  nameField,
  valueLabel,
  colourDirection,
  source,
}: RegionalMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [geo, setGeo] = useState<GeoJSON.FeatureCollection | null>(null);

  // Load GeoJSON
  useEffect(() => {
    fetch(geoUrl)
      .then(r => r.json())
      .then(setGeo)
      .catch(console.error);
  }, [geoUrl]);

  // Responsive resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(entries => {
      const { width } = entries[0].contentRect;
      const height = Math.min(500, width * 1.2);
      setDimensions({ width, height });
    });
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // Render map
  useEffect(() => {
    try {
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    if (!geo || !data.length || dimensions.width === 0) return;

    svg.selectAll('*').remove();

    const { width, height } = dimensions;

    // Strip degenerate geometry: rings with ≤3 points cannot form a valid polygon
    // and trip D3-geo's ring-clipping algorithm (ringEnd crash in d3-geo/src/clip).
    // This is common in official UK boundary files with tiny island sub-polygons.
    //
    // Correct approach:
    //   MultiPolygon — skip sub-polygons whose OUTER ring is degenerate;
    //                  strip degenerate HOLE rings from surviving sub-polygons.
    //   Polygon      — skip the feature if its outer ring is degenerate;
    //                  strip any degenerate hole rings.
    const safeGeo: GeoJSON.FeatureCollection = {
      ...geo,
      features: geo.features
        .map(f => {
          if (!f.geometry) return null;
          const g = f.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon;

          if (g.type === 'MultiPolygon') {
            // For a national choropleth, keep only the largest sub-polygon (the mainland).
            // The ONS boundary files include hundreds of tiny coastal fragments per ICB;
            // rendering them all paints scattered pixels across neighbouring ICB areas.
            const validPolys = (g.coordinates as GeoJSON.Position[][][])
              .filter(poly => poly[0] && poly[0].length > 3);
            if (validPolys.length === 0) return null;
            // Pick the sub-polygon whose outer ring has the most points (≈ largest area).
            const mainlandPoly = validPolys.reduce((best, poly) =>
              poly[0].length > best[0].length ? poly : best
            );
            // Strip degenerate hole rings from the chosen sub-polygon.
            const cleanPoly = mainlandPoly.filter(ring => ring.length > 3);
            return { ...f, geometry: { type: 'Polygon', coordinates: cleanPoly } as GeoJSON.Polygon };
          }

          if (g.type === 'Polygon') {
            const rings = g.coordinates as GeoJSON.Position[][];
            // Skip feature entirely if outer ring is degenerate
            if (rings[0].length <= 3) return null;
            // Strip degenerate hole rings, keep outer ring intact
            const filteredRings = rings.filter(ring => ring.length > 3);
            return { ...f, geometry: { ...g, coordinates: filteredRings } as GeoJSON.Polygon };
          }

          return f;
        })
        .filter((f): f is GeoJSON.Feature => f !== null),
    };

    // Build lookup: lowercase name → value
    const lookup = new Map<string, number>();
    data.forEach(d => lookup.set(d.name.toLowerCase(), d.value));

    const values = data.map(d => d.value);
    const minVal = d3.min(values) ?? 0;
    const maxVal = d3.max(values) ?? 1;
    // Centre diverging scale on the median so roughly half of regions are each colour
    const medianVal = d3.median(values) ?? (minVal + maxVal) / 2;

    // Colour scale
    const goodColour = '#2A9D8F';
    const midColour = '#F4A261';
    const badColour = '#E63946';

    const colorScale = d3.scaleLinear<string>()
      .domain([minVal, medianVal, maxVal])
      .range(
        colourDirection === 'low-is-good'
          ? [goodColour, midColour, badColour]
          : [badColour, midColour, goodColour]
      )
      .interpolate(d3.interpolateRgb);

    // d3.geoMercator().fitSize() calls geoBounds() internally, which uses D3's winding-order
    // convention to determine sphere vs polygon interior. The ONS boundary files have many
    // tiny sub-polygons whose winding confuses geoBounds() into returning the full globe
    // [[-180,-90],[180,90]], causing fitSize to compute scale ≈ 70 (globe scale) instead of
    // ~2500 (England scale).
    //
    // Fix: scan coordinates directly to get the true extent, then compute the Mercator
    // scale and translate manually — no geoBounds() call needed.
    const allLons: number[] = [], allLats: number[] = [];
    safeGeo.features.forEach(f => {
      const g = f.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon;
      const rings = g.type === 'Polygon'
        ? (g.coordinates as GeoJSON.Position[][])
        : (g.coordinates as GeoJSON.Position[][][]).flat();
      rings.forEach(ring => ring.forEach(([lon, lat]) => {
        allLons.push(lon);
        allLats.push(lat);
      }));
    });
    const lonMin = d3.min(allLons) ?? -7;
    const lonMax = d3.max(allLons) ?? 2;
    const latMin = d3.min(allLats) ?? 49;
    const latMax = d3.max(allLats) ?? 61;

    // Mercator y at scale=1: y = -log(tan(π/4 + lat_rad/2))
    const mercY = (lat: number) => -Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360));
    const lonRangeRad = (lonMax - lonMin) * Math.PI / 180;
    const yMercRange = mercY(latMin) - mercY(latMax); // south has larger y in Mercator

    const mapHeight = height - 60; // reserve 60px for legend
    const geoScale = Math.min(width / lonRangeRad, mapHeight / yMercRange);

    const projection = d3.geoMercator()
      .center([(lonMin + lonMax) / 2, (latMin + latMax) / 2])
      .scale(geoScale)
      .translate([width / 2, mapHeight / 2]);

    const path = d3.geoPath().projection(projection);

    // Draw regions
    svg
      .selectAll('path')
      .data(safeGeo.features)
      .join('path')
      .attr('d', d => path(d) ?? '')
      .attr('fill', d => {
        const name = (d.properties?.[nameField] ?? '').toLowerCase();
        const val = lookup.get(name);
        return val != null ? colorScale(val) : '#E5E7EB';
      })
      .attr('stroke', '#FFFFFF')
      .attr('stroke-width', 1)
      .style('cursor', 'pointer')
      .on('mouseover', function (event, d) {
        d3.select(this).attr('stroke', '#0D1117').attr('stroke-width', 2);
        const name = d.properties?.[nameField] ?? 'Unknown';
        const val = lookup.get(name.toLowerCase());
        tooltip
          .style('opacity', 1)
          .html(
            `<strong>${name}</strong><br/><span style="font-family:monospace">${
              val != null ? val.toFixed(1) : 'N/A'
            } ${valueLabel}</span>`
          );
      })
      .on('mousemove', function (event) {
        const [mx, my] = d3.pointer(event, containerRef.current);
        tooltip
          .style('left', mx + 12 + 'px')
          .style('top', my - 28 + 'px');
      })
      .on('mouseout', function () {
        d3.select(this).attr('stroke', '#FFFFFF').attr('stroke-width', 1);
        tooltip.style('opacity', 0);
      });

    // Legend bar
    const legendWidth = Math.min(200, width * 0.4);
    const legendHeight = 10;
    const legendX = width - legendWidth - 16;
    const legendY = height - 36;

    const defs = svg.append('defs');
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'map-legend-grad');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', colorScale(minVal));
    gradient.append('stop').attr('offset', '50%').attr('stop-color', colorScale(medianVal));
    gradient.append('stop').attr('offset', '100%').attr('stop-color', colorScale(maxVal));

    const lg = svg.append('g').attr('transform', `translate(${legendX},${legendY})`);
    lg.append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('rx', 3)
      .style('fill', 'url(#map-legend-grad)');

    lg.append('text')
      .attr('x', 0)
      .attr('y', legendHeight + 12)
      .attr('font-family', 'SF Mono, Fira Code, Consolas, monospace')
      .attr('font-size', '10px')
      .attr('fill', '#6B7280')
      .text(minVal.toFixed(1));

    lg.append('text')
      .attr('x', legendWidth)
      .attr('y', legendHeight + 12)
      .attr('text-anchor', 'end')
      .attr('font-family', 'SF Mono, Fira Code, Consolas, monospace')
      .attr('font-size', '10px')
      .attr('fill', '#6B7280')
      .text(maxVal.toFixed(1));

    lg.append('text')
      .attr('x', legendWidth / 2)
      .attr('y', -4)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'SF Mono, Fira Code, Consolas, monospace')
      .attr('font-size', '10px')
      .attr('fill', '#6B7280')
      .text(valueLabel);
    } catch (err) {
      console.warn('RegionalMap render error:', err);
    }
  }, [geo, data, dimensions, nameField, valueLabel, colourDirection]);

  return (
    <div className="mb-12">
      <h3 className="text-lg font-bold text-wiah-black mb-1">{title}</h3>
      {subtitle && (
        <p className="text-sm text-wiah-mid mb-4">{subtitle}</p>
      )}
      <div ref={containerRef} className="relative w-full">
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full"
        />
        <div
          ref={tooltipRef}
          className="absolute pointer-events-none bg-wiah-dark text-white text-xs px-3 py-2 rounded shadow-lg"
          style={{ opacity: 0, transition: 'opacity 150ms' }}
        />
      </div>
      {source && (
        <p className="font-mono text-[11px] text-wiah-mid mt-2">
          Source: {source.name} — {source.dataset}
          {source.frequency && ` (${source.frequency})`}.{' '}
          {source.url && (
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer"
              className="underline hover:text-wiah-blue"
            >
              Dataset ↗
            </a>
          )}
        </p>
      )}
    </div>
  );
}
