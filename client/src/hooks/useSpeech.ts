/**
 * useSpeech - 多角色语音合成 Hook
 * 使用浏览器原生 Web Speech API (SpeechSynthesis)
 * 支持为不同角色配置独立的音色参数
 */

import { useCallback, useRef, useEffect } from 'react';

export interface VoiceProfile {
  /** 音调 0.1-2.0，1.0 为默认 */
  pitch: number;
  /** 语速 0.1-10.0，1.0 为默认 */
  rate: number;
  /** 音量 0.0-1.0 */
  volume: number;
  /** 优先匹配的语音名称关键词（可选） */
  voiceHint?: string;
}

export interface GameVoiceConfig {
  /** 旁白音色 */
  narrator: VoiceProfile;
  /** 主角音色 */
  protagonist: VoiceProfile;
  /** 配角音色（可多个） */
  characters: Record<string, VoiceProfile>;
}

// 预设音色配置库
export const VOICE_PRESETS: Record<string, VoiceProfile> = {
  // 旁白类
  narratorMystery: { pitch: 0.75, rate: 0.82, volume: 0.9 },      // 神秘悬疑旁白
  narratorEpic: { pitch: 0.70, rate: 0.78, volume: 0.95 },         // 史诗宏大旁白
  narratorWarm: { pitch: 1.05, rate: 0.90, volume: 0.85 },         // 温馨治愈旁白
  narratorCold: { pitch: 0.65, rate: 0.85, volume: 0.88 },         // 冷静机械旁白
  narratorElegant: { pitch: 0.90, rate: 0.88, volume: 0.90 },      // 典雅古风旁白
  narratorThriller: { pitch: 0.72, rate: 0.80, volume: 0.92 },     // 惊悚压抑旁白

  // 男性主角类
  maleYoung: { pitch: 1.00, rate: 0.95, volume: 0.88 },            // 年轻男声（22岁）
  maleMature: { pitch: 0.85, rate: 0.90, volume: 0.90 },           // 成熟男声（35-40岁）
  maleDeep: { pitch: 0.72, rate: 0.88, volume: 0.92 },             // 低沉男声（侦探/捕快）
  maleHeroic: { pitch: 0.88, rate: 0.92, volume: 0.90 },           // 英气男声（外交官）
  maleCool: { pitch: 0.95, rate: 1.00, volume: 0.85 },             // 中性冷静（黑客）

  // 女性主角类
  femaleYoung: { pitch: 1.25, rate: 0.95, volume: 0.85 },          // 活泼少女（17岁）
  femaleMature: { pitch: 1.05, rate: 0.90, volume: 0.88 },         // 成熟女声（32岁）
  femaleStrong: { pitch: 1.00, rate: 0.93, volume: 0.90 },         // 干练女声（工程师/海盗）
  femaleGentle: { pitch: 1.10, rate: 0.88, volume: 0.85 },         // 温柔女声（才人）
  femalePirate: { pitch: 0.95, rate: 1.00, volume: 0.92 },         // 豪爽女声（海盗船长）

  // 配角类
  oldManRough: { pitch: 0.65, rate: 0.80, volume: 0.88 },          // 粗犷老年男声
  oldManWise: { pitch: 0.70, rate: 0.78, volume: 0.85 },           // 睿智老者
  middleAgedMan: { pitch: 0.80, rate: 0.88, volume: 0.90 },        // 中年男声
  ghostGirl: { pitch: 1.35, rate: 0.75, volume: 0.80 },            // 飘渺女鬼
  aiVoice: { pitch: 1.15, rate: 1.05, volume: 0.88 },              // AI合成音
  mysteriousWoman: { pitch: 1.08, rate: 0.85, volume: 0.82 },      // 神秘女声
  youngMale: { pitch: 1.05, rate: 0.95, volume: 0.87 },            // 温柔少年
  queenVoice: { pitch: 1.00, rate: 0.85, volume: 0.92 },           // 雍容皇后
  alienVoice: { pitch: 1.20, rate: 0.90, volume: 0.85 },           // 外星音
  crazyWoman: { pitch: 1.15, rate: 1.05, volume: 0.88 },           // 疯狂女声
};

