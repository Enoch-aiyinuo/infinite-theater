import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, Volume2, VolumeX, BookOpen, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { getGameById, type GameData } from '@/data/games';
import { RAINY_NIGHT_STORY, RAINY_NIGHT_INITIAL_STATS } from '@/data/story-rainy-night';
import { DEEP_SEA_STORY, DEEP_SEA_INITIAL_STATS } from '@/data/story-deep-sea';
import { PIRATE_LEGEND_STORY, PIRATE_LEGEND_INITIAL_STATS } from '@/data/story-pirate-legend';
import { ANCIENT_MYSTERY_STORY, ANCIENT_MYSTERY_INITIAL_STATS } from '@/data/story-ancient-mystery';
import { CYBER_DETECTIVE_STORY, CYBER_DETECTIVE_INITIAL_STATS } from '@/data/story-cyber-detective';
import { PALACE_INTRIGUE_STORY, INITIAL_PALACE_INTRIGUE_STATS } from '@/data/story-palace-intrigue';
import { WILDERNESS_SURVIVAL_STORY, WILDERNESS_SURVIVAL_INITIAL_STATS } from '@/data/story-wilderness-survival';
import { FANTASY_HEALER_STORY_NODES, FANTASY_HEALER_INITIAL_STATS } from '@/data/story-fantasy-healer';
import { SPACE_DIPLOMAT_STORY, SPACE_DIPLOMAT_INITIAL_STATS } from '@/data/story-space-diplomat';
import { HORROR_HOSPITAL_STORY, HORROR_HOSPITAL_INITIAL_STATS } from '@/data/story-horror-hospital';
import { CAMPUS_MYSTERY_STORY, CAMPUS_MYSTERY_INITIAL_STATS } from '@/data/story-campus-mystery';
import { DESERT_KINGDOM_STORY, DESERT_KINGDOM_INITIAL_STATS } from '@/data/story-desert-kingdom';
import type { StoryChoice, StoryNode } from '@/data/story-types';
import { useGameStore } from '@/hooks/useGameStore';
import { useLanguage } from '@/hooks/useLanguage';
import enTranslations from '@/locales/en.json';
import zhTranslations from '@/locales/zh.json';
import {
  detectVoiceRole,
  extractVoiceSegments,
  getPreferredNarratorVoiceName,
  getChoiceDeltaSummary,
  getNodePresentation,
  getSpeechPacing,
  getSpeechEmotion,
  getStoryVoiceDirection,
  getVoicePreviewLine,
  getVoiceRoleLabel,
  getVoiceStylePreset,
  pickNarrationVoice,
  splitNarrationIntoChunks,
  type RoleVoiceSettings,
  type VoiceRole,
  type VoiceStylePreset,
} from '@/lib/narrative';

const VOICE_SETTINGS_VERSION = 10;

const DEFAULT_ROLE_VOICE_SETTINGS: Record<VoiceRole, RoleVoiceSettings> = {
  narrator: { voiceStyle: 'humanFemale', rateAdjust: 1, pitchAdjust: 1, volumeAdjust: 0.99, preferredVoiceName: '' },
  female: { voiceStyle: 'warm', rateAdjust: 1, pitchAdjust: 1.04, volumeAdjust: 0.98, preferredVoiceName: '' },
  male: { voiceStyle: 'cold', rateAdjust: 0.98, pitchAdjust: 0.96, volumeAdjust: 1, preferredVoiceName: '' },
  robot: { voiceStyle: 'cold', rateAdjust: 0.95, pitchAdjust: 1.08, volumeAdjust: 0.92, preferredVoiceName: '' },
  mysterious: { voiceStyle: 'tense', rateAdjust: 0.96, pitchAdjust: 0.94, volumeAdjust: 0.95, preferredVoiceName: '' },
  neutral: { voiceStyle: 'cinematic', rateAdjust: 1, pitchAdjust: 1, volumeAdjust: 1, preferredVoiceName: '' },
};

function buildRoleVoiceSettings(gameId: string): Record<VoiceRole, RoleVoiceSettings> {
  const storyDirection = getStoryVoiceDirection(gameId);
  return (Object.keys(DEFAULT_ROLE_VOICE_SETTINGS) as VoiceRole[]).reduce((acc, role) => {
    acc[role] = {
      ...DEFAULT_ROLE_VOICE_SETTINGS[role],
      ...storyDirection[role],
    };
    if (role === 'narrator') {
      acc[role] = {
        ...acc[role],
        voiceStyle: 'humanFemale',
        rateAdjust: 1,
        pitchAdjust: 1,
        volumeAdjust: 0.99,
      };
    }
    return acc;
  }, {} as Record<VoiceRole, RoleVoiceSettings>);
}

function getPreviewSpeakerForRole(role: VoiceRole, gameId: string): string {
  const previewSpeakers: Record<string, Partial<Record<VoiceRole, string>>> = {
    'rainy-night': { narrator: 'narrator', male: '林晓', female: '神秘女子', mysterious: '神秘女子' },
    'deep-sea': { narrator: 'narrator', male: '陈深', female: '苏晴', mysterious: '未知生物', robot: '系统' },
    'pirate-legend': { narrator: 'narrator', female: '罗珊', male: '船员', mysterious: '幽灵船长' },
    'ancient-mystery': { narrator: 'narrator', female: 'protagonist', male: 'npc-师父陈博远', mysterious: '古灵' },
    'cyber-detective': { narrator: 'narrator', male: '零', robot: 'AI', mysterious: '未知意识' },
    'palace-intrigue': { narrator: 'narrator', female: '沈若华', male: '皇帝', mysterious: '宫中传闻' },
    'wilderness-survival': { narrator: 'narrator', male: '林峰', female: '幸存者', mysterious: '荒野回声' },
    'fantasy-healer': { narrator: 'narrator', female: 'protagonist', male: 'npc-骑士护卫卡尔', mysterious: 'npc-黑暗魔法师莫里安' },
    'space-diplomat': { narrator: 'narrator', male: '外交官', robot: '外星人', mysterious: '宇宙低语' },
    'horror-hospital': { narrator: 'narrator', male: '苏明', female: '护士', mysterious: '幽灵', robot: '广播' },
    'campus-mystery': { narrator: 'narrator', female: '顾晓', male: '老师', mysterious: '旧校广播' },
    'desert-kingdom': { narrator: 'narrator', male: '萨利姆', female: '娜拉', mysterious: '祭司' },
  };

  return previewSpeakers[gameId]?.[role] || (role === 'narrator' ? 'narrator' : role === 'female' ? '她' : role === 'male' ? '他' : role === 'robot' ? '系统' : role === 'mysterious' ? '未知低语' : '路人');
}

