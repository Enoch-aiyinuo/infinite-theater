import { useLocation } from 'wouter';
import { GAMES } from '@/data/games';
import { useGameStore } from '@/hooks/useGameStore';
import { Button } from '@/components/ui/button';
import { Play, Trash2, Clock, BookOpen, Star, AlertCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function Archive() {
  const [, navigate] = useLocation();
  const { store, getProgress, clearProgress, getCollectedEndings, isGameCompleted } = useGameStore();

  const gamesWithProgress = GAMES.filter(g => getProgress(g.id) || getCollectedEndings(g.id).length > 0);

  return (
    <div className="min-h-screen container py-10">
      {/* 标题 */}
      <div className="mb-10">
        <h1 className="font-serif-sc text-3xl font-bold text-foreground mb-2">存档管理</h1>
        <p className="text-muted-foreground text-sm">查看和管理你的游戏进度与结局收集</p>
        <div className="divider-gold max-w-xs mt-4" />
      </div>

      {gamesWithProgress.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
            <BookOpen size={24} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-lg mb-2">还没有游戏记录</p>
          <p className="text-muted-foreground/60 text-sm mb-6">开始你的第一段冒险吧</p>
          <Button
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10"
            onClick={() => navigate('/')}
          >
            <Play size={14} className="mr-2" />
            前往游戏大厅
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {GAMES.map(game => {
            const progress = getProgress(game.id);
            const collectedEndings = getCollectedEndings(game.id);
            const completed = isGameCompleted(game.id);

            if (!progress && collectedEndings.length === 0) return null;

            const endingProgress = `${collectedEndings.length}/${game.endings.length}`;

            return (
              <div
                key={game.id}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* 封面 */}
                  <div className="relative w-full sm:w-40 h-32 sm:h-auto shrink-0">
                    <img
                      src={game.coverImage}
                      alt={game.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50 sm:bg-gradient-to-t sm:from-card/50 sm:to-transparent" />
                  </div>

                  {/* 内容 */}
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="font-serif-sc text-lg font-semibold text-foreground">{game.title}</h3>
                        <p className="text-xs text-muted-foreground font-cinzel tracking-wider">{game.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {completed ? (
                          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                            已完成
                          </span>
                        ) : progress ? (
                          <span className="text-xs px-2 py-1 rounded-full bg-secondary border border-border text-muted-foreground">
                            进行中
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {/* 进度信息 */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                      {progress && (
                        <div className="text-sm">
                          <div className="text-muted-foreground text-xs mb-0.5 flex items-center gap-1">
                            <BookOpen size={10} />
                            当前节点
                          </div>
                          <span className="text-foreground font-medium">{progress.currentNodeId}</span>
                        </div>
                      )}
                      <div className="text-sm">
                        <div className="text-muted-foreground text-xs mb-0.5 flex items-center gap-1">
                          <Star size={10} />
                          结局收集
                        </div>
                        <span className="text-foreground font-medium">{endingProgress}</span>
                      </div>
                      {progress && (
                        <div className="text-sm">
                          <div className="text-muted-foreground text-xs mb-0.5 flex items-center gap-1">
                            <Clock size={10} />
                            上次游玩
                          </div>
                          <span className="text-foreground font-medium">
                            {new Date(progress.lastPlayedAt).toLocaleDateString('zh-CN')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 已收集结局 */}
                    {collectedEndings.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {collectedEndings.map(e => (
                          <span
                            key={e.endingId}
                            className="text-xs px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary/80"
                          >
                            {e.endingName}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 操作按钮 */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-primary/30 text-primary hover:bg-primary/10"
                        onClick={() => navigate(`/play/${game.id}`)}
                      >
                        <Play size={13} className="mr-1.5" />
                        {progress && !progress.isCompleted ? '继续游玩' : '再次游玩'}
                      </Button>

                      {progress && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-destructive/30 text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 size={13} className="mr-1.5" />
                              删除存档
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-card border-border">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-serif-sc text-foreground flex items-center gap-2">
                                <AlertCircle size={18} className="text-destructive" />
                                删除存档
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-muted-foreground">
                                确定要删除《{game.title}》的游戏进度吗？此操作不可撤销，但已收集的结局记录将保留。
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-secondary border-border text-foreground hover:bg-secondary/80">
                                取消
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => clearProgress(game.id)}
                              >
                                确认删除
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
