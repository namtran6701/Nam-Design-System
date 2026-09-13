import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({
  text,
  label,
  className = "",
}: {
  text: string;
  label: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
      timer.current = setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        type="button"
        className={`copy-button ${className}`.trim()}
        aria-label={label}
        title={status === "copied" ? "Copied" : "Copy"}
        onClick={copy}
      >
        {status === "copied" ? (
          <Check size={18} aria-hidden="true" />
        ) : (
          <Copy size={18} aria-hidden="true" />
        )}
      </button>
      <span className="sr-only" role="status">
        {status === "copied"
          ? "Copied to clipboard"
          : status === "error"
            ? "Clipboard unavailable. Select the text and copy it manually."
            : ""}
      </span>
    </>
  );
}
