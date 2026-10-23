import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    // Run as a devotee in India would: nothing may depend on the device time zone.
    setupFiles: ['tests/unit/setup.ts'],
  },
});
