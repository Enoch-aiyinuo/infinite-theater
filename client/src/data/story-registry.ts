import type { StoryNode } from './story-types.ts';
import { RAINY_NIGHT_STORY } from './story-rainy-night.ts';
import { DEEP_SEA_STORY } from './story-deep-sea.ts';
import { PIRATE_LEGEND_STORY } from './story-pirate-legend.ts';
import { ANCIENT_MYSTERY_STORY } from './story-ancient-mystery.ts';
import { CYBER_DETECTIVE_STORY } from './story-cyber-detective.ts';
import { PALACE_INTRIGUE_STORY } from './story-palace-intrigue.ts';
import { WILDERNESS_SURVIVAL_STORY } from './story-wilderness-survival.ts';
import { FANTASY_HEALER_STORY_NODES } from './story-fantasy-healer.ts';
import { SPACE_DIPLOMAT_STORY } from './story-space-diplomat.ts';
import { HORROR_HOSPITAL_STORY } from './story-horror-hospital.ts';
import { CAMPUS_MYSTERY_STORY } from './story-campus-mystery.ts';
import { DESERT_KINGDOM_STORY } from './story-desert-kingdom.ts';

export const STORY_REGISTRY: Record<string, StoryNode[]> = {
  'rainy-night': RAINY_NIGHT_STORY,
  'deep-sea': DEEP_SEA_STORY,
  'pirate-legend': PIRATE_LEGEND_STORY,
  'ancient-mystery': ANCIENT_MYSTERY_STORY,
  'cyber-detective': CYBER_DETECTIVE_STORY,
  'palace-intrigue': PALACE_INTRIGUE_STORY,
  'wilderness-survival': WILDERNESS_SURVIVAL_STORY,
  'fantasy-healer': FANTASY_HEALER_STORY_NODES,
  'space-diplomat': SPACE_DIPLOMAT_STORY,
  'horror-hospital': HORROR_HOSPITAL_STORY,
  'campus-mystery': CAMPUS_MYSTERY_STORY,
  'desert-kingdom': DESERT_KINGDOM_STORY,
};

export interface StoryEndingMeta {
  id: string;
  name: string;
  description: string;
  type: 'good' | 'bad' | 'secret' | 'neutral';
}

function normalizeEndingType(type?: string): StoryEndingMeta['type'] {
  if (type === 'good' || type === 'bad' || type === 'secret' || type === 'neutral') {
    return type;
  }
  if (type === 'sacrifice') {
    return 'neutral';
  }
  return 'neutral';
}

function humanizeEndingId(endingId: string, fallbackIndex: number) {
  const explicitLabel = endingId.match(/[A-Za-z]/)
    ? endingId
        .split(/[-_]/g)
        .filter(Boolean)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    : endingId;

  return explicitLabel || `Ending ${fallbackIndex}`;
}

function extractEndingName(node: StoryNode, fallbackIndex: number) {
  const zhMatch = node.text.match(/结局[^：:]*[:：]\s*([^\)）\n]+)/);
  if (zhMatch?.[1]) return zhMatch[1].trim();

  const enMatch = node.text.match(/\(Ending[^:：]*[:：]\s*([^)]+)\)/i);
  if (enMatch?.[1]) return enMatch[1].trim();

  if (node.endingId) return humanizeEndingId(node.endingId, fallbackIndex);
  return `Ending ${fallbackIndex}`;
}

function extractEndingDescription(node: StoryNode) {
  const normalized = node.text
    .replace(/^（[^）]+）/, '')
    .replace(/^\([^)]+\)/, '')
    .trim();
  const firstSentence = normalized
    .split(/(?<=[。！？.!?])\s+/)
    .find(Boolean);

  return (firstSentence || normalized).slice(0, 90);
}

export function getStoryNodes(gameId: string) {
  return STORY_REGISTRY[gameId] || [];
}

export function getResolvedEndingId(gameId: string, endingIdOrNodeId: string) {
  const story = STORY_REGISTRY[gameId];
  if (!story) return endingIdOrNodeId;

  if (story.some(node => node.end && node.endingId === endingIdOrNodeId)) {
    return endingIdOrNodeId;
  }

  const numericId = Number(endingIdOrNodeId);
  if (!Number.isNaN(numericId)) {
    const endingNode = story.find(node => node.id === numericId && node.end);
    if (endingNode?.endingId) {
      return endingNode.endingId;
    }
  }

  return endingIdOrNodeId;
}

export function deriveStoryEndings(gameId: string, fallbackEndings: StoryEndingMeta[]) {
  const story = STORY_REGISTRY[gameId];
  if (!story?.length) return fallbackEndings;

  const fallbackById = new Map(fallbackEndings.map(ending => [ending.id, ending]));
  const uniqueEndings = new Map<string, StoryEndingMeta>();
  let fallbackIndex = 1;

  for (const node of story) {
    if (!node.end) continue;

    const endingId = node.endingId || `ending-${node.id}`;
    if (uniqueEndings.has(endingId)) continue;

    const fallback = fallbackById.get(endingId);
    uniqueEndings.set(endingId, {
      id: endingId,
      name: fallback?.name || extractEndingName(node, fallbackIndex),
      description: fallback?.description || extractEndingDescription(node),
      type: fallback?.type || normalizeEndingType(node.endType),
    });
    fallbackIndex += 1;
  }

  return Array.from(uniqueEndings.values());
}
