import { getGameById } from '../data/games';

export type DeductionOutcome = 'correct' | 'wrong' | 'cost';
export type DeductionStage = 1 | 2 | 3;

const PRESSURE_STAT_KEYS = new Set([
  'stress',
  'storm',
  'curse',
  'exposure',
  'danger',
  'darkness',
  'fear',
  'suspicion',
]);

const PRIMARY_DEDUCTION_STAT: Record<string, string> = {
  'rainy-night': 'clues',
  'deep-sea': 'sanity',
  'pirate-legend': 'crew',
  'ancient-mystery': 'wisdom',
  'cyber-detective': 'hacking',
  'palace-intrigue': 'influence',
  'wilderness-survival': 'supplies',
  'fantasy-healer': 'hope',
  'space-diplomat': 'diplomacy',
  'horror-hospital': 'truth',
  'campus-mystery': 'clues',
  'desert-kingdom': 'honor',
};

export function createDeductionGateId(endingNodeId: number, stage: DeductionStage) {
  return 900000 + endingNodeId * 10 + stage;
}

export function getDeductionChoiceTarget(
  endingNodeId: number,
  fallbackEndingNodeId: number,
  stage: DeductionStage,
  outcome: DeductionOutcome,
) {
  if (outcome === 'wrong') return fallbackEndingNodeId;
  if (stage === 3) return endingNodeId;
  return createDeductionGateId(endingNodeId, (stage + 1) as DeductionStage);
}

export function buildDeductionDelta(
  gameId: string,
  outcome: DeductionOutcome,
  stage: DeductionStage,
): Record<string, number> {
  const game = getGameById(gameId);
  if (!game) return {};

  const primaryStat = PRIMARY_DEDUCTION_STAT[gameId] || game.stats[0]?.key;
  const stageBoost = (stage - 1) * 2;

  return Object.fromEntries(
    game.stats.map(stat => {
      const isPressure = PRESSURE_STAT_KEYS.has(stat.key);
      const isPrimary = stat.key === primaryStat;

      if (outcome === 'correct') {
        return [stat.key, isPressure ? -(3 + stage) : isPrimary ? 8 + stageBoost : 3 + stage];
      }

      if (outcome === 'wrong') {
        return [stat.key, isPressure ? 8 + stageBoost : isPrimary ? -(7 + stageBoost) : -(3 + stage)];
      }

      return [stat.key, isPressure ? 5 + stage : isPrimary ? 5 + stageBoost : -(1 + stage)];
    }),
  );
}
