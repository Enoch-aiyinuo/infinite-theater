import { useLocation } from 'wouter';
import { GAMES, getDifficultyLabel, getDifficultyColor } from '@/data/games';
import { useGameStore } from '@/hooks/useGameStore';
import { useLanguage } from '@/hooks/useLanguage';
import {
  Lock,
  Play,
  CheckCircle,
  Clock,
  BookOpen,
  Star,
  ArrowRight,
  Trophy,
  Sparkles,
  ScrollText,
  Ticket,
  Clapperboard,
  Film,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getGameMarketingCopy } from '@/lib/narrative';

export default function Home() {
  const [, navigate] = useLocation();
  const { isGameUnlocked, isGameCompleted, getCollectedEndings } = useGameStore();
  const { t, language } = useLanguage();
  const unlockedGames = GAMES.filter(game => isGameUnlocked(game.id, game.unlockRequirement));
  const completedGames = GAMES.filter(game => isGameCompleted(game.id));
  const totalCollectedEndings = GAMES.reduce((sum, game) => sum + getCollectedEndings(game.id).length, 0);
  const featuredGame = unlockedGames.find(game => !isGameCompleted(game.id)) || unlockedGames[0] || GAMES[0];
  const featuredCollectedEndings = getCollectedEndings(featuredGame.id);
  const featuredMarketing = getGameMarketingCopy(featuredGame, language);
  const nextLockedGame = GAMES.find(game => !isGameUnlocked(game.id, game.unlockRequirement));
  const heroCallouts = language === 'zh'
    ? ['悬疑来电', '深海失联', '古墓诅咒']
    : ['Midnight calls', 'Deep-sea blackout', 'Ancient curses'];
  const momentumItems = language === 'zh'
    ? [
        { icon: Sparkles, label: '今晚推荐', value: featuredGame.title },
        { icon: Trophy, label: '已完成故事', value: `${completedGames.length}/${GAMES.length}` },
        { icon: ScrollText, label: '已收集结局', value: `${totalCollectedEndings}/${GAMES.reduce((a, g) => a + g.endings.length, 0)}` },
      ]
    : [
        { icon: Sparkles, label: 'Tonight pick', value: featuredGame.title },
        { icon: Trophy, label: 'Stories cleared', value: `${completedGames.length}/${GAMES.length}` },
        { icon: ScrollText, label: 'Endings found', value: `${totalCollectedEndings}/${GAMES.reduce((a, g) => a + g.endings.length, 0)}` },
      ];
  const coverHighlights = language === 'zh'
    ? [
        { icon: Clapperboard, text: '开场像电影预告，不是普通菜单' },
        { icon: Film, text: '每次进入都会突出不同的悬念点' },
        { icon: Ticket, text: '先给你一张票，再把你带进故事' },
      ]
    : [
        { icon: Clapperboard, text: 'The opening feels like a trailer, not a menu' },
        { icon: Film, text: 'Each visit spotlights a different hook' },
        { icon: Ticket, text: 'You get a ticket first, then the story pulls you in' },
      ];
  const heroColors = [
    'oklch(0.72 0.12 75)',
    'oklch(0.60 0.16 214)',
    'oklch(0.58 0.18 292)',
    'oklch(0.62 0.18 25)',
  ];
  const tint = (color: string, alpha: number) =>
    color.startsWith('oklch(') ? color.replace(/\)$/, ` / ${alpha})`) : color;

  return (
    <div className="min-h-screen luxe-screen">
      <section className="relative overflow-hidden px-4 pt-8 pb-12 md:px-6 md:pt-12 md:pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-[8%] top-10 h-[440px] rounded-[3rem] bg-[radial-gradient(circle_at_top,oklch(0.72_0.12_75_/_0.18),transparent_56%)]" />
          <div className="absolute -top-24 left-[6%] h-72 w-72 rounded-full bg-[oklch(0.72_0.12_75_/_0.16)] blur-3xl" />
          <div className="absolute right-[8%] top-24 h-80 w-80 rounded-full bg-[oklch(0.60_0.16_214_/_0.18)] blur-3xl" />
          <div className="absolute left-[42%] top-8 h-64 w-64 rounded-full bg-[oklch(0.58_0.18_292_/_0.14)] blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        </div>

        <div className="container relative z-10">
          <div className="luxe-glass relative rounded-[2rem] px-6 py-8 md:px-10 md:py-12">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-x-8 top-0 h-1.5 rounded-full bg-gradient-to-r from-amber-300 via-sky-400 via-fuchsia-400 to-amber-300" />
              <div className="absolute right-0 top-0 h-64 w-64 bg-[radial-gradient(circle,oklch(0.72_0.12_75_/_0.16),transparent_70%)] blur-2xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 bg-[radial-gradient(circle,oklch(0.55_0.18_220_/_0.16),transparent_70%)] blur-2xl" />
              <div className="absolute bottom-6 right-14 h-40 w-40 bg-[radial-gradient(circle,oklch(0.58_0.18_292_/_0.12),transparent_70%)] blur-2xl" />
            </div>

            <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="max-w-2xl">
                <div className="mb-5 flex flex-wrap items-center gap-2 animate-fade-in">
                  <span className="font-cinzel text-primary/70 text-xs tracking-[0.32em] uppercase">
                    {t('hero.subtitle')}
                  </span>
                  {heroCallouts.map(item => (
                    <span
                      key={item}
                      className="rounded-full border px-3 py-1 text-[11px] tracking-[0.16em] uppercase"
                      style={{
                        borderColor: tint(heroColors[heroCallouts.indexOf(item) % heroColors.length], 0.24),
                        color: heroColors[heroCallouts.indexOf(item) % heroColors.length],
                        background: `linear-gradient(90deg, ${tint(heroColors[heroCallouts.indexOf(item) % heroColors.length], 0.18)}, transparent)`,
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <h1 className="font-serif-sc text-5xl md:text-7xl font-bold mb-4 animate-fade-in delay-100 leading-[0.95]">
                  <span className="text-gold-gradient">{t('hero.title')}</span>
                </h1>

                <p className="font-cinzel text-primary/45 text-sm md:text-base tracking-[0.45em] mb-6 animate-fade-in delay-150 uppercase">
                  INFINITE THEATER
                </p>

                <p className="text-lg md:text-[1.35rem] text-white/90 leading-relaxed max-w-2xl animate-fade-in delay-200">
                  {language === 'zh'
                    ? '从一通午夜来电开始，到深海基地失联、古墓诅咒苏醒，每一次选择都会把你推向新的命运分支。'
                    : 'From a midnight phone call to a collapsing deep-sea base and a waking ancient curse, every decision pushes you into a new branch of fate.'}
                </p>

                <p className="mt-4 max-w-xl text-sm md:text-base text-muted-foreground leading-relaxed animate-fade-in delay-300">
                  {language === 'zh'
                    ? '今晚最适合从推荐故事开始，先拿到第一个结局，再回来解锁更多世界。'
                    : 'Start with the recommended story tonight, grab your first ending, and come back stronger for the next world.'}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-in delay-400">
                  <Button
                    className="luxe-action group min-w-[220px] font-semibold"
                    onClick={() => navigate(`/game/${featuredGame.id}`)}
                  >
                    <Play size={16} className="mr-2" />
                    {language === 'zh' ? `开始：${featuredGame.title}` : `Start: ${featuredGame.title}`}
                    <ArrowRight size={15} className="ml-2 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-primary/25 bg-white/3 text-white/88 hover:bg-sky-400/10 hover:border-sky-300/45"
                    onClick={() => navigate('/archive')}
                  >
                    <BookOpen size={15} className="mr-2" />
                    {language === 'zh' ? '查看我的存档' : 'View My Archive'}
                  </Button>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {coverHighlights.map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="rounded-2xl border px-4 py-3 backdrop-blur-sm"
                      style={{
                        borderColor: 'oklch(0.72 0.12 75 / 0.14)',
                        background: 'linear-gradient(135deg, oklch(0.11 0.018 260 / 0.92), oklch(0.09 0.015 260 / 0.84))',
                        boxShadow: 'inset 0 1px 0 oklch(0.72 0.12 75 / 0.08)',
                      }}
                    >
                      <div className="mb-2 flex items-center gap-2 text-primary/78">
                        <Icon size={14} />
                        <span className="text-[11px] uppercase tracking-[0.18em] text-sky-200/80">
                          {language === 'zh' ? '封面细节' : 'Cover detail'}
                        </span>
                      </div>
                      <p className="text-sm text-white/86 leading-snug">{text}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {momentumItems.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="rounded-2xl border px-4 py-3"
                      style={{
                        borderColor: 'oklch(0.72 0.12 75 / 0.18)',
                        background: 'linear-gradient(180deg, oklch(0.13 0.018 260 / 0.94), oklch(0.10 0.015 260 / 0.95))',
                        boxShadow: 'inset 0 1px 0 oklch(0.72 0.12 75 / 0.06)',
                      }}
                    >
                      <div className="mb-2 flex items-center gap-2 text-primary/78">
                        <Icon size={14} />
                        <span className="text-[11px] uppercase tracking-[0.18em]">{label}</span>
                      </div>
                      <p className="text-sm text-white/88 leading-snug">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-fade-in delay-500">
                <div
                  className="relative overflow-hidden rounded-[1.9rem] border"
                  style={{
                    borderColor: 'oklch(0.72 0.12 75 / 0.24)',
                    background: 'linear-gradient(180deg, oklch(0.12 0.018 260 / 0.96), oklch(0.085 0.012 260 / 0.98))',
                    boxShadow: '0 30px 80px oklch(0 0 0 / 0.35), inset 0 1px 0 oklch(0.72 0.12 75 / 0.08), 0 0 0 1px oklch(0.60 0.16 214 / 0.06)',
                  }}
                >
                  <div className="relative h-[34rem]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,oklch(0.72_0.12_75_/_0.18),transparent_28%),radial-gradient(circle_at_80%_20%,oklch(0.60_0.16_214_/_0.22),transparent_24%),radial-gradient(circle_at_55%_72%,oklch(0.58_0.18_292_/_0.16),transparent_22%),linear-gradient(180deg,transparent_0%,oklch(0_0_0_/_0.26)_100%)]" />

                    <div className="absolute left-4 top-4 z-10 rounded-full border border-primary/35 bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-primary/90 backdrop-blur-sm">
                      {language === 'zh' ? '今晚放映' : 'Now Showing'}
                    </div>

                    <div className="absolute right-4 top-4 z-10 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-white/75 backdrop-blur-sm">
                      {language === 'zh' ? '章节票根' : 'Story Pass'}
                    </div>

                    <div className="absolute left-4 right-4 bottom-4 z-10 rounded-[1.35rem] border border-white/10 bg-black/42 p-4 backdrop-blur-xl">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.22em] text-primary/75 mb-1">
                            {language === 'zh' ? '开局钩子' : 'Opening hook'}
                          </p>
                          <h2 className="font-serif-sc text-3xl text-white leading-none">
                            {featuredGame.title}
                          </h2>
                        </div>
                        <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-primary/90">
                          {featuredGame.subtitle}
                        </div>
                      </div>

                      <p className="text-sm text-white/85 leading-relaxed mb-4">
                        {featuredMarketing.hook}
                      </p>

                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                          { value: featuredGame.estimatedTime, label: language === 'zh' ? '时长' : 'Length' },
                          { value: `${featuredGame.totalNodes}`, label: language === 'zh' ? '节点' : 'Nodes' },
                          { value: `${featuredCollectedEndings.length}/${featuredGame.endings.length}`, label: language === 'zh' ? '结局' : 'Endings' },
                        ].map(item => (
                          <div key={item.label} className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-3 text-center">
                            <div className="text-sm font-semibold text-white/90">{item.value}</div>
                            <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{item.label}</div>
                          </div>
                        ))}
                      </div>

                      <Button
                        className="group w-full border-0 bg-gradient-to-r from-amber-300 via-sky-400 to-fuchsia-500 text-slate-950 hover:from-amber-200 hover:via-sky-300 hover:to-fuchsia-400 shadow-[0_0_28px_oklch(0.72_0.12_75_/_0.22),0_0_36px_oklch(0.60_0.16_214_/_0.18)]"
                        onClick={() => navigate(`/game/${featuredGame.id}`)}
                      >
                        <Play size={16} className="mr-2" />
                        {language === 'zh' ? '直接开演' : 'Start the Show'}
                        <ChevronRight size={15} className="ml-2 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </div>

                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[82%]">
                      <div className="relative mx-auto h-[24rem] max-w-[18rem] rounded-[1.5rem] border border-primary/25 bg-black/35 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
                        <div className="relative h-full overflow-hidden rounded-[1.15rem]">
                          <img
                            src={featuredGame.coverImage}
                            alt={featuredGame.title}
                            className="h-full w-full object-cover brightness-[0.6] saturate-[0.96]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/18 to-transparent" />
                          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-primary/20 to-transparent" />
                        </div>
                        <div className="absolute -left-4 top-10 h-40 w-28 -rotate-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm" />
                        <div className="absolute -right-4 top-16 h-44 w-28 rotate-12 rounded-2xl border border-primary/15 bg-primary/5 backdrop-blur-sm" />
                        <div className="absolute -bottom-5 left-6 right-6 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-center text-[11px] uppercase tracking-[0.22em] text-white/65 backdrop-blur-sm">
                          {language === 'zh' ? '点击后进入分支故事' : 'Tap to enter the branching story'}
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-24 left-4 right-4 flex gap-2 overflow-hidden">
                      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-white/10 bg-black/32 px-3 py-2 backdrop-blur-md">
                        <div className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_oklch(0.60_0.16_214_/_0.75)]" />
                        <p className="truncate text-xs text-white/72">
                          {language === 'zh'
                            ? '推荐先从首页开局，再回头收集隐藏结局'
                            : 'Start from the homepage opening, then return for hidden endings'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-10">
        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <div className="luxe-glass rounded-[1.75rem] px-5 py-5 md:px-6">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-primary/75 mb-1">
                  {language === 'zh' ? '游戏大厅' : 'Game Hall'}
                </p>
                <h2 className="font-serif-sc text-2xl text-white">
                  {language === 'zh' ? '别只看，马上开始第一局' : 'Do Not Browse Forever. Start a Run.'}
                </h2>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>{language === 'zh' ? `${unlockedGames.length} 部已解锁` : `${unlockedGames.length} unlocked`}</p>
                <p>{language === 'zh' ? `${completedGames.length} 部已通关` : `${completedGames.length} cleared`}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {language === 'zh'
                ? '第一部故事决定你会不会继续留下来，所以首页必须像一扇门，而不是一张海报。下面这些故事卡片我也帮你保留成“先看钩子，再决定是否进入”。'
                : 'The first story decides whether players stay, so the homepage should feel like a doorway, not just a poster. The cards below now lead with hooks before asking for commitment.'}
            </p>
          </div>

          <div className="luxe-glass rounded-[1.75rem] px-5 py-5 md:px-6">
            <p className="text-xs uppercase tracking-[0.22em] text-primary/75 mb-2">
              {language === 'zh' ? '下一目标' : 'Next Unlock'}
            </p>
            <p className="text-lg text-white/90 mb-2">
              {nextLockedGame
                ? (language === 'zh' ? `解锁 ${nextLockedGame.title}` : `Unlock ${nextLockedGame.title}`)
                : (language === 'zh' ? '你已经解锁全部故事' : 'You have unlocked every story')}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {nextLockedGame
                ? nextLockedGame.unlockDescription
                : (language === 'zh' ? '接下来可以回头补完隐藏结局和成就。' : 'Now circle back for hidden endings and achievement runs.')}
            </p>
          </div>
        </div>
      </section>

      <section className="container pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif-sc text-2xl font-semibold text-foreground">
              {language === 'zh' ? '故事集' : 'Story Collection'}
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              {language === 'zh' ? '选择你的冒险，开始你的旅程' : 'Choose your adventure and begin your journey'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>{language === 'zh' ? '已解锁' : 'Unlocked'}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
              <span>{language === 'zh' ? '未解锁' : 'Locked'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GAMES.map((game, index) => {
            const unlocked = isGameUnlocked(game.id, game.unlockRequirement);
            const completed = isGameCompleted(game.id);
            const collectedEndings = getCollectedEndings(game.id);
            const endingProgress = `${collectedEndings.length}/${game.endings.length}`;
            const endingPercent = game.endings.length > 0 ? Math.round((collectedEndings.length / game.endings.length) * 100) : 0;
            const remainingEndings = Math.max(0, game.endings.length - collectedEndings.length);
            const marketing = getGameMarketingCopy(game, language);

            return (
              <div
                key={game.id}
                className={`group relative rounded-2xl border overflow-hidden card-hover cursor-pointer animate-fade-in-up`}
                style={{
                  animationDelay: `${index * 0.15}s`,
                  borderColor: unlocked ? tint(game.genreColor, 0.34) : 'oklch(0.16 0.02 260)',
                  background: `linear-gradient(180deg, oklch(0.15 0.024 260), oklch(0.085 0.016 260)), radial-gradient(circle at top left, ${tint(game.genreColor, 0.22)}, transparent 46%), radial-gradient(circle at bottom right, oklch(0.76 0.15 205 / 0.10), transparent 36%)`,
                  boxShadow: unlocked ? `0 18px 44px oklch(0 0 0 / 0.28), 0 0 24px ${tint(game.genreColor, 0.13)}` : undefined,
                }}
                onClick={() => unlocked && navigate(`/game/${game.id}`)}
              >
                {/* 封面图 */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      !unlocked ? 'brightness-50 saturate-50' : 'brightness-75'
                    }`}
                  />

                  {/* 渐变遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/18 to-transparent" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 18% 18%, ${tint(game.genreColor, 0.14)}, transparent 45%), linear-gradient(to top, oklch(0.11 0.018 260 / 0.95), transparent)`,
                    }}
                  />
                  <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: game.genreColor }} />

                  {/* 锁定遮罩 */}
                  {!unlocked && (
                    <div className="absolute inset-0 locked-overlay flex flex-col items-center justify-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-background/50 border border-border flex items-center justify-center">
                        <Lock size={24} className="text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground text-center px-4">{game.unlockDescription}</p>
                    </div>
                  )}

                  {/* 完成标记 */}
                  {completed && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-primary/20 border border-primary/30 rounded-full px-3 py-1">
                      <CheckCircle size={12} className="text-primary" />
                      <span className="text-xs text-primary font-medium">
                        {language === 'zh' ? '已完成' : 'Completed'}
                      </span>
                    </div>
                  )}

                  {/* 类型标签 */}
                  {unlocked && (
                    <div
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium text-white/90 backdrop-blur-sm"
                      style={{ background: `linear-gradient(90deg, ${tint(game.genreColor, 0.28)}, oklch(0.08 0.01 260 / 0.55))`, border: `1px solid ${tint(game.genreColor, 0.4)}` }}
                    >
                      {game.genre}
                    </div>
                  )}

                  {unlocked && (
                    <div className="absolute left-4 right-4 bottom-4">
                      <div className="rounded-xl border border-white/10 bg-black/35 backdrop-blur-md px-3 py-2" style={{ boxShadow: `inset 0 1px 0 ${tint(game.genreColor, 0.14)}` }}>
                        <p className="text-[11px] uppercase tracking-[0.25em] text-primary/75 mb-1">
                          {language === 'zh' ? '悬念钩子' : 'Hook'}
                        </p>
                        <p className="text-sm text-white/88 leading-snug">
                          {marketing.hook}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* 顺序标记 */}
                  <div className="absolute bottom-3 left-4">
                    <span className="font-cinzel text-4xl font-bold text-white/10 select-none">
                      {String(game.order).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* 内容区 */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-serif-sc text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {game.title}
                      </h3>
                      <p className="font-cinzel text-xs text-muted-foreground tracking-wider mt-0.5">
                        {game.subtitle}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          color: getDifficultyColor(game.difficulty),
                          background: `${getDifficultyColor(game.difficulty)}20`,
                          border: `1px solid ${getDifficultyColor(game.difficulty)}40`,
                        }}
                      >
                        {getDifficultyLabel(game.difficulty)}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-2 line-clamp-2">
                    {marketing.teaser}
                  </p>

                  <p className="text-xs text-primary/75 leading-relaxed mb-4 line-clamp-2">
                    {marketing.stakes}
                  </p>

                  {/* 元信息 */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <Clock size={12} />
                      <span>{game.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen size={12} />
                      <span>{game.totalNodes} {language === 'zh' ? '个节点' : 'nodes'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star size={12} />
                      <span>{language === 'zh' ? '结局' : 'Endings'} {endingProgress}</span>
                    </div>
                  </div>

                  {unlocked && (
                    <div className="mb-4 rounded-lg border border-white/8 bg-black/15 px-3 py-3">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <span className="text-xs text-white/58">
                          {language === 'zh' ? '收集目标' : 'Collection target'}
                        </span>
                        <span className="text-xs font-cinzel text-primary/85">
                          {endingProgress}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${endingPercent}%`,
                            background: game.genreColor,
                            boxShadow: `0 0 14px ${tint(game.genreColor, 0.7)}`,
                          }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        {remainingEndings === 0
                          ? (language === 'zh' ? '已完成全部结局，适合回味最佳路线。' : 'All endings found. Revisit your best route.')
                          : (language === 'zh'
                              ? `还差 ${remainingEndings} 个结局，下一局很可能解锁新内容。`
                              : `${remainingEndings} ending${remainingEndings > 1 ? 's' : ''} left. The next run can still unlock something new.`)}
                      </p>
                    </div>
                  )}

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {game.tags.map(tag => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-border/50 text-muted-foreground bg-secondary/50 hover:bg-secondary"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* 操作按钮 */}
                  {unlocked ? (
                    <Button
                      className="w-full border transition-all text-slate-950 hover:opacity-95"
                      style={{
                        borderColor: tint(game.genreColor, 0.4),
                        background: `linear-gradient(90deg, oklch(0.94 0.06 92), ${tint(game.genreColor, 0.9)}, oklch(0.76 0.15 205 / 0.88))`,
                        boxShadow: `0 0 22px ${tint(game.genreColor, 0.24)}, 0 0 34px oklch(0.76 0.15 205 / 0.16)`,
                      }}
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/game/${game.id}`);
                      }}
                    >
                      <Play size={14} className="mr-2" />
                      {completed ? t('buttons.continueGame') : t('buttons.startAdventure')}
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      variant="outline"
                      disabled
                    >
                      <Lock size={14} className="mr-2" />
                      {game.unlockDescription}
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 更多游戏提示 */}
        <div className="mt-12 text-center">
          <div className="divider-gold max-w-xs mx-auto mb-6" />
          <p className="text-muted-foreground text-sm">
            {language === 'zh' ? '更多故事正在创作中，敬请期待…' : 'More stories are coming soon...'}
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-pulse"
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
