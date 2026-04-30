import type { GameData } from '@/data/games';
import type { StoryChoice, StoryNode } from '@/data/story-types';
import type { Language } from '@/hooks/useLanguage';

type EffectType = 'rain' | 'fog' | 'embers' | 'scanlines' | 'starlight' | 'sand' | 'snow';
type Tension = 'low' | 'medium' | 'high';

export interface GameMarketingCopy {
  hook: string;
  hookEn: string;
  teaser: string;
  teaserEn: string;
  stakes: string;
  stakesEn: string;
}

export interface NodePresentation {
  objective: string;
  status: string;
  tension: Tension;
  effect: EffectType;
  sceneLabel?: string;
  pulseLabel: string;
}

const GAME_MARKETING: Record<string, GameMarketingCopy> = {
  'rainy-night': {
    hook: '一通求救电话，可能是陷阱，也可能是一条命。',
    hookEn: 'One plea for help. Either a trap, or a life hanging by a thread.',
    teaser: '在暴雨、谎言与失踪案之间，抢在凶手之前找到她。',
    teaserEn: 'Race through rain, lies, and a missing-person trail before the killer does.',
    stakes: '你追得越深，离真相越近，也越接近那个想让所有证据沉下去的人。',
    stakesEn: 'The deeper you chase the truth, the closer you get to the one determined to bury it all.',
  },
  'deep-sea': {
    hook: '研究站失联四小时后，你在四千米海底醒来。',
    hookEn: 'Four hours after the station went dark, you wake up four thousand meters below the sea.',
    teaser: '氧气在掉、电力在掉、理智也在掉，但有人比海压更危险。',
    teaserEn: 'Oxygen is falling, power is fading, and sanity is fraying, but someone is more dangerous than the pressure outside.',
    stakes: '你要决定先救人、先逃命，还是先把深海里那份不能见光的真相带出去。',
    stakesEn: 'You must decide whether to save lives, save yourself, or drag the hidden truth out of the abyss.',
  },
};

const DEFAULT_MARKETING: GameMarketingCopy = {
  hook: '每一个选择都会改变你的命运走向。',
  hookEn: 'Every choice bends your fate toward a different ending.',
  teaser: '这不是读故事，而是在危险里亲手写下你的版本。',
  teaserEn: 'This is not just reading a story. It is writing your own version inside the danger.',
  stakes: '选错一步，你失去的可能不只是结局，而是本来有机会拯救的人。',
  stakesEn: 'One wrong step can cost more than an ending. It can cost the people you could have saved.',
};

const KEYWORD_EFFECTS: Array<{ pattern: RegExp; effect: EffectType; tension?: Tension; status: string; statusEn: string }> = [
  { pattern: /雨|雷|闪电|潮湿|电话|街道/, effect: 'rain', tension: 'high', status: '雨夜压迫感正在上升', statusEn: 'The storm pressure is intensifying.' },
  { pattern: /黑暗|幽灵|医院|血|尖叫|诅咒|冷气/, effect: 'fog', tension: 'high', status: '危险正从看不见的地方逼近', statusEn: 'Danger is closing in from the unseen.' },
  { pattern: /火|爆炸|引擎|余烬|熔毁|热浪/, effect: 'embers', tension: 'high', status: '局势正在失控，时间很紧', statusEn: 'The situation is spiraling and time is running out.' },
  { pattern: /数据|系统|AI|赛博|屏幕|终端|协议/, effect: 'scanlines', tension: 'medium', status: '系统信号异常，信息真假难辨', statusEn: 'The system signal is unstable and truth is hard to parse.' },
  { pattern: /太空|星|银河|飞船|外星/, effect: 'starlight', tension: 'medium', status: '交涉窗口很短，每句话都算数', statusEn: 'The negotiation window is short and every line matters.' },
  { pattern: /沙漠|王国|风沙|神庙/, effect: 'sand', tension: 'medium', status: '环境与人心都在考验你', statusEn: 'Both the world and the people in it are testing you.' },
  { pattern: /雪|寒冷|荒野|暴风雪|冰/, effect: 'snow', tension: 'medium', status: '资源正在流失，必须尽快抉择', statusEn: 'Resources are slipping away. Decide quickly.' },
];

const OBJECTIVE_PATTERNS: Array<{ pattern: RegExp; zh: string; en: string }> = [
  { pattern: /电话|来电|求救/, zh: '锁定求救者的位置，不要让这通电话变成最后的线索。', en: 'Pin down the caller before this turns into the last trace they leave behind.' },
  { pattern: /幸存者|同事|伤口|被困/, zh: '稳住现场并确认谁还活着，你的选择会决定队伍能不能撑下去。', en: 'Stabilize the scene and confirm who is still alive. Your call decides whether the group holds together.' },
  { pattern: /通讯|信号|联络|广播/, zh: '恢复联系，但别把自己的位置和底牌一起暴露出去。', en: 'Restore communication, but do not give away your position and leverage for free.' },
  { pattern: /证据|线索|日志|笔记|数据|真相/, zh: '把真相拼起来，在敌人销毁证据前先拿到关键一块。', en: 'Assemble the truth and seize the critical piece before someone erases it.' },
  { pattern: /追逐|逃|仓库|别墅|走廊|门/, zh: '先判断风险，再推进一步；你要的是活着抵达下一个节点。', en: 'Read the risk before you move. Surviving to the next beat matters more than acting fast.' },
];

