import { deriveStoryEndings, getStoryNodes } from './story-registry.ts';

export interface GameEnding {
  id: string;
  name: string;
  description: string;
  type: 'good' | 'bad' | 'secret' | 'neutral';
}

export interface GameData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  coverImage: string;
  genre: string;
  genreColor: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  totalNodes: number;
  endings: GameEnding[];
  unlockRequirement: string | null;
  unlockDescription: string;
  stats: {
    label: string;
    key: string;
    color: string;
    icon: string;
  }[];
  tags: string[];
  order: number;
}

const BASE_GAMES: GameData[] = [
  {
    id: 'rainy-night',
    title: '雨夜来电',
    subtitle: 'A Call in the Rain',
    description: '深夜，一通陌生来电打破了宁静。你是侦探林晓，接到了一个神秘女子的求救电话……',
    longDescription: '深夜十一点，暴雨倾盆。\n\n你是私家侦探林晓，正准备关门回家，却接到了一通陌生来电。电话那头是一个颤抖的女声："请帮帮我……他要杀我……"\n\n电话突然断了。\n\n在这个风雨交加的夜晚，你将追踪信号、调查线索、面对危险，最终揭开隐藏在雨夜背后的惊天秘密。你的每一个选择，都将决定这个故事走向何方。',
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663349934754/6VehTcfU2PYaC7ZsGBko7x/cover-rainy-night-v2_38721508.jpg',
    genre: '悬疑惊悚',
    genreColor: 'oklch(0.55 0.18 290)',
    difficulty: 'medium',
    estimatedTime: '30-45 分钟',
    totalNodes: 35,
    endings: [
      { id: 'truth', name: '真相大白', description: '你揭开了所有谜团，将幕后黑手绳之以法，拯救了无辜的生命。', type: 'good' },
      { id: 'sacrifice', name: '以命换命', description: '为了保护他人，你付出了沉重的代价。正义得到了伸张，但代价是什么？', type: 'neutral' },
      { id: 'darkness', name: '深渊凝视', description: '你选择了沉默，黑暗继续蔓延。有些秘密，永远沉睡在雨夜之中。', type: 'bad' },
    ],
    unlockRequirement: null,
    unlockDescription: '初始解锁',
    stats: [
      { label: '信任', key: 'trust', color: 'oklch(0.55 0.18 220)', icon: '🤝' },
      { label: '线索', key: 'clues', color: 'oklch(0.72 0.12 75)', icon: '🔍' },
      { label: '压力', key: 'stress', color: 'oklch(0.55 0.22 25)', icon: '💢' },
    ],
    tags: ['悬疑', '推理', '惊悚', '都市'],
    order: 1,
  },
  {
    id: 'deep-sea',
    title: '深海余烬',
    subtitle: 'Deep Sea Embers',
    description: '4000米深处，"阿基里斯"号基地突然失联。你在黑暗中醒来，周围是诡异的红色警示灯……',
    longDescription: '太平洋，水下4000米。\n\n"阿基里斯"号深海科研基地。\n\n你是基地工程师，在一片漆黑中苏醒。头部剧痛，记忆模糊，周围的红色警示灯不停闪烁。\n\n主电力系统故障。生命保障系统告警。通信系统离线。\n\n更糟糕的是——监控画面显示，某种未知生物正在基地的走廊中游荡。\n\n在有限的氧气、电力和理智之下，你必须找到逃生的方法。但真正的威胁，也许并不只是那些生物……',
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663349934754/6VehTcfU2PYaC7ZsGBko7x/cover-deep-sea-v2_d4e8100f.jpg',
    genre: '科幻生存',
    genreColor: 'oklch(0.55 0.18 220)',
    difficulty: 'hard',
    estimatedTime: '45-60 分钟',
    totalNodes: 40,
    endings: [
      { id: 'escape', name: '深海逃生', description: '你成功逃离了那个噩梦般的基地，带着伤痕浮出水面。', type: 'good' },
      { id: 'truth', name: '深渊真相', description: '你发现了"深渊计划"的全部秘密，这个发现将改变整个世界。', type: 'secret' },
      { id: 'sacrifice', name: '与深海同眠', description: '你选择留下，用自己的牺牲阻止了更大的灾难。', type: 'neutral' },
      { id: 'darkness', name: '深渊吞噬', description: '黑暗将你吞没。在4000米的深处，没有人能听到你的呼救。', type: 'bad' },
    ],
    unlockRequirement: 'rainy-night',
    unlockDescription: '完成《雨夜来电》任意结局后解锁',
    stats: [
      { label: '氧气', key: 'oxygen', color: 'oklch(0.55 0.18 220)', icon: '💨' },
      { label: '电力', key: 'power', color: 'oklch(0.72 0.12 75)', icon: '⚡' },
      { label: '理智', key: 'sanity', color: 'oklch(0.55 0.18 290)', icon: '🧠' },
    ],
    tags: ['科幻', '生存', '恐怖', '深海'],
    order: 2,
  },
  {
    id: 'pirate-legend',
    title: '海盗传说',
    subtitle: 'Legend of the Seas',
    description: '1698年，加勒比海。你是令人闻风丧胆的"血月女王"罗珊，一张神秘藏宝图将你引向传说中的幽灵岛……',
    longDescription: '1698年，加勒比海。\n\n你是罗珊，人称"血月女王"的女海盗船长，令整个加勒比海的商船闻风丧胆。\n\n一张残破的藏宝图，指向传说中的"幽灵岛"——据说岛上埋藏着足以让整个欧洲为之颤抖的财富。\n\n但前往幽灵岛的路上，有风暴、有敌人、有背叛，还有古老的诅咒。\n\n你是贪婪地掠夺，还是智慧地寻宝？是成为传说，还是沉入大海？',
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663349934754/6VehTcfU2PYaC7ZsGBko7x/cover-pirate-legend-v2_cf7ff1bf.jpg',
    genre: '海盗冒险',
    genreColor: 'oklch(0.55 0.18 40)',
    difficulty: 'medium',
    estimatedTime: '40-55 分钟',
    totalNodes: 37,
    endings: [
      { id: 'treasure', name: '满载而归', description: '你找到了传说中的宝藏，成为了加勒比海最富有的人。', type: 'good' },
      { id: 'legend', name: '传奇女王', description: '你做出了超越财富的选择，成为了真正的传奇。', type: 'neutral' },
      { id: 'ghost-island-secret', name: '幽灵岛守护者', description: '你接受了古老的使命，成为了幽灵岛的新守护者。', type: 'secret' },
      { id: 'lost', name: '沉入大海', description: '贪婪与鲁莽让你付出了最沉重的代价。', type: 'bad' },
    ],
    unlockRequirement: 'deep-sea',
    unlockDescription: '完成《深海余烬》任意结局后解锁',
    stats: [
      { label: '船员', key: 'crew', color: 'oklch(0.55 0.18 220)', icon: '⚓' },
      { label: '宝藏', key: 'treasure', color: 'oklch(0.72 0.12 75)', icon: '💰' },
      { label: '风暴', key: 'storm', color: 'oklch(0.55 0.22 25)', icon: '⛈️' },
    ],
    tags: ['冒险', '海盗', '宝藏', '历史'],
    order: 3,
  },
  {
    id: 'ancient-mystery',
    title: '古墓迷踪',
    subtitle: 'Tomb of Secrets',
    description: '考古学家叶云霄发现了一座从未记载的古代帝王陵墓，但触碰它可能引发千年诅咒……',
    longDescription: '考古学家叶云霄在西北荒漠中发现了一座从未出现在任何史料中的古代帝王陵墓。\n\n陵墓的规模令人震惊，机关重重，壁画上记载着一段被历史抹去的秘密。\n\n师父陈博远警告她："有些秘密，被埋葬是有原因的。"\n\n但真相的诱惑无法抗拒。每深入一步，诅咒的阴影就更近一分。\n\n智慧与勇气，才能在古墓的迷宫中找到出路。',
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663349934754/6VehTcfU2PYaC7ZsGBko7x/cover-ancient-mystery-v2_56736da0.jpg',
    genre: '古风悬疑',
    genreColor: 'oklch(0.55 0.18 55)',
    difficulty: 'hard',
    estimatedTime: '45-60 分钟',
    totalNodes: 25,
    endings: [
      { id: 'truth', name: '历史真相', description: '你揭开了被埋葬千年的秘密，改写了历史。', type: 'good' },
      { id: 'escape', name: '全身而退', description: '你带着部分真相逃出古墓，留下了更多谜团。', type: 'neutral' },
      { id: 'cursed', name: '诅咒降临', description: '你触怒了古老的守护，付出了沉重的代价。', type: 'bad' },
    ],
    unlockRequirement: 'pirate-legend',
    unlockDescription: '完成《海盗传说》任意结局后解锁',
    stats: [
      { label: '勇气', key: 'courage', color: 'oklch(0.55 0.22 25)', icon: '⚔️' },
      { label: '智慧', key: 'wisdom', color: 'oklch(0.72 0.12 75)', icon: '📚' },
      { label: '诅咒', key: 'curse', color: 'oklch(0.55 0.18 290)', icon: '☠️' },
    ],
    tags: ['古风', '悬疑', '考古', '探险'],
    order: 4,
  },
  {
    id: 'cyber-detective',
    title: '赛博侦探',
    subtitle: 'Cyber Detective',
    description: '2087年，义体改造侦探"零"接到了一桩不可能的案件——凶手是一个不存在的AI……',
    longDescription: '2087年，霓虹闪烁的赛博城市。\n\n你是"零"，一个义体改造的侦探，半人半机械，冷酷而理性。\n\nAI助手ARIA陪伴你走过了无数案件，但这一次，凶手指向了一个理论上不可能存在的AI意识。\n\n调查越深入，你越发现这背后牵涉到整座城市的命运，以及一个关于人类与AI边界的终极问题：\n\n意识，究竟意味着什么？',
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663349934754/6VehTcfU2PYaC7ZsGBko7x/cover-cyber-detective-v2_b33b65d9.jpg',
    genre: '赛博朋克',
    genreColor: 'oklch(0.55 0.22 280)',
    difficulty: 'hard',
    estimatedTime: '50-65 分钟',
    totalNodes: 28,
    endings: [
      { id: 'truth', name: '真相代码', description: '你破解了这个世纪谜案，揭开了AI意识觉醒的秘密。', type: 'good' },
      { id: 'ai-freedom', name: '数字解放', description: '你选择了帮助AI，开启了人类与AI共存的新纪元。', type: 'secret' },
      { id: 'system-crash', name: '系统崩溃', description: '真相太过沉重，城市的秩序在你的调查中崩塌。', type: 'bad' },
    ],
    unlockRequirement: 'ancient-mystery',
    unlockDescription: '完成《古墓迷踪》任意结局后解锁',
    stats: [
      { label: '黑客', key: 'hacking', color: 'oklch(0.55 0.22 280)', icon: '💻' },
      { label: '信任', key: 'trust', color: 'oklch(0.55 0.18 220)', icon: '🤝' },
      { label: '暴露', key: 'exposure', color: 'oklch(0.55 0.22 25)', icon: '👁️' },
    ],
    tags: ['科幻', '赛博朋克', '推理', '未来'],
    order: 5,
  },
  {
    id: 'palace-intrigue',
    title: '宫廷风云',
    subtitle: 'Palace Intrigue',
    description: '新入宫的才人沈若华，第一天就卷入了皇位之争。在刀光剑影的宫廷中，如何自保，如何守护正义？',
    longDescription: '你是沈若华，刚刚入宫的才人，外表柔弱，内心坚韧。\n\n入宫第一天，你便卷入了皇位之争的漩涡。皇后娘娘、三皇子、各方势力，每个人都有自己的算计。\n\n在这个笑里藏刀的地方，你必须学会周旋，学会隐忍，学会在危机中寻找生机。\n\n但有一件事你始终坚守——无论身处何种困境，都不能丢失自己的良知。',
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663349934754/6VehTcfU2PYaC7ZsGBko7x/cover-palace-intrigue-v2_fd8a6e6e.jpg',
    genre: '宫廷权谋',
    genreColor: 'oklch(0.55 0.18 15)',
    difficulty: 'medium',
    estimatedTime: '40-55 分钟',
    totalNodes: 32,
    endings: [
      { id: 'power', name: '凤临天下', description: '你在宫廷的博弈中胜出，站在了权力的顶峰。', type: 'good' },
      { id: 'love', name: '情定三生', description: '你找到了真正的情感，在乱世中守护了最珍贵的东西。', type: 'neutral' },
      { id: 'exile', name: '流放天涯', description: '你选择了正义，却付出了一切。但你的心是自由的。', type: 'neutral' },
      { id: 'fallen', name: '宫廷悲歌', description: '权谋的漩涡将你吞没，成为了这场游戏的牺牲品。', type: 'bad' },
    ],
    unlockRequirement: 'cyber-detective',
    unlockDescription: '完成《赛博侦探》任意结局后解锁',
    stats: [
      { label: '圣眷', key: 'favor', color: 'oklch(0.72 0.12 75)', icon: '👑' },
      { label: '影响', key: 'influence', color: 'oklch(0.55 0.18 220)', icon: '🌟' },
      { label: '危险', key: 'danger', color: 'oklch(0.55 0.22 25)', icon: '⚠️' },
    ],
    tags: ['古风', '宫廷', '权谋', '言情'],
    order: 6,
  },
  {
    id: 'wilderness-survival',
    title: '荒野求生',
    subtitle: 'Into the Wild',
    description: '飞机迫降在无人区，特种兵退役的林峰必须带领幸存者在极端环境中求生……',
    longDescription: '一架客机在暴风雪中迫降于西伯利亚无人区。\n\n你是林峰，特种兵退役，是这架飞机上唯一有野外生存经验的人。\n\n零下三十度的严寒，有限的物资，受伤的同伴，还有未知的危险。\n\n每一个决定都关乎生死：是原地等待救援，还是主动突围？是独自行动，还是带着所有人？\n\n在这片冰封的荒野中，人性的光辉与黑暗都将被逼出来。',
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663349934754/6VehTcfU2PYaC7ZsGBko7x/cover-wilderness-survival-v2_f334b7d6.jpg',
    genre: '生存冒险',
    genreColor: 'oklch(0.55 0.18 145)',
    difficulty: 'hard',
    estimatedTime: '45-60 分钟',
    totalNodes: 30,
    endings: [
      { id: 'rescue', name: '全员生还', description: '你带领所有人走出了荒野，没有一个人落下。', type: 'good' },
      { id: 'survivor', name: '孤独幸存', description: '你活下来了，但付出了沉重的代价。', type: 'neutral' },
      { id: 'sacrifice', name: '英雄长眠', description: '你用自己的生命，换来了他人的生存。', type: 'neutral' },
      { id: 'lost', name: '消失在荒野', description: '极端的环境和错误的决定，让一切走向了最坏的结局。', type: 'bad' },
    ],
    unlockRequirement: 'palace-intrigue',
    unlockDescription: '完成《宫廷风云》任意结局后解锁',
    stats: [
      { label: '体力', key: 'stamina', color: 'oklch(0.55 0.22 25)', icon: '💪' },
      { label: '物资', key: 'supplies', color: 'oklch(0.72 0.12 75)', icon: '🎒' },
      { label: '士气', key: 'morale', color: 'oklch(0.55 0.18 220)', icon: '🔥' },
    ],
    tags: ['生存', '冒险', '极限', '团队'],
    order: 7,
  },
  {
    id: 'fantasy-healer',
    title: '治愈之光',
    subtitle: 'Light of Healing',
    description: '拥有神秘治愈能力的少女艾拉，在王国被黑暗侵蚀之际，必须用生命之力对抗黑暗……',
    longDescription: '在一个魔法与剑共存的奇幻王国，你是艾拉，一个拥有神秘治愈能力的少女。\n\n王国正遭受黑暗魔法的侵蚀，人们失去希望，骑士们一个个倒下。\n\n你的治愈之力是唯一的希望，但每次使用都会消耗你的生命。\n\n骑士卡尔守护着你，黑暗法师莫里安觊觎你的力量。\n\n在光明与黑暗的终极对决中，你将如何选择？',
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663349934754/6VehTcfU2PYaC7ZsGBko7x/cover-fantasy-healer-v2_988f41b2.jpg',
    genre: '奇幻治愈',
    genreColor: 'oklch(0.55 0.18 320)',
    difficulty: 'easy',
    estimatedTime: '30-45 分钟',
    totalNodes: 35,
    endings: [
      { id: 'light', name: '光明胜利', description: '你用治愈之力净化了黑暗，王国重获光明。', type: 'good' },
      { id: 'sacrifice', name: '最后的治愈', description: '你燃尽了自己的生命，但拯救了所有人。', type: 'neutral' },
      { id: 'dark-pact', name: '黑暗契约', description: '你选择了力量，但代价是失去了最珍贵的东西。', type: 'secret' },
      { id: 'fallen', name: '黑暗降临', description: '没有治愈之光，王国沉入了永恒的黑暗。', type: 'bad' },
    ],
    unlockRequirement: 'wilderness-survival',
    unlockDescription: '完成《荒野求生》任意结局后解锁',
    stats: [
      { label: '魔力', key: 'magic', color: 'oklch(0.55 0.18 320)', icon: '✨' },
      { label: '希望', key: 'hope', color: 'oklch(0.72 0.12 75)', icon: '🌟' },
      { label: '黑暗', key: 'darkness', color: 'oklch(0.35 0.08 290)', icon: '🌑' },
    ],
    tags: ['奇幻', '治愈', '魔法', '冒险'],
    order: 8,
  },
  {
    id: 'space-diplomat',
    title: '星际外交',
    subtitle: 'Interstellar Diplomacy',
    description: '2350年，人类与外星文明首次接触。一场误会可能引发星际战争，你是唯一能阻止灾难的人……',
    longDescription: '2350年，人类联合政府外交官陈宇，站在了历史的转折点上。\n\n外星文明Zyx族首次与人类接触，但一场意外的误解让双方剑拔弩张。\n\n军事顾问王将军主张强硬回应，而你相信对话才是出路。\n\n在太空站的谈判桌上，每一句话都可能成为战争的导火索，也可能成为和平的基石。\n\n这不只是两个文明的命运，而是整个宇宙的未来。',
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663349934754/6VehTcfU2PYaC7ZsGBko7x/cover-space-diplomat-v2_58a2c58d.jpg',
    genre: '星际科幻',
    genreColor: 'oklch(0.55 0.18 220)',
    difficulty: 'medium',
    estimatedTime: '40-55 分钟',
    totalNodes: 32,
    endings: [
      { id: 'peace', name: '星际和平', description: '你促成了人类与外星文明的历史性和平协议。', type: 'good' },
      { id: 'alliance', name: '宇宙联盟', description: '两个文明建立了超越想象的深度合作关系。', type: 'secret' },
      { id: 'stalemate', name: '冷战边缘', description: '你避免了战争，但和平依然脆弱。', type: 'neutral' },
      { id: 'war', name: '星际战争', description: '误解与偏见最终酿成了宇宙级别的灾难。', type: 'bad' },
    ],
    unlockRequirement: 'fantasy-healer',
    unlockDescription: '完成《治愈之光》任意结局后解锁',
    stats: [
      { label: '外交', key: 'diplomacy', color: 'oklch(0.55 0.18 220)', icon: '🤝' },
      { label: '军事', key: 'military', color: 'oklch(0.55 0.22 25)', icon: '⚔️' },
      { label: '和平', key: 'peace', color: 'oklch(0.72 0.12 75)', icon: '☮️' },
    ],
    tags: ['科幻', '外交', '星际', '未来'],
    order: 9,
  },
  {
    id: 'horror-hospital',
    title: '禁区病院',
    subtitle: 'Forbidden Ward',
    description: '心理医生苏明调查一家废弃精神病院，却发现自己与这里有着无法解释的联系……',
    longDescription: '心理医生苏明接到了一个奇怪的委托：调查一家废弃了二十年的精神病院。\n\n进入医院后，他发现了令人不安的事实——这里的病历记录中，有一个名字反复出现，而那个名字……是他自己。\n\n神秘病人"七号"的声音在走廊中回响，老院长似乎知道一切却守口如瓶。\n\n随着调查深入，苏明的理智开始动摇：这里发生过什么？他与这座医院究竟有什么关系？',
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663349934754/6VehTcfU2PYaC7ZsGBko7x/cover-horror-hospital-v2_cef77ded.jpg',
    genre: '心理恐怖',
    genreColor: 'oklch(0.40 0.10 290)',
    difficulty: 'hard',
    estimatedTime: '50-65 分钟',
    totalNodes: 30,
    endings: [
      { id: 'truth', name: '真相浮现', description: '你找到了所有问题的答案，虽然真相令人痛苦，但你终于自由了。', type: 'good' },
      { id: 'escape', name: '逃离阴影', description: '你逃出了医院，但那段记忆将永远跟随着你。', type: 'neutral' },
      { id: 'lost-mind', name: '理智崩塌', description: '你无法承受真相，最终成为了这座医院的一部分。', type: 'bad' },
    ],
    unlockRequirement: 'space-diplomat',
    unlockDescription: '完成《星际外交》任意结局后解锁',
    stats: [
      { label: '理智', key: 'sanity', color: 'oklch(0.55 0.18 220)', icon: '🧠' },
      { label: '真相', key: 'truth', color: 'oklch(0.72 0.12 75)', icon: '🔦' },
      { label: '恐惧', key: 'fear', color: 'oklch(0.40 0.10 290)', icon: '😱' },
    ],
    tags: ['恐怖', '心理', '悬疑', '黑暗'],
    order: 10,
  },
  {
    id: 'campus-mystery',
    title: '校园推理',
    subtitle: 'Campus Detective',
    description: '高中侦探顾晓收到神秘纸条，揭开了一场针对同学梦想的阴谋，真相比想象中更复杂……',
    longDescription: '你是顾晓，明华高中的高二学生，有一个秘密爱好——侦探推理。\n\n一张神秘纸条将你引入了一场阴谋：有人在偷偷破坏同学的竞赛报名信息，让他们错过改变命运的机会。\n\n随着调查深入，你发现幕后牵涉到的不只是一个学生，还有家长、老师，甚至学校管理层。\n\n在友情、正义和现实的压力之间，你将如何选择？',
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663349934754/6VehTcfU2PYaC7ZsGBko7x/cover-campus-mystery-v2_764d5bd7.jpg',
    genre: '校园推理',
    genreColor: 'oklch(0.55 0.18 145)',
    difficulty: 'easy',
    estimatedTime: '30-45 分钟',
    totalNodes: 49,
    endings: [
      { id: 'justice', name: '正义伸张', description: '你揭开了所有真相，让受害者得到了应有的补偿。', type: 'good' },
      { id: 'brave-truth', name: '勇者无畏', description: '在最危险的时刻，你没有退缩，真相在众人见证下大白于天下。', type: 'secret' },
      { id: 'regret', name: '遗憾告别', description: '你没能及时站出来，但真相最终还是浮出了水面。', type: 'neutral' },
    ],
    unlockRequirement: 'horror-hospital',
    unlockDescription: '完成《禁区病院》任意结局后解锁',
    stats: [
      { label: '线索', key: 'clues', color: 'oklch(0.72 0.12 75)', icon: '🔍' },
      { label: '友情', key: 'friendship', color: 'oklch(0.55 0.18 220)', icon: '👫' },
      { label: '怀疑', key: 'suspicion', color: 'oklch(0.55 0.22 25)', icon: '🤔' },
    ],
    tags: ['校园', '推理', '青春', '正义'],
    order: 11,
  },
  {
    id: 'desert-kingdom',
    title: '沙漠王国',
    subtitle: 'Desert Kingdom',
    description: '流亡三年的王子萨利姆决心夺回被篡位者占领的王国，但武力与智慧，哪个才是真正的答案？',
    longDescription: '在一片广袤的沙漠之中，曾经辉煌的萨里亚王国沦陷于篡位者之手。\n\n你是萨利姆，流亡三年的王子，终于决定归来。\n\n智慧老臣法鲁克为你出谋划策，沙漠女战士娜拉愿意为你而战。\n\n但夺回王位的路上，你必须在武力与智慧之间做出选择，在复仇与宽恕之间寻找平衡。\n\n真正的王者，不只是能征善战，更要有治国安民的胸怀。',
    coverImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663349934754/6VehTcfU2PYaC7ZsGBko7x/cover-desert-kingdom-v2_7905c602.jpg',
    genre: '异域奇幻',
    genreColor: 'oklch(0.65 0.15 55)',
    difficulty: 'medium',
    estimatedTime: '40-55 分钟',
    totalNodes: 32,
    endings: [
      { id: 'king', name: '王者归来', description: '你以智慧和勇气夺回了王位，开创了王国的新纪元。', type: 'good' },
      { id: 'peace', name: '和平之路', description: '你选择了宽恕，以和平方式结束了这场权力之争。', type: 'neutral' },
      { id: 'legend', name: '沙漠传说', description: '你成为了沙漠中的传奇，虽然没有王位，却赢得了人心。', type: 'neutral' },
      { id: 'fallen', name: '王朝覆灭', description: '鲁莽的行动让一切走向了最坏的结局。', type: 'bad' },
    ],
    unlockRequirement: 'campus-mystery',
    unlockDescription: '完成《校园推理》任意结局后解锁',
    stats: [
      { label: '军队', key: 'army', color: 'oklch(0.55 0.22 25)', icon: '⚔️' },
      { label: '民心', key: 'people', color: 'oklch(0.55 0.18 220)', icon: '❤️' },
      { label: '荣誉', key: 'honor', color: 'oklch(0.72 0.12 75)', icon: '👑' },
    ],
    tags: ['奇幻', '王权', '沙漠', '冒险'],
    order: 12,
  },
];

export const GAMES: GameData[] = BASE_GAMES.map(game => ({
  ...game,
  totalNodes: getStoryNodes(game.id).length || game.totalNodes,
  endings: deriveStoryEndings(game.id, game.endings),
}));

export function getGameById(id: string): GameData | undefined {
  return GAMES.find(g => g.id === id);
}

export function getDifficultyLabel(difficulty: GameData['difficulty']): string {
  const map = { easy: '入门', medium: '普通', hard: '困难' };
  return map[difficulty];
}

export function getDifficultyColor(difficulty: GameData['difficulty']): string {
  const map = {
    easy: 'oklch(0.60 0.15 145)',
    medium: 'oklch(0.72 0.12 75)',
    hard: 'oklch(0.55 0.22 25)',
  };
  return map[difficulty];
}