// 10款游戏的角色音色配置
export const GAME_VOICE_CONFIGS: Record<string, GameVoiceConfig> = {
  'rainy-night': {
    narrator: VOICE_PRESETS.narratorMystery,
    protagonist: VOICE_PRESETS.maleDeep,
    characters: {
      'woman': VOICE_PRESETS.femaleGentle,
      'man': VOICE_PRESETS.middleAgedMan,
    },
  },
  'deep-sea': {
    narrator: VOICE_PRESETS.narratorCold,
    protagonist: VOICE_PRESETS.femaleMature,
    characters: {
      'ai': VOICE_PRESETS.aiVoice,
      'colleague': VOICE_PRESETS.maleYoung,
    },
  },
  'ancient-mirror': {
    narrator: VOICE_PRESETS.narratorElegant,
    protagonist: VOICE_PRESETS.maleDeep,
    characters: {
      'ghost': VOICE_PRESETS.ghostGirl,
      'elder': VOICE_PRESETS.oldManWise,
    },
  },
  'last-train': {
    narrator: VOICE_PRESETS.narratorCold,
    protagonist: VOICE_PRESETS.femaleMature,
    characters: {
      'passenger': VOICE_PRESETS.middleAgedMan,
      'ai': VOICE_PRESETS.aiVoice,
    },
  },
  'palace-chess': {
    narrator: VOICE_PRESETS.narratorElegant,
    protagonist: VOICE_PRESETS.femaleGentle,
    characters: {
      'queen': VOICE_PRESETS.queenVoice,
      'emperor': VOICE_PRESETS.maleMature,
    },
  },
  'wilderness': {
    narrator: VOICE_PRESETS.narratorEpic,
    protagonist: VOICE_PRESETS.maleYoung,
    characters: {
      'hunter': VOICE_PRESETS.oldManRough,
      'rescue': VOICE_PRESETS.maleMature,
    },
  },
  'fantasy-cafe': {
    narrator: VOICE_PRESETS.narratorWarm,
    protagonist: VOICE_PRESETS.maleYoung,
    characters: {
      'owner': VOICE_PRESETS.mysteriousWoman,
      'creature': VOICE_PRESETS.ghostGirl,
    },
  },
  'hacker-code': {
    narrator: VOICE_PRESETS.narratorCold,
    protagonist: VOICE_PRESETS.maleCool,
    characters: {
      'ai': VOICE_PRESETS.aiVoice,
      'boss': VOICE_PRESETS.maleMature,
    },
  },
  'pirate-legend': {
    narrator: VOICE_PRESETS.narratorEpic,
    protagonist: VOICE_PRESETS.femalePirate,
    characters: {
      'crew': VOICE_PRESETS.oldManRough,
      'rival': VOICE_PRESETS.maleHeroic,
    },
  },
  'asylum': {
    narrator: VOICE_PRESETS.narratorThriller,
    protagonist: VOICE_PRESETS.maleMature,
    characters: {
      'patient': VOICE_PRESETS.crazyWoman,
      'nurse': VOICE_PRESETS.femaleMature,
    },
  },
  'star-diplomacy': {
    narrator: VOICE_PRESETS.narratorEpic,
    protagonist: VOICE_PRESETS.maleHeroic,
    characters: {
      'alien': VOICE_PRESETS.alienVoice,
      'advisor': VOICE_PRESETS.femaleMature,
    },
  },
  'detective-academy': {
    narrator: VOICE_PRESETS.narratorWarm,
    protagonist: VOICE_PRESETS.femaleYoung,
    characters: {
      'senior': VOICE_PRESETS.youngMale,
      'teacher': VOICE_PRESETS.maleMature,
    },
  },
};

export function useSpeech(gameId: string, isMuted: boolean) {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    synthRef.current = window.speechSynthesis;

    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const getBestVoice = useCallback((hint?: string): SpeechSynthesisVoice | null => {
    const voices = voicesRef.current;
    if (!voices.length) return null;

    // 优先找中文语音
    const zhVoices = voices.filter(v =>
      v.lang.startsWith('zh') || v.lang.startsWith('cmn')
    );

    if (hint) {
      const hinted = zhVoices.find(v => v.name.toLowerCase().includes(hint.toLowerCase()));
      if (hinted) return hinted;
    }

    // 返回第一个中文语音
    if (zhVoices.length > 0) return zhVoices[0];

    // 降级到任意语音
    return voices[0] || null;
  }, []);

  const speak = useCallback((text: string, role: 'narrator' | 'protagonist' | string) => {
    if (isMuted || !synthRef.current) return;

    // 停止当前语音
    synthRef.current.cancel();

    const config = GAME_VOICE_CONFIGS[gameId];
    if (!config) return;

    let profile: VoiceProfile;
    if (role === 'narrator') {
      profile = config.narrator;
    } else if (role === 'protagonist') {
      profile = config.protagonist;
    } else {
      profile = config.characters[role] || config.narrator;
    }

    // 清理文本：移除 Markdown 格式符号
    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/\n/g, '，')
      .slice(0, 200); // 限制长度，避免过长

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'zh-CN';
    utterance.pitch = profile.pitch;
    utterance.rate = profile.rate;
    utterance.volume = profile.volume;

    const voice = getBestVoice(profile.voiceHint);
    if (voice) utterance.voice = voice;

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  }, [gameId, isMuted, getBestVoice]);

  const stop = useCallback(() => {
    synthRef.current?.cancel();
  }, []);

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  return { speak, stop, isSupported };
}
