import { Link, useLocation } from 'wouter';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';
import { Button } from '@/components/ui/button';
import { BookOpen, Trophy, Archive, LogIn, LogOut, User, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage, type Language } from '@/hooks/useLanguage';

const navLinks = [
  { href: '/', label: '游戏大厅', icon: BookOpen },
  { href: '/archive', label: '存档管理', icon: Archive },
  { href: '/achievements', label: '成就', icon: Trophy },
];

export default function Navbar() {
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-colors">
            <span className="font-cinzel text-primary text-sm font-bold">∞</span>
          </div>
          <div>
            <span className="font-serif-sc text-foreground font-semibold text-lg leading-none">无限剧场</span>
            <span className="block text-[10px] text-muted-foreground font-cinzel tracking-widest">INFINITE THEATER</span>
          </div>
        </Link>

        {/* 导航链接 */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = location === href;
            return (
              <Link key={href} href={href}>
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/10 border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              </Link>
            );
          })}
        </div>

        {/* 语言切换 + 用户区域 */}
        <div className="flex items-center gap-3">
          {/* 语言切换按钮 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-secondary transition-colors group">
                <Globe size={16} className="text-muted-foreground group-hover:text-foreground" />
                <span className="text-xs text-muted-foreground group-hover:text-foreground font-medium">Language</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-card border-border">
              <DropdownMenuItem
                onClick={() => setLanguage('zh')}
                className={`cursor-pointer ${
                  language === 'zh' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <span className="text-sm">中文 (Chinese)</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage('en')}
                className={`cursor-pointer ${
                  language === 'en' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <span className="text-sm">English</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-secondary transition-colors">
                  <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <User size={14} className="text-primary" />
                  </div>
                  <span className="text-sm text-foreground hidden sm:block max-w-24 truncate">
                    {user.name || '旅行者'}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-foreground truncate">{user.name || '旅行者'}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email || ''}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/archive" className="flex items-center gap-2 cursor-pointer">
                    <Archive size={14} />
                    存档管理
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/achievements" className="flex items-center gap-2 cursor-pointer">
                    <Trophy size={14} />
                    我的成就
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut size={14} className="mr-2" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
              onClick={() => window.location.href = getLoginUrl()}
            >
              <LogIn size={14} className="mr-2" />
              登录
            </Button>
          )}
        </div>
      </div>

      {/* 移动端底部导航 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-50">
        <div className="flex items-center justify-around py-2">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = location === href;
            return (
              <Link key={href} href={href}>
                <button className={`flex flex-col items-center gap-1 px-4 py-1 rounded-md transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  <Icon size={18} />
                  <span className="text-[10px]">{label}</span>
                </button>
              </Link>
            );
          })}
          
          {/* 移动端语言切换 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex flex-col items-center gap-1 px-4 py-1 rounded-md transition-colors text-muted-foreground hover:text-foreground">
                <Globe size={18} />
                <span className="text-[10px]">Language</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" side="top" className="w-40 bg-card border-border mb-2">
              <DropdownMenuItem
                onClick={() => setLanguage('zh')}
                className={`cursor-pointer ${
                  language === 'zh' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <span className="text-sm">中文</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage('en')}
                className={`cursor-pointer ${
                  language === 'en' ? 'bg-primary/10 text-primary' : ''
                }`}
              >
                <span className="text-sm">English</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