function getLocalized<T extends string | undefined>(zh: T, en: T, language: Language): string {
  return language === 'en' && en ? en : zh || '';
}

function inferSceneLabel(node: StoryNode, language: Language): string | undefined {
  return getLocalized(node.scene, node.sceneEn, language) || undefined;
}

function summarizeChoicePush(language: Language, choices?: StoryChoice[]): string {
  if (!choices?.length) {
    return language === 'en' ? 'Read the room and prepare for the next turn.' : '观察局势，准备迎接下一步变化。';
  }

  const leadChoice = choices[0];
  const choiceText = getLocalized(leadChoice.text, leadChoice.textEn, language);
  if (!choiceText) {
    return language === 'en' ? 'Choose how to advance before the opening closes.' : '抓住窗口期，决定你要怎样推进。';
  }

  return language === 'en'
    ? `Your next move is to ${choiceText.replace(/[.。！!？?]$/, '').toLowerCase()}.`
    : `你现在最关键的一步是：${choiceText.replace(/[。！!？?]$/, '')}。`;
}

export function getGameMarketingCopy(game: GameData, language: Language) {
  const copy = GAME_MARKETING[game.id] || DEFAULT_MARKETING;
  return {
    hook: language === 'en' ? copy.hookEn : copy.hook,
    teaser: language === 'en' ? copy.teaserEn : copy.teaser,
    stakes: language === 'en' ? copy.stakesEn : copy.stakes,
  };
}

export function getChoiceDeltaSummary(choice: StoryChoice, game: GameData, language: Language) {
  if (!choice.delta) return [];

  return Object.entries(choice.delta)
    .filter(([, value]) => value !== 0)
    .map(([key, value]) => {
      const stat = game.stats.find(item => item.key === key);
      const label = stat ? (language === 'en' ? stat.label : stat.label) : key;
      return {
        key,
        label,
        value,
        color: stat?.color || (value > 0 ? 'oklch(0.60 0.18 145)' : 'oklch(0.55 0.22 25)'),
      };
    });
}

export function getNodePresentation(node: StoryNode, game: GameData, language: Language): NodePresentation {
  const localizedText = getLocalized(node.text, node.textEn, language);
  const localizedScene = inferSceneLabel(node, language);
  const matchedEffect = KEYWORD_EFFECTS.find(item => item.pattern.test(localizedText) || (localizedScene ? item.pattern.test(localizedScene) : false));
  const objectiveMatch = OBJECTIVE_PATTERNS.find(item => item.pattern.test(localizedText));

  const objective = objectiveMatch
    ? (language === 'en' ? objectiveMatch.en : objectiveMatch.zh)
    : summarizeChoicePush(language, node.choices);

  const status = matchedEffect
    ? (language === 'en' ? matchedEffect.statusEn : matchedEffect.status)
    : language === 'en'
      ? 'Stay sharp. The next decision may flip the whole story.'
      : '保持警惕，下一次选择可能直接翻转局势。';

  const tension: Tension = matchedEffect?.tension || (node.end ? 'high' : node.choices && node.choices.length >= 3 ? 'medium' : 'low');
  const effect = matchedEffect?.effect || inferDefaultEffect(game.id);

  const pulseLabel = language === 'en'
    ? tension === 'high'
      ? 'High-stakes beat'
      : tension === 'medium'
        ? 'Pressure building'
        : 'Quiet before the turn'
    : tension === 'high'
      ? '关键抉择时刻'
      : tension === 'medium'
        ? '压力正在累积'
        : '风暴前的短暂停顿';

  return {
    objective,
    status,
    tension,
    effect,
    sceneLabel: localizedScene,
    pulseLabel,
  };
}

function inferDefaultEffect(gameId: string): EffectType {
  if (gameId.includes('rain') || gameId.includes('campus')) return 'rain';
  if (gameId.includes('deep') || gameId.includes('hospital')) return 'fog';
  if (gameId.includes('cyber')) return 'scanlines';
  if (gameId.includes('space')) return 'starlight';
  if (gameId.includes('desert')) return 'sand';
  if (gameId.includes('wilderness')) return 'snow';
  return 'embers';
}

function punctuatedPause(text: string) {
  return text
    .replace(/\n{2,}/g, '。 ')
    .replace(/([。！？!?])(?=\S)/g, '$1 ')
    .replace(/([，,；;：:])(?=\S)/g, '$1 ');
}

export function splitNarrationIntoChunks(text: string) {
  return punctuatedPause(text)
    .split(/(?<=[。！？!?])/)
    .map(chunk => chunk.trim())
    .filter(Boolean);
}

export type VoiceSegment = {
  text: string;
  speaker?: string;
};

const NARRATOR_VOICE_HINTS = {
  zh: [
    'xiaoxiao',
    'xiaoyi',
    'xiaohan',
    'xiaomo',
    'xiaomeng',
    'xiaoxuan',
    'xiaoqiu',
    'xiaorui',
    'xiaoshuang',
    'xiaoyan',
    'huihui',
    'yaoyao',
    'hsiaochen',
    'hsiao chen',
    'hsiaoyu',
    'hsiao yu',
    'wanlung',
    'wan lung',
    'yating',
    'jia-jia',
    'ting-ting',
    'tingting',
    'mei-jia',
    'meijia',
    'sin-ji',
    'sinji',
    '婷婷',
    '美嘉',
    '善怡',
    '晓晓',
    '晓伊',
    '晓涵',
    '晓墨',
    '晓梦',
    '晓萱',
    '晓秋',
    '晓睿',
    '晓双',
    '晓颜',
    '慧慧',
    '瑶瑶',
    'flo',
    'grandma',
    'sandy',
    'shelley',
    'premium',
    'enhanced',
    'natural',
    'neural',
  ],
  en: ['ava', 'victoria', 'samantha', 'zira', 'karen', 'serena', 'allison', 'aria', 'moira', 'tessa', 'fiona', 'flo', 'sandy', 'shelley', 'premium', 'enhanced', 'natural', 'neural'],
} as const;

