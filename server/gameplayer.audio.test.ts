import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const gamePlayerSource = readFileSync(
  new URL('../client/src/pages/GamePlayer.tsx', import.meta.url),
  'utf8',
);

function readNumericConstant(name: string) {
  const match = gamePlayerSource.match(new RegExp(`const ${name} = ([0-9.]+);`));
  return match ? Number(match[1]) : Number.NaN;
}

describe('GamePlayer audio safety', () => {
  it('only unlocks audio from an explicit sound control', () => {
    expect(gamePlayerSource).toContain('onClick={unlockAudioNow}');
    expect(gamePlayerSource).not.toContain("window.addEventListener('pointerdown', unlockAudio)");
    expect(gamePlayerSource).not.toContain("window.addEventListener('keydown', unlockAudio)");
  });

  it('keeps the ambient mix below the narration', () => {
    expect(readNumericConstant('AMBIENT_MASTER_GAIN')).toBeLessThanOrEqual(0.25);
    expect(readNumericConstant('AMBIENT_NOISE_BOOST')).toBeLessThanOrEqual(0.4);
    expect(readNumericConstant('AMBIENT_DREAD_LAYER_GAIN')).toBeLessThanOrEqual(0.1);
  });

  it('softens and limits generated ambience without restarting on every render', () => {
    expect(gamePlayerSource).toContain('context.createDynamicsCompressor()');
    expect(gamePlayerSource).toContain("ambientToneRef.current.type = 'lowpass'");
    expect(gamePlayerSource).toContain('const nodePresentation = React.useMemo(');
  });
});
