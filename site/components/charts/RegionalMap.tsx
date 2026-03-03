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
    const svg = d3.select(svgRef.current);
    const tooltip = d3.select(tooltipRef.current);
    if (!geo || !data.length || dimensions.width === 0) return;

    svg.selectAll('*').remove();

    const { width, height } = dimensions;

    // Build lookup: lowercase name → value
    const lookup = new Map<string, number>();
    data.forEach(d => lookup.set(d.name.toLowerCase(), d.value));

    const values = data.map(d => d.value);
    const minVal = d3.min(values) ?? 0;
    const maxVal = d3.max(values) ?? 1;

    // Colour scale
    const goodColour = '#2A9D8F';
    const midColour = '#F4A261';
    const badColour = '#E63946';

    const colorScale = d3.scaleLinear<string>()
      .domain([minVal, (minVal + maxVal) / 2, maxVal])
      .range(
        colourDirection === 'low-is-good'
          ? [goodColour, midColour, badColour]
          : [badColour, midColour, goodColour]
      )
      .interpolate(d3.interpolateRgb);

    // Projection
    const projection = d3.geoMercator().fitSize([width, height - 60], geo);
    const path = d3.geoPath().projection(projection);

    // Draw regions
    svg
      .selectAll('path')
      .data(geo.features)
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
    gradient.append('stop').attr('offset', '50%').attr('stop-color', colorScale((minVal + maxVal) / 2));
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