const FEMALE_VOICE_NAME_PATTERN = /female|woman|婷婷|美嘉|善怡|晓晓|晓伊|晓涵|晓墨|晓梦|晓萱|晓秋|晓睿|晓双|晓颜|慧慧|瑶瑶|xiaoxiao|xiaoyi|xiaohan|xiaomo|xiaomeng|xiaoxuan|xiaoqiu|xiaorui|xiaoshuang|xiaoyan|huihui|yaoyao|hsiao\s?-?chen|hsiao\s?-?yu|wan\s?-?lung|yating|ting-ting|tingting|mei-jia|meijia|sin-ji|sinji|samantha|victoria|zira|\bava\b|karen|serena|allison|\baria\b|jia-jia|moira|tessa|fiona|\bflo\b|grandma|sandy|shelley|mei|susan|joana|luciana/;
const MALE_VOICE_NAME_PATTERN = /(^|\s|-)(male|man)(\s|-|$)|yunxi|yunyang|yunjian|yunfeng|yunhao|yunjhe|kangkang|daniel|alex|fred|david|thomas|grandpa|eddy|reed|rocko/;
const NOVELTY_VOICE_NAME_PATTERN = /novelty|robot|synth|whisper|monica|trinoids|zarvox|bad news|bells|boing|bubbles|cellos|good news/;

function voiceMatchesLanguage(voice: SpeechSynthesisVoice, language: Language) {
  return language === 'zh'
    ? voice.lang.startsWith('zh') || voice.lang.startsWith('cmn')
    : voice.lang.startsWith('en');
}

function isLikelyFemaleVoice(voice: SpeechSynthesisVoice) {
  return FEMALE_VOICE_NAME_PATTERN.test(voice.name.toLowerCase());
}

function isLikelyMaleVoice(voice: SpeechSynthesisVoice) {
  return MALE_VOICE_NAME_PATTERN.test(voice.name.toLowerCase());
}

function getRoleScopedVoices(voices: SpeechSynthesisVoice[], role: VoiceRole, language: Language) {
  const candidates = voices.filter(voice => voiceMatchesLanguage(voice, language));
  if (candidates.length === 0) return candidates;

  if (role === 'narrator' || role === 'female') {
    const femaleVoices = candidates.filter(isLikelyFemaleVoice);
    if (femaleVoices.length > 0) return femaleVoices;
    const naturalNonMaleVoices = candidates.filter(voice => !isLikelyMaleVoice(voice) && !NOVELTY_VOICE_NAME_PATTERN.test(voice.name.toLowerCase()));
    if (role === 'narrator' && naturalNonMaleVoices.length > 0) return naturalNonMaleVoices;
  }

  if (role === 'male') {
    const maleVoices = candidates.filter(isLikelyMaleVoice);
    if (maleVoices.length > 0) return maleVoices;
  }

  return candidates;
}

export function getPreferredNarratorVoiceName(voices: SpeechSynthesisVoice[], language: Language) {
  const candidates = getRoleScopedVoices(voices, 'narrator', language);
  return candidates
    .map(voice => ({
      voice,
      score:
        scoreVoiceName(voice.name, 'narrator', language) +
        (isLikelyFemaleVoice(voice) ? 20 : 0) +
        (isLikelyMaleVoice(voice) ? -30 : 0) +
        (voice.localService ? 2 : 0) +
        (voice.default ? -2 : 0),
    }))
    .sort((a, b) => b.score - a.score)[0]?.voice.name || '';
}

export function getSpeechEmotion(text: string): { rate: number; pitch: number; volume: number } {
  const intense = /！|!|快|跑|危险|杀|坍塌|救命|警报|爆炸|黑暗/.test(text);
  const tense = /？|\?|怀疑|未知|线索|秘密|真相|异常/.test(text);
  const calm = /平静|深呼吸|等待|观察|记录|回忆/.test(text);

  if (intense) return { rate: 1.02, pitch: 1.04, volume: 1 };
  if (tense) return { rate: 0.94, pitch: 1.01, volume: 0.96 };
  if (calm) return { rate: 0.9, pitch: 0.98, volume: 0.92 };
  return { rate: 0.96, pitch: 1, volume: 0.95 };
}

export type VoiceRole = 'narrator' | 'female' | 'male' | 'robot' | 'mysterious' | 'neutral';
export type VoiceStylePreset = 'cinematic' | 'warm' | 'cold' | 'tense' | 'humanFemale';

