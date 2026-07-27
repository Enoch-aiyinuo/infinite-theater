import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const appSource = readFileSync(
  new URL('../client/src/App.tsx', import.meta.url),
  'utf8',
);

const gamePlayerSource = readFileSync(
  new URL('../client/src/pages/GamePlayer.tsx', import.meta.url),
  'utf8',
);

describe('GamePlayer layout safety', () => {
  it('removes the global navigation shell while a story is playing', () => {
    expect(appSource).toContain('const isPlaying = location.startsWith("/play/")');
    expect(appSource).toContain('{!isPlaying && <Navbar />}');
  });

  it('keeps icon-only story controls accessible', () => {
    expect(gamePlayerSource).toContain("aria-label={language === 'en' ? 'Story history' : '剧情记录'}");
    expect(gamePlayerSource).toContain("aria-label={language === 'en' ? 'Voice settings' : '语音设置'}");
    expect(gamePlayerSource).toContain("aria-label={t('gamePlayer.buttons.restart')}");
  });

  it('uses a compact mobile story surface so choices arrive sooner', () => {
    expect(gamePlayerSource).toContain("max-h-[52vh] overflow-y-auto");
    expect(gamePlayerSource).toContain('hidden sm:grid');
  });
});
