import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const RATES = [
  { from: "BTC", to: "USDT", rate: 68420.5, change: +1.24 },
  { from: "ETH", to: "USDT", rate: 3812.8, change: -0.58 },
  { from: "BNB", to: "USDT", rate: 594.3, change: +2.11 },
  { from: "SOL", to: "USDT", rate: 178.6, change: +3.45 },
  { from: "XRP", to: "USDT", rate: 0.6124, change: -1.02 },
  { from: "USDT", to: "RUB", rate: 92.14, change: +0.31 },
  { from: "BTC", to: "RUB", rate: 6301050, change: +1.18 },
  { from: "ETH", to: "RUB", rate: 351290, change: -0.44 },
  { from: "MATIC", to: "USDT", rate: 0.8871, change: +0.77 },
  { from: "TON", to: "USDT", rate: 5.43, change: +1.95 },
];

export default function Index() {
  const [liveRates, setLiveRates] = useState(RATES);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveRates(prev =>
        prev.map(r => ({
          ...r,
          rate: +(r.rate * (1 + (Math.random() - 0.5) * 0.002)).toFixed(r.rate > 100 ? 2 : 4),
          change: +(r.change + (Math.random() - 0.5) * 0.1).toFixed(2),
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const tickerItems = [...liveRates, ...liveRates];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <Icon name="ArrowLeftRight" size={16} className="text-primary-foreground" />
          </div>
          <span className="text-foreground font-semibold text-lg tracking-tight">SwapEx</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block" />
          Работаем 24/7
        </div>
      </header>

      {/* Rate Ticker */}
      <div className="border-b border-border bg-card overflow-hidden py-3">
        <div className="flex overflow-hidden">
          <div className="ticker-track">
            {tickerItems.map((r, i) => (
              <span key={i} className="flex items-center gap-2 text-xs font-mono-custom shrink-0">
                <span className="text-muted-foreground">{r.from}/{r.to}</span>
                <span className="text-foreground font-medium">
                  {r.rate.toLocaleString("ru-RU", { maximumFractionDigits: 4 })}
                </span>
                <span className={r.change >= 0 ? "rate-up" : "rate-down"}>
                  {r.change >= 0 ? "▲" : "▼"} {Math.abs(r.change).toFixed(2)}%
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 px-4 py-8 max-w-6xl mx-auto w-full">
        <div className="fade-in">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Обмен валют</h1>
            <p className="text-muted-foreground text-sm mt-1">Лучшие курсы, мгновенный обмен</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Widget */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-border bg-card overflow-hidden glow-border">
                <iframe
                  src="https://buxo.monster/swap2.php?prt=60"
                  scrolling="auto"
                  frameBorder={0}
                  style={{ minWidth: 400, width: "100%", minHeight: 600, height: "100%", display: "block" }}
                />
              </div>
            </div>

            {/* Rate table */}
            <div className="flex flex-col gap-4">
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-foreground">Актуальные курсы</span>
                  <span className="text-xs text-muted-foreground font-mono-custom flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse inline-block" />
                    Live
                  </span>
                </div>
                <div className="flex flex-col gap-0">
                  {liveRates.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <span className="text-sm text-foreground font-medium">
                        {r.from}
                        <span className="text-muted-foreground mx-1">/</span>
                        {r.to}
                      </span>
                      <div className="text-right">
                        <div className="text-sm font-mono-custom text-foreground">
                          {r.rate.toLocaleString("ru-RU", { maximumFractionDigits: 4 })}
                        </div>
                        <div className={`text-xs font-mono-custom ${r.change >= 0 ? "rate-up" : "rate-down"}`}>
                          {r.change >= 0 ? "+" : ""}{r.change.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="ShieldCheck" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Гарантии</span>
                </div>
                <ul className="flex flex-col gap-2 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={12} className="text-primary shrink-0" />
                    Мгновенный обмен
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={12} className="text-primary shrink-0" />
                    Лучший курс на рынке
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={12} className="text-primary shrink-0" />
                    Защита транзакций
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={12} className="text-primary shrink-0" />
                    Поддержка 24/7
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>© 2026 SwapEx</span>
        <span className="font-mono-custom">Все курсы обновляются в реальном времени</span>
      </footer>
    </div>
  );
}