const SPEAKER_ROLE_OVERRIDES: Record<string, Array<{ pattern: RegExp; role: VoiceRole }>> = {
  'ancient-mirror': [
    { pattern: /^白灵儿$/, role: 'female' },
  ],
  'rainy-night': [
    { pattern: /^林晓$|^刘警官$|^张明远$/, role: 'male' },
    { pattern: /^神秘女子$|^陈雨薇$/, role: 'female' },
  ],
  'deep-sea': [
    { pattern: /^陈深$|^林海$|^赵远$|^救援队$|^站长赵远$/, role: 'male' },
    { pattern: /^苏晴$/, role: 'female' },
    { pattern: /^系统$|^广播$/, role: 'robot' },
    { pattern: /^未知生物$|^深海回声$/, role: 'mysterious' },
  ],
  'pirate-legend': [
    { pattern: /^罗珊$|^血月女王$/, role: 'female' },
    { pattern: /^船员$|^老水手$|^海军军官$|^大副$|^水手长$|^老鬼$|^铁钩汉斯$/, role: 'male' },
    { pattern: /^幽灵船长$|^海上传说$|^守护者$/, role: 'mysterious' },
  ],
  'ancient-mystery': [
    { pattern: /^叶云霄$|^protagonist$/, role: 'female' },
    { pattern: /^npc-阿牧$|^npc-师父陈博远$|^陈博远$/, role: 'male' },
    { pattern: /^古灵$|^墓中低语$/, role: 'mysterious' },
  ],
  'asylum': [
    { pattern: /^protagonist$/, role: 'female' },
    { pattern: /^护士长$|^护士$/, role: 'female' },
    { pattern: /^院长$|^7号病人$/, role: 'mysterious' },
  ],
  'campus-mystery': [
    { pattern: /^顾晓$|^同学$|^室友$|^学姐$|^林诗涵$|^苏晴$/, role: 'female' },
    { pattern: /^保安$|^老师$|^教导主任$|^阿杰$|^夏言$|^林俊豪$/, role: 'male' },
    { pattern: /^旧校广播$|^深夜脚步声$/, role: 'mysterious' },
  ],
  'cyber-detective': [
    { pattern: /^零$|^侦探零$|^protagonist$/, role: 'male' },
    { pattern: /^AI$|^ARIA$|^系统$|^npc-ARIA$/, role: 'robot' },
    { pattern: /^女记者$|^证人$/, role: 'female' },
    { pattern: /^未知意识$|^黑客幻象$|^npc-蜘蛛$|^npc-幕后黑手$/, role: 'mysterious' },
  ],
  'palace-intrigue': [
    { pattern: /^沈若华$|^皇后$|^皇后娘娘$|^妃子$|^宫女$/, role: 'female' },
    { pattern: /^皇帝$|^三皇子$|^三皇子李承泽$|^李承泽$|^太监总管$|^侍卫统领$/, role: 'male' },
    { pattern: /^密诏低语$|^宫中传闻$/, role: 'mysterious' },
  ],
  'fantasy-healer': [
    { pattern: /^艾拉$|^protagonist$/, role: 'female' },
    { pattern: /^npc-骑士护卫卡尔$|^卡尔$/, role: 'male' },
    { pattern: /^npc-黑暗魔法师莫里安$|^莫里安$|^npc-精灵长老$/, role: 'mysterious' },
  ],
  'fantasy-cafe': [
    { pattern: /^protagonist$/, role: 'female' },
  ],
  'hacker-code': [
    { pattern: /^AI伊甸$/, role: 'robot' },
    { pattern: /^CEO$|^protagonist$/, role: 'male' },
  ],
  'space-diplomat': [
    { pattern: /^外交官$|^陈宇$|^王将军$|^protagonist$|^general-wang$/, role: 'male' },
    { pattern: /^秘书官$|^翻译官$/, role: 'female' },
    { pattern: /^外星人$|^Zyx代表$|^空间站系统$|^zyx-ambassador$/, role: 'robot' },
    { pattern: /^未知讯号$|^宇宙低语$/, role: 'mysterious' },
  ],
  'horror-hospital': [
    { pattern: /^苏明$|^protagonist$/, role: 'male' },
    { pattern: /^护士$|^病房女孩$/, role: 'female' },
    { pattern: /^幽灵$|^院长亡魂$|^镜中低语$|^npc-七号$|^npc-老院长$/, role: 'mysterious' },
    { pattern: /^广播$/, role: 'robot' },
  ],
  'desert-kingdom': [
    { pattern: /^萨利姆$|^侍卫$|^商队首领$|^protagonist$|^npc-法鲁克$/, role: 'male' },
    { pattern: /^娜拉$|^舞姬$|^王后$|^npc-娜拉$/, role: 'female' },
    { pattern: /^祭司$|^沙海低语$|^古神回声$/, role: 'mysterious' },
  ],
  'detective-academy': [
    { pattern: /^顾北$/, role: 'male' },
    { pattern: /^院长$/, role: 'mysterious' },
  ],
  'last-train': [
    { pattern: /^protagonist$/, role: 'male' },
    { pattern: /^chen_bo$/, role: 'male' },
  ],
  'palace-chess': [
    { pattern: /^protagonist$/, role: 'female' },
  ],
  'star-diplomacy': [
    { pattern: /^protagonist$/, role: 'male' },
  ],
  'wilderness-survival': [
    { pattern: /^林峰$|^向导$|^老兵$|^protagonist$/, role: 'male' },
    { pattern: /^幸存者$|^小女孩$|^女乘客$|^npc-小雨$/, role: 'female' },
    { pattern: /^风雪$|^荒野回声$/, role: 'mysterious' },
  ],
  'wilderness': [
    { pattern: /^protagonist$/, role: 'male' },
  ],
};

