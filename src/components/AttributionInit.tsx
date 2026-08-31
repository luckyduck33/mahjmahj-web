'use client';

// Fires the first-touch UTM/referrer capture (lib/attribution.ts) once on
// mount. Renders nothing: this is a side-effect-only component, same
// pattern as Lucid Numbers' AttributionInit / MotionRuntime.

import { useEffect } from 'react';
import { captureAttributionOnLoad } from '@/lib/attribution';

export default function AttributionInit() {
  useEffect(() => {
    captureAttributionOnLoad();
  }, []);

  return null;
}
