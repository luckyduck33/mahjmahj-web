import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// MAHJ MAHJ favicon — playful orange field, cream "M".
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#E85416',
          color: '#FBF7EE',
          fontSize: 23,
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