const SPEAKER_HINT_PATTERNS: Array<{ pattern: RegExp; role: VoiceRole }> = [
  { pattern: /AI|系统|广播|终端|协议|外星代表|ambassador|伊甸|ARIA|zyx/i, role: 'robot' },
  { pattern: /幽灵|亡魂|低语|黑影|幕后|祭司|古灵|神秘|七号病人|深海回声|宇宙低语|荒野回声/i, role: 'mysterious' },
  { pattern: /护士长|护士|学姐|王后|宫女|舞姬|秘书官|翻译官|女子|女孩|雨薇|娜拉|白灵儿/i, role: 'female' },
  { pattern: /院长|老师|将军|侍卫|护卫|CEO|法鲁克|顾北|陈博远|阿牧|chen_bo|王将军/i, role: 'male' },
];

const TEXT_ROLE_HINTS: Array<{ pattern: RegExp; role: VoiceRole }> = [
  { pattern: /电子音|机械音|广播里传来|系统提示|合成音|协议|终端屏幕/, role: 'robot' },
  { pattern: /耳边低语|看不见的人|黑影|阴冷的笑声|诅咒|亡魂|脚步声越来越近|不可名状/, role: 'mysterious' },
  { pattern: /她颤抖着说|女孩的声音|女人的声音|轻声说|柔声说道/, role: 'female' },
  { pattern: /他压低声音|男人的声音|低沉地说|沉声说道/, role: 'male' },
];

export function detectVoiceRole(gameId: string, speaker?: string, text?: string): VoiceRole {
  if (!speaker || speaker === 'narrator') return 'narrator';
  const override = SPEAKER_ROLE_OVERRIDES[gameId]?.find(item => item.pattern.test(speaker));
  if (override) return override.role;
  const speakerHint = SPEAKER_HINT_PATTERNS.find(item => item.pattern.test(speaker));
  if (speakerHint) return speakerHint.role;
  if (/^npc-/.test(speaker)) {
    if (/艾拉|雨薇|若华|顾晓|娜拉|女子|学姐|王后|护士|精灵|白灵儿|小雨/.test(speaker)) return 'female';
    if (/卡尔|陈博远|阿牧|护卫|侍卫|将军|老师|院长|法鲁克|顾北|chen_bo/.test(speaker)) return 'male';
    if (/莫里安|ARIA|蜘蛛|幕后黑手|七号|老院长/.test(speaker)) return 'mysterious';
    return 'neutral';
  }
  if (/^protagonist$/.test(speaker)) {
    if (/ancient-mirror|ancient-mystery|asylum|fantasy-cafe|fantasy-healer|palace-chess/.test(gameId)) return 'female';
    return 'male';
  }
  const textHint = TEXT_ROLE_HINTS.find(item => item.pattern.test(text || ''));
  if (textHint) return textHint.role;
  if (/AI|系统|外星|古灵|幽灵/i.test(speaker) || /AI|系统|机械|协议|电子/.test(text || '')) return 'robot';
  if (/神秘|未知|低语|黑影|陌生/.test(speaker) || /诅咒|阴影|不可名状/.test(text || '')) return 'mysterious';
  if (/女子|妃子|艾拉|苏晴|娜拉|陈雨薇|沈若华|顾晓/.test(speaker)) return 'female';
  if (/林晓|林峰|刘警官|张明远|萨利姆|皇帝|赵远|陈深/.test(speaker)) return 'male';
  if (gameId === 'cyber-detective' && speaker === '零') return 'male';
  return 'neutral';
}

const AUTO_DIALOGUE_SPEAKERS: Record<string, Array<{ speaker: string; pattern: RegExp }>> = {
  'rainy-night': [
    { speaker: '神秘女子', pattern: /女声|女人|陈雨薇|她压低声音|她低声|电话那头/ },
    { speaker: '林晓', pattern: /林晓|你问|你说|你低声|你大喊|你握紧/ },
    { speaker: '刘警官', pattern: /刘警官/ },
    { speaker: '张明远', pattern: /张明远/ },
  ],
  'deep-sea': [
    { speaker: '系统', pattern: /系统|控制面板|通讯器|警报|日志显示|状态显示/ },
    { speaker: '陈深', pattern: /陈深|你说|你问|你努力回忆|你告诉/ },
    { speaker: '林海', pattern: /林海/ },
    { speaker: '苏晴', pattern: /苏晴/ },
    { speaker: '赵远', pattern: /赵远|站长/ },
    { speaker: '救援队', pattern: /救援队|海面/ },
    { speaker: '未知生物', pattern: /未知生物|深海回声|某种东西/ },
  ],
  'pirate-legend': [
    { speaker: '罗珊', pattern: /罗珊|血月女王|船长，你是罗珊|你的命令/ },
    { speaker: '老鬼', pattern: /老鬼/ },
    { speaker: '大副', pattern: /大副/ },
    { speaker: '铁钩汉斯', pattern: /汉斯|铁钩/ },
    { speaker: '幽灵船长', pattern: /幽灵船长|守护者|幽灵岛在说话/ },
  ],
  'palace-intrigue': [
    { speaker: '沈若华', pattern: /沈若华|臣妾|她轻声自语|她恭敬地回答/ },
    { speaker: '皇后', pattern: /皇后娘娘|本宫/ },
    { speaker: '三皇子', pattern: /三皇子|李承泽|本王/ },
    { speaker: '皇帝', pattern: /皇帝|圣上/ },
  ],
  'campus-mystery': [
    { speaker: '顾晓', pattern: /顾晓|你问|你说|你喃喃自语/ },
    { speaker: '阿杰', pattern: /阿杰/ },
    { speaker: '林诗涵', pattern: /林诗涵/ },
    { speaker: '夏言', pattern: /夏言/ },
    { speaker: '苏晴', pattern: /苏晴/ },
    { speaker: '林俊豪', pattern: /林俊豪/ },
  ],
};

