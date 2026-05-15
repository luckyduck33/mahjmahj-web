import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// MAHJ MAHJ apple-touch icon — playful orange field, cream "M".
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
          background: '#E8652B',
          color: '#FBF4EC',
          fontSize: 120,
          fontWeight: 800,
          fontFamily: 'Helvetica, Arial, sans-serif',
        }}
      >
        M
      </div>
    ),
    size,
  );
}
