import { useParams, useLocation } from 'wouter';
import { getGameById, getDifficultyLabel, getDifficultyColor } from '@/data/games';
import { useGameStore } from '@/hooks/useGameStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, RotateCcw, Lock, Clock, BookOpen, Star, CheckCircle, Circle } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getGameMarketingCopy } from '@/lib/narrative';

export default function GameDetail() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const game = getGameById(params.id);
  const { isGameUnlocked, isGameCompleted, getCollectedEndings, getProgress, clearProgress } = useGameStore();
  const { language } = useLanguage();

  if (!game) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">故事不存在</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/')}>返回大厅</Button>
      </div>
    );
  }

  const unlocked = isGameUnlocked(game.id, game.unlockRequirement);
  const completed = isGameCompleted(game.id);
  const collectedEndings = getCollectedEndings(game.id);
  const progress = getProgress(game.id);
  const marketing = getGameMarketingCopy(game, language);
  const endings = Array.isArray(game.endings) ? game.endings : [];
  const tags = Array.isArray(game.tags) ? game.tags : [];
  const stats = Array.isArray(game.stats) ? game.stats : [];

  const handleStart = () => {
    if (progress) clearProgress(game.id);
    navigate(`/play/${game.id}`);
  };

  const handleContinue = () => {
    navigate(`/play/${game.id}`);
  };

  return (
    <div className="min-h-screen luxe-screen">
      {/* 顶部封面 */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={game.coverImage}
          alt={game.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.72_0.12_75_/_0.15),transparent_32%)]" />

        {/* 返回按钮 */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground bg-background/40 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 transition-all hover:bg-background/60"
        >
          <ArrowLeft size={14} />
          返回大厅
        </button>

        {/* 标题覆盖 */}
        <div className="absolute bottom-8 left-0 right-0 container">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    color: game.genreColor,
                    background: `${game.genreColor}20`,
                    border: `1px solid ${game.genreColor}40`,
                  }}
                >
                  {game.genre}
                </span>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    color: getDifficultyColor(game.difficulty),
                    background: `${getDifficultyColor(game.difficulty)}20`,
                    border: `1px solid ${getDifficultyColor(game.difficulty)}40`,
                  }}
                >
                  {getDifficultyLabel(game.difficulty)}
                </span>
                {completed && (
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium text-primary bg-primary/20 border border-primary/30 flex items-center gap-1">
                    <CheckCircle size={10} />
                    已完成
                  </span>
                )}
              </div>
              <h1 className="font-serif-sc text-4xl md:text-5xl font-bold text-foreground">
                {game.title}
              </h1>
              <p className="font-cinzel text-muted-foreground text-sm tracking-widest mt-1">
                {game.subtitle}
              </p>
              <div className="mt-4 max-w-2xl rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.28em] text-primary/80 mb-1">
                  {language === 'en' ? 'Premise' : '故事钩子'}
                </p>
                <p className="text-sm md:text-base text-white/88 leading-relaxed">
                  {marketing.hook}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：详情 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 剧情介绍 */}
            <section>
              <h2 className="font-serif-sc text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                剧情介绍
              </h2>
              <div className="luxe-glass rounded-xl p-6">
                <div className="grid gap-3 mb-5">
                  <div className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-primary/70 mb-1">
                      {language === 'en' ? 'What pulls you in' : '为什么会让人想点进去'}
                    </p>
                    <p className="text-sm text-foreground/90 leading-relaxed">{marketing.teaser}</p>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-black/15 px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/45 mb-1">
                      {language === 'en' ? 'What is at stake' : '这一局真正的代价'}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{marketing.stakes}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-sm">
                  {game.longDescription}
                </p>
              </div>
            </section>

            {/* 结局收集 */}
            <section>
              <h2 className="font-serif-sc text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-primary rounded-full" />
                结局收集
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  {collectedEndings.length}/{endings.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {endings.map(ending => {
                  const isCollected = collectedEndings.some(e => e.endingId === ending.id);
                  const typeColors = {
                    good: 'oklch(0.60 0.15 145)',
                    bad: 'oklch(0.55 0.22 25)',
                    secret: 'oklch(0.72 0.12 75)',
                    neutral: 'oklch(0.55 0.18 220)',
                  };
                  const color = typeColors[ending.type];

                  return (
                    <div
                      key={ending.id}
                    className="bg-card border rounded-xl p-4 transition-all"
                      style={{
                        borderColor: isCollected ? `${color}40` : 'oklch(0.22 0.02 260)',
                        background: isCollected
                          ? `linear-gradient(135deg, ${color}14, oklch(0.10 0.018 260 / 0.92))`
                          : 'linear-gradient(135deg, oklch(0.14 0.022 260 / 0.92), oklch(0.09 0.015 260 / 0.94))',
                        boxShadow: isCollected ? `0 0 22px ${color}16` : undefined,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {isCollected ? (
                            <CheckCircle size={16} style={{ color }} />
                          ) : (
                            <Circle size={16} className="text-muted-foreground/30" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-sm font-medium"
                              style={{ color: isCollected ? color : 'oklch(0.55 0.02 80)' }}
                            >
                              {ending.name}
                            </span>
                            <span
                              className="text-[10px] px-1.5 py-0.5 rounded"
                              style={{
                                color,
                                background: `${color}15`,
                              }}
                            >
                              {ending.type === 'good' ? '好结局' : ending.type === 'bad' ? '坏结局' : ending.type === 'secret' ? '隐藏结局' : '普通结局'}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {isCollected ? ending.description : '???'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge key={tag} variant="outline" className="border-border/50 text-muted-foreground">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* 右侧：操作面板 */}
          <div className="space-y-4">
            {/* 游戏信息卡 */}
            <div className="luxe-glass rounded-xl p-5 space-y-4">
              <h3 className="font-serif-sc text-base font-semibold text-foreground">游戏信息</h3>
              <div className="space-y-3">
                {[
                  { icon: Clock, label: '预计时长', value: game.estimatedTime },
                  { icon: BookOpen, label: '故事节点', value: `${game.totalNodes} 个` },
                  { icon: Star, label: '结局数量', value: `${endings.length} 种` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon size={13} />
                      <span>{label}</span>
                    </div>
                    <span className="text-foreground font-medium">{value}</span>
                  </div>
                ))}
              </div>

              {/* 属性系统 */}
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">属性系统</p>
                <div className="flex flex-wrap gap-2">
                  {stats.map(stat => (
                    <div
                      key={stat.key}
                      className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                      style={{
                        color: stat.color,
                        background: `${stat.color}15`,
                        border: `1px solid ${stat.color}30`,
                      }}
                    >
                      <span>{stat.icon}</span>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 进度卡 */}
            {progress && (
              <div className="luxe-glass rounded-xl p-5">
                <h3 className="font-serif-sc text-base font-semibold text-foreground mb-3">当前进度</h3>
                <div className="text-sm text-muted-foreground space-y-1.5">
                  <div className="flex justify-between">
                    <span>当前节点</span>
                    <span className="text-foreground">{progress.currentNodeId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>上次游玩</span>
                    <span className="text-foreground">
                      {new Date(progress.lastPlayedAt).toLocaleDateString('zh-CN')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 操作按钮 */}
            {unlocked ? (
              <div className="space-y-3">
                {progress && !progress.isCompleted ? (
                  <>
                    <Button
                      className="luxe-action w-full font-semibold"
                      onClick={handleContinue}
                    >
                      <Play size={15} className="mr-2" />
                      继续游玩
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-border text-muted-foreground hover:text-foreground"
                      onClick={handleStart}
                    >
                      <RotateCcw size={14} className="mr-2" />
                      重新开始
                    </Button>
                  </>
                ) : (
                  <Button
                      className="luxe-action w-full font-semibold"
                    onClick={handleStart}
                  >
                    <Play size={15} className="mr-2" />
                    {completed ? '再次游玩' : '开始冒险'}
                  </Button>
                )}
              </div>
            ) : (
              <div className="luxe-glass rounded-xl p-5 text-center">
                <Lock size={24} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">{game.unlockDescription}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
