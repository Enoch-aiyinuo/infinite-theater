import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const indexSource = readFileSync(
  new URL('../client/index.html', import.meta.url),
  'utf8',
);

const mainSource = readFileSync(
  new URL('../client/src/main.tsx', import.meta.url),
  'utf8',
);

describe('optional analytics', () => {
  it('does not emit unresolved Vite placeholders into production HTML', () => {
    expect(indexSource).not.toContain('%VITE_ANALYTICS_ENDPOINT%');
    expect(indexSource).not.toContain('%VITE_ANALYTICS_WEBSITE_ID%');
  });

  it('only installs analytics when both settings are configured', () => {
    expect(mainSource).toContain('if (!endpoint || !websiteId) return');
    expect(mainSource).toContain('script.dataset.websiteId = websiteId');
  });
});
