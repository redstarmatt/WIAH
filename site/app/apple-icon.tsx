import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0D1117',
        }}
      >
        <div
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '80px',
            fontWeight: 700,
            fontStyle: 'italic',
            color: '#FFFFFF',
            lineHeight: 1,
          }}
        >
          W
        </div>
      </div>
    ),
    { ...size }
  );
}
