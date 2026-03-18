"use client";

import { useEffect, useMemo, useState, type DragEvent } from "react";

type DragDropAreaProps = {
  items: string[];
  value: string[];
  onChange: (next: string[]) => void;
};

type DragPayload = {
  source: "arranged" | "bank";
  index: number;
  token: string;
};

type TokenOption = {
  token: string;
  poolIndex: number;
};

const shuffleOptions = (options: TokenOption[]) => {
  const next = [...options];
  for (let idx = next.length - 1; idx > 0; idx -= 1) {
    const swap = Math.floor(Math.random() * (idx + 1));
    [next[idx], next[swap]] = [next[swap], next[idx]];
  }
  return next;
};

export default function DragDropArea({ items, value, onChange }: DragDropAreaProps) {
  const [draggingToken, setDraggingToken] = useState<string | null>(null);
  const [arrangeHover, setArrangeHover] = useState(false);
  const [bankHover, setBankHover] = useState(false);
  const [shuffledItems, setShuffledItems] = useState<TokenOption[]>(
    () => shuffleOptions(items.map((token, poolIndex) => ({ token, poolIndex })))
  );

  const arrangedItems = useMemo(() => (Array.isArray(value) ? value : []), [value]);
  const itemSignature = useMemo(
    () => items.map((token, index) => `${index}:${token}`).join("||"),
    [items]
  );

  useEffect(() => {
    setShuffledItems(shuffleOptions(items.map((token, poolIndex) => ({ token, poolIndex }))));
  }, [itemSignature]);

  const availableItems = useMemo(() => {
    const consumed = new Map<string, number>();
    arrangedItems.forEach((token) => {
      consumed.set(token, (consumed.get(token) || 0) + 1);
    });

    return shuffledItems.reduce<TokenOption[]>((acc, option) => {
      const used = consumed.get(option.token) || 0;
      if (used > 0) {
        consumed.set(option.token, used - 1);
      } else {
        acc.push(option);
      }
      return acc;
    }, []);
  }, [arrangedItems, shuffledItems]);

  const moveInArranged = (from: number, to: number) => {
    if (from === to || from < 0 || to < 0 || from >= arrangedItems.length || to > arrangedItems.length) return;
    const next = [...arrangedItems];
    const [dragged] = next.splice(from, 1);
    next.splice(to, 0, dragged);
    onChange(next);
  };

  const addToken = (token: string, index = arrangedItems.length) => {
    const next = [...arrangedItems];
    next.splice(index, 0, token);
    onChange(next);
  };

  const removeToken = (index: number) => {
    if (index < 0 || index >= arrangedItems.length) return;
    const next = [...arrangedItems];
    next.splice(index, 1);
    onChange(next);
  };

  const parsePayload = (event: DragEvent): DragPayload | null => {
    const raw = event.dataTransfer.getData("application/json") || event.dataTransfer.getData("text/plain");
    if (!raw) return null;
    try {
      const payload = JSON.parse(raw) as DragPayload;
      if (!payload?.token || !payload?.source) return null;
      return payload;
    } catch {
      return null;
    }
  };

  const handleDropIntoArrange = (event: DragEvent, dropIndex = arrangedItems.length) => {
    event.preventDefault();
    setArrangeHover(false);
    const payload = parsePayload(event);
    if (!payload) return;

    if (payload.source === "arranged") {
      moveInArranged(payload.index, dropIndex);
      return;
    }
    addToken(payload.token, dropIndex);
  };

  const handleDropIntoBank = (event: DragEvent) => {
    event.preventDefault();
    setBankHover(false);
    const payload = parsePayload(event);
    if (!payload) return;
    if (payload.source === "arranged") {
      removeToken(payload.index);
    }
  };

  const tokenClassName =
    "inline-flex min-h-11 items-center rounded-sm border px-3 py-2 text-sm font-mono font-semibold transition " +
    "shadow-[0_2px_0_0_rgba(209,213,219,1)] active:translate-y-[1px] active:shadow-none";

  return (
    <div className="w-full flex flex-col gap-4">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setArrangeHover(true);
        }}
        onDragLeave={() => setArrangeHover(false)}
        onDrop={(event) => handleDropIntoArrange(event)}
        className={`min-h-24 rounded-sm border bg-white p-3 transition ${
          arrangeHover ? "border-green-500 shadow-[0_0_0_2px_rgba(34,197,94,0.15)]" : "border-gray-300"
        }`}
      >
        {arrangedItems.length === 0 ? (
          <p className="text-sm font-mono text-gray-500">Drag tokens here to build your answer.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {arrangedItems.map((item, idx) => (
              <button
                key={`arranged-${idx}-${item}`}
                type="button"
                draggable
                onDragStart={(event) => {
                  setDraggingToken(`arranged-${idx}-${item}`);
                  event.dataTransfer.setData(
                    "application/json",
                    JSON.stringify({ source: "arranged", index: idx, token: item } satisfies DragPayload)
                  );
                  event.dataTransfer.setData("text/plain", JSON.stringify({ source: "arranged", index: idx, token: item }));
                }}
                onDragEnd={() => {
                  setDraggingToken(null);
                  setArrangeHover(false);
                  setBankHover(false);
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => handleDropIntoArrange(event, idx)}
                onClick={() => removeToken(idx)}
                className={`${tokenClassName} border-green-300 bg-green-50 text-gray-900 ${
                  draggingToken === `arranged-${idx}-${item}` ? "opacity-70" : ""
                }`}
                title="Drag to reorder or click to remove"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setBankHover(true);
        }}
        onDragLeave={() => setBankHover(false)}
        onDrop={handleDropIntoBank}
        className={`rounded-sm border p-3 transition ${
          bankHover ? "border-gray-400 bg-gray-50" : "border-gray-200 bg-white"
        }`}
      >
        <div className="flex flex-wrap gap-2">
          {availableItems.map((item) => (
            <button
              key={`bank-${item.poolIndex}-${item.token}`}
              type="button"
              draggable
              onDragStart={(event) => {
                setDraggingToken(`bank-${item.poolIndex}-${item.token}`);
                event.dataTransfer.setData(
                  "application/json",
                  JSON.stringify({ source: "bank", index: item.poolIndex, token: item.token } satisfies DragPayload)
                );
                event.dataTransfer.setData("text/plain", JSON.stringify({ source: "bank", index: item.poolIndex, token: item.token }));
              }}
              onDragEnd={() => {
                setDraggingToken(null);
                setArrangeHover(false);
                setBankHover(false);
              }}
              onClick={() => addToken(item.token)}
              className={`${tokenClassName} border-gray-300 bg-gray-50 text-gray-800 ${
                draggingToken === `bank-${item.poolIndex}-${item.token}` ? "opacity-70" : ""
              }`}
              title="Click or drag into answer"
            >
              {item.token}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
