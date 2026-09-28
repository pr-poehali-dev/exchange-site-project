import { useEffect, useRef } from "react";

export default function ApexAd() {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (!ref.current || loaded.current) return;
    loaded.current = true;
    const s = document.createElement("script");
    s.src = "https://apex-exchange.press/ad_widget.js";
    s.async = true;
    ref.current.appendChild(s);
  }, []);

  return <div ref={ref} />;
}