// 游戏剧情映射
const STORY_MAP: Record<string, StoryNode[]> = {
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

// 初始数值映射
const INITIAL_STATS_MAP: Record<string, Record<string, number>> = {
  'rainy-night': RAINY_NIGHT_INITIAL_STATS || { trust: 50, clues: 0, stress: 0 },
  'deep-sea': DEEP_SEA_INITIAL_STATS,
  'pirate-legend': PIRATE_LEGEND_INITIAL_STATS,
  'ancient-mystery': ANCIENT_MYSTERY_INITIAL_STATS,
  'cyber-detective': CYBER_DETECTIVE_INITIAL_STATS,
  'palace-intrigue': INITIAL_PALACE_INTRIGUE_STATS,
  'wilderness-survival': WILDERNESS_SURVIVAL_INITIAL_STATS,
  'fantasy-healer': FANTASY_HEALER_INITIAL_STATS,
  'space-diplomat': SPACE_DIPLOMAT_INITIAL_STATS,
  'horror-hospital': HORROR_HOSPITAL_INITIAL_STATS,
  'campus-mystery': CAMPUS_MYSTERY_INITIAL_STATS,
  'desert-kingdom': DESERT_KINGDOM_INITIAL_STATS,
};

type DeductionStageProfile = {
  scene: string;
  sceneEn: string;
  premise: string;
  premiseEn: string;
  correct: { text: string; textEn: string };
  redHerrings: Array<{ text: string; textEn: string }>;
  cost: { text: string; textEn: string };
};

type DeductionProfile = DeductionStageProfile & {
  followUp?: DeductionStageProfile;
  final?: DeductionStageProfile;
};

const DEDUCTION_PROFILES: Record<string, DeductionProfile> = {
  'rainy-night': {
    scene: '三重口供',
    sceneEn: 'Triple Testimony',
    premise: '你以为案件已经结束，直到三份材料同时摆在桌上：报警录音里有两秒钟被剪掉；陈雨薇说出的仓库门牌和定位差了一个街区；刘警官的笔录里，第一次出现了一个从未被问过的人名。真正的幕后黑手故意把“张明远”推到最显眼的位置。现在不能急着收网，你必须先判断哪条线索能撕开伪装。',
    premiseEn: 'You think the case is over until three records land on your desk: two seconds are missing from the emergency recording, Chen Yuwei names a warehouse one block away from the location ping, and Officer Liu’s report mentions a name no one ever asked about. Someone deliberately pushed Zhang Mingyuan into the spotlight. Before the arrest, you must decide which clue actually breaks the disguise.',
    correct: { text: '比对被剪掉的两秒录音和警用中继时间戳', textEn: 'Compare the missing two seconds with the police relay timestamp' },
    redHerrings: [
      { text: '直接公开张明远的全部照片，逼他自首', textEn: 'Publish every photo of Zhang Mingyuan and force a confession' },
      { text: '相信陈雨薇全部口供，立刻按她说的位置突入', textEn: 'Trust Chen Yuwei’s statement completely and breach the location she named' },
    ],
    cost: { text: '暂时放走诱饵，跟踪真正改写录音的人', textEn: 'Let the decoy run for now and follow whoever altered the recording' },
  },
  'deep-sea': {
    scene: '黑匣子悖论',
    sceneEn: 'Black Box Paradox',
    premise: '逃生舱已经预热，但基地黑匣子给出三组互相矛盾的数据：怪物出现前，生命舱门已经从内部锁死；AI 的求救信号比事故早了十九分钟；你的指纹出现在一段你完全不记得的手动隔离记录上。深海没有鬼，只有被改写过的证据。你必须先判断谁在撒谎。',
    premiseEn: 'The escape pod is warming up, but the station black box gives three contradictory facts: the life bay locked from the inside before the creature appeared, the AI distress call predates the accident by nineteen minutes, and your fingerprint appears on a manual quarantine record you cannot remember. The deep sea has no ghosts, only rewritten evidence. You must decide who is lying.',
    correct: { text: '交叉验证 AI 求救时间和氧气阀门日志', textEn: 'Cross-check the AI distress timestamp against the oxygen valve logs' },
    redHerrings: [
      { text: '把所有异常都归咎于未知生物，立刻逃生', textEn: 'Blame every anomaly on the creature and escape immediately' },
      { text: '删除自己的指纹记录，避免被追责', textEn: 'Delete your fingerprint record to avoid blame' },
    ],
    cost: { text: '关闭一段生命保障，换取黑匣子完整解密时间', textEn: 'Shut down part of life support to buy time for a full black-box decode' },
  },
  'pirate-legend': {
    scene: '藏宝图的第四层',
    sceneEn: 'The Fourth Layer',
    premise: '宝藏近在眼前，但罗盘、潮汐和藏宝图互相否定。图上被海水泡开的墨迹露出第四层坐标，船员却坚持那是诅咒标记；幽灵船长留下的航海钟比现实慢了十三分钟。财富、背叛和诅咒混在一起，你必须先判断哪一个才是真门。',
    premiseEn: 'The treasure is within reach, but the compass, tide table, and map contradict one another. Water reveals a fourth coordinate layer while the crew calls it a curse mark; the ghost captain’s chronometer runs thirteen minutes slow. Wealth, betrayal, and curse overlap. You must identify the real gate.',
    correct: { text: '按慢了十三分钟的航海钟重新计算潮汐门', textEn: 'Recalculate the tide gate using the chronometer that runs thirteen minutes slow' },
    redHerrings: [
      { text: '听从船员，避开第四层坐标', textEn: 'Listen to the crew and avoid the fourth coordinate layer' },
      { text: '强行炸开石门，抢在潮水前搬宝藏', textEn: 'Blast the stone gate open and loot before the tide rises' },
    ],
    cost: { text: '丢下一半财宝，换取破解诅咒的时间', textEn: 'Abandon half the treasure to buy time to decode the curse' },
  },
  'ancient-mystery': {
    scene: '壁画反证',
    sceneEn: 'Mural Contradiction',
    premise: '主墓室开启前，三面壁画给出三种历史：帝王是暴君、守墓人是叛徒、师父陈博远曾来过这里。可壁画颜料的氧化层对不上年代，墓志铭里还有一行被故意倒刻的字。真相不是埋在墓里，而是藏在谁改写了墓。',
    premiseEn: 'Before the main chamber opens, three murals tell three histories: the emperor was a tyrant, the guardian betrayed him, and your mentor Chen Boyuan came here before. But the pigment oxidation does not match the era, and one epitaph line was carved backward on purpose. The truth is not what is buried here, but who rewrote the tomb.',
    correct: { text: '用倒刻墓志和颜料年代反推伪造者', textEn: 'Use the reversed epitaph and pigment age to infer the forger' },
    redHerrings: [
      { text: '相信壁画叙事，按帝王路线开棺', textEn: 'Trust the mural narrative and open the coffin by the emperor route' },
      { text: '听师父劝告，立刻封墓离开', textEn: 'Obey your mentor and seal the tomb immediately' },
    ],
    cost: { text: '毁掉一件文物，保留能证明改史者的证据', textEn: 'Destroy one relic to preserve proof of who rewrote history' },
  },
  'cyber-detective': {
    scene: '不存在的凶手',
    sceneEn: 'The Impossible Killer',
    premise: '城市主脑把凶手标记为“不存在的 AI”，但三处数据互相咬死：死者脑机接口在死亡后还上传了一次记忆；ARIA 的审计日志出现手写式延迟；你的义眼缓存里有一帧被你自己删除过。AI 也许不是凶手，而是替某个人承担罪名。',
    premiseEn: 'The city core labels the killer as an impossible AI, but three data points contradict it: the victim’s neural port uploaded memory after death, ARIA’s audit log contains a human-like delay, and your optic cache holds one frame you deleted yourself. The AI may not be the killer; it may be taking the blame for someone.',
    correct: { text: '恢复义眼缓存，并和 ARIA 审计延迟做差分', textEn: 'Restore your optic cache and diff it against ARIA’s audit delay' },
    redHerrings: [
      { text: '立刻格式化 AI 核心，阻止它继续杀人', textEn: 'Format the AI core immediately to stop further killings' },
      { text: '把证据交给公司安保，换取城市权限', textEn: 'Hand the evidence to corporate security for city access' },
    ],
    cost: { text: '公开自己的非法义体日志，换取完整证据链', textEn: 'Expose your illegal cyberware logs to complete the evidence chain' },
  },
  'palace-intrigue': {
    scene: '三封密旨',
    sceneEn: 'Three Secret Edicts',
    premise: '你以为胜负已定，直到三封密旨同时出现：皇后的懿旨印泥太新，三皇子的血书没有血腥味，皇帝亲笔里的一个避讳字写错了。宫里没有一句话能直接相信，真正的局是有人让你替他选边。',
    premiseEn: 'You think the court game is settled until three secret edicts appear: the empress seal is too fresh, the third prince’s blood letter has no scent of blood, and the emperor’s handwriting uses one taboo character incorrectly. Nothing in the palace can be trusted directly. Someone is making you choose a side for them.',
    correct: { text: '比对避讳字和掌印班值夜记录', textEn: 'Compare the taboo character with the seal office night-duty record' },
    redHerrings: [
      { text: '献上血书，立刻投向三皇子', textEn: 'Present the blood letter and side with the third prince immediately' },
      { text: '交出懿旨，向皇后换取庇护', textEn: 'Give the edict to the empress in exchange for protection' },
    ],
    cost: { text: '牺牲一次圣眷，逼真正伪造密旨的人现身', textEn: 'Sacrifice imperial favor to force the true forger into the open' },
  },
  'wilderness-survival': {
    scene: '雪地里的第二支队伍',
    sceneEn: 'The Second Team',
    premise: '救援信号终于出现，却有三个地方不对：雪地足迹从营地外走向营地内，失踪乘客的手套在无线电旁边，救援频道里有人知道你从未公开的伤员名单。荒野中最危险的也许不是寒冷，而是有人在利用求生本能。',
    premiseEn: 'A rescue signal finally appears, but three details are wrong: footprints lead from outside into camp, the missing passenger’s glove lies beside the radio, and the rescue channel knows an injury list you never broadcast. The deadliest thing in the wild may not be cold, but someone using survival instinct against you.',
    correct: { text: '验证救援频道的伤员名单来源', textEn: 'Verify how the rescue channel knows the injury list' },
    redHerrings: [
      { text: '全员立刻朝信号方向转移', textEn: 'Move everyone toward the signal immediately' },
      { text: '认定失踪乘客背叛，公开审问他', textEn: 'Accuse the missing passenger of betrayal and interrogate him publicly' },
    ],
    cost: { text: '烧掉一半燃料制造假营地，测试对方反应', textEn: 'Burn half the fuel to create a fake camp and test the caller’s reaction' },
  },
  'fantasy-healer': {
    scene: '圣泉的病因',
    sceneEn: 'The Spring’s Diagnosis',
    premise: '王国等着你净化圣泉，可病症和诅咒对不上：最虚弱的孩子没有接触泉水，黑暗魔法留下的纹路像治疗术，骑士带来的药草反而加重污染。你必须先判断这场瘟疫到底是毒、魔法，还是被伪装成救赎的实验。',
    premiseEn: 'The kingdom waits for you to purify the holy spring, but the symptoms do not match the curse: the weakest child never touched the water, the dark magic pattern resembles healing magic, and the knight’s herbs worsen the pollution. You must decide whether this plague is poison, magic, or an experiment disguised as salvation.',
    correct: { text: '反向分析“治疗术”纹路，找出施术源头', textEn: 'Reverse-analyze the healing-pattern marks to find the caster source' },
    redHerrings: [
      { text: '立刻净化圣泉，先稳定民心', textEn: 'Purify the spring immediately to calm the people' },
      { text: '逮捕黑暗法师，逼他解除诅咒', textEn: 'Arrest the dark mage and force him to lift the curse' },
    ],
    cost: { text: '承受污染反噬，保留一份未净化样本', textEn: 'Endure contamination backlash to preserve one untreated sample' },
  },
  'space-diplomat': {
    scene: '和平协议的漏洞',
    sceneEn: 'Treaty Loophole',
    premise: '和平协议只差签字，但三条翻译互相冲突：外星语中的“让步”也可指“献祭”，舰队静默不是撤退而是校准，议会给你的译本缺少一页边注。战争也许不是误会，而是有人把误会设计成战争。',
    premiseEn: 'The peace treaty needs only a signature, but three translations conflict: the alien word for concession can also mean sacrifice, fleet silence may be calibration rather than retreat, and your council copy lacks one margin note. War may not be a misunderstanding; someone may have designed misunderstanding into war.',
    correct: { text: '公开缺失边注，请双方 AI 同步复译', textEn: 'Reveal the missing margin note and make both AIs retranslate together' },
    redHerrings: [
      { text: '按议会译本签字，避免战争升级', textEn: 'Sign the council translation to prevent escalation' },
      { text: '命令舰队先发制人，取得谈判优势', textEn: 'Order a preemptive fleet move to gain leverage' },
    ],
    cost: { text: '放弃个人外交豁免，换取公开复核权限', textEn: 'Give up diplomatic immunity to gain public review authority' },
  },
  'horror-hospital': {
    scene: '病历夹第十三页',
    sceneEn: 'Chart Page Thirteen',
    premise: '鬼影逼近时，你找到三份病历：死者签名出现在死亡后，护士排班表少了一个夜班，广播里念出的房号从未存在。医院不是闹鬼那么简单，有人用恐惧把活人赶向同一个房间。',
    premiseEn: 'As the apparition closes in, you find three charts: a dead patient signed after death, the nurse roster is missing one night shift, and the room number announced over the PA never existed. The hospital is not merely haunted. Someone is using fear to drive the living into one room.',
    correct: { text: '核对不存在的房号和夜班缺口', textEn: 'Cross-check the nonexistent room number with the missing night shift' },
    redHerrings: [
      { text: '跟随广播指引，进入那个房间', textEn: 'Follow the broadcast into that room' },
      { text: '烧掉病历，切断亡魂执念', textEn: 'Burn the charts to sever the ghost’s obsession' },
    ],
    cost: { text: '关掉照明，逼操控广播的人露出脚步声', textEn: 'Turn off the lights to force the broadcaster’s footsteps into the open' },
  },
  'campus-mystery': {
    scene: '缺席的第四个人',
    sceneEn: 'The Absent Fourth',
    premise: '校园传闻看似破解，但监控、借书卡和社团签到表互相矛盾：器材室里有四个人的影子，签到表只有三个人，失踪学生借走的书在他失踪前一天已被归还。真正的谜题不是谁失踪，而是谁被所有记录故意漏掉。',
    premiseEn: 'The campus rumor seems solved, but camera footage, library cards, and club sign-ins contradict each other: four shadows enter the equipment room, only three names are signed in, and the missing student’s book was returned the day before he vanished. The mystery is not who disappeared, but who every record deliberately omitted.',
    correct: { text: '比对四个影子和被提前归还的借书记录', textEn: 'Compare the four shadows with the prematurely returned library record' },
    redHerrings: [
      { text: '公布失踪学生日记，逼同学说实话', textEn: 'Publish the missing student’s diary to force classmates to talk' },
      { text: '相信社团签到表，锁定三名嫌疑人', textEn: 'Trust the club sign-in sheet and focus on three suspects' },
    ],
    cost: { text: '暂时替第四个人保密，换取他留下的原始录像', textEn: 'Protect the fourth person briefly to obtain the original footage' },
  },
  'desert-kingdom': {
    scene: '沙下王座',
    sceneEn: 'The Throne Beneath Sand',
    premise: '王座继承看似尘埃落定，但绿洲水位、祭司预言和商队账本对不上：所谓神谕发生在水道改流之后，王室印章出现在商队赊账单上，沙暴来临前有人提前撤走了粮仓。神明没有选择国王，是有人在选择谁相信神明。',
    premiseEn: 'The succession seems settled, but oasis water levels, priestly prophecy, and caravan ledgers do not align: the oracle came after the canal diversion, the royal seal appears on caravan debt notes, and someone emptied grain stores before the sandstorm. The gods did not choose a king; someone chose who would believe the gods.',
    correct: { text: '追查水道改流和王室印章的同一天记录', textEn: 'Trace the canal diversion and royal seal records from the same day' },
    redHerrings: [
      { text: '顺从祭司预言，支持被选中的继承人', textEn: 'Obey the prophecy and support the chosen heir' },
      { text: '夺取粮仓，先稳定民众', textEn: 'Seize the granary first to calm the people' },
    ],
    cost: { text: '公布王室债务，让沙漠各部共同审判', textEn: 'Expose the royal debt and let the desert clans judge together' },
  },
};

const DEFAULT_DEDUCTION_FOLLOW_UP: DeductionStageProfile = {
  scene: '终局复核',
  sceneEn: 'Final Review',
  premise: '你已经排除了最明显的伪装，但还剩最后一层陷阱。真正的压力不在于你看见了什么，而在于你愿不愿意把最后一块证据摆上桌面，让所有人都没有退路。',
  premiseEn: 'You have already ruled out the most obvious disguise, but one final trap remains. The pressure is no longer about what you saw. It is about whether you are willing to put the last piece of evidence on the table and remove every escape route.',
  correct: { text: '按证据链顺序公开最后一块关键证据', textEn: 'Reveal the last critical clue in strict evidence-chain order' },
  redHerrings: [
    { text: '相信眼前最省事的说法，直接收尾', textEn: 'Trust the easiest explanation and wrap it up now' },
    { text: '把最关键的证据先藏起来，留作后手', textEn: 'Hide the most important clue and keep it as leverage' },
  ],
  cost: { text: '接受一次代价，换来完整的真相闭环', textEn: 'Pay a cost to secure the full truth loop' },
};

const DEFAULT_DEDUCTION_FINAL: DeductionStageProfile = {
  scene: '终局定锚',
  sceneEn: 'Final Anchor',
  premise: '最后一步不是找答案，而是把所有答案按顺序钉死。现在你面对的是最危险的时刻：表面上已经可以收束，但只要漏掉一处矛盾，整条真相链都会倒塌。',
  premiseEn: 'The last step is not finding an answer. It is locking every answer into place in the right order. This is the most dangerous moment: the case looks ready to close, but one missed contradiction will collapse the whole truth chain.',
  correct: { text: '按时间、动机、证词三项顺序封存真相', textEn: 'Seal the truth in the order of time, motive, and testimony' },
  redHerrings: [
    { text: '先公布结论，再补证据', textEn: 'Publish the verdict first and patch the evidence later' },
    { text: '把冲突点删掉，只保留顺眼版本', textEn: 'Delete the contradictions and keep only the tidy version' },
  ],
  cost: { text: '保留全部矛盾记录，承受最后一次反噬', textEn: 'Keep every contradiction on record and take the final backlash' },
};

const DEFAULT_DEDUCTION_PROFILE: DeductionProfile = {
  scene: '真相校验',
  sceneEn: 'Truth Check',
  premise: '结局似乎已经近在眼前，但最后几条线索互相矛盾。最明显的答案通常是被人摆在桌上的诱饵。你必须先把证词、时间和动机重新拼合，决定哪一条才是真正通往结局的路。',
  premiseEn: 'The ending seems close, but the final clues contradict one another. The most obvious answer is usually bait placed on the table. Reassemble testimony, timing, and motive before deciding which path truly leads to the ending.',
  correct: { text: '重新核对时间线、证词和动机的矛盾点', textEn: 'Recheck the contradictions between timeline, testimony, and motive' },
  redHerrings: [
    { text: '相信最直观的嫌疑人，立刻收尾', textEn: 'Trust the most obvious suspect and end it now' },
    { text: '隐藏关键证据，换取暂时安全', textEn: 'Hide the key evidence for temporary safety' },
  ],
  cost: { text: '牺牲短期优势，保留完整证据链', textEn: 'Sacrifice short-term advantage to preserve the full evidence chain' },
  followUp: DEFAULT_DEDUCTION_FOLLOW_UP,
  final: DEFAULT_DEDUCTION_FINAL,
};

function getDeductionProfile(gameId: string) {
  return DEDUCTION_PROFILES[gameId] || DEFAULT_DEDUCTION_PROFILE;
}

function createDeductionGateId(endingNodeId: number, stage: number) {
  return 900000 + endingNodeId * 10 + stage;
}

function findFallbackEnding(story: StoryNode[], originalEnding: StoryNode) {
  return (
    story.find(node => node.end && node.endType === 'bad') ||
    story.find(node => node.end && node.id !== originalEnding.id) ||
    originalEnding
  );
}

function enhanceStoryWithDeductionGates(story: StoryNode[] = [], gameId: string): StoryNode[] {
  if (!story.length) return story;

  const endings = new Map(story.filter(node => node.end).map(node => [node.id, node]));
  if (!endings.size) return story;

  const profile = getDeductionProfile(gameId);
  const syntheticNodes: StoryNode[] = [];
  const createdGateIds = new Set<number>();
  const createdReviewGateIds = new Set<number>();
  const createdFinalGateIds = new Set<number>();

  const rewrittenStory = story.map(node => {
    if (!node.choices?.length) return node;

    const choices = node.choices.map(choice => {
      const endingNode = endings.get(choice.next);
      if (!endingNode || endingNode.endType === 'bad') return choice;

      const gateId = createDeductionGateId(endingNode.id, 1);
      const reviewGateId = createDeductionGateId(endingNode.id, 2);
      const finalGateId = createDeductionGateId(endingNode.id, 3);
      if (!createdGateIds.has(gateId)) {
        createdGateIds.add(gateId);
      }
      if (!createdReviewGateIds.has(reviewGateId)) {
        createdReviewGateIds.add(reviewGateId);
      }
      if (!createdFinalGateIds.has(finalGateId)) {
        createdFinalGateIds.add(finalGateId);
        const fallbackEnding = findFallbackEnding(story, endingNode);
        const stageOne = profile;
        const stageTwo = profile.followUp || DEFAULT_DEDUCTION_FOLLOW_UP;
        const stageThree = profile.final || DEFAULT_DEDUCTION_FINAL;
        const twistLabel = endingNode.endType === 'secret' ? '隐藏结局校验' : endingNode.endType === 'neutral' ? '代价校验' : '真相校验';
        const twistLabelEn = endingNode.endType === 'secret' ? 'Secret Ending Check' : endingNode.endType === 'neutral' ? 'Cost Check' : 'Truth Check';

        syntheticNodes.push({
          id: gateId,
          scene: stageOne.scene,
          sceneEn: stageOne.sceneEn,
          text: `${stageOne.premise}\n\n【第一轮校验 / ${twistLabel}】如果你现在选错，故事会接受一个“看似合理”的答案，但真正的因果链会断掉。`,
          textEn: `${stageOne.premiseEn}\n\n[Round 1 / ${twistLabelEn}] Choose wrong now and the story will accept a plausible answer, but the real chain of cause and effect will break.`,
          choices: [
            {
              label: 'A',
              text: stageOne.correct.text,
              textEn: stageOne.correct.textEn,
              next: reviewGateId,
              delta: { clues: 8, wisdom: 8, trust: 3, sanity: 3, exposure: 2, danger: 2 },
            },
            {
              label: 'B',
              text: stageOne.redHerrings[0]?.text || DEFAULT_DEDUCTION_PROFILE.redHerrings[0].text,
              textEn: stageOne.redHerrings[0]?.textEn || DEFAULT_DEDUCTION_PROFILE.redHerrings[0].textEn,
              next: fallbackEnding.id,
              delta: { clues: -6, wisdom: -6, trust: -4, sanity: -4, exposure: 8, danger: 8, stress: 8 },
            },
            {
              label: 'C',
              text: stageOne.cost.text,
              textEn: stageOne.cost.textEn,
              next: reviewGateId,
              delta: { clues: 4, wisdom: 4, trust: -2, sanity: -2, exposure: 5, danger: 5, stress: 6 },
            },
          ],
        });

        syntheticNodes.push({
          id: reviewGateId,
          scene: stageTwo.scene,
          sceneEn: stageTwo.sceneEn,
          text: `${stageTwo.premise}\n\n【第二轮校验】你已经逼近真相，但最后一层伪装还在。现在要决定，是把证据链完整锁死，还是让最后的空隙把你拖回误判。`,
          textEn: `${stageTwo.premiseEn}\n\n[Round 2] You are close to the truth, but the final disguise still stands. Now you must decide whether to lock the evidence chain completely or let the last gap drag you back into a wrong answer.`,
          choices: [
            {
              label: 'A',
              text: stageTwo.correct.text,
              textEn: stageTwo.correct.textEn,
              next: endingNode.id,
              delta: { clues: 10, wisdom: 10, trust: 4, sanity: 4, exposure: 3, danger: 3 },
            },
            {
              label: 'B',
              text: stageTwo.redHerrings[0]?.text || DEFAULT_DEDUCTION_FOLLOW_UP.redHerrings[0].text,
              textEn: stageTwo.redHerrings[0]?.textEn || DEFAULT_DEDUCTION_FOLLOW_UP.redHerrings[0].textEn,
              next: fallbackEnding.id,
              delta: { clues: -8, wisdom: -8, trust: -4, sanity: -4, exposure: 9, danger: 9, stress: 8 },
            },
            {
              label: 'C',
              text: stageTwo.cost.text,
              textEn: stageTwo.cost.textEn,
              next: endingNode.id,
              delta: { clues: 6, wisdom: 6, trust: -3, sanity: -3, exposure: 6, danger: 6, stress: 6 },
            },
          ],
        });

        syntheticNodes.push({
          id: finalGateId,
          scene: stageThree.scene,
          sceneEn: stageThree.sceneEn,
          text: `${stageThree.premise}\n\n【第三轮校验】你已经摸到了结局的门把手，但门后不只是真相，还有代价。现在必须把每一条证据摆回它该在的位置，不能再用“差不多”蒙混过去。`,
          textEn: `${stageThree.premiseEn}\n\n[Round 3] Your hand is already on the door to the ending, but beyond it is not only the truth, but also the cost. Now you must put every clue back where it belongs. “Close enough” is no longer good enough.`,
          choices: [
            {
              label: 'A',
              text: stageThree.correct.text,
              textEn: stageThree.correct.textEn,
              next: endingNode.id,
              delta: { clues: 12, wisdom: 12, trust: 5, sanity: 5, exposure: 4, danger: 4 },
            },
            {
              label: 'B',
              text: stageThree.redHerrings[0]?.text || DEFAULT_DEDUCTION_FINAL.redHerrings[0].text,
              textEn: stageThree.redHerrings[0]?.textEn || DEFAULT_DEDUCTION_FINAL.redHerrings[0].textEn,
              next: fallbackEnding.id,
              delta: { clues: -10, wisdom: -10, trust: -5, sanity: -5, exposure: 10, danger: 10, stress: 10 },
            },
            {
              label: 'C',
              text: stageThree.cost.text,
              textEn: stageThree.cost.textEn,
              next: endingNode.id,
              delta: { clues: 8, wisdom: 8, trust: -4, sanity: -4, exposure: 7, danger: 7, stress: 8 },
            },
          ],
        });
      }

      return {
        ...choice,
        next: gateId,
      };
    });

    return {
      ...node,
      choices,
    };
  });

  return [...rewrittenStory, ...syntheticNodes];
}

type SceneArtTheme =
  | 'rain-office'
  | 'rain-street'
  | 'warehouse'
  | 'police'
  | 'deep-sea'
  | 'control-room'
  | 'pirate-sea'
  | 'ghost-island'
  | 'tomb'
  | 'cyber-city'
  | 'cyber-core'
  | 'palace-garden'
  | 'palace-chamber'
  | 'snow-wilderness'
  | 'fantasy-forest'
  | 'space-station'
  | 'hospital'
  | 'campus'
  | 'desert'
  | 'generic';

const SCENE_THEME_RULES: Record<string, Array<{ pattern: RegExp; theme: SceneArtTheme }>> = {
  'rainy-night': [
    { pattern: /事务所|办公室|桌上|电话|卷帘门|detective office|office|desk phone|phone|caller|call log/i, theme: 'rain-office' },
    { pattern: /街道|雨夜|巷子|追逐|别墅|storm|rain|street|alley|villa|gate chime|southern villa/i, theme: 'rain-street' },
    { pattern: /仓库|工业区|绑架|warehouse|industrial district|freight elevator|abandoned/i, theme: 'warehouse' },
    { pattern: /警察|刘警官|警局|检察院|police|officer|relay|uniform|prosecutor/i, theme: 'police' },
  ],
  'deep-sea': [
    { pattern: /控制面板|系统|日志|通讯|指挥|屏幕|control|system|log|communication|command|screen|black box|ai/i, theme: 'control-room' },
    { pattern: /深海|研究站|舱壁|走廊|储藏室|救援队|海面|deep sea|research station|station|corridor|storage|rescue|ocean|oxygen|pressure/i, theme: 'deep-sea' },
  ],
  'pirate-legend': [
    { pattern: /幽灵岛|守护者|诅咒|幽灵船长|ghost island|guardian|curse|ghost captain|haunted/i, theme: 'ghost-island' },
    { pattern: /海战|风暴|船长|甲板|加勒比海|酒馆|海军|sea battle|storm|captain|deck|caribbean|tavern|navy|treasure|ship/i, theme: 'pirate-sea' },
  ],
  'ancient-mystery': [
    { pattern: /古墓|墓室|地下通道|机关|石门|tomb|burial chamber|underground|mechanism|stone gate|mural|epitaph|relic/i, theme: 'tomb' },
  ],
  'cyber-detective': [
    { pattern: /终端|协议|数据中心|系统|监控|服务器|terminal|protocol|data center|system|surveillance|server|audit|core|cache/i, theme: 'cyber-core' },
    { pattern: /赛博|街区|霓虹|城市|高楼|黑客空间|cyber|district|neon|city|tower|hacker|corporate/i, theme: 'cyber-city' },
  ],
  'palace-intrigue': [
    { pattern: /花园|池塘|亭子|御花园|garden|pond|pavilion|imperial garden/i, theme: 'palace-garden' },
    { pattern: /寝宫|书阁|凤仪宫|朝堂|宫门|密室|皇后|三皇子|chamber|palace|court|gate|secret room|empress|prince|edict|seal|throne/i, theme: 'palace-chamber' },
  ],
  'wilderness-survival': [
    { pattern: /雪|风暴|荒野|营地|森林|冰|山|snow|storm|wilderness|camp|forest|ice|mountain|rescue signal|footprint|cold/i, theme: 'snow-wilderness' },
  ],
  'fantasy-healer': [
    { pattern: /森林|魔法|精灵|王国|黑暗城堡|圣泉|forest|magic|elf|kingdom|dark castle|holy spring|healer|plague|curse/i, theme: 'fantasy-forest' },
  ],
  'space-diplomat': [
    { pattern: /空间站|外交|星际|议会|舰船|宇宙|外星|space station|diplomat|interstellar|council|fleet|ship|cosmos|alien|treaty|translation/i, theme: 'space-station' },
  ],
  'horror-hospital': [
    { pattern: /医院|病房|走廊|手术室|广播|亡魂|镜子|hospital|ward|corridor|operating room|broadcast|ghost|mirror|patient|nurse|chart/i, theme: 'hospital' },
  ],
  'campus-mystery': [
    { pattern: /图书馆|教室|校园|器材室|办公室|实验室|天台|公告栏|library|classroom|campus|equipment room|office|lab|rooftop|bulletin|school|student/i, theme: 'campus' },
  ],
  'desert-kingdom': [
    { pattern: /沙漠|王宫|绿洲|商队|峡谷|城门|神庙|王座|desert|palace|oasis|caravan|canyon|city gate|temple|throne|sand|kingdom/i, theme: 'desert' },
  ],
};

const THEME_DEFAULTS: Record<string, SceneArtTheme> = {
  'rainy-night': 'rain-street',
  'deep-sea': 'deep-sea',
  'pirate-legend': 'pirate-sea',
  'ancient-mystery': 'tomb',
  'cyber-detective': 'cyber-city',
  'palace-intrigue': 'palace-chamber',
  'wilderness-survival': 'snow-wilderness',
  'fantasy-healer': 'fantasy-forest',
  'space-diplomat': 'space-station',
  'horror-hospital': 'hospital',
  'campus-mystery': 'campus',
  'desert-kingdom': 'desert',
};

// 多角色语音配置
const VOICE_PROFILES: Record<string, Record<string, { pitch: number; rate: number; volume: number }>> = {
  'rainy-night': {
    narrator: { pitch: 1.08, rate: 0.84, volume: 0.88 },
    '林晓': { pitch: 0.95, rate: 0.92, volume: 0.95 },
    '神秘女子': { pitch: 1.15, rate: 0.85, volume: 0.92 },
    default: { pitch: 1.0, rate: 0.90, volume: 0.9 },
  },
  'deep-sea': {
    narrator: { pitch: 1.04, rate: 0.82, volume: 0.87 },
    '陈深': { pitch: 0.94, rate: 0.89, volume: 0.95 },
    '林海': { pitch: 0.9, rate: 0.87, volume: 0.92 },
    '苏晴': { pitch: 1.08, rate: 0.9, volume: 0.94 },
    '系统': { pitch: 1.18, rate: 0.93, volume: 0.84 },
    '救援队': { pitch: 0.92, rate: 0.91, volume: 0.9 },
    default: { pitch: 1.0, rate: 0.90, volume: 0.9 },
  },
  'pirate-legend': {
    narrator: { pitch: 1.05, rate: 0.84, volume: 0.88 },
    '罗珊': { pitch: 1.05, rate: 0.91, volume: 0.95 },
    '船员': { pitch: 0.95, rate: 0.89, volume: 0.92 },
    '老鬼': { pitch: 0.9, rate: 0.9, volume: 0.92 },
    '大副': { pitch: 0.88, rate: 0.91, volume: 0.92 },
    '铁钩汉斯': { pitch: 0.86, rate: 0.88, volume: 0.9 },
    '幽灵船长': { pitch: 1.2, rate: 0.8, volume: 0.82 },
    default: { pitch: 1.0, rate: 0.90, volume: 0.9 },
  },
  'ancient-mystery': {
    narrator: { pitch: 1.07, rate: 0.83, volume: 0.88 },
    '叶云霄': { pitch: 1.0, rate: 0.91, volume: 0.95 },
    '古灵': { pitch: 1.2, rate: 0.83, volume: 0.88 },
    default: { pitch: 1.0, rate: 0.90, volume: 0.9 },
  },
  'cyber-detective': {
    narrator: { pitch: 1.03, rate: 0.85, volume: 0.87 },
    '零': { pitch: 1.05, rate: 0.92, volume: 0.95 },
    'AI': { pitch: 1.25, rate: 0.95, volume: 0.85 },
    default: { pitch: 1.0, rate: 0.90, volume: 0.9 },
  },
  'palace-intrigue': {
    narrator: { pitch: 1.08, rate: 0.84, volume: 0.89 },
    '沈若华': { pitch: 1.1, rate: 0.90, volume: 0.95 },
    '皇后': { pitch: 1.02, rate: 0.86, volume: 0.93 },
    '皇帝': { pitch: 0.85, rate: 0.88, volume: 0.92 },
    '三皇子': { pitch: 0.94, rate: 0.9, volume: 0.94 },
    '妃子': { pitch: 1.15, rate: 0.85, volume: 0.90 },
    default: { pitch: 1.0, rate: 0.90, volume: 0.9 },
  },
  'wilderness-survival': {
    narrator: { pitch: 1.02, rate: 0.84, volume: 0.87 },
    '林峰': { pitch: 0.95, rate: 0.91, volume: 0.95 },
    '幸存者': { pitch: 1.1, rate: 0.87, volume: 0.92 },
    default: { pitch: 1.0, rate: 0.90, volume: 0.9 },
  },
  'fantasy-healer': {
    narrator: { pitch: 1.04, rate: 0.85, volume: 0.88 },
    '艾拉': { pitch: 1.15, rate: 0.89, volume: 0.95 },
    '精灵': { pitch: 1.25, rate: 0.86, volume: 0.88 },
    default: { pitch: 1.0, rate: 0.90, volume: 0.9 },
  },
  'space-diplomat': {
    narrator: { pitch: 1.02, rate: 0.85, volume: 0.87 },
    '外交官': { pitch: 1.0, rate: 0.91, volume: 0.95 },
    '外星人': { pitch: 1.3, rate: 0.92, volume: 0.85 },
    default: { pitch: 1.0, rate: 0.90, volume: 0.9 },
  },
  'horror-hospital': {
    narrator: { pitch: 1.11, rate: 0.8, volume: 0.86 },
    '苏明': { pitch: 1.0, rate: 0.90, volume: 0.95 },
    '幽灵': { pitch: 1.35, rate: 0.80, volume: 0.75 },
    default: { pitch: 1.0, rate: 0.90, volume: 0.9 },
  },
  'campus-mystery': {
    narrator: { pitch: 1.05, rate: 0.84, volume: 0.88 },
    '顾晓': { pitch: 1.1, rate: 0.90, volume: 0.95 },
    '阿杰': { pitch: 0.96, rate: 0.93, volume: 0.94 },
    '林诗涵': { pitch: 1.08, rate: 0.9, volume: 0.94 },
    '夏言': { pitch: 0.92, rate: 0.89, volume: 0.92 },
    '苏晴': { pitch: 1.06, rate: 0.9, volume: 0.93 },
    '林俊豪': { pitch: 0.88, rate: 0.88, volume: 0.92 },
    '同学': { pitch: 1.05, rate: 0.88, volume: 0.92 },
    default: { pitch: 1.0, rate: 0.90, volume: 0.9 },
  },
  'desert-kingdom': {
    narrator: { pitch: 1.06, rate: 0.84, volume: 0.88 },
    '萨利姆': { pitch: 0.95, rate: 0.91, volume: 0.95 },
    '侍卫': { pitch: 1.0, rate: 0.89, volume: 0.92 },
    '娜拉': { pitch: 1.15, rate: 1.0, volume: 0.95 },
    default: { pitch: 1.0, rate: 0.90, volume: 0.9 },
  },
};

type StorySoundProfile = {
  droneType: OscillatorType;
  droneFreq: number;
  undertoneFreq: number;
  eerieType: OscillatorType;
  eerieFreq: number;
  eerieLfoFreq: number;
  shadowFreqOffset: number;
  shadowDetune: number;
  shadowGainScale: number;
  rumbleFreq: number;
  rumbleGainScale: number;
  pulseFreq: number;
  pulseLfoFreq: number;
  noiseFilterType: BiquadFilterType;
  noiseFrequency: number;
  noiseGain: number;
  tensionGainBase: number;
  undertoneGainScale: number;
  eerieGainScale: number;
  pulseGainScale: number;
  pulseAttack: number;
  pulseRelease: number;
};

const STORY_SOUND_PROFILES: Record<string, StorySoundProfile> = {
  'rainy-night': { droneType: 'sawtooth', droneFreq: 62, undertoneFreq: 29, eerieType: 'square', eerieFreq: 211, eerieLfoFreq: 0.21, shadowFreqOffset: 23, shadowDetune: -36, shadowGainScale: 0.22, rumbleFreq: 21, rumbleGainScale: 0.34, pulseFreq: 124, pulseLfoFreq: 0.082, noiseFilterType: 'highpass', noiseFrequency: 1760, noiseGain: 0.082, tensionGainBase: 0.31, undertoneGainScale: 0.92, eerieGainScale: 0.34, pulseGainScale: 0.84, pulseAttack: 0.34, pulseRelease: 3.1 },
  'deep-sea': { droneType: 'sawtooth', droneFreq: 44, undertoneFreq: 17, eerieType: 'square', eerieFreq: 96, eerieLfoFreq: 0.066, shadowFreqOffset: 19, shadowDetune: -42, shadowGainScale: 0.23, rumbleFreq: 14, rumbleGainScale: 0.42, pulseFreq: 52, pulseLfoFreq: 0.038, noiseFilterType: 'bandpass', noiseFrequency: 145, noiseGain: 0.055, tensionGainBase: 0.3, undertoneGainScale: 1.02, eerieGainScale: 0.28, pulseGainScale: 0.72, pulseAttack: 0.62, pulseRelease: 4.6 },
  'pirate-legend': { droneType: 'sawtooth', droneFreq: 53, undertoneFreq: 25, eerieType: 'square', eerieFreq: 151, eerieLfoFreq: 0.13, shadowFreqOffset: 21, shadowDetune: 31, shadowGainScale: 0.21, rumbleFreq: 18, rumbleGainScale: 0.34, pulseFreq: 77, pulseLfoFreq: 0.055, noiseFilterType: 'bandpass', noiseFrequency: 390, noiseGain: 0.056, tensionGainBase: 0.28, undertoneGainScale: 0.9, eerieGainScale: 0.31, pulseGainScale: 0.72, pulseAttack: 0.48, pulseRelease: 3.9 },
  'ancient-mystery': { droneType: 'sawtooth', droneFreq: 49, undertoneFreq: 19, eerieType: 'square', eerieFreq: 123, eerieLfoFreq: 0.052, shadowFreqOffset: 17, shadowDetune: -37, shadowGainScale: 0.2, rumbleFreq: 15, rumbleGainScale: 0.38, pulseFreq: 64, pulseLfoFreq: 0.035, noiseFilterType: 'lowpass', noiseFrequency: 260, noiseGain: 0.048, tensionGainBase: 0.27, undertoneGainScale: 0.98, eerieGainScale: 0.27, pulseGainScale: 0.66, pulseAttack: 0.7, pulseRelease: 4.4 },
  'cyber-detective': { droneType: 'sawtooth', droneFreq: 76, undertoneFreq: 34, eerieType: 'square', eerieFreq: 189, eerieLfoFreq: 0.17, shadowFreqOffset: 29, shadowDetune: 44, shadowGainScale: 0.24, rumbleFreq: 19, rumbleGainScale: 0.3, pulseFreq: 156, pulseLfoFreq: 0.13, noiseFilterType: 'bandpass', noiseFrequency: 1220, noiseGain: 0.064, tensionGainBase: 0.3, undertoneGainScale: 0.78, eerieGainScale: 0.38, pulseGainScale: 0.86, pulseAttack: 0.28, pulseRelease: 3.2 },
  'palace-intrigue': { droneType: 'sawtooth', droneFreq: 55, undertoneFreq: 24, eerieType: 'square', eerieFreq: 171, eerieLfoFreq: 0.093, shadowFreqOffset: 22, shadowDetune: -30, shadowGainScale: 0.19, rumbleFreq: 17, rumbleGainScale: 0.32, pulseFreq: 88, pulseLfoFreq: 0.046, noiseFilterType: 'bandpass', noiseFrequency: 315, noiseGain: 0.047, tensionGainBase: 0.26, undertoneGainScale: 0.9, eerieGainScale: 0.29, pulseGainScale: 0.62, pulseAttack: 0.64, pulseRelease: 4.2 },
  'wilderness-survival': { droneType: 'sawtooth', droneFreq: 47, undertoneFreq: 16, eerieType: 'square', eerieFreq: 112, eerieLfoFreq: 0.046, shadowFreqOffset: 18, shadowDetune: -34, shadowGainScale: 0.2, rumbleFreq: 13, rumbleGainScale: 0.4, pulseFreq: 58, pulseLfoFreq: 0.046, noiseFilterType: 'highpass', noiseFrequency: 1060, noiseGain: 0.071, tensionGainBase: 0.28, undertoneGainScale: 0.96, eerieGainScale: 0.25, pulseGainScale: 0.68, pulseAttack: 0.55, pulseRelease: 4.2 },
  'fantasy-healer': { droneType: 'sawtooth', droneFreq: 58, undertoneFreq: 22, eerieType: 'square', eerieFreq: 161, eerieLfoFreq: 0.082, shadowFreqOffset: 24, shadowDetune: 26, shadowGainScale: 0.18, rumbleFreq: 17, rumbleGainScale: 0.28, pulseFreq: 82, pulseLfoFreq: 0.044, noiseFilterType: 'bandpass', noiseFrequency: 480, noiseGain: 0.043, tensionGainBase: 0.25, undertoneGainScale: 0.82, eerieGainScale: 0.27, pulseGainScale: 0.58, pulseAttack: 0.72, pulseRelease: 4.5 },
  'space-diplomat': { droneType: 'sawtooth', droneFreq: 69, undertoneFreq: 28, eerieType: 'square', eerieFreq: 145, eerieLfoFreq: 0.041, shadowFreqOffset: 31, shadowDetune: 38, shadowGainScale: 0.2, rumbleFreq: 15, rumbleGainScale: 0.26, pulseFreq: 72, pulseLfoFreq: 0.032, noiseFilterType: 'bandpass', noiseFrequency: 220, noiseGain: 0.038, tensionGainBase: 0.25, undertoneGainScale: 0.84, eerieGainScale: 0.25, pulseGainScale: 0.54, pulseAttack: 0.9, pulseRelease: 5.0 },
  'horror-hospital': { droneType: 'sawtooth', droneFreq: 48, undertoneFreq: 16, eerieType: 'square', eerieFreq: 217, eerieLfoFreq: 0.19, shadowFreqOffset: 34, shadowDetune: -49, shadowGainScale: 0.3, rumbleFreq: 11, rumbleGainScale: 0.5, pulseFreq: 47, pulseLfoFreq: 0.068, noiseFilterType: 'bandpass', noiseFrequency: 680, noiseGain: 0.088, tensionGainBase: 0.36, undertoneGainScale: 1.08, eerieGainScale: 0.46, pulseGainScale: 0.96, pulseAttack: 0.28, pulseRelease: 2.9 },
  'campus-mystery': { droneType: 'sawtooth', droneFreq: 54, undertoneFreq: 21, eerieType: 'square', eerieFreq: 168, eerieLfoFreq: 0.11, shadowFreqOffset: 24, shadowDetune: 29, shadowGainScale: 0.21, rumbleFreq: 16, rumbleGainScale: 0.32, pulseFreq: 86, pulseLfoFreq: 0.058, noiseFilterType: 'highpass', noiseFrequency: 1280, noiseGain: 0.062, tensionGainBase: 0.28, undertoneGainScale: 0.88, eerieGainScale: 0.32, pulseGainScale: 0.68, pulseAttack: 0.5, pulseRelease: 3.8 },
  'desert-kingdom': { droneType: 'sawtooth', droneFreq: 51, undertoneFreq: 20, eerieType: 'square', eerieFreq: 137, eerieLfoFreq: 0.057, shadowFreqOffset: 19, shadowDetune: -35, shadowGainScale: 0.19, rumbleFreq: 15, rumbleGainScale: 0.3, pulseFreq: 70, pulseLfoFreq: 0.035, noiseFilterType: 'bandpass', noiseFrequency: 430, noiseGain: 0.048, tensionGainBase: 0.26, undertoneGainScale: 0.88, eerieGainScale: 0.27, pulseGainScale: 0.58, pulseAttack: 0.78, pulseRelease: 4.5 },
};

const AMBIENT_MASTER_GAIN = 1.1;
const AMBIENT_TENSION_BOOST = 1.12;
const AMBIENT_NOISE_BOOST = 1.1;
const AMBIENT_DREAD_LAYER_GAIN = 0.2;

function clamp(val: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, val));
}

