'use client';

import { useEffect } from 'react';

export default function ThemeInit() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentTheme = localStorage.getItem('theme');
      if (!currentTheme) {
        localStorage.setItem('theme', 'light');
      }
    }
  }, []);

  return null; // nothing rendered
}
