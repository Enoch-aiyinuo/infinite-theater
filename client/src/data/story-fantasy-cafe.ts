import type { StoryNode, StoryChoice } from './story-types';
export const INITIAL_STATS = { magic: 0, memory: 100, bond: 30 };

export const STORY_DATA: StoryNode[] = [
  // Node 1: Introduction
  {
    id: 1,
    scene: "神秘小巷",
    speaker: "narrator",
    text: "在一个寻常的午后，你——叶晨，一个普通的大学生，正为毕业论文焦头烂额。你决定出门散散心，却不经意间拐进了一条从未见过的小巷。巷子深处，一扇古朴的木门静静矗立，门上没有招牌，只有一盏昏黄的灯笼摇曳。好奇心驱使你推开了那扇门，一股混合着咖啡香、旧书味和某种难以言喻的魔幻气息扑面而来。你发现自己置身于一个风格独特的咖啡馆，这里的一切都显得那么不真实，仿佛时间在这里凝固。几个形态各异的客人坐在角落里，低声交谈，他们的存在本身就充满了故事。一位风姿绰约的女子，看起来三十岁左右，正擦拭着吧台，她抬起头，对你露出了一个意味深长的微笑。",
    choices: [
      {
        label: "询问这里是哪里",
        text: "你小心翼翼地开口，声音带着一丝不确定。",
        next: 2,
        delta: { bond: 5 },
      },
      {
        label: "环顾四周，保持沉默",
        text: "你选择先观察，试图理解这个地方的诡异之处。",
        next: 3,
        delta: { memory: 5 },
      },
      {
        label: "转身离开",
        text: "直觉告诉你这里不寻常，你决定迅速撤离。",
        next: 4,
        delta: { magic: -5 },
      },
    ],
  },
  // Node 2: Inquire about the place
  {
    id: 2,
    scene: "咖啡馆吧台",
    speaker: "protagonist",
    text: "“请问……这里是哪里？”你问道。老板娘放下手中的抹布，轻笑一声，她的声音如同风铃般清脆，却又带着一丝古老的韵味。\"这里是‘命运咖啡馆’，年轻人。每一位误入此地的客人，都带着未解的谜团或未尽的愿望。你，也不例外。\"她指了指菜单，上面写着一些闻所未闻的咖啡种类，比如‘遗忘之露’、‘预言之眼’、‘羁绊之链’。你感到一阵眩晕，这已经超出了你的认知范围。",
    choices: [
      {
        label: "点一杯‘遗忘之露’",
        text: "你感到困惑，希望能忘掉这一切。",
        next: 5,
        delta: { memory: -10, magic: 5 },
      },
      {
        label: "点一杯‘羁绊之链’",
        text: "你对这里产生了兴趣，想与这里建立联系。",
        next: 6,
        delta: { bond: 10, magic: 5 },
      },
      {
        label: "拒绝点单，要求解释",
        text: "你觉得这太荒谬了，要求老板娘给出合理的解释。",
        next: 7,
        delta: { bond: -5 },
      },
    ],
  },
  // Node 3: Observe silently
  {
    id: 3,
    scene: "咖啡馆角落",
    speaker: "narrator",
    text: "你选择沉默，目光扫过咖啡馆的每一个角落。墙上挂着古老的钟表，指针却纹丝不动；书架上摆满了你从未见过的语言写成的书籍；空气中弥漫着奇异的香气，让你感到既陌生又熟悉。一位坐在窗边的神秘常客，戴着兜帽，似乎察觉到了你的目光，他轻轻抬起头，露出一双深邃的眼睛，其中仿佛蕴含着无尽的故事。老板娘走到你面前，微笑着递给你一张菜单。\"看来你是个观察者。不过，观察也需要付出代价。\"",
    choices: [
      {
        label: "向神秘常客寻求帮助",
        text: "你觉得他可能知道些什么。",
        next: 8,
        delta: { bond: 5 },
      },
      {
        label: "接受菜单，假装镇定",
        text: "你决定顺其自然，看看会发生什么。",
        next: 2,
        delta: { memory: 5 },
      },
      {
        label: "试图逃跑",
        text: "你感到不安，想找机会溜走。",
        next: 4,
        delta: { magic: -10 },
      },
    ],
  },
  // Node 4: Try to leave (Bad Ending path)
  {
    id: 4,
    scene: "咖啡馆门口",
    speaker: "narrator",
    text: "你转身冲向门口，试图逃离这个诡异的地方。然而，当你触碰到门把手时，一股无形的力量将你弹开。你感到一阵剧烈的头痛，眼前的景象开始模糊。老板娘的声音在你耳边响起，带着一丝惋惜：\"不是每个人都能轻易离开的，年轻人。你忘记了，你为何而来。\"你的记忆如同潮水般退去，关于咖啡馆的一切，关于你自己的身份，都变得模糊不清。你最终成功离开了小巷，回到了熟悉的街道，但你已经不记得自己是谁，为何会出现在这里。你的过去，你的未来，都成了一片空白。",
    end: true,
    endType: "bad",
    endingId: "lost-memory",
  },
  // Node 5: Drink 'Elixir of Oblivion' (Neutral Ending path)
  {
    id: 5,
    scene: "咖啡馆吧台",
    speaker: "protagonist",
    text: "你接过老板娘递来的‘遗忘之露’，那是一杯散发着淡淡蓝色光芒的液体。你犹豫片刻，最终一饮而尽。一股清凉的感觉从喉咙直达大脑，你感到前所未有的轻松，所有的烦恼和困惑都烟消云散。你忘记了自己为何来到这里，忘记了咖啡馆的奇异之处，甚至忘记了自己曾经的烦恼。你只记得，这里有一杯好喝的咖啡。你带着一种平静而空洞的心情离开了咖啡馆，回到了你的世界。你不再为论文焦虑，也不再对未来迷茫，因为你已经忘记了这些。你的人生变得平淡无奇，没有任何波澜，仿佛从未踏足过那个充满魔幻的异世界。",
    end: true,
    endType: "neutral",
    endingId: "memory-gone",
  },
  // Node 6: Drink 'Chain of Bonds' (Good/Secret Ending path)
  {
    id: 6,
    scene: "咖啡馆吧台",
    speaker: "protagonist",
    text: "你选择了‘羁绊之链’。老板娘微笑着为你调制，咖啡杯中升腾起淡淡的金色雾气。你喝下这杯咖啡，一股暖流涌遍全身，你感到自己与这个咖啡馆，与这里的一切，都建立了一种奇妙的联系。你不再感到恐惧，反而生出一种归属感。老板娘看着你，眼中闪烁着赞许的光芒。\"看来你做出了一个不错的选择。你感受到了吗？这里，就是你的归宿。\"",
    choices: [
      {
        label: "询问咖啡馆的秘密",
        text: "你对这里的一切充满了好奇。",
        next: 9,
        delta: { magic: 10, memory: 5 },
      },
      {
        label: "提出留在咖啡馆",
        text: "你被这里吸引，想成为其中一员。",
        next: 10,
        delta: { bond: 15, memory: -5 },
      },
      {
        label: "向老板娘学习魔法",
        text: "你感受到了魔力，想掌握它。",
        next: 11,
        delta: { magic: 15, bond: 5 },
      },
    ],
  },
  // Node 7: Refuse to order, demand explanation
  {
    id: 7,
    scene: "咖啡馆吧台",
    speaker: "protagonist",
    text: "“这太荒谬了！你必须给我一个合理的解释！”你提高了声音，引来了其他客人异样的目光。老板娘的笑容渐渐收敛，她的眼神变得深邃而古老，仿佛能看透你的灵魂。\"年轻人，有些事情，不是用言语就能解释清楚的。你所看到的，所感受到的，就是真相的一部分。你选择相信，或者选择逃避。\"她的话语中带着不容置疑的威严，让你感到一阵寒意。",
    choices: [
      {
        label: "再次尝试离开",
        text: "你感到害怕，只想尽快逃离。",
        next: 4,
        delta: { magic: -10, bond: -5 },
      },
      {
        label: "妥协，点一杯普通咖啡",
        text: "你决定暂时顺从，观察情况。",
        next: 12,
        delta: { bond: 5 },
      },
      {
        label: "向神秘常客求助",
        text: "你觉得他可能能帮你。",
        next: 8,
        delta: { bond: 10 },
      },
    ],
  },
  // Node 8: Seek help from mysterious regular
  {
    id: 8,
    scene: "咖啡馆角落",
    speaker: "protagonist",
    text: "你走向那位戴着兜帽的神秘常客，轻声问道：\"先生，您知道这里是怎么回事吗？\"他抬起头，那双深邃的眼睛让你感到一阵莫名的熟悉。他没有说话，只是轻轻推过一杯冒着热气的咖啡，咖啡上漂浮着一片翠绿的叶子。\"喝下它，你就会明白。\"他的声音低沉而富有磁性，仿佛带着某种蛊惑人心的力量。你感到一阵犹豫，这杯咖啡看起来与众不同。",
    choices: [
      {
        label: "喝下神秘咖啡",
        text: "你决定相信他，一饮而尽。",
        next: 13,
        delta: { magic: 10, memory: 10 },
      },
      {
        label: "拒绝，继续询问",
        text: "你觉得这太冒险了，想得到更多信息。",
        next: 14,
        delta: { bond: -5 },
      },
      {
        label: "回到吧台，向老板娘求助",
        text: "你觉得还是老板娘更可靠。",
        next: 7,
        delta: { bond: 5 },
      },
    ],
  },
  // Node 9: Inquire about cafe's secrets
  {
    id: 9,
    scene: "咖啡馆吧台",
    speaker: "protagonist",
    text: "“老板娘，这个咖啡馆到底有什么秘密？”你好奇地问道。老板娘的笑容更加神秘了。\"秘密？年轻人，这个世界本身就是一个巨大的秘密。而这里，只是秘密的入口。每一杯咖啡，都承载着一段命运，一个故事。你所看到的，所经历的，都将成为你记忆的一部分，塑造你的未来。\"她的话语充满了哲理，让你对这个地方的兴趣愈发浓厚。",
    choices: [
      {
        label: "深入了解咖啡的魔力",
        text: "你对咖啡能改变命运的能力感到惊奇。",
        next: 15,
        delta: { magic: 10 },
      },
      {
        label: "询问老板娘的身份",
        text: "你觉得老板娘的身份很不一般。",
        next: 16,
        delta: { bond: 5 },
      },
      {
        label: "尝试自己调制咖啡",
        text: "你跃跃欲试，想亲手体验。",
        next: 17,
        delta: { magic: 5, memory: 5 },
      },
    ],
  },
  // Node 10: Stay in the cafe (Good Ending path)
  {
    id: 10,
    scene: "咖啡馆吧台",
    speaker: "protagonist",
    text: "“我……我想留在这里。”你坚定地说道。老板娘的眼中闪过一丝欣慰。\"欢迎你，叶晨。从今以后，你就是这里的一员了。你将见证无数命运的交织，也将成为命运的编织者。\"你感到一种前所未有的平静和满足。你留在了这个异世界的咖啡馆，与老板娘和神秘常客一起，为那些误入此地的灵魂提供指引。你的生活充满了奇遇和挑战，但你从未感到如此充实。你找到了真正的归属，成为了命运咖啡馆的守护者。",
    end: true,
    endType: "good",
    endingId: "stay-in-cafe",
  },
  // Node 11: Learn magic from the proprietress
  {
    id: 11,
    scene: "咖啡馆后厨",
    speaker: "protagonist",
    text: "“老板娘，我想向您学习魔法！”你充满期待地说道。老板娘挑了挑眉，眼中带着一丝玩味。\"哦？年轻人，你很有胆量。魔法可不是儿戏，它需要天赋，更需要毅力。你确定要踏上这条充满未知与危险的道路吗？\"她的话语中带着一丝警告，但你心中的渴望却更加强烈。你感受到了体内涌动的魔力，你知道这是你的机会。",
    choices: [
      {
        label: "坚定地表示决心",
        text: "你毫不犹豫地表达了你的决心。",
        next: 18,
        delta: { magic: 10, bond: 5 },
      },
      {
        label: "询问学习的风险",
        text: "你希望了解更多潜在的危险。",
        next: 19,
        delta: { memory: 5 },
      },
      {
        label: "暂时放弃，选择其他",
        text: "你觉得风险太大，决定先观望。",
        next: 9,
        delta: { magic: -5 },
      },
    ],
  },
  // Node 12: Compromise, order regular coffee
  {
    id: 12,
    scene: "咖啡馆吧台",
    speaker: "protagonist",
    text: "“好吧……那就来一杯普通的咖啡吧。”你无奈地说道。老板娘的嘴角勾起一抹不易察觉的微笑。\"这里可没有‘普通’的咖啡，年轻人。每一杯，都有它独特的味道和故事。\"她递给你一杯散发着淡淡花香的咖啡，你喝下后，感到一股暖意流遍全身，疲惫一扫而空。你发现自己对周围的一切不再那么排斥，甚至开始感到一丝好奇。",
    choices: [
      {
        label: "向老板娘道歉",
        text: "你为之前的无礼感到抱歉。",
        next: 9,
        delta: { bond: 10 },
      },
      {
        label: "再次观察神秘常客",
        text: "你觉得他身上有更多秘密。",
        next: 8,
        delta: { memory: 5 },
      },
      {
        label: "尝试与老板娘闲聊",
        text: "你希望能从她口中套出更多信息。",
        next: 16,
        delta: { bond: 5 },
      },
    ],
  },
  // Node 13: Drink mysterious coffee
  {
    id: 13,
    scene: "咖啡馆角落",
    speaker: "protagonist",
    text: "你接过神秘常客递来的咖啡，毫不犹豫地喝了下去。咖啡入口微苦，随后涌上一股清甜，你的脑海中瞬间闪过无数画面，那些画面陌生而又熟悉，仿佛是你前世的记忆，又仿佛是未来的预兆。你感到自己的精神力得到了极大的提升，对周围的魔力波动也变得更加敏感。神秘常客看着你，眼中带着一丝赞许。\"你看到了什么？年轻人。\"",
    choices: [
      {
        label: "描述你看到的画面",
        text: "你试图将脑海中的画面描述出来。",
        next: 20,
        delta: { memory: 10, magic: 5 },
      },
      {
        label: "询问他的身份",
        text: "你觉得他知道很多秘密。",
        next: 21,
        delta: { bond: 5 },
      },
      {
        label: "感谢他的帮助",
        text: "你感谢他为你指引方向。",
        next: 9,
        delta: { bond: 5 },
      },
    ],
  },
  // Node 14: Refuse to drink, continue asking
  {
    id: 14,
    scene: "咖啡馆角落",
    speaker: "protagonist",
    text: "“我不能随便喝来历不明的东西，请您告诉我这里到底是怎么回事。”你坚持道。神秘常客轻轻叹了口气，他的声音带着一丝无奈。\"有些真相，只有亲身体验才能领悟。你若不愿踏出那一步，便永远无法触及核心。\"他不再多言，只是静静地看着你，让你感到一阵无形的压力。",
    choices: [
      {
        label: "再次尝试离开",
        text: "你感到被拒绝，决定再次尝试离开。",
        next: 4,
        delta: { magic: -10, bond: -5 },
      },
      {
        label: "回到吧台，向老板娘求助",
        text: "你觉得还是老板娘更可靠。",
        next: 7,
        delta: { bond: 5 },
      },
      {
        label: "妥协，喝下咖啡",
        text: "你最终还是决定冒险一试。",
        next: 13,
        delta: { magic: 10, memory: 10 },
      },
    ],
  },
  // Node 15: Learn about coffee magic
  {
    id: 15,
    scene: "咖啡馆吧台",
    speaker: "narrator",
    text: "老板娘向你详细解释了咖啡的魔力来源。原来，每一颗咖啡豆都吸收了天地间的灵气，经过特殊烘焙和调制，便能与饮用者的灵魂产生共鸣，从而影响其命运。她还提到，咖啡的魔力并非万能，它只是一个引子，最终的走向仍取决于饮用者的选择和内心。你听得如痴如醉，对这个世界的认知被彻底颠覆。",
    choices: [
      {
        label: "尝试调制‘预言之眼’",
        text: "你对预知未来充满了兴趣。",
        next: 22,
        delta: { magic: 10, memory: 5 },
      },
      {
        label: "询问如何控制魔力",
        text: "你希望掌握这种力量。",
        next: 18,
        delta: { magic: 10 },
      },
      {
        label: "继续留在咖啡馆学习",
        text: "你决定长期留在这里深造。",
        next: 10,
        delta: { bond: 10, memory: 5 },
      },
    ],
  },
  // Node 16: Inquire about proprietress's identity
  {
    id: 16,
    scene: "咖啡馆吧台",
    speaker: "protagonist",
    text: "“老板娘，您到底是谁？您看起来不像是普通人。”你直接问道。老板娘的笑容更加深邃了，她轻轻叹了口气。\"我？我只是一个看守者，看守着这扇连接不同世界的门，看守着那些被命运指引而来的灵魂。我的名字已经不重要了，重要的是，你在这里看到了什么，又将选择什么。\"她的回答模棱两可，却让你感到她身上背负着沉重的历史。",
    choices: [
      {
        label: "追问她的过去",
        text: "你对她的故事充满了好奇。",
        next: 19,
        delta: { memory: 5 },
      },
      {
        label: "表示愿意帮助她",
        text: "你对她产生了同情和敬意。",
        next: 10,
        delta: { bond: 10 },
      },
      {
        label: "询问神秘常客的身份",
        text: "你觉得他们之间有联系。",
        next: 21,
        delta: { bond: 5 },
      },
    ],
  },
  // Node 17: Try to brew coffee yourself
  {
    id: 17,
    scene: "咖啡馆后厨",
    speaker: "protagonist",
    text: "“我能自己试试调制咖啡吗？”你跃跃欲试地问道。老板娘微笑着点点头。\"当然可以。不过，调制命运的咖啡，可不是简单的技艺。它需要你用心去感受，用灵魂去连接。\"她递给你一些奇异的咖啡豆和香料，你小心翼翼地开始尝试。你感到一股股魔力在指尖流淌，咖啡豆仿佛有了生命。",
    choices: [
      {
        label: "成功调制出咖啡",
        text: "你凭借直觉和天赋，成功调制出了一杯散发着微光的咖啡。",
        next: 23,
        delta: { magic: 15, memory: 10 },
      },
      {
        label: "调制失败，咖啡变质",
        text: "你缺乏经验，调制出的咖啡散发着不详的气息。",
        next: 24,
        delta: { magic: -10 },
      },
      {
        label: "向老板娘请教",
        text: "你遇到困难，向老板娘寻求指导。",
        next: 18,
        delta: { bond: 5 },
      },
    ],
  },
  // Node 18: Learn magic (path to Secret Ending)
  {
    id: 18,
    scene: "咖啡馆后厨",
    speaker: "narrator",
    text: "老板娘开始传授你关于魔力的知识和控制方法。她教你如何感受空气中游离的元素，如何将它们引导至咖啡中，如何通过意念改变咖啡的属性。你发现自己拥有惊人的魔法天赋，进步神速。在她的指导下，你逐渐掌握了调制各种命运咖啡的技巧，甚至能够创造出全新的咖啡种类。你的魔力日益增长，记忆也变得更加清晰，你开始理解这个世界的运作方式。",
    choices: [
      {
        label: "继续深入学习",
        text: "你渴望掌握更强大的魔法。",
        next: 25,
        delta: { magic: 15, memory: 10 },
      },
      {
        label: "尝试帮助其他客人",
        text: "你希望用你的能力帮助他人。",
        next: 10,
        delta: { bond: 10 },
      },
      {
        label: "询问老板娘是否需要助手",
        text: "你希望成为老板娘的得力助手。",
        next: 26,
        delta: { bond: 10 },
      },
    ],
  },
  // Node 19: Inquire about risks/proprietress's past
  {
    id: 19,
    scene: "咖啡馆吧台",
    speaker: "narrator",
    text: "老板娘的眼神变得有些复杂。她告诉你，魔法的力量伴随着巨大的风险，稍有不慎便可能迷失自我，甚至付出生命的代价。她还透露了一些关于她自己过去的片段，她曾是某个古老文明的守护者，因为一次意外被困于此，成为了咖啡馆的看守者。她的故事让你感到震撼，也让你对力量有了更深的敬畏。",
    choices: [
      {
        label: "决定谨慎学习魔法",
        text: "你决定在学习魔法时更加小心。",
        next: 18,
        delta: { magic: 5, memory: 5 },
      },
      {
        label: "放弃学习魔法，选择留下",
        text: "你觉得风险太大，只想安稳地留在咖啡馆。",
        next: 10,
        delta: { bond: 10 },
      },
      {
        label: "寻求神秘常客的建议",
        text: "你觉得他可能能提供不同的视角。",
        next: 21,
        delta: { bond: 5 },
      },
    ],
  },
  // Node 20: Describe visions
  {
    id: 20,
    scene: "咖啡馆角落",
    speaker: "protagonist",
    text: "你努力将脑海中闪过的画面描述给神秘常客。你看到了古老的符文，神秘的仪式，以及一个模糊的身影，似乎与咖啡馆的起源有关。神秘常客静静地听着，不时点头。\"看来你看到了‘命运的碎片’。你的记忆正在被唤醒，你的魔力也在觉醒。\"他递给你一本古老的羊皮卷，上面记载着一些你从未见过的魔法咒语。",
    choices: [
      {
        label: "学习羊皮卷上的咒语",
        text: "你迫不及待地开始学习。",
        next: 18,
        delta: { magic: 15, memory: 10 },
      },
      {
        label: "询问羊皮卷的来历",
        text: "你对这本古老的书籍充满了好奇。",
        next: 21,
        delta: { memory: 5 },
      },
      {
        label: "向老板娘展示羊皮卷",
        text: "你觉得老板娘可能会知道更多。",
        next: 9,
        delta: { bond: 5 },
      },
    ],
  },
  // Node 21: Inquire about mysterious regular's identity
  {
    id: 21,
    scene: "咖啡馆角落",
    speaker: "protagonist",
    text: "“您到底是谁？您似乎知道很多。”你问道。神秘常客的目光变得悠远，他轻声说道：\"我曾是这片土地的守护者，见证了无数文明的兴衰。我的名字早已被时间遗忘，但我的使命从未改变。我在这里等待着，等待着那些能够理解命运，并有能力改变命运的人。\"他的话语让你感到一种沉重的历史感，你意识到他可能比老板娘更加古老。",
    choices: [
      {
        label: "询问他的使命",
        text: "你对他的使命感到好奇。",
        next: 25,
        delta: { memory: 10, bond: 5 },
      },
      {
        label: "表示愿意协助他",
        text: "你希望能够帮助他完成使命。",
        next: 26,
        delta: { bond: 10 },
      },
      {
        label: "回到老板娘身边",
        text: "你觉得老板娘更值得信任。",
        next: 9,
        delta: { bond: 5 },
      },
    ],
  },
  // Node 22: Brew 'Eye of Prophecy'
  {
    id: 22,
    scene: "咖啡馆后厨",
    speaker: "narrator",
    text: "在老板娘的指导下，你成功调制出了一杯‘预言之眼’。咖啡表面泛着一层淡淡的银光，你喝下后，脑海中浮现出一些模糊的未来片段。你看到了自己站在咖啡馆的吧台后，熟练地调制着咖啡，也看到了外面世界的一些重大变故。这些预言让你感到既兴奋又不安，你意识到自己肩负的责任越来越重。",
    choices: [
      {
        label: "尝试改变预言",
        text: "你希望能够改变那些不好的未来。",
        next: 25,
        delta: { magic: 10, bond: 5 },
      },
      {
        label: "记录下预言",
        text: "你决定将这些预言记录下来，以备不时之需。",
        next: 10,
        delta: { memory: 10 },
      },
      {
        label: "向老板娘请教如何应对",
        text: "你希望得到老板娘的指引。",
        next: 19,
        delta: { bond: 5 },
      },
    ],
  },
  // Node 23: Successfully brew coffee
  {
    id: 23,
    scene: "咖啡馆后厨",
    speaker: "narrator",
    text: "你成功调制出了一杯散发着微光的咖啡，老板娘赞许地看着你。\"不错，年轻人，你很有天赋。这杯咖啡，蕴含着你自己的魔力。它能让你更好地理解这个世界，也能让你更好地掌控自己的命运。\"你喝下自己调制的咖啡，感到一股强大的力量在体内涌动，你的魔力属性得到了显著提升。",
    choices: [
      {
        label: "继续学习调制更复杂的咖啡",
        text: "你对自己的能力充满信心，想挑战更高难度。",
        next: 25,
        delta: { magic: 10, memory: 5 },
      },
      {
        label: "向老板娘请教更多魔法知识",
        text: "你希望系统地学习魔法。",
        next: 18,
        delta: { magic: 10, bond: 5 },
      },
      {
        label: "向神秘常客请教",
        text: "你觉得神秘常客可能知道一些不为人知的秘术。",
        next: 21,
        delta: { bond: 5 },
      },
    ],
  },
  // Node 24: Failed to brew coffee
  {
    id: 24,
    scene: "咖啡馆后厨",
    speaker: "narrator",
    text: "你调制出的咖啡散发着一股不详的气息，老板娘皱了皱眉。\"看来你还需要更多的练习，年轻人。魔力并非儿戏，它需要敬畏和专注。\"你感到一阵沮丧，但同时也意识到魔法的复杂和危险。",
    choices: [
      {
        label: "再次尝试调制",
        text: "你不甘心失败，决定再次尝试。",
        next: 17,
        delta: { magic: -5 },
      },
      {
        label: "向老板娘请教",
        text: "你虚心向老板娘请教。",
        next: 18,
        delta: { bond: 5 },
      },
      {
        label: "暂时放弃，回到吧台",
        text: "你决定先休息一下，再做打算。",
        next: 9,
        delta: { bond: 5 },
      },
    ],
  },
  // Node 25: Master magic (Secret Ending path)
  {
    id: 25,
    scene: "咖啡馆深处",
    speaker: "narrator",
    text: "经过长时间的学习和实践，你不仅掌握了咖啡馆的所有魔法知识，甚至还开创了属于自己的魔法流派。你的魔力达到了前所未有的高度，记忆也变得完整而清晰。你发现自己与咖啡馆的联系已经超越了客人和学徒，你成为了这里不可或缺的一部分。老板娘和神秘常客都对你刮目相看，他们开始将咖啡馆的重任逐渐交托给你。你感到自己已经完全融入了这个异世界，成为了命运的真正主宰。",
    choices: [
      {
        label: "接受咖啡馆的传承",
        text: "你决定接过老板娘的衣钵，成为新的咖啡馆老板。",
        next: 27,
        delta: { magic: 15, bond: 15 },
      },
      {
        label: "选择离开，带着记忆",
        text: "你决定带着一身魔力和记忆，回到自己的世界。",
        next: 28,
        delta: { memory: 15, magic: 10 },
      },
      {
        label: "与老板娘和神秘常客共同守护",
        text: "你选择与他们一起，共同守护咖啡馆。",
        next: 10,
        delta: { bond: 15 },
      },
    ],
  },
  // Node 26: Become assistant (path to Secret Ending)
  {
    id: 26,
    scene: "咖啡馆吧台",
    speaker: "protagonist",
    text: "“老板娘，我希望能成为您的助手，共同守护这里。”你真诚地说道。老板娘的眼中闪过一丝复杂的情绪，她看了看神秘常客，对方微微点头。\"既然你心意已决，那便留下吧。不过，成为我的助手，意味着你将承担更多的责任，也将面对更多的挑战。你准备好了吗？\"你毫不犹豫地表示了决心。你成为了咖啡馆的正式一员，协助老板娘处理日常事务，学习魔法知识，并逐渐接触到咖啡馆更深层的秘密。你的生活充满了未知，但你感到前所未有的充实。",
    choices: [
      {
        label: "努力学习，争取成为老板",
        text: "你希望有朝一日能接替老板娘的位置。",
        next: 27,
        delta: { magic: 10, memory: 10, bond: 10 },
      },
      {
        label: "满足于助手身份，享受生活",
        text: "你喜欢现在的生活，不想承担更多责任。",
        next: 10,
        delta: { bond: 10 },
      },
      {
        label: "向神秘常客请教更多",
        text: "你觉得神秘常客能给你更多指引。",
        next: 25,
        delta: { magic: 5, memory: 5 },
      },
    ],
  },
  // Node 27: Become the owner (Secret Ending)
  {
    id: 27,
    scene: "咖啡馆吧台",
    speaker: "narrator",
    text: "岁月流转，你最终从老板娘手中接过了‘命运咖啡馆’的钥匙。你成为了新的咖啡馆老板，肩负起守护这扇连接异世界之门的重任。你熟练地调制着各种命运咖啡，为每一位误入此地的客人指引方向。你的名字在异世界中流传，成为了传说。你的人生达到了巅峰，成为了真正的命运编织者。",
    end: true,
    endType: "secret",
    endingId: "become-owner",
  },
  // Node 28: Leave with memories (Neutral Ending)
  {
    id: 28,
    scene: "神秘小巷",
    speaker: "narrator",
    text: "你最终选择了离开，带着在异世界咖啡馆获得的所有记忆和魔力，回到了你原本的世界。你不再是那个普通的大学生，你的眼中充满了智慧和对世界的深刻理解。你用学到的魔法知识，悄悄地改变着身边的一切，让世界变得更加美好。你的人生充满了传奇色彩，但你始终保持着低调，成为了一个隐藏在人群中的守护者。",
    end: true,
    endType: "neutral",
    endingId: "leave-with-memories",
  },
];