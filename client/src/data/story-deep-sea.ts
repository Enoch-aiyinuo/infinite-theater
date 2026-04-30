import type { StoryNode, StoryChoice } from './story-types';

export const DEEP_SEA_STORY: StoryNode[] = [
  {
    id: 1,
    scene: '深海基地',
    sceneEn: 'Deep Sea Base',
    text: '黑暗先醒来，你是后一个。\n\n当意识重新拼起来时，你正仰躺在冰冷的金属地板上，耳边只有断断续续的警报声，像某种濒死生物还在努力呼吸。空气里混着海水、机油和烧焦线路的味道。\n\n应急灯每闪一次，你都能看见舱壁上的裂痕更长一点，像整座研究站正在被看不见的深海巨口慢慢咬碎。\n\n你是谁？你为什么会在这里？\n\n记忆碎片带着剧痛回流：你是海洋研究员陈深，三天前，深海研究站"海渊一号"在四千米海底突然失联，而现在，某种东西还在这片黑暗里和你一起活着。',
    choices: [
      { label: 'A', text: '起身查看周围环境，寻找出口', next: 2, delta: { oxygen: -5, sanity: 0, power: 0 } },
      { label: 'B', text: '先在原地休息，等待视线清晰', next: 3, delta: { oxygen: -3, sanity: 5, power: 0 } },
      { label: 'C', text: '尝试激活附近的控制面板', next: 4, delta: { oxygen: -5, sanity: 0, power: 10 } },
    ],
  },
  {
    id: 2,
    text: '你挣扎着站起来，头部传来一阵剧烈的疼痛。\n\n环顾四周，你发现自己在研究站的B区走廊。走廊的一端已经被坍塌的舱壁堵死，另一端的防水门虽然关闭，但指示灯还亮着。\n\n地板上有几道血迹，延伸向防水门的方向。\n\n你的氧气面罩还戴着，但储量显示只剩下60%。',
    choices: [
      { label: 'A', text: '顺着血迹走向防水门', next: 5, delta: { oxygen: -5, sanity: -5, power: 0 } },
      { label: 'B', text: '检查坍塌的舱壁，看是否有缝隙', next: 6, delta: { oxygen: -5, sanity: 0, power: 0 } },
      { label: 'C', text: '寻找紧急通讯设备', next: 7, delta: { oxygen: -5, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 3,
    text: '你深呼吸，让自己平静下来。\n\n随着视线逐渐清晰，你开始整理记忆：事故发生在凌晨，你当时在实验室。一声巨响，然后是黑暗。\n\n你的手腕上有一道划伤，已经结痂。说明你至少昏迷了几个小时。\n\n氧气面罩的储量显示：62%。研究站的生命维持系统似乎还在运作，但不知道能维持多久。',
    choices: [
      { label: 'A', text: '起身探索走廊', next: 2, delta: { oxygen: -3, sanity: 0, power: 0 } },
      { label: 'B', text: '检查自己的装备和随身物品', next: 8, delta: { oxygen: -2, sanity: 5, power: 0 } },
      { label: 'C', text: '尝试回忆事故发生前的细节', next: 9, delta: { oxygen: -2, sanity: -3, power: 0 } },
    ],
  },
  {
    id: 4,
    text: '你爬向最近的控制面板，按下了紧急启动按钮。\n\n面板发出一声嗡鸣，屏幕缓缓亮起。\n\n系统状态显示：主电源故障，备用电源剩余23%。生命维持系统：运行中（降级模式）。通讯系统：离线。\n\n但你发现了一条重要信息：B区有两名生命体征信号——其中一个就是你，另一个在B-7舱室。',
    choices: [
      { label: 'A', text: '立即前往B-7舱室', next: 10, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'B', text: '先尝试修复通讯系统', next: 11, delta: { oxygen: -5, sanity: 0, power: -5 } },
      { label: 'C', text: '查看研究站的整体损伤情况', next: 12, delta: { oxygen: -3, sanity: 0, power: -3 } },
    ],
  },
  {
    id: 5,
    text: '你顺着血迹走向防水门。\n\n门旁边的控制面板显示：门后有气压。你按下开门按钮，防水门缓缓打开。\n\n门后是一个小型储藏室。一个人蜷缩在角落里——是你的同事，工程师林海。\n\n他的腿部有明显的骨折，但意识清醒。"陈深……你还活着……"他虚弱地说。',
    choices: [
      { label: 'A', text: '立即为他处理伤口', next: 13, delta: { oxygen: -5, sanity: 10, power: 0 } },
      { label: 'B', text: '询问他事故的情况', next: 14, delta: { oxygen: -3, sanity: 5, power: 0 } },
      { label: 'C', text: '先检查储藏室的物资', next: 15, delta: { oxygen: -3, sanity: 0, power: 5 } },
    ],
  },
  {
    id: 6,
    text: '你检查了坍塌的舱壁。\n\n缝隙很小，无法通过，但你发现了一些有用的东西：一个急救包，还有一根折断的金属管。\n\n更重要的是，你看到了缝隙另一边的情况——那边是研究站的核心区域，但水已经漫到了膝盖高度。\n\n核心区域在进水。',
    choices: [
      { label: 'A', text: '拿走急救包和金属管，继续探索', next: 2, delta: { oxygen: -3, sanity: -5, power: 0 } },
      { label: 'B', text: '尝试扩大缝隙，进入核心区域', next: 16, delta: { oxygen: -8, sanity: -5, power: 0 } },
      { label: 'C', text: '立即寻找其他路线，避开进水区域', next: 7, delta: { oxygen: -5, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 7,
    text: '你在走廊里搜寻，终于在一个紧急箱里找到了一台手持通讯器。\n\n你按下启动按钮，通讯器发出嘈杂的噪音，然后传来一个微弱的声音：\n\n"……任何人……这里是海面救援队……海渊一号……请回应……"\n\n信号很弱，但他们在找你！',
    choices: [
      { label: 'A', text: '立即回应，告知你的位置', next: 17, delta: { oxygen: -3, sanity: 15, power: 0 } },
      { label: 'B', text: '先收集更多信息，再回应', next: 18, delta: { oxygen: -3, sanity: 5, power: 0 } },
      { label: 'C', text: '尝试增强信号', next: 19, delta: { oxygen: -5, sanity: 10, power: -5 } },
    ],
  },
  {
    id: 8,
    text: '你检查了自己的装备。\n\n除了氧气面罩（62%），你还有：一个防水手电筒（电量充足）、一把折叠刀、以及研究站的通用访问卡。\n\n你的研究笔记本也在口袋里，防水的。翻开最后几页，你看到了事故前的记录：\n\n"异常声波信号，深度3000米以下。频率与已知地质活动不符。建议立即上报……"',
    choices: [
      { label: 'A', text: '继续读笔记，了解更多', next: 20, delta: { oxygen: -3, sanity: -5, power: 0 } },
      { label: 'B', text: '收起笔记，开始探索', next: 2, delta: { oxygen: -2, sanity: 0, power: 0 } },
      { label: 'C', text: '用访问卡尝试激活附近的设备', next: 4, delta: { oxygen: -3, sanity: 0, power: 5 } },
    ],
  },
  {
    id: 9,
    text: '你努力回忆事故前的细节。\n\n事故发生前，你注意到研究站的深度传感器出现了异常读数。然后，站长赵远突然宣布进入紧急状态，要求所有人回到各自的舱室。\n\n但在你回舱室的路上，你听到了两个工程师的争吵：\n\n"这不是地质活动！那是人为的！"\n\n然后，爆炸发生了。',
    choices: [
      { label: 'A', text: '这是人为破坏？继续深入调查', next: 21, delta: { oxygen: -3, sanity: -8, power: 0 } },
      { label: 'B', text: '先找到其他幸存者，再讨论原因', next: 2, delta: { oxygen: -3, sanity: 0, power: 0 } },
      { label: 'C', text: '寻找证据，证实或否定这个猜测', next: 22, delta: { oxygen: -5, sanity: -5, power: 0 } },
    ],
  },
  {
    id: 10,
    text: '你沿着走廊前往B-7舱室。\n\n门是虚掩的。你推开门，看到了一个让你震惊的场景：\n\n你的同事，生物学家苏晴，正坐在角落里，用一根金属棒支撑着一扇快要坍塌的舱壁。\n\n"陈深！"她看到你，眼中充满了如释重负，"快来帮我！这扇墙撑不住了！"',
    choices: [
      { label: 'A', text: '立即冲过去帮她支撑舱壁', next: 23, delta: { oxygen: -8, sanity: 5, power: 0 } },
      { label: 'B', text: '先找其他支撑物，再帮她', next: 24, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '询问舱壁后面的情况', next: 25, delta: { oxygen: -3, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 11,
    text: '你尝试修复通讯系统。\n\n经过半小时的努力，你成功地恢复了部分通讯功能。\n\n你发出了求救信号，但不确定是否有人收到。\n\n与此同时，你在系统日志中发现了一条奇怪的记录：事故发生前两小时，有人从内部关闭了研究站的紧急上浮系统。\n\n这是蓄意为之。',
    choices: [
      { label: 'A', text: '这是内部破坏！立即寻找幸存者，查明真相', next: 21, delta: { oxygen: -5, sanity: -8, power: -5 } },
      { label: 'B', text: '先找到其他幸存者，保证大家的安全', next: 10, delta: { oxygen: -5, sanity: 0, power: -3 } },
      { label: 'C', text: '继续调查系统日志，获取更多信息', next: 26, delta: { oxygen: -5, sanity: -5, power: -8 } },
    ],
  },
  {
    id: 12,
    text: '控制面板显示了研究站的整体情况，让你心情沉重：\n\nA区：完全淹没。B区：部分受损，可通行。C区：严重受损，危险。D区（指挥中心）：未知。\n\n备用电源剩余：23%，预计可维持4小时。\n\n最重要的是：紧急上浮舱的状态显示为"手动锁定"。\n\n有人锁定了逃生系统。',
    choices: [
      { label: 'A', text: '立即前往D区，查明情况', next: 27, delta: { oxygen: -8, sanity: -5, power: -3 } },
      { label: 'B', text: '先找到其他幸存者，再做决定', next: 10, delta: { oxygen: -5, sanity: 0, power: 0 } },
      { label: 'C', text: '尝试远程解锁上浮舱', next: 28, delta: { oxygen: -5, sanity: 0, power: -8 } },
    ],
  },
  {
    id: 13,
    text: '你用急救包为林海处理了伤口，固定了他骨折的腿。\n\n"谢谢……"他痛苦地说，"我以为我会死在这里。"\n\n在你处理伤口的过程中，他告诉了你一些重要信息：事故发生前，他听到了一声爆炸，来自C区——那里是研究站的能源核心。\n\n"这不是意外，陈深。有人炸了能源核心。"',
    choices: [
      { label: 'A', text: '询问他是否知道是谁干的', next: 29, delta: { oxygen: -3, sanity: -5, power: 0 } },
      { label: 'B', text: '先想办法把他转移到更安全的地方', next: 30, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '告诉他你发现的其他线索', next: 31, delta: { oxygen: -3, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 14,
    text: '"发生了什么？"你问林海。\n\n他深吸一口气："事故发生前，站长赵远宣布进入紧急状态。然后……爆炸。我被气浪冲倒，腿断了，就躲在这里。"\n\n"但是……"他犹豫了一下，"事故发生前，我看到赵远和一个陌生人在争吵。那个人……不是我们的研究人员。"\n\n"陌生人？"你皱起眉头。',
    choices: [
      { label: 'A', text: '追问那个陌生人的特征', next: 32, delta: { oxygen: -3, sanity: -5, power: 0 } },
      { label: 'B', text: '先为他处理伤口，再继续讨论', next: 13, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '告诉他你回忆起的事情', next: 31, delta: { oxygen: -3, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 15,
    text: '你检查了储藏室的物资。\n\n收获颇丰：两个备用氧气罐（各可提供30%的补充）、一套工具箱、以及一个密封的防水袋。\n\n防水袋里有一张手写的纸条：\n\n"如果你找到这个，去D-3。真相在那里。——R"',
    choices: [
      { label: 'A', text: '"R"是谁？先为林海处理伤口，再讨论', next: 13, delta: { oxygen: -3, sanity: 5, power: 0 } },
      { label: 'B', text: '立即前往D-3', next: 33, delta: { oxygen: -8, sanity: -5, power: 0 } },
      { label: 'C', text: '询问林海是否知道"R"是谁', next: 34, delta: { oxygen: -3, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 16,
    text: '你用金属管撬开了缝隙，勉强挤了进去。\n\n核心区域的水已经漫到了腰部，冰冷刺骨。你艰难地向前移动。\n\n在水中，你发现了一个漂浮的数据存储器——这是研究站的黑匣子！\n\n但就在你伸手去拿的时候，头顶传来一声巨响，舱壁开始颤抖。',
    choices: [
      { label: 'A', text: '抓住黑匣子，立即撤退', next: 35, delta: { oxygen: -10, sanity: -10, power: 0 } },
      { label: 'B', text: '放弃黑匣子，立即撤退', next: 36, delta: { oxygen: -8, sanity: -5, power: 0 } },
      { label: 'C', text: '快速检查黑匣子的内容，再决定', next: 37, delta: { oxygen: -12, sanity: -8, power: 0 } },
    ],
  },
  {
    id: 17,
    text: '"这里是陈深，海渊一号研究员！我在B区走廊，氧气还有60%，需要救援！"\n\n信号中断了几秒，然后：\n\n"收到，陈深！我们正在赶来，预计4小时后到达。请保持通讯，告知研究站内其他幸存者的情况。"\n\n4小时。你需要撑4个小时。',
    choices: [
      { label: 'A', text: '告知救援队你所知道的情况', next: 38, delta: { oxygen: -3, sanity: 10, power: 0 } },
      { label: 'B', text: '立即去寻找其他幸存者', next: 10, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '询问救援队关于事故的信息', next: 39, delta: { oxygen: -3, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 18,
    text: '你没有立即回应，而是仔细聆听救援队的通讯。\n\n你听到了一些令人不安的内容："……确认，任务目标是回收数据，不是救援……"\n\n然后，另一个声音："……但如果有幸存者……"\n\n"……按照指示行事……"\n\n你皱起眉头。这支"救援队"的目的似乎并不单纯。',
    choices: [
      { label: 'A', text: '还是回应，也许你误解了', next: 17, delta: { oxygen: -3, sanity: -5, power: 0 } },
      { label: 'B', text: '不回应，独立寻找逃生方式', next: 40, delta: { oxygen: -5, sanity: -8, power: 0 } },
      { label: 'C', text: '继续监听，收集更多信息', next: 41, delta: { oxygen: -3, sanity: -5, power: 0 } },
    ],
  },
  {
    id: 19,
    text: '你找到了通讯器的天线接口，将其连接到走廊的金属管道上，利用金属管道作为天线增强信号。\n\n效果显著。信号变得清晰了许多：\n\n"……海渊一号，这里是深海救援队。我们已经收到你们的求救信号，正在赶来。预计4小时后到达。请告知幸存者人数和位置。"\n\n但你也听到了一段加密通讯，虽然无法解码，但你注意到了一个词："数据回收"。',
    choices: [
      { label: 'A', text: '回应救援队，告知你的情况', next: 17, delta: { oxygen: -3, sanity: 10, power: -3 } },
      { label: 'B', text: '对"数据回收"感到警惕，先不回应', next: 18, delta: { oxygen: -3, sanity: -5, power: -3 } },
      { label: 'C', text: '尝试解码那段加密通讯', next: 42, delta: { oxygen: -5, sanity: -5, power: -5 } },
    ],
  },
  {
    id: 20,
    text: '你继续读笔记。\n\n最后几页的内容让你越来越不安：\n\n"声波信号的频率与三年前的X-7事件完全一致。X-7事件……那次所谓的‘地质灰害’，真的只是自然原因吗？"\n\n"我需要和赵远谈谈。他一定知道些什么。"\n\n然后，笔记突然中断了。\n\nX-7事件。你记得那次事件，另一个深海研究站，所有人员失踪，官方定性为地质灾害。',
    choices: [
      { label: 'A', text: '这不是巧合！立即寻找更多证据', next: 22, delta: { oxygen: -5, sanity: -10, power: 0 } },
      { label: 'B', text: '先找到其他幸存者，保证安全', next: 2, delta: { oxygen: -3, sanity: -5, power: 0 } },
      { label: 'C', text: '寻找赵远，他知道真相', next: 27, delta: { oxygen: -8, sanity: -8, power: 0 } },
    ],
  },
  {
    id: 21,
    text: '如果这是人为破坏，那么破坏者可能还在研究站里。\n\n这个想法让你不寒而栗。\n\n你需要找到答案，但你也需要保持警惕。\n\n你决定先找到其他幸存者，然后一起查明真相。',
    choices: [
      { label: 'A', text: '前往B-7舱室，那里有生命体征', next: 10, delta: { oxygen: -5, sanity: -5, power: 0 } },
      { label: 'B', text: '前往D区指挥中心，查明情况', next: 27, delta: { oxygen: -8, sanity: -8, power: 0 } },
      { label: 'C', text: '先寻找武器或防身工具', next: 43, delta: { oxygen: -5, sanity: -3, power: 0 } },
    ],
  },
  {
    id: 22,
    text: '你在研究站里搜寻证据。\n\n在一个被遗忘的角落，你发现了一个防水密封袋，里面有一个U盘和一张纸条：\n\n"这是X-7事件的真实数据。如果我出事，请将这个交给国际海洋研究委员会。——赵远"\n\n赵远知道真相，而且他预料到了危险。',
    choices: [
      { label: 'A', text: '立即寻找赵远', next: 27, delta: { oxygen: -8, sanity: -5, power: 0 } },
      { label: 'B', text: '先保护好这个U盘，再做决定', next: 44, delta: { oxygen: -3, sanity: 0, power: 0 } },
      { label: 'C', text: '找到其他幸存者，一起行动', next: 10, delta: { oxygen: -5, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 23,
    text: '你冲过去，和苏晴一起支撑着舱壁。\n\n金属在你们的手中颤抖，发出令人牙酸的声响。\n\n"我们撑不住多久，"苏晴说，"但我在舱壁后面发现了一个紧急密封阀。如果能关闭它，就能阻止这边的进水。"\n\n"你能去关闭它吗？"她看着你，"我来撑着。"',
    choices: [
      { label: 'A', text: '你去关阀，让她撑着', next: 45, delta: { oxygen: -8, sanity: 5, power: 0 } },
      { label: 'B', text: '你来撑着，让她去关阀', next: 46, delta: { oxygen: -8, sanity: 5, power: 0 } },
      { label: 'C', text: '找其他方法，不要分开', next: 47, delta: { oxygen: -5, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 24,
    text: '你在舱室里快速搜索，找到了几根金属支撑杆。\n\n你将支撑杆固定在舱壁和地板之间，形成了一个临时的支撑结构。\n\n"这样能撑多久？"苏晴问。\n\n"不知道，"你诚实地说，"但比刚才好多了。"\n\n苏晴松了口气，告诉你她在舱壁后面发现了一个紧急密封阀，如果能关闭它，可以阻止进水。',
    choices: [
      { label: 'A', text: '你去关阀，让她在这里等待', next: 45, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'B', text: '一起去关阀，不要分开', next: 48, delta: { oxygen: -8, sanity: 5, power: 0 } },
      { label: 'C', text: '先讨论整体情况，再做决定', next: 49, delta: { oxygen: -3, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 25,
    text: '"舱壁后面是什么？"你问苏晴。\n\n"是C区的连接通道，"她说，"但C区已经进水了。如果舱壁倒塌，水会涌进来。"\n\n"但是……"她犹豫了一下，"我在通道里看到了一个人。他……他没有动。"\n\n你感到一阵寒意。',
    choices: [
      { label: 'A', text: '帮她支撑舱壁，同时想办法救那个人', next: 23, delta: { oxygen: -8, sanity: -5, power: 0 } },
      { label: 'B', text: '先找支撑物，稳定舱壁', next: 24, delta: { oxygen: -5, sanity: -3, power: 0 } },
      { label: 'C', text: '放弃那个人，先保证自己的安全', next: 50, delta: { oxygen: -3, sanity: -10, power: 0 } },
    ],
  },
  {
    id: 26,
    text: '你深入调查系统日志，发现了更多令人不安的信息：\n\n事故发生前72小时，有人从外部入侵了研究站的系统。\n\n事故发生前2小时，紧急上浮系统被手动锁定。\n\n事故发生前30分钟，所有对外通讯被切断。\n\n这是一次精心策划的破坏行动。\n\n但为什么？谁会想摧毁一个深海研究站？',
    choices: [
      { label: 'A', text: '查找入侵者的身份信息', next: 51, delta: { oxygen: -8, sanity: -8, power: -10 } },
      { label: 'B', text: '先找到其他幸存者，保证安全', next: 10, delta: { oxygen: -5, sanity: -5, power: -5 } },
      { label: 'C', text: '尝试恢复被切断的对外通讯', next: 52, delta: { oxygen: -8, sanity: -5, power: -10 } },
    ],
  },
  {
    id: 27,
    text: '你冒险前往D区指挥中心。\n\n走廊里有积水，你小心翼翼地前进。\n\n指挥中心的门是开着的。里面，站长赵远坐在主控台前，一动不动。\n\n你走近，发现他还有呼吸，但陷入了深度昏迷。他的手里紧握着一个数据存储器。',
    choices: [
      { label: 'A', text: '尝试唤醒赵远', next: 53, delta: { oxygen: -5, sanity: 0, power: 0 } },
      { label: 'B', text: '取走数据存储器，查看内容', next: 54, delta: { oxygen: -5, sanity: -5, power: 0 } },
      { label: 'C', text: '先检查指挥中心的系统状态', next: 55, delta: { oxygen: -5, sanity: 0, power: -5 } },
    ],
  },
  {
    id: 28,
    text: '你尝试远程解锁上浮舱。\n\n但系统提示：需要站长授权。\n\n赵远在哪里？\n\n你决定必须找到他。',
    choices: [
      { label: 'A', text: '前往D区，寻找赵远', next: 27, delta: { oxygen: -8, sanity: 0, power: -3 } },
      { label: 'B', text: '先找到其他幸存者，一起行动', next: 10, delta: { oxygen: -5, sanity: 0, power: -3 } },
      { label: 'C', text: '尝试破解授权系统', next: 56, delta: { oxygen: -8, sanity: -5, power: -10 } },
    ],
  },
  {
    id: 29,
    text: '"你知道是谁干的吗？"你问林海。\n\n他沉默了很久，然后说："我不确定……但事故发生前，我看到了一个陌生人。他不是我们的研究人员，但他有访问权限。"\n\n"他和赵远在一起。他们在争吵，然后……"\n\n"然后爆炸发生了。"\n\n你感到一阵寒意。赵远是否知道这次事故？',
    choices: [
      { label: 'A', text: '立即寻找赵远，质问他', next: 27, delta: { oxygen: -8, sanity: -8, power: 0 } },
      { label: 'B', text: '先把林海转移到安全地方，再调查', next: 30, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '告诉林海你发现的其他线索', next: 31, delta: { oxygen: -3, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 30,
    text: '你帮助林海移动到一个更安全的舱室，远离可能进水的区域。\n\n"你能自己撑着吗？"你问他。\n\n"能，"他点头，"去查清楚真相。但要小心，陈深。"\n\n你离开了林海，开始独自行动。',
    choices: [
      { label: 'A', text: '前往D区，寻找赵远', next: 27, delta: { oxygen: -8, sanity: 0, power: 0 } },
      { label: 'B', text: '前往B-7舱室，寻找其他幸存者', next: 10, delta: { oxygen: -5, sanity: 0, power: 0 } },
      { label: 'C', text: '寻找通讯设备，联系外界', next: 7, delta: { oxygen: -5, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 31,
    text: '你和林海分享了你发现的所有线索。\n\n林海听完，脸色变得凝重："如果这是人为破坏……那破坏者可能还在研究站里。"\n\n"我们需要找到其他幸存者，一起行动，"他说，"分散行动太危险了。"\n\n你同意他的判断。',
    choices: [
      { label: 'A', text: '前往B-7舱室，那里有生命体征', next: 10, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'B', text: '先帮林海处理伤口，再一起行动', next: 13, delta: { oxygen: -3, sanity: 5, power: 0 } },
      { label: 'C', text: '前往D区，寻找赵远', next: 27, delta: { oxygen: -8, sanity: -5, power: 0 } },
    ],
  },
  {
    id: 32,
    text: '林海描述了那个陌生人：高个子，短发，穿着黑色潜水服，没有研究站的标志。\n\n"他……他看起来像是军人，或者特工之类的。"\n\n这个描述让你想起了一些事：三个月前，研究站曾接待过一批"政府观察员"，他们对研究站的深海探测数据表现出异常浓厚的兴趣。',
    choices: [
      { label: 'A', text: '这些"政府观察员"可能就是幕后黑手', next: 57, delta: { oxygen: -3, sanity: -8, power: 0 } },
      { label: 'B', text: '先帮林海处理伤口，再继续调查', next: 13, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '告诉林海你发现的其他线索', next: 31, delta: { oxygen: -3, sanity: -5, power: 0 } },
    ],
  },
  {
    id: 33,
    text: '你独自前往D-3舱室。\n\n那是一个小型储藏室，里面存放着备用设备。\n\n在一个锁着的柜子后面，你发现了一个隐藏的空间。里面有一台小型电脑和大量文件。\n\n文件的标题让你震惊："X-7计划——深海资源开发可行性研究"。\n\n这不是科学研究。这是一个商业开发计划，而研究站的存在，只是为了掩护这个计划。',
    choices: [
      { label: 'A', text: '带走所有文件，这是关键证据', next: 58, delta: { oxygen: -5, sanity: -10, power: 0 } },
      { label: 'B', text: '拍照留证，然后继续寻找幸存者', next: 59, delta: { oxygen: -5, sanity: -5, power: 0 } },
      { label: 'C', text: '寻找"R"，他一定知道更多', next: 60, delta: { oxygen: -8, sanity: -8, power: 0 } },
    ],
  },
  {
    id: 34,
    text: '"R是谁？"你问林海。\n\n他皱起眉头，然后突然明白了："R……应该是赵远。他的名字拼音首字母是R。"\n\n"赵远留下了这个纸条？那他一定知道些什么。"\n\n"但他在哪里？"你问。\n\n"D区，指挥中心，"林海说，"他一直在那里。"',
    choices: [
      { label: 'A', text: '立即前往D区，寻找赵远', next: 27, delta: { oxygen: -8, sanity: 0, power: 0 } },
      { label: 'B', text: '先为林海处理伤口，再出发', next: 13, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '带上林海一起去', next: 61, delta: { oxygen: -8, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 35,
    text: '你抓住了黑匣子，拼命向出口游去。\n\n舱壁在你身后轰然倒塌，水流将你冲向走廊。\n\n你拼尽全力，终于爬出了进水区域，浑身湿透，精疲力竭。\n\n但你手里握着黑匣子。里面记录了事故发生前后的所有数据。\n\n这是揭开真相的关键。',
    choices: [
      { label: 'A', text: '立即查看黑匣子的数据', next: 62, delta: { oxygen: -10, sanity: -10, power: 0 } },
      { label: 'B', text: '先找到其他幸存者，再分析数据', next: 10, delta: { oxygen: -8, sanity: -5, power: 0 } },
      { label: 'C', text: '保护好黑匣子，寻找逃生路线', next: 63, delta: { oxygen: -8, sanity: -5, power: 0 } },
    ],
  },
  {
    id: 36,
    text: '你放弃了黑匣子，拼命向出口游去。\n\n舱壁在你身后轰然倒塌，水流将你冲向走廊。\n\n你拼尽全力，终于爬出了进水区域，浑身湿透，精疲力竭。\n\n你活下来了，但失去了可能揭开真相的关键证据。',
    choices: [
      { label: 'A', text: '继续寻找其他幸存者', next: 10, delta: { oxygen: -8, sanity: -5, power: 0 } },
      { label: 'B', text: '寻找逃生路线', next: 63, delta: { oxygen: -8, sanity: 0, power: 0 } },
      { label: 'C', text: '寻找通讯设备，联系外界', next: 7, delta: { oxygen: -8, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 37,
    text: '你快速浏览了黑匣子的数据。\n\n数据显示：事故发生前，有一个外部设备接入了研究站的系统，然后触发了C区的爆炸。\n\n这是远程控制的爆炸！\n\n就在这时，舱壁轰然倒塌，水流将你冲向走廊。你拼命挣扎，但黑匣子在混乱中脱手了。\n\n你活下来了，但失去了黑匣子。',
    choices: [
      { label: 'A', text: '继续寻找幸存者', next: 10, delta: { oxygen: -12, sanity: -10, power: 0 } },
      { label: 'B', text: '寻找逃生路线', next: 63, delta: { oxygen: -12, sanity: -8, power: 0 } },
      { label: 'C', text: '将你知道的信息记录下来', next: 64, delta: { oxygen: -10, sanity: -5, power: 0 } },
    ],
  },
  {
    id: 38,
    text: '你告知救援队研究站内的情况：B区可通行，有幸存者，紧急上浮系统被锁定。\n\n救援队沉默了一下，然后说："收到。我们会尽快赶到。请告知你的精确位置，并保持通讯。"\n\n你感到一丝安慰，但也有一丝不安——他们为什么要你保持通讯？是为了追踪你的位置吗？',
    choices: [
      { label: 'A', text: '继续配合救援队，寻找幸存者', next: 10, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'B', text: '对救援队保持警惕，独立行动', next: 40, delta: { oxygen: -5, sanity: -5, power: 0 } },
      { label: 'C', text: '询问救援队关于事故的信息', next: 39, delta: { oxygen: -3, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 39,
    text: '"你们知道事故的原因吗？"你问救援队。\n\n短暂的沉默，然后："……目前还在调查中。请保持冷静，等待救援。"\n\n这个回答太过模糊。你追问："是否有外部因素？"\n\n更长的沉默。然后："……请保持通讯，我们很快就到。"\n\n他们知道些什么，但不想告诉你。',
    choices: [
      { label: 'A', text: '继续追问，不放弃', next: 65, delta: { oxygen: -3, sanity: -5, power: 0 } },
      { label: 'B', text: '放弃追问，先寻找幸存者', next: 10, delta: { oxygen: -5, sanity: 0, power: 0 } },
      { label: 'C', text: '对救援队产生怀疑，独立行动', next: 40, delta: { oxygen: -5, sanity: -8, power: 0 } },
    ],
  },
  {
    id: 40,
    text: '你决定不依赖这支可疑的"救援队"，独立寻找逃生方式。\n\n你知道研究站有一个备用的单人逃生舱，位于E区。但E区的情况未知。\n\n你还知道，如果能修复通讯系统，可以直接联系国际海洋研究委员会，绕过这支救援队。',
    choices: [
      { label: 'A', text: '前往E区，寻找备用逃生舱', next: 66, delta: { oxygen: -10, sanity: -5, power: 0 } },
      { label: 'B', text: '修复通讯系统，联系国际海洋研究委员会', next: 52, delta: { oxygen: -8, sanity: 0, power: -10 } },
      { label: 'C', text: '先找到其他幸存者，一起行动', next: 10, delta: { oxygen: -5, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 41,
    text: '你继续监听救援队的通讯。\n\n你听到了更多令人不安的内容：\n\n"……目标是X-7数据。如果数据已被销毁，任务失败。"\n\n"……幸存者……按照协议处理……"\n\n"按照协议处理"——这句话让你感到极度不安。',
    choices: [
      { label: 'A', text: '这支救援队是威胁！立即寻找其他逃生方式', next: 40, delta: { oxygen: -5, sanity: -15, power: 0 } },
      { label: 'B', text: '也许你误解了，还是回应救援队', next: 17, delta: { oxygen: -3, sanity: -5, power: 0 } },
      { label: 'C', text: '找到X-7数据，这是你的筹码', next: 22, delta: { oxygen: -8, sanity: -10, power: 0 } },
    ],
  },
  {
    id: 42,
    text: '你尝试解码那段加密通讯。\n\n经过努力，你解码了部分内容：\n\n"……确认目标……X-7数据……回收优先……幸存者……次要……"\n\n这支"救援队"的首要目标是数据，不是人。\n\n你感到一阵恐惧。',
    choices: [
      { label: 'A', text: '不回应救援队，独立寻找逃生方式', next: 40, delta: { oxygen: -5, sanity: -10, power: -5 } },
      { label: 'B', text: '找到X-7数据，作为谈判筹码', next: 22, delta: { oxygen: -8, sanity: -8, power: -5 } },
      { label: 'C', text: '联系国际海洋研究委员会，告知真相', next: 52, delta: { oxygen: -8, sanity: -5, power: -8 } },
    ],
  },
  {
    id: 43,
    text: '你在研究站里搜寻防身工具。\n\n你找到了一把信号枪和几发信号弹，还有一把工具刀。\n\n这些东西在水下的用处有限，但在研究站内部，可以作为防身和求救的工具。\n\n你感到稍微安心了一些，然后继续前进。',
    choices: [
      { label: 'A', text: '前往B-7舱室，寻找幸存者', next: 10, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'B', text: '前往D区，寻找赵远', next: 27, delta: { oxygen: -8, sanity: 0, power: 0 } },
      { label: 'C', text: '寻找通讯设备，联系外界', next: 7, delta: { oxygen: -5, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 44,
    text: '你将U盘和纸条小心地放入防水袋，保护好这份关键证据。\n\n无论接下来发生什么，这份证据必须送出去。\n\n你感到一种奇特的使命感——你不仅要逃出去，还要让真相大白于天下。',
    choices: [
      { label: 'A', text: '寻找赵远，了解更多真相', next: 27, delta: { oxygen: -8, sanity: 0, power: 0 } },
      { label: 'B', text: '找到其他幸存者，一起逃出去', next: 10, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '寻找通讯设备，将证据传出去', next: 7, delta: { oxygen: -5, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 45,
    text: '你穿过舱壁的缝隙，进入了C区的连接通道。\n\n水已经漫到了膝盖，冰冷刺骨。你艰难地向前移动，寻找密封阀。\n\n在通道的尽头，你找到了阀门，也找到了那个"没有动"的人——是研究员王磊，他已经失去了意识，但还有微弱的呼吸。\n\n你需要做出选择：先关阀，还是先救王磊？',
    choices: [
      { label: 'A', text: '先关阀，阻止进水', next: 67, delta: { oxygen: -10, sanity: -10, power: 0 } },
      { label: 'B', text: '先救王磊，把他拖出来', next: 68, delta: { oxygen: -10, sanity: 5, power: 0 } },
      { label: 'C', text: '尝试同时完成两件事', next: 69, delta: { oxygen: -12, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 46,
    text: '你接过金属棒，支撑着舱壁，让苏晴去关阀。\n\n舱壁在你手中颤抖，每一秒都像是一个世纪。\n\n终于，你听到了苏晴的声音："关上了！"\n\n舱壁停止了颤抖。你们都安全了。\n\n苏晴回来时，她的脸上有泪水："谢谢你，陈深。"',
    choices: [
      { label: 'A', text: '询问苏晴关于事故的情况', next: 70, delta: { oxygen: -5, sanity: 10, power: 0 } },
      { label: 'B', text: '和苏晴一起寻找其他幸存者', next: 71, delta: { oxygen: -5, sanity: 10, power: 0 } },
      { label: 'C', text: '告诉苏晴你发现的线索', next: 72, delta: { oxygen: -3, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 47,
    text: '你和苏晴一起思考其他方法。\n\n苏晴想到了一个方案：用研究站的密封胶临时封堵舱壁的裂缝，争取更多时间。\n\n你们找到了密封胶，花了半小时完成了临时修复。\n\n舱壁暂时稳定了，但你们都知道这只是权宜之计。',
    choices: [
      { label: 'A', text: '利用这段时间，去关闭密封阀', next: 45, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'B', text: '和苏晴一起寻找其他幸存者', next: 71, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '告诉苏晴你发现的线索', next: 72, delta: { oxygen: -3, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 48,
    text: '你和苏晴一起进入了C区的连接通道。\n\n水很深，行动困难，但有彼此的支撑，你们都感到更有力量。\n\n你们找到了密封阀，也找到了失去意识的王磊。\n\n苏晴去关阀，你去救王磊。',
    choices: [
      { label: 'A', text: '救出王磊，等待苏晴', next: 68, delta: { oxygen: -10, sanity: 5, power: 0 } },
      { label: 'B', text: '先帮苏晴关阀，再救王磊', next: 67, delta: { oxygen: -10, sanity: -5, power: 0 } },
      { label: 'C', text: '同时进行，争分夺秒', next: 69, delta: { oxygen: -12, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 49,
    text: '你和苏晴交流了各自掌握的信息。\n\n苏晴告诉你，她在事故发生前，听到了赵远和一个陌生人的争吵。\n\n"赵远说：\'你们不能这样做！这违反了协议！\'"\n\n"那个人说：\'协议已经改变了。\'"\n\n然后，爆炸发生了。\n\n赵远似乎是在阻止这次事故，但失败了。',
    choices: [
      { label: 'A', text: '立即寻找赵远', next: 27, delta: { oxygen: -8, sanity: -5, power: 0 } },
      { label: 'B', text: '和苏晴一起行动，更安全', next: 71, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '告诉苏晴你发现的其他线索', next: 72, delta: { oxygen: -3, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 50,
    text: '你和苏晴决定先保证自己的安全，放弃了那个人。\n\n苏晴找到了密封阀，关闭了进水通道。\n\n但那个人的命运，成为了你心中挥之不去的阴影。\n\n后来，你们发现那个人是研究员王磊，他在水中溺亡。\n\n你活下来了，但那个选择，你永远无法原谅自己。',
    choices: [
      { label: 'A', text: '和苏晴一起寻找其他幸存者', next: 71, delta: { oxygen: -5, sanity: -15, power: 0 } },
      { label: 'B', text: '独自承受内疚，继续前进', next: 73, delta: { oxygen: -5, sanity: -20, power: 0 } },
      { label: 'C', text: '告诉苏晴你的感受', next: 74, delta: { oxygen: -3, sanity: -10, power: 0 } },
    ],
  },
  {
    id: 51,
    text: '你深入调查入侵者的身份。\n\n系统显示，入侵者使用了一个特殊的加密协议，这种协议通常只有政府机构或大型企业才会使用。\n\n更令人震惊的是，入侵者的IP地址追踪到了一家名为"深蓝资源"的公司——这家公司是研究站的主要资助方之一。\n\n资助方摧毁了他们自己的研究站？',
    choices: [
      { label: 'A', text: '这是内部阴谋！寻找更多证据', next: 33, delta: { oxygen: -8, sanity: -10, power: -10 } },
      { label: 'B', text: '先找到幸存者，保证安全', next: 10, delta: { oxygen: -5, sanity: -5, power: -5 } },
      { label: 'C', text: '将这个信息传出去，让外界知道', next: 52, delta: { oxygen: -8, sanity: -5, power: -10 } },
    ],
  },
  {
    id: 52,
    text: '你尝试修复通讯系统，联系国际海洋研究委员会。\n\n经过艰难的努力，你成功建立了一条加密通讯线路。\n\n"这里是海渊一号，我有紧急情报需要上报……"\n\n委员会的工作人员听完你的叙述，沉默了很久，然后说："我们收到了。请保持安全，我们会采取行动。"',
    choices: [
      { label: 'A', text: '告知他们所有你知道的信息', next: 75, delta: { oxygen: -8, sanity: 10, power: -10 } },
      { label: 'B', text: '请求他们派遣可信赖的救援', next: 76, delta: { oxygen: -5, sanity: 10, power: -8 } },
      { label: 'C', text: '先找到其他幸存者，再继续通讯', next: 10, delta: { oxygen: -5, sanity: 5, power: -5 } },
    ],
  },
  {
    id: 53,
    text: '你轻轻摇晃赵远，呼唤他的名字。\n\n他缓缓睁开了眼睛，看到你，眼中闪过一丝复杂的情绪。\n\n"陈深……你还活着……好……"\n\n"赵远，发生了什么？"你问。\n\n他深吸一口气，开始说话，声音虚弱但清晰：\n\n"这是X-7计划的延续……他们要销毁所有证据……包括我们……"',
    choices: [
      { label: 'A', text: '让他继续说，了解全部真相', next: 77, delta: { oxygen: -5, sanity: -5, power: 0 } },
      { label: 'B', text: '先帮他恢复体力，再听他说', next: 78, delta: { oxygen: -3, sanity: 5, power: 0 } },
      { label: 'C', text: '询问他如何逃出去', next: 79, delta: { oxygen: -3, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 54,
    text: '你轻轻取走了赵远手中的数据存储器。\n\n他没有反应——他陷入的昏迷太深了。\n\n你将存储器插入控制台，数据开始加载。\n\n里面是X-7事件的完整记录：这不是地质灾害，而是一次有预谋的破坏行动，目的是消灭知道深海资源秘密的研究人员。\n\n而现在，历史正在重演。',
    choices: [
      { label: 'A', text: '带走数据，这是揭露真相的关键', next: 80, delta: { oxygen: -5, sanity: -8, power: 0 } },
      { label: 'B', text: '尝试唤醒赵远，他需要知道你找到了证据', next: 53, delta: { oxygen: -3, sanity: 0, power: 0 } },
      { label: 'C', text: '将数据传输出去，然后找幸存者', next: 52, delta: { oxygen: -8, sanity: -5, power: -10 } },
    ],
  },
  {
    id: 55,
    text: '你检查了指挥中心的系统状态。\n\n备用电源：18%（比之前少了5%）。生命维持系统：仍在运行。\n\n但你发现了一个重要信息：研究站的紧急上浮系统可以从指挥中心手动解锁，但需要站长的生物特征识别。\n\n赵远就在这里，但他失去了意识。',
    choices: [
      { label: 'A', text: '尝试唤醒赵远，让他解锁上浮系统', next: 53, delta: { oxygen: -5, sanity: 0, power: -3 } },
      { label: 'B', text: '尝试绕过生物识别系统', next: 81, delta: { oxygen: -8, sanity: -5, power: -10 } },
      { label: 'C', text: '先找到其他幸存者，再做决定', next: 10, delta: { oxygen: -5, sanity: 0, power: -3 } },
    ],
  },
  {
    id: 56,
    text: '你尝试破解授权系统。\n\n这需要专业知识，但你在研究站工作了三年，对系统有一定了解。\n\n经过艰难的尝试，你找到了一个漏洞——系统在紧急状态下有一个备用授权码，储存在站长的个人文件中。\n\n你需要找到赵远的个人文件。',
    choices: [
      { label: 'A', text: '前往D区，寻找赵远和他的文件', next: 27, delta: { oxygen: -8, sanity: -5, power: -5 } },
      { label: 'B', text: '在系统中搜索赵远的个人文件', next: 82, delta: { oxygen: -5, sanity: -3, power: -8 } },
      { label: 'C', text: '放弃这个方法，寻找其他逃生方式', next: 66, delta: { oxygen: -5, sanity: -3, power: -5 } },
    ],
  },
  {
    id: 57,
    text: '你将这个猜测告诉了林海。\n\n他沉默了很久，然后说："如果你说的是真的……那我们都处于极大的危险中。"\n\n"那些人不会让知情者活着离开的。"\n\n这句话让你感到一阵寒意。\n\n你需要找到证据，同时找到逃生的方法。',
    choices: [
      { label: 'A', text: '立即寻找证据，揭露真相', next: 22, delta: { oxygen: -5, sanity: -8, power: 0 } },
      { label: 'B', text: '先找到逃生方式，活着才能揭露真相', next: 63, delta: { oxygen: -5, sanity: -5, power: 0 } },
      { label: 'C', text: '帮林海处理伤口，再一起行动', next: 13, delta: { oxygen: -5, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 58,
    text: '你带走了所有文件，装入防水袋。\n\n这些文件揭示了一个惊人的阴谋：深蓝资源公司发现了深海中的稀有矿藏，但这片海域受到国际条约保护。\n\n他们资助研究站，是为了获取开发数据。当研究人员发现了真相并拒绝合作时，他们选择了销毁证据——连同研究站和所有人员。\n\n你必须活着逃出去，让世界知道这一切。',
    choices: [
      { label: 'A', text: '立即寻找逃生方式', next: 63, delta: { oxygen: -5, sanity: -5, power: 0 } },
      { label: 'B', text: '先找到其他幸存者，一起逃出去', next: 10, delta: { oxygen: -5, sanity: 0, power: 0 } },
      { label: 'C', text: '将文件传输出去，再逃跑', next: 52, delta: { oxygen: -8, sanity: -5, power: -10 } },
    ],
  },
  {
    id: 59,
    text: '你拍下了所有文件的照片，然后继续行动。\n\n这些照片存储在你的防水手机里，即使文件被销毁，证据依然存在。\n\n你感到一种使命感：你必须活着逃出去，将这些证据公之于众。',
    choices: [
      { label: 'A', text: '寻找其他幸存者，一起逃出去', next: 10, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'B', text: '立即寻找逃生方式', next: 63, delta: { oxygen: -5, sanity: 0, power: 0 } },
      { label: 'C', text: '寻找赵远，了解更多真相', next: 27, delta: { oxygen: -8, sanity: -5, power: 0 } },
    ],
  },
  {
    id: 60,
    text: '你开始寻找"R"——赵远。\n\n经过一番搜索，你在D区指挥中心找到了他。\n\n他失去了意识，但手里紧握着一个数据存储器。\n\n你唤醒了他，他睁开眼睛，看到你，露出了一个虚弱的微笑。\n\n"你找到了……好……我来告诉你一切……"',
    choices: [
      { label: 'A', text: '让他说，了解全部真相', next: 77, delta: { oxygen: -5, sanity: -5, power: 0 } },
      { label: 'B', text: '先帮他恢复体力', next: 78, delta: { oxygen: -3, sanity: 5, power: 0 } },
      { label: 'C', text: '询问如何逃出去', next: 79, delta: { oxygen: -3, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 61,
    text: '你和林海一起前往D区，虽然行动缓慢，但你不想让他独自等待。\n\n在指挥中心，你们找到了赵远。\n\n林海看到赵远，眼中闪过复杂的情绪："赵远……他是好人，他一直在保护我们。"\n\n你唤醒了赵远，他睁开眼睛，看到你们两个，露出了欣慰的表情。',
    choices: [
      { label: 'A', text: '让赵远告诉你们真相', next: 77, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'B', text: '先帮赵远恢复体力', next: 78, delta: { oxygen: -3, sanity: 8, power: 0 } },
      { label: 'C', text: '询问如何逃出去', next: 79, delta: { oxygen: -3, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 62,
    text: '你查看了黑匣子的数据。\n\n数据显示：事故是由一个外部设备触发的，该设备在事故发生前三小时接入了研究站的系统。\n\n更重要的是，数据中有一段视频记录：一个穿着黑色潜水服的人，在C区安装了爆炸装置。\n\n你看清了那个人的脸——是赵远的助手，李明。\n\n李明是内鬼。',
    choices: [
      { label: 'A', text: '立即寻找李明，质问他', next: 83, delta: { oxygen: -8, sanity: -10, power: 0 } },
      { label: 'B', text: '先找到赵远，告知他这个发现', next: 27, delta: { oxygen: -8, sanity: -5, power: 0 } },
      { label: 'C', text: '将视频传出去，让外界知道', next: 52, delta: { oxygen: -8, sanity: -5, power: -10 } },
    ],
  },
  {
    id: 63,
    text: '你开始寻找逃生路线。\n\n研究站有三种逃生方式：紧急上浮舱（被锁定）、备用单人逃生舱（E区，状态未知）、以及潜水逃生（需要专业装备）。\n\n你需要做出选择。',
    choices: [
      { label: 'A', text: '尝试解锁紧急上浮舱', next: 28, delta: { oxygen: -5, sanity: 0, power: -5 } },
      { label: 'B', text: '前往E区，寻找备用逃生舱', next: 66, delta: { oxygen: -10, sanity: -5, power: 0 } },
      { label: 'C', text: '寻找潜水装备，准备潜水逃生', next: 84, delta: { oxygen: -8, sanity: -5, power: 0 } },
    ],
  },
  {
    id: 64,
    text: '你将你知道的所有信息记录在笔记本上。\n\n这份记录，将成为揭露真相的关键证据。\n\n即使你无法逃出去，这份记录也可能被找到，让真相大白于天下。\n\n但你不打算放弃逃生的希望。',
    choices: [
      { label: 'A', text: '继续寻找幸存者', next: 10, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'B', text: '寻找逃生路线', next: 63, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '寻找通讯设备，传出这份记录', next: 7, delta: { oxygen: -5, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 65,
    text: '"你们知道这是人为破坏吗？你们知道是谁干的吗？"\n\n救援队沉默了很长时间，然后："……请保持冷静，等待救援。"\n\n"回答我的问题！"\n\n通讯突然中断了。\n\n他们切断了联系。\n\n这支"救援队"绝对有问题。',
    choices: [
      { label: 'A', text: '不依赖这支救援队，独立行动', next: 40, delta: { oxygen: -5, sanity: -10, power: 0 } },
      { label: 'B', text: '联系国际海洋研究委员会', next: 52, delta: { oxygen: -8, sanity: -5, power: -10 } },
      { label: 'C', text: '先找到其他幸存者，再做决定', next: 10, delta: { oxygen: -5, sanity: -5, power: 0 } },
    ],
  },
  {
    id: 66,
    text: '你冒险前往E区。\n\nE区的情况比你预想的要糟糕：走廊里有积水，部分舱壁已经变形。\n\n但你找到了备用逃生舱——一个单人的小型潜水舱，可以直接上浮到海面。\n\n问题是，它只能容纳一个人。',
    choices: [
      { label: 'A', text: '独自逃生，活着才能揭露真相', next: 85, delta: { oxygen: -10, sanity: -15, power: 0 } },
      { label: 'B', text: '回去找其他幸存者，一起想办法', next: 10, delta: { oxygen: -10, sanity: 0, power: 0 } },
      { label: 'C', text: '检查逃生舱，看是否可以改装', next: 86, delta: { oxygen: -8, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 67,
    text: '你先关闭了密封阀，阻止了进水。\n\n但当你回去救王磊时，水位已经上升了很多。\n\n你拼命拖拽王磊，将他从水中拉出来。\n\n他还有呼吸，但非常微弱。\n\n你救了他，但付出了巨大的体力代价。',
    choices: [
      { label: 'A', text: '为王磊进行急救', next: 87, delta: { oxygen: -10, sanity: 5, power: 0 } },
      { label: 'B', text: '拖着王磊回到苏晴那里', next: 88, delta: { oxygen: -10, sanity: 5, power: 0 } },
      { label: 'C', text: '询问王磊他知道什么', next: 89, delta: { oxygen: -8, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 68,
    text: '你先救了王磊，将他拖出了水中。\n\n他开始咳嗽，慢慢恢复了意识。\n\n"谢谢……"他虚弱地说。\n\n但就在这时，密封阀开始发出警报声——水位还在上升。\n\n你需要立即关闭阀门。',
    choices: [
      { label: 'A', text: '立即去关阀', next: 67, delta: { oxygen: -10, sanity: 0, power: 0 } },
      { label: 'B', text: '让王磊去关阀，你来支撑他', next: 90, delta: { oxygen: -8, sanity: 5, power: 0 } },
      { label: 'C', text: '先把王磊带到安全地方，再关阀', next: 91, delta: { oxygen: -10, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 69,
    text: '你同时尝试关阀和救王磊。\n\n这几乎是不可能完成的任务，但你做到了——以极大的体力消耗为代价。\n\n阀门关闭了，王磊被救出来了，但你已经精疲力竭，几乎无法站立。\n\n苏晴赶来，帮助你们两个。\n\n"你真是疯了，"她说，但眼中充满了敬佩。',
    choices: [
      { label: 'A', text: '休息一下，恢复体力', next: 92, delta: { oxygen: -12, sanity: 10, power: 0 } },
      { label: 'B', text: '没有时间休息，继续前进', next: 71, delta: { oxygen: -12, sanity: 5, power: 0 } },
      { label: 'C', text: '询问王磊他知道什么', next: 89, delta: { oxygen: -10, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 70,
    text: '苏晴告诉你，她在事故发生前，注意到赵远的助手李明行为异常。\n\n"他在C区待了很长时间，而且……他看起来很紧张。"\n\n"事故发生后，我没有看到他。"\n\n李明。你记住了这个名字。',
    choices: [
      { label: 'A', text: '寻找李明，他是关键人物', next: 83, delta: { oxygen: -8, sanity: -5, power: 0 } },
      { label: 'B', text: '和苏晴一起寻找其他幸存者', next: 71, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '寻找赵远，了解更多真相', next: 27, delta: { oxygen: -8, sanity: -5, power: 0 } },
    ],
  },
  {
    id: 71,
    text: '你和苏晴一起行动，在研究站里搜寻其他幸存者。\n\n你们找到了林海（腿部骨折，但意识清醒）和王磊（轻度溺水，已恢复意识）。\n\n四个人聚在一起，感到了一种奇特的力量。\n\n"我们一起能想出办法，"苏晴说，"我们一定能出去。"',
    choices: [
      { label: 'A', text: '讨论逃生计划', next: 93, delta: { oxygen: -5, sanity: 15, power: 0 } },
      { label: 'B', text: '分享各自掌握的信息，了解真相', next: 94, delta: { oxygen: -5, sanity: 10, power: 0 } },
      { label: 'C', text: '立即行动，寻找赵远', next: 27, delta: { oxygen: -8, sanity: 10, power: 0 } },
    ],
  },
  {
    id: 72,
    text: '你告诉苏晴你发现的所有线索。\n\n苏晴听完，沉默了很久。\n\n"如果这是真的……那我们都处于危险中，"她说，"我们需要找到证据，同时找到逃生方式。"\n\n"我们需要找到赵远，"你说，"他知道真相。"',
    choices: [
      { label: 'A', text: '和苏晴一起前往D区，寻找赵远', next: 27, delta: { oxygen: -8, sanity: 5, power: 0 } },
      { label: 'B', text: '和苏晴一起寻找其他幸存者', next: 71, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '和苏晴一起寻找逃生方式', next: 63, delta: { oxygen: -5, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 73,
    text: '你独自承受着内疚，继续前进。\n\n但那个选择的重量，让你每一步都走得格外沉重。\n\n你知道，即使你逃出去了，那个记忆也会永远跟随着你。',
    choices: [
      { label: 'A', text: '继续寻找幸存者', next: 71, delta: { oxygen: -5, sanity: -15, power: 0 } },
      { label: 'B', text: '寻找逃生方式', next: 63, delta: { oxygen: -5, sanity: -15, power: 0 } },
      { label: 'C', text: '寻找赵远，了解真相', next: 27, delta: { oxygen: -8, sanity: -15, power: 0 } },
    ],
  },
  {
    id: 74,
    text: '你告诉苏晴你的感受。\n\n她沉默了很久，然后说："我也一样。我们都做了我们认为正确的选择，但有时候，正确的选择也会带来痛苦。"\n\n"我们能做的，就是活下去，让他的牺牲有意义。"\n\n这句话给了你一些力量。',
    choices: [
      { label: 'A', text: '和苏晴一起继续前进', next: 71, delta: { oxygen: -3, sanity: -5, power: 0 } },
      { label: 'B', text: '寻找逃生方式', next: 63, delta: { oxygen: -5, sanity: -5, power: 0 } },
      { label: 'C', text: '寻找赵远，了解真相', next: 27, delta: { oxygen: -8, sanity: -5, power: 0 } },
    ],
  },
  {
    id: 75,
    text: '你将所有信息告诉了国际海洋研究委员会：X-7计划、深蓝资源公司、这支可疑的"救援队"。\n\n委员会的工作人员说："我们会立即采取行动。请保持安全，真正的救援队正在赶来。"\n\n你感到了一种前所未有的安慰。\n\n真相，终于有人知道了。',
    choices: [
      { label: 'A', text: '继续寻找幸存者，等待真正的救援', next: 10, delta: { oxygen: -5, sanity: 15, power: -5 } },
      { label: 'B', text: '寻找逃生方式，不依赖救援', next: 63, delta: { oxygen: -5, sanity: 10, power: -5 } },
      { label: 'C', text: '寻找赵远，告知他这个好消息', next: 27, delta: { oxygen: -8, sanity: 10, power: -5 } },
    ],
  },
  {
    id: 76,
    text: '委员会承诺会派遣可信赖的救援队，预计6小时后到达。\n\n6小时。你需要撑6个小时。\n\n但你知道，只要真相传出去了，你就不是孤军奋战了。',
    choices: [
      { label: 'A', text: '寻找幸存者，一起等待救援', next: 71, delta: { oxygen: -5, sanity: 10, power: -5 } },
      { label: 'B', text: '寻找逃生方式，不完全依赖救援', next: 63, delta: { oxygen: -5, sanity: 8, power: -5 } },
      { label: 'C', text: '寻找赵远，保护他', next: 27, delta: { oxygen: -8, sanity: 8, power: -5 } },
    ],
  },
  {
    id: 77,
    text: '赵远告诉了你一切。\n\n三年前的X-7事件，是深蓝资源公司策划的，目的是消灭发现了他们秘密的研究人员。\n\n这次，历史重演了。当他发现了他们的计划，试图阻止，但失败了。\n\n"我把所有证据都存在这个存储器里，"他说，"你必须把它带出去。"\n\n"但是……他们的人也在研究站里，"他的声音变得沉重，"李明……他是他们的人。"',
    choices: [
      { label: 'A', text: '带走存储器，立即寻找逃生方式', next: 80, delta: { oxygen: -5, sanity: -5, power: 0 } },
      { label: 'B', text: '帮助赵远，一起逃出去', next: 95, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '先找到李明，阻止他', next: 83, delta: { oxygen: -8, sanity: -8, power: 0 } },
    ],
  },
  {
    id: 78,
    text: '你为赵远提供了急救，帮助他恢复了一些体力。\n\n他感激地看着你："谢谢你，陈深。"\n\n然后，他告诉了你一切：X-7计划、深蓝资源公司、内鬼李明……\n\n"把这个存储器带出去，"他把数据存储器放到你手里，"让世界知道真相。"',
    choices: [
      { label: 'A', text: '带走存储器，寻找逃生方式', next: 80, delta: { oxygen: -3, sanity: 5, power: 0 } },
      { label: 'B', text: '帮助赵远一起逃出去', next: 95, delta: { oxygen: -5, sanity: 8, power: 0 } },
      { label: 'C', text: '先找到其他幸存者，再一起行动', next: 71, delta: { oxygen: -5, sanity: 8, power: 0 } },
    ],
  },
  {
    id: 79,
    text: '"我们怎么逃出去？"你问赵远。\n\n他虚弱地说："紧急上浮舱……需要我的生物识别……但我现在……"\n\n他挣扎着坐起来，"扶我去控制台……我来解锁。"',
    choices: [
      { label: 'A', text: '扶他去控制台，解锁上浮舱', next: 96, delta: { oxygen: -5, sanity: 5, power: -5 } },
      { label: 'B', text: '他太虚弱了，先让他休息', next: 78, delta: { oxygen: -3, sanity: 5, power: 0 } },
      { label: 'C', text: '先找到其他幸存者，再一起行动', next: 71, delta: { oxygen: -5, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 80,
    text: '你带走了数据存储器，开始寻找逃生方式。\n\n你知道，只要你能逃出去，真相就会大白于天下。\n\n这个信念，给了你继续前进的力量。',
    choices: [
      { label: 'A', text: '寻找紧急上浮舱', next: 28, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'B', text: '前往E区，寻找备用逃生舱', next: 66, delta: { oxygen: -10, sanity: 5, power: 0 } },
      { label: 'C', text: '先找到其他幸存者，一起逃出去', next: 71, delta: { oxygen: -5, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 81,
    text: '你尝试绕过生物识别系统。\n\n这需要极高的技术水平，但你在研究站工作了三年，对系统有一定了解。\n\n经过艰难的尝试，你发现了一个方法：系统有一个紧急覆盖模式，可以在站长无法操作时使用，但需要三名高级研究员同时授权。\n\n你是其中一名，你还需要找到另外两名。',
    choices: [
      { label: 'A', text: '寻找其他高级研究员', next: 71, delta: { oxygen: -8, sanity: 0, power: -5 } },
      { label: 'B', text: '先找到赵远，让他直接授权', next: 27, delta: { oxygen: -8, sanity: 0, power: -5 } },
      { label: 'C', text: '放弃这个方法，寻找其他逃生方式', next: 66, delta: { oxygen: -5, sanity: -3, power: -5 } },
    ],
  },
  {
    id: 82,
    text: '你在系统中搜索赵远的个人文件。\n\n你找到了一个加密文件夹，里面有一个紧急授权码。\n\n你输入授权码，系统提示：上浮舱解锁成功。\n\n你成功了！',
    choices: [
      { label: 'A', text: '立即前往上浮舱，逃出去', next: 85, delta: { oxygen: -5, sanity: 5, power: -8 } },
      { label: 'B', text: '先找到其他幸存者，一起逃出去', next: 71, delta: { oxygen: -5, sanity: 5, power: -8 } },
      { label: 'C', text: '先找到赵远，带他一起逃', next: 27, delta: { oxygen: -8, sanity: 5, power: -8 } },
    ],
  },
  {
    id: 83,
    text: '你去寻找李明。\n\n在研究站的一个角落，你找到了他——他正在试图销毁一些文件。\n\n"李明！"你大喊，"住手！"\n\n他转过身来，看到你，眼中闪过一丝慌乱，然后变得冷静。\n\n"陈深，你不应该来这里。"',
    choices: [
      { label: 'A', text: '质问他为什么要这样做', next: 97, delta: { oxygen: -5, sanity: -10, power: 0 } },
      { label: 'B', text: '阻止他销毁文件', next: 98, delta: { oxygen: -8, sanity: -5, power: 0 } },
      { label: 'C', text: '告诉他你已经将证据传出去了', next: 99, delta: { oxygen: -3, sanity: -5, power: 0 } },
    ],
  },
  {
    id: 84,
    text: '你寻找潜水装备。\n\n在装备室里，你找到了两套完整的深海潜水装备，包括氧气罐和推进器。\n\n但深海潜水是极其危险的，没有专业训练，很容易出事。\n\n你有基本的潜水训练，但这是3000米深的海底……',
    choices: [
      { label: 'A', text: '冒险潜水逃生', next: 100, delta: { oxygen: -10, sanity: -10, power: 0 } },
      { label: 'B', text: '放弃这个方法，太危险了', next: 63, delta: { oxygen: -5, sanity: 0, power: 0 } },
      { label: 'C', text: '带上装备，先找到其他幸存者再决定', next: 71, delta: { oxygen: -5, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 85,
    text: '你独自进入了逃生舱，启动了上浮程序。\n\n随着舱体开始上升，你透过舷窗看着研究站慢慢消失在黑暗中。\n\n你活下来了。\n\n但你独自一人逃出来，而其他人……\n\n你不知道他们的命运。\n\n这个秘密，这份孤独，将伴随你很长时间。',
    end: true,
    endType: 'neutral',
    endingId: 'alone',
  },
  {
    id: 86,
    text: '你检查了逃生舱的结构，发现了一个可能性：如果拆除部分非必要设备，勉强可以容纳两个人。\n\n但这会增加上浮的风险。\n\n你决定回去找其他幸存者，一起想办法。',
    choices: [
      { label: 'A', text: '回去找幸存者，一起使用这个逃生舱', next: 71, delta: { oxygen: -10, sanity: 5, power: 0 } },
      { label: 'B', text: '先找到赵远，他可能知道更好的方法', next: 27, delta: { oxygen: -10, sanity: 5, power: 0 } },
      { label: 'C', text: '先解锁紧急上浮舱，那样可以带更多人', next: 28, delta: { oxygen: -8, sanity: 5, power: -5 } },
    ],
  },
  {
    id: 87,
    text: '你为王磊进行了急救，他的状况稳定了下来。\n\n"谢谢……"他虚弱地说，"你救了我。"\n\n他告诉你，他在事故发生前，看到了李明在C区安装了什么东西。\n\n"我当时以为是例行维护……但现在想来……"',
    choices: [
      { label: 'A', text: '这证实了李明是内鬼！立即行动', next: 83, delta: { oxygen: -5, sanity: -5, power: 0 } },
      { label: 'B', text: '先把王磊带到安全地方', next: 88, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '和苏晴汇合，分享这个信息', next: 71, delta: { oxygen: -5, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 88,
    text: '你拖着王磊回到了苏晴那里。\n\n三个人聚在一起，感到了一种安慰。\n\n苏晴为王磊进行了简单的急救，他的状况稳定了下来。\n\n"我们需要找到赵远，"你说，"他知道逃生的方法。"',
    choices: [
      { label: 'A', text: '一起前往D区，寻找赵远', next: 27, delta: { oxygen: -8, sanity: 10, power: 0 } },
      { label: 'B', text: '先找到林海，四人一起行动', next: 71, delta: { oxygen: -5, sanity: 10, power: 0 } },
      { label: 'C', text: '讨论逃生计划', next: 93, delta: { oxygen: -3, sanity: 10, power: 0 } },
    ],
  },
  {
    id: 89,
    text: '王磊告诉你，他在事故发生前，看到了一个陌生人——穿着黑色潜水服，在C区安装了什么东西。\n\n"我当时以为是例行检查……但那个人……他不是我们的人。"\n\n这证实了你的猜测：这是一次有预谋的破坏行动。',
    choices: [
      { label: 'A', text: '寻找那个陌生人', next: 83, delta: { oxygen: -5, sanity: -5, power: 0 } },
      { label: 'B', text: '先把王磊带到安全地方', next: 88, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '寻找赵远，他知道真相', next: 27, delta: { oxygen: -8, sanity: -5, power: 0 } },
    ],
  },
  {
    id: 90,
    text: '王磊虽然虚弱，但他有工程背景，知道如何关闭阀门。\n\n你支撑着他，让他完成了这个任务。\n\n阀门关闭了，进水停止了。\n\n"我们做到了，"王磊虚弱地笑着说。',
    choices: [
      { label: 'A', text: '和王磊一起回到苏晴那里', next: 88, delta: { oxygen: -8, sanity: 10, power: 0 } },
      { label: 'B', text: '询问王磊他知道什么', next: 89, delta: { oxygen: -5, sanity: 5, power: 0 } },
      { label: 'C', text: '继续前进，寻找赵远', next: 27, delta: { oxygen: -8, sanity: 5, power: 0 } },
    ],
  },
  {
    id: 91,
    text: '你先把王磊带到了一个相对安全的地方，然后回去关闭了阀门。\n\n这多花了一些时间，但王磊是安全的。\n\n当你回来时，王磊已经恢复了一些意识。\n\n"谢谢你，"他说，"你本可以不管我的。"',
    choices: [
      { label: 'A', text: '"我不会抛下任何人的。"和他一起继续前进', next: 88, delta: { oxygen: -10, sanity: 10, power: 0 } },
      { label: 'B', text: '询问他知道什么', next: 89, delta: { oxygen: -8, sanity: 5, power: 0 } },
      { label: 'C', text: '寻找苏晴，汇合', next: 71, delta: { oxygen: -8, sanity: 8, power: 0 } },
    ],
  },
  {
    id: 92,
    text: '你们三人短暂休息，恢复了一些体力。\n\n在这段时间里，你们分享了各自掌握的信息，拼凑出了事件的全貌。\n\n"我们需要找到赵远，"苏晴说，"他是解锁上浮舱的关键。"\n\n"但我们也需要小心李明，"王磊说，"他还在研究站里。"',
    choices: [
      { label: 'A', text: '先找到赵远', next: 27, delta: { oxygen: -5, sanity: 10, power: 0 } },
      { label: 'B', text: '先找到李明，阻止他', next: 83, delta: { oxygen: -8, sanity: 5, power: 0 } },
      { label: 'C', text: '先找到林海，四人一起行动', next: 71, delta: { oxygen: -5, sanity: 10, power: 0 } },
    ],
  },
  {
    id: 93,
    text: '四个人聚在一起，讨论逃生计划。\n\n你们列出了所有可能的逃生方式，分析了各自的优劣。\n\n最终，你们达成了共识：需要找到赵远，让他解锁紧急上浮舱。\n\n"一起行动，"苏晴说，"我们谁都不落下。"',
    choices: [
      { label: 'A', text: '一起前往D区，寻找赵远', next: 27, delta: { oxygen: -8, sanity: 15, power: 0 } },
      { label: 'B', text: '先分工，有人去找赵远，有人准备逃生', next: 101, delta: { oxygen: -5, sanity: 10, power: 0 } },
      { label: 'C', text: '先处理李明，再逃生', next: 83, delta: { oxygen: -8, sanity: 10, power: 0 } },
    ],
  },
  {
    id: 94,
    text: '你们分享了各自掌握的信息，拼凑出了事件的全貌。\n\n这是一个精心策划的阴谋，目的是销毁X-7计划的证据和所有知情者。\n\n"我们不仅要逃出去，"你说，"我们还要让真相大白于天下。"\n\n所有人都点了点头。',
    choices: [
      { label: 'A', text: '讨论如何将证据带出去', next: 93, delta: { oxygen: -5, sanity: 10, power: 0 } },
      { label: 'B', text: '立即行动，寻找赵远', next: 27, delta: { oxygen: -8, sanity: 10, power: 0 } },
      { label: 'C', text: '先联系外界，传出证据', next: 52, delta: { oxygen: -8, sanity: 10, power: -10 } },
    ],
  },
  {
    id: 95,
    text: '你帮助赵远站起来，扶着他一起行动。\n\n"你不必这样，"他说，"我已经……"\n\n"没有人被落下，"你说，"我们一起出去。"\n\n赵远看着你，眼中充满了感激。\n\n你们一起前往上浮舱，赵远完成了生物识别，解锁了系统。\n\n所有幸存者都进入了上浮舱，开始上升。',
    end: true,
    endType: 'good',
    endingId: 'together',
  },
  {
    id: 96,
    text: '你扶着赵远走向控制台。\n\n他的手颤抖着，但最终完成了生物识别。\n\n"上浮舱……解锁了，"他虚弱地说，"快去……带上所有人……"\n\n你扶着他，同时大声呼唤其他幸存者。\n\n所有人聚集在上浮舱前，准备逃生。',
    choices: [
      { label: 'A', text: '所有人一起进入上浮舱', next: 102, delta: { oxygen: -5, sanity: 10, power: -5 } },
      { label: 'B', text: '先让伤员和赵远进入，你最后进', next: 103, delta: { oxygen: -5, sanity: 15, power: -5 } },
      { label: 'C', text: '先确认李明的位置，再逃生', next: 104, delta: { oxygen: -8, sanity: 5, power: -5 } },
    ],
  },
  {
    id: 97,
    text: '"为什么？"你质问李明，"为什么要这样做？"\n\n他苦笑了一下："钱，陈深。这个世界上，什么都可以用钱买到。"\n\n"但人命呢？"\n\n他沉默了，然后说："我也不想……但我没有选择。"\n\n你看着他，感到一种复杂的情绪。',
    choices: [
      { label: 'A', text: '告诉他还有机会弥补，请他帮助你们逃生', next: 105, delta: { oxygen: -3, sanity: -5, power: 0 } },
      { label: 'B', text: '不相信他，控制住他', next: 106, delta: { oxygen: -5, sanity: -5, power: 0 } },
      { label: 'C', text: '告诉他证据已经传出去了，他无处可逃', next: 99, delta: { oxygen: -3, sanity: -3, power: 0 } },
    ],
  },
  {
    id: 98,
    text: '你冲上去，阻止李明销毁文件。\n\n两人发生了激烈的争夺。\n\n最终，你抢到了大部分文件，但李明趁机逃跑了。\n\n你看着手中的文件，这是揭露真相的关键证据。',
    choices: [
      { label: 'A', text: '保护好文件，寻找逃生方式', next: 63, delta: { oxygen: -8, sanity: -5, power: 0 } },
      { label: 'B', text: '追踪李明，阻止他造成更多破坏', next: 107, delta: { oxygen: -10, sanity: -8, power: 0 } },
      { label: 'C', text: '将文件传出去，然后找幸存者', next: 52, delta: { oxygen: -8, sanity: -5, power: -10 } },
    ],
  },
  {
    id: 99,
    text: '"证据已经传出去了，"你平静地说，"你无处可逃了。"\n\n李明愣了一下，然后他的肩膀垮了下来。\n\n"……那就这样吧。"\n\n他坐了下来，不再抵抗。\n\n"我可以告诉你逃生的方法，"他说，"作为……交换。"',
    choices: [
      { label: 'A', text: '接受他的提议，听他说', next: 108, delta: { oxygen: -3, sanity: 5, power: 0 } },
      { label: 'B', text: '不相信他，独立寻找逃生方式', next: 63, delta: { oxygen: -5, sanity: -3, power: 0 } },
      { label: 'C', text: '控制住他，带他一起行动', next: 106, delta: { oxygen: -5, sanity: 0, power: 0 } },
    ],
  },
  {
    id: 100,
    text: '你穿上潜水装备，进入了研究站的外部气闸。\n\n当气闸打开，深海的黑暗和压力扑面而来。\n\n你启动推进器，开始上升。\n\n在黑暗中，你只能依靠仪器判断方向。\n\n三千米的上升，每一秒都是考验。\n\n最终，你看到了光——海面的光。\n\n你活下来了，但你是独自一人。',
    end: true,
    endType: 'neutral',
    endingId: 'alone',
  },
  {
    id: 101,
    text: '你们分工行动：你和苏晴去找赵远，林海和王磊留在原地，准备逃生物资。\n\n在指挥中心，你们找到了赵远。\n\n他解锁了上浮舱，然后告诉你们："快去，我来断后。"\n\n"不，"苏晴说，"我们一起走。"',
    choices: [
      { label: 'A', text: '坚持让赵远一起走', next: 95, delta: { oxygen: -8, sanity: 10, power: -5 } },
      { label: 'B', text: '尊重他的决定，快速撤离', next: 109, delta: { oxygen: -5, sanity: -5, power: -5 } },
      { label: 'C', text: '先处理李明，再一起走', next: 83, delta: { oxygen: -8, sanity: 5, power: -5 } },
    ],
  },
  {
    id: 102,
    text: '所有人进入了上浮舱。\n\n舱门关闭，上浮程序启动。\n\n随着舱体开始上升，你透过舷窗看着研究站慢慢消失在黑暗中。\n\n你们活下来了。\n\n在海面上，等待着你们的，是国际海洋研究委员会派来的船只。\n\n真相，终将大白于天下。',
    end: true,
    endType: 'good',
    endingId: 'together',
  },
  {
    id: 103,
    text: '你让伤员和赵远先进入上浮舱，自己最后进入。\n\n当所有人都安全进入后，你最后一个跨进了舱门。\n\n舱门关闭，上浮程序启动。\n\n你们一起上升，离开了那个黑暗的深渊。\n\n在海面上，阳光刺破了你的眼睛，那是你见过的最美丽的光。',
    end: true,
    endType: 'good',
    endingId: 'together',
  },
  {
    id: 104,
    text: '你先去确认了李明的位置——他已经不见了。\n\n你无法确定他是否会在逃生过程中造成破坏。\n\n但你没有时间再找他了。\n\n你回到上浮舱，所有人一起进入，开始上升。\n\n你们活下来了，而李明的下落，成为了一个谜。',
    end: true,
    endType: 'good',
    endingId: 'together',
  },
  {
    id: 105,
    text: '李明犹豫了很久，然后点了点头。\n\n"上浮舱在F区，有一个备用的，可以容纳六个人，"他说，"我来帮你们。"\n\n你不确定是否应该相信他，但你没有更好的选择。\n\n最终，在李明的帮助下，你们找到了备用上浮舱，所有幸存者都安全逃出。\n\n李明也随之逃出，但在海面上，他被等待的当局逮捕了。\n\n他选择了自首，提供了所有同谋的信息。\n\n有时候，人在最后关头，还是会做出正确的选择。',
    end: true,
    endType: 'secret',
    endingId: 'redemption',
  },
  {
    id: 106,
    text: '你控制住了李明，带着他一起行动。\n\n他没有抵抗——也许他也知道，这是他唯一的出路。\n\n在他的配合下，你们找到了所有幸存者，并利用他的权限解锁了上浮舱。\n\n所有人安全逃出。\n\n李明在海面上被当局逮捕，他的供词成为了揭露阴谋的关键证据。',
    end: true,
    endType: 'good',
    endingId: 'together',
  },
  {
    id: 107,
    text: '你追踪李明，在研究站的深处找到了他。\n\n他正在试图启动一个自毁程序，要彻底销毁所有证据。\n\n"李明，停下！"\n\n他转过身，看到你，眼中闪过一丝复杂的情绪。\n\n然后，他停下了手。\n\n"……算了，"他说，"我已经厌倦了。"',
    choices: [
      { label: 'A', text: '告诉他还有机会弥补', next: 105, delta: { oxygen: -5, sanity: -5, power: 0 } },
      { label: 'B', text: '控制住他，带他一起逃生', next: 106, delta: { oxygen: -5, sanity: 0, power: 0 } },
      { label: 'C', text: '让他独自面对自己的选择', next: 110, delta: { oxygen: -3, sanity: -5, power: 0 } },
    ],
  },
  {
    id: 108,
    text: '李明告诉你，研究站的F区有一个备用上浮舱，可以容纳六个人，是他们为自己准备的逃生工具。\n\n"你们可以用它，"他说，"我……我来帮你们。"\n\n你不确定是否应该相信他，但你没有更好的选择。\n\n最终，在李明的帮助下，所有幸存者都安全逃出。',
    end: true,
    endType: 'secret',
    endingId: 'redemption',
  },
  {
    id: 109,
    text: '你尊重了赵远的决定，带着其他人快速撤离。\n\n在上浮的过程中，你透过舷窗看到了研究站最后的光芒。\n\n你不知道赵远最终的命运。\n\n但你带着他留下的证据，活着逃出来了。\n\n在海面上，你将证据交给了国际海洋研究委员会。\n\n赵远的牺牲，没有白费。',
    end: true,
    endType: 'sacrifice',
    endingId: 'sacrifice',
  },
  {
    id: 110,
    text: '你让李明独自面对自己的选择。\n\n你回去找到了其他幸存者，利用你掌握的信息，找到了逃生的方法。\n\n所有人安全逃出。\n\n李明的下落，无人知晓。\n\n也许他选择了留下，也许他找到了自己的出路。\n\n有些事，你无法控制，也无需控制。',
    end: true,
    endType: 'neutral',
    endingId: 'alone',
  },
];

export const DEEP_SEA_INITIAL_STATS = {
  oxygen: 100,
  sanity: 100,
  power: 100,
};
