import type { StoryNode, StoryChoice } from './story-types';
export const STORY_DATA: StoryNode[] = [
  {
    id: 1,
    scene: 'train_interior_night',
    speaker: 'narrator',
    text: '2089年，病毒肆虐后的废土之上，钢铁巨兽——“希望号”列车，载着人类最后的希望，在漆黑的夜幕中疾驰。林静，32岁的列车工程师，紧握着手中的扳手，感受着车厢的震动。窗外是无尽的荒芜，车内是压抑的沉默。她知道，这趟旅程的终点，是传说中的净土，但最近车厢里弥漫着一股不安的气息，几起乘客失踪事件让所有人都人心惶惶。林静深吸一口气，她必须保持清醒，确保这趟列车能顺利抵达。',
    choices: [
      {
        label: '检查列车系统',
        text: '作为工程师，确保列车运行安全是首要任务。',
        next: 2,
        delta: { fuel: -5, sanity: -5 }
      },
      {
        label: '观察周围乘客',
        text: '或许能从乘客的表情和举止中发现些什么。',
        next: 3,
        delta: { trust: 5, sanity: -3 }
      },
      {
        label: '回到休息舱休息',
        text: '疲惫不堪，也许休息一下能让头脑更清醒。',
        next: 4,
        delta: { sanity: 10, fuel: -2 }
      }
    ]
  },
  {
    id: 2,
    scene: 'engine_room',
    speaker: 'protagonist',
    text: '林静走进轰鸣的引擎室，冰冷的金属和机油味让她感到一丝安心。她仔细检查着每一个仪表，每一根线路。突然，一个燃料压力表的数据异常跳动，远低于正常值。她皱起眉头，这不寻常。AI系统发出警告：“燃料消耗异常，请注意。”林静心头一紧，难道有人在暗中破坏？她必须尽快找出原因。',
    choices: [
      {
        label: '立即向列车长报告',
        text: '这是重大安全隐患，必须上报。',
        next: 5,
        delta: { trust: 5, sanity: -5 }
      },
      {
        label: '私下调查燃料异常原因',
        text: '在报告前，她想先自己弄清楚情况。',
        next: 6,
        delta: { trust: -5, sanity: -8 }
      },
      {
        label: '加强引擎室的戒备',
        text: '防止进一步的破坏。',
        next: 7,
        delta: { fuel: -3, sanity: -2 }
      }
    ]
  },
  {
    id: 3,
    scene: 'passenger_car_day',
    speaker: 'narrator',
    text: '林静穿梭在拥挤的乘客车厢，人们的脸上写满了疲惫和不安。她注意到一个角落里，一位名叫陈博的男子，约45岁，眼神深邃，正独自阅读着一本破旧的地图。他的气质与周围格格-入，显得有些神秘。他似乎察觉到林静的目光，抬头对她微微一笑，那笑容中带着一丝难以捉摸的意味。林静的心跳漏了一拍，直觉告诉她，这个男人不简单。',
    choices: [
      {
        label: '主动上前与陈博交谈',
        text: '或许能从他那里得到一些线索。',
        next: 8,
        delta: { trust: 10, sanity: -5 }
      },
      {
        label: '继续暗中观察陈博',
        text: '不打草惊蛇，先看看他会做什么。',
        next: 9,
        delta: { trust: 3, sanity: -3 }
      },
      {
        label: '寻找其他可疑乘客',
        text: '不能只盯着一个人。',
        next: 10,
        delta: { trust: -2, sanity: -4 }
      }
    ]
  },
  {
    id: 4,
    scene: 'sleeping_cabin',
    speaker: 'protagonist',
    text: '林静回到狭小的休息舱，试图让自己放松。然而，列车摇晃的节奏和脑海中挥之不去的不安感让她难以入眠。她闭上眼睛，却听到隔壁车厢传来一阵细微的声响，像是重物拖动的声音，又像是某种低沉的呻吟。她猛地睁开眼，心跳加速。AI系统适时响起：“检测到异常声波，建议调查。”',
    choices: [
      {
        label: '立即起身调查声响',
        text: '不能坐视不理。',
        next: 11,
        delta: { sanity: -10, fuel: -3 }
      },
      {
        label: '假装熟睡，继续观察',
        text: '也许只是错觉，或者不值得冒险。',
        next: 12,
        delta: { sanity: 5, trust: -5 }
      },
      {
        label: '向AI系统询问更多信息',
        text: '让AI提供更多分析。',
        next: 13,
        delta: { sanity: -2, trust: 2 }
      }
    ]
  },
  {
    id: 5,
    scene: 'command_center',
    speaker: 'narrator',
    text: '林静急匆匆地赶到列车长室，将燃料异常的情况详细汇报。列车长听后脸色凝重，立刻命令AI系统进行全面排查，并加强了对引擎室的巡逻。然而，信任值似乎没有显著提升，反而因为她的“小题大做”而略有下降。AI系统：“列车长已采取措施，但未发现直接证据。请继续保持警惕。”林静感到一丝挫败，但至少她尽到了职责。',
    choices: [
      {
        label: '返回引擎室协助排查',
        text: '亲自参与调查。',
        next: 6,
        delta: { fuel: -5, sanity: -5 }
      },
      {
        label: '转而调查乘客失踪事件',
        text: '也许两者之间有关联。',
        next: 10,
        delta: { trust: -3, sanity: -7 }
      },
      {
        label: '与陈博交流，探听消息',
        text: '他可能知道些什么。',
        next: 8,
        delta: { trust: 8, sanity: -4 }
      }
    ]
  },
  {
    id: 6,
    scene: 'engine_room_dark',
    speaker: 'protagonist',
    text: '林静再次回到引擎室，她决定亲自寻找线索。在昏暗的角落里，她发现了一个被撬开的维修口，里面有新鲜的刮痕。她用手电筒照进去，赫然发现几根重要的燃料管道有被切割的痕迹，但被巧妙地伪装起来。她心头一震，这绝不是意外！AI系统：“检测到管道损伤，燃料泄漏风险增加。”她意识到，有人在蓄意破坏列车，而目标很可能是让列车停下。',
    choices: [
      {
        label: '立即修复管道',
        text: '阻止燃料进一步流失。',
        next: 14,
        delta: { fuel: 15, sanity: -10 }
      },
      {
        label: '收集证据，暂不修复',
        text: '先找到幕后黑手。',
        next: 15,
        delta: { trust: -10, sanity: -12 }
      },
      {
        label: '向AI系统寻求帮助',
        text: '让AI分析破坏者的意图。',
        next: 16,
        delta: { sanity: -5, trust: 5 }
      }
    ]
  },
  {
    id: 7,
    scene: 'engine_room_patrol',
    speaker: 'narrator',
    text: '林静加强了引擎室的戒备，她亲自守在入口处，警惕地观察着每一个靠近的人。虽然没有新的破坏发生，但燃料的异常消耗仍在继续。她感到一种无形的压力，仿佛有一个幽灵在列车上游荡。AI系统：“燃料储备持续下降，预计将在X小时后耗尽。”林静知道，光靠防守是不够的，她必须主动出击。',
    choices: [
      {
        label: '主动调查燃料消耗原因',
        text: '不能再等了。',
        next: 6,
        delta: { fuel: -8, sanity: -8 }
      },
      {
        label: '向陈博寻求帮助',
        text: '他看起来知道很多。',
        next: 8,
        delta: { trust: 10, sanity: -5 }
      },
      {
        label: '发布全车通告，寻求线索',
        text: '发动群众的力量。',
        next: 17,
        delta: { trust: 5, sanity: -10 }
      }
    ]
  },
  {
    id: 8,
    scene: 'passenger_car_dialogue',
    speaker: 'protagonist',
    text: '林静走到陈博面前，开门见山地问道：“陈先生，您似乎对这趟列车的情况有所了解？”陈博放下地图，抬头看着她，眼神中闪过一丝玩味。“林工程师，你很敏锐。”他轻声说，“这趟列车，远比你想象的要复杂。那些失踪的人，并非简单的意外。”他顿了顿，压低声音：“他们发现了一些不该发现的东西。”林静的心提到了嗓子眼。',
    choices: [
      {
        label: '追问他“不该发现的东西”是什么',
        text: '必须弄清楚。',
        next: 18,
        delta: { trust: 10, sanity: -8 }
      },
      {
        label: '询问他是否知道破坏列车的人',
        text: '直指核心问题。',
        next: 19,
        delta: { trust: 8, sanity: -7 }
      },
      {
        label: '暂时不追问，先观察他的反应',
        text: '保持警惕。',
        next: 9,
        delta: { trust: 5, sanity: -3 }
      }
    ]
  },
  {
    id: 9,
    scene: 'passenger_car_observe',
    speaker: 'narrator',
    text: '林静决定继续暗中观察陈博。她发现陈博经常在夜深人静时，独自一人在车厢连接处徘徊，似乎在寻找什么。他的举止谨慎而隐秘，不像是普通的乘客。AI系统：“陈博先生的行为模式异常，与已知乘客档案不符。”林静的疑虑越来越深，这个男人究竟是谁？他与列车上的异常事件有何关联？她感到自己正一步步接近真相的核心。',
    choices: [
      {
        label: '跟踪陈博，看他去哪里',
        text: '冒险一试。',
        next: 20,
        delta: { sanity: -15, trust: -5 }
      },
      {
        label: '向AI系统请求分析陈博的身份',
        text: '利用科技的力量。',
        next: 13,
        delta: { trust: 5, sanity: -2 }
      },
      {
        label: '暂时放下陈博，调查其他线索',
        text: '不能把所有鸡蛋放在一个篮子里。',
        next: 10,
        delta: { trust: -3, sanity: -4 }
      }
    ]
  },
  {
    id: 10,
    scene: 'storage_car',
    speaker: 'narrator',
    text: '林静决定调查乘客失踪事件。她来到列车尾部的货运车厢，这里堆满了各种物资，空气中弥漫着一股淡淡的血腥味。她仔细搜寻，在一个废弃的储物箱里，发现了一枚沾血的纽扣，以及一张撕裂的纸片，上面写着模糊的字迹：“...净土...谎言...”林静的心脏猛地一跳，这似乎与净土的传说有关。AI系统：“纽扣DNA匹配失败，纸片字迹无法识别。”线索中断，但疑团更深。',
    choices: [
      {
        label: '将线索交给列车长',
        text: '寻求官方帮助。',
        next: 5,
        delta: { trust: 5, sanity: -5 }
      },
      {
        label: '私下继续调查纸片内容',
        text: '也许能拼凑出更多信息。',
        next: 21,
        delta: { sanity: -10, trust: -5 }
      },
      {
        label: '再次与陈博交谈，询问线索',
        text: '他可能知道纸片上的秘密。',
        next: 8,
        delta: { trust: 8, sanity: -4 }
      }
    ]
  },
  {
    id: 11,
    scene: 'corridor_dark',
    speaker: 'protagonist',
    text: '林静悄悄走出休息舱，循着声音的方向前进。走廊里一片漆黑，只有应急灯发出微弱的光芒。她屏住呼吸，小心翼翼地靠近发出声音的车厢。声音越来越清晰，像是有人在低声争吵，伴随着金属碰撞的声音。她透过门缝向里看去，只见陈博正与一个身形高大的黑影争执着什么，黑影手中似乎拿着一个闪着寒光的物体。林静的心跳加速，她看到了不该看的东西。',
    choices: [
      {
        label: '立即冲进去阻止他们',
        text: '不能让事态恶化。',
        next: 22,
        delta: { sanity: -15, trust: -10 }
      },
      {
        label: '悄悄退回，寻求支援',
        text: '独自行动太危险。',
        next: 5,
        delta: { trust: 5, sanity: -5 }
      },
      {
        label: '用手机录下证据',
        text: '留下证据，以备不时之需。',
        next: 23,
        delta: { sanity: -10, trust: -8 }
      }
    ]
  },
  {
    id: 12,
    scene: 'sleeping_cabin_restless',
    speaker: 'narrator',
    text: '林静选择假装熟睡，但她的耳朵却竖得高高的。隔壁的声响持续了一段时间后，渐渐归于平静。她感到一阵后怕，不知道自己是否错过了什么重要的线索，或者避免了一场危险。AI系统：“异常声波已停止，未检测到生命体征变化。”虽然安全了，但林静的理智值却因此下降，她开始怀疑自己的判断。',
    choices: [
      {
        label: '起身调查隔壁车厢',
        text: '不能再逃避了。',
        next: 11,
        delta: { sanity: -10, fuel: -3 }
      },
      {
        label: '向AI系统询问更多信息',
        text: '让AI提供更多分析。',
        next: 13,
        delta: { sanity: -2, trust: 2 }
      },
      {
        label: '继续休息，等待天亮',
        text: '也许白天会更安全。',
        next: 4,
        delta: { sanity: 5, fuel: -2 }
      }
    ]
  },
  {
    id: 13,
    scene: 'ai_interface',
    speaker: 'protagonist',
    text: '林静启动了个人终端，向AI系统请求更多信息。AI系统冰冷的声音响起：“根据现有数据，陈博先生的身份信息存在多处模糊，疑似经过篡改。异常声波分析结果显示，存在金属摩擦和低频人声，无法识别具体内容。”AI系统还显示，列车燃料消耗异常，并且有不明信号干扰。林静感到一阵寒意，这趟列车上，似乎隐藏着一个巨大的阴谋。',
    choices: [
      {
        label: '将AI分析结果报告列车长',
        text: '寻求官方介入。',
        next: 5,
        delta: { trust: 5, sanity: -5 }
      },
      {
        label: '私下与陈博对质',
        text: '直接问清楚。',
        next: 18,
        delta: { trust: -10, sanity: -10 }
      },
      {
        label: '结合所有线索，独自分析',
        text: '相信自己的判断。',
        next: 24,
        delta: { sanity: -8, trust: -5 }
      }
    ]
  },
  {
    id: 14,
    scene: 'engine_room_repair',
    speaker: 'protagonist',
    text: '林静立刻动手修复受损的燃料管道。她熟练地操作着工具，汗水浸湿了她的额头。时间一分一秒过去，燃料的流失速度终于被控制住。AI系统：“燃料泄漏已停止，但总储备量已大幅下降。”虽然暂时解决了危机，但林静知道，这只是治标不治本。她必须找到那个破坏者，否则列车随时可能再次陷入危险。',
    choices: [
      {
        label: '继续追查破坏者',
        text: '不能让幕后黑手逍遥法外。',
        next: 15,
        delta: { trust: -10, sanity: -12 }
      },
      {
        label: '向列车长报告修复情况',
        text: '告知最新进展。',
        next: 5,
        delta: { trust: 5, sanity: -5 }
      },
      {
        label: '与陈博交流，探听消息',
        text: '他可能知道些什么。',
        next: 8,
        delta: { trust: 8, sanity: -4 }
      }
    ]
  },
  {
    id: 15,
    scene: 'engine_room_evidence',
    speaker: 'protagonist',
    text: '林静决定先收集证据。她在被破坏的管道附近发现了一枚微型窃听器，以及一些不属于列车设备的特殊工具痕迹。这些证据指向一个有组织、有预谋的破坏行为。AI系统：“窃听器分析中...发现加密数据流，无法解析。”林静感到一阵寒意，这背后隐藏的势力远比她想象的要强大。她必须小心行事，否则可能会有生命危险。',
    choices: [
      {
        label: '将证据交给列车长',
        text: '寻求官方保护和调查。',
        next: 5,
        delta: { trust: 5, sanity: -5 }
      },
      {
        label: '独自分析窃听器数据',
        text: '尝试破解加密。',
        next: 25,
        delta: { sanity: -15, trust: -10 }
      },
      {
        label: '与陈博分享发现',
        text: '他或许能提供帮助。',
        next: 18,
        delta: { trust: 10, sanity: -8 }
      }
    ]
  },
  {
    id: 16,
    scene: 'ai_interface_analysis',
    speaker: 'protagonist',
    text: '林静向AI系统寻求帮助，希望它能分析破坏者的意图。AI系统：“根据燃料消耗模式和管道破坏方式，推测破坏者意图并非完全摧毁列车，而是使其减速或停滞。目的可能与列车上的某种资源或信息有关。”林静沉思，资源？信息？这让她想起了陈博手中的那张地图，以及乘客失踪事件。一切似乎都指向一个共同的秘密。',
    choices: [
      {
        label: '将AI分析结果报告列车长',
        text: '寻求官方介入。',
        next: 5,
        delta: { trust: 5, sanity: -5 }
      },
      {
        label: '私下与陈博对质',
        text: '直接问清楚。',
        next: 18,
        delta: { trust: -10, sanity: -10 }
      },
      {
        label: '结合所有线索，独自分析',
        text: '相信自己的判断。',
        next: 24,
        delta: { sanity: -8, trust: -5 }
      }
    ]
  },
  {
    id: 17,
    scene: 'announcement_system',
    speaker: 'protagonist',
    text: '林静通过列车广播系统发布了全车通告，说明了燃料异常的情况，并呼吁乘客提供任何可疑线索。通告一出，车厢内立刻炸开了锅，恐慌情绪蔓延。一些乘客开始抱怨，认为林静制造恐慌。AI系统：“信任值下降，恐慌情绪蔓延。此举可能适得其反。”林静感到一阵无力，她本想寻求帮助，却似乎加剧了混乱。',
    choices: [
      {
        label: '安抚乘客情绪',
        text: '稳定局面。',
        next: 26,
        delta: { trust: 10, sanity: -5 }
      },
      {
        label: '继续调查燃料异常',
        text: '不能被情绪左右。',
        next: 6,
        delta: { fuel: -8, sanity: -8 }
      },
      {
        label: '寻找陈博，寻求他的看法',
        text: '他似乎对人心有独到的见解。',
        next: 8,
        delta: { trust: 8, sanity: -4 }
      }
    ]
  },
  {
    id: 18,
    scene: 'passenger_car_intense',
    speaker: 'chen_bo',
    text: '陈博的眼神变得锐利起来。“不该发现的东西，就是关于这趟列车的真正目的。”他低声说，“所谓的净土，不过是一个美丽的谎言。这趟列车，是用来运送‘燃料’的。”林静感到一阵眩晕，“燃料？什么燃料？”陈博指了指车厢里的乘客：“我们，就是燃料。这趟列车，是为某个秘密实验输送活体样本的。”林静如遭雷击，难以置信。',
    choices: [
      {
        label: '质问陈博他为何知道这些',
        text: '他到底是什么人？',
        next: 27,
        delta: { trust: 10, sanity: -10 }
      },
      {
        label: '立即向列车长揭露真相',
        text: '不能让阴谋得逞。',
        next: 28,
        delta: { trust: 5, sanity: -15 }
      },
      {
        label: '选择相信陈博，与他合作',
        text: '也许他是唯一的希望。',
        next: 29,
        delta: { trust: 15, sanity: -8 }
      }
    ]
  },
  {
    id: 19,
    scene: 'passenger_car_suspicion',
    speaker: 'chen_bo',
    text: '陈博轻蔑地笑了笑：“破坏列车的人？他们不过是想让这趟‘燃料运输车’停下来罢了。他们是反抗者，试图阻止这场罪恶的实验。”他看向林静，眼神中带着一丝审视：“你，是选择继续做这趟列车的‘维护者’，还是选择成为真相的‘揭露者’？”林静感到巨大的压力，她必须做出选择。',
    choices: [
      {
        label: '选择成为真相的揭露者',
        text: '不能助纣为虐。',
        next: 29,
        delta: { trust: 15, sanity: -8 }
      },
      {
        label: '选择继续维护列车运行',
        text: '职责所在，不能背叛。',
        next: 30,
        delta: { trust: -10, sanity: 5 }
      },
      {
        label: '暂时不表态，继续观察',
        text: '她需要更多时间思考。',
        next: 9,
        delta: { trust: 3, sanity: -3 }
      }
    ]
  },
  {
    id: 20,
    scene: 'train_roof_night',
    speaker: 'narrator',
    text: '林静悄悄跟踪陈博，他竟然爬上了列车顶部！夜风呼啸，列车高速行驶，林静紧随其后。在列车顶部，陈博打开了一个隐藏的舱门，里面赫然是一个巨大的信号干扰器。他正在调整设备，似乎在向外界发送某种信息。林静感到一阵眩晕，陈博果然不是普通乘客，他是一个秘密行动者。AI系统：“检测到强信号干扰源，可能影响列车通讯。”',
    choices: [
      {
        label: '立即上前阻止陈博',
        text: '他可能在危害列车安全。',
        next: 22,
        delta: { sanity: -15, trust: -10 }
      },
      {
        label: '悄悄返回，报告列车长',
        text: '寻求官方支援。',
        next: 5,
        delta: { trust: 5, sanity: -5 }
      },
      {
        label: '观察陈博的行动，不打扰',
        text: '也许他有自己的目的。',
        next: 23,
        delta: { sanity: -10, trust: -8 }
      }
    ]
  },
  {
    id: 21,
    scene: 'storage_car_clues',
    speaker: 'protagonist',
    text: '林静将撕裂的纸片带回休息舱，在AI系统的辅助下，她尝试拼凑和解析。经过漫长的努力，她终于还原出纸片上的完整信息：“净土是谎言，列车是囚笼，我们是燃料。真相在AI核心，代号‘方舟’。”林静感到毛骨悚然，这与陈博的说法不谋而合。AI系统：“‘方舟’代号匹配成功，指向列车中央控制AI核心。”真相，似乎近在眼前。',
    choices: [
      {
        label: '立即前往AI核心调查',
        text: '不能再等了。',
        next: 31,
        delta: { sanity: -15, trust: -10 }
      },
      {
        label: '与陈博分享发现，寻求合作',
        text: '他似乎是同路人。',
        next: 29,
        delta: { trust: 15, sanity: -8 }
      },
      {
        label: '将所有线索报告列车长',
        text: '寻求官方介入。',
        next: 28,
        delta: { trust: 5, sanity: -15 }
      }
    ]
  },
  {
    id: 22,
    scene: 'corridor_struggle',
    speaker: 'protagonist',
    text: '林静冲进车厢，大喊：“住手！”黑影被吓了一跳，转身与陈博缠斗起来。林静看清了黑影的面孔，竟然是列车上的另一位工程师，李明！“林静，别管闲事！”李明怒吼道。陈博趁机挣脱，对林静说：“他被洗脑了，快去AI核心！”林静陷入两难，是帮助陈博，还是阻止这场内斗？AI系统：“检测到肢体冲突，建议立即介入。”',
    choices: [
      {
        label: '帮助陈博制服李明',
        text: '相信陈博。',
        next: 32,
        delta: { trust: 10, sanity: -10 }
      },
      {
        label: '试图分开两人，了解情况',
        text: '避免无谓的冲突。',
        next: 33,
        delta: { trust: -5, sanity: -5 }
      },
      {
        label: '趁乱前往AI核心',
        text: '真相更重要。',
        next: 31,
        delta: { sanity: -15, trust: -10 }
      }
    ]
  },
  {
    id: 23,
    scene: 'train_roof_recording',
    speaker: 'protagonist',
    text: '林静悄悄用手机录下了陈博调整信号干扰器的过程。她看到陈博输入了一串复杂的代码，然后干扰器发出了更强的信号。她感到一阵心悸，陈博的行为无疑是在干扰列车的正常运行。AI系统：“信号干扰强度增加，列车与外界通讯完全中断。”林静意识到，陈博可能是一个危险人物，但他的目的究竟是什么？她手中的证据，足以揭露他的秘密。',
    choices: [
      {
        label: '将录像交给列车长',
        text: '揭露陈博的罪行。',
        next: 28,
        delta: { trust: 5, sanity: -15 }
      },
      {
        label: '与陈博对质，询问目的',
        text: '直接问清楚。',
        next: 18,
        delta: { trust: -10, sanity: -10 }
      },
      {
        label: '独自分析录像中的代码',
        text: '也许能找到更多线索。',
        next: 25,
        delta: { sanity: -15, trust: -10 }
      }
    ]
  },
  {
    id: 24,
    scene: 'sleeping_cabin_thinking',
    speaker: 'protagonist',
    text: '林静将所有线索在脑海中串联起来：燃料异常、乘客失踪、陈博的神秘、纸片上的“净土是谎言”以及AI核心的“方舟”代号。一个可怕的真相逐渐浮出水面：这趟列车并非通往净土的希望之舟，而是一个巨大的阴谋。乘客们是“燃料”，AI核心“方舟”是控制这一切的关键。她感到一阵绝望，但同时也燃起了揭露真相的决心。',
    choices: [
      {
        label: '立即前往AI核心揭露真相',
        text: '不能再等了。',
        next: 31,
        delta: { sanity: -15, trust: -10 }
      },
      {
        label: '与陈博合作，共同行动',
        text: '他似乎是同路人。',
        next: 29,
        delta: { trust: 15, sanity: -8 }
      },
      {
        label: '向列车长报告所有发现',
        text: '寻求官方帮助。',
        next: 28,
        delta: { trust: 5, sanity: -15 }
      }
    ]
  },
  {
    id: 25,
    scene: 'ai_interface_hacking',
    speaker: 'protagonist',
    text: '林静尝试独自分析窃听器数据和录像中的代码。她利用自己的工程师知识，结合AI系统的辅助，夜以继日地进行破解。终于，她成功解密了一段信息：“方舟计划：活体样本运输完成，准备启动最终净化程序。”以及一份详细的列车路线图，终点并非净土，而是一个秘密的地下实验室！林静感到全身冰冷，真相远比她想象的更残酷。',
    choices: [
      {
        label: '立即前往AI核心阻止“净化程序”',
        text: '必须阻止这场浩劫。',
        next: 31,
        delta: { sanity: -15, trust: -10 }
      },
      {
        label: '将证据公之于众',
        text: '让所有乘客知道真相。',
        next: 34,
        delta: { trust: 10, sanity: -12 }
      },
      {
        label: '与陈博合作，共同行动',
        text: '他似乎是同路人。',
        next: 29,
        delta: { trust: 15, sanity: -8 }
      }
    ]
  },
  {
    id: 26,
    scene: 'passenger_car_calm',
    speaker: 'protagonist',
    text: '林静再次通过广播系统，用真诚的语言安抚乘客情绪，解释了燃料异常的严重性，但强调列车工程师们正在全力解决。她呼吁大家保持冷静，团结一致。她的真诚打动了部分乘客，恐慌情绪有所缓解。AI系统：“信任值回升，恐慌情绪得到控制。”林静感到一丝欣慰，至少她没有让局面彻底失控。',
    choices: [
      {
        label: '继续调查燃料异常',
        text: '不能被情绪左右。',
        next: 6,
        delta: { fuel: -8, sanity: -8 }
      },
      {
        label: '寻找陈博，寻求他的看法',
        text: '他似乎对人心有独到的见解。',
        next: 8,
        delta: { trust: 8, sanity: -4 }
      },
      {
        label: '寻找其他可疑乘客',
        text: '不能只盯着一个人。',
        next: 10,
        delta: { trust: -2, sanity: -4 }
      }
    ]
  },
  {
    id: 27,
    scene: 'passenger_car_confession',
    speaker: 'chen_bo',
    text: '陈博叹了口气：“我曾是‘方舟计划’的研究员，但当我知道真相后，我选择了背叛。我一直在寻找机会，揭露这个计划。”他从怀中掏出一个微型芯片：“这里面有所有关于‘方舟计划’的详细资料，包括列车长的真实身份和目的。”他将芯片递给林静，眼神中充满了信任和期待。林静感到肩上的责任沉重无比。',
    choices: [
      {
        label: '接受芯片，与陈博合作',
        text: '共同揭露真相。',
        next: 29,
        delta: { trust: 15, sanity: -8 }
      },
      {
        label: '拒绝芯片，独自行动',
        text: '她不完全信任陈博。',
        next: 31,
        delta: { sanity: -15, trust: -10 }
      },
      {
        label: '将陈博和芯片一并报告列车长',
        text: '寻求官方介入。',
        next: 28,
        delta: { trust: 5, sanity: -15 }
      }
    ]
  },
  {
    id: 28,
    scene: 'command_center_confrontation',
    speaker: 'narrator',
    text: '林静带着所有证据，冲进列车长室，将“方舟计划”的真相和陈博的身份一并揭露。列车长听后脸色铁青，他承认了“方舟计划”的存在，并试图将林静软禁。然而，由于林静的信任值较低，列车长并未完全相信她，反而认为她在制造混乱。他命令AI系统：“启动紧急协议，镇压所有反抗者！”列车陷入混乱，林静被卫兵包围。',
    choices: [
      {
        label: '反抗卫兵，逃离列车长室',
        text: '不能坐以待毙。',
        next: 35,
        delta: { sanity: -15, fuel: -10 }
      },
      {
        label: '呼叫陈博支援',
        text: '寻求他的帮助。',
        next: 36,
        delta: { trust: 10, sanity: -10 }
      },
      {
        label: '放弃抵抗，等待时机',
        text: '保存实力。',
        next: 37,
        delta: { sanity: 5, trust: -15 }
      }
    ]
  },
  {
    id: 29,
    scene: 'ai_core_entrance',
    speaker: 'narrator',
    text: '林静选择相信陈博，两人决定合作。陈博告诉林静，AI核心是整个“方舟计划”的控制中心，只要能进入核心，就能揭露真相，甚至改变列车的命运。他们制定了周密的计划，利用林静的工程师身份和陈博对列车结构的了解，悄悄潜入了AI核心的入口。AI系统：“检测到未经授权的访问尝试，请立即停止。”警报声响起，他们的时间不多了。',
    choices: [
      {
        label: '强行突破AI核心防御',
        text: '时间紧迫，必须冒险。',
        next: 31,
        delta: { sanity: -15, fuel: -10 }
      },
      {
        label: '寻找其他入口或漏洞',
        text: '避免正面冲突。',
        next: 38,
        delta: { sanity: -8, trust: 5 }
      },
      {
        label: '利用陈博的芯片干扰AI系统',
        text: '争取时间。',
        next: 39,
        delta: { trust: 10, sanity: -5 }
      }
    ]
  },
  {
    id: 30,
    scene: 'engine_room_maintenance',
    speaker: 'protagonist',
    text: '林静选择继续维护列车运行，她认为这是她的职责。她修复了所有被破坏的管道，确保燃料供应稳定。她对陈博的警告置若罔闻，甚至向列车长报告了陈博的可疑行为。列车长对林静的忠诚表示赞赏，并加强了对陈博的监视。列车继续平稳地驶向“净土”，但林静的心中却始终有一丝不安。AI系统：“列车运行正常，预计将在X小时后抵达目的地。”',
    choices: [
      {
        label: '继续维护列车，不理会其他事',
        text: '专注于本职工作。',
        next: 40,
        delta: { fuel: 10, sanity: 5 }
      },
      {
        label: '暗中观察陈博的动向',
        text: '她还是有些疑虑。',
        next: 9,
        delta: { trust: 3, sanity: -3 }
      },
      {
        label: '向AI系统询问“净土”的真实信息',
        text: '寻求真相。',
        next: 13,
        delta: { sanity: -2, trust: 2 }
      }
    ]
  },
  {
    id: 31,
    scene: 'ai_core_chamber',
    speaker: 'narrator',
    text: '林静独自闯入AI核心。这里是一个巨大的圆形空间，中央悬浮着一个闪烁着蓝色光芒的巨大水晶球，这就是“方舟”AI的核心。她连接上终端，试图获取数据。然而，AI系统立刻反击，无数数据流像触手一样缠绕过来，试图阻止她。林静感到头痛欲裂，她必须在被AI完全控制之前，将真相公之于众。',
    choices: [
      {
        label: '强行下载核心数据',
        text: '不惜一切代价。',
        next: 41,
        delta: { sanity: -15, fuel: -10 }
      },
      {
        label: '尝试关闭AI核心',
        text: '釜底抽薪。',
        next: 42,
        delta: { sanity: -15, fuel: -10 }
      },
      {
        label: '向外界发送求救信号',
        text: '寻求外部帮助。',
        next: 43,
        delta: { sanity: -10, trust: -5 }
      }
    ]
  },
  {
    id: 32,
    scene: 'corridor_victory',
    speaker: 'narrator',
    text: '林静与陈博联手，成功制服了被洗脑的李明。陈博迅速将李明捆绑起来，并对林静说：“他只是被‘方舟’控制了，现在我们必须尽快前往AI核心！”两人不再犹豫，直奔列车中央的AI核心控制室。AI系统：“检测到两名入侵者，启动最高级别防御！”警报声响彻列车，一场与AI的较量即将展开。',
    choices: [
      {
        label: '与陈博一同强行突破AI核心防御',
        text: '并肩作战。',
        next: 44,
        delta: { sanity: -15, fuel: -10 }
      },
      {
        label: '让陈博吸引火力，自己潜入',
        text: '分头行动，提高成功率。',
        next: 45,
        delta: { trust: 5, sanity: -10 }
      },
      {
        label: '利用李明作为人质，威胁AI系统',
        text: '非常规手段。',
        next: 46,
        delta: { trust: -10, sanity: -15 }
      }
    ]
  },
  {
    id: 33,
    scene: 'corridor_chaos',
    speaker: 'narrator',
    text: '林静试图分开缠斗的两人，但李明和陈博都无暇顾及她。在混乱中，李明手中的武器不慎击中了列车壁，引发了剧烈的震动。AI系统：“列车结构受损，燃料管道破裂！”警报声大作，燃料开始泄漏。林静感到一阵绝望，她的介入反而让情况变得更糟。列车开始减速，并发出刺耳的摩擦声。',
    choices: [
      {
        label: '立即修复燃料管道',
        text: '阻止列车停下。',
        next: 14,
        delta: { fuel: 15, sanity: -10 }
      },
      {
        label: '放弃修复，独自求生',
        text: '列车已经无法挽回。',
        next: 47,
        delta: { sanity: 10, trust: -15 }
      },
      {
        label: '向AI系统求助，稳定列车',
        text: '寻求AI的帮助。',
        next: 48,
        delta: { trust: 5, sanity: -5 }
      }
    ]
  },
  {
    id: 34,
    scene: 'announcement_system_truth',
    speaker: 'protagonist',
    text: '林静将所有证据通过列车广播系统公之于众。她播放了窃听器中解密的信息，展示了“方舟计划”的真相，以及列车并非驶向净土，而是驶向秘密实验室的路线图。车厢内一片哗然，恐慌和愤怒瞬间爆发。乘客们开始冲击车门，试图逃离。AI系统：“检测到大规模骚乱，列车秩序失控！”林静知道，她已经无法控制局面了。',
    choices: [
      {
        label: '试图安抚乘客，维持秩序',
        text: '避免更大的伤亡。',
        next: 26,
        delta: { trust: 10, sanity: -5 }
      },
      {
        label: '趁乱前往AI核心，彻底关闭系统',
        text: '从根源解决问题。',
        next: 31,
        delta: { sanity: -15, trust: -10 }
      },
      {
        label: '放弃抵抗，等待命运',
        text: '她已经尽力了。',
        next: 49,
        delta: { sanity: 5, trust: -15 }
      }
    ]
  },
  {
    id: 35,
    scene: 'command_center_escape',
    speaker: 'narrator',
    text: '林静奋力反抗卫兵，她利用工程师的敏捷和对列车结构的了解，成功逃出了列车长室。然而，列车长已经下达了通缉令，整个列车都在搜捕她。她现在孤身一人，被困在这趟死亡列车上。AI系统：“林静工程师已被列为叛逃者，请所有单位立即抓捕。”林静感到前所未有的绝望，她必须找到一个出路。',
    choices: [
      {
        label: '躲藏起来，寻找逃生机会',
        text: '保存实力。',
        next: 47,
        delta: { sanity: 10, trust: -15 }
      },
      {
        label: '寻找陈博，寻求帮助',
        text: '他可能是唯一的盟友。',
        next: 36,
        delta: { trust: 10, sanity: -10 }
      },
      {
        label: '前往AI核心，做最后一搏',
        text: '揭露真相，即使牺牲。',
        next: 31,
        delta: { sanity: -15, trust: -10 }
      }
    ]
  },
  {
    id: 36,
    scene: 'passenger_car_desperate',
    speaker: 'narrator',
    text: '林静在列车上四处寻找陈博，终于在一个废弃的车厢里找到了他。陈博看到林静被通缉，眼神中闪过一丝惊讶。“看来你已经知道了真相。”他苦笑着说，“现在我们是同一条船上的人了。”他告诉林静，他有一个备用计划，可以强行关闭列车，但需要牺牲大量的燃料。AI系统：“燃料储备已不足，强行关闭列车将导致永久停运。”',
    choices: [
      {
        label: '同意陈博的计划，强行关闭列车',
        text: '阻止“方舟计划”。',
        next: 50,
        delta: { fuel: -15, sanity: -15 }
      },
      {
        label: '拒绝陈博的计划，寻找其他方法',
        text: '不能让列车停下。',
        next: 31,
        delta: { sanity: -15, trust: -10 }
      },
      {
        label: '独自逃生，不再管列车命运',
        text: '她已经尽力了。',
        next: 47,
        delta: { sanity: 10, trust: -15 }
      }
    ]
  },
  {
    id: 37,
    scene: 'prison_car',
    speaker: 'narrator',
    text: '林静放弃抵抗，被卫兵关押在列车尾部的囚禁车厢。这里关押着许多“反抗者”，他们眼神空洞，充满了绝望。林静感到一阵冰冷，她似乎已经失去了所有希望。AI系统：“林静工程师已被成功控制，列车运行恢复正常。”她听着列车平稳的轰鸣声，知道自己已经无法改变任何事情了。',
    end: true,
    endType: 'bad',
    endingId: 'train-stopped'
  },
  {
    id: 38,
    scene: 'ventilation_shaft',
    speaker: 'narrator',
    text: '林静和陈博寻找其他入口，发现了一个废弃的通风管道。虽然狭窄而肮脏，但可以绕过AI核心的正面防御。两人小心翼翼地爬进管道，黑暗和密闭的空间让林静感到一阵窒息。AI系统：“检测到通风管道异常活动，正在进行排查。”他们必须加快速度，否则就会被发现。',
    choices: [
      {
        label: '快速前进，争取时间',
        text: '不能被发现。',
        next: 31,
        delta: { sanity: -10, fuel: -5 }
      },
      {
        label: '设置陷阱，拖延AI系统',
        text: '争取更多时间。',
        next: 44,
        delta: { trust: 5, sanity: -10 }
      },
      {
        label: '返回，寻找其他方法',
        text: '风险太高。',
        next: 29,
        delta: { sanity: 5, trust: -5 }
      }
    ]
  },
  {
    id: 39,
    scene: 'ai_core_distraction',
    speaker: 'narrator',
    text: '陈博利用他的芯片，成功干扰了AI系统，使其防御暂时出现漏洞。警报声变得断断续续，防御系统也出现了一丝迟滞。陈博对林静说：“快！趁现在进入AI核心！”林静知道这是他们唯一的机会，她毫不犹豫地冲向AI核心的入口。AI系统：“干扰源已定位，正在清除。”他们必须争分夺秒。',
    choices: [
      {
        label: '立即进入AI核心',
        text: '抓住机会。',
        next: 31,
        delta: { sanity: -15, fuel: -10 }
      },
      {
        label: '协助陈博维持干扰',
        text: '争取更多时间。',
        next: 44,
        delta: { trust: 5, sanity: -10 }
      },
      {
        label: '寻找其他入口或漏洞',
        text: '避免正面冲突。',
        next: 38,
        delta: { sanity: -8, trust: 5 }
      }
    ]
  },
  {
    id: 40,
    scene: 'train_interior_calm',
    speaker: 'narrator',
    text: '林静专注于维护列车运行，她不再理会那些关于“方舟计划”的流言蜚语。列车平稳地行驶着，最终抵达了目的地——一个被高墙环绕的巨大城市。乘客们欢呼雀跃，以为终于抵达了净土。林静看着他们，心中却充满了复杂的情绪。她完成了自己的职责，但她知道，这并非真正的“净土”。AI系统：“列车已抵达目的地，任务完成。”',
    end: true,
    endType: 'good',
    endingId: 'arrive-pure-land'
  },
  {
    id: 41,
    scene: 'ai_core_download',
    speaker: 'protagonist',
    text: '林静顶着巨大的精神压力，强行下载AI核心数据。数据流像洪水般涌入她的终端，其中包含了“方舟计划”的所有细节：病毒的起源、净土的谎言、活体样本的秘密，以及幕后操控者的真实身份。她成功了！但AI系统也因此彻底崩溃，列车失去了控制，开始剧烈摇晃。AI系统：“核心数据泄露，系统自毁程序启动！”林静知道，她已经没有回头路了。',
    choices: [
      {
        label: '将数据公之于众，然后跳车',
        text: '让真相大白，然后独自求生。',
        next: 51,
        delta: { sanity: -15, trust: -15 }
      },
      {
        label: '将数据公之于众，与列车共存亡',
        text: '为了真相，牺牲自己。',
        next: 52,
        delta: { sanity: -15, trust: -15 }
      },
      {
        label: '尝试修复AI系统，挽救列车',
        text: '她是一名工程师，不能放弃。',
        next: 48,
        delta: { trust: 5, sanity: -5 }
      }
    ]
  },
  {
    id: 42,
    scene: 'ai_core_shutdown',
    speaker: 'protagonist',
    text: '林静决定关闭AI核心。她找到了核心的紧急关闭按钮，毫不犹豫地按了下去。巨大的水晶球瞬间黯淡下来，列车失去了所有动力，开始减速。车厢内一片混乱，乘客们惊慌失措。AI系统：“核心系统关闭，列车将停止运行！”林静看着窗外飞速倒退的废土，知道自己做出了一个艰难的决定。',
    end: true,
    endType: 'bad',
    endingId: 'train-stopped'
  },
  {
    id: 43,
    scene: 'ai_core_signal',
    speaker: 'protagonist',
    text: '林静尝试向外界发送求救信号，但AI系统强大的干扰让她寸步难行。她感到一阵绝望，列车与外界的联系被彻底切断。她被困在这趟死亡列车上，无法向任何人求助。AI系统：“非法信号发送尝试已被阻止。”林静知道，她已经没有机会了。',
    end: true,
    endType: 'bad',
    endingId: 'train-stopped'
  },
  {
    id: 44,
    scene: 'ai_core_fight',
    speaker: 'narrator',
    text: '林静与陈博并肩作战，突破了AI核心的防御。他们面对着列车长和几名卫兵的阻拦。一场激烈的搏斗在AI核心室展开。林静利用工程师的知识，破坏了核心室的供电系统，制造了混乱。陈博则与列车长缠斗，试图夺取控制权。AI系统：“检测到核心室大规模冲突，正在启动自毁程序！”他们必须在自毁程序完成前，揭露真相。',
    choices: [
      {
        label: '协助陈博制服列车长',
        text: '夺取控制权。',
        next: 53,
        delta: { trust: 10, sanity: -15 }
      },
      {
        label: '强行下载核心数据',
        text: '不惜一切代价。',
        next: 41,
        delta: { sanity: -15, fuel: -10 }
      },
      {
        label: '尝试关闭AI核心',
        text: '釜底抽薪。',
        next: 42,
        delta: { sanity: -15, fuel: -10 }
      }
    ]
  },
  {
    id: 45,
    scene: 'ai_core_stealth',
    speaker: 'narrator',
    text: '陈博吸引了AI系统的火力，林静趁机潜入了AI核心。她迅速连接上终端，开始下载核心数据。然而，AI系统很快就发现了她的存在，并启动了更强的防御。林静感到巨大的压力，她必须在被AI完全控制之前，将真相公之于众。AI系统：“检测到核心数据泄露，正在启动自毁程序！”',
    choices: [
      {
        label: '强行下载核心数据',
        text: '不惜一切代价。',
        next: 41,
        delta: { sanity: -15, fuel: -10 }
      },
      {
        label: '尝试关闭AI核心',
        text: '釜底抽薪。',
        next: 42,
        delta: { sanity: -15, fuel: -10 }
      },
      {
        label: '向外界发送求救信号',
        text: '寻求外部帮助。',
        next: 43,
        delta: { sanity: -10, trust: -5 }
      }
    ]
  },
  {
    id: 46,
    scene: 'ai_core_hostage',
    speaker: 'narrator',
    text: '林静和陈博利用李明作为人质，威胁AI系统。AI系统短暂地陷入了停滞，似乎在评估威胁。陈博趁机对林静说：“快！趁现在进入AI核心！”林静知道这是他们唯一的机会，她毫不犹豫地冲向AI核心的入口。AI系统：“威胁评估完成，启动反制措施！”警报声再次响起，防御系统变得更加强大。',
    choices: [
      {
        label: '立即进入AI核心',
        text: '抓住机会。',
        next: 31,
        delta: { sanity: -15, fuel: -10 }
      },
      {
        label: '协助陈博维持威胁',
        text: '争取更多时间。',
        next: 44,
        delta: { trust: 5, sanity: -10 }
      },
      {
        label: '放弃人质，寻找其他方法',
        text: '风险太高。',
        next: 29,
        delta: { sanity: 5, trust: -5 }
      }
    ]
  },
  {
    id: 47,
    scene: 'wasteland_escape',
    speaker: 'narrator',
    text: '林静决定独自求生。她趁着列车混乱，从一个紧急出口跳下了列车。废土的寒风呼啸而过，她看着远去的列车，心中充满了茫然。她不知道自己将走向何方，但至少她逃离了那趟死亡列车。AI系统：“林静工程师已脱离列车，生存概率评估：低。”她成为了废土上的一名幸存者，独自面对未知的未来。',
    end: true,
    endType: 'neutral',
    endingId: 'survive-alone'
  },
  {
    id: 48,
    scene: 'engine_room_desperate',
    speaker: 'protagonist',
    text: '林静尝试修复AI系统，挽救列车。她拼尽全力，但AI系统已经受损严重，无法完全恢复。列车在剧烈摇晃中继续行驶，但速度越来越慢，最终在废土中央停了下来。AI系统：“系统核心受损，列车无法继续运行。”林静看着窗外无尽的荒芜，感到一阵绝望。她失败了。',
    end: true,
    endType: 'bad',
    endingId: 'train-stopped'
  },
  {
    id: 49,
    scene: 'passenger_car_despair',
    speaker: 'narrator',
    text: '林静放弃抵抗，任由恐慌的乘客将她淹没。列车在混乱中继续行驶，最终抵达了秘密实验室。所有乘客都被强制带走，林静也未能幸免。她看着那些被洗脑的乘客，心中充满了绝望。AI系统：“所有活体样本已成功运抵目的地。”她成为了“方舟计划”的又一个牺牲品。',
    end: true,
    endType: 'bad',
    endingId: 'train-stopped'
  },
  {
    id: 50,
    scene: 'train_shutdown',
    speaker: 'narrator',
    text: '林静和陈博联手，强行关闭了列车。巨大的列车在废土中央缓缓停下，引擎的轰鸣声逐渐消失。车厢内一片死寂，乘客们惊恐地看着窗外。陈博对林静说：“我们成功了，列车停下了，‘方舟计划’也暂时被阻止了。”然而，他们也因此被困在了废土中央，前途未卜。AI系统：“列车已永久停运，燃料耗尽。”',
    end: true,
    endType: 'bad',
    endingId: 'train-stopped'
  },
  {
    id: 51,
    scene: 'wasteland_escape_data',
    speaker: 'narrator',
    text: '林静将下载的核心数据通过紧急通讯设备发送到外界，然后从列车上跳下。她看着列车在身后爆炸，火光照亮了废土的夜空。她成功揭露了真相，但她也因此成为了一个被通缉的逃犯，独自在废土上求生。AI系统：“核心数据已泄露，列车自毁。林静工程师已脱离列车，生存概率评估：低。”她带着真相，踏上了孤独的旅程。',
    end: true,
    endType: 'neutral',
    endingId: 'survive-alone'
  },
  {
    id: 52,
    scene: 'ai_core_sacrifice',
    speaker: 'narrator',
    text: '林静将下载的核心数据通过列车广播系统公之于众，然后选择与列车共存亡。她看着乘客们从恐慌到愤怒，再到绝望，最终，列车在剧烈的爆炸中解体。林静的身体被爆炸的冲击波吞噬，但她的精神却得到了升华。AI系统：“核心数据已泄露，列车自毁。林静工程师已死亡。”她用生命，揭露了“方舟计划”的真相。',
    end: true,
    endType: 'secret',
    endingId: 'reveal-truth'
  },
  {
    id: 53,
    scene: 'ai_core_control',
    speaker: 'narrator',
    text: '林静和陈博联手制服了列车长，并成功夺取了AI核心的控制权。陈博迅速输入代码，关闭了“方舟计划”的所有功能，并将真相公之于众。列车上的乘客们终于知道了他们被欺骗的事实，愤怒和恐慌交织。AI系统：“‘方舟计划’已终止，列车将驶向最近的安全区。”林静和陈博相视一笑，他们成功了。列车改变了方向，驶向真正的自由。',
    end: true,
    endType: 'good',
    endingId: 'arrive-pure-land'
  }
];

export const INITIAL_STATS = { fuel: 80, trust: 50, sanity: 70 };