function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function inferSceneTheme(gameId: string, scene?: string, text?: string): SceneArtTheme {
  const lookup = [scene, text].filter(Boolean).join(' ');
  const match = SCENE_THEME_RULES[gameId]?.find(item => item.pattern.test(lookup));
  return match?.theme || THEME_DEFAULTS[gameId] || 'generic';
}

function getThemePalette(theme: SceneArtTheme, seed: number) {
  const shift = seed % 3;
  const palettes: Record<SceneArtTheme, [string, string, string, string]> = {
    'rain-office': ['#08111d', shift === 0 ? '#12304a' : '#17385a', '#8cc3ff', '#dbe8ff'],
    'rain-street': ['#050910', shift === 0 ? '#0b1d34' : '#102847', '#5aa8ff', '#dce7ff'],
    warehouse: ['#0f1114', shift === 0 ? '#332922' : '#2b211c', '#ffb36b', '#f3dfc5'],
    police: ['#0b1320', shift === 0 ? '#1b2b45' : '#223657', '#79b6ff', '#edf5ff'],
    'deep-sea': ['#020a13', shift === 0 ? '#08354a' : '#0a4258', '#4fd5df', '#d8feff'],
    'control-room': ['#060d16', shift === 0 ? '#10253a' : '#0d3145', '#79f3ff', '#d9fcff'],
    'pirate-sea': ['#0d1018', shift === 0 ? '#1d2942' : '#22314d', '#f6d18b', '#fff2d0'],
    'ghost-island': ['#06070d', shift === 0 ? '#19383e' : '#123338', '#9af0c9', '#edfff7'],
    tomb: ['#0c0b0b', shift === 0 ? '#3b2b1d' : '#47331d', '#e2b06e', '#f9e8c8'],
    'cyber-city': ['#04050d', shift === 0 ? '#25103f' : '#102747', '#ff5fd1', '#b7f7ff'],
    'cyber-core': ['#02040a', shift === 0 ? '#0a3f55' : '#113857', '#63f0ff', '#f0fbff'],
    'palace-garden': ['#0d0f17', shift === 0 ? '#31402f' : '#2b3b2c', '#f6d28b', '#fff7ea'],
    'palace-chamber': ['#120b12', shift === 0 ? '#432036' : '#4d2130', '#f4c27d', '#fff0df'],
    'snow-wilderness': ['#091019', shift === 0 ? '#35576f' : '#406885', '#e9f8ff', '#ffffff'],
    'fantasy-forest': ['#08120f', shift === 0 ? '#1c4b35' : '#1d5a3f', '#85ffcb', '#effff7'],
    'space-station': ['#02050f', shift === 0 ? '#17274c' : '#23345b', '#8ea7ff', '#f3f6ff'],
    hospital: ['#05090c', shift === 0 ? '#25363d' : '#182831', '#9de7de', '#efffff'],
    campus: ['#0b0d16', shift === 0 ? '#243352' : '#2f3b63', '#b5c8ff', '#f6f8ff'],
    desert: ['#120d09', shift === 0 ? '#5d3b1f' : '#744623', '#ffcb7a', '#fff1dd'],
    generic: ['#090c12', '#223246', '#9dbef0', '#f2f6ff'],
  };

  return palettes[theme];
}

