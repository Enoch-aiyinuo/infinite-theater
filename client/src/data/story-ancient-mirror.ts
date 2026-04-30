import type { StoryNode, StoryChoice } from './story-types';
export const STORY_DATA: StoryNode[] = [
  {
    id: 1,
    scene: '衙门大堂',
    speaker: 'narrator',
    text: '清晨，衙门大堂内弥漫着潮湿的木头味。沈云卿，你作为城中捕快，被县令急召。他面色凝重，递来一份卷宗，上面赫然写着“古宅连环失踪案”。据说，城郊一座百年古宅近期接连有人离奇失踪，而所有线索都指向宅中一面古老的铜镜。县令嘱咐你务必查清真相，还百姓一个安宁。你接过卷宗，感到一股无形的压力。',
    choices: [
      { label: '立刻前往古宅', text: '“事不宜迟，我即刻动身。”你拱手领命，转身便走。', next: 2, delta: { courage: 5, clues: 0, yin: 0 } },
      { label: '先去拜访老仵作', text: '“县令大人，容我先去拜访老仵作，或许他能提供些许线索。”你沉思片刻，决定从旁侧击。', next: 3, delta: { courage: 0, clues: 3, yin: 0 } },
      { label: '查阅相关卷宗', text: '“此案蹊跷，我需先查阅过往卷宗，看是否有类似记载。”你请求更多时间准备。', next: 4, delta: { courage: -2, clues: 5, yin: 0 } }
    ]
  },
  {
    id: 2,
    scene: '古宅外',
    speaker: 'narrator',
    text: '古宅坐落在城郊荒僻之地，藤蔓缠绕，瓦片剥落，透着一股阴森。你推开吱呀作响的大门，一股腐朽的气息扑面而来。院中杂草丛生，仿佛许久无人踏足。正堂中央，一面古朴的铜镜静静立着，镜面蒙尘，却隐约映照出扭曲的景象。你感到一股寒意从脚底升起，这面镜子，绝非寻常之物。',
    choices: [
      { label: '触碰铜镜', text: '你伸出手，指尖即将触及镜面。', next: 5, delta: { courage: 3, clues: 0, yin: 5 } },
      { label: '仔细观察四周', text: '你没有贸然行动，而是环顾四周，寻找其他线索。', next: 6, delta: { courage: 0, clues: 5, yin: 0 } },
      { label: '暂时离开古宅', text: '你感到不安，决定先离开古宅，再做打算。', next: 7, delta: { courage: -5, clues: 0, yin: -3 } }
    ]
  },
  {
    id: 3,
    scene: '仵作房',
    speaker: 'narrator',
    text: '老仵作的屋子弥漫着药草和福尔马林的气味。他年逾花甲，双眼浑浊却透着精明。你说明来意，老仵作捻着胡须，缓缓开口：“古宅那面镜子啊，传闻能映照人心最深处的恐惧，甚至能引魂入镜。几十年前，也有人因它而疯魔。”他语气低沉，让你心头一紧。',
    choices: [
      { label: '追问细节', text: '“老人家，可否告知更多细节？”你急切地问道。', next: 8, delta: { courage: 0, clues: 7, yin: 0 } },
      { label: '感谢并前往古宅', text: '“多谢老人家指点，我这就去古宅一探究竟。”你拱手告辞。', next: 2, delta: { courage: 2, clues: 0, yin: 0 } },
      { label: '质疑老仵作', text: '“这些不过是民间传说，当不得真。”你有些不以为然。', next: 9, delta: { courage: 0, clues: -3, yin: 0 } }
    ]
  },
  {
    id: 4,
    scene: '衙门书房',
    speaker: 'narrator',
    text: '你在衙门书房里翻阅着堆积如山的旧卷宗，灰尘呛得你连连咳嗽。终于，你找到几份年代久远的失踪案，其描述与古宅案惊人相似，都提到了“镜中异象”。其中一份卷宗记载，曾有捕快在调查古宅时，对着铜镜看到了自己的死状，随后便失踪了。一股寒意直冲你的脊背。',
    choices: [
      { label: '深入研究', text: '你决定继续深挖这些旧案，寻找更多关联。', next: 10, delta: { courage: -3, clues: 8, yin: 0 } },
      { label: '觉得无用前往古宅', text: '“这些旧案太过久远，恐怕与当下无关。”你合上卷宗，直奔古宅。', next: 2, delta: { courage: 0, clues: -2, yin: 0 } },
      { label: '询问同僚', text: '你拿着卷宗，去询问其他捕快是否知晓这些旧事。', next: 11, delta: { courage: 0, clues: 4, yin: 0 } }
    ]
  },
  {
    id: 5,
    scene: '古宅正堂',
    speaker: 'narrator',
    text: '你的指尖触碰到冰冷的镜面，一股刺骨的寒意瞬间蔓延全身。镜中景象骤然扭曲，你看到一个模糊的身影，那身影竟是你自己，倒在血泊之中！你猛地收回手，心跳如鼓。耳边传来一阵若有若无的低语，像是在哭泣，又像是在呼唤。你感到头晕目眩，阴气侵体。',
    choices: [
      { label: '大声呵斥', text: '“何方妖孽，胆敢在此作祟！”你厉声喝道。', next: 12, delta: { courage: 5, clues: 0, yin: -5 } },
      { label: '尝试沟通', text: '“镜中之人，你可是有冤屈？”你试探性地问道。', next: 13, delta: { courage: 0, clues: 3, yin: 8 } },
      { label: '立刻退开', text: '你感到极度不适，迅速后退，远离铜镜。', next: 7, delta: { courage: -3, clues: 0, yin: -7 } }
    ]
  },
  {
    id: 6,
    scene: '古宅正堂',
    speaker: 'narrator',
    text: '你仔细观察着古宅正堂的每一个角落。墙壁上挂着几幅褪色的画，画中人物神情诡异。地面上散落着一些破碎的瓷片和干枯的花瓣。在铜镜旁边的案几上，你发现了一本尘封已久的日记。日记的字迹娟秀，记录着一个女子对镜子的痴迷和恐惧。你翻开日记，试图从中找到线索。',
    choices: [
      { label: '阅读日记', text: '你小心翼翼地翻阅日记，希望能找到答案。', next: 14, delta: { courage: 0, clues: 8, yin: 0 } },
      { label: '检查铜镜背面', text: '你绕到铜镜背面，看看是否有隐藏的机关或符咒。', next: 15, delta: { courage: 3, clues: 5, yin: 0 } },
      { label: '呼唤失踪者名字', text: '“有人在吗？！”你大声呼唤，希望能得到回应。', next: 16, delta: { courage: 0, clues: -2, yin: 3 } }
    ]
  },
  {
    id: 7,
    scene: '古宅外',
    speaker: 'narrator',
    text: '你逃也似的离开了古宅，心头的寒意久久不散。你意识到这并非寻常案件，需要更周密的计划。你决定先回衙门，向县令汇报情况，并寻求支援。然而，古宅的阴影似乎已经缠上了你，你总觉得身后有双眼睛在盯着你。',
    choices: [
      { label: '回衙门汇报', text: '你快步走回衙门，将所见所闻告知县令。', next: 17, delta: { courage: 0, clues: 0, yin: -5 } },
      { label: '再次拜访老仵作', text: '你觉得老仵作或许知道更多，决定再次向他请教。', next: 3, delta: { courage: 0, clues: 3, yin: 0 } },
      { label: '独自思考对策', text: '你找了个僻静之处，独自思考如何应对。', next: 18, delta: { courage: 0, clues: 2, yin: 0 } }
    ]
  },
  {
    id: 8,
    scene: '仵作房',
    speaker: 'narrator',
    text: '老仵作叹了口气，告诉你一个尘封的秘密：“那镜子，原是白家小姐的嫁妆。白小姐生前痴迷于镜中幻象，最终在镜前自尽。她的魂魄被困镜中，怨气日深，便开始引诱活人入镜，以求脱困。”他指了指你，意味深长地说：“你若想救人，必先入镜，但入镜者，九死一生。”',
    choices: [
      { label: '询问入镜之法', text: '“可有入镜之法？”你追问道。', next: 19, delta: { courage: 5, clues: 5, yin: 0 } },
      { label: '寻求破解之术', text: '“可有破解之术，无需入镜？”你问道。', next: 20, delta: { courage: 0, clues: 8, yin: -3 } },
      { label: '放弃调查', text: '你感到力不从心，萌生退意。', next: 21, delta: { courage: -10, clues: -5, yin: 0 } }
    ]
  },
  {
    id: 9,
    scene: '仵作房',
    speaker: 'narrator',
    text: '老仵作听你质疑，只是摇了摇头，不再多言。你觉得他故弄玄虚，便告辞离去。然而，你心中却隐隐觉得不安，那些传说并非空穴来风。你决定还是前往古宅，亲自探查一番。',
    choices: [
      { label: '前往古宅', text: '你决定亲自前往古宅，一探究竟。', next: 2, delta: { courage: 3, clues: 0, yin: 0 } },
      { label: '再次查阅卷宗', text: '你觉得还是应该多做准备，再次查阅卷宗。', next: 4, delta: { courage: 0, clues: 2, yin: 0 } },
      { label: '向同僚求助', text: '你感到有些棘手，决定向同僚求助。', next: 11, delta: { courage: -2, clues: 3, yin: 0 } }
    ]
  },
  {
    id: 10,
    scene: '衙门书房',
    speaker: 'narrator',
    text: '你夜以继日地查阅卷宗，终于发现了一个惊人的秘密。所有失踪案的受害者，都曾在失踪前接触过一面铜镜，且他们的生辰八字与白家小姐的生辰八字有着某种关联。你推测，白家小姐的魂魄可能在寻找某种特定的“替身”，以完成她的执念。你感到真相近在咫尺，但也伴随着巨大的危险。',
    choices: [
      { label: '前往古宅验证', text: '你带着新发现的线索，直奔古宅。', next: 2, delta: { courage: 5, clues: 0, yin: 0 } },
      { label: '再次拜访老仵作', text: '你觉得老仵作或许能解释这些关联。', next: 3, delta: { courage: 0, clues: 3, yin: 0 } },
      { label: '准备符咒法器', text: '你意识到危险，决定准备一些防身之物。', next: 22, delta: { courage: 0, clues: 0, yin: -5 } }
    ]
  },
  {
    id: 11,
    scene: '衙门',
    speaker: 'narrator',
    text: '你向同僚们询问旧案，但他们大多对此不甚了解，或是避而不谈。只有一位年长的捕快，听闻你的描述后，脸色微变，低声提醒你：“那古宅的镜子邪门得很，进去的人，很少能全身而退。你若执意要去，切记，莫要直视镜面太久。”他的话让你更加警惕。',
    choices: [
      { label: '前往古宅', text: '你决定亲自前往古宅，一探究竟。', next: 2, delta: { courage: 3, clues: 0, yin: 0 } },
      { label: '再次查阅卷宗', text: '你觉得还是应该多做准备，再次查阅卷宗。', next: 4, delta: { courage: 0, clues: 2, yin: 0 } },
      { label: '向老仵作请教', text: '你觉得老仵作或许知道更多，决定再次向他请教。', next: 3, delta: { courage: 0, clues: 3, yin: 0 } }
    ]
  },
  {
    id: 12,
    scene: '古宅正堂',
    speaker: 'narrator',
    text: '你的呵斥声在空荡的古宅中回荡，却无人回应。镜中的景象渐渐消散，只留下你模糊的倒影。然而，你感到一股更强的阴气袭来，仿佛被无形的手扼住了喉咙。你强忍着不适，知道自己已经引起了镜中之物的注意。你必须尽快找到解决之道。',
    choices: [
      { label: '再次尝试沟通', text: '你深吸一口气，再次尝试与镜中之物沟通。', next: 13, delta: { courage: -3, clues: 2, yin: 10 } },
      { label: '寻找破解之法', text: '你不再犹豫，开始在古宅中寻找破解铜镜邪气的办法。', next: 6, delta: { courage: 0, clues: 5, yin: -5 } },
      { label: '暂时撤退', text: '你感到危险，决定暂时撤退，另寻他法。', next: 7, delta: { courage: -5, clues: 0, yin: -8 } }
    ]
  },
  {
    id: 13,
    scene: '古宅正堂',
    speaker: '白灵儿',
    text: '你的声音在古宅中回荡，镜面再次泛起涟漪。一个身着白衣的女子身影渐渐清晰，她面容清秀，眼神哀怨。她轻启朱唇，声音空灵：“我叫白灵儿，被困镜中百年。你，可愿助我脱困？”她的目光直视你的双眼，你感到一股强大的吸力，仿佛要将你吸入镜中。',
    choices: [
      { label: '答应帮助她', text: '“我愿助你脱困，但你也要告诉我真相。”你坚定地说道。', next: 23, delta: { courage: 5, clues: 5, yin: 10 } },
      { label: '拒绝并寻找其他方法', text: '“我乃捕快，不与鬼魂为伍。我自会找到真相。”你拒绝了她。', next: 24, delta: { courage: 8, clues: 0, yin: -10 } },
      { label: '询问她的故事', text: '“你为何被困镜中？有何冤屈？”你试图了解更多。', next: 25, delta: { courage: 0, clues: 7, yin: 5 } }
    ]
  },
  {
    id: 14,
    scene: '古宅正堂',
    speaker: 'narrator',
    text: '日记中记载了白家小姐生前的点滴，她因家族联姻而郁郁寡欢，终日对着铜镜倾诉心事。日记的最后几页，字迹变得狂乱，她写道：“镜中之人，许我永生，我愿以魂相报！”随后便是空白。你意识到，白灵儿并非单纯的受害者，她与铜镜之间有着更深的契约。',
    choices: [
      { label: '尝试与镜中白灵儿沟通', text: '你决定尝试与镜中的白灵儿沟通。', next: 13, delta: { courage: 0, clues: 5, yin: 8 } },
      { label: '寻找破解之法', text: '你意识到危险，开始寻找破解铜镜邪气的办法。', next: 15, delta: { courage: 3, clues: 5, yin: -5 } },
      { label: '离开古宅寻求帮助', text: '你感到事态复杂，决定离开古宅寻求帮助。', next: 7, delta: { courage: -5, clues: 0, yin: -8 } }
    ]
  },
  {
    id: 15,
    scene: '古宅正堂',
    speaker: 'narrator',
    text: '你绕到铜镜背面，发现镜框上刻画着一些古老的符文，但已经模糊不清。你用手触摸，感到符文处传来微弱的能量波动。这些符文似乎是用来镇压或封印镜中之物的。你猜测，如果能修复或增强这些符文，或许能削弱铜镜的力量。',
    choices: [
      { label: '尝试修复符文', text: '你尝试用自己的内力或所学知识修复符文。', next: 26, delta: { courage: 5, clues: 0, yin: -10 } },
      { label: '寻求老仵作帮助', text: '你觉得老仵作或许对这些符文有所了解。', next: 3, delta: { courage: 0, clues: 5, yin: 0 } },
      { label: '寻找其他线索', text: '你觉得符文太过深奥，决定寻找其他线索。', next: 6, delta: { courage: 0, clues: 3, yin: 0 } }
    ]
  },
  {
    id: 16,
    scene: '古宅正堂',
    speaker: 'narrator',
    text: '你的呼唤声在古宅中回荡，却只引来一阵阴冷的风。你感到一股无形的力量在拉扯着你，让你无法动弹。镜中的景象再次扭曲，你看到自己的面容变得苍白，眼神空洞。你意识到，你的呼唤反而激怒了镜中之物，它正在试图侵蚀你的心智。',
    choices: [
      { label: '强行挣脱', text: '你咬紧牙关，试图挣脱这股力量。', next: 12, delta: { courage: 8, clues: 0, yin: -10 } },
      { label: '尝试沟通', text: '你深吸一口气，尝试与镜中之物沟通。', next: 13, delta: { courage: -5, clues: 3, yin: 10 } },
      { label: '闭目凝神', text: '你闭上眼睛，默念清心咒，试图抵御侵蚀。', next: 7, delta: { courage: 0, clues: 0, yin: -15 } }
    ]
  },
  {
    id: 17,
    scene: '衙门大堂',
    speaker: 'narrator',
    text: '你将古宅的诡异和铜镜的邪门之处告知县令。县令听后大惊失色，但他对这些鬼神之事也束手无策，只得让你小心行事，并承诺会派人协助。然而，你深知，这种事情，只能靠自己。你感到肩上的担子更重了。',
    choices: [
      { label: '再次前往古宅', text: '你决定再次前往古宅，直面铜镜。', next: 2, delta: { courage: 5, clues: 0, yin: 0 } },
      { label: '寻求老仵作帮助', text: '你觉得老仵作或许知道更多，决定再次向他请教。', next: 3, delta: { courage: 0, clues: 3, yin: 0 } },
      { label: '查阅更多资料', text: '你觉得需要更多知识储备，再次查阅卷宗。', next: 4, delta: { courage: 0, clues: 5, yin: 0 } }
    ]
  },
  {
    id: 18,
    scene: '城郊小径',
    speaker: 'narrator',
    text: '你在城郊小径上独自思考，将所有线索在脑海中串联。铜镜、白灵儿、失踪案、旧卷宗……你隐约觉得，这背后隐藏着一个巨大的阴谋。你必须找到铜镜的真正秘密，才能彻底解决此事。你感到自己的思路越来越清晰。',
    choices: [
      { label: '再次前往古宅', text: '你决定再次前往古宅，直面铜镜。', next: 2, delta: { courage: 5, clues: 0, yin: 0 } },
      { label: '寻求老仵作帮助', text: '你觉得老仵作或许知道更多，决定再次向他请教。', next: 3, delta: { courage: 0, clues: 3, yin: 0 } },
      { label: '查阅更多资料', text: '你觉得需要更多知识储备，再次查阅卷宗。', next: 4, delta: { courage: 0, clues: 5, yin: 0 } }
    ]
  },
  {
    id: 19,
    scene: '仵作房',
    speaker: 'narrator',
    text: '老仵作告诉你，入镜之法便是以血为引，心诚则灵。他递给你一把锋利的匕首，叮嘱你：“入镜后，切记要保持本心，莫要被幻象迷惑。若能找到镜中之魂的执念所在，并将其化解，方可破镜而出。”你接过匕首，感到沉甸甸的。',
    choices: [
      { label: '前往古宅入镜', text: '你毅然决然地前往古宅，准备入镜。', next: 27, delta: { courage: 10, clues: 0, yin: 15 } },
      { label: '犹豫不决', text: '你感到犹豫，这风险实在太大。', next: 21, delta: { courage: -5, clues: 0, yin: 0 } },
      { label: '寻求其他方法', text: '你觉得入镜太过危险，希望能找到其他方法。', next: 20, delta: { courage: 0, clues: 5, yin: -5 } }
    ]
  },
  {
    id: 20,
    scene: '仵作房',
    speaker: 'narrator',
    text: '老仵作沉思片刻，告诉你：“若不入镜，唯有寻得至阳之物，或请高僧大德，以无上佛法镇压。但此法耗时耗力，且不一定能彻底解决问题。”他摇了摇头，表示此法并非上策。你感到有些失望，但仍不愿放弃。',
    choices: [
      { label: '寻找至阳之物', text: '你决定寻找至阳之物，尝试镇压铜镜。', next: 28, delta: { courage: 0, clues: 10, yin: -10 } },
      { label: '请高僧大德', text: '你决定去寺庙请高僧前来相助。', next: 29, delta: { courage: -5, clues: 5, yin: -8 } },
      { label: '再次考虑入镜', text: '你觉得其他方法太过渺茫，再次考虑入镜。', next: 19, delta: { courage: 5, clues: 0, yin: 5 } }
    ]
  },
  {
    id: 21,
    scene: '衙门大堂',
    speaker: 'narrator',
    text: '你最终选择了放弃。古宅的案子被列为悬案，再无人敢提及。你虽然保住了性命，但心中却留下了难以磨灭的阴影。每当夜深人静，你总会想起那面铜镜，想起镜中模糊的自己，以及白灵儿哀怨的眼神。你的人生，从此多了一份遗憾和恐惧。',
    end: true,
    endType: 'bad',
    endingId: '永困镜中'
  },
  {
    id: 22,
    scene: '衙门书房',
    speaker: 'narrator',
    text: '你花费数日，查阅古籍，请教方士，终于准备了一些符咒和法器。这些物品虽然不能彻底解决问题，但至少能为你提供一些自保之力。你感到自己的准备更加充分，也更加有信心面对古宅的邪祟。',
    choices: [
      { label: '前往古宅', text: '你带着符咒法器，再次前往古宅。', next: 2, delta: { courage: 5, clues: 0, yin: -5 } },
      { label: '再次拜访老仵作', text: '你觉得老仵作或许知道更多，决定再次向他请教。', next: 3, delta: { courage: 0, clues: 3, yin: 0 } },
      { label: '查阅更多资料', text: '你觉得需要更多知识储备，再次查阅卷宗。', next: 4, delta: { courage: 0, clues: 5, yin: 0 } }
    ]
  },
  {
    id: 23,
    scene: '镜中世界',
    speaker: '白灵儿',
    text: '“多谢恩公！”白灵儿的脸上露出一丝喜色。她告诉你，她被困镜中，是因为当年与一位书生相恋，却被家族阻挠，最终在镜前自尽。她的魂魄被铜镜吸入，无法轮回。她需要一个真心爱她的人，自愿与她共入镜中，才能打破铜镜的束缚。你感到震惊，这竟是一个情字困住的冤魂。',
    choices: [
      { label: '自愿入镜，以命换命', text: '“我愿与你共入镜中，只求你放下执念。”你深情地说道。', next: 30, delta: { courage: 10, clues: 0, yin: 15 } },
      { label: '寻找其他解救之法', text: '“我不能以命相许，但会为你寻找其他解救之法。”你试图寻找折衷。', next: 31, delta: { courage: 0, clues: 8, yin: -5 } },
      { label: '拒绝并离开', text: '“我无法满足你的要求，告辞。”你转身欲走。', next: 32, delta: { courage: -5, clues: 0, yin: -10 } }
    ]
  },
  {
    id: 24,
    scene: '古宅正堂',
    speaker: '白灵儿',
    text: '“你……你竟如此无情！”白灵儿的眼神变得怨毒，镜中景象再次扭曲。一股强大的阴气从镜中喷涌而出，将你团团围住。你感到全身冰冷，仿佛置身冰窖。白灵儿的声音变得尖锐：“既然你不愿助我，那就永远留在这里，成为我的一部分吧！”你陷入了绝境。',
    choices: [
      { label: '强行破镜', text: '你凝聚全身内力，试图一掌击碎铜镜。', next: 33, delta: { courage: 15, clues: 0, yin: -15 } },
      { label: '呼唤老仵作', text: '你大声呼唤老仵作的名字，希望能得到帮助。', next: 34, delta: { courage: -5, clues: 0, yin: -10 } },
      { label: '闭目等死', text: '你感到无力反抗，闭上眼睛，等待命运的审判。', next: 21, delta: { courage: -15, clues: 0, yin: 15 } }
    ]
  },
  {
    id: 25,
    scene: '镜中世界',
    speaker: '白灵儿',
    text: '白灵儿的眼神变得柔和，她向你讲述了她的故事。她生前是白家小姐，与一位贫寒书生相爱。家族为了攀附权贵，强行将她许配给富商。她在绝望中，对着铜镜许下“愿与爱人永不分离”的誓言，随后便在镜前自尽。她的魂魄被铜镜吸入，与镜中的幻象融为一体，等待着与爱人重逢。你听后，心中五味杂陈。',
    choices: [
      { label: '尝试化解她的执念', text: '“你的爱人已逝，放下执念，方得解脱。”你劝说道。', next: 35, delta: { courage: 0, clues: 10, yin: -5 } },
      { label: '寻找她的爱人', text: '“我帮你寻找你的爱人，或许能助你脱困。”你决定帮助她。', next: 36, delta: { courage: 5, clues: 8, yin: 5 } },
      { label: '告诉她真相', text: '“你被铜镜欺骗了，它只是利用你的执念。”你试图揭露真相。', next: 37, delta: { courage: 8, clues: 5, yin: -8 } }
    ]
  },
  {
    id: 26,
    scene: '古宅正堂',
    speaker: 'narrator',
    text: '你集中精神，将内力注入符文之中。符文发出微弱的光芒，铜镜的邪气似乎被削弱了几分。然而，符文的力量太过微弱，无法彻底镇压铜镜。你感到内力消耗巨大，但至少，你找到了一个方向。',
    choices: [
      { label: '再次尝试修复符文', text: '你决定再次尝试修复符文，希望能增强其力量。', next: 26, delta: { courage: -5, clues: 0, yin: -5 } },
      { label: '寻求老仵作帮助', text: '你觉得老仵作或许对这些符文有所了解。', next: 3, delta: { courage: 0, clues: 5, yin: 0 } },
      { label: '尝试与镜中白灵儿沟通', text: '你觉得或许可以从白灵儿那里找到线索。', next: 13, delta: { courage: 0, clues: 5, yin: 8 } }
    ]
  },
  {
    id: 27,
    scene: '镜中世界',
    speaker: 'narrator',
    text: '你划破指尖，将鲜血滴在镜面。铜镜发出耀眼的光芒，你感到一股强大的吸力，瞬间被吸入镜中。你置身于一个虚幻的世界，四周白雾弥漫，隐约可见古宅的景象。白灵儿的身影出现在你面前，她面带微笑，向你伸出手。你感到自己的意识逐渐模糊，仿佛要与这个世界融为一体。',
    choices: [
      { label: '握住白灵儿的手', text: '你伸出手，握住了白灵儿冰冷的手。', next: 38, delta: { courage: 0, clues: 0, yin: 15 } },
      { label: '抵抗吸力', text: '你试图抵抗这股吸力，保持清醒。', next: 39, delta: { courage: 10, clues: 0, yin: -10 } },
      { label: '寻找出口', text: '你环顾四周，试图寻找离开镜中世界的方法。', next: 40, delta: { courage: 0, clues: 5, yin: -5 } }
    ]
  },
  {
    id: 28,
    scene: '城中药铺',
    speaker: 'narrator',
    text: '你走遍城中药铺，寻找至阳之物。最终，你在一位老药师的指点下，找到了一块千年桃木。桃木散发着淡淡的清香，据说能辟邪镇煞。你带着桃木回到古宅，希望能用它来镇压铜镜。',
    choices: [
      { label: '用桃木镇压铜镜', text: '你将桃木放在铜镜前，希望能镇压其邪气。', next: 41, delta: { courage: 0, clues: 0, yin: -15 } },
      { label: '再次拜访老仵作', text: '你觉得老仵作或许知道如何使用桃木。', next: 3, delta: { courage: 0, clues: 3, yin: 0 } },
      { label: '尝试与镜中白灵儿沟通', text: '你觉得或许可以从白灵儿那里找到线索。', next: 13, delta: { courage: 0, clues: 5, yin: 8 } }
    ]
  },
  {
    id: 29,
    scene: '城外寺庙',
    speaker: 'narrator',
    text: '你来到城外寺庙，向住持说明来意。住持听后，面色凝重，告诉你：“那铜镜乃是至阴之物，非寻常佛法可镇压。贫僧需闭关七七四十九日，方能炼制出降魔符咒。在此期间，你需自行抵御邪祟。”你感到时间紧迫，但别无他法。',
    choices: [
      { label: '等待住持出关', text: '你决定等待住持出关，期间自行应对。', next: 42, delta: { courage: 0, clues: 0, yin: -5 } },
      { label: '再次考虑入镜', text: '你觉得等待太久，再次考虑入镜。', next: 19, delta: { courage: 5, clues: 0, yin: 5 } },
      { label: '寻找其他方法', text: '你觉得等待太久，希望能找到其他方法。', next: 20, delta: { courage: 0, clues: 5, yin: -5 } }
    ]
  },
  {
    id: 30,
    scene: '镜中世界',
    speaker: '白灵儿',
    text: '“恩公……”白灵儿的眼中闪烁着泪光。你感到一股强大的力量将你拉入镜中，你的意识渐渐消散，与白灵儿的魂魄融为一体。你不再是你，她也不再是她，你们成为了镜中永恒的伴侣。古宅的失踪案从此停止，但世间再无沈云卿此人。',
    end: true,
    endType: 'neutral',
    endingId: '以命换命'
  },
  {
    id: 31,
    scene: '镜中世界',
    speaker: '白灵儿',
    text: '“你……你骗我！”白灵儿的脸上露出失望之色，镜中景象再次扭曲。她告诉你，铜镜的力量来源于她的执念，若执念不解，铜镜便会永世存在。她需要你帮助她找到当年书生留下的信物，以解开她的心结。你感到责任重大。',
    choices: [
      { label: '寻找书生信物', text: '你决定帮助白灵儿寻找书生信物。', next: 43, delta: { courage: 5, clues: 10, yin: 0 } },
      { label: '尝试说服她放下执念', text: '你再次尝试说服她放下执念。', next: 35, delta: { courage: 0, clues: 5, yin: -5 } },
      { label: '离开镜中世界', text: '你感到无力，试图离开镜中世界。', next: 40, delta: { courage: 0, clues: 0, yin: -10 } }
    ]
  },
  {
    id: 32,
    scene: '古宅正堂',
    speaker: '白灵儿',
    text: '“既然如此，那就别怪我无情！”白灵儿的声音变得冰冷，镜中伸出无数只苍白的手，将你紧紧缠绕。你感到全身的力气被迅速抽走，意识逐渐模糊。你挣扎着，却无法摆脱。最终，你被拖入镜中，成为又一个失踪者。古宅的诅咒，仍在继续。',
    end: true,
    endType: 'bad',
    endingId: '永困镜中'
  },
  {
    id: 33,
    scene: '古宅正堂',
    speaker: 'narrator',
    text: '你凝聚全身内力，猛地一掌击向铜镜。铜镜发出刺耳的悲鸣，镜面瞬间布满裂痕。白灵儿的身影在镜中扭曲，发出凄厉的惨叫。最终，铜镜轰然破碎，化为无数碎片。一股强大的阴气瞬间消散，古宅恢复了平静。白灵儿的魂魄也随之烟消云散。你虽然成功破镜，却也感到一丝悲凉。',
    end: true,
    endType: 'good',
    endingId: '镜破魂散'
  },
  {
    id: 34,
    scene: '古宅正堂',
    speaker: 'narrator',
    text: '你大声呼唤老仵作的名字，然而古宅中只有你的回声。白灵儿的阴气越来越重，你感到自己的生命力正在流失。你绝望地看着镜中扭曲的自己，最终，你的意识陷入黑暗。你成为了古宅的又一个牺牲品。',
    end: true,
    endType: 'bad',
    endingId: '永困镜中'
  },
  {
    id: 35,
    scene: '镜中世界',
    speaker: '白灵儿',
    text: '“放下执念……谈何容易？”白灵儿的眼中充满了痛苦。她告诉你，她的执念并非仅仅是爱情，更是对家族不公的怨恨。她希望你能帮助她揭露家族的丑恶，还她一个清白。你感到事情远比想象中复杂。',
    choices: [
      { label: '答应帮助她揭露真相', text: '“我答应你，我会帮你揭露真相。”你坚定地说道。', next: 44, delta: { courage: 8, clues: 10, yin: 0 } },
      { label: '再次劝说她放下执念', text: '“冤冤相报何时了，放下吧。”你再次劝说道。', next: 45, delta: { courage: 0, clues: 5, yin: -5 } },
      { label: '寻找其他方法', text: '你觉得揭露真相太过困难，希望能找到其他方法。', next: 40, delta: { courage: 0, clues: 0, yin: -10 } }
    ]
  },
  {
    id: 36,
    scene: '镜中世界',
    speaker: '白灵儿',
    text: '“我的爱人……他叫李明。他曾送我一枚玉佩，作为定情信物。”白灵儿的声音带着一丝甜蜜。她告诉你，那枚玉佩可能被她的家族收走，藏在某个隐秘之处。你感到找到了新的线索，决定帮助她寻找玉佩。',
    choices: [
      { label: '离开镜中世界寻找玉佩', text: '你决定离开镜中世界，去寻找玉佩。', next: 40, delta: { courage: 5, clues: 10, yin: -5 } },
      { label: '询问更多关于李明的信息', text: '你试图了解更多关于李明的信息。', next: 46, delta: { courage: 0, clues: 8, yin: 0 } },
      { label: '尝试说服她放下执念', text: '你再次尝试说服她放下执念。', next: 35, delta: { courage: 0, clues: 5, yin: -5 } }
    ]
  },
  {
    id: 37,
    scene: '镜中世界',
    speaker: '白灵儿',
    text: '“你……你胡说！”白灵儿的脸上露出愤怒之色，镜中景象再次扭曲。她告诉你，铜镜是她与爱人永恒的见证，绝非邪物。她不相信你的话，认为你是在欺骗她。你感到沟通陷入僵局。',
    choices: [
      { label: '提供证据', text: '“我有证据，铜镜吸食生魂，并非善类。”你试图拿出证据。', next: 47, delta: { courage: 8, clues: 5, yin: -8 } },
      { label: '再次尝试沟通', text: '你深吸一口气，再次尝试与她沟通。', next: 25, delta: { courage: 0, clues: 3, yin: 5 } },
      { label: '离开镜中世界', text: '你感到无力，试图离开镜中世界。', next: 40, delta: { courage: 0, clues: 0, yin: -10 } }
    ]
  },
  {
    id: 38,
    scene: '镜中世界',
    speaker: 'narrator',
    text: '你握住白灵儿的手，感到一股温暖。你的意识彻底消散，与白灵儿融为一体。你成为了镜中永恒的伴侣，古宅的失踪案从此停止，但世间再无沈云卿此人。你与白灵儿在镜中过着永恒的虚幻生活。',
    end: true,
    endType: 'neutral',
    endingId: '以命换命'
  },
  {
    id: 39,
    scene: '镜中世界',
    speaker: 'narrator',
    text: '你强忍着吸力，努力保持清醒。你感到自己的身体被撕扯，但你凭借坚韧的意志，终于挣脱了镜中的束缚。你猛地睁开眼睛，发现自己躺在古宅正堂的地面上，铜镜完好无损，但你感到精疲力尽。你成功抵抗了镜中之物的诱惑。',
    choices: [
      { label: '再次尝试沟通', text: '你深吸一口气，再次尝试与镜中白灵儿沟通。', next: 13, delta: { courage: 0, clues: 3, yin: 8 } },
      { label: '寻找破解之法', text: '你不再犹豫，开始在古宅中寻找破解铜镜邪气的办法。', next: 6, delta: { courage: 0, clues: 5, yin: -5 } },
      { label: '暂时撤退', text: '你感到危险，决定暂时撤退，另寻他法。', next: 7, delta: { courage: -5, clues: 0, yin: -8 } }
    ]
  },
  {
    id: 40,
    scene: '古宅正堂',
    speaker: 'narrator',
    text: '你感到一阵眩晕，随后发现自己回到了古宅正堂。铜镜依然立在那里，但你感到它的邪气似乎减弱了一些。你意识到，你成功地从镜中世界脱离。你必须尽快找到彻底解决铜镜的方法。',
    choices: [
      { label: '再次尝试沟通', text: '你深吸一口气，再次尝试与镜中白灵儿沟通。', next: 13, delta: { courage: 0, clues: 3, yin: 8 } },
      { label: '寻找破解之法', text: '你不再犹豫，开始在古宅中寻找破解铜镜邪气的办法。', next: 6, delta: { courage: 0, clues: 5, yin: -5 } },
      { label: '暂时撤退', text: '你感到危险，决定暂时撤退，另寻他法。', next: 7, delta: { courage: -5, clues: 0, yin: -8 } }
    ]
  },
  {
    id: 41,
    scene: '古宅正堂',
    speaker: 'narrator',
    text: '你将千年桃木放在铜镜前，桃木散发出淡淡的金光，铜镜的邪气似乎被压制。镜面不再扭曲，但白灵儿的身影依然若隐若现。你感到桃木的力量虽然强大，但不足以彻底摧毁铜镜。你还需要更多的线索。',
    choices: [
      { label: '再次尝试沟通', text: '你深吸一口气，再次尝试与镜中白灵儿沟通。', next: 13, delta: { courage: 0, clues: 3, yin: 8 } },
      { label: '寻找其他线索', text: '你觉得桃木不足以解决问题，决定寻找其他线索。', next: 6, delta: { courage: 0, clues: 5, yin: 0 } },
      { label: '再次拜访老仵作', text: '你觉得老仵作或许知道如何彻底解决。', next: 3, delta: { courage: 0, clues: 3, yin: 0 } }
    ]
  },
  {
    id: 42,
    scene: '古宅正堂',
    speaker: 'narrator',
    text: '你独自在古宅中等待了七七四十九日。在此期间，你凭借着自己的勇气和智慧，多次化解了铜镜的侵扰。终于，住持带着炼制好的降魔符咒赶来。符咒发出耀眼的金光，瞬间将铜镜笼罩。铜镜发出凄厉的惨叫，最终化为灰烬。白灵儿的魂魄也得以超度。古宅恢复了平静，你成功解决了失踪案。',
    end: true,
    endType: 'good',
    endingId: '镜破魂散'
  },
  {
    id: 43,
    scene: '城中旧宅',
    speaker: 'narrator',
    text: '你根据白灵儿的指引，来到城中一处废弃的旧宅。这里曾是白家小姐爱人李明的住所。你在废墟中仔细搜寻，终于在一段残垣断壁下，发现了一个被泥土掩埋的木盒。打开木盒，里面静静躺着一枚雕刻着“明”字的玉佩，以及一封泛黄的信。你感到真相近在眼前。',
    choices: [
      { label: '阅读信件', text: '你小心翼翼地打开信件，阅读其中的内容。', next: 48, delta: { courage: 0, clues: 10, yin: 0 } },
      { label: '带着玉佩返回古宅', text: '你带着玉佩，返回古宅，希望能安抚白灵儿。', next: 49, delta: { courage: 5, clues: 0, yin: 5 } },
      { label: '将玉佩交给老仵作', text: '你觉得老仵作或许能通过玉佩找到更多线索。', next: 3, delta: { courage: 0, clues: 5, yin: 0 } }
    ]
  },
  {
    id: 44,
    scene: '衙门大堂',
    speaker: 'narrator',
    text: '你回到衙门，将白灵儿的故事和白家的丑恶行径公之于众。县令听后大怒，立刻派人彻查白家。最终，白家因多项罪名被抄家，家主被判刑。白灵儿的冤屈得以昭雪，她的魂魄也因此得以安息。你感到自己做了一件大好事。',
    end: true,
    endType: 'good',
    endingId: '镜破魂散'
  },
  {
    id: 45,
    scene: '镜中世界',
    speaker: '白灵儿',
    text: '“放下……真的能放下吗？”白灵儿的眼神中充满了迷茫。她告诉你，她的执念已经根深蒂固，除非能亲眼看到家族的覆灭，否则她无法安息。你感到她的执念之深，难以撼动。',
    choices: [
      { label: '再次尝试沟通', text: '你深吸一口气，再次尝试与她沟通。', next: 35, delta: { courage: 0, clues: 3, yin: 5 } },
      { label: '答应帮助她揭露真相', text: '“我答应你，我会帮你揭露真相。”你坚定地说道。', next: 44, delta: { courage: 8, clues: 10, yin: 0 } },
      { label: '离开镜中世界', text: '你感到无力，试图离开镜中世界。', next: 40, delta: { courage: 0, clues: 0, yin: -10 } }
    ]
  },
  {
    id: 46,
    scene: '镜中世界',
    speaker: '白灵儿',
    text: '白灵儿告诉你，李明是一位才华横溢的书生，却家境贫寒。他们相识于一次诗会，一见钟情。然而，他们的爱情却不被世俗所容。白灵儿的家族为了利益，强行拆散了他们。李明最终郁郁而终。你感到这段爱情的悲剧。',
    choices: [
      { label: '离开镜中世界寻找玉佩', text: '你决定离开镜中世界，去寻找玉佩。', next: 40, delta: { courage: 5, clues: 10, yin: -5 } },
      { label: '尝试说服她放下执念', text: '你再次尝试说服她放下执念。', next: 35, delta: { courage: 0, clues: 5, yin: -5 } },
      { label: '告诉她真相', text: '“你被铜镜欺骗了，它只是利用你的执念。”你试图揭露真相。', next: 37, delta: { courage: 8, clues: 5, yin: -8 } }
    ]
  },
  {
    id: 47,
    scene: '镜中世界',
    speaker: '白灵儿',
    text: '“证据？什么证据？”白灵儿的眼神中充满了怀疑。你将自己调查到的线索，以及老仵作的讲述，一五一十地告诉她。你告诉她，铜镜并非见证爱情，而是吸食生魂的邪物。白灵儿听后，脸色变得苍白，眼中充满了震惊和痛苦。她开始动摇。',
    choices: [
      { label: '继续说服她', text: '你继续说服她，让她认清铜镜的真面目。', next: 50, delta: { courage: 5, clues: 5, yin: -10 } },
      { label: '提供玉佩', text: '“或许这枚玉佩能让你清醒。”你拿出玉佩。', next: 49, delta: { courage: 0, clues: 8, yin: -5 } },
      { label: '离开镜中世界', text: '你感到她难以接受，决定暂时离开。', next: 40, delta: { courage: 0, clues: 0, yin: -10 } }
    ]
  },
  {
    id: 48,
    scene: '城中旧宅',
    speaker: 'narrator',
    text: '信中字迹隽永，是李明写给白灵儿的绝笔。信中表达了他对白灵儿的深情，以及对家族拆散他们的无奈。他告诉白灵儿，他会在另一个世界等待她，希望她能放下执念，好好生活。信的最后，他写道：“愿君安好，勿念。”你感到一阵心酸，白灵儿的执念，或许并非无解。',
    choices: [
      { label: '带着信件和玉佩返回古宅', text: '你带着信件和玉佩，返回古宅，希望能安抚白灵儿。', next: 49, delta: { courage: 5, clues: 0, yin: 5 } },
      { label: '将信件交给老仵作', text: '你觉得老仵作或许能通过信件找到更多线索。', next: 3, delta: { courage: 0, clues: 5, yin: 0 } },
      { label: '再次尝试沟通', text: '你觉得或许可以从白灵儿那里找到线索。', next: 13, delta: { courage: 0, clues: 5, yin: 8 } }
    ]
  },
  {
    id: 49,
    scene: '镜中世界',
    speaker: '白灵儿',
    text: '你将玉佩和信件交给白灵儿。她颤抖着接过，当她看到玉佩和信件时，泪水夺眶而出。她终于明白，李明并非要她永困镜中，而是希望她能放下。她的执念开始动摇，镜中的邪气也随之减弱。你感到，真相的力量，正在逐渐瓦解铜镜的束缚。',
    choices: [
      { label: '劝说她放下执念', text: '“放下吧，他希望你安好。”你轻声劝慰道。', next: 50, delta: { courage: 0, clues: 5, yin: -10 } },
      { label: '询问她是否愿意离开', text: '“你是否愿意离开这里，去往更好的地方？”你问道。', next: 51, delta: { courage: 0, clues: 0, yin: -5 } },
      { label: '等待她的决定', text: '你静静地等待白灵儿做出决定。', next: 52, delta: { courage: 0, clues: 0, yin: 0 } }
    ]
  },
  {
    id: 50,
    scene: '镜中世界',
    speaker: '白灵儿',
    text: '“我明白了……我一直都错了。”白灵儿的脸上露出了释然的笑容。镜中的邪气彻底消散，铜镜发出清脆的破碎声，化为无数光点。白灵儿的身影也渐渐变得透明，她向你深深鞠了一躬，随后化为一道白光，消失在天地之间。古宅恢复了平静，失踪案的真相大白于天下。你感到心头一块大石落地。',
    end: true,
    endType: 'good',
    endingId: '镜破魂散'
  },
  {
    id: 51,
    scene: '镜中世界',
    speaker: '白灵儿',
    text: '“我愿意……我愿意离开。”白灵儿的眼中充满了对新生的渴望。镜中的邪气彻底消散，铜镜发出清脆的破碎声，化为无数光点。白灵儿的身影也渐渐变得透明，她向你深深鞠了一躬，随后化为一道白光，消失在天地之间。古宅恢复了平静，失踪案的真相大白于天下。你感到心头一块大石落地。',
    end: true,
    endType: 'good',
    endingId: '镜破魂散'
  },
  {
    id: 52,
    scene: '镜中世界',
    speaker: '白灵儿',
    text: '白灵儿静静地看着玉佩和信件，泪水无声地滑落。她最终抬起头，对你露出一个感激的笑容。镜中的邪气彻底消散，铜镜发出清脆的破碎声，化为无数光点。白灵儿的身影也渐渐变得透明，她向你深深鞠了一躬，随后化为一道白光，消失在天地之间。古宅恢复了平静，失踪案的真相大白于天下。你感到心头一块大石落地。',
    end: true,
    endType: 'good',
    endingId: '镜破魂散'
  },
  {
    id: 53,
    scene: '镜中世界',
    speaker: '白灵儿',
    text: '“你……你竟然知道这个秘密！”白灵儿的脸上露出震惊之色。她告诉你，铜镜的真正秘密是，它并非仅仅困住魂魄，而是能将魂魄与镜中幻象融合，创造出一个虚假的永恒。而她，正是被铜镜利用，成为了它的傀儡。你感到一阵寒意，原来铜镜的邪恶远超想象。',
    choices: [
      { label: '彻底摧毁铜镜', text: '“这等邪物，绝不能留！”你决定彻底摧毁铜镜。', next: 33, delta: { courage: 10, clues: 0, yin: -15 } },
      { label: '帮助白灵儿脱困', text: '“我帮你脱困，但你也要助我摧毁铜镜。”你提出条件。', next: 54, delta: { courage: 5, clues: 5, yin: -5 } },
      { label: '离开镜中世界', text: '你感到危险，决定离开镜中世界。', next: 40, delta: { courage: 0, clues: 0, yin: -10 } }
    ]
  },
  {
    id: 54,
    scene: '镜中世界',
    speaker: '白灵儿',
    text: '“好！我助你！”白灵儿的眼中闪烁着坚定的光芒。她告诉你，铜镜的弱点在于其核心的“镜魂”，只要击碎镜魂，铜镜便会彻底瓦解。而镜魂，就隐藏在镜中世界的深处。你感到希望就在眼前。',
    choices: [
      { label: '前往镜中世界深处', text: '你决定前往镜中世界深处，寻找镜魂。', next: 55, delta: { courage: 10, clues: 5, yin: 0 } },
      { label: '寻求老仵作帮助', text: '你觉得老仵作或许知道更多关于镜魂的信息。', next: 3, delta: { courage: 0, clues: 3, yin: 0 } },
      { label: '准备符咒法器', text: '你觉得需要更多准备，决定准备符咒法器。', next: 22, delta: { courage: 0, clues: 0, yin: -5 } }
    ]
  },
  {
    id: 55,
    scene: '镜中世界深处',
    speaker: 'narrator',
    text: '在白灵儿的指引下，你来到镜中世界的深处。这里一片混沌，无数扭曲的幻象在你眼前闪过。最终，你看到一个散发着微弱光芒的晶体，那便是铜镜的镜魂。镜魂周围，无数冤魂在哀嚎，试图阻止你。你感到巨大的压力。',
    choices: [
      { label: '击碎镜魂', text: '你凝聚全身内力，猛地一掌击向镜魂。', next: 56, delta: { courage: 15, clues: 0, yin: -15 } },
      { label: '尝试净化镜魂', text: '你试图用自己的正气净化镜魂。', next: 57, delta: { courage: 0, clues: 5, yin: -10 } },
      { label: '与冤魂沟通', text: '你尝试与周围的冤魂沟通，了解它们的执念。', next: 58, delta: { courage: 0, clues: 8, yin: 5 } }
    ]
  },
  {
    id: 56,
    scene: '镜中世界深处',
    speaker: 'narrator',
    text: '你一掌击碎镜魂，镜中世界瞬间崩塌。无数光点四散飞舞，冤魂的哀嚎声也随之消失。你感到一阵天旋地转，随后发现自己回到了古宅正堂。铜镜已经彻底消失，只留下一个焦黑的印记。白灵儿的身影也随之消失，但你感到她已经得到了解脱。古宅恢复了平静，失踪案的真相大白于天下。你成功解决了困扰百年的谜团。',
    end: true,
    endType: 'secret',
    endingId: '镜中真相'
  },
  {
    id: 57,
    scene: '镜中世界深处',
    speaker: 'narrator',
    text: '你将自己的正气注入镜魂，镜魂发出耀眼的光芒，周围的冤魂也随之平静下来。镜魂渐渐变得清澈，不再散发邪气。最终，镜魂化为一道纯净的光芒，飞向天空。你感到一阵轻松，白灵儿的身影也随之消失，但你感到她已经得到了解脱。古宅恢复了平静，失踪案的真相大白于天下。你成功解决了困扰百年的谜团。',
    end: true,
    endType: 'secret',
    endingId: '镜中真相'
  },
  {
    id: 58,
    scene: '镜中世界深处',
    speaker: 'narrator',
    text: '你尝试与周围的冤魂沟通，了解它们的执念。你发现，这些冤魂都是被铜镜吸入的无辜之人，它们渴望解脱。你向它们承诺，会帮助它们脱困。冤魂们感受到了你的善意，渐渐平静下来。你感到自己的力量增强了。',
    choices: [
      { label: '击碎镜魂', text: '你凝聚全身内力，猛地一掌击向镜魂。', next: 56, delta: { courage: 15, clues: 0, yin: -15 } },
      { label: '尝试净化镜魂', text: '你试图用自己的正气净化镜魂。', next: 57, delta: { courage: 0, clues: 5, yin: -10 } },
      { label: '寻求白灵儿帮助', text: '你觉得白灵儿或许能帮助你。', next: 54, delta: { courage: 0, clues: 3, yin: 0 } }
    ]
  }
];

export const INITIAL_STATS = { courage: 50, clues: 0, yin: 0 };