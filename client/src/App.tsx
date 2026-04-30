import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GameDetail from "./pages/GameDetail";
import GamePlayer from "./pages/GamePlayer";
import Archive from "./pages/Archive";
import Achievements from "./pages/Achievements";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/game/:id" component={GameDetail} />
      <Route path="/play/:id" component={GamePlayer} />
      <Route path="/archive" component={Archive} />
      <Route path="/achievements" component={Achievements} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Layout() {
  return (
    <div className="min-h-screen bg-background">
      {/* 背景装饰 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/2 blur-3xl" />
      </div>

      <Navbar />

      {/* 主内容区 */}
      <main className="relative z-10 pt-16 pb-16 md:pb-0">
        <Router />
      </main>

      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: 'oklch(0.11 0.015 260)',
            border: '1px solid oklch(0.22 0.02 260)',
            color: 'oklch(0.92 0.02 80)',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Layout />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