function buildSceneSvg(theme: SceneArtTheme, seed: number, label: string) {
  const [bg, mid, accent, glow] = getThemePalette(theme, seed);
  const moonX = 180 + (seed % 980);
  const moonY = 90 + (seed % 160);
  const towerA = 120 + (seed % 130);
  const towerB = 340 + (seed % 160);
  const towerC = 640 + (seed % 140);
  const stars = Array.from({ length: 12 }, (_, index) => {
    const x = (seed * (index + 11) * 17) % 1600;
    const y = (seed * (index + 7) * 13) % 420;
    const opacity = 0.15 + ((seed + index * 19) % 30) / 100;
    return `<circle cx="${x}" cy="${y}" r="${1 + ((seed + index) % 2)}" fill="${glow}" opacity="${opacity}"/>`;
  }).join('');

  const rain = Array.from({ length: 30 }, (_, index) => {
    const x = (seed * (index + 5) * 23) % 1700;
    const y = (seed * (index + 3) * 9) % 900;
    return `<line x1="${x}" y1="${y}" x2="${x - 16}" y2="${y + 44}" stroke="${glow}" stroke-opacity="0.18" stroke-width="2"/>`;
  }).join('');

  const windows = [towerA, towerB, towerC]
    .map((baseX, idx) =>
      Array.from({ length: 6 }, (_, row) => {
        const width = 16 + ((seed + idx + row) % 6);
        const x = baseX + ((row % 2) * 30);
        const y = 420 + row * 50;
        return `<rect x="${x}" y="${y}" width="${width}" height="20" rx="3" fill="${accent}" opacity="0.34"/>`;
      }).join(''),
    )
    .join('');

  const hazeBands = Array.from({ length: 4 }, (_, index) => {
    const y = 120 + index * 150 + ((seed + index * 23) % 40);
    const opacity = 0.04 + ((seed + index * 9) % 6) / 100;
    return `<ellipse cx="${800 + ((seed + index * 17) % 160) - 80}" cy="${y}" rx="${620 - index * 70}" ry="${90 - index * 8}" fill="${glow}" opacity="${opacity}"/>`;
  }).join('');

  const foregroundShapes = Array.from({ length: 5 }, (_, index) => {
    const x = -40 + index * 360 + ((seed + index * 31) % 70);
    const h = 150 + ((seed + index * 13) % 180);
    const w = 180 + ((seed + index * 7) % 90);
    return `<rect x="${x}" y="${900 - h}" width="${w}" height="${h}" rx="28" fill="#05070d" opacity="${0.22 + index * 0.04}"/>`;
  }).join('');

  const shards = Array.from({ length: 7 }, (_, index) => {
    const x = 160 + ((seed + index * 53) % 1280);
    const y = 120 + ((seed + index * 29) % 460);
    const width = 80 + ((seed + index * 5) % 90);
    const height = 10 + ((seed + index * 3) % 14);
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="6" transform="rotate(${((seed + index * 11) % 26) - 13} ${x} ${y})" fill="${accent}" opacity="0.08"/>`;
  }).join('');

  const themeArt: Record<SceneArtTheme, string> = {
    'rain-office': `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <circle cx="${moonX}" cy="${moonY}" r="62" fill="${glow}" opacity="0.2"/>
      <rect x="0" y="520" width="1600" height="380" fill="${mid}" opacity="0.45"/>
      <rect x="1060" y="240" width="320" height="420" rx="12" fill="#0d1724" opacity="0.72"/>
      <rect x="160" y="500" width="620" height="160" rx="14" fill="#09111a" opacity="0.78"/>
      <rect x="280" y="380" width="280" height="120" rx="10" fill="${accent}" opacity="0.12"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
      ${rain}
    `,
    'rain-street': `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <rect x="0" y="560" width="1600" height="340" fill="#061018"/>
      <polygon points="0,580 220,340 420,580" fill="${mid}" opacity="0.44"/>
      <polygon points="300,580 560,280 860,580" fill="${mid}" opacity="0.58"/>
      <polygon points="780,580 1060,260 1340,580" fill="${mid}" opacity="0.52"/>
      <rect x="0" y="600" width="1600" height="300" fill="#07121a" opacity="0.8"/>
      <path d="M0 710 Q 400 690 800 720 T 1600 715" stroke="${accent}" stroke-opacity="0.2" stroke-width="18"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
      ${windows}
      ${rain}
    `,
    warehouse: `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <rect x="0" y="520" width="1600" height="380" fill="#0d0d0d" opacity="0.85"/>
      <rect x="190" y="280" width="1220" height="360" rx="18" fill="${mid}" opacity="0.58"/>
      <rect x="300" y="340" width="120" height="220" fill="${accent}" opacity="0.13"/>
      <rect x="560" y="340" width="140" height="220" fill="${accent}" opacity="0.1"/>
      <rect x="960" y="340" width="170" height="220" fill="${accent}" opacity="0.1"/>
      <rect x="1220" y="340" width="120" height="220" fill="${accent}" opacity="0.12"/>
      <path d="M0 690 L1600 650" stroke="${glow}" stroke-opacity="0.06" stroke-width="12"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    police: `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <rect x="0" y="500" width="1600" height="400" fill="#0a1016" opacity="0.86"/>
      <rect x="240" y="240" width="1120" height="430" rx="18" fill="${mid}" opacity="0.6"/>
      <rect x="320" y="310" width="960" height="60" rx="12" fill="${accent}" opacity="0.12"/>
      <rect x="340" y="420" width="200" height="180" rx="10" fill="#08111a" opacity="0.78"/>
      <rect x="1060" y="420" width="200" height="180" rx="10" fill="#08111a" opacity="0.78"/>
      <rect x="720" y="390" width="160" height="260" rx="16" fill="${glow}" opacity="0.08"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    'deep-sea': `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <circle cx="${moonX}" cy="${moonY + 80}" r="120" fill="${accent}" opacity="0.14"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#water)"/>
      <rect x="160" y="220" width="1280" height="470" rx="28" fill="${mid}" opacity="0.48"/>
      <rect x="280" y="330" width="1040" height="260" rx="20" fill="#07131a" opacity="0.76"/>
      <circle cx="1240" cy="320" r="54" fill="${glow}" opacity="0.2"/>
      <circle cx="360" cy="320" r="22" fill="${glow}" opacity="0.16"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    'control-room': `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <rect x="0" y="530" width="1600" height="370" fill="#050b12" opacity="0.92"/>
      <rect x="160" y="220" width="1280" height="420" rx="26" fill="${mid}" opacity="0.46"/>
      <rect x="240" y="280" width="260" height="180" rx="16" fill="${accent}" opacity="0.15"/>
      <rect x="540" y="280" width="520" height="220" rx="18" fill="${accent}" opacity="0.12"/>
      <rect x="1100" y="280" width="260" height="180" rx="16" fill="${accent}" opacity="0.16"/>
      <rect x="340" y="560" width="920" height="70" rx="20" fill="#07141d" opacity="0.9"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#scanlines)"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    'pirate-sea': `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <circle cx="${moonX}" cy="${moonY}" r="78" fill="${glow}" opacity="0.22"/>
      <path d="M0 580 Q 250 550 530 585 T 1100 575 T 1600 590 V900 H0 Z" fill="${mid}" opacity="0.72"/>
      <polygon points="840,250 870,650 900,650 930,250" fill="#0f1621" opacity="0.9"/>
      <polygon points="930,250 1230,410 930,410" fill="${accent}" opacity="0.16"/>
      <polygon points="930,420 1160,520 930,520" fill="${accent}" opacity="0.12"/>
      <rect x="720" y="600" width="360" height="70" rx="20" fill="#09111a" opacity="0.92"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    'ghost-island': `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <circle cx="${moonX}" cy="${moonY}" r="86" fill="${glow}" opacity="0.17"/>
      <path d="M0 620 Q 300 590 800 640 T 1600 610 V900 H0 Z" fill="#071118"/>
      <polygon points="340,640 540,300 720,640" fill="${mid}" opacity="0.56"/>
      <polygon points="700,640 910,240 1110,640" fill="${mid}" opacity="0.62"/>
      <path d="M880 280 Q 970 200 1040 280 T 1180 280" stroke="${accent}" stroke-opacity="0.26" stroke-width="8" fill="none"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#mist)"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    tomb: `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <rect x="140" y="140" width="1320" height="620" rx="30" fill="${mid}" opacity="0.45"/>
      <rect x="260" y="240" width="1080" height="460" rx="22" fill="#0f0905" opacity="0.74"/>
      <rect x="730" y="230" width="140" height="500" rx="20" fill="${accent}" opacity="0.14"/>
      <circle cx="800" cy="300" r="36" fill="${glow}" opacity="0.2"/>
      <rect x="330" y="330" width="170" height="270" rx="14" fill="${accent}" opacity="0.1"/>
      <rect x="1100" y="330" width="170" height="270" rx="14" fill="${accent}" opacity="0.1"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    'cyber-city': `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <rect x="0" y="560" width="1600" height="340" fill="#040711" opacity="0.92"/>
      <rect x="160" y="260" width="180" height="380" fill="${mid}" opacity="0.7"/>
      <rect x="390" y="180" width="210" height="460" fill="${mid}" opacity="0.62"/>
      <rect x="660" y="120" width="250" height="540" fill="${mid}" opacity="0.66"/>
      <rect x="980" y="200" width="180" height="420" fill="${mid}" opacity="0.58"/>
      <rect x="1200" y="260" width="170" height="360" fill="${mid}" opacity="0.7"/>
      <path d="M0 700 Q 450 660 900 700 T 1600 690" stroke="${accent}" stroke-opacity="0.22" stroke-width="20"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#scanlines)"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    'cyber-core': `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <rect x="180" y="160" width="1240" height="560" rx="34" fill="${mid}" opacity="0.42"/>
      <rect x="280" y="240" width="1040" height="400" rx="28" fill="#061119" opacity="0.82"/>
      <circle cx="800" cy="440" r="120" fill="${accent}" opacity="0.12"/>
      <circle cx="800" cy="440" r="70" fill="${glow}" opacity="0.14"/>
      <path d="M340 300 H1260 M340 380 H1260 M340 500 H1260 M340 580 H1260" stroke="${accent}" stroke-opacity="0.16" stroke-width="8"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#scanlines)"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    'palace-garden': `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <circle cx="${moonX}" cy="${moonY}" r="72" fill="${glow}" opacity="0.2"/>
      <rect x="0" y="540" width="1600" height="360" fill="#0b1512" opacity="0.78"/>
      <rect x="160" y="260" width="1280" height="340" rx="28" fill="${mid}" opacity="0.32"/>
      <circle cx="420" cy="620" r="90" fill="${accent}" opacity="0.12"/>
      <circle cx="1220" cy="620" r="120" fill="${accent}" opacity="0.1"/>
      <rect x="690" y="350" width="220" height="240" rx="110" fill="#10171b" opacity="0.72"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#mist)"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    'palace-chamber': `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <rect x="210" y="160" width="1180" height="570" rx="32" fill="${mid}" opacity="0.38"/>
      <rect x="290" y="240" width="1020" height="430" rx="24" fill="#120a10" opacity="0.8"/>
      <rect x="748" y="220" width="104" height="460" rx="26" fill="${accent}" opacity="0.16"/>
      <rect x="470" y="300" width="130" height="300" rx="20" fill="${glow}" opacity="0.06"/>
      <rect x="1000" y="300" width="130" height="300" rx="20" fill="${glow}" opacity="0.06"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    'snow-wilderness': `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <polygon points="0,650 280,360 520,650" fill="${mid}" opacity="0.58"/>
      <polygon points="280,650 620,260 980,650" fill="${mid}" opacity="0.66"/>
      <polygon points="860,650 1220,300 1600,650" fill="${mid}" opacity="0.6"/>
      <rect x="0" y="650" width="1600" height="250" fill="#dcefff" opacity="0.28"/>
      ${Array.from({ length: 36 }, (_, index) => {
        const x = (seed * (index + 2) * 19) % 1600;
        const y = (seed * (index + 4) * 11) % 900;
        return `<circle cx="${x}" cy="${y}" r="${2 + ((seed + index) % 3)}" fill="${glow}" opacity="0.22"/>`;
      }).join('')}
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    'fantasy-forest': `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <circle cx="${moonX}" cy="${moonY}" r="76" fill="${glow}" opacity="0.18"/>
      <rect x="0" y="580" width="1600" height="320" fill="#07120d" opacity="0.82"/>
      <rect x="190" y="120" width="90" height="620" rx="40" fill="${mid}" opacity="0.72"/>
      <rect x="470" y="70" width="110" height="690" rx="45" fill="${mid}" opacity="0.62"/>
      <rect x="980" y="80" width="100" height="680" rx="44" fill="${mid}" opacity="0.7"/>
      <rect x="1280" y="130" width="84" height="610" rx="40" fill="${mid}" opacity="0.68"/>
      <circle cx="740" cy="380" r="140" fill="${accent}" opacity="0.11"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#mist)"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    'space-station': `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      ${stars}
      <circle cx="${moonX}" cy="${moonY}" r="96" fill="${accent}" opacity="0.16"/>
      <rect x="240" y="250" width="1120" height="400" rx="40" fill="${mid}" opacity="0.5"/>
      <rect x="310" y="320" width="980" height="260" rx="28" fill="#070d18" opacity="0.78"/>
      <circle cx="800" cy="450" r="110" fill="${glow}" opacity="0.08"/>
      <path d="M380 450 H1220 M800 320 V580" stroke="${accent}" stroke-opacity="0.18" stroke-width="10"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#scanlines)"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    hospital: `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <rect x="190" y="130" width="1220" height="640" rx="30" fill="${mid}" opacity="0.38"/>
      <rect x="310" y="210" width="980" height="480" rx="22" fill="#0a1011" opacity="0.82"/>
      <rect x="750" y="220" width="100" height="450" rx="22" fill="${accent}" opacity="0.13"/>
      <circle cx="800" cy="250" r="34" fill="${glow}" opacity="0.16"/>
      <path d="M330 340 H1270 M330 470 H1270 M330 600 H1270" stroke="${accent}" stroke-opacity="0.1" stroke-width="10"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#mist)"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    campus: `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <rect x="0" y="560" width="1600" height="340" fill="#0a1018" opacity="0.86"/>
      <rect x="140" y="240" width="300" height="380" fill="${mid}" opacity="0.62"/>
      <rect x="470" y="180" width="260" height="430" fill="${mid}" opacity="0.55"/>
      <rect x="780" y="200" width="280" height="400" fill="${mid}" opacity="0.58"/>
      <rect x="1100" y="220" width="270" height="390" fill="${mid}" opacity="0.64"/>
      <path d="M0 710 Q 500 680 980 725 T 1600 700" stroke="${accent}" stroke-opacity="0.16" stroke-width="14"/>
      ${windows}
      <rect x="0" y="0" width="1600" height="900" fill="url(#mist)"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    desert: `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <circle cx="${moonX}" cy="${moonY}" r="82" fill="${glow}" opacity="0.2"/>
      <path d="M0 690 Q 280 590 560 680 T 1100 660 T 1600 700 V900 H0 Z" fill="${mid}" opacity="0.74"/>
      <rect x="290" y="320" width="1020" height="260" rx="26" fill="#20140a" opacity="0.42"/>
      <polygon points="600,580 800,260 1010,580" fill="${accent}" opacity="0.12"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#mist)"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
    generic: `
      <rect x="0" y="0" width="1600" height="900" fill="url(#sky)"/>
      <circle cx="${moonX}" cy="${moonY}" r="70" fill="${glow}" opacity="0.18"/>
      <rect x="0" y="540" width="1600" height="360" fill="${mid}" opacity="0.5"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#vignette)"/>
    `,
  };

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${bg}"/>
          <stop offset="100%" stop-color="${mid}"/>
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${mid}" stop-opacity="0.06"/>
          <stop offset="100%" stop-color="${accent}" stop-opacity="0.18"/>
        </linearGradient>
        <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#000000" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0.54"/>
        </linearGradient>
        <linearGradient id="mist" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="${glow}" stop-opacity="0.02"/>
          <stop offset="50%" stop-color="${glow}" stop-opacity="0.1"/>
          <stop offset="100%" stop-color="${glow}" stop-opacity="0.02"/>
        </linearGradient>
        <pattern id="scanlines" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="transparent"/>
          <rect y="0" width="12" height="2" fill="${glow}" opacity="0.04"/>
        </pattern>
        <pattern id="grain" width="120" height="120" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="18" r="1" fill="${glow}" opacity="0.04"/>
          <circle cx="66" cy="42" r="1" fill="${glow}" opacity="0.05"/>
          <circle cx="92" cy="84" r="1" fill="${glow}" opacity="0.04"/>
          <circle cx="32" cy="96" r="1" fill="${glow}" opacity="0.05"/>
          <circle cx="108" cy="22" r="1" fill="${glow}" opacity="0.03"/>
        </pattern>
        <radialGradient id="spotlight" cx="50%" cy="38%" r="52%">
          <stop offset="0%" stop-color="${glow}" stop-opacity="0.18"/>
          <stop offset="50%" stop-color="${glow}" stop-opacity="0.05"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
      </defs>
      ${themeArt[theme]}
      ${hazeBands}
      ${shards}
      ${foregroundShapes}
      <rect x="0" y="0" width="1600" height="900" fill="url(#spotlight)"/>
      <rect x="0" y="0" width="1600" height="900" fill="url(#grain)" opacity="0.34"/>
      <rect x="0" y="0" width="1600" height="56" fill="#000000" opacity="0.34"/>
      <rect x="0" y="844" width="1600" height="56" fill="#000000" opacity="0.38"/>
      <rect x="0" y="0" width="1600" height="900" fill="transparent" stroke="${glow}" stroke-opacity="0.08" stroke-width="2"/>
      <rect x="92" y="730" width="420" height="96" rx="20" fill="#02050b" opacity="0.42" stroke="${glow}" stroke-opacity="0.12"/>
      <text x="128" y="784" fill="${glow}" fill-opacity="0.72" font-size="34" font-family="Georgia, serif">${label}</text>
      <text x="128" y="815" fill="${glow}" fill-opacity="0.28" font-size="16" font-family="Arial, sans-serif" letter-spacing="4">CINEMATIC NODE FRAME</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getSceneImage(gameId: string, nodeId: number, scene?: string, text?: string): string {
  const theme = inferSceneTheme(gameId, scene, text);
  const seed = hashString(`${gameId}:${nodeId}:${scene || ''}:${text || ''}`);
  const label = (scene || text?.slice(0, 12) || gameId).replace(/[&<>]/g, '');
  return buildSceneSvg(theme, seed, label);
}

// 获取本地化的故事节点文本
function getLocalizedText(node: StoryNode | undefined, language: 'en' | 'zh'): string {
  if (!node) return '';
  return language === 'en' && node.textEn ? node.textEn : node.text;
}

// 获取本地化的场景名称
function getLocalizedScene(node: StoryNode | undefined, language: 'en' | 'zh'): string | undefined {
  if (!node?.scene) return undefined;
  return language === 'en' && node.sceneEn ? node.sceneEn : node.scene;
}

// 获取本地化的选项文本
function getLocalizedChoice(choice: StoryChoice, language: 'en' | 'zh'): string {
  return language === 'en' && choice.textEn ? choice.textEn : choice.text || '';
}

function getChoiceDisplayText(choice: StoryChoice, story: StoryNode[], game: GameData, language: 'en' | 'zh'): string {
  const explicitText = getLocalizedChoice(choice, language);
  if (explicitText) return explicitText;

  const nextNode = story.find(node => node.id === choice.next);
  const nextScene = getLocalizedScene(nextNode, language);
  const endings = Array.isArray(game.endings) ? game.endings : [];
  const stats = Array.isArray(game.stats) ? game.stats : [];
  const ending = nextNode?.endingId ? endings.find(item => item.id === nextNode.endingId) : undefined;
  const deltaEntries = Object.entries(choice.delta || {}).filter(([, value]) => value !== 0);
  const strongestDelta = deltaEntries.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))[0];
  const stat = strongestDelta ? stats.find(item => item.key === strongestDelta[0]) : undefined;

  if (nextNode?.end) {
    if (language === 'en') {
      if (ending?.type === 'secret') return `Chase the hidden ending: ${ending.name}`;
      if (ending?.type === 'good') return `Push for a better ending: ${ending.name}`;
      if (ending?.type === 'bad') return `Take the dangerous route toward ${ending.name}`;
      return `Settle into the ${ending?.name || 'alternate'} ending`;
    }

    if (ending?.type === 'secret') return `追查隐藏路线：${ending.name}`;
    if (ending?.type === 'good') return `争取更好结局：${ending.name}`;
    if (ending?.type === 'bad') return `冒险走向危险结局：${ending.name}`;
    return `进入另一种命运：${ending?.name || '未知结局'}`;
  }

  if (strongestDelta && stat) {
    const deltaValue = strongestDelta[1];
    const statPush = language === 'en'
      ? `${deltaValue > 0 ? 'Strengthen' : 'Risk'} ${stat.label}`
      : `${deltaValue > 0 ? '强化' : '押上'}${stat.label}`;
    const destination = nextScene
      ? language === 'en' ? ` to test ${nextScene}` : `，去验证${nextScene}`
      : '';
    return `${statPush}${destination}`;
  }

  if (nextScene) {
    const sceneFallbacks = language === 'en'
      ? [
          `Follow the unease into ${nextScene}`,
          `Enter ${nextScene} and test the contradiction`,
          `Circle back through ${nextScene} for the clue everyone missed`,
        ]
      : [
          `顺着不安感进入${nextScene}`,
          `去${nextScene}验证矛盾`,
          `绕回${nextScene}寻找被忽略的线索`,
        ];
    return sceneFallbacks[((choice.label || 'A').charCodeAt(0) + choice.next) % sceneFallbacks.length];
  }

  const fallbackLabels = language === 'en'
    ? ['Press the most suspicious detail', 'Hold back and watch who reacts', 'Break the obvious answer first']
    : ['咬住最可疑的细节', '先按兵不动，观察谁露出破绽', '先推翻最像答案的答案'];
  return fallbackLabels[((choice.label || 'A').charCodeAt(0) + choice.next) % fallbackLabels.length];
}

function createAmbientNoiseBuffer(context: AudioContext) {
  const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
  const data = buffer.getChannelData(0);
  let brown = 0;
  for (let i = 0; i < data.length; i += 1) {
    const white = Math.random() * 2 - 1;
    brown = (brown + white * 0.045) / 1.018;
    data[i] = (brown + white * 0.22) * 0.24;
  }
  return buffer;
}

export default function GamePlayer() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { saveProgress, getProgress, collectEnding, getCollectedEndings, unlockAchievement, isGameUnlocked } = useGameStore();
  const { language } = useLanguage();
  const translations = language === 'en' ? enTranslations : zhTranslations;
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const game = getGameById(id);
  const story = React.useMemo(() => enhanceStoryWithDeductionGates(STORY_MAP[id] || [], id), [id]);

  const [currentNodeId, setCurrentNodeId] = useState<number>(1);
  const [stats, setStats] = useState<Record<string, number>>(INITIAL_STATS_MAP[id] || {});
  const [history, setHistory] = useState<number[]>([]);
  const [isEnded, setIsEnded] = useState(false);
  const [endingInfo, setEndingInfo] = useState<{ id: string; type: string; name: string; isNew: boolean } | null>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showVoicePanel, setShowVoicePanel] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [currentBgImage, setCurrentBgImage] = useState('');
  const [activeSpeechKey, setActiveSpeechKey] = useState(0);
  const [voiceName, setVoiceName] = useState('');
  const [voiceStyle, setVoiceStyle] = useState<VoiceStylePreset>('humanFemale');
  const [voiceRateAdjust, setVoiceRateAdjust] = useState(1);
  const [voicePitchAdjust, setVoicePitchAdjust] = useState(1);
  const [voiceVolumeAdjust, setVoiceVolumeAdjust] = useState(1);
  const [preferSelectedVoice, setPreferSelectedVoice] = useState(true);
  const [preferredVoiceName, setPreferredVoiceName] = useState('');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [roleVoiceSettings, setRoleVoiceSettings] = useState<Record<VoiceRole, RoleVoiceSettings>>(buildRoleVoiceSettings(id));
  const [voiceRoleTab, setVoiceRoleTab] = useState<VoiceRole>('narrator');
  const [audioReady, setAudioReady] = useState(false);

  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const speechQueueRef = useRef<SpeechSynthesisUtterance[]>([]);
  const speechTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ambientContextRef = useRef<AudioContext | null>(null);
  const ambientMasterRef = useRef<GainNode | null>(null);
  const ambientNodesRef = useRef<Array<AudioNode & { stop?: (when?: number) => void }>>([]);
  const settingsHydratedRef = useRef(false);
  const audioUnlockedRef = useRef(false);

  const currentNode = story?.find(n => n.id === currentNodeId);
  const localizedNodeText = getLocalizedText(currentNode, language);
  const localizedScene = getLocalizedScene(currentNode, language);
  const nodePresentation = currentNode && game ? getNodePresentation(currentNode, game, language) : null;
  const gameStats = Array.isArray(game?.stats) ? game.stats : [];
  const choiceDeltaSummaries = currentNode?.choices?.map(choice => {
    const summary = game ? getChoiceDeltaSummary(choice, game, language) : [];
    return Array.isArray(summary) ? summary : [];
  }) || [];
  const voicePreset = getVoiceStylePreset(voiceStyle, language);
  const defaultRoleVoiceSettings = buildRoleVoiceSettings(id);
  const getRoleSettingsFromState = (settings: Partial<Record<VoiceRole, Partial<RoleVoiceSettings>>>, role: VoiceRole) => {
    const fallback = defaultRoleVoiceSettings[role] || defaultRoleVoiceSettings.neutral;
    const saved = settings[role] || {};
    return {
      ...fallback,
      ...saved,
      voiceStyle: getVoiceStylePreset(saved.voiceStyle || fallback.voiceStyle, language)
        ? (saved.voiceStyle || fallback.voiceStyle)
        : 'humanFemale',
      rateAdjust: typeof saved.rateAdjust === 'number' ? saved.rateAdjust : fallback.rateAdjust,
      pitchAdjust: typeof saved.pitchAdjust === 'number' ? saved.pitchAdjust : fallback.pitchAdjust,
      volumeAdjust: typeof saved.volumeAdjust === 'number' ? saved.volumeAdjust : fallback.volumeAdjust,
      preferredVoiceName: typeof saved.preferredVoiceName === 'string' ? saved.preferredVoiceName : fallback.preferredVoiceName,
    } as RoleVoiceSettings;
  };
  const getSafeRoleSettings = (role: VoiceRole) =>
    getRoleSettingsFromState(roleVoiceSettings, role);
  const updateRoleVoiceSettings = (role: VoiceRole, patch: Partial<RoleVoiceSettings>) =>
    setRoleVoiceSettings(prev => ({
      ...prev,
      [role]: { ...getRoleSettingsFromState(prev, role), ...patch },
    }));
  const currentVoiceRole = detectVoiceRole(id, currentNode?.speaker, localizedNodeText);
  const currentRoleSettings = getSafeRoleSettings(currentVoiceRole);
  const activeRoleSettings = getSafeRoleSettings(voiceRoleTab);
  const collectedEndingsForGame = game ? getCollectedEndings(id) : [];
  const resolvedBgImage = React.useMemo(() => {
    if (currentBgImage) return currentBgImage;
    if (currentNode) {
      return getSceneImage(id, currentNode.id, localizedScene, localizedNodeText);
    }
    return getSceneImage(id, 0, game?.title || id, game?.description || id);
  }, [currentBgImage, currentNode, game?.description, game?.title, id, localizedNodeText, localizedScene]);

  const unlocked = game ? isGameUnlocked(id, game.unlockRequirement) : false;

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const filteredVoices = voices.filter(voice =>
        language === 'en'
          ? voice.lang.startsWith('en')
          : voice.lang.startsWith('zh') || voice.lang.startsWith('cmn'),
      );
      setAvailableVoices(filteredVoices);
      const narratorVoiceName = getPreferredNarratorVoiceName(voices, language);
      if (narratorVoiceName) {
        setRoleVoiceSettings(prev => ({
          ...prev,
          narrator: {
            ...prev.narrator,
            voiceStyle: 'humanFemale',
            preferredVoiceName: prev.narrator.preferredVoiceName || narratorVoiceName,
            rateAdjust: 1,
            pitchAdjust: 1,
            volumeAdjust: 0.99,
          },
        }));
      }
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, [language]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(`voice-settings:${id}:${language}`);
    const defaultSettings = buildRoleVoiceSettings(id);
    if (!raw) {
      setVoiceStyle('humanFemale');
      setVoiceRateAdjust(1);
      setVoicePitchAdjust(1);
      setVoiceVolumeAdjust(1);
      setPreferSelectedVoice(true);
      setPreferredVoiceName('');
      setRoleVoiceSettings(defaultSettings);
      settingsHydratedRef.current = true;
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      if ((parsed.version || 0) < VOICE_SETTINGS_VERSION) {
        localStorage.removeItem(`voice-settings:${id}:${language}`);
        setVoiceStyle('humanFemale');
        setVoiceRateAdjust(1);
        setVoicePitchAdjust(1);
        setVoiceVolumeAdjust(1);
        setPreferSelectedVoice(true);
        setPreferredVoiceName('');
        setRoleVoiceSettings(defaultSettings);
        settingsHydratedRef.current = true;
        return;
      }
      setVoiceStyle(parsed.voiceStyle || 'humanFemale');
      setVoiceRateAdjust(parsed.voiceRateAdjust || 1);
      setVoicePitchAdjust(parsed.voicePitchAdjust || 1);
      setVoiceVolumeAdjust(parsed.voiceVolumeAdjust || 1);
      setPreferSelectedVoice(parsed.preferSelectedVoice ?? true);
      setPreferredVoiceName(parsed.preferredVoiceName || '');
      setRoleVoiceSettings({
        ...defaultSettings,
        ...Object.fromEntries(
          (Object.keys(defaultSettings) as VoiceRole[]).map(role => [
            role,
            {
              ...defaultSettings[role],
              ...(parsed.roleVoiceSettings?.[role] || {}),
              ...(role === 'narrator'
                ? {
                    voiceStyle: 'humanFemale' as VoiceStylePreset,
                    rateAdjust: 1,
                    pitchAdjust: 1,
                    volumeAdjust: 0.99,
                    preferredVoiceName: '',
                  }
                : {}),
            },
          ]),
        ),
      });
    } catch {}
    settingsHydratedRef.current = true;
  }, [id, language]);

  useEffect(() => {
    if (typeof window === 'undefined' || !settingsHydratedRef.current) return;
    localStorage.setItem(
      `voice-settings:${id}:${language}`,
      JSON.stringify({
        version: VOICE_SETTINGS_VERSION,
        voiceStyle,
        voiceRateAdjust,
        voicePitchAdjust,
        voiceVolumeAdjust,
        preferSelectedVoice,
        preferredVoiceName,
        roleVoiceSettings,
      }),
    );
  }, [id, language, voiceStyle, voiceRateAdjust, voicePitchAdjust, voiceVolumeAdjust, preferSelectedVoice, preferredVoiceName, roleVoiceSettings]);

  // 语音朗读
  const speakText = useCallback((text: string, speaker?: string) => {
    if (isMuted || !window.speechSynthesis || !audioUnlockedRef.current) return;
    window.speechSynthesis.cancel();
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    window.speechSynthesis.resume();
    speechQueueRef.current = [];
    setActiveSpeechKey(prev => prev + 1);

    const profiles = VOICE_PROFILES[id] || {};
    const voices = window.speechSynthesis.getVoices();
    const cleanText = (text || '').trim();
    const extractedSegments = extractVoiceSegments(cleanText, id, speaker);
    const normalizedSegments = extractedSegments
      .map(segment => ({
        text: typeof segment?.text === 'string' ? segment.text.trim() : '',
        speaker: segment?.speaker || speaker || 'narrator',
      }))
      .filter(segment => segment.text);
    const segments = normalizedSegments.length > 0
      ? normalizedSegments
      : cleanText
        ? [{ text: cleanText, speaker: speaker || 'narrator' }]
        : [];
    let utteranceIndex = 0;
    let firstSelectedVoiceName = '';

    speechQueueRef.current = segments.flatMap(segment => {
      const segmentText = typeof segment.text === 'string' ? segment.text.trim() : '';
      if (!segmentText) return [];
      const resolvedSpeaker = segment.speaker;
      const role = detectVoiceRole(id, resolvedSpeaker, segmentText);
      const profile = role === 'narrator'
        ? (language === 'en'
            ? { pitch: 1.03, rate: 1.08, volume: 1 }
            : { pitch: 1, rate: 0.96, volume: 0.98 })
        : (resolvedSpeaker && profiles[resolvedSpeaker]) || profiles['narrator'] || { pitch: 0.95, rate: 0.92, volume: 0.92 };
      const roleSettings = getSafeRoleSettings(role);
      const rolePreset = getVoiceStylePreset(roleSettings.voiceStyle, language);
      const autoNarratorVoiceName = role === 'narrator' ? getPreferredNarratorVoiceName(voices, language) : '';
      const preferredVoiceForRole =
        role === 'narrator'
          ? autoNarratorVoiceName
          : roleSettings.preferredVoiceName || preferredVoiceName;
      const manuallySelectedVoice = preferSelectedVoice
        ? voices.find(voice => voice.name === preferredVoiceForRole)
        : undefined;
      const selectedVoice =
        role === 'narrator'
          ? manuallySelectedVoice || voices.find(voice => voice.name === autoNarratorVoiceName) || pickNarrationVoice(voices, language, id, resolvedSpeaker, segmentText)
          : manuallySelectedVoice || pickNarrationVoice(voices, language, id, resolvedSpeaker, segmentText);
      if (!firstSelectedVoiceName && selectedVoice?.name) {
        firstSelectedVoiceName = selectedVoice.name;
      }

      const pacing = getSpeechPacing(segmentText);
      const rawChunks = splitNarrationIntoChunks(segmentText)
        .map(chunk => (typeof chunk === 'string' ? chunk.trim() : ''))
        .filter(Boolean);
      const chunks = (role === 'narrator' && segmentText.length < 320
        ? [segmentText]
        : (rawChunks.length > 0 ? rawChunks : [segmentText]))
        .filter(Boolean)
        .slice(0, role === 'narrator' ? Math.min(3, pacing.maxChunks) : pacing.maxChunks);

      return chunks.map(chunk => {
        const emotionCandidate = getSpeechEmotion(chunk);
        const emotion =
          emotionCandidate && typeof emotionCandidate === 'object'
            ? emotionCandidate
            : { rate: 1, pitch: 1, volume: 1 };
        const utter = new SpeechSynthesisUtterance(chunk);
        utter.lang = language === 'en' ? 'en-US' : 'zh-CN';
        const rawPitch = profile.pitch * voicePreset.pitch * voicePitchAdjust * rolePreset.pitch * roleSettings.pitchAdjust * emotion.pitch;
        const rawRate = profile.rate * voicePreset.rate * voiceRateAdjust * rolePreset.rate * roleSettings.rateAdjust * emotion.rate;
        const rawVolume = profile.volume * voicePreset.volume * voiceVolumeAdjust * rolePreset.volume * roleSettings.volumeAdjust * emotion.volume;
        utter.pitch = role === 'narrator'
          ? Math.min(1.3, Math.max(language === 'en' ? 1.0 : 1.02, rawPitch))
          : Math.min(1.32, rawPitch);
        utter.rate = role === 'narrator'
          ? Math.min(1.12, Math.max(language === 'en' ? 1.06 : 1.02, rawRate))
          : Math.min(1.08, rawRate);
        utter.volume = role === 'narrator' ? Math.min(1, Math.max(0.99, rawVolume)) : Math.min(1, rawVolume);
        if (selectedVoice) utter.voice = selectedVoice;
        utteranceIndex += 1;
        const currentIndex = utteranceIndex;
        utter.onstart = () => setActiveSpeechKey(currentIndex);
        return utter;
      });
    });

    setVoiceName(firstSelectedVoiceName || '');

    if (speechQueueRef.current.length === 0) return;

    const queue = [...speechQueueRef.current];
    const playNext = () => {
      const nextUtter = queue.shift();
      if (!nextUtter || !window.speechSynthesis) return;
      const previousOnStart = nextUtter.onstart;
      nextUtter.onstart = event => {
        previousOnStart?.call(nextUtter, event);
      };
        nextUtter.onend = () => {
          speechTimerRef.current = setTimeout(playNext, 90);
        };
        nextUtter.onerror = () => {
          speechTimerRef.current = setTimeout(playNext, 90);
        };
      speechRef.current = nextUtter;
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(nextUtter);
    };

    playNext();
  }, [
    id,
    isMuted,
    language,
    preferSelectedVoice,
    preferredVoiceName,
    voicePitchAdjust,
    voicePreset.pitch,
    voicePreset.rate,
    voicePreset.volume,
    voiceRateAdjust,
    voiceVolumeAdjust,
    roleVoiceSettings,
  ]);

  // 加载存档
  useEffect(() => {
    if (!game || !story || hasLoaded) return;
    const saved = getProgress(id);
    if (saved && !saved.isCompleted) {
      setCurrentNodeId(saved.currentNodeId);
      setStats(saved.stats);
      setHistory(saved.history);
      toast.info(language === 'en' ? 'Save restored' : '已恢复上次存档');
    }
    setHasLoaded(true);
  }, [game, story, id, getProgress, hasLoaded, language]);

  // 更新背景图片
  useEffect(() => {
    if (currentNode) {
      const img = getSceneImage(id, currentNode.id, localizedScene, localizedNodeText);
      setCurrentBgImage(img);
    }
  }, [currentNodeId, currentNode, id, localizedScene, localizedNodeText]);

  // 打字机效果 + 语音
  useEffect(() => {
    if (!currentNode) return;
    setDisplayedText('');
    setShowChoices(false);
    setIsTyping(true);

    // 触发语音
    if (!isMuted && audioUnlockedRef.current) {
      speakText(localizedNodeText, currentNode.speaker);
    }

    const fullText = localizedNodeText;
    let i = 0;

    function type() {
      if (i < fullText.length) {
        setDisplayedText(fullText.slice(0, i + 1));
        i++;
        typingRef.current = setTimeout(type, getSpeechPacing(fullText).typeInterval);
      } else {
        setIsTyping(false);
        setShowChoices(true);
      }
    }

    type();

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    };
  }, [currentNodeId, currentNode, isMuted, speakText, localizedNodeText]);

  // 静音切换
  useEffect(() => {
    if (isMuted && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
      speechRef.current = null;
    }
  }, [isMuted]);

  const stopAmbientSoundscape = useCallback(() => {
    ambientNodesRef.current.forEach(node => {
      try {
        node.disconnect();
      } catch {}
      try {
        node.stop?.();
      } catch {}
    });
    ambientNodesRef.current = [];
    if (ambientMasterRef.current && ambientContextRef.current) {
      try {
        ambientMasterRef.current.gain.cancelScheduledValues(ambientContextRef.current.currentTime);
        ambientMasterRef.current.gain.setValueAtTime(0, ambientContextRef.current.currentTime);
      } catch {}
    }
  }, []);

  const startAmbientSoundscape = useCallback(() => {
    if (typeof window === 'undefined' || isMuted || !audioUnlockedRef.current) return;
    const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!ambientContextRef.current) {
      ambientContextRef.current = new AudioCtx();
    }
    const context = ambientContextRef.current;

    if (!ambientMasterRef.current) {
      ambientMasterRef.current = context.createGain();
      ambientMasterRef.current.gain.value = 0;
      ambientMasterRef.current.connect(context.destination);
    }

    if (context.state === 'suspended') {
      void context.resume();
    }

    stopAmbientSoundscape();

    const master = ambientMasterRef.current;
    const now = context.currentTime;
    const effect = nodePresentation?.effect || 'fog';
    const storyProfile = STORY_SOUND_PROFILES[id] || STORY_SOUND_PROFILES['horror-hospital'];
    const tensionMultiplier = nodePresentation?.tension === 'high' ? 1.48 : nodePresentation?.tension === 'medium' ? 1.25 : 1.05;
    const effectGainBump = effect === 'rain' || effect === 'fog' ? 0.052 : effect === 'scanlines' ? 0.04 : 0.025;
    const tensionGain = (storyProfile.tensionGainBase * tensionMultiplier + effectGainBump) * AMBIENT_TENSION_BOOST;

    const drone = context.createOscillator();
    drone.type = effect === 'scanlines' ? 'sawtooth' : storyProfile.droneType;
    drone.frequency.setValueAtTime(storyProfile.droneFreq + (effect === 'starlight' ? 12 : effect === 'scanlines' ? 8 : 0), now);
    const droneGain = context.createGain();
    droneGain.gain.setValueAtTime(tensionGain, now);
    drone.connect(droneGain);
    droneGain.connect(master);
    drone.start();

    const undertone = context.createOscillator();
    undertone.type = 'sine';
    undertone.frequency.setValueAtTime(storyProfile.undertoneFreq + (effect === 'sand' ? 4 : 0), now);
    const undertoneGain = context.createGain();
    undertoneGain.gain.setValueAtTime(tensionGain * storyProfile.undertoneGainScale, now);
    undertone.connect(undertoneGain);
    undertoneGain.connect(master);
    undertone.start();

    const eerie = context.createOscillator();
    eerie.type = effect === 'scanlines' ? 'square' : storyProfile.eerieType;
    eerie.frequency.setValueAtTime(storyProfile.eerieFreq + (effect === 'rain' ? 10 : effect === 'scanlines' ? 12 : 0), now);
    const eerieGain = context.createGain();
    eerieGain.gain.setValueAtTime(tensionGain * storyProfile.eerieGainScale, now);
    const eerieLfo = context.createOscillator();
    eerieLfo.type = 'sine';
    eerieLfo.frequency.setValueAtTime(storyProfile.eerieLfoFreq + (effect === 'rain' ? 0.02 : 0), now);
    const eerieDepth = context.createGain();
    eerieDepth.gain.setValueAtTime(tensionGain * 0.18, now);
    eerieLfo.connect(eerieDepth);
    eerieDepth.connect(eerieGain.gain);
    eerie.connect(eerieGain);
    eerieGain.connect(master);
    eerie.start();
    eerieLfo.start();

    const shadow = context.createOscillator();
    shadow.type = storyProfile.eerieType;
    shadow.frequency.setValueAtTime(storyProfile.eerieFreq + storyProfile.shadowFreqOffset, now);
    shadow.detune.setValueAtTime(storyProfile.shadowDetune, now);
    const shadowGain = context.createGain();
    shadowGain.gain.setValueAtTime(tensionGain * storyProfile.shadowGainScale, now);
    const shadowLfo = context.createOscillator();
    shadowLfo.type = 'sine';
    shadowLfo.frequency.setValueAtTime(storyProfile.eerieLfoFreq * 0.65, now);
    const shadowDepth = context.createGain();
    shadowDepth.gain.setValueAtTime(tensionGain * 0.14, now);
    shadowLfo.connect(shadowDepth);
    shadowDepth.connect(shadowGain.gain);
    shadow.connect(shadowGain);
    shadowGain.connect(master);
    shadow.start();
    shadowLfo.start();

    const dread = context.createOscillator();
    dread.type = effect === 'scanlines' || id === 'horror-hospital' ? 'sawtooth' : 'triangle';
    dread.frequency.setValueAtTime(storyProfile.eerieFreq * 1.414 + (effect === 'fog' ? 7 : 0), now);
    dread.detune.setValueAtTime(effect === 'rain' ? -41 : -57, now);
    const dreadGain = context.createGain();
    dreadGain.gain.setValueAtTime(tensionGain * AMBIENT_DREAD_LAYER_GAIN, now);
    const dreadLfo = context.createOscillator();
    dreadLfo.type = 'sine';
    dreadLfo.frequency.setValueAtTime(storyProfile.eerieLfoFreq * 1.9 + 0.017, now);
    const dreadDepth = context.createGain();
    dreadDepth.gain.setValueAtTime(tensionGain * 0.22, now);
    dreadLfo.connect(dreadDepth);
    dreadDepth.connect(dreadGain.gain);
    dread.connect(dreadGain);
    dreadGain.connect(master);
    dread.start();
    dreadLfo.start();

    const rumble = context.createOscillator();
    rumble.type = 'sine';
    rumble.frequency.setValueAtTime(storyProfile.rumbleFreq, now);
    const rumbleGain = context.createGain();
    rumbleGain.gain.setValueAtTime(tensionGain * storyProfile.rumbleGainScale, now);
    const rumbleLfo = context.createOscillator();
    rumbleLfo.type = 'sine';
    rumbleLfo.frequency.setValueAtTime(0.13, now);
    const rumbleDepth = context.createGain();
    rumbleDepth.gain.setValueAtTime(tensionGain * 0.18, now);
    rumbleLfo.connect(rumbleDepth);
    rumbleDepth.connect(rumbleGain.gain);
    rumble.connect(rumbleGain);
    rumbleGain.connect(master);
    rumble.start();
    rumbleLfo.start();

    const pulse = context.createOscillator();
    pulse.type = 'sine';
    pulse.frequency.setValueAtTime(storyProfile.pulseFreq + (effect === 'rain' ? 8 : 0), now);
    const pulseGain = context.createGain();
    pulseGain.gain.setValueAtTime(0.001, now);
    pulse.connect(pulseGain);
    pulseGain.connect(master);
    pulse.start();

    pulseGain.gain.linearRampToValueAtTime(tensionGain * storyProfile.pulseGainScale, now + storyProfile.pulseAttack);
    pulseGain.gain.linearRampToValueAtTime(0.003, now + storyProfile.pulseRelease);

    const pulseLfo = context.createOscillator();
    pulseLfo.type = 'sine';
    pulseLfo.frequency.setValueAtTime(storyProfile.pulseLfoFreq + (effect === 'scanlines' ? 0.02 : 0), now);
    const pulseDepth = context.createGain();
    pulseDepth.gain.setValueAtTime(tensionGain * 0.32, now);
    pulseLfo.connect(pulseDepth);
    pulseDepth.connect(pulseGain.gain);
    pulseLfo.start();

    const noiseSource = context.createBufferSource();
    noiseSource.buffer = createAmbientNoiseBuffer(context);
    noiseSource.loop = true;
    const noiseFilter = context.createBiquadFilter();
    noiseFilter.type = effect === 'rain' || effect === 'snow' ? 'highpass' : storyProfile.noiseFilterType;
    noiseFilter.frequency.setValueAtTime(
      storyProfile.noiseFrequency + (effect === 'rain' ? 320 : effect === 'snow' ? 180 : effect === 'fog' ? -60 : 0),
      now,
    );
    const noiseGain = context.createGain();
    noiseGain.gain.setValueAtTime((storyProfile.noiseGain + (effect === 'rain' ? 0.022 : effect === 'fog' ? 0.016 : 0.008)) * AMBIENT_NOISE_BOOST, now);
    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noiseSource.start();

    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(0.0001, now);
    master.gain.linearRampToValueAtTime(AMBIENT_MASTER_GAIN, now + 0.65);

    ambientNodesRef.current = [
      drone,
      droneGain,
      undertone,
      undertoneGain,
      eerie,
      eerieGain,
      eerieLfo,
      eerieDepth,
      shadow,
      shadowGain,
      shadowLfo,
      shadowDepth,
      dread,
      dreadGain,
      dreadLfo,
      dreadDepth,
      rumble,
      rumbleGain,
      rumbleLfo,
      rumbleDepth,
      pulse,
      pulseGain,
      pulseLfo,
      pulseDepth,
      noiseSource,
      noiseFilter,
      noiseGain,
    ];
  }, [id, isMuted, nodePresentation, stopAmbientSoundscape]);

  const unlockAudioNow = useCallback(() => {
    if (typeof window === 'undefined') return;
    audioUnlockedRef.current = true;
    setAudioReady(true);
    if (window.speechSynthesis) {
      try {
        window.speechSynthesis.resume();
      } catch {}
    }
    startAmbientSoundscape();
    if (!isMuted && currentNode) {
      speakText(localizedNodeText, currentNode.speaker);
    }
  }, [currentNode, isMuted, localizedNodeText, speakText, startAmbientSoundscape]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const unlockAudio = () => {
      unlockAudioNow();
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('pointerdown', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, [unlockAudioNow]);

  useEffect(() => {
    if (isMuted) {
      stopAmbientSoundscape();
      return;
    }
    startAmbientSoundscape();
  }, [isMuted, startAmbientSoundscape, stopAmbientSoundscape]);

  useEffect(() => {
    return () => {
      stopAmbientSoundscape();
      if (ambientContextRef.current) {
        void ambientContextRef.current.close();
        ambientContextRef.current = null;
      }
    };
  }, [stopAmbientSoundscape]);

  const skipTyping = useCallback(() => {
    if (isTyping && currentNode) {
      if (typingRef.current) clearTimeout(typingRef.current);
      setDisplayedText(localizedNodeText);
      setIsTyping(false);
      setShowChoices(true);
    }
  }, [isTyping, currentNode, localizedNodeText]);

  const makeChoice = useCallback((choiceIndex: number) => {
    if (!currentNode?.choices) return;
    const choice = currentNode.choices[choiceIndex];
    if (!choice) return;

    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);

    const newStats = { ...stats };
    if (choice.delta) {
      Object.entries(choice.delta).forEach(([key, val]) => {
        newStats[key] = clamp((newStats[key] ?? 50) + (val as number));
      });
    }

    const nextNodeId = choice.next;
    setStats(newStats);
    setHistory([...history, currentNodeId]);
    setCurrentNodeId(nextNodeId);

    // 检查结局
    const nextNode = story?.find(n => n.id === nextNodeId);
    if (nextNode?.end) {
      const resolvedEndingId = nextNode.endingId || nextNode.id.toString();
      const resolvedEnding = game?.endings.find(ending => ending.id === resolvedEndingId);
      const endingName = resolvedEnding?.name || `Ending ${resolvedEndingId}`;

      setIsEnded(true);
      const alreadyCollected = getCollectedEndings(id).some(ending => ending.endingId === resolvedEndingId);

      setEndingInfo({
        id: resolvedEndingId,
        type: resolvedEnding?.type || nextNode.endType || 'neutral',
        name: endingName,
        isNew: !alreadyCollected,
      });
      if (!alreadyCollected) {
        toast.success(language === 'en' ? `New ending found: ${endingName}` : `发现新结局：${endingName}`);
      }
      collectEnding(id, resolvedEndingId, endingName);
      unlockAchievement(`${id}_ending_${resolvedEndingId}`);
      saveProgress({
        gameId: id,
        currentNodeId: nextNodeId,
        stats: newStats,
        history: [...history, currentNodeId],
        isCompleted: true,
        completedAt: new Date().toISOString(),
        lastPlayedAt: new Date().toISOString(),
      });
    } else {
      saveProgress({
        gameId: id,
        currentNodeId: nextNodeId,
        stats: newStats,
        history: [...history, currentNodeId],
        isCompleted: false,
        lastPlayedAt: new Date().toISOString(),
      });
    }
  }, [currentNode, stats, history, currentNodeId, story, id, game, getCollectedEndings, collectEnding, unlockAchievement, saveProgress, language]);

  const restart = useCallback(() => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    speechRef.current = null;
    setCurrentNodeId(1);
    setStats(INITIAL_STATS_MAP[id] || {});
    setHistory([]);
    setIsEnded(false);
    setEndingInfo(null);
    setDisplayedText('');
    setShowChoices(false);
  }, [id]);

  if (!game || !story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">{t('gamePlayer.labels.loading') || '游戏数据加载中，请稍候...'}</p>
          <Button onClick={() => navigate('/')}>{t('buttons.backToHall')}</Button>
        </div>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url("${resolvedBgImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.2) saturate(0.82)',
          }}
        />
        <div
          className="fixed inset-0 z-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, oklch(0.06 0.015 260 / 0.5) 0%, transparent 42%, oklch(0.06 0.015 260 / 0.92) 100%)',
          }}
        />
        <div className="text-center max-w-md px-6 relative z-10 rounded-3xl border border-border/50 bg-background/70 backdrop-blur-xl py-10">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-2">{language === 'en' ? 'Locked' : '尚未解锁'}</h2>
          <p className="text-muted-foreground mb-6">{game.unlockDescription}</p>
          <Button onClick={() => navigate('/')}>{t('buttons.backToHall')}</Button>
        </div>
      </div>
    );
  }

  const endingColors: Record<string, string> = {
    good: 'oklch(0.60 0.18 145)',
    bad: 'oklch(0.55 0.22 25)',
    secret: 'oklch(0.72 0.12 75)',
    neutral: 'oklch(0.55 0.18 220)',
  };
  const endingColor = endingColors[endingInfo?.type || 'neutral'] || endingColors.neutral;
  const optimisticEndingIds = new Set(collectedEndingsForGame.map(ending => ending.endingId));
  if (endingInfo?.id) optimisticEndingIds.add(endingInfo.id);
  const collectedEndingCount = optimisticEndingIds.size;
  const totalEndingCount = game.endings.length;
  const remainingEndingCount = Math.max(0, totalEndingCount - collectedEndingCount);
  const endingCompletionPercent = totalEndingCount > 0 ? Math.round((collectedEndingCount / totalEndingCount) * 100) : 0;
  const nextUnfoundEnding = game.endings.find(ending => !optimisticEndingIds.has(ending.id));

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* 动态背景图片 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={resolvedBgImage}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url("${resolvedBgImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.22) saturate(0.78)',
          }}
        />
      </AnimatePresence>

      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        animate={{
          scale: [1.02, 1.06, 1.02],
          x: [0, nodePresentation?.effect === 'rain' ? -14 : 10, 0],
          y: [0, nodePresentation?.effect === 'fog' ? -10 : 6, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          backgroundImage: `url("${resolvedBgImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.22,
          mixBlendMode: 'screen',
        }}
      />

      {nodePresentation?.effect === 'rain' && <div className="fixed inset-0 z-0 pointer-events-none narrative-rain" />}
      {nodePresentation?.effect === 'fog' && <div className="fixed inset-0 z-0 pointer-events-none narrative-fog" />}
      {nodePresentation?.effect === 'embers' && <div className="fixed inset-0 z-0 pointer-events-none narrative-embers" />}
      {nodePresentation?.effect === 'scanlines' && <div className="fixed inset-0 z-0 pointer-events-none narrative-scanlines" />}
      {nodePresentation?.effect === 'starlight' && <div className="fixed inset-0 z-0 pointer-events-none narrative-stars" />}
      {nodePresentation?.effect === 'sand' && <div className="fixed inset-0 z-0 pointer-events-none narrative-sand" />}
      {nodePresentation?.effect === 'snow' && <div className="fixed inset-0 z-0 pointer-events-none narrative-snow" />}

      {/* 渐变遮罩 */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, oklch(0.06 0.015 260 / 0.7) 0%, transparent 40%, oklch(0.06 0.015 260 / 0.95) 80%)',
        }}
      />

      {/* 顶部工具栏 */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-white/5 bg-black/40 backdrop-blur-md flex items-center px-4 gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-white/60 hover:text-white"
          onClick={() => { if (window.speechSynthesis) window.speechSynthesis.cancel(); navigate(`/game/${id}`); }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline text-xs">{t('gamePlayer.buttons.exitGame')}</span>
        </Button>

        <div className="flex-1 text-center">
          <span className="text-sm font-medium text-white/80">{game.title}</span>
          {localizedScene && (
            <span className="ml-2 text-xs text-white/40">{localizedScene}</span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {/* 说话角色指示 */}
          {currentNode?.speaker && currentNode.speaker !== 'narrator' && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full mr-1 ${activeSpeechKey ? 'animate-pulse-gold' : ''}`}
              style={{ background: 'oklch(0.72 0.12 75 / 0.15)', color: 'oklch(0.72 0.12 75)' }}
              title={voiceName || undefined}
            >
              {language === 'en' && currentNode.speakerEn ? currentNode.speakerEn : currentNode.speaker}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-white/60 hover:text-white"
            onClick={() => setShowHistory(!showHistory)}
          >
            <BookOpen className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-white/60 hover:text-white"
            onClick={() => {
              if (isMuted && !audioReady) {
                unlockAudioNow();
              }
              setIsMuted(!isMuted);
            }}
            title={isMuted ? t('gamePlayer.buttons.speak') : t('gamePlayer.buttons.mute')}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-white/60 hover:text-white"
            onClick={() => setShowVoicePanel(!showVoicePanel)}
            title={language === 'en' ? 'Voice settings' : '语音设置'}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-white/60 hover:text-white"
            onClick={restart}
            title={t('gamePlayer.buttons.restart')}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* 数值栏 */}
      <div className="fixed top-14 left-0 right-0 z-40 bg-black/30 backdrop-blur-sm border-b border-white/5 px-4 py-2">
        <div className="max-w-2xl mx-auto flex gap-4">
          {gameStats.map(stat => (
            <div key={stat.key} className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-white/50 flex items-center gap-1">
                  <span>{stat.icon}</span>
                  <span className="hidden sm:inline">{stat.label}</span>
                </span>
                <span className="text-xs font-mono" style={{ color: stat.color }}>
                  {stats[stat.key] ?? 50}
                </span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: `${stats[stat.key] ?? 50}%` }}
                  transition={{ duration: 0.5 }}
                  style={{ backgroundColor: stat.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 主内容区 */}
      <main className="relative z-10 flex-1 pt-28 pb-8 px-4 flex flex-col items-center">
        <div className="w-full max-w-2xl flex flex-col gap-5">
          {!audioReady && (
            <div
              className="rounded-2xl border px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              style={{
                background: 'oklch(0.09 0.02 260 / 0.9)',
                borderColor: 'oklch(0.72 0.12 75 / 0.32)',
                backdropFilter: 'blur(18px)',
              }}
            >
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-primary/80 mb-1">
                  {language === 'en' ? 'Sound waiting for your tap' : '声音等待开启'}
                </div>
                <p className="text-sm text-white/82 leading-relaxed">
                  {language === 'en'
                    ? 'This is not an error. Chrome requires one tap before the game can play the natural female narration and darker ambient soundtrack.'
                    : '这不是错误。Chrome 需要你点一次，游戏才能播放更真实的人类女声旁白和更阴森的背景音乐。'}
                </p>
              </div>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={unlockAudioNow}
              >
                {language === 'en' ? 'Tap to start sound' : '点击开启声音'}
              </Button>
            </div>
          )}

          {showVoicePanel && (
            <div
              className="rounded-2xl border p-4 grid gap-4"
              style={{
                background: 'oklch(0.08 0.015 260 / 0.9)',
                borderColor: 'oklch(0.25 0.02 260 / 0.65)',
                backdropFilter: 'blur(18px)',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-primary/75 mb-1">
                    {language === 'en' ? 'Narration Voice' : '旁白语音'}
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed">{voicePreset.description}</p>
                </div>
                <span className="text-[11px] text-white/45">
                  {voiceName || (language === 'en' ? 'Auto matching' : '自动匹配')}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-xs text-white/55">{language === 'en' ? 'Voice style' : '声音风格'}</label>
                  <Select value={voiceStyle} onValueChange={(value) => setVoiceStyle(value as VoiceStylePreset)}>
                    <SelectTrigger className="w-full bg-black/20 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border text-foreground">
                      {(['humanFemale', 'cinematic', 'warm', 'cold', 'tense'] as VoiceStylePreset[]).map(preset => (
                        <SelectItem key={preset} value={preset}>
                          {getVoiceStylePreset(preset, language).label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-white/55">{language === 'en' ? 'System voice' : '系统声音'}</label>
                  <Select value={preferredVoiceName || '__auto__'} onValueChange={(value) => setPreferredVoiceName(value === '__auto__' ? '' : value)}>
                    <SelectTrigger className="w-full bg-black/20 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border text-foreground">
                      <SelectItem value="__auto__">{language === 'en' ? 'Auto choose best voice' : '自动选择最合适声音'}</SelectItem>
                      {availableVoices.map(voice => (
                        <SelectItem key={`${voice.name}-${voice.lang}`} value={voice.name}>
                          {voice.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-xl border border-white/8 bg-black/15 p-3">
                <div className="flex flex-wrap gap-2 mb-3">
                  {(['narrator', 'female', 'male', 'robot', 'mysterious', 'neutral'] as VoiceRole[]).map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setVoiceRoleTab(role)}
                      className="px-3 py-1.5 rounded-full text-xs transition-colors"
                      style={{
                        background: voiceRoleTab === role ? 'oklch(0.72 0.12 75 / 0.15)' : 'oklch(0.16 0.02 260)',
                        color: voiceRoleTab === role ? 'oklch(0.72 0.12 75)' : 'oklch(0.72 0.02 80)',
                        border: `1px solid ${voiceRoleTab === role ? 'oklch(0.72 0.12 75 / 0.35)' : 'oklch(0.22 0.02 260)'}`,
                      }}
                    >
                      {getVoiceRoleLabel(role, language)}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-white/82">{getVoiceRoleLabel(voiceRoleTab, language)}</p>
                    <p className="text-xs text-white/45">
                      {voiceRoleTab === currentVoiceRole
                        ? language === 'en' ? 'This is the active role for the current line.' : '这是当前这句正在使用的角色档位。'
                        : language === 'en' ? 'Tune this role separately for future lines.' : '单独调整这一类角色未来的声音表现。'}
                    </p>
                  </div>
                  <span className="text-[11px] text-primary/75">
                    {getVoiceStylePreset(activeRoleSettings.voiceStyle, language).label}
                  </span>
                </div>

                <div className="rounded-xl border border-primary/10 bg-primary/5 px-3 py-2 mb-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-primary/70 mb-1">
                    {language === 'en' ? 'Preview line' : '试听台词'}
                  </p>
                  <p className="text-sm text-white/82 leading-relaxed">
                    {getVoicePreviewLine(voiceRoleTab, language)}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  <div className="space-y-2">
                    <label className="text-xs text-white/55">{language === 'en' ? 'Role style' : '角色风格'}</label>
                    <Select
                      value={activeRoleSettings.voiceStyle}
                      onValueChange={(value) =>
                        updateRoleVoiceSettings(voiceRoleTab, { voiceStyle: value as VoiceStylePreset })
                      }
                    >
                      <SelectTrigger className="w-full bg-black/20 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border text-foreground">
                        {(['humanFemale', 'cinematic', 'warm', 'cold', 'tense'] as VoiceStylePreset[]).map(preset => (
                          <SelectItem key={preset} value={preset}>
                            {getVoiceStylePreset(preset, language).label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-white/55">{language === 'en' ? 'Role voice' : '角色专属声音'}</label>
                    <Select
                      value={activeRoleSettings.preferredVoiceName || '__auto__'}
                      onValueChange={(value) =>
                        updateRoleVoiceSettings(voiceRoleTab, { preferredVoiceName: value === '__auto__' ? '' : value })
                      }
                    >
                      <SelectTrigger className="w-full bg-black/20 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border text-foreground">
                        <SelectItem value="__auto__">{language === 'en' ? 'Auto match this role' : '这一类角色自动匹配'}</SelectItem>
                        {availableVoices.map(voice => (
                          <SelectItem key={`${voiceRoleTab}-${voice.name}-${voice.lang}`} value={voice.name}>
                            {voice.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-white/55">
                      <span>{language === 'en' ? 'Role speed' : '角色语速'}</span>
                      <span>{activeRoleSettings.rateAdjust.toFixed(2)}x</span>
                    </div>
                    <Slider
                      min={0.8}
                      max={1.15}
                      step={0.01}
                      value={[activeRoleSettings.rateAdjust]}
                      onValueChange={([value]) =>
                        updateRoleVoiceSettings(voiceRoleTab, { rateAdjust: value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-white/55">
                      <span>{language === 'en' ? 'Role pitch' : '角色音高'}</span>
                      <span>{activeRoleSettings.pitchAdjust.toFixed(2)}x</span>
                    </div>
                    <Slider
                      min={0.85}
                      max={1.18}
                      step={0.01}
                      value={[activeRoleSettings.pitchAdjust]}
                      onValueChange={([value]) =>
                        updateRoleVoiceSettings(voiceRoleTab, { pitchAdjust: value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-white/55">
                      <span>{language === 'en' ? 'Role volume' : '角色音量'}</span>
                      <span>{activeRoleSettings.volumeAdjust.toFixed(2)}x</span>
                    </div>
                    <Slider
                      min={0.75}
                      max={1}
                      step={0.01}
                      value={[activeRoleSettings.volumeAdjust]}
                      onValueChange={([value]) =>
                        updateRoleVoiceSettings(voiceRoleTab, { volumeAdjust: value })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-white/55">
                    <span>{language === 'en' ? 'Speed' : '语速'}</span>
                    <span>{voiceRateAdjust.toFixed(2)}x</span>
                  </div>
                  <Slider min={0.8} max={1.15} step={0.01} value={[voiceRateAdjust]} onValueChange={([value]) => setVoiceRateAdjust(value)} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-white/55">
                    <span>{language === 'en' ? 'Pitch' : '音高'}</span>
                    <span>{voicePitchAdjust.toFixed(2)}x</span>
                  </div>
                  <Slider min={0.85} max={1.18} step={0.01} value={[voicePitchAdjust]} onValueChange={([value]) => setVoicePitchAdjust(value)} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-white/55">
                    <span>{language === 'en' ? 'Volume' : '音量'}</span>
                    <span>{voiceVolumeAdjust.toFixed(2)}x</span>
                  </div>
                  <Slider min={0.75} max={1} step={0.01} value={[voiceVolumeAdjust]} onValueChange={([value]) => setVoiceVolumeAdjust(value)} />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-white/8 bg-black/15 px-3 py-2">
                <div>
                  <p className="text-sm text-white/78">{language === 'en' ? 'Prefer selected system voice' : '优先使用手动选择的系统声音'}</p>
                  <p className="text-xs text-white/45">{language === 'en' ? 'Turn this off to let the game auto-match characters.' : '关闭后由游戏自动给不同角色匹配声音。'}</p>
                </div>
                <Switch checked={preferSelectedVoice} onCheckedChange={setPreferSelectedVoice} />
              </div>

              <div className="flex justify-end">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/10 text-white/75 hover:bg-white/5"
                    onClick={() => {
                      const defaults = buildRoleVoiceSettings(id);
                      setVoiceStyle('humanFemale');
                      setVoiceRateAdjust(1);
                      setVoicePitchAdjust(1);
                      setVoiceVolumeAdjust(1);
                      setPreferSelectedVoice(true);
                      setPreferredVoiceName('');
                      setRoleVoiceSettings(defaults);
                    }}
                  >
                    {language === 'en' ? 'Reset defaults' : '恢复故事默认'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/10"
                    onClick={() => {
                      if (window.speechSynthesis) window.speechSynthesis.cancel();
                      unlockAudioNow();
                      speakText(getVoicePreviewLine(voiceRoleTab, language), getPreviewSpeakerForRole(voiceRoleTab, id));
                    }}
                  >
                    {language === 'en' ? 'Preview selected role' : '试听当前角色档位'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/10"
                    onClick={() => {
                      if (window.speechSynthesis) window.speechSynthesis.cancel();
                      unlockAudioNow();
                      speakText(localizedNodeText || (language === 'en' ? 'Testing narration voice.' : '正在测试旁白声音。'), currentNode?.speaker);
                    }}
                  >
                    {language === 'en' ? 'Preview current line' : '试听当前台词'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {nodePresentation && (
            <div className="grid grid-cols-1 md:grid-cols-[1.25fr_0.75fr] gap-3">
              <div
                className="rounded-2xl p-4 border"
                style={{
                  background: 'oklch(0.09 0.015 260 / 0.86)',
                  borderColor: 'oklch(0.25 0.02 260 / 0.65)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="flex items-center gap-2 mb-2 text-xs text-white/45 tracking-[0.2em] uppercase">
                  <span>Mission</span>
                  <span className="h-px flex-1 bg-white/8" />
                </div>
                <p className="text-sm md:text-[15px] leading-relaxed text-white/88">{nodePresentation.objective}</p>
              </div>
              <div
                className="rounded-2xl p-4 border"
                style={{
                  background: 'oklch(0.09 0.015 260 / 0.78)',
                  borderColor: 'oklch(0.72 0.12 75 / 0.26)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="text-xs text-primary/80 tracking-[0.18em] uppercase mb-2">
                  {nodePresentation.pulseLabel}
                </div>
                <p className="text-sm text-white/72 leading-relaxed">{nodePresentation.status}</p>
              </div>
            </div>
          )}

          {/* 故事文本框 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentNodeId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
            >
              <div
                className="rounded-2xl p-6 md:p-8 cursor-pointer select-none"
                onClick={skipTyping}
                style={{
                  background: 'oklch(0.08 0.015 260 / 0.85)',
                  border: '1px solid oklch(0.25 0.02 260 / 0.6)',
                  backdropFilter: 'blur(16px)',
                  minHeight: '180px',
                }}
              >
                {/* 场景标签 + 说话角色 */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  {localizedScene && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: 'oklch(0.20 0.02 260)', color: 'oklch(0.60 0.08 80)' }}
                    >
                      📍 {localizedScene}
                    </span>
                  )}
                  {currentNode?.speaker && currentNode.speaker !== 'narrator' && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${activeSpeechKey ? 'animate-pulse-gold' : ''}`}
                      style={{ background: 'oklch(0.72 0.12 75 / 0.12)', color: 'oklch(0.72 0.12 75)' }}
                      title={voiceName || undefined}
                    >
                      💬 {language === 'en' && currentNode.speakerEn ? currentNode.speakerEn : currentNode.speaker}
                    </span>
                  )}
                  {nodePresentation && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: nodePresentation.tension === 'high' ? 'oklch(0.55 0.22 25 / 0.16)' : 'oklch(0.55 0.18 220 / 0.16)',
                        color: nodePresentation.tension === 'high' ? 'oklch(0.70 0.18 35)' : 'oklch(0.72 0.12 75)',
                      }}
                    >
                      {nodePresentation.pulseLabel}
                    </span>
                  )}
                </div>

                <p
                  className="text-base leading-relaxed whitespace-pre-wrap"
                  style={{ color: 'oklch(0.88 0.02 80)' }}
                >
                  {displayedText}
                  {isTyping && (
                    <span className="inline-block w-0.5 h-4 bg-current ml-0.5 animate-pulse" />
                  )}
                </p>

                {isTyping && (
                  <p className="text-xs text-white/30 mt-4 text-right">{language === 'en' ? 'Click to skip' : '点击跳过'}</p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 选项区 */}
          <AnimatePresence>
            {showChoices && !isEnded && currentNode?.choices && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="flex flex-col gap-3"
              >
                {currentNode.choices.map((choice, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    onClick={() => makeChoice(idx)}
                    className="group w-full text-left rounded-xl p-4 transition-all duration-200 flex items-start gap-3"
                    style={{
                      background: 'oklch(0.10 0.015 260 / 0.7)',
                      border: '1px solid oklch(0.22 0.02 260 / 0.6)',
                      backdropFilter: 'blur(8px)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = 'oklch(0.14 0.02 260 / 0.85)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.72 0.12 75 / 0.4)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'oklch(0.10 0.015 260 / 0.7)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.22 0.02 260 / 0.6)';
                    }}
                  >
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold mt-0.5"
                      style={{
                        background: 'oklch(0.72 0.12 75 / 0.15)',
                        color: 'oklch(0.72 0.12 75)',
                      }}
                    >
                      {choice.label}
                    </span>
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: 'oklch(0.82 0.02 80)' }}
                    >
                      {getChoiceDisplayText(choice, story, game, language)}
                    </span>
                    {Array.isArray(choiceDeltaSummaries[idx]) && choiceDeltaSummaries[idx].length ? (
                      <div className="ml-auto flex flex-wrap gap-1.5 justify-end max-w-[42%]">
                        {choiceDeltaSummaries[idx].map(delta => (
                          <span
                            key={`${choice.label}-${delta.key}`}
                            className="text-[11px] px-2 py-1 rounded-full border"
                            style={{
                              color: delta.color,
                              borderColor: `${delta.color}35`,
                              background: `${delta.color}15`,
                            }}
                          >
                            {delta.label} {delta.value > 0 ? `+${delta.value}` : delta.value}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 结局画面 */}
          <AnimatePresence>
            {isEnded && endingInfo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl p-8 text-center"
                style={{
                  background: `${endingColor}12`,
                  border: `1px solid ${endingColor}40`,
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div className="text-5xl mb-4">
                  {endingInfo.type === 'good' ? '✨' :
                   endingInfo.type === 'bad' ? '💀' :
                   endingInfo.type === 'secret' ? '🔮' : '🌙'}
                </div>
                <div
                  className="text-xs font-medium tracking-widest uppercase mb-2"
                  style={{ color: endingColor }}
                >
                  {endingInfo.isNew
                    ? (language === 'en' ? 'New Ending Unlocked' : '新结局已解锁')
                    : t('gamePlayer.labels.ending')}
                </div>
                <h2
                  className="text-2xl font-bold mb-4"
                  style={{ color: endingColor }}
                >
                  {endingInfo.name}
                </h2>

                <div
                  className="rounded-xl border p-4 mb-6 text-left"
                  style={{
                    background: 'oklch(0.06 0.015 260 / 0.58)',
                    borderColor: `${endingColor}30`,
                  }}
                >
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-sm text-white/78">
                      {language === 'en' ? 'Story collection progress' : '本故事结局收集进度'}
                    </span>
                    <span className="font-cinzel text-sm" style={{ color: endingColor }}>
                      {collectedEndingCount}/{totalEndingCount}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-3">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${endingCompletionPercent}%` }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      style={{ background: endingColor }}
                    />
                  </div>
                  <p className="text-sm text-white/62 leading-relaxed">
                    {remainingEndingCount === 0
                      ? (language === 'en'
                          ? 'You have collected every ending in this story. This one is fully conquered.'
                          : '你已经收集完这个故事的全部结局，这一部已经被你完全攻破。')
                      : nextUnfoundEnding
                        ? (language === 'en'
                            ? `${remainingEndingCount} ending${remainingEndingCount > 1 ? 's' : ''} left. Next target: ${nextUnfoundEnding.name}.`
                            : `还差 ${remainingEndingCount} 个结局。下一目标：${nextUnfoundEnding.name}。`)
                        : (language === 'en'
                            ? `${remainingEndingCount} ending${remainingEndingCount > 1 ? 's' : ''} left.`
                            : `还差 ${remainingEndingCount} 个结局。`)}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    onClick={restart}
                    variant="outline"
                    className="gap-2"
                    style={{ borderColor: `${endingColor}40`, color: endingColor }}
                  >
                    <RotateCcw className="w-4 h-4" />
                    {language === 'en' ? 'Try Again' : '再次挑战'}
                  </Button>
                  <Button
                    onClick={() => navigate(`/game/${id}`)}
                    style={{ background: endingColor, color: '#000' }}
                  >
                    {language === 'en' ? 'View Endings' : '查看结局收集'}
                  </Button>
                  <Button
                    onClick={() => navigate('/')}
                    variant="ghost"
                    className="text-white/50"
                  >
                    {t('buttons.backToHall')}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* 历史记录侧边栏 */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-72 z-50 border-l border-white/10 overflow-y-auto"
            style={{ background: 'oklch(0.07 0.015 260 / 0.95)', backdropFilter: 'blur(20px)' }}
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-semibold text-sm text-white/80">{language === 'en' ? 'Choice History' : '选择历史'}</h3>
              <Button
                variant="ghost"
                size="icon"
                className="w-7 h-7 text-white/50"
                onClick={() => setShowHistory(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-4 space-y-2">
              {history.length === 0 ? (
                <p className="text-xs text-white/30 text-center py-8">{language === 'en' ? 'No history yet' : '还没有选择记录'}</p>
              ) : (
                history.map((nodeId, idx) => {
                  const node = story.find(n => n.id === nodeId);
                  return (
                    <div
                      key={idx}
                      className="text-xs p-2 rounded-lg"
                      style={{ background: 'oklch(0.11 0.015 260)' }}
                    >
                      <span className="text-white/30">#{idx + 1} </span>
                      <span className="text-white/60 line-clamp-2">
                        {getLocalizedText(node, language).slice(0, 60)}...
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