function inferSpeakerFromContext(gameId: string, context: string) {
  const candidates = AUTO_DIALOGUE_SPEAKERS[gameId] || [];
  return candidates.find(item => item.pattern.test(context))?.speaker;
}

export function extractVoiceSegments(text: string, gameId: string, speaker?: string): VoiceSegment[] {
  if (!text.trim()) return [];
  if (speaker && speaker !== 'narrator') {
    return [{ text, speaker }];
  }

  const quoteRegex = /["“](.+?)["”]/g;
  const paragraphs = text.split(/\n{2,}/).map(part => part.trim()).filter(Boolean);
  const segments: VoiceSegment[] = [];

  paragraphs.forEach(paragraph => {
    if (!quoteRegex.test(paragraph)) {
      segments.push({ text: paragraph, speaker: 'narrator' });
      quoteRegex.lastIndex = 0;
      return;
    }

    quoteRegex.lastIndex = 0;
    let cursor = 0;
    let match: RegExpExecArray | null;

    while ((match = quoteRegex.exec(paragraph)) !== null) {
      const [rawMatch, quotedText] = match;
      const start = match.index;
      const end = start + rawMatch.length;
      const before = paragraph.slice(cursor, start).trim();
      if (before) {
        segments.push({ text: before, speaker: 'narrator' });
      }

      const contextWindow = paragraph.slice(Math.max(0, start - 48), Math.min(paragraph.length, end + 48));
      const inferredSpeaker = inferSpeakerFromContext(gameId, contextWindow) || inferSpeakerFromContext(gameId, paragraph) || 'narrator';
      segments.push({ text: quotedText.trim(), speaker: inferredSpeaker });
      cursor = end;
    }

    const after = paragraph.slice(cursor).trim();
    if (after) {
      segments.push({ text: after, speaker: 'narrator' });
    }
  });

  return segments.filter(segment => segment.text.trim());
}

function scoreVoiceName(name: string, role: VoiceRole, language: Language) {
  const lowered = name.toLowerCase();
  let score = 0;

  if (language === 'zh') {
    if (/婷婷|美嘉|善怡|晓晓|晓伊|晓涵|晓墨|晓梦|晓萱|晓秋|晓睿|晓双|晓颜|慧慧|瑶瑶|xiaoxiao|xiaoyi|xiaohan|xiaomo|xiaomeng|xiaoxuan|xiaoqiu|xiaorui|xiaoshuang|xiaoyan|huihui|yaoyao|hsiao\s?-?chen|hsiao\s?-?yu|wan\s?-?lung|yating|ting-ting|tingting|mei-jia|meijia|sin-ji|sinji|zh-cn|chinese|mandarin/.test(lowered)) score += 4;
    if (/premium|enhanced|natural|neural/.test(lowered)) score += 3;
    if (/compact|eelo/.test(lowered)) score -= 3;
  } else {
    if (/samantha|karen|moira|ava|victoria|zira|serena|allison|\baria\b|tessa|fiona|\bflo\b|sandy|shelley/.test(lowered)) score += 4;
    if (/premium|enhanced|natural|neural/.test(lowered)) score += 3;
  }

  if (role === 'female' && FEMALE_VOICE_NAME_PATTERN.test(lowered)) score += 5;
  if (role === 'male' && MALE_VOICE_NAME_PATTERN.test(lowered)) score += 5;
  if (role === 'robot' && /novelty|robot|synth|monica|whisper/.test(lowered)) score += 3;
  if (role === 'mysterious' && /whisper|mystery|serena|moira/.test(lowered)) score += 3;
  if (role === 'narrator' && /premium|enhanced|natural|neural|婷婷|美嘉|善怡|晓晓|晓伊|晓涵|晓墨|晓梦|晓萱|晓秋|晓睿|晓双|晓颜|慧慧|瑶瑶|xiaoxiao|xiaoyi|xiaohan|xiaomo|xiaomeng|xiaoxuan|xiaoqiu|xiaorui|xiaoshuang|xiaoyan|huihui|yaoyao|hsiao\s?-?chen|hsiao\s?-?yu|wan\s?-?lung|yating|ting-ting|tingting|mei-jia|meijia|sin-ji|sinji|samantha|ava|victoria|serena|karen|allison|\baria\b|moira|tessa|fiona|\bflo\b|sandy|shelley/.test(lowered)) score += 6;
  if (role === 'narrator' && FEMALE_VOICE_NAME_PATTERN.test(lowered)) score += 8;
  if (role === 'narrator' && MALE_VOICE_NAME_PATTERN.test(lowered)) score -= 8;

  if (role === 'narrator' && NOVELTY_VOICE_NAME_PATTERN.test(lowered)) score -= 8;
  if ((role === 'narrator' || role === 'female' || role === 'male') && /compact|eelo/.test(lowered)) score -= 4;

  return score;
}

