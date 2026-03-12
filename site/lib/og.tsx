import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface OgImageOptions {
  topic?: string;
  metric?: string;
  subtitle?: string;
}

export function generateOgImage({ topic, metric, subtitle }: OgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 72px',
          backgroundColor: '#0D1117',
          color: '#FFFFFF',
        }}
      >
        {/* Top: Site name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '28px',
              color: '#FFFFFF',
              display: 'flex',
            }}
          >
            What is{' '}
            <span style={{ fontWeight: 700, fontStyle: 'italic', margin: '0 6px' }}>
              actually
            </span>{' '}
            happening
            {topic ? (
              <span style={{ color: '#6B7280', marginLeft: '6px' }}>
                in {topic}
              </span>
            ) : (
              <span style={{ color: '#6B7280' }}>?</span>
            )}
          </div>
        </div>

        {/* Centre: Metric */}
        {metric ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              gap: '12px',
            }}
          >
            <div
              style={{
                fontFamily: 'Consolas, monospace',
                fontSize: '80px',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1,
              }}
            >
              {metric}
            </div>
            {subtitle && (
              <div
                style={{
                  fontFamily: 'Consolas, monospace',
                  fontSize: '22px',
                  color: '#6B7280',
                  textAlign: 'center',
                }}
              >
                {subtitle}
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              gap: '16px',
            }}
          >
            <div
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '48px',
                fontWeight: 400,
                color: '#FFFFFF',
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              The real state of the UK
            </div>
            <div
              style={{
                fontFamily: 'Consolas, monospace',
                fontSize: '20px',
                color: '#6B7280',
              }}
            >
              visible, understandable, shareable
            </div>
          </div>
        )}

        {/* Bottom: URL */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              fontFamily: 'Consolas, monospace',
              fontSize: '16px',
              color: '#6B7280',
            }}
          >
            whatisactuallyhappening.uk
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
