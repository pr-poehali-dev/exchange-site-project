import { useState, useEffect } from "react";
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

const HISTORY = [
  { id: "TX-8821", from: "0.25 BTC", to: "17105.12 USDT", time: "18 мар, 14:32", status: "completed" },
  { id: "TX-8820", from: "1.5 ETH", to: "5719.20 USDT", time: "18 мар, 11:07", status: "completed" },
  { id: "TX-8819", from: "500 USDT", to: "46070 RUB", time: "17 мар, 20:55", status: "completed" },
  { id: "TX-8818", from: "10 SOL", to: "1786 USDT", time: "17 мар, 16:22", status: "pending" },
  { id: "TX-8817", from: "0.1 BTC", to: "6842.05 USDT", time: "16 мар, 09:14", status: "completed" },
];

export default function Index() {
  const [tab, setTab] = useState<"exchange" | "history">("exchange");
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
        <nav className="flex items-center gap-1">
          <button
            onClick={() => setTab("exchange")}
            className={`px-4 py-2 text-sm rounded transition-colors ${
              tab === "exchange"
                ? "bg-secondary text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Обмен
          </button>
          <button
            onClick={() => setTab("history")}
            className={`px-4 py-2 text-sm rounded transition-colors ${
              tab === "history"
                ? "bg-secondary text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            История
          </button>
        </nav>
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
        {tab === "exchange" && (
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
        )}

        {tab === "history" && (
          <div className="fade-in">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">История обменов</h1>
              <p className="text-muted-foreground text-sm mt-1">Последние транзакции</p>
            </div>

            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="grid grid-cols-4 px-4 py-3 border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <span>ID</span>
                <span>Отдаёте</span>
                <span>Получаете</span>
                <span className="text-right">Статус</span>
              </div>
              <div className="divide-y divide-border">
                {HISTORY.map((tx) => (
                  <div
                    key={tx.id}
                    className="grid grid-cols-4 px-4 py-4 items-center hover:bg-secondary/30 transition-colors"
                  >
                    <div>
                      <div className="text-sm font-mono-custom text-foreground">{tx.id}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{tx.time}</div>
                    </div>
                    <div className="text-sm text-foreground">{tx.from}</div>
                    <div className="text-sm font-medium text-primary">{tx.to}</div>
                    <div className="text-right">
                      {tx.status === "completed" ? (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          <Icon name="Check" size={10} />
                          Выполнен
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-400">
                          <Icon name="Clock" size={10} />
                          В процессе
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 text-center text-xs text-muted-foreground">
              Показаны последние 5 операций
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>© 2026 SwapEx</span>
        <span className="font-mono-custom">Все курсы обновляются в реальном времени</span>
      </footer>
    </div>
  );
}