export function pickNarrationVoice(
  voices: SpeechSynthesisVoice[],
  language: Language,
  gameId: string,
  speaker?: string,
  text?: string,
) {
  const role = detectVoiceRole(gameId, speaker, text);
  const candidates = getRoleScopedVoices(voices, role, language);

  if (candidates.length === 0) return undefined;

  return candidates
    .map(voice => ({
      voice,
      score:
        scoreVoiceName(voice.name, role, language) +
        (role === 'narrator'
          ? (language === 'zh'
              ? NARRATOR_VOICE_HINTS.zh.some(hint => voice.name.toLowerCase().includes(hint))
              : NARRATOR_VOICE_HINTS.en.some(hint => voice.name.toLowerCase().includes(hint)))
            ? 7
            : 0
          : 0) +
        (voice.default ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)[0]?.voice;
}

export function getSpeechPacing(text: string) {
  const sentenceCount = splitNarrationIntoChunks(text).length;
  const hasDialogue = /“|”|"|：/.test(text);
  return {
    maxChunks: hasDialogue ? 7 : 5,
    typeInterval: sentenceCount > 4 ? 18 : 22,
  };
}

export function getVoiceStylePreset(label: VoiceStylePreset | string | undefined, language: Language) {
  const presets = {
    cinematic: {
      label: language === 'en' ? 'Cinematic' : '电影感',
      description: language === 'en' ? 'Natural, steady narration with a more human storyteller tone.' : '更自然、更像真人讲故事的旁白音色。',
      rate: 0.98,
      pitch: 1.01,
      volume: 0.98,
    },
    warm: {
      label: language === 'en' ? 'Warm' : '温和感',
      description: language === 'en' ? 'Softer and closer, good for emotional scenes.' : '更柔和、更贴近耳边，适合情绪戏。',
      rate: 0.98,
      pitch: 1.02,
      volume: 0.96,
    },
    humanFemale: {
      label: language === 'en' ? 'Natural Female' : '真人女声',
      description: language === 'en' ? 'A more realistic female narrator voice with less synthetic pitch shaping.' : '更像真人讲故事的女性旁白，减少机械感和夸张变调。',
      rate: 1,
      pitch: 1,
      volume: 0.99,
    },
    cold: {
      label: language === 'en' ? 'Icy Female' : '冰冷女声',
      description: language === 'en' ? 'An icy, restrained female narration with a colder suspense edge.' : '更冰冷、更克制、带一点寒意的女性悬疑旁白。',
      rate: 0.88,
      pitch: 1.1,
      volume: 0.92,
    },
    tense: {
      label: language === 'en' ? 'Tense' : '紧绷感',
      description: language === 'en' ? 'Slightly faster with more pressure in urgent scenes.' : '稍快一点，压迫感更强，适合危机段落。',
      rate: 1.01,
      pitch: 0.98,
      volume: 1,
    },
  } satisfies Record<VoiceStylePreset, { label: string; description: string; rate: number; pitch: number; volume: number }>;

  return presets[label as VoiceStylePreset] || presets.humanFemale;
}

export function getVoiceRoleLabel(role: VoiceRole, language: Language) {
  const labels: Record<VoiceRole, { zh: string; en: string }> = {
    narrator: { zh: '旁白', en: 'Narrator' },
    female: { zh: '女性角色', en: 'Female role' },
    male: { zh: '男性角色', en: 'Male role' },
    robot: { zh: 'AI / 非人声线', en: 'AI / synthetic role' },
    mysterious: { zh: '神秘角色', en: 'Mysterious role' },
    neutral: { zh: '普通角色', en: 'Neutral role' },
  };

  return language === 'en' ? labels[role].en : labels[role].zh;
}

export type RoleVoiceSettings = {
  voiceStyle: VoiceStylePreset;
  rateAdjust: number;
  pitchAdjust: number;
  volumeAdjust: number;
  preferredVoiceName: string;
};

export function getStoryVoiceDirection(gameId: string): Record<VoiceRole, Partial<RoleVoiceSettings>> {
  const base: Record<VoiceRole, Partial<RoleVoiceSettings>> = {
    narrator: { voiceStyle: 'humanFemale', rateAdjust: 1, pitchAdjust: 1, volumeAdjust: 0.99 },
    female: { voiceStyle: 'warm' },
    male: { voiceStyle: 'cold' },
    robot: { voiceStyle: 'cold' },
    mysterious: { voiceStyle: 'tense' },
    neutral: { voiceStyle: 'cinematic' },
  };

  const presets: Record<string, Partial<Record<VoiceRole, Partial<RoleVoiceSettings>>>> = {
    'rainy-night': {
      narrator: { voiceStyle: 'humanFemale', rateAdjust: 1, pitchAdjust: 1, volumeAdjust: 0.99 },
      female: { voiceStyle: 'tense', rateAdjust: 1.02, pitchAdjust: 1.08 },
      male: { voiceStyle: 'cold', rateAdjust: 0.96, pitchAdjust: 0.94 },
      robot: {},
      mysterious: { voiceStyle: 'tense', rateAdjust: 0.94, pitchAdjust: 0.9, volumeAdjust: 0.93 },
      neutral: { voiceStyle: 'cold' },
    },
    'deep-sea': {
      narrator: { voiceStyle: 'humanFemale', rateAdjust: 1, pitchAdjust: 1, volumeAdjust: 0.99 },
      female: { voiceStyle: 'warm', rateAdjust: 0.98, pitchAdjust: 1.03 },
      male: { voiceStyle: 'cold', rateAdjust: 0.94, pitchAdjust: 0.92 },
      robot: { voiceStyle: 'cold', rateAdjust: 0.9, pitchAdjust: 1.1, volumeAdjust: 0.9 },
      mysterious: { voiceStyle: 'tense', rateAdjust: 0.9, pitchAdjust: 0.88 },
      neutral: { voiceStyle: 'cinematic', rateAdjust: 0.95 },
    },
    'cyber-detective': {
      narrator: { voiceStyle: 'humanFemale', rateAdjust: 1, pitchAdjust: 1, volumeAdjust: 0.99 },
      female: { voiceStyle: 'cold', rateAdjust: 1.01, pitchAdjust: 1.02 },
      male: { voiceStyle: 'cold', rateAdjust: 0.98, pitchAdjust: 0.94 },
      robot: { voiceStyle: 'cold', rateAdjust: 0.92, pitchAdjust: 1.14, volumeAdjust: 0.88 },
      mysterious: { voiceStyle: 'tense', rateAdjust: 0.96, pitchAdjust: 0.9 },
      neutral: { voiceStyle: 'cold' },
    },
    'fantasy-healer': {
      narrator: { voiceStyle: 'humanFemale', rateAdjust: 1, pitchAdjust: 1, volumeAdjust: 0.99 },
      female: { voiceStyle: 'warm', rateAdjust: 1.02, pitchAdjust: 1.08 },
      male: { voiceStyle: 'cinematic', rateAdjust: 0.97, pitchAdjust: 0.95 },
      robot: { voiceStyle: 'cold' },
      mysterious: { voiceStyle: 'tense', rateAdjust: 0.95 },
      neutral: { voiceStyle: 'warm' },
    },
    'horror-hospital': {
      narrator: { voiceStyle: 'humanFemale', rateAdjust: 1, pitchAdjust: 1, volumeAdjust: 0.99 },
      female: { voiceStyle: 'tense', rateAdjust: 1.01, pitchAdjust: 1.05 },
      male: { voiceStyle: 'cold', rateAdjust: 0.95, pitchAdjust: 0.92 },
      robot: { voiceStyle: 'cold', pitchAdjust: 1.12 },
      mysterious: { voiceStyle: 'tense', rateAdjust: 0.88, pitchAdjust: 0.86, volumeAdjust: 0.92 },
      neutral: { voiceStyle: 'cold' },
    },
    'space-diplomat': {
      narrator: { voiceStyle: 'humanFemale', rateAdjust: 1, pitchAdjust: 1, volumeAdjust: 0.99 },
      female: { voiceStyle: 'warm' },
      male: { voiceStyle: 'cinematic' },
      robot: { voiceStyle: 'cold', rateAdjust: 0.93, pitchAdjust: 1.12 },
      mysterious: { voiceStyle: 'cold' },
      neutral: { voiceStyle: 'cinematic' },
    },
    'pirate-legend': {
      narrator: { voiceStyle: 'humanFemale', rateAdjust: 1, pitchAdjust: 1, volumeAdjust: 0.99 },
    },
    'ancient-mystery': {
      narrator: { voiceStyle: 'humanFemale', rateAdjust: 1, pitchAdjust: 1, volumeAdjust: 0.99 },
    },
    'palace-intrigue': {
      narrator: { voiceStyle: 'humanFemale', rateAdjust: 1, pitchAdjust: 1, volumeAdjust: 0.99 },
    },
    'wilderness-survival': {
      narrator: { voiceStyle: 'humanFemale', rateAdjust: 1, pitchAdjust: 1, volumeAdjust: 0.99 },
    },
    'campus-mystery': {
      narrator: { voiceStyle: 'humanFemale', rateAdjust: 1, pitchAdjust: 1, volumeAdjust: 0.99 },
    },
    'desert-kingdom': {
      narrator: { voiceStyle: 'humanFemale', rateAdjust: 1, pitchAdjust: 1, volumeAdjust: 0.99 },
    },
  };

  return {
    ...base,
    ...(presets[gameId] || {}),
  } as Record<VoiceRole, Partial<RoleVoiceSettings>>;
}

export function getVoicePreviewLine(role: VoiceRole, language: Language) {
  const lines: Record<VoiceRole, { zh: string; en: string }> = {
    narrator: {
      zh: '雨还在下，而真正危险的东西，正在你看不见的地方靠近。',
      en: 'The rain is still falling, and the most dangerous thing is moving closer from where you cannot see it.',
    },
    female: {
      zh: '别挂电话，我现在只相信你。',
      en: 'Please do not hang up. Right now, you are the only one I trust.',
    },
    male: {
      zh: '冷静一点，我们还有时间把局面拉回来。',
      en: 'Stay calm. We still have time to pull this situation back.',
    },
    robot: {
      zh: '系统提示，当前决策将显著改变存活概率。',
      en: 'System notice. Your current decision will significantly alter the survival probability.',
    },
    mysterious: {
      zh: '你以为自己在追真相，可真相也在追你。',
      en: 'You think you are chasing the truth, but the truth is chasing you too.',
    },
    neutral: {
      zh: '再往前一步，故事就不会回到原来的样子了。',
      en: 'One more step, and this story will never return to what it was.',
    },
  };

  return language === 'en' ? lines[role].en : lines[role].zh;
}
