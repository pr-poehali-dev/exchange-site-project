import { useEffect, useRef } from "react";

export default function AdSlot({ id = "371414" }: { id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (!ref.current || loaded.current) return;
    loaded.current = true;
    const s = document.createElement("script");
    s.src = `https://linkslot.ru/bancode_new.php?id=${id}`;
    s.async = true;
    ref.current.appendChild(s);
  }, [id]);

  return <div id={`slot_${id}`} ref={ref} />;
}
