import { describe, expect, it } from 'vitest';
import { GAMES } from '../client/src/data/games';
import {
  buildDeductionDelta,
  createDeductionGateId,
  getDeductionChoiceTarget,
  type DeductionOutcome,
  type DeductionStage,
} from '../client/src/lib/story-deduction';

describe('deduction gate progression', () => {
  it('routes correct and cost choices through all three rounds', () => {
    const endingNodeId = 92;
    const fallbackEndingNodeId = 102;

    expect(getDeductionChoiceTarget(endingNodeId, fallbackEndingNodeId, 1, 'correct'))
      .toBe(createDeductionGateId(endingNodeId, 2));
    expect(getDeductionChoiceTarget(endingNodeId, fallbackEndingNodeId, 2, 'cost'))
      .toBe(createDeductionGateId(endingNodeId, 3));
    expect(getDeductionChoiceTarget(endingNodeId, fallbackEndingNodeId, 3, 'correct'))
      .toBe(endingNodeId);
  });

  it('routes a wrong answer to the fallback ending at every round', () => {
    const endingNodeId = 92;
    const fallbackEndingNodeId = 102;

    for (const stage of [1, 2, 3] as DeductionStage[]) {
      expect(getDeductionChoiceTarget(endingNodeId, fallbackEndingNodeId, stage, 'wrong'))
        .toBe(fallbackEndingNodeId);
    }
  });
});

describe('deduction gate stats', () => {
  it('only emits official stat keys for every story and outcome', () => {
    const outcomes: DeductionOutcome[] = ['correct', 'wrong', 'cost'];
    const stages: DeductionStage[] = [1, 2, 3];

    for (const game of GAMES) {
      const expectedKeys = game.stats.map(stat => stat.key).sort();

      for (const outcome of outcomes) {
        for (const stage of stages) {
          const delta = buildDeductionDelta(game.id, outcome, stage);
          expect(Object.keys(delta).sort()).toEqual(expectedKeys);
          expect(Object.values(delta).every(Number.isFinite)).toBe(true);
        }
      }
    }
  });

  it('returns no stats for an unknown game', () => {
    expect(buildDeductionDelta('missing-game', 'correct', 1)).toEqual({});
  });
});
