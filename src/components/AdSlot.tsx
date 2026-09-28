import { useEffect, useRef } from "react";

export default function AdSlot() {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (!ref.current || loaded.current) return;
    loaded.current = true;
    const s = document.createElement("script");
    s.src = "https://linkslot.ru/bancode_new.php?id=371414";
    s.async = true;
    ref.current.appendChild(s);
  }, []);

  return <div id="slot_371414" ref={ref} />;
}
